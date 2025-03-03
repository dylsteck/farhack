"server-only";

import { asc, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users, hackathons, invites, teams, tickets, User, Hackathon, Invite, Team, Ticket } from "./schema";

let client = postgres(`${process.env.DATABASE_URL!}?sslmode=require`);
let db = drizzle(client);

export async function acceptInvite(token: string, userId: number): Promise<void> {
  const invite = await db
    .select()
    .from(invites)
    .where(
      sql`${invites.token} = ${token} AND ${invites.expires_at} > NOW() AND ${invites.accepted_at} IS NULL`
    )
    .limit(1)
    .execute()
    .then((res: Invite[]) => res[0]);
  if (!invite) {
    throw new Error('Invalid or expired invite');
  }
  const teamId = invite.team_id;
  if (typeof teamId !== 'number') {
    throw new Error('Invalid team ID in invite');
  }
  await db.transaction(async (trx) => {
    await trx
      .update(invites)
      .set({ accepted_at: new Date(), accepted_by: userId })
      .where(eq(invites.id, invite.id))
      .execute();
    await trx
      .update(teams)
      .set({ fids: sql`array_append(fids, ${userId})` })
      .where(eq(teams.id, teamId))
      .execute();
  });
}

export async function createInvite(userId: number, teamId: number): Promise<string> {
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await db
    .insert(invites)
    .values({
      id: sql`DEFAULT`,
      token,
      expires_at: expiresAt,
      user_id: userId,
      team_id: teamId
    })
    .execute();
  return token;
}

export async function createTeam(
  name: string,
  description: string,
  hackathonId: number,
  userId: number
) {
  const emptyJsonArray = JSON.stringify([]);
  await db
    .insert(teams)
    .values({
      id: sql`DEFAULT`,
      name: name,
      description: description,
      hackathon_id: hackathonId,
      fids: sql`ARRAY[${userId}]`,
      wallet_address: '',
      embeds: sql`${emptyJsonArray}::jsonb`
    })
    .execute();
}

export async function createUser(
  name: string,
  fid: string,
  image?: string,
  isAdmin: boolean = false
): Promise<User> {
  return await db
    .insert(users)
    .values({
      id: sql`DEFAULT`,
      name,
      image: image || null,
      is_admin: isAdmin,
      admin_hackathons: isAdmin ? "all" : null,
      created_at: new Date()
    })
    .returning()
    .execute()
    .then((res: User[]) => res[0]);
}

// TODO: create a HydratedHackathon(or smth like that) type that has hackathon + teams
export async function getHackathon(slug: string): Promise<Hackathon> {
  const hackathon = await db
    .select({
      id: hackathons.id,
      name: hackathons.name,
      description: hackathons.description,
      start_date: hackathons.start_date,
      end_date: hackathons.end_date,
      created_at: hackathons.created_at,
      square_image: hackathons.square_image,
      slug: hackathons.slug,
      tracks: hackathons.tracks,
      bounties: hackathons.bounties,
      schedule: hackathons.schedule,
      teams: sql`COALESCE(json_agg(teams.*) FILTER (WHERE teams.id IS NOT NULL), '[]'::json)`
    })
    .from(hackathons)
    .leftJoin(teams, eq(teams.hackathon_id, hackathons.id))
    .where(eq(hackathons.slug, slug))
    .groupBy(hackathons.id)
    .limit(1)
    .execute()
    .then((res) => res[0]);

  if (!hackathon) {
    throw new Error("Hackathon not found");
  }

  return hackathon;
}

export async function getHackathons(): Promise<Hackathon[]> {
  return await db
    .select()
    .from(hackathons)
    .execute();
}

export async function getTeams(): Promise<Team[]> {
  return await db
    .select()
    .from(teams)
    .execute();
}

export async function getUsers(): Promise<User[]> {
  return await db
    .select()
    .from(users)
    .execute();
}

export async function getUser(userId: number): Promise<User> {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .execute()
    .then((res: User[]) => res[0]);
  
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function getAdmins(): Promise<User[]> {
  return await db
    .select()
    .from(users)
    .where(eq(users.admin_hackathons, "all"))
    .limit(10)
    .execute();
}

export async function getTickets(): Promise<Ticket[]> {
  return await db.select().from(tickets).execute();
}

export async function handleDeleteTeam(teamId: number) {
  await db.delete(teams).where(eq(teams.id, teamId)).execute();
}

export async function handleGenerateInvite(
  userId: number,
  teamId: number,
  hackathonSlug: string
): Promise<string> {
  const token = await createInvite(userId, teamId);
  return `${process.env.BASE_URL}/hackathons/${hackathonSlug}/teams/share-invite?token=${token}`;
}

export async function getAllTimeSales(): Promise<number> {
  const allTimeSales = await db
    .select({ total: sql<number>`COALESCE(SUM(${tickets.amount}), 0)::numeric` })
    .from(tickets)
    .execute()
    .then(res => res[0]);

  return allTimeSales?.total ?? 0;
}

interface RecentTicket {
  id: number;
  user_id: number;
  user_address: string;
  hackathon_id: number;
  txn_hash: string;
  ticket_type: string;
  amount: number;
  created_at: Date;
  name: string | null;
  image: string | null;
  is_admin: boolean | null;
  admin_hackathons: string | null;
  hackathon_name: string | null;
}

export async function getRecentTickets(): Promise<RecentTicket[]> {
  return await db
    .select({
      id: tickets.id,
      user_id: tickets.user_id,
      user_address: tickets.user_address,
      hackathon_id: tickets.hackathon_id,
      txn_hash: tickets.txn_hash,
      ticket_type: tickets.ticket_type,
      amount: tickets.amount,
      created_at: tickets.created_at,
      name: users.name,
      image: users.image,
      is_admin: users.is_admin,
      admin_hackathons: users.admin_hackathons,
      hackathon_name: hackathons.name,
    })
    .from(tickets)
    .innerJoin(users, eq(tickets.user_id, users.id))
    .innerJoin(hackathons, eq(tickets.hackathon_id, hackathons.id))
    .orderBy(desc(tickets.created_at))
    .limit(50)
    .execute() as RecentTicket[];
}

export async function getTeam(type: 'teamId' | 'userId', identifier: number): Promise<Team | null> {
  if (type === 'teamId') {
    return await db
      .select()
      .from(teams)
      .where(eq(teams.id, identifier))
      .limit(1)
      .execute()
      .then((res: Team[]) => res[0] || null);
  } else if (type === 'userId') {
    return await db
      .select()
      .from(teams)
      .where(sql`${identifier} = ANY(${teams.fids})`)
      .limit(1)
      .execute()
      .then((res: Team[]) => res[0] || null);
  }
  return null;
}


export async function updateTeam(team: Team): Promise<void> {
  const { id, ...updates } = team;
  await db
    .update(teams)
    .set(updates)
    .where(eq(teams.id, id))
    .execute();
}
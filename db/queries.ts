"server-only";

import { asc, desc, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { users, hackathons, invites, teams, User, Hackathon, Invite, Team } from "./schema";

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
): Promise<Team> {
  const emptyJsonArray = JSON.stringify([]);
  const result = await db
    .insert(teams)
    .values({
      id: sql`DEFAULT`,
      name: name,
      description: description,
      hackathon_id: hackathonId,
      fids: sql`ARRAY[${sql`${userId}`}::integer]`,
      wallet_address: '',
      embeds: sql`${emptyJsonArray}::jsonb`,
      created_at: new Date()
    })
    .returning()
    .execute();
  return result[0];
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
      created_at: new Date(),
      frame_added: false,
      notifications_enabled: false,
      notification_token: null
    })
    .returning()
    .execute()
    .then((res: User[]) => res[0]);
}

export async function getHackathon(slug: string): Promise<Hackathon & { teams: (Omit<Team, "fids"> & { fids: User[] })[] }> {
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
    })
    .from(hackathons)
    .where(eq(hackathons.slug, slug))
    .limit(1)
    .execute()
    .then((res) => res[0]);

  if (!hackathon) {
    throw new Error("Hackathon not found");
  }

  const teamsWithUsers = await db
    .select({
      id: teams.id,
      name: teams.name,
      description: teams.description,
      hackathon_id: teams.hackathon_id,
      submitted_at: teams.submitted_at,
      wallet_address: teams.wallet_address,
      embeds: teams.embeds,
      created_at: teams.created_at,
      fids: sql<User[]>`COALESCE(json_agg(users.*) FILTER (WHERE users.id IS NOT NULL), '[]'::json)`,
    })
    .from(teams)
    .leftJoin(users, sql`${users.id} = ANY(${teams.fids})`)
    .where(eq(teams.hackathon_id, hackathon.id))
    .groupBy(teams.id)
    .execute();

  return { ...hackathon, teams: teamsWithUsers };
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

export async function updateUserFrameAdded(userId: number, frameAdded: boolean): Promise<void> {
  await db
    .update(users)
    .set({ frame_added: frameAdded })
    .where(eq(users.id, userId))
    .execute();
}

export async function updateUserNotificationsEnabled(userId: number, enabled: boolean): Promise<void> {
  await db
    .update(users)
    .set({ notifications_enabled: enabled })
    .where(eq(users.id, userId))
    .execute();
}

export async function updateUserNotificationToken(userId: number, token: string | null): Promise<void> {
  await db
    .update(users)
    .set({ notification_token: token })
    .where(eq(users.id, userId))
    .execute();
}
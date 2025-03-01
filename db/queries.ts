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

export async function addItem(
  hackathonId: number,
  modalType: string,
  name: string,
  description: string,
  date?: string
) {
  const newItem =
    modalType === 'ScheduleItem'
      ? { name, description, date: new Date(date!).toISOString() }
      : { name, description };
  const field =
    modalType === 'ScheduleItem'
      ? "schedule"
      : modalType === 'Bounty'
      ? "bounties"
      : "tracks";
  await db
    .update(hackathons)
    .set({
      [field]: sql`jsonb_set(coalesce(${sql.identifier(field)}, '[]'::jsonb), '{${new Date().getTime()}}', ${JSON.stringify(newItem)}::jsonb)`
    })
    .where(eq(hackathons.id, hackathonId))
    .execute();
}

export async function addTicket(
  userId: number,
  userAddress: string,
  hackathonId: number,
  txnHash: string,
  ticketType: 'priority' | 'day',
  amount: number
): Promise<Ticket> {
  return await db
    .insert(tickets)
    .values({
      id: sql`DEFAULT`,
      user_id: userId,
      user_address: userAddress,
      hackathon_id: hackathonId,
      txn_hash: txnHash,
      ticket_type: ticketType,
      amount: amount
    })
    .returning()
    .execute()
    .then((res: Ticket[]) => res[0]);
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

export async function getAdmins(): Promise<User[]> {
  return await db
    .select({
      id: users.id,
      created_at: users.created_at,
      name: users.name,
      image: users.image,
      is_admin: users.is_admin,
      admin_hackathons: users.admin_hackathons
    })
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

export async function handleLeaveTeam(userId: number, teamId: number) {
  await db
    .update(teams)
    .set({ fids: sql`array_remove(fids, ${userId})` })
    .where(eq(teams.id, teamId))
    .execute();
}

export async function handleSaveTeam(
  name: string,
  description: string,
  walletAddress: string,
  embeds: any,
  teamId: number
) {
  await db
    .update(teams)
    .set({
      name,
      description,
      wallet_address: walletAddress,
      embeds: sql`${JSON.stringify(embeds)}::jsonb`
    })
    .where(eq(teams.id, teamId))
    .execute();
}

export async function handleSubmitTeam(
  name: string,
  description: string,
  walletAddress: string,
  embeds: any,
  teamId: number
) {
  await db
    .update(teams)
    .set({
      name,
      description,
      wallet_address: walletAddress,
      embeds: sql`${JSON.stringify(embeds)}::jsonb`,
      submitted_at: new Date()
    })
    .where(eq(teams.id, teamId))
    .execute();
}

export async function removeUser(userId: number): Promise<void> {
  await db
    .delete(users)
    .where(eq(users.id, userId))
    .execute();
}

export async function updateUser(
  userId: number,
  { fid, ...data }: {
    name?: string;
    fid?: string;
    image?: string | null;
    is_admin?: boolean;
    admin_hackathons?: string | null;
  }
): Promise<User> {
  return await db
    .update(users)
    .set(data)
    .where(eq(users.id, userId))
    .returning()
    .execute()
    .then((res: User[]) => res[0]);
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

export async function getHackathon(slug: string): Promise<Hackathon> {
  const hackathon = await db
    .select()
    .from(hackathons)
    .where(eq(hackathons.slug, slug))
    .limit(1)
    .execute()
    .then((res: Hackathon[]) => res[0]);
  
  if (!hackathon) {
    throw new Error('Hackathon not found');
  }
  return hackathon;
}
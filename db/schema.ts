import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, bigint, integer, boolean, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  name: text("name"),
  image: text("image"),
  is_admin: boolean("is_admin").notNull().default(false),
  admin_hackathons: varchar("admin_hackathons"),
});

export type User = InferSelectModel<typeof users>;

export const hackathons = pgTable("hackathons", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  name: text("name"),
  description: text("description"),
  start_date: timestamp("start_date"),
  end_date: timestamp("end_date"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  square_image: text("square_image"),
  slug: text("slug"),
  tracks: jsonb("tracks"),
  bounties: jsonb("bounties"),
  schedule: jsonb("schedule"),
});

export type Hackathon = InferSelectModel<typeof hackathons>;

export const invites = pgTable("invites", {
  id: integer("id").primaryKey().notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  expires_at: timestamp("expires_at").notNull(),
  user_id: integer("user_id").references(() => users.id),
  accepted_at: timestamp("accepted_at"),
  accepted_by: integer("accepted_by"),
  team_id: integer("team_id"),
});

export type Invite = InferSelectModel<typeof invites>;

export const teams = pgTable("teams", {
  id: integer("id").primaryKey().notNull(),
  fids: integer("fids").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  submitted_at: timestamp("submitted_at"),
  hackathon_id: integer("hackathon_id").notNull(),
  wallet_address: text("wallet_address"),
  embeds: jsonb("embeds"),
});

export type Team = InferSelectModel<typeof teams>;
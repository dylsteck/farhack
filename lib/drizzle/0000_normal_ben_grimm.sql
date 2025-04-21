CREATE TABLE IF NOT EXISTS "hackathons" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"start_date" timestamp,
	"end_date" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"square_image" text,
	"slug" text,
	"tracks" jsonb,
	"bounties" jsonb,
	"schedule" jsonb,
	"is_demo" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invites" (
	"id" integer PRIMARY KEY NOT NULL,
	"token" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL,
	"user_id" integer,
	"accepted_at" timestamp,
	"accepted_by" integer,
	"team_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"fids" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"submitted_at" timestamp,
	"hackathon_id" integer NOT NULL,
	"wallet_address" text,
	"embeds" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"name" text,
	"image" text,
	"is_admin" boolean DEFAULT false NOT NULL,
	"admin_hackathons" varchar,
	"frame_added" boolean DEFAULT false NOT NULL,
	"notifications_enabled" boolean DEFAULT false NOT NULL,
	"notification_token" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invites" ADD CONSTRAINT "invites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

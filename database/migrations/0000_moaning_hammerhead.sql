DO $$ BEGIN
 CREATE TYPE "stage" AS ENUM('Mainnet', 'Testnet', 'Devnet', 'Local/Private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"entitlements" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profile" (
	"user_id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"token_name" varchar(255),
	"token_supply" integer,
	"release_date" timestamp,
	"summary" varchar(255) NOT NULL,
	"is_live" boolean DEFAULT false NOT NULL,
	"stage" "stage" NOT NULL,
	"description" text NOT NULL,
	"community_size" integer,
	"website" varchar(255),
	"whitepaper" varchar(255),
	"twitter" varchar(255),
	"discord" varchar(255),
	"telegram" varchar(255),
	"contact_name" varchar(255),
	"contact_email" varchar(255),
	"main_tag_id" integer,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "permission_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role_permission" (
	"role_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	CONSTRAINT "role_permission_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_role" (
	"user_id" text NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "user_role_role_id_user_id_pk" PRIMARY KEY("role_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_tag" (
	"project_id" integer NOT NULL,
	"tag_id" integer NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "project_tag_project_id_tag_id_user_id_pk" PRIMARY KEY("project_id","tag_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	CONSTRAINT "tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "main_wallet" (
	"user_id" text NOT NULL,
	"wallet_id" integer NOT NULL,
	CONSTRAINT "main_wallet_user_id_wallet_id_pk" PRIMARY KEY("user_id","wallet_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wallet" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"wallet_address" text NOT NULL,
	CONSTRAINT "wallet_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "wallet_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_main_tag_id_tag_id_fk" FOREIGN KEY ("main_tag_id") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_permission_id_fk" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tag" ADD CONSTRAINT "project_tag_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tag" ADD CONSTRAINT "project_tag_tag_id_tag_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tag" ADD CONSTRAINT "project_tag_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main_wallet" ADD CONSTRAINT "main_wallet_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "main_wallet" ADD CONSTRAINT "main_wallet_wallet_id_wallet_id_fk" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wallet" ADD CONSTRAINT "wallet_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

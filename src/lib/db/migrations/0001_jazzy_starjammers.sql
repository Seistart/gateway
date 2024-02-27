CREATE TABLE IF NOT EXISTS "projects" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"project_name" text NOT NULL,
	"token_name" varchar(256),
	"token_supply" integer,
	"project_release" varchar(256),
	"project_type" varchar(256) NOT NULL,
	"project_summary" text NOT NULL,
	"project_description" text NOT NULL,
	"url_website" varchar(256),
	"url_whitepaper" varchar(256),
	"url_twitter" varchar(256),
	"url_discord" varchar(256),
	"url_telegram" varchar(256),
	"url_reddit" varchar(256),
	"url_facebook" varchar(256),
	"contact_name" varchar(256),
	"contact_email" varchar(256),
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

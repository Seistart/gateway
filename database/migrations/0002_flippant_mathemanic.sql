CREATE TABLE IF NOT EXISTS "project_tags" (
	"project_id" varchar(191),
	"tag_id" varchar(191)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"type_name" varchar(256) NOT NULL,
	CONSTRAINT "tags_type_name_unique" UNIQUE("type_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

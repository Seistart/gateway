import { sql } from "drizzle-orm";
import { text, varchar, integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getProjects } from "@/lib/api/projects/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const projects = pgTable('projects', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  projectName: text("project_name").notNull(),
  tokenName: varchar("token_name", { length: 256 }),
  tokenSupply: integer("token_supply"),
  projectRelease: varchar("project_release", { length: 256 }),
  projectType: varchar("project_type", { length: 256 }).notNull(),
  projectSummary: text("project_summary").notNull(),
  projectDescription: text("project_description").notNull(),
  urlWebsite: varchar("url_website", { length: 256 }),
  urlWhitepaper: varchar("url_whitepaper", { length: 256 }),
  urlTwitter: varchar("url_twitter", { length: 256 }),
  urlDiscord: varchar("url_discord", { length: 256 }),
  urlTelegram: varchar("url_telegram", { length: 256 }),
  urlReddit: varchar("url_reddit", { length: 256 }),
  urlFacebook: varchar("url_facebook", { length: 256 }),
  contactName: varchar("contact_name", { length: 256 }),
  contactEmail: varchar("contact_email", { length: 256 }),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for projects - used to validate API requests
const baseSchema = createSelectSchema(projects).omit(timestamps)

export const insertProjectSchema = createInsertSchema(projects).omit(timestamps);
export const insertProjectParams = baseSchema.extend({
  tokenSupply: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateProjectSchema = baseSchema;
export const updateProjectParams = baseSchema.extend({
  tokenSupply: z.coerce.number()
}).omit({ 
  userId: true
});
export const projectIdSchema = baseSchema.pick({ id: true });

// Types for projects - used to type API request params and within Components
export type Project = typeof projects.$inferSelect;
export type NewProject = z.infer<typeof insertProjectSchema>;
export type NewProjectParams = z.infer<typeof insertProjectParams>;
export type UpdateProjectParams = z.infer<typeof updateProjectParams>;
export type ProjectId = z.infer<typeof projectIdSchema>["id"];
    
// this type infers the return from getProjects() - meaning it will include any joins
export type CompleteProject = Awaited<ReturnType<typeof getProjects>>["projects"][number];


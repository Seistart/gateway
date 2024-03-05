import { timestamps } from "@/utils/date.utils"
import { sql } from "drizzle-orm"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./auth.schema"

export const stage = pgEnum("stage", ["dev", "test", "main", "none"])

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  tokenName: varchar("token_name", { length: 255 }),
  tokenSupply: integer("token_supply"),
  releaseDate: timestamp("release_date"),
  summary: varchar("summary", { length: 255 }).notNull(),
  isLive: boolean("is_live").notNull().default(false),
  stage: stage("none").notNull(),
  description: text("description").notNull(),
  website: varchar("website", { length: 255 }),
  whitepaper: varchar("whitepaper", { length: 255 }),
  twitter: varchar("twitter", { length: 255 }),
  discord: varchar("discord", { length: 255 }),
  telegram: varchar("telegram", { length: 255 }),
  contactName: varchar("contact_name", { length: 255 }),
  contactEmail: varchar("contact_email", { length: 255 }),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
})

const baseSchema = createSelectSchema(projects).omit(timestamps)

const projectWithTagsSchema = baseSchema.extend({
  tags: z.array(z.string()).max(3),
})

export const projectsResponseSchema = z.array(projectWithTagsSchema)

export const insertProjectSchema = createInsertSchema(projects).omit({
  ...timestamps,
  id: true,
})

export const insertProjectParams = baseSchema
  .extend({
    tokenSupply: z.coerce.number(),
  })
  .omit({
    userId: true,
    id: true,
  })

export const updateProjectSchema = baseSchema
export const updateProjectParams = baseSchema.extend({
  tokenSupply: z.coerce.number(),
})

export const projectIdSchema = baseSchema.pick({ id: true })

export type Project = z.infer<typeof baseSchema>
export type NewProject = z.infer<typeof insertProjectSchema>
export type NewProjectParams = z.infer<typeof insertProjectParams>
export type UpdateProjectParams = z.infer<typeof updateProjectParams>
export type ProjectId = z.infer<typeof projectIdSchema>["id"]
export type CompleteProject = z.infer<typeof projectWithTagsSchema>

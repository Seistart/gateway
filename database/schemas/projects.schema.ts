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
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./auth.schema"
export const stage = pgEnum("stage", ["dev", "test", "main", "none"])

export const ProjectsTable = pgTable("projects", {
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
  wechat: varchar("wechat", { length: 255 }),
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

const BaseSchema = createSelectSchema(ProjectsTable).omit(timestamps)

const ProjectWithTagsSchema = BaseSchema.extend({
  tags: z.array(z.string()).max(3),
})

export const ProjectsResponseSchema = z.array(ProjectWithTagsSchema)

export const InsertProjectSchema = BaseSchema.extend({
  tokenSupply: z.coerce.number().optional(),
}).omit({
  ...timestamps,
  id: true,
})

export const NewProjectSchema = InsertProjectSchema.extend({}).omit({
  userId: true,
})

export const NewProjectWithTagsSchema = InsertProjectSchema.extend({
  tags: z.array(z.number()),
})

export const updateProjectSchema = BaseSchema.extend({
  tokenSupply: z.coerce.number().optional(),
}).omit({
  createdAt: true,
  id: true,
})
export const updateProjectParams = BaseSchema.extend({
  tokenSupply: z.coerce.number(),
})

export const ProjectIdSchema = BaseSchema.pick({ id: true })

export type NewProjectParams = z.infer<typeof NewProjectSchema>
export type NewProjectWithTagsParams = z.infer<typeof NewProjectWithTagsSchema>
export type UpdateProjectParams = z.infer<typeof updateProjectParams>
export type Project = z.infer<typeof ProjectWithTagsSchema>

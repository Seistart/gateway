import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
import { createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./auth.schema"
import { ProjectsTable } from "./projects.schema"

export const tags = pgTable("tags", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).unique().notNull(),
})

export const projectTags = pgTable("project_tags", {
  projectId: integer("project_id")
    .references(() => ProjectsTable.id, {
      onDelete: "cascade",
    })
    .notNull(),
  tagId: integer("tag_id")
    .references(() => tags.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
})

const tagsBaseSchema = createSelectSchema(tags)
export type Tag = z.infer<typeof tagsBaseSchema>

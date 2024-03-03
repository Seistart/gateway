import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import { projects } from './projects'

export const tags = pgTable('tags', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  typeName: varchar('type_name', { length: 256 }).unique().notNull(),
})

export const projectTags = pgTable('project_tags', {
  projectId: varchar('project_id', { length: 191 }).references(
    () => projects.id,
    {
      onDelete: 'cascade', // This ensures that deleting a project will also delete its associated tags
    }
  ),
  tagId: varchar('tag_id', { length: 191 }).references(() => tags.id),
})

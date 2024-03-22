"use server"

import { db } from "@/database/database"
import { Tag, TagTable } from "@/database/schemas/tags.schema"
import { eq } from "drizzle-orm"

// TODO: Add validation schemas to all inputs

export const updateTagMutation = async (tag: Tag) => {
  const [updatedTag] = await db
    .update(TagTable)
    .set(tag)
    .where(eq(TagTable.id, tag.id))
    .returning()
  return { tag: updatedTag }
}

export const deleteTagMutation = async (tag: Tag) => {
  const [updatedTag] = await db
    .delete(TagTable)
    .where(eq(TagTable.id, tag.id))
    .returning()
  return { tag: updatedTag }
}

export const createTagMutation = async (name: string) => {
  const [updatedTag] = await db
    .insert(TagTable)
    .values({ name: name })
    .returning()
  return { tag: updatedTag }
}

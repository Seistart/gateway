"use server"

import { getUserAuth } from "@/auth/auth-guard"
import { db } from "@/database/database"
import { Tag, tags } from "@/database/schemas/tags.schema"
import { eq } from "drizzle-orm"

export const updateTagMutation = async (tag: Tag) => {
  const [updatedTag] = await db
    .update(tags)
    .set(tag)
    .where(eq(tags.id, tag.id))
    .returning()
  return { tag: updatedTag }
}

export const deleteTagMutation = async (tag: Tag) => {
  const { session } = await getUserAuth()
  const userId = session?.user.id
  if (!userId) {
    throw "No userId"
  }
  const [updatedTag] = await db
    .delete(tags)
    .where(eq(tags.id, tag.id))
    .returning()
  return { tag: updatedTag }
}

export const createTagMutation = async (name: string) => {
  const [updatedTag] = await db.insert(tags).values({ name: name })
  return { tag: updatedTag }
}

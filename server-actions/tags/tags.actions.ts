"use server"

import { authGuard } from "@/auth/auth-guard"
import { Tag } from "@/database/schemas/tags.schema"
import { revalidatePath } from "next/cache"
import {
  createTagMutation,
  deleteTagMutation,
  updateTagMutation,
} from "./tags.mutations"
import { getAllTagsQuery } from "./tags.queries"

const revalidateTags = () => revalidatePath("/dashboard/tags")

// Private for admins
export const updateTagAction = async (tag: Tag) => {
  // TODO: Only admins can update
  await authGuard()
  await updateTagMutation(tag)
  revalidateTags()
}

// Private for admins
export const createTagAction = async (name: string) => {
  // TODO: Only admins can update
  await authGuard()
  await createTagMutation(name)
  revalidateTags()
}

// Private for admins
export const deleteTagAction = async (tag: Tag) => {
  // TODO: Only admins can update
  await authGuard()
  await deleteTagMutation(tag)
  revalidateTags()
}

// Public
export const getAllTagsAction = async () => {
  const tags = await getAllTagsQuery()
  return tags
}

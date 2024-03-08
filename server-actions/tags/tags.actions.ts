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

// TODO: Add validation schemas to all inputs

// Private for Admins
export const updateTagAction = async (tag: Tag) => {
  await authGuard()
  await updateTagMutation(tag)
  revalidatePath("/")
}

// Private for Admins
export const createTagAction = async (name: string) => {
  await authGuard()
  await createTagMutation(name)
  revalidatePath("/")
}

// Private for Admins
export const deleteTagAction = async (tag: Tag) => {
  await authGuard()
  await deleteTagMutation(tag)
  revalidatePath("/")
}

// Public
export const getAllTagsAction = async () => {
  const tags = await getAllTagsQuery()
  return tags
}

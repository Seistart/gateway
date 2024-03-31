"use server"

import { getUser } from "@/auth/auth-guard"
import { Tag } from "@/database/schemas/tags.schema"
import { revalidateTag, unstable_cache } from "next/cache"
import { Role } from "../entitlements/entitlements.models"
import {
  createTagMutation,
  deleteTagMutation,
  updateTagMutation,
} from "./tags.mutations"
import { getAllTagsQuery } from "./tags.queries"

// TODO: Add validation schemas to all inputs

// Private for Admins
export const updateTagAction = async (tag: Tag) => {
  const { entitlements } = await getUser()
  if (!entitlements || entitlements.role !== Role.Admin) {
    throw "Access Denied"
  }
  await updateTagMutation(tag)
  revalidateTag("tags")
}

// Private for Admins
export const createTagAction = async (name: string) => {
  const { entitlements } = await getUser()
  if (!entitlements || entitlements.role !== Role.Admin) {
    throw "Access Denied"
  }
  await createTagMutation(name)
  revalidateTag("tags")
}

// Private for Admins
export const deleteTagAction = async (tag: Tag) => {
  const { entitlements } = await getUser()
  if (!entitlements || entitlements.role !== Role.Admin) {
    throw "Access Denied"
  }
  await deleteTagMutation(tag)
  revalidateTag("tags")
}

// Public
export const getAllTagsAction = unstable_cache(
  async () => {
    const tags = await getAllTagsQuery()
    return tags
  },
  ["tags"],
  { tags: ["tags"] }
)

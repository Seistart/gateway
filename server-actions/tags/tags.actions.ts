"use server"

import { getUser } from "@/auth/auth-guard"
import { Tag } from "@/database/schemas/tags.schema"
import { revalidatePath } from "next/cache"
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
  revalidatePath("/")
}

// Private for Admins
export const createTagAction = async (name: string) => {
  const { entitlements } = await getUser()
  if (!entitlements || entitlements.role !== Role.Admin) {
    throw "Access Denied"
  }
  await createTagMutation(name)
  revalidatePath("/")
}

// Private for Admins
export const deleteTagAction = async (tag: Tag) => {
  const { entitlements } = await getUser()
  if (!entitlements || entitlements.role !== Role.Admin) {
    throw "Access Denied"
  }
  await deleteTagMutation(tag)
  revalidatePath("/")
}

// Public
export const getAllTagsAction = async () => {
  const tags = await getAllTagsQuery()
  return tags
}

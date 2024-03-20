"use server"

import { getUser } from "@/auth/auth-guard"
import {
  NewProjectSchema,
  NewProjectWithTagsParams,
} from "@/database/schemas/projects.schema"
import { revalidatePath } from "next/cache"
import { Permission } from "../entitlements/entitlements.models"
import {
  addTagsToProjectMutation,
  createProjectMutation,
  deleteProjectMutation,
  updateProjectMutation,
} from "./projects.mutations"
import {
  getAllProjectsQuery,
  getProjectByIdQuery,
  getProjectBySlugQuery,
  getProjectsByUserQuery,
} from "./projects.queries"

// TODO: Add validation schemas to all inputs
// TODO: Add proper logs and error handling

// User must have ProjectSelfWrite
export const createProjectWithTagsAction = async (
  newProjectWithTagsParams: NewProjectWithTagsParams
) => {
  const { entitlements, userId } = await getUser()
  if (
    !userId ||
    !entitlements ||
    !entitlements.permissions[Permission.ProjectSelfWrite]
  ) {
    throw "Access Denied"
  }
  const { tags, ...newProject } = newProjectWithTagsParams
  const payload = NewProjectSchema.parse(newProject)
  const { project } = await createProjectMutation(payload, userId)
  await addTagsToProjectMutation(project.id, tags, userId)
  revalidatePath("/")
  return project.slug
}

// User must have ProjectSelfEdit and be editing their own project or have ProjectAllEdit
export const updateProjectWithTagsAction = async (
  newProjectWithTagsParams: NewProjectWithTagsParams,
  projectId: number
) => {
  const { entitlements, userId } = await getUser()
  if (
    userId &&
    entitlements &&
    ((entitlements.permissions[Permission.ProjectSelfEdit] &&
      newProjectWithTagsParams.userId === userId) ||
      entitlements.permissions[Permission.ProjectAllEdit])
  ) {
    const { tags, ...newProject } = newProjectWithTagsParams
    const payload = NewProjectSchema.parse(newProject)
    const { project } = await updateProjectMutation(projectId, payload, userId)
    await addTagsToProjectMutation(project.id, tags, userId)
    revalidatePath("/")
    return project.slug
  } else {
    throw "Access Denied"
  }
}

// User must have ProjectSelfDelete and be deleting their own project or have ProjectAllDelete
export const deleteProjectAction = async (projectId: number) => {
  const { entitlements, userId } = await getUser()
  if (
    userId &&
    entitlements &&
    (entitlements.permissions[Permission.ProjectAllDelete] ||
      entitlements.permissions[Permission.ProjectSelfDelete])
  ) {
    const project = await getProjectByIdQuery(projectId)
    console.log(projectId)
    if (
      (entitlements.permissions[Permission.ProjectSelfDelete] &&
        project.userId === userId) ||
      entitlements.permissions[Permission.ProjectAllDelete]
    ) {
      await deleteProjectMutation(projectId)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for 1 second (not recommended for production)
      revalidatePath("/")
    } else {
      throw "Access Denied"
    }
  } else {
    throw "Access Denied"
  }
}

// Public
export const getAllProjectsAction = async () => {
  const projects = await getAllProjectsQuery()
  return projects
}

// Public
export const getAllProjectsByUserAction = async (userId: string) => {
  const projects = await getProjectsByUserQuery(userId)
  return projects
}

// Public
export const getProjectBySlugAction = async (slug: string) => {
  const project = await getProjectBySlugQuery(slug)
  return project
}

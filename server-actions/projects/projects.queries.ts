import { getUserAuth } from "@/auth/auth-guard"
import { db } from "@/database/database"
import { CompleteProject, projects } from "@/database/schemas/projects.schema"
import { projectTags, tags } from "@/database/schemas/tags.schema"
import { and, eq } from "drizzle-orm"

export const getAllProjectsQuery = async () => {
  const rows = await db
    .select()
    .from(projects)
    .leftJoin(projectTags, eq(projects.id, projectTags.projectId))
    .leftJoin(tags, eq(projectTags.tagId, tags.id))

  const projectsWithTags = new Map()
  rows.forEach((row) => {
    const project = row.projects
    const tag = row.tags?.name
    if (!projectsWithTags.has(project.id)) {
      projectsWithTags.set(project.id, { ...project, tags: [] })
    }
    if (tag) {
      const projectToUpdate = projectsWithTags.get(project.id)
      projectToUpdate.tags.push(tag)
    }
  })
  const finalProjects = Array.from(projectsWithTags.values())
  return { projects: finalProjects as CompleteProject[] }
}

export const getProjectBySlugQuery = async (projectSlug: string) => {
  const rows = await db
    .select()
    .from(projects)
    .leftJoin(projectTags, eq(projects.id, projectTags.projectId))
    .leftJoin(tags, eq(projectTags.tagId, tags.id))
    .where(and(eq(projects.slug, projectSlug)))

  const projectsWithTags = new Map()
  rows.forEach((row) => {
    const project = row.projects
    const tag = row.tags?.name
    if (!projectsWithTags.has(project.slug)) {
      projectsWithTags.set(project.slug, { ...project, tags: [] })
    }
    if (tag) {
      const projectToUpdate = projectsWithTags.get(project.slug)
      projectToUpdate.tags.push(tag)
    }
  })

  const finalProject = projectsWithTags.get(projectSlug)
  return { project: finalProject as CompleteProject }
}

export const getProjectsByUserQuery = async () => {
  const { session } = await getUserAuth()
  const rows = await db
    .select()
    .from(projects)
    .leftJoin(projectTags, eq(projects.id, projectTags.projectId))
    .leftJoin(tags, eq(projectTags.tagId, tags.id))
    .where(eq(projects.userId, session?.user.id!))
  const projectsWithTags = new Map()
  rows.forEach((row) => {
    const project = row.projects
    const tag = row.tags?.name
    if (!projectsWithTags.has(project.id)) {
      projectsWithTags.set(project.id, { ...project, tags: [] })
    }
    if (tag) {
      const projectToUpdate = projectsWithTags.get(project.id)
      projectToUpdate.tags.push(tag)
    }
  })
  const finalProjects = Array.from(projectsWithTags.values())
  return { projects: finalProjects as CompleteProject[] }
}

//
export const getProjectTagIdsQuery = async (projectId: number) => {
  const rows = await db
    .select({ tagId: projectTags.tagId })
    .from(projectTags)
    .where(eq(projectTags.projectId, projectId))
  return rows.map((tag) => tag.tagId)
}

import { db } from "@/database/database"
import { Project, ProjectTable } from "@/database/schemas/projects.schema"
import { ProjectTagTable, TagTable } from "@/database/schemas/tags.schema"
import { and, eq } from "drizzle-orm"

// TODO: Add validation schemas to all inputs
// TODO: Add proper logs and error handling

export const getAllProjectsQuery = async () => {
  const rows = await db
    .select()
    .from(ProjectTable)
    .leftJoin(ProjectTagTable, eq(ProjectTable.id, ProjectTagTable.projectId))
    .leftJoin(TagTable, eq(ProjectTagTable.tagId, TagTable.id))

  const projectsWithTags = new Map()
  rows.forEach((row) => {
    const project = row.project
    const tag = row.tag?.name
    if (!projectsWithTags.has(project.id)) {
      projectsWithTags.set(project.id, { ...project, tags: [] })
    }
    if (tag) {
      const projectToUpdate = projectsWithTags.get(project.id)
      projectToUpdate.tags.push(tag)
    }
  })
  const finalProjects = Array.from(projectsWithTags.values())
  return { projects: finalProjects as Project[] }
}

export const getProjectBySlugQuery = async (projectSlug: string) => {
  const rows = await db
    .select()
    .from(ProjectTable)
    .leftJoin(ProjectTagTable, eq(ProjectTable.id, ProjectTagTable.projectId))
    .leftJoin(TagTable, eq(ProjectTagTable.tagId, TagTable.id))
    .where(and(eq(ProjectTable.slug, projectSlug)))

  if (rows.length === 0) {
    throw new Error(`No project found for slug "${projectSlug}"`)
  }
  const projectsWithTags = new Map()
  rows.forEach((row) => {
    const project = row.project
    const tag = row.tag?.name
    if (!projectsWithTags.has(project.slug)) {
      projectsWithTags.set(project.slug, { ...project, tags: [] })
    }
    if (tag) {
      const projectToUpdate = projectsWithTags.get(project.slug)
      projectToUpdate.tags.push(tag)
    }
  })

  const finalProject = projectsWithTags.get(projectSlug)
  return { project: finalProject as Project }
}

export const getProjectsByUserQuery = async (userId: string) => {
  const rows = await db
    .select()
    .from(ProjectTable)
    .leftJoin(ProjectTagTable, eq(ProjectTable.id, ProjectTagTable.projectId))
    .leftJoin(TagTable, eq(ProjectTagTable.tagId, TagTable.id))
    .where(eq(ProjectTable.userId, userId))
  const projectsWithTags = new Map()
  rows.forEach((row) => {
    const project = row.project
    const tag = row.tag?.name
    if (!projectsWithTags.has(project.id)) {
      projectsWithTags.set(project.id, { ...project, tags: [] })
    }
    if (tag) {
      const projectToUpdate = projectsWithTags.get(project.id)
      projectToUpdate.tags.push(tag)
    }
  })
  const finalProjects = Array.from(projectsWithTags.values())
  return { projects: finalProjects as Project[] }
}

export const getProjectByIdQuery = async (id: number) => {
  try {
    const [project] = await db
      .select()
      .from(ProjectTable)
      .where(and(eq(ProjectTable.id, id)))
    return project
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again"
    console.error(message)
    throw { error: message }
  }
}

export const getProjectTagIdsQuery = async (projectId: number) => {
  const rows = await db
    .select({ tagId: ProjectTagTable.tagId })
    .from(ProjectTagTable)
    .where(eq(ProjectTagTable.projectId, projectId))
  return rows.map((tag) => tag.tagId)
}

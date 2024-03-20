import {
  InsertProjectSchema,
  ProjectsResponseSchema,
  projectTagSchema,
} from "@/database/schemas/projects.schema"
import { getMockFn } from "@/utils/mock.utils"

// Convert the z.enum to an array
const tags = projectTagSchema.options

const generateTags = (existingTags = [] as string[], projectType: string) => {
  const allExcludedTags = [...existingTags, projectType]

  const filteredTags = tags.filter((tag) => !allExcludedTags.includes(tag))

  const shuffledTags = filteredTags.sort(() => 0.5 - Math.random())

  return shuffledTags.slice(0, 2)
}

export const getMockProjects = getMockFn(ProjectsResponseSchema)

export const mockProjects = (size: number) => {
  return getMockProjects({
    length: size,
    overrideFn: (project) => {
      const _projectType = tags[Math.floor(Math.random() * tags.length)]
      return {
        ...project,
        mainTag: _projectType,
        tags: [_projectType, ...generateTags([], _projectType)],
        communitySize: Math.round(Math.random() * 100000),
      }
    },
  })
}

export const getMockProject = getMockFn(InsertProjectSchema)
export const mockProject = getMockProject({
  overrideFn: (entry) => ({
    ...entry,
    projectType: "Dex",
  }),
})

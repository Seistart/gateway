import {
  ProjectWithTagsSchema,
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
        projectType: _projectType,
        tags: [_projectType, ...generateTags([], _projectType)],
        communitySize: Math.round(Math.random() * 100000),
      }
    },
  })
}

export const getMockProject = getMockFn(ProjectWithTagsSchema)
export const mockProject = getMockProject({
  overrideFn: (project) => {
    const _projectType = tags[Math.floor(Math.random() * tags.length)]
    project.projectType = _projectType
    project.tags = [_projectType, ...generateTags([], _projectType)]
    project.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"

    return {
      ...project,
    }
  },
})

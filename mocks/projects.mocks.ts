import {
  ProjectWithTagsSchema,
  ProjectsResponseSchema,
} from "@/database/schemas/projects.schema"
import { getMockFn, stages } from "@/utils/mock.utils"
import { faker } from "@faker-js/faker"
import { generateTags, tags } from "./tags.mock"

// Assuming these functions simulate fetching file names from the directories
const listBackgroundImages = (): string[] => {
  return [
    "dob.png",
    "farmors.png",
    "goblins.png",
    "grapes.png",
    "nakedlama.png",
    "seisociety.png",
    "webump.png",
    "yakavoyager.png",
  ]
}

const listIconImages = (): string[] => {
  return ["seiyans.png"]
}

const seed = 1337 // Ensuring the use of the same seed for consistency

export const getMockProjects = getMockFn(ProjectsResponseSchema)

export const mockProjects = (size: number) => {
  return getMockProjects({
    length: size,
    seed: seed, // Explicitly setting the seed
    overrideFn: (project) => {
      const _projectType =
        tags[faker.number.int({ min: 0, max: tags.length - 1 })]
      const _projectStage =
        stages[faker.number.int({ min: 0, max: stages.length - 1 })]
      const backgroundImages = listBackgroundImages()
      const iconImages = listIconImages()
      return {
        ...project,
        mainTag: _projectType,
        tags: [_projectType, ...generateTags([], _projectType)],
        stage: _projectStage,
        communitySize: faker.number.int({ min: 0, max: 100000 }),
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        backgroundImage: `/images/projects/backgrounds/${faker.helpers.arrayElement(backgroundImages)}`,
        iconImage: `/images/projects/icons/${faker.helpers.arrayElement(iconImages)}`,
      }
    },
  })
}

export const getMockProject = getMockFn(ProjectWithTagsSchema)
export const mockProject = getMockProject({
  overrideFn: (project) => {
    const _projectType = tags[Math.floor(Math.random() * tags.length)]
    const backgroundImages = listBackgroundImages()
    const iconImages = listIconImages()
    project.mainTag = _projectType
    project.tags = [_projectType, ...generateTags([], _projectType)]
    project.description =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"

    return {
      ...project,
      backgroundImage: `/images/projects/backgrounds/${faker.helpers.arrayElement(backgroundImages)}`,
      iconImage: `/images/projects/icons/${faker.helpers.arrayElement(iconImages)}`,
    }
  },
})

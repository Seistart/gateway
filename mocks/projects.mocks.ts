import {
  InsertProjectSchema,
  ProjectsResponseSchema,
} from "@/database/schemas/projects.schema"
import { getMockFn } from "@/utils/mock.utils"

const mockTags = [
  "AI",
  "Community",
  "DeFi",
  "Developer Tools",
  "Education",
  "Exchanges (DEX)",
  "Gambling",
  "Gaming",
  "Governance",
  "Identity",
  "Infrastructure",
  "Insurance",
  "Launchpad",
  "Lending & Borrowing",
  "Marketplaces",
  "Meme Coins",
  "Metaverse",
  "NFT",
  "Payment",
  "Social",
  "Stablecoin",
  "Tools",
  "Wallets",
]

const generateTagsWithNFT = (existingTags = [] as string[]) => {
  return Array.from(
    new Set(
      existingTags.map(
        (_) => mockTags[Math.floor(Math.random() * mockTags.length)]
      )
    )
  )
}
export const getMockProjects = getMockFn(ProjectsResponseSchema)

export const mockProjects = getMockProjects({
  length: 5,
  overrideFn: (project) => {
    const newTags = generateTagsWithNFT(project.tags)
    return { ...project, tags: newTags }
  },
})

export const getMockProject = getMockFn(InsertProjectSchema)
export const mockProject = getMockProject({
  overrideFn: (entry) => ({
    ...entry,
    projectType: "Dex",
  }),
})

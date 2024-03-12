import { projectTag } from "@/database/schemas/projects.schema"
import { z } from "zod"

export const projectTagSchema = z.enum([
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
])

export const TagColorMap = {
  [projectTagSchema.enum.AI]: {
    lightColor: "#0071EB",
    darkColor: "#003F83",
    textColor: "white",
  },
  [projectTagSchema.enum.Community]: {
    lightColor: "#FF7979",
    darkColor: "#A62B2B",
    textColor: "black",
  },
  [projectTagSchema.enum.DeFi]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum["Developer Tools"]]: {
    lightColor: "#FFBA00",
    darkColor: "#AA7C00",
    textColor: "black",
  },
  [projectTagSchema.enum.Education]: {
    lightColor: "#22C32B",
    darkColor: "#0E6B3E",
    textColor: "black",
  },
  [projectTagSchema.enum["Exchanges (DEX)"]]: {
    lightColor: "#B6204C",
    darkColor: "#6B102B",
    textColor: "white",
  },
  [projectTagSchema.enum.Gambling]: {
    lightColor: "#1CF8F8",
    darkColor: "#00A4A4",
    textColor: "black",
  },
  [projectTagSchema.enum.Gaming]: {
    lightColor: "#7400A8",
    darkColor: "#470066",
    textColor: "white",
  },
  [projectTagSchema.enum.Governance]: {
    lightColor: "#B2DE4C",
    darkColor: "#779926",
    textColor: "black",
  },
  [projectTagSchema.enum.Identity]: {
    lightColor: "#767676",
    darkColor: "#393939",
    textColor: "white",
  },
  [projectTagSchema.enum.Infrastructure]: {
    lightColor: "#AD6C14",
    darkColor: "#603500",
    textColor: "black",
  },
  [projectTagSchema.enum.Insurance]: {
    lightColor: "#DE01AE",
    darkColor: "#760059",
    textColor: "black",
  },
  [projectTagSchema.enum.Launchpad]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum["Lending & Borrowing"]]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.Marketplaces]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum["Meme Coins"]]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.Metaverse]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.Payment]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.Social]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.Stablecoin]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.Tools]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.Wallets]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
  [projectTagSchema.enum.NFT]: {
    lightColor: "#225A02",
    darkColor: "#184200",
    textColor: "white",
  },
}

export const getColor = (tag: projectTag) => TagColorMap[tag] ?? TagColorMap.NFT

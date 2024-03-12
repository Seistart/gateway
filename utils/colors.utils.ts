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

type ColorMapping = {
  [key in z.infer<typeof projectTagSchema>]: {
    lightColor: string
    darkColor: string
    textColor: string
  }
}

export const TagColorMap: ColorMapping = {
  [projectTagSchema.enum.AI]: {
    lightColor: "#0071EB", // Light Blue
    darkColor: "#003F83", // Dark Blue
    textColor: "white",
  },
  [projectTagSchema.enum.Community]: {
    lightColor: "#FF7979", // Light Red
    darkColor: "#A62B2B", // Dark Red
    textColor: "black",
  },
  [projectTagSchema.enum.DeFi]: {
    lightColor: "#2E8B57", // Lighter Green (Sea Green)
    darkColor: "#225A02", // Dark Green
    textColor: "white",
  },
  [projectTagSchema.enum["Developer Tools"]]: {
    lightColor: "#FFD700", // Lighter Gold
    darkColor: "#FFBA00", // Gold
    textColor: "black",
  },
  [projectTagSchema.enum.Education]: {
    lightColor: "#32CD32", // Lighter Lime Green
    darkColor: "#22C32B", // Lime Green
    textColor: "black",
  },
  [projectTagSchema.enum["Exchanges (DEX)"]]: {
    lightColor: "#FF6347", // Lighter Tomato
    darkColor: "#B6204C", // Dark Tomato
    textColor: "white",
  },
  [projectTagSchema.enum.Gambling]: {
    lightColor: "#20B2AA", // Lighter Sea Foam
    darkColor: "#00A4A4", // Sea Foam
    textColor: "black",
  },
  [projectTagSchema.enum.Gaming]: {
    lightColor: "#9932CC", // Lighter Dark Orchid
    darkColor: "#7400A8", // Dark Orchid
    textColor: "white",
  },
  [projectTagSchema.enum.Governance]: {
    lightColor: "#ADFF2F", // Lighter Green Yellow
    darkColor: "#B2DE4C", // Green Yellow
    textColor: "black",
  },
  [projectTagSchema.enum.Identity]: {
    lightColor: "#A9A9A9", // Lighter Dark Gray
    darkColor: "#767676", // Dark Gray
    textColor: "white",
  },
  [projectTagSchema.enum.Infrastructure]: {
    lightColor: "#D2691E", // Lighter Chocolate
    darkColor: "#AD6C14", // Chocolate
    textColor: "black",
  },
  [projectTagSchema.enum.Insurance]: {
    lightColor: "#DB7093", // Lighter Pale Violet Red
    darkColor: "#DE01AE", // Pale Violet Red
    textColor: "black",
  },
  [projectTagSchema.enum.Launchpad]: {
    lightColor: "#3CB371", // Lighter Medium Sea Green
    darkColor: "#2E8B57", // Medium Sea Green
    textColor: "white",
  },
  [projectTagSchema.enum["Lending & Borrowing"]]: {
    lightColor: "#9ACD32", // Lighter Yellow Green
    darkColor: "#6B8E23", // Olive Drab
    textColor: "white",
  },
  [projectTagSchema.enum.Marketplaces]: {
    lightColor: "#48D1CC", // Lighter Medium Turquoise
    darkColor: "#20B2AA", // Medium Turquoise
    textColor: "white",
  },
  [projectTagSchema.enum["Meme Coins"]]: {
    lightColor: "#FF69B4", // Lighter Hot Pink
    darkColor: "#FF1493", // Deep Pink
    textColor: "white",
  },
  [projectTagSchema.enum.Metaverse]: {
    lightColor: "#4169E1", // Lighter Royal Blue
    darkColor: "#0000CD", // Medium Blue
    textColor: "white",
  },
  [projectTagSchema.enum.Payment]: {
    lightColor: "#FFA07A", // Lighter Light Salmon
    darkColor: "#FA8072", // Salmon
    textColor: "white",
  },
  [projectTagSchema.enum.Social]: {
    lightColor: "#BA55D3", // Lighter Medium Orchid
    darkColor: "#9370DB", // Medium Purple
    textColor: "white",
  },
  [projectTagSchema.enum.Stablecoin]: {
    lightColor: "#4682B4", // Lighter Steel Blue
    darkColor: "#4169E1", // Royal Blue
    textColor: "white",
  },
  [projectTagSchema.enum.Tools]: {
    lightColor: "#6A5ACD", // Lighter Slate Blue
    darkColor: "#483D8B", // Dark Slate Blue
    textColor: "white",
  },
  [projectTagSchema.enum.Wallets]: {
    lightColor: "#1E90FF", // Lighter Dodger Blue
    darkColor: "#00BFFF", // Deep Sky Blue
    textColor: "white",
  },
  [projectTagSchema.enum.NFT]: {
    lightColor: "#8A2BE2", // Lighter Blue Violet
    darkColor: "#4B0082", // Indigo
    textColor: "white",
  },
}

export const getColor = (tag: projectTag) => TagColorMap[tag] ?? TagColorMap.NFT

import { db } from "./database"
import { TagTable } from "./schemas/tags.schema"

const tags = [
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

async function createInitialTags() {
  for (const tag of tags) {
    console.log(tag)
    await db.insert(TagTable).values({
      name: tag,
    })
  }
}

const initTags = async () => {
  console.error("Creating Stages")
  await createInitialTags()
  console.error("Succesfully Created Tags")
  process.exit(0)
}

initTags().catch((err) => {
  console.error("Failed Creating Tags")
  console.error(err)
  process.exit(1)
})

import { db } from "./database"
import { StageTable } from "./schemas/stages.schema"

enum Stage {
  Local_Private = "Local/Private",
  Devnet = "Devnet",
  Testnet = "Testnet",
  Mainnet = "Mainnet",
}

async function createInitialStages() {
  const stages = Object.values(Stage)
  for (const stage of stages) {
    console.log(stage)
    await db.insert(StageTable).values({
      name: stage,
    })
  }
}

const initStages = async () => {
  console.error("Creating Stages")
  await createInitialStages()
  console.error("Succesfully Created Stages")
  process.exit(0)
}

initStages().catch((err) => {
  console.error("Failed Creating Stages")
  console.error(err)
  process.exit(1)
})

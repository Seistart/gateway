import { migrate } from "drizzle-orm/aws-data-api/pg/migrator"
import { db } from "./database"

const runMigrate = async () => {
  console.log("⏳ Running migrations...")

  const start = Date.now()

  await migrate(db, { migrationsFolder: "database/migrations" })

  const end = Date.now()

  console.log("✅ Migrations completed in", end - start, "ms")

  process.exit(0)
}

runMigrate().catch((err) => {
  console.error("❌ Migration failed")
  console.error(err)
  process.exit(1)
})

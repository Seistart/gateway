import { env } from "@/env.mjs"
import type { Config } from "drizzle-kit"

export default {
  schema: "./database/schemas",
  out: "./database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config

import type { Config } from "drizzle-kit"

export default {
  schema: "./database/schemas",
  out: "./database/migrations",
  driver: "pg",
} satisfies Config

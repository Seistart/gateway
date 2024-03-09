import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    MATOMO_URL: z.string().url(),
    MATOMO_SITE_ID: z.number(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    MATOMO_URL: process.env.MATOMO_URL,
    MATOMO_SITE_ID: parseInt(process.env.MATOMO_SITE_ID),
  },
})

import { adapter } from "@/database/schemas/auth.schema"
import { Entitlements } from "@/server-actions/entitlements/entitlements.models"
import { Lucia } from "lucia"

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getSessionAttributes: (attributes) => {
    return {
      entitlements: JSON.parse(attributes.entitlements) as Entitlements,
    }
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseSessionAttributes: DatabaseSessionAttributes
  }
}

interface DatabaseSessionAttributes {
  entitlements: string
}

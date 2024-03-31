import { adapter } from "@/database/schemas/auth.schema"
import { Entitlements } from "@/server-actions/entitlements/entitlements.models"
import { Lucia, TimeSpan } from "lucia"

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : undefined,
      domain:
        process.env.NODE_ENV === "production"
          ? "d3qryrn2zooyrh.cloudfront.net"
          : undefined,
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

import type { Session, User } from "lucia"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"
import { lucia } from "./lucia"

export const authGuard = async () => {
  const { session } = await validateRequest()
  if (!session) redirect("/sign-in")
}

export const getUser = async () => {
  const { session, user } = await validateRequest()
  if (!session) return { userId: undefined }
  return { userId: user.id, entitlements: session.entitlements }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null
    if (!sessionId) {
      return {
        user: null,
        session: null,
      }
    }

    const result = await lucia.validateSession(sessionId)
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        )
      }
    } catch {}
    return result
  }
)

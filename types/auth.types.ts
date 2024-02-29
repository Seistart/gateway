export type AuthSession = {
  session: {
    user: AuthUser
  } | null
}

export interface AuthUser {
  id: string
  name?: string
  email?: string
  username?: string
}

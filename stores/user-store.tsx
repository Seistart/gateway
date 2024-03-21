import { CompletUserProfile } from "@/database/schemas/profiles.schema"
import { create } from "zustand"

export type UserState = {
  userProfile: CompletUserProfile | null
}

export type UserActions = {
  setUserProfile: (userProfile: CompletUserProfile | null) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  userProfile: null,
}

export const createUserStore = (initState: UserState = defaultInitState) => {
  return create<UserStore>((set) => ({
    ...initState,
    setUserProfile: (userProfile: CompletUserProfile | null) =>
      set({ userProfile }),
  }))
}

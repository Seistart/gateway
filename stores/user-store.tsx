import { CompletUserProfile } from "@/database/schemas/profiles.schema"
import { create } from "zustand"

export type UserState = {
  userProfile: CompletUserProfile | null
}

export type UserActions = {
  setUserProfile: (userProfile: CompletUserProfile | null) => void
}

export type UserStore = UserState & UserActions

export const userStore = create<UserStore>((set) => ({
  userProfile: null,
  setUserProfile: (userProfile: CompletUserProfile | null) =>
    set({ userProfile }),
}))

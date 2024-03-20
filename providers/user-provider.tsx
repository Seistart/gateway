"use client"

import { CompletUserProfile } from "@/database/schemas/profiles.schema"
import { createUserStore, type UserStore } from "@/stores/user-store"
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react"
import { useStore, type StoreApi } from "zustand"

export const UserStoreContext = createContext<StoreApi<UserStore> | null>(null)

export interface UserStoreProviderProps {
  children: ReactNode
}

export const UserStoreProvider = ({
  children,
  initialUserProfile,
}: UserStoreProviderProps & {
  initialUserProfile: CompletUserProfile | null
}) => {
  const storeRef = useRef<StoreApi<UserStore>>()
  if (!storeRef.current) {
    storeRef.current = createUserStore({ userProfile: initialUserProfile })
  }

  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.setState({ userProfile: initialUserProfile })
    }
  }, [initialUserProfile])

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`)
  }

  return useStore(userStoreContext, selector)
}

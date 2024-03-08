"use server"

import { addWalletMutation, deleteWalletMutation } from "./wallets.mutations"
import { getAllWalletsQuery } from "./wallets.queries"

// Public
export const getAllWalletsAction = async () => {
  const wallets = await getAllWalletsQuery()
  return wallets
}

export const addWalletAction = async (wallet: string) => {
  const wallets = await addWalletMutation(wallet)
  return wallets
}

export const deleteWalletAction = async (wallet: string) => {
  const wallets = await deleteWalletMutation(wallet)
  return wallets
}

"use client"

import { SeiWalletProvider, type SeiWalletProviderProps } from "@sei-js/react"
export function SeiProvider({ children, ...props }: SeiWalletProviderProps) {
  return <SeiWalletProvider {...props}>{children}</SeiWalletProvider>
}

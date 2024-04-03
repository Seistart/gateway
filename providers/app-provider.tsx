"use client"

import { ThemeProvider } from "@/components/theme/theme-provider"
import { config } from "@/wagmi.config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { WagmiProvider } from "wagmi"

const chainConfiguration = {
  chainId: "atlantic-2",
  restUrl: "https://rest.atlantic-2.seinetwork.io/",
  rpcUrl: "https://rpc.atlantic-2.seinetwork.io",
}
interface AppProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()
const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}

export default AppProvider

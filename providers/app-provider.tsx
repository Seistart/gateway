import { SeiProvider } from "@/components/sei/sei-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ReactNode } from "react"

const chainConfiguration = {
  chainId: "atlantic-2",
  restUrl: "https://rest.atlantic-2.seinetwork.io/",
  rpcUrl: "https://rpc.atlantic-2.seinetwork.io",
}
interface AppProviderProps {
  children: ReactNode
}
const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      disableTransitionOnChange
    >
      <SeiProvider
        wallets={["compass"]}
        chainConfiguration={chainConfiguration}
      >
        {children}
      </SeiProvider>
    </ThemeProvider>
  )
}

export default AppProvider

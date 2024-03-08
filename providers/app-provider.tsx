import { SeiProvider } from "@/components/sei/sei-provider"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { CompletUserProfile } from "@/database/schemas/profiles.schema"
import { UserStoreProvider } from "@/providers/user-provider"
import { ReactNode } from "react"

const chainConfiguration = {
  chainId: "atlantic-2",
  restUrl: "https://rest.atlantic-2.seinetwork.io/",
  rpcUrl: "https://rpc.atlantic-2.seinetwork.io",
}
interface AppProviderProps {
  children: ReactNode
  initialUserProfile: CompletUserProfile | null
}
const AppProvider = ({ children, initialUserProfile }: AppProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      disableTransitionOnChange
    >
      <SeiProvider
        wallets={["compass"]}
        chainConfiguration={chainConfiguration}
        autoConnect={"compass"}
      >
        <UserStoreProvider initialUserProfile={initialUserProfile}>
          {children}
        </UserStoreProvider>
      </SeiProvider>
    </ThemeProvider>
  )
}

export default AppProvider

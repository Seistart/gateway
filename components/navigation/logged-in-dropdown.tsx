"use client"

import { CompletUserProfile } from "@/database/schemas/profiles.schema"
import { signOutAction } from "@/server-actions/users/users.actions"
import { addWalletAction } from "@/server-actions/wallets/wallets.actions"
import { userStore } from "@/stores/user-store"
import { preventDefaultAction } from "@/utils/react-event-handlers.utils"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useTransition } from "react"
import { useAccount, useDisconnect } from "wagmi"
import { ConnectWallet } from "../evm/connect-wallet"
import { ThemeRadioGroup } from "../theme/theme-radio-group"
import { Badge } from "../ui/badge"
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu"

interface LoggedInDropdownProps {
  userProfile: CompletUserProfile
  setDropdownOpen: (status: boolean) => void
}

export const LoggedInDropdown = ({ userProfile }: LoggedInDropdownProps) => {
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const mainWalletAddress = userProfile.mainWallet.walletAddress
  const mainWalletAddressConnected = address === mainWalletAddress
  const otherWalletLinked = userProfile.wallets.some(
    (wallet) => (wallet.walletAddress = address as string)
  )
  const { setUserProfile } = userStore()
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          {address ? (
            <div className="text-sm">
              {`${address.substring(0, 6)}...${address.substring(address.length - 3)}`}
              <Badge className="ml-2">
                {mainWalletAddressConnected
                  ? "Main"
                  : otherWalletLinked
                    ? "Linked"
                    : "Unlinked"}
              </Badge>
            </div>
          ) : (
            <p className="text-sm">
              {`${mainWalletAddress.substring(0, 6)}...${mainWalletAddress.substring(mainWalletAddress.length - 3)}`}
              <Badge className="ml-2">Main</Badge>
            </p>
          )}
        </div>
      </DropdownMenuLabel>
      <DropdownMenuItem disabled>
        {address ? "Connected" : "Not Connected"}
      </DropdownMenuItem>
      {!otherWalletLinked && address && !mainWalletAddressConnected && (
        <DropdownMenuItem
          onSelect={async (event) => {
            preventDefaultAction(event)
            await addWalletAction(address)
          }}
        >
          Link Wallet
        </DropdownMenuItem>
      )}
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Wallets</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <span>Theme</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <ThemeRadioGroup></ThemeRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
      <DropdownMenuSeparator />

      {isConnected ? (
        <>
          <DropdownMenuItem
            onSelect={() => {
              disconnect()
            }}
          >
            Disconnect Wallet
          </DropdownMenuItem>
        </>
      ) : (
        <DropdownMenuItem asChild>
          <ConnectWallet></ConnectWallet>
        </DropdownMenuItem>
      )}

      <DropdownMenuSeparator />
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault()
          startTransition(async () => {
            await signOutAction()
            setUserProfile(null)
          })
        }}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Sign Out"
        )}
      </DropdownMenuItem>
    </>
  )
}

"use client"

import { CompletUserProfile } from "@/database/schemas/profiles.schema"
import { signOutAction } from "@/server-actions/users/users.actions"
import { addWalletAction } from "@/server-actions/wallets/wallets.actions"
import { preventDefaultAction } from "@/utils/react-event-handlers.utils"
import { SeiWallet } from "@sei-js/core"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
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
  disconnect: () => void
  connectWallet: () => void
  connectedWallet?: SeiWallet
  walletAddress: string
}

export const LoggedInDropdown = ({
  userProfile,
  setDropdownOpen,
  disconnect,
  connectWallet,
  connectedWallet,
  walletAddress,
}: LoggedInDropdownProps) => {
  const mainWalletAddress = userProfile.mainWallet.walletAddress
  const mainWalletAddressConnected = walletAddress === mainWalletAddress
  const otherWalletLinked = userProfile.wallets.some(
    (wallet) => (wallet.walletAddress = walletAddress)
  )
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  return (
    <>
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          {walletAddress ? (
            <p className="text-sm">
              {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 3)}`}
              <Badge className="ml-2">
                {mainWalletAddressConnected
                  ? "Main"
                  : otherWalletLinked
                    ? "Linked"
                    : "Unlinked"}
              </Badge>
            </p>
          ) : (
            <p className="text-sm">
              {`${mainWalletAddress.substring(0, 6)}...${mainWalletAddress.substring(mainWalletAddress.length - 3)}`}
              <Badge className="ml-2">Main</Badge>
            </p>
          )}
        </div>
      </DropdownMenuLabel>
      <DropdownMenuItem disabled>
        {walletAddress ? "Connected" : "Not Connected"}
      </DropdownMenuItem>
      {!otherWalletLinked && walletAddress && (
        <DropdownMenuItem
          onSelect={async (event) => {
            preventDefaultAction(event)
            await addWalletAction(walletAddress)
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

      {connectedWallet ? (
        <>
          <DropdownMenuItem
            onSelect={() => {
              disconnect()
              connectWallet()
            }}
          >
            Change Wallet
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => {
              disconnect()
            }}
          >
            Disconnect Wallet
          </DropdownMenuItem>
        </>
      ) : (
        <DropdownMenuItem
          onSelect={() => {
            connectWallet()
          }}
        >
          Connect Wallet
        </DropdownMenuItem>
      )}

      <DropdownMenuSeparator />
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault()
          startTransition(() => {
            signOutAction(pathname)
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

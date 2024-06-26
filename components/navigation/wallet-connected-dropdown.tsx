"use client"

import useSignIn from "@/hooks/use-sign-in"
import { SeiWallet } from "@sei-js/core"
import { Loader2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { ThemeRadioGroup } from "../theme/theme-radio-group"
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

interface WalletConnectedDropdownProps {
  connectedWallet: SeiWallet
  walletAddress: string
  disconnect: () => void
  connectWallet: () => void
  setDropdownOpen: (status: boolean) => void
}

export const WalletConnectedDropdown = ({
  setDropdownOpen,
  connectedWallet,
  disconnect,
  walletAddress,
  connectWallet,
}: WalletConnectedDropdownProps) => {
  const pathName = usePathname()
  const { signIn, isSigningIn } = useSignIn(
    connectedWallet,
    walletAddress,
    pathName
  )

  return (
    <>
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          <p className="text-sm">
            {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 3)}`}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        disabled={isSigningIn}
        onSelect={async (event) => {
          event.preventDefault()
          await signIn()
        }}
      >
        {isSigningIn ? (
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </div>
        ) : (
          "Sign In With Wallet"
        )}
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        Sign in with a different wallet first if you prefer to link this wallet
        to an existing one.
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Set Theme</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <ThemeRadioGroup></ThemeRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onSelect={() => {
          disconnect()
          connectWallet()
        }}
      >
        Change Wallet
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => disconnect()}>
        Disconnect Wallet
      </DropdownMenuItem>
    </>
  )
}

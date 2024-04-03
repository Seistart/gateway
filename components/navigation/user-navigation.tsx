"use client"

import { getCompleteUserProfileAction } from "@/server-actions/user-profile/user-profile.actions"
import { userStore } from "@/stores/user-store"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { ConnectWallet } from "../evm/connect-wallet"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { LoggedInDropdown } from "./logged-in-dropdown"
import { WalletConnectedDropdown } from "./wallet-connected-dropdown"

export const UserNavigation = () => {
  const { isConnected, address } = useAccount()
  const { userProfile, setUserProfile } = userStore()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    async function getUserProfile() {
      setIsLoading(true)
      const { userProfile } = await getCompleteUserProfileAction()
      setUserProfile(userProfile)
      setIsLoading(false)
    }
    getUserProfile()
  }, [setUserProfile])

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  if (isLoading) {
    return <>loading...</>
  }
  return (
    <>
      {isConnected || userProfile ? (
        <DropdownMenu
          open={isDropdownOpen}
          onOpenChange={() => setDropdownOpen(!isDropdownOpen)}
        >
          <DropdownMenuTrigger asChild>
            <Button
              className="h-10 w-10 rounded-full"
              size="icon"
              variant="ghost"
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-full"
                />
                <AvatarFallback>
                  <div className="h-10 w-10 animate-pulse rounded-full bg-primary/10"></div>
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="end"
            forceMount
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {userProfile ? (
              <LoggedInDropdown
                userProfile={userProfile}
                setDropdownOpen={setDropdownOpen}
              ></LoggedInDropdown>
            ) : (
              address && (
                <WalletConnectedDropdown
                  walletAddress={address as string}
                  setDropdownOpen={setDropdownOpen}
                ></WalletConnectedDropdown>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ConnectWallet></ConnectWallet>
      )}
    </>
  )
}

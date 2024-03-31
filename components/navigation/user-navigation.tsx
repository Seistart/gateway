"use client"

import { getCompleteUserProfileAction } from "@/server-actions/user-profile/user-profile.actions"
import { userStore } from "@/stores/user-store"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useSelectWallet, useWallet } from "@sei-js/react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { LoggedInDropdown } from "./logged-in-dropdown"
import { WalletConnectedDropdown } from "./wallet-connected-dropdown"

export const UserNavigation = () => {
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
  const { connectedWallet, disconnect, accounts } = useWallet()
  const { openModal: connectWallet } = useSelectWallet()

  if (isLoading) {
    return <>loading...</>
  }
  return (
    <>
      {connectedWallet || userProfile ? (
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
                disconnect={disconnect}
                connectWallet={connectWallet}
                connectedWallet={connectedWallet}
                walletAddress={accounts[0]?.address}
              ></LoggedInDropdown>
            ) : (
              connectedWallet && (
                <WalletConnectedDropdown
                  disconnect={disconnect}
                  connectedWallet={connectedWallet}
                  walletAddress={accounts[0].address}
                  setDropdownOpen={setDropdownOpen}
                  connectWallet={connectWallet}
                ></WalletConnectedDropdown>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </>
  )
}

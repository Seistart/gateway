"use client"

import { getCompleteUserProfileAction } from "@/server-actions/user-profile/user-profile.actions"
import { userStore } from "@/stores/user-store"
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
            <Button className="my-0 py-8">Profile</Button>
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
        <Button onClick={connectWallet} className="h-full">
          Connect Wallet
        </Button>
      )}
    </>
  )
}

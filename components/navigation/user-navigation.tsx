"use client"

import { useSelectWallet, useWallet } from "@sei-js/react"
import { useState } from "react"
import { useUserStore } from "../../providers/user-provider"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { LoggedInDropdown } from "./logged-in-dropdown"
import { WalletConnectedDropdown } from "./wallet-connected-dropdown"

export const UserNavigation = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const userProfile = useUserStore((store) => store.userProfile)
  const { connectedWallet, disconnect, accounts } = useWallet()
  const { openModal: connectWallet } = useSelectWallet()
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
        <Button onClick={connectWallet}>Connect Wallet</Button>
      )}
    </>
  )
}

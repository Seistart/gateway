"use client"

import { Wallet } from "@/database/schemas/wallets.schema"

interface WalletsProps {
  wallets: Wallet[]
}

export const Wallets = ({ wallets }: WalletsProps) => {
  return (
    <main>
      <div className="relative">
        <h1 className="my-2 text-2xl font-semibold">Wallets</h1>
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.id + wallet.walletAddress}>
              {wallet.walletAddress}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

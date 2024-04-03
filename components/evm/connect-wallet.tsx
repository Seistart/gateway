import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { WalletOptions } from "./wallet-options"
export function ConnectWallet() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <WalletOptions></WalletOptions>
      </DialogContent>
    </Dialog>
  )
}

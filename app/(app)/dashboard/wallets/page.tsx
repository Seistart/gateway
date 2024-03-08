import { Wallets } from "@/components/pages/wallets"
import { getAllWalletsAction } from "@/server-actions/wallets/wallets.actions"

export default async function ProjectsPage() {
  const { wallets } = await getAllWalletsAction()
  return <Wallets wallets={wallets}></Wallets>
}

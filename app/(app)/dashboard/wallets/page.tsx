import { getUser } from "@/auth/auth-guard"
import { Wallets } from "@/components/pages/wallets"
import { getAllWalletsAction } from "@/server-actions/wallets/wallets.actions"
import { redirect } from "next/navigation"

export default async function ProjectsPage() {
  const { userId } = await getUser()
  if (!userId) {
    redirect("/")
  }
  const { wallets } = await getAllWalletsAction()
  return <Wallets wallets={wallets}></Wallets>
}

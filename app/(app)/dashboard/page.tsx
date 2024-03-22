import { getUser } from "@/auth/auth-guard"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const { userId } = await getUser()
  if (!userId) {
    redirect("/")
  }
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="my-2 text-2xl font-bold">Home</h1>
      </div>
    </>
  )
}

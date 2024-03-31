import { getUser } from "@/auth/auth-guard"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await getUser()
  if (!userId) {
    redirect("/")
  }
  return (
    <>
      <div className="flex h-screen">
        <DashboardSidebar></DashboardSidebar>
        <div className="flex-1 overflow-y-auto p-8 pt-2 md:p-8">{children}</div>
      </div>
    </>
  )
}

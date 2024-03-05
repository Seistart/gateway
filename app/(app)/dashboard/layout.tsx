import { getUserAuth } from "@/auth/auth-guard"
import { AdminDashboardSidebar } from "@/components/dashboard/admin-dashboard-sidebar"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { session } = await getUserAuth()
  if (!session) redirect("/sign-in")
  return (
    <>
      <div className="flex h-screen">
        <AdminDashboardSidebar></AdminDashboardSidebar>
        <div className="flex-1 overflow-y-auto p-8 pt-2 md:p-8">{children}</div>
      </div>
    </>
  )
}

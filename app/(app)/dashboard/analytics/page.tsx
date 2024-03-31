import { getUser } from "@/auth/auth-guard"
import { Role } from "@/server-actions/entitlements/entitlements.models"
import { redirect } from "next/navigation"

export default async function AnalyticsPage() {
  const { entitlements } = await getUser()
  if (!entitlements || entitlements.role !== Role.Admin) redirect("/")
  return <h1 className="my-4 text-2xl font-semibold">Analytics</h1>
}

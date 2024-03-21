import { getUser } from "@/auth/auth-guard"
import { Role } from "@/server-actions/entitlements/entitlements.models"
import { redirect } from "next/navigation"

export default async function EcosystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { entitlements } = await getUser()
  if (!entitlements || entitlements.role !== Role.Admin) redirect("/")
  return <>{children}</>
}

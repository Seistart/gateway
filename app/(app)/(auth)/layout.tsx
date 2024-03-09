import { getUserAuth } from "@/auth/auth-guard"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getUserAuth()
  if (session?.session) redirect("/dashboard")
  return <div className="h-screen bg-muted pt-8">{children}</div>
}

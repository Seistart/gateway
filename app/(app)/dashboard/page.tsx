import { getUserAuth } from "@/auth/auth-guard"
import SignOutBtn from "@/components/auth/sign-out-button"

export default async function DashboardPage() {
  const { session } = await getUserAuth()
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="my-2 text-2xl font-bold">Home</h1> <SignOutBtn />
      </div>
      <pre className="my-2 rounded-lg bg-secondary p-4">
        {session?.user.email}
      </pre>
    </>
  )
}

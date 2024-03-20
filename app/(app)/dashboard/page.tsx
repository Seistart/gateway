import SignOutBtn from "@/components/auth/sign-out-button"

export default async function DashboardPage() {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="my-2 text-2xl font-bold">Home</h1> <SignOutBtn />
      </div>
    </>
  )
}

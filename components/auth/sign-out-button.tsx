"use client"

import { signOutAction } from "@/server-actions/users/users.actions"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"

export default function SignOutBtn() {
  return (
    <form action={signOutAction}>
      <Btn />
    </form>
  )
}

const Btn = () => {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} variant={"destructive"}>
      Sign{pending ? "ing" : ""} out
    </Button>
  )
}

import {
  generateSignedMessageAction,
  singInSignUpAction,
} from "@/server-actions/users/users.actions"
import { userStore } from "@/stores/user-store"
import { useState } from "react"
import { useAccount, useSignMessage } from "wagmi"
function useSignIn(pathName: string) {
  const { setUserProfile } = userStore()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const { isConnected, address } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const signIn = async () => {
    setIsSigningIn(true)
    try {
      if (isConnected) {
        const { jwt, message } = await generateSignedMessageAction(
          address as string
        )
        const signature = (await signMessageAsync({
          message: JSON.stringify(message),
        })) as string
        if (signature) {
          const userProfile = await singInSignUpAction(signature, jwt)
          setUserProfile(userProfile)
        }
      }
    } catch (error) {
      console.error("Sign in failed:", error)
    } finally {
      setIsSigningIn(false)
    }
  }

  return { isSigningIn, signIn }
}

export default useSignIn

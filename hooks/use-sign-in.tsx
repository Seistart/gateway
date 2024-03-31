import {
  generateSignedMessageAction,
  singInSignUpAction,
} from "@/server-actions/users/users.actions"
import { userStore } from "@/stores/user-store"
import { SeiWallet } from "@sei-js/core"
import { useState } from "react"

function useSignIn(
  connectedWallet: SeiWallet,
  walletAddress: string,
  pathName: string
) {
  const { setUserProfile } = userStore()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const signIn = async () => {
    setIsSigningIn(true)
    try {
      if (connectedWallet?.signArbitrary) {
        const { jwt, message } =
          await generateSignedMessageAction(walletAddress)
        const signature = await connectedWallet.signArbitrary(
          "atlantic-2",
          walletAddress,
          JSON.stringify(message)
        )
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

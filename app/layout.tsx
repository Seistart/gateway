import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { appMetadata } from "@/config/meteada.config"
import AppProvider from "@/providers/app-provider"
import { getCompleteUserProfileAction } from "@/server-actions/user-profile/user-profile.actions"
import { cn } from "@/utils/tailwind.utils"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import ErrorBoundary from "./ErrorBoundary"
import "./globals.css"
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...appMetadata.home,
}
const PRE_LAUNCH = true
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userProfile } = await getCompleteUserProfileAction()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(spaceGrotesk.className)}>
        <ErrorBoundary>
          <AppProvider initialUserProfile={userProfile}>
            <div className="min-h-100vh container mx-auto flex flex-col supports-[height:100cqh]:min-h-[100cqh] supports-[height:100dvh]:min-h-[100dvh] supports-[height:100svh]:min-h-[100svh]">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

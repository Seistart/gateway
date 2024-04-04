import { appMetadata } from "@/config/meteada.config"
import AppProvider from "@/providers/app-provider"
import { cn } from "@/utils/tailwind.utils"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...appMetadata.home,
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(spaceGrotesk.className)}>
        <AppProvider>
          <div className="min-h-100vh container mx-auto flex flex-col bg-background supports-[height:100cqh]:min-h-[100cqh] supports-[height:100dvh]:min-h-[100dvh] supports-[height:100svh]:min-h-[100svh]">
            {/* <Header /> */}
            <main className="flex">{children}</main>
            {/* <Footer /> */}
          </div>
        </AppProvider>
      </body>
    </html>
  )
}

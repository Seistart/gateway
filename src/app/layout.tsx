import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(spaceGrotesk.className)}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="container mx-auto">
            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

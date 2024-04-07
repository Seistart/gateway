import { UserProfile } from "@/database/schemas/profiles.schema"
import Image from "next/image"
import Link from "next/link"
import { NavigationMenuPage } from "./navigation/navigation"
import { UserNavigation } from "./navigation/user-navigation"
import { Button } from "./ui/button"

interface HeaderProps {
  userProfile?: UserProfile
}

export const Header = async ({}: HeaderProps) => {
  return (
    <header className="z-20 flex items-center justify-between border-b-2 border-primary/10 bg-[#1F1F1F]">
      <div className="flex-shrink- justify- flex w-full items-center">
        <Link href="/" className="mr-2">
          <Image
            src="/images/logo_850.png"
            width="50"
            height="50"
            alt="seistart"
          />
        </Link>
        <div className="hidden items-center justify-center md:flex">
          <NavigationMenuPage />
        </div>
        <div className="flex w-full items-center justify-end">
          <Button
            variant={"outline"}
            shadow={"none"}
            className="my-0 border-b-0 border-r-0 border-t-0 py-8"
          >
            32.5 SEI
          </Button>
          <UserNavigation />
        </div>
      </div>
    </header>
  )
}

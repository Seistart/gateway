import { UserProfile } from "@/database/schemas/profiles.schema"
import Image from "next/image"
import Link from "next/link"
import { MobileNavigation } from "./navigation/mobile-navigation"
import { NavigationMenuPage } from "./navigation/navigation"
import { UserNavigation } from "./navigation/user-navigation"
import { Button } from "./ui/button"

interface HeaderProps {
  userProfile?: UserProfile
}

export const Header = async ({}: HeaderProps) => {
  return (
    <header className="flex items-center border-b-2 border-primary/10">
      <div className="flex w-full items-center justify-between border-b border-black bg-white pl-10">
        <div className="flex flex-shrink-0 items-center justify-center">
          <Link href="/" className="mr-2 flex items-center">
            <h1 className="">Seistart</h1>
            <Image
              src="/images/logo_850.png"
              width="50"
              height="50"
              alt="test"
            />
          </Link>
          <div className="hidden items-center justify-center md:flex">
            <NavigationMenuPage />
          </div>
          <div className="flex items-center justify-center md:hidden">
            <MobileNavigation />
          </div>
        </div>
        <div>
          <Button
            variant={"outline"}
            className="my-0 border-b-0 border-l border-t-0 bg-white py-8"
          >
            32.5 SEI
          </Button>
          <UserNavigation />
        </div>
      </div>
    </header>
  )
}

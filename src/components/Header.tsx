import { FaBell, FaEthereum, FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";
import Image from "next/image";
import { NavigationMenuPage } from "./Navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "./theme/theme-toggle";
import Link from "next/link";

/**
 * Header component that renders a header with logo, navigation,
 * and action buttons like connect wallet.
 */
export const Header = () => {
  return (
    <header className="border-b-2 border-gray-800 flex items-center justify-between text-sm font-medium mx-6">
      <div className="flex justify-center pt-4">
        <div className="w-32">
          <Link href="/">
            <Image
              src="/images/logo_850.png"
              width="50"
              height="50"
              alt="test"
            />
          </Link>
        </div>
        <div className="h-16">
          <NavigationMenuPage />
        </div>
      </div>
      <div className="flex h-[5rem]">
        <Button>Create</Button>
        <Button variant={"outline"}>
          <div className="bg-gray-800 p-2 mr-2 rounded-full">
            <FaEthereum className="h-4 w-4 " />
          </div>
          <span className="flex">32.06 ETH</span>
        </Button>
        <Button variant={"ghost"} size="icon">
          <FaSearch className="h-4 w-4" />
        </Button>
        <Button variant={"ghost"} size="icon">
          <FaBell className="h-4 w-4" />
        </Button>
        <ThemeToggle></ThemeToggle>
        <UserNav />
      </div>
    </header>
  );
};

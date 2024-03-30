"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { preventDefaultAction } from "@/utils/react-event-handlers.utils"
import { cn } from "@/utils/tailwind.utils"
import Link from "next/link"
import { ReactNode } from "react"
import { Button } from "../ui/button"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Projects",
    href: "/projects",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Exploration",
    href: "/ecosystem",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
]

export const NavigationMenuPage = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerMove={preventDefaultAction}
            onPointerLeave={preventDefaultAction}
          >
            <Button
              variant={"outline"}
              className="my-0 border-b-0 border-l border-t-0 bg-white py-8"
            >
              Discover
            </Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerMove={preventDefaultAction}
            onPointerLeave={preventDefaultAction}
            className="z-20"
          >
            <ul className="grid w-[400px] gap-3 p-0 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps {
  className?: string
  title: string
  href: string
  children: ReactNode
}

const ListItem = ({ className, title, children, href }: ListItemProps) => {
  return (
    <li>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink>
          <div
            className={cn("p-3 transition-colors hover:bg-accent", className)}
          >
            <div className="text-sm">{title}</div>
            <p className="text-sm text-muted-foreground">{children}</p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  )
}

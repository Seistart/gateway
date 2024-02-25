"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Projects",
    href: "/projects",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Documentation",
    href: "/",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

export function NavigationMenuPage() {
  return (
    <NavigationMenu className="h-full">
      <NavigationMenuList className="h-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            Discover
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            Recruit
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <Link legacyBehavior passHref href="/">
                  <NavigationMenuLink className="flex h-full w-full select-none flex-col rounded-md from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                    <div className="mb-2 text-lg font-medium">Explore</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Find people passionate builders looking to contribute to
                      the SEI ecosystem
                    </p>
                  </NavigationMenuLink>
                </Link>
              </li>
              <ListItem href="/" title="Developers">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/" title="Artist">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/" title="Community">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Activity
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ListItemProps {
  className?: string; // Optional string
  title: string; // Required string
  href: string; // Required string
  children: React.ReactNode; // Accepts any valid React child (string, element, component, etc.)
}

// Modify the component to accept props typed with the ListItemProps interface
const ListItem: React.FC<ListItemProps> = ({
  className,
  title,
  children,
  href,
}) => {
  return (
    <li>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink>
          <div
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
};

// Setting displayName
ListItem.displayName = "ListItem";

export default ListItem;

'use client'

import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { preventDefaultAction } from '@/utils'

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Projects',
    href: '/projects',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Documentation',
    href: '/',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
]

export function NavigationMenuPage() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            onPointerMove={preventDefaultAction}
            onPointerLeave={preventDefaultAction}
          >
            Discover
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerMove={preventDefaultAction}
            onPointerLeave={preventDefaultAction}
          >
            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
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
            onPointerMove={preventDefaultAction}
            onPointerLeave={preventDefaultAction}
          >
            Recruit
          </NavigationMenuTrigger>
          <NavigationMenuContent
            onPointerMove={preventDefaultAction}
            onPointerLeave={preventDefaultAction}
          >
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <div className='row-span-3'>
                <ListItem href='/' title='Explore'>
                  Find people passionate builders looking to contribute to the
                  SEI ecosystem
                </ListItem>
              </div>
              <ListItem href='/' title='Developers'>
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href='/' title='Artist'>
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href='/' title='Community'>
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Activity
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/blog' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

interface ListItemProps {
  className?: string
  title: string
  href: string
  children: React.ReactNode
}

const ListItem = ({ className, title, children, href }: ListItemProps) => {
  return (
    <li>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink>
          <div
            className={cn(
              'rounded-md p-3 transition-colors hover:bg-accent',
              className
            )}
          >
            <div className='text-sm'>{title}</div>
            <p className='text-sm text-muted-foreground'>{children}</p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  )
}

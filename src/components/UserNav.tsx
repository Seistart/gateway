'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import { ThemeRadioGroup } from './theme/theme-radio-group'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='h-10 w-10 rounded-full' size='icon' variant='ghost'>
          <Avatar>
            <AvatarImage
              src='https://github.com/shadcn.png'
              className='rounded-full'
            />
            <AvatarFallback>
              <div className='h-10 w-10 animate-pulse rounded-full bg-primary/10'></div>
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm'>seistart</p>
            <p className='text-xs text-muted-foreground'>m@seistart.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ThemeRadioGroup></ThemeRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Disconnect Wallet</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

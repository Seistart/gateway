'use client'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useEffect, useState } from 'react'
import { RxCross2, RxHamburgerMenu } from 'react-icons/rx'

export const MobileNavigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsDrawerOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setIsDrawerOpen(true)}
        >
          <RxHamburgerMenu className='h-6 w-6' />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='fixed bottom-0 left-0 mt-24 flex h-full w-screen flex-col rounded-t-[10px] '>
        <div className='flex w-full p-2'>
          <DrawerClose className='ml-auto' asChild>
            <Button
              size='icon'
              variant='ghost'
              onClick={() => setIsDrawerOpen(false)}
            >
              <RxCross2 className='h-6 w-6'></RxCross2>
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';

export function MobileNavigation() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Listen for viewport changes and close the drawer if the viewport
  // width exceeds the breakpoint (e.g., 768px).
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsDrawerOpen(false); // Close the drawer
      }
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Call the resize function initially in case the initial viewport width is above the breakpoint
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => setIsDrawerOpen(true)}
        >
          <HamburgerMenuIcon width='20' height='20'></HamburgerMenuIcon>
        </Button>
      </DrawerTrigger>
      <DrawerContent className='flex flex-col rounded-t-[10px] h-full w-screen mt-24 fixed bottom-0 left-0 '>
        <div className='w-full p-2 flex'>
          <DrawerClose className='ml-auto' asChild>
            <Button
              size='icon'
              variant='ghost'
              onClick={() => setIsDrawerOpen(false)}
            >
              <Cross1Icon height='20' width='20'></Cross1Icon>
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

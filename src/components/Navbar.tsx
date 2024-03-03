'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { AlignRight } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <div className='mb-4 w-full border-b pb-2 md:hidden'>
      <nav className='flex w-full items-center justify-between'>
        <div className='text-lg font-semibold'>Logo</div>
        <Button variant='ghost' onClick={() => setOpen(!open)}>
          <AlignRight />
        </Button>
      </nav>
      {open ? (
        <div className='my-4 bg-muted p-4'>
          <ul className='space-y-2'></ul>
        </div>
      ) : null}
    </div>
  )
}

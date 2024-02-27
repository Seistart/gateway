import Image from 'next/image'
import Link from 'next/link'
import { FaBell, FaSearch } from 'react-icons/fa'
import { MobileNavigation } from './navigation/mobile-navigation'
import { NavigationMenuPage } from './navigation/navigation'
import { UserNavigation } from './navigation/user-navigation'
import { Button } from './ui/button'

export const Header = () => {
  return (
    <header className='flex items-center justify-between border-b-2 border-primary/10'>
      <div className='flex flex-shrink-0 items-center justify-center'>
        <Link href='/' className='mr-2'>
          <Image src='/images/logo_850.png' width='50' height='50' alt='test' />
        </Link>
        <div className='hidden items-center justify-center md:flex'>
          <NavigationMenuPage />
        </div>
        <div className='flex items-center justify-center md:hidden'>
          <MobileNavigation />
        </div>
      </div>
      <div className='flex items-center'>
        <div className='hidden items-center justify-center md:flex'>
          <Button variant='outline'>
            <span className='flex'>32.06 ETH</span>
          </Button>
          <Button variant='ghost' size='icon'>
            <FaSearch className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon'>
            <FaBell className='h-4 w-4' />
          </Button>
        </div>
        <UserNavigation />
      </div>
    </header>
  )
}

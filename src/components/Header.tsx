import Image from 'next/image';
import Link from 'next/link';
import { FaBell, FaSearch } from 'react-icons/fa';
import { MobileNavigation } from './MobileNavigation';
import { NavigationMenuPage } from './Navigation';
import { UserNav } from './UserNav';
import { Button } from './ui/button';

/**
 * Header component that renders a header with logo, navigation,
 * and action buttons like connect wallet.
 */
export const Header = () => {
  return (
    <header className='border-b-2 border-primary/10 flex items-center justify-between'>
      <div className='flex justify-center items-center flex-shrink-0'>
        <Link href='/' className='mr-2'>
          <Image src='/images/logo_850.png' width='50' height='50' alt='test' />
        </Link>
        <div className='hidden justify-center items-center md:flex'>
          <NavigationMenuPage />
        </div>
        <div className='flex justify-center items-center md:hidden'>
          <MobileNavigation />
        </div>
      </div>
      <div className='flex items-center'>
        <div className='hidden justify-center items-center md:flex'>
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
        <UserNav />
      </div>
    </header>
  );
};

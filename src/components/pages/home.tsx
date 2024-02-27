import { Paintbrush2Icon } from 'lucide-react'
import { ImageSlider } from '../ui/image-slider'
import { ProjectCard } from '../ui/project-card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

export const Home = () => {
  return (
    <div className='flex flex-col p-6'>
      <div className='mb-6 flex justify-between'>
        <div className='mb-6 flex items-center'>
          <Button
            variant={'ghost'}
            size='icon'
            className='mr-10 h-[6rem] w-[6rem]'
          >
            <Avatar className='w-18 h-18'>
              <AvatarImage
                src='https://github.com/shadcn.png'
                className='h-[6rem] w-[6rem] rounded-full'
                alt='@shadcn'
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
          <div>
            <h2 className='text-lg font-bold'>Hello, [username]</h2>
            <p className='text-sm text-gray-600'>
              A great day to get a new NFT
            </p>
          </div>
        </div>

        <div className='mb-6 flex items-end justify-end'>
          <Button variant='outline' className='mr-2'>
            Mint NFT
          </Button>
          <Button variant='outline'>Search Project</Button>
        </div>
      </div>

      <div className='mb-6 grid grid-cols-4 gap-4 text-secondary'>
        <div className='flex flex-col items-start bg-primary  p-6 pb-2'>
          <div className='mb-0 flex w-full items-start justify-between '>
            <div className='bg-tertiary flex h-12 w-12 items-center justify-center'>
              <Button variant={'ghost'} size='icon' className='text-secondary'>
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className='w-full items-start justify-start px-6 text-left'>
              <h3 className='text-xl font-bold'>124k</h3>
              <p className='mb-2 text-sm font-extralight'>Artworks</p>
              <Button variant='link' className='m-1 w-10 p-2 text-secondary'>
                View All
              </Button>
            </div>
          </div>
        </div>
        <div className='bg-quadiry flex flex-col items-start bg-primary p-6 pb-2'>
          <div className='mb-0 flex w-full items-start justify-between '>
            <div className='bg-tertiary flex h-12 w-12 items-center justify-center'>
              <Button variant={'ghost'} size='icon' className='text-secondary'>
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className='w-full items-start justify-start px-6 text-left'>
              <h3 className='text-xl font-bold'>24k</h3>
              <p className='mb-2 text-sm font-extralight'>Sales</p>
              <Button variant='link' className='m-1 w-10 p-2'>
                View All
              </Button>
            </div>
          </div>
        </div>
        <div className='bg-quadiry flex flex-col items-start bg-primary p-6 pb-2'>
          <div className='mb-0 flex w-full items-start justify-between '>
            <div className='bg-tertiary flex h-12 w-12 items-center justify-center'>
              <Button variant={'ghost'} size='icon' className='text-secondary'>
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className='w-full items-start justify-start px-6 text-left'>
              <h3 className='text-xl font-bold'>94k</h3>
              <p className='mb-2 text-sm font-extralight'>Colections</p>
              <Button variant='link' className='m-1 w-10 p-2'>
                View All
              </Button>
            </div>
          </div>
        </div>
        <div className='bg-quadiry flex flex-col items-start bg-primary p-6 pb-2'>
          <div className='mb-0 flex w-full items-start justify-between '>
            <div className='bg-tertiary flex h-12 w-12 items-center justify-center'>
              <Button variant={'ghost'} size='icon' className='text-secondary'>
                <Paintbrush2Icon />
              </Button>
            </div>
            <div className='w-full items-start justify-start px-6 text-left'>
              <h3 className='text-xl font-bold'>164</h3>
              <p className='mb-2 text-sm font-extralight'>Projects</p>
              <Button variant='link' className='m-1 w-10 p-2'>
                View All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='flex items-end justify-between'>
        <h1 className='mb-3 text-2xl font-bold'>Highlights</h1>
        <Button className='w-14 font-bold'>All</Button>
      </div>
      <ProjectCard
        title='Anthropomorphic Cats'
        subtitle='Subtitle'
        count={2400}
        imgSrc='/images/image1.png'
        smallImgSrcs={[
          '/images/image1.png',
          '/images/image2.png',
          '/images/image3.png',
        ]}
        buttonLabel='View'
      />

      <div className='flex items-end justify-between'>
        <h1 className='mb-3 text-2xl font-bold'>Discover</h1>
        <Button className='w-14 font-bold'>All</Button>
      </div>
      <ImageSlider />
    </div>
  )
}

'use client'

import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

interface ImageData {
  src: string
  alt: string
  title: string
  subtitle: string
  tags: string[]
}

const images: ImageData[] = [
  {
    src: '/images/image1.png',
    alt: 'Image 1',
    title: 'Title 1',
    subtitle: 'Subtitle 1',
    tags: ['Tag1', 'Tag2', 'Tag3'],
  },
  {
    src: '/images/image2.png',
    alt: 'Image 2',
    title: 'Title 2',
    subtitle: 'Subtitle 2',
    tags: ['Tag1', 'Tag2', 'Tag3'],
  },
  {
    src: '/images/image3.png',
    alt: 'Image 3',
    title: 'Title 3',
    subtitle: 'Subtitle 3',
    tags: ['Tag1', 'Tag2', 'Tag3'],
  },
  {
    src: '/images/image4.png',
    alt: 'Image 4',
    title: 'Title 4',
    subtitle: 'Subtitle 4',
    tags: ['Tag1', 'Tag2', 'Tag3'],
  },
  {
    src: '/images/image5.png',
    alt: 'Image 5',
    title: 'Title 5',
    subtitle: 'Subtitle 5',
    tags: ['Tag1', 'Tag2', 'Tag3'],
  },

  {
    src: '/images/image6.png',
    alt: 'Image 6',
    title: 'Title 6',
    subtitle: 'Subtitle 6',
    tags: ['Tag1', 'Tag2', 'Tag3'],
  },
  // Add more images as needed
]

const ImageSlider: React.FC = () => {
  return (
    <div className='relative flex flex-col justify-center overflow-hidden'>
      <div className='mx-auto w-full max-w-full px-4 py-2 md:px-6'>
        <div className='text-center'>
          <div className='inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
            <ul
              x-ref='logos'
              className='flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8'
            >
              {images.map((image, index) => (
                <li key={index}>
                  <Link href={`/mint/${[index]}`}>
                    <div key={index} className='relative'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        height='285'
                        width='285'
                      />
                      <div className='absolute bottom-0 w-full justify-start bg-black bg-opacity-50 p-2 text-left text-xs text-white'>
                        <h3 className='text-lg'>{image.title}</h3>
                        <p className='text-sm'>{image.subtitle}</p>
                        <div className='flex space-x-1'>
                          {image.tags.map((tag, index) => (
                            <Button
                              key={index}
                              variant='outline'
                              className='mx-0 my-2 mb-0 mr-1 w-auto p-2'
                            >
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <ul
              x-ref='logos'
              className='flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8'
            >
              {images.map((image, index) => (
                <li key={index}>
                  <Link href={`/mint/${[index]}`}>
                    <div key={index} className='relative'>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        height='285'
                        width='285'
                      />
                      <div className='absolute bottom-0 w-full justify-start bg-black bg-opacity-50 p-2 text-left text-xs text-white'>
                        <h3 className='text-lg'>{image.title}</h3>
                        <p className='text-sm'>{image.subtitle}</p>
                        <div className='flex space-x-1'>
                          {image.tags.map((tag, index) => (
                            <Button
                              key={index}
                              variant='outline'
                              className='mx-0 my-2 mb-0 mr-1 w-auto p-2'
                            >
                              {tag}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {/* <li>
                <img src="/svg/facebook.svg" alt="Facebook" />
              </li>
              <li>
                <img src="/svg/disney.svg" alt="Disney" />
              </li>
              <li>
                <img src="/svg/airbnb.svg" alt="Airbnb" />
              </li>
              <li>
                <img src="/svg/apple.svg" alt="Apple" />
              </li>
              <li>
                <img src="/svg/spark.svg" alt="Spark" />
              </li>
              <li>
                <img src="/svg/samsung.svg" alt="Samsung" />
              </li>
              <li>
                <img src="/svg/quora.svg" alt="Quora" />
              </li>
              <li>
                <img src="/svg/sass.svg" alt="Sass" />
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageSlider

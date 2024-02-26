'use client'

import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className='px-4 py-6 text-white'>
      <div className='container mx-auto grid grid-cols-3 gap-4'>
        <div>
          <h2 className='mb-2 text-base font-bold'>Block 1</h2>
          <p className='text-sm'>Content for block 1...</p>
        </div>
        <div>
          <h2 className='mb-2 text-base font-bold'>Block 2</h2>
          <p className='text-sm'>Content for block 2...</p>
        </div>
        <div>
          <h2 className='mb-2 text-base font-bold'>Block 3</h2>
          <p className='text-sm'>Content for block 3...</p>
        </div>
      </div>
      <div className='mt-4 text-center text-xs'>
        <p>&copy; {new Date().getFullYear()} SeiStart</p>
      </div>
    </footer>
  )
}

export default Footer

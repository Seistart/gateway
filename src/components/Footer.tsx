'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='text-white py-6 px-4'>
      <div className='container mx-auto grid grid-cols-3 gap-4'>
        <div>
          <h2 className='font-bold text-base mb-2'>Block 1</h2>
          <p className='text-sm'>Content for block 1...</p>
        </div>
        <div>
          <h2 className='font-bold text-base mb-2'>Block 2</h2>
          <p className='text-sm'>Content for block 2...</p>
        </div>
        <div>
          <h2 className='font-bold text-base mb-2'>Block 3</h2>
          <p className='text-sm'>Content for block 3...</p>
        </div>
      </div>
      <div className='text-xs text-center mt-4'>
        <p>&copy; {new Date().getFullYear()} SeiStart</p>
      </div>
    </footer>
  );
};

export default Footer;

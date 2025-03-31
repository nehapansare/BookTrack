import React from 'react';

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 bg-[#476442] text-white">
     <div className=" font-bold">
    <span className='text-3xl'>BOOK</span><span className='text-2xl text-[#2D2429]'>CLUB</span>
</div>

      <div className="flex gap-30 text-xl">
        <a href="/" className="text-white no-underline">Home</a>
        <a href="/bookshelf" className="text-white no-underline">BookShelf</a>
        <a href="/bookshelf" className="text-white no-underline">Contact </a>
        <a href="/bookshelf" className="text-white no-underline">About Us</a>
        
      </div>
      <a href="/login" className="text-white no-underline text-lg">Login</a>
    </nav>
  );
}

export default Navbar;
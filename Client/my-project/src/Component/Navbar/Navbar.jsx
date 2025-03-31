import React from 'react';

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 bg-[#476442] text-white">
      <div>
        <img src="/logo.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex gap-5 text-xl">
        <a href="/" className="text-white no-underline">Home</a>
        <a href="/bookshelf" className="text-white no-underline">BookShelf</a>
      </div>
      <a href="/login" className="text-white no-underline text-lg">Login</a>
    </nav>
  );
}

export default Navbar;
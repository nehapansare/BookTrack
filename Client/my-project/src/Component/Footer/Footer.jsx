import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#476442] text-white text-center p-6  flex flex-col items-center">
      <div className="flex justify-between w-full max-w-10xl gap-20">
        {/* Box 1: Logo and Description */}
        <div className="flex flex-col items-center w-1/2">
          <img src="/logo.png" alt="Logo" className="h-16 mb-2" />
          <p className="text-sm max-w-xs">Providing quality services since 2024. Your satisfaction is our priority.</p>
        </div>
        {/* Box 2: Quick Links */}
        <div className="flex flex-col items-center w-1/2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <a href="/about" className="hover:text-gray-400">About Us</a>
          <a href="/services" className="hover:text-gray-400">Services</a>
          <a href="/contact" className="hover:text-gray-400">Contact</a>
        </div>
        {/* Box 3: Social Media */}
        <div className="flex flex-col items-center w-1/2">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        {/* Box 4: Visit Us */}
        <div className="flex flex-col items-center w-1/2">
          <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
          <p className="text-sm">123 Main Street, Cityville, Country</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
          <p className="text-sm">Email: info@yourcompany.com</p>
        </div>
      </div>
      <p className="text-sm mt-8">&copy; 2024 Your Company. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
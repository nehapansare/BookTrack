import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check login status and user data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []); // Empty dependency array, runs only once on mount

  // Handle logout action
  const handleLogout = () => {
    // Clear the login status and token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/'); // Redirect to homepage after logout
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-[#476442] text-white">
      <div className="font-bold">
        <span className="text-3xl">BOOK</span><span className="text-2xl text-[#2D2429]">CLUB</span>
      </div>

      <div className="flex gap-6 text-xl">
        <a href="/" className="text-white no-underline">Home</a>
        <a href="/bookshelf" className="text-white no-underline">BookShelf</a>
        <a href="/bookshelf" className="text-white no-underline">Contact</a>
        <a href="/bookshelf" className="text-white no-underline">About Us</a>
      </div>

      {isLoggedIn ? (
        <>
          <a href="/studentdashboard" className="text-white no-underline text-lg">My Account</a>
          <button onClick={handleLogout} className="text-white no-underline text-lg">Logout</button>
        </>
      ) : (
        <a href="/login" className="text-white no-underline text-lg">Login</a>
      )}
    </nav>
  );
}

export default Navbar;

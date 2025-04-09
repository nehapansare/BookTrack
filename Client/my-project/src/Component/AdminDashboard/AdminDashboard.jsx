import React, { useState } from 'react';

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { title: "Total Students", value: 120, color: "bg-blue-500" },
    { title: "Total Books", value: 450, color: "bg-green-500" },
    { title: "Total Orders", value: 89, color: "bg-yellow-500" },
    { title: "Books Distributed", value: 310, color: "bg-red-500" },
  ];

  const books = [
    { name: "The Alchemist", author: "Paulo Coelho", year: 1988 },
    { name: "Atomic Habits", author: "James Clear", year: 2018 },
    { name: "Clean Code", author: "Robert C. Martin", year: 2008 },
    { name: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", year: 1997 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-48 bg-white border-r p-4 transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Admin</h2>
          <button 
            className="sm:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setSidebarOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="space-y-4 text-gray-700">
          <li><a href="#" className="hover:text-blue-600">Dashboard</a></li>
          <li><a href="#" className="hover:text-blue-600">Students</a></li>
          <li><a href="#" className="hover:text-blue-600">Books</a></li>
          <li><a href="#" className="hover:text-blue-600">Orders</a></li>
          <li><a href="#" className="hover:text-blue-600">Logout</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-0 sm:ml-48 p-6 w-full">
        {/* Top Bar with Toggle Button */}
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>

        {/* Heading for large screens */}
        <h1 className="hidden sm:block text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.color} text-white p-6 rounded shadow text-center`}>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Book Table */}
        <h2 className="text-xl font-semibold mb-4">Books Name</h2>
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2">Sr.</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Author</th>
                <th className="px-4 py-2">Year</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{book.name}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.year}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
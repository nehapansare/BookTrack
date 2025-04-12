import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { FiMenu } from 'react-icons/fi'; 

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const dummyStats = {
    totalBooks: books.length,
    totalUsers: 5,
    totalOrders: 8,
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
        const data = response.data;
        setBooks(Array.isArray(data) ? data : data.books || []);
      } catch (err) {
        console.error('Books API error:', err);
        setError('Failed to fetch books');
      } finally {
        setLoadingBooks(false);
      }
    };

    fetchBooks();
  }, []);

  const handleEdit = (bookId) => {
    navigate(`/adminedit/${bookId}`);
  };

  const handleDelete = async (bookId) => {
    if (!bookId) {
      toast.error("Book ID is missing");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Authorization token not found");
      return;
    }

    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message || "Book deleted successfully");
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Delete error:', err);
      toast.error(err.response?.data?.message || "Failed to delete the book");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen flex">
      <Toaster position="top-center" />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b font-bold text-xl">Admin Panel</div>
        <ul className="p-4 space-y-4">
  <li
    className="cursor-pointer hover:text-blue-500"
    onClick={() => {
      navigate('/admindashboard');
      setSidebarOpen(false);
    }}
  >
    Dashboard
  </li>
  <li
    className="cursor-pointer hover:text-blue-500"
    onClick={() => {
      navigate('/adminstudent');
      setSidebarOpen(false);
    }}
  >
    Student
  </li>
  <li
    className="cursor-pointer hover:text-blue-500"
    onClick={() => {
      navigate('/adminadd');
      setSidebarOpen(false);
    }}
  >
    Add Book
  </li>
  <li
    className="cursor-pointer text-red-500 hover:text-red-600"
    onClick={handleLogout}
  >
    Logout
  </li>
</ul>

      </div>

      {/* Overlay for closing sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 sm:ml-0">
        {/* Header with menu button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-2xl mr-4 focus:outline-none"
          >
            <FiMenu />
          </button>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
  <div className="bg-purple-200 text-purple-800 p-6 rounded-xl shadow-md text-center">
    <h3 className="text-lg font-semibold">Total Books</h3>
    <p className="text-2xl mt-2 font-bold">{dummyStats.totalBooks}</p>
  </div>
  <div className="bg-pink-200 text-pink-800 p-6 rounded-xl shadow-md text-center">
    <h3 className="text-lg font-semibold">Total Users</h3>
    <p className="text-2xl mt-2 font-bold">{dummyStats.totalUsers}</p>
  </div>
  <div className="bg-indigo-200 text-indigo-800 p-6 rounded-xl shadow-md text-center">
    <h3 className="text-lg font-semibold">Total Orders</h3>
    <p className="text-2xl mt-2 font-bold">{dummyStats.totalOrders}</p>
  </div>
</div>



        {/* Book List */}
        <h3 className="text-xl font-semibold mb-4">Books List</h3>
        {loadingBooks ? (
          <p className="text-gray-600">Loading books...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book._id}
                  className="bg-white shadow rounded-xl p-4 flex flex-col items-center text-center"
                >
                  {book.cover && (
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-72 object-contain rounded-md mb-4"
                    />
                  )}
                  <h4 className="text-lg font-semibold">{book.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Author:</span> {book.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-medium">Year:</span> {book.year}
                  </p>
                  <div className="flex gap-2 mt-4">
  <button
    onClick={() => handleEdit(book._id)}
    className="flex-1 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(book._id)}
    className="flex-1 bg-red-50 text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
  >
    Delete
  </button>
</div>

                </div>
              ))
            ) : (
              <p className="text-gray-500">No books found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

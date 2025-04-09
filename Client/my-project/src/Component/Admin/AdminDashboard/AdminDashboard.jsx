import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [error, setError] = useState('');

  const dummyStats = {
    totalBooks: 12,
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
    console.log('Edit clicked for book:', bookId);
    // Add your edit logic here (like navigation or modal opening)
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Books</h3>
          <p className="text-2xl mt-2">{dummyStats.totalBooks}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl mt-2">{dummyStats.totalUsers}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl mt-2">{dummyStats.totalOrders}</p>
        </div>
      </div>

      {/* Books List */}
      <h3 className="text-xl font-semibold mb-4">Books List</h3>

      {loadingBooks ? (
        <p className="text-gray-600">Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div
                key={book._id || index}
                className="bg-white shadow rounded-xl p-4 flex flex-col items-center text-center"
              >
                {book.cover && (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h4 className="text-lg font-semibold">{book.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Author:</span> {book.author}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Year:</span> {book.year}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(book._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
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
  );
};

export default AdminDashboard;

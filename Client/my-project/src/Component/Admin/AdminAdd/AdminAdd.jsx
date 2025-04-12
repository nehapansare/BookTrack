import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminAddBook = () => {
  const navigate = useNavigate(); // Hook to navigate
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    cover: '',
    language: '',
    rating: '',
    year: '',
    availableCopies: '',
    totalCopies: '',
    genres: '',
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        rating: parseFloat(formData.rating),
        year: parseInt(formData.year),
        availableCopies: parseInt(formData.availableCopies),
        totalCopies: parseInt(formData.totalCopies),
        genres: formData.genres.split(',').map((genre) => genre.trim()),
      };

      const token = localStorage.getItem('token');

      const res = await axios.post(`${API_URL}/books`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || 'Book added successfully');

      // Optional: Clear form
      setFormData({
        title: '',
        author: '',
        cover: '',
        language: '',
        rating: '',
        year: '',
        availableCopies: '',
        totalCopies: '',
        genres: '',
      });
    } catch (error) {
      toast.error('Error adding book: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <Toaster />
      {/* Container for Back Button and Header */}
      <div className="flex items-center mb-6">
        {/* Back to Dashboard Button on Left */}
        <button
          onClick={() => navigate('/admindashboard')}
          className="text-blue-600 hover:text-blue-800 focus:outline-none mr-4"
        >
          &#8592; Back to Dashboard
        </button>

        {/* Title Header in the Center */}
        <h2 className="text-2xl font-semibold flex-grow text-center">Add New Book</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Title", name: "title" },
          { label: "Author", name: "author" },
          { label: "Cover (Base64 or URL)", name: "cover" },
          { label: "Language", name: "language" },
          { label: "Rating", name: "rating", type: "number", step: "0.1" },
          { label: "Year", name: "year", type: "number" },
          { label: "Available Copies", name: "availableCopies", type: "number" },
          { label: "Total Copies", name: "totalCopies", type: "number" },
          { label: "Genres (comma separated)", name: "genres" },
        ].map(({ label, name, type = "text", step }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              step={step}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={name !== "cover" && name !== "genres"}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AdminAddBook;

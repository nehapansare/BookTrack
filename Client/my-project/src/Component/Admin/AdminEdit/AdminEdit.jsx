import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    cover: "",
    language: "",
    rating: "",
    year: "",
    availableCopies: "",
    totalCopies: "",
    genres: ""
  });
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_URL}/books/${id}`);
        const bookData = response.data?.book;

        if (!bookData) {
          toast.error("Book not found");
          return;
        }

        setFormData({
          ...bookData,
          genres: Array.isArray(bookData.genres)
            ? bookData.genres.join(", ")
            : bookData.genres || ""
        });

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load book data");
      }
    };

    fetchBook();
  }, [id, API_URL]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      genres: formData.genres.split(",").map((g) => g.trim())
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Not authorized");
        return;
      }

      await axios.put(`${API_URL}/books/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success("Book updated!");

      setTimeout(() => navigate("/admindashboard"), 1000);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10 text-xl">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">Edit Book</h2>
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
          { label: "Genres (comma separated)", name: "genres" }
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
          Update Book
        </button>
      </form>
    </div>
  );
};

export default AdminEdit;

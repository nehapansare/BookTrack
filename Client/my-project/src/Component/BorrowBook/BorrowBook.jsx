import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Function to borrow a book
export const borrowBook = async (studentId, bookId) => {
  try {
    const response = await axios.post(`${API_URL}/borrow`, {
      student: studentId,
      book: bookId,
    });

    return response.data; // Return API response
  } catch (error) {
    throw error.response?.data?.message || "An error occurred while borrowing the book";
  }
};

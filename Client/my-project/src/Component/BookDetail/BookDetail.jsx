import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { borrowBook } from "../../Component/BorrowBook/BorrowBook"; // Import API function
import books from "../../Config/borrowbook"; // Book data

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false); // Track if the book is borrowed

  useEffect(() => {
    const foundBook = books.find((b) => String(b._id) === String(id));
    setBook(foundBook);

    // Check if the student has already borrowed this book
    const studentId = localStorage.getItem("studentId");
    const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

    if (borrowedBooks.includes(`${studentId}-${id}`)) {
      setIsBorrowed(true);
    }
  }, [id]);

  const handleBorrow = async () => {
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      setMessage("You must be logged in to borrow a book");
      return;
    }

    setLoading(true);
    try {
      await borrowBook(studentId, book._id); // API call to borrow book

      // Update localStorage to track borrowed book
      const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
      borrowedBooks.push(`${studentId}-${book._id}`);
      localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

      setMessage("Book borrowed successfully!");
      setIsBorrowed(true); // Update button state
    } catch (error) {
      setMessage(error || "Error borrowing book");
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-red-500 font-bold text-lg">Error: Book not found</h2>
        <button
          className="mt-4 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col sm:flex-row sm:gap-6">
        {/* Left side: Image */}
        <img
          src={book.cover}
          alt={book.title}
          className="w-60 h-80 object-cover rounded-md shadow-lg"
        />

        {/* Right side: Book details */}
        <div className="flex flex-col mt-6 sm:mt-0">
          <h2 className="text-2xl font-bold">{book.title}</h2>
          <p className="text-gray-600"><strong>Author:</strong> {book.author}</p>
          <p className="text-gray-600"><strong>Year:</strong> {book.year}</p>
          <p className="text-gray-600"><strong>Language:</strong> {book.language}</p>
          <p className="text-gray-600"><strong>Genres:</strong> {book.genres || "No genres available"}</p>
          <p className="text-yellow-500 font-bold text-lg">⭐ {book.rating}</p>

          {/* Show "Borrowed" button if already borrowed */}
          {isBorrowed ? (
            <button className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg cursor-not-allowed">
              Borrowed
            </button>
          ) : (
            <button
              className="bg-[#A7F1A8] text-black font-semibold px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300"
              onClick={handleBorrow}
              disabled={loading}
            >
              {loading ? "Borrowing..." : "Borrow"}
            </button>
          )}
        </div>
      </div>

      {/* Bottom side: Description */}
      <p className="text-gray-600 mt-6">
        {book.description.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>

      {/* Message after attempting to borrow */}
      {message && (
        <p className={`mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <button
        className="mt-4 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
}

export default BookDetail;

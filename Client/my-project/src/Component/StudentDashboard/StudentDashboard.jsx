import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentDashboard() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!studentId) {
      navigate("/login");
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${API_URL}/borrowed/${studentId}`);
        const { borrowedBooks } = response.data;

        if (borrowedBooks.length > 0) {
          setStudent(borrowedBooks[0].student);
        }

        setBorrowedBooks(borrowedBooks || []);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [navigate, studentId, API_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <h2 className="text-blue-600 font-bold mt-4 text-xl">Loading your dashboard...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-red-50 p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-red-600 font-bold text-xl mb-4">{error}</h2>
          <p className="text-gray-600 mb-6">We encountered a problem while loading your data.</p>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">My Library Dashboard</h2>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Student Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4 sm:mb-0 sm:mr-6">
              <div className="text-4xl text-blue-600">
                {student?.name ? student.name.charAt(0).toUpperCase() : "S"}
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-gray-800">{student?.name || "Unknown Student"}</h3>
              <p className="text-blue-600">{student?.email || "No Email Provided"}</p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">Student ID: {studentId}</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {borrowedBooks.length} {borrowedBooks.length === 1 ? "Book" : "Books"} Borrowed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Borrowed Books Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">My Books</h3>
            <div className="h-0.5 flex-grow mx-4 bg-gray-200"></div>
            <span className="bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              {borrowedBooks.length}
            </span>
          </div>

          {borrowedBooks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="text-5xl mb-4">📚</div>
              <p className="text-gray-600 text-lg mb-6">You haven't borrowed any books yet.</p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                onClick={() => navigate("/")}
              >
                Browse Library
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {borrowedBooks.map((borrowed) => (
                <div
                  key={borrowed._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Cover Image - Fixed width and padding */}
                    <div className="sm:w-2/5 p-3 flex items-center justify-center bg-gray-100">
                      {borrowed.book?.cover ? (
                        <img
                          src={borrowed?.book?.cover}
                          alt={borrowed.book.title}
                          className="w-full h-48 object-contain rounded-md"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/128x192?text=No+Cover";
                            e.target.className = "w-32 h-48 object-cover rounded-md";
                          }}
                        />
                      ) : (
                        <div className="w-32 h-48 bg-gray-200 flex items-center justify-center rounded-md">
                          <span className="text-gray-500 text-center p-2">No Cover</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Book Details - Adjusted width */}
                    <div className="p-4 sm:w-3/5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {borrowed.book?.title || "Untitled Book"}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          by {borrowed.book?.author || "Unknown Author"}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <div className="flex justify-between text-sm">
                          <div>
                            <p className="text-gray-500">Borrowed on</p>
                            <p className="font-medium">
                              {borrowed.borrowDate ? new Date(borrowed.borrowDate).toLocaleDateString() : "N/A"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-500">Due Date</p>
                            <p className="font-medium">
                              {borrowed.dueDate ? new Date(borrowed.dueDate).toLocaleDateString() : "N/A"}
                            </p>
                            {borrowed.status && (
                              <span className={`text-sm ${borrowed.status === 'overdue' ? 'text-red-600 font-bold' : borrowed.status === 'due-soon' ? 'text-orange-500 font-bold' : 'text-green-600'}`}>
                                {borrowed.status === 'overdue' ? 'OVERDUE' : 
                                 borrowed.status === 'due-soon' ? 'DUE SOON' : 'On Time'}
                              </span>
                            )}
                            {borrowed.penalty > 0 && (
                              <p className="text-red-600 font-bold mt-1">
                                Penalty: ${borrowed.penalty.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-lg transition duration-300 shadow-md"
            onClick={() => navigate("/")}
          >
            Return to Library
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
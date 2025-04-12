import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/students`);
        setStudents(response.data);
        setLoading(false);
      } catch (e) {
        toast.error('Error fetching students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, [API_URL]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (students.length === 0) return <p className="text-center mt-10 text-gray-500">No students found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-10 bg-white rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">All Students</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="border border-gray-200 p-5 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-700">👤 Name:</span> {student.name}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">📧 Email:</span> {student.email}
            </div>

            <h3 className="text-md font-semibold text-gray-800 mb-2">📚 Borrowed Books:</h3>

            {student.borrowedBooks.length === 0 ? (
              <p className="text-gray-500">No borrowed books</p>
            ) : (
              <div className="space-y-2 text-sm">
                {student.borrowedBooks.map((book, idx) => (
                  <div
                    key={book.bookId + idx}
                    className="bg-gray-50 p-3 rounded-md border border-gray-100"
                  >
                    <div><strong>Book ID:</strong> {book.bookId}</div>
                    <div><strong>Borrowed:</strong> {new Date(book.borrowDate).toLocaleDateString()}</div>
                    <div><strong>Due:</strong> {book.dueDate === 'Not Returned' ? book.dueDate : new Date(book.dueDate).toLocaleDateString()}</div>
                    <div><strong>Penalty:</strong> {book.penalty ? `${book.penalty} USD` : 'No Penalty'}</div>
                    {book.highlight && (
                      <div className="text-red-600 font-semibold mt-1">⚠ {book.highlight}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;

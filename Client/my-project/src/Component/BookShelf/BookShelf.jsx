import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BookCard from "../../Component/BookShelfCard/BookShelfCard";
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

function BookShelf() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");

    const API_URL = import.meta.env.VITE_API_URL;

    const loadBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/books`);
            const booksData = response.data.books || [];
            setBooks(booksData);
            setFilteredBooks(booksData);
            toast.success("Books loaded successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch books!");
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    useEffect(() => {
        let updatedBooks = books;
        if (selectedGenre !== "All") {
            updatedBooks = updatedBooks.filter(book => book.genres.includes(selectedGenre));
        }
        if (searchTerm) {
            updatedBooks = updatedBooks.filter(book => 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredBooks(updatedBooks);
    }, [searchTerm, selectedGenre, books]);

    return (
        <div>
            <Navbar/>
        <div className="p-6">
            <div className="flex justify-center mb-4 gap-4">
                <input 
                    type="text" 
                    placeholder="Search by title or author..." 
                    className="p-2 border rounded w-1/3"
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select 
                    className="p-2 border rounded"
                    value={selectedGenre} 
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Sci-Fi">Sci-Fi</option>
                </select>
            </div>
            {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book, index) => (
                    <BookCard
                        key={index}  
                        title={book.title}
                        author={book.author}
                        cover={book.cover}
                        year={book.year}
                        language={book.language}
                        rating={book.rating}
                        genres={book.genres}
                    />
                ))}
            </div>
            ) : (
                <p className="text-center text-gray-500 mt-6 text-lg">
                    No books found
                </p>
            )}
            <Toaster position="top-right" />
        </div>
        <Footer/>
        </div>
    );
}

export default BookShelf;

import Book from "../Modules/Book.js";

// Get all books
export const getBooks = async (req, res) => {
    try {
        const { genre } = req.query; // Get genre from query params

        let filter = {};
        if (genre) {
            filter.genres = genre; // Filter books by genre
        }

        const books = await Book.find(filter);
        res.json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching books", error: error.message });
    }
};


// Add a new book (POST)
export const addBook = async (req, res) => {
    try {
        const { title, author, cover, language, rating, year, availableCopies, totalCopies, genres } = req.body;
        const newBook = new Book({ title, author, cover, language, rating, year, availableCopies, totalCopies, genres });
        const savedBook = await newBook.save();
        res.status(201).json({ success: true, message: "Book Created", data: savedBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating book", error: error.message });
    }
};

// Update book details
export const updateBook = async (req, res) => {
    try {
        const { title, author, cover, language, rating, year, availableCopies, totalCopies, genres } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, cover, language, rating, year, availableCopies, totalCopies, genres },
            { new: true }
        );

        if (!updatedBook) return res.status(404).json({ success: false, message: "Book not found" });

        res.json({ success: true, message: "Book Updated", data: updatedBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating book", error: error.message });
    }
};

// Delete a book
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ success: false, message: "Book not found" });

        res.json({ success: true, message: "Book Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting book", error: error.message });
    }
};

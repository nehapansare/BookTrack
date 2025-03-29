import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching books", error: error.message });
    }
};


export const addBook = async (req, res) => {
    try {
        const { title, author, cover, language, rating, year, availableCopies, totalCopies } = req.body;
        const newBook = new Book({ title, author, cover, language, rating, year, availableCopies, totalCopies });
        const savedBook = await newBook.save();
        res.status(201).json({ success: true, message: "Book Created", data: savedBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating book", error: error.message });
    }
};


export const updateBook = async (req, res) => {
    try {
        const { title, author, cover, language, rating, year, availableCopies, totalCopies } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, 
            { title, author, cover, language, rating, year, availableCopies, totalCopies },
            { new: true } 
        );

        if (!updatedBook) return res.status(404).json({ success: false, message: "Book not found" });

        res.json({ success: true, message: "Book Updated", data: updatedBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating book", error: error.message });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ success: false, message: "Book not found" });

        res.json({ success: true, message: "Book Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting book", error: error.message });
    }
};

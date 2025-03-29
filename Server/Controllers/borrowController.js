import BorrowBook from "../Modules/BorrowBook.js";
import Book from "../Modules/Book.js";

export const borrowBook = async (req, res) => {
    try {
        const { student: studentId, book: bookId } = req.body;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ success: false, message: "Book not found" });

        if (book.availableCopies <= 0) return res.status(400).json({ success: false, message: "No copies available" });

        book.availableCopies -= 1;
        await book.save();

        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(borrowDate.getDate() + 10);

        const borrowedBook = new BorrowBook({ student: studentId, book: bookId, borrowDate, dueDate });
        await borrowedBook.save();

        res.json({ message: "Book borrowed successfully", borrowedBook, availableCopies: book.availableCopies });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error borrowing book", error: error.message });
    }
};

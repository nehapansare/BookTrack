import BorrowBook from "../Modules/BorrowBook.js";
import Book from "../Modules/Book.js";
import Student from "../Modules/Student.js"; // Student Model

export const borrowBook = async (req, res) => {
    try {
        const { student: studentId, book: bookId } = req.body;

        // Validate Request
        if (!studentId) {
            return res.status(400).json({ success: false, message: "Student ID is required" });
        }
        if (!bookId) {
            return res.status(400).json({ success: false, message: "Book ID is required" });
        }

        // Find Student
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        // Check for overdue books
        const overdueBooks = await BorrowBook.find({
            student: studentId,
            returned: false,
            dueDate: { $lt: new Date() }
        });

        if (overdueBooks.length > 0) {
            let totalPenalty = 0;
            overdueBooks.forEach(borrowedBook => {
                const overdueDays = Math.floor((new Date() - new Date(borrowedBook.dueDate)) / (1000 * 60 * 60 * 24));
                if (overdueDays > 0) {
                    totalPenalty += overdueDays * 100; // 100 per overdue day
                }
            });

            return res.status(400).json({
                success: false,
                message: `You have overdue books. Penalty: $${totalPenalty}. Return overdue books first.`
            });
        }

        // Check Borrowing Limit (Max 3 books)
        const borrowedBooksCount = await BorrowBook.countDocuments({ student: studentId, returned: false });
        if (borrowedBooksCount >= 3) {
            return res.status(400).json({ success: false, message: "You can only borrow up to 3 books at a time" });
        }

        // Find Book
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({ success: false, message: "No copies available for this book" });
        }

        // Update Book Availability
        book.availableCopies -= 1;
        await book.save();

        // Create Borrow Record
        const borrowDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(borrowDate.getDate() + 10); // 10-day loan period

        const borrowedBook = new BorrowBook({
            student: studentId,
            book: book._id,
            cover: book.cover, // ✅ Added cover field
            borrowDate,
            dueDate
        });

        await borrowedBook.save();

        res.json({
            success: true,
            message: "Book borrowed successfully",
            borrowedBook,
            availableCopies: book.availableCopies
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error borrowing book", error: error.message });
    }
};

export const getBorrowedBooksByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        if (!studentId) {
            return res.status(400).json({ success: false, message: "Student ID is required" });
        }

        // Find all borrowed books for the student
        const borrowedBooks = await BorrowBook.find({ student: studentId })
            .populate("book", "title author")
            .populate("student", "name email");

        if (!borrowedBooks || borrowedBooks.length === 0) {
            return res.status(404).json({ success: false, message: "No borrowed books found for this student" });
        }

        res.json({ success: true, borrowedBooks });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching borrowed books", error: error.message });
    }
};

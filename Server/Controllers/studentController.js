import Student from "../Modules/Student.js";
import BorrowBook from "../Modules/BorrowBook.js";


export const getStudentDetails = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId, "name email");
        if (!student) return res.status(404).json({ message: "Student not found" });

        const borrowedBooks = await BorrowBook.find({ student: studentId }, "book borrowDate returnDate penalty");

        res.json({
            _id: student._id,
            name: student.name,
            email: student.email,
            borrowedBooks: borrowedBooks.map(b => ({
                bookId: b.book,
                borrowDate: b.borrowDate,
                returnDate: b.returnDate || "Not Returned",
                penalty: b.penalty
            }))
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching student details", error: error.message });
    }
};

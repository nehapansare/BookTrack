import Student from "../Modules/Student.js";
import BorrowBook from "../Modules/BorrowBook.js";

export const getStudentDetails = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId, "name email");
        if (!student) return res.status(404).json({ message: "Student not found" });

        const borrowedBooks = await BorrowBook.find({ student: studentId }, "book borrowDate dueDate penalty");

        const today = new Date();

        res.json({
            _id: student._id,
            name: student.name,
            email: student.email,
            borrowedBooks: borrowedBooks.map(b => {
                let highlightMessage = "";
                if (b.dueDate) {
                    const dueDate = new Date(b.dueDate);
                    const daysLeft = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
                    if (daysLeft === 2) {
                        highlightMessage = "⚠️ 2 days left for return!";
                    }
                }

                return {
                    bookId: b.book,
                    borrowDate: b.borrowDate,
                    dueDate: b.dueDate || "Not Returned",
                    penalty: b.penalty,
                    highlight: highlightMessage
                };
            })
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching student details", error: error.message });
    }
};

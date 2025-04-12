import Student from "../Modules/Student.js";
import BorrowBook from "../Modules/BorrowBook.js";


export const getAllStudentsDetails = async (req, res) => {
    try {
        const students = await Student.find({}, "name email");  // Fetch only name and email of all students

        const today = new Date();

        // Fetch borrowed books for each student
        const studentDetails = await Promise.all(students.map(async (student) => {
            const borrowedBooks = await BorrowBook.find({ student: student._id }, "book borrowDate dueDate penalty");

            return {
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
            };
        }));

        res.json(studentDetails);  // Return student details along with borrowed books
    } catch (error) {
        res.status(500).json({ message: "Error fetching student details", error: error.message });
    }
};

export default getAllStudentsDetails

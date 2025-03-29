import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import Book from "../Server/Modules/Book.js";
import Student from "../Server/Modules/Student.js";
import mongoose from "mongoose"; 
import BorrowBook from "./Modules/BorrowBook.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};
connectDB();


app.get("/", (req, res) => res.json({ message: "Welcome to server" }));
app.get("/health", (req, res) => res.json({ message: "Server is running" }));





app.post("/borrow", async (req, res) => {
    try {
        const { student: studentId, book: bookId } = req.body;

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        if (book.availableCopies <= 0) {
            return res.status(400).json({ success: false, message: "No copies available" });
        }


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
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

     
        const newUser = new Student({
            name,
            email,
            password: hashedPassword,
            role: role || "student" 
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


const JWT_SECRET = "your_secret_key_here"; 

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Student.findOne({ email });

        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

     
        const token = jwt.sign(
            { userId: user._id, role: user.role }, 
            JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});



app.get("/students/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId, "name email");
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

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
});



app.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ success: true, books });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching books", error: error.message });
    }
});
const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
 const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
    next();
};

app.post("/books", authenticate, isAdmin, async (req, res) => {
    try {
        const { title, author, cover, language, rating, year, availableCopies, totalCopies } = req.body;
        const newBook = new Book({ title, author, cover, language, rating, year, availableCopies, totalCopies });
        const savedBook = await newBook.save();
        res.status(201).json({ success: true, message: "Book Created", data: savedBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating book", error: error.message });
    }
});


app.put("/books/:id", authenticate, isAdmin, async (req, res) => {
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
});


app.delete("/books/:id", authenticate, isAdmin, async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ success: false, message: "Book not found" });

        res.json({ success: true, message: "Book Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting book", error: error.message });
    }
});


app.use("*", (req, res) => res.status(404).json({ message: "NOT Found" }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

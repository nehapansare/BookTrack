import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import Book from "../Server/Modules/Book.js";
import Student from "../Server/Modules/Student.js";
import mongoose from "mongoose"; 
import BorrowBook from "./Modules/BorrowBook.js";
import { login, register } from "./Controllers/authController.js";
import { getBooks,addBook,updateBook,deleteBook, getBookById} from "./Controllers/bookController.js";
import {getAllStudentsDetails} from "./Controllers/studentController.js"
import {borrowBook,getBorrowedBooksByStudent} from "./Controllers/borrowController.js"


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





app.get("/borrowed/:studentId",  getBorrowedBooksByStudent);

app.post("/borrow", borrowBook);

app.post("/register",register )


const JWT_SECRET = "your_secret_key_here"; 

app.post("/login", login)



app.get("/students", getAllStudentsDetails)



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
app.get("/books", getBooks);
app.get("/books/:id", getBookById);

app.post("/books", authenticate, addBook)

app.put("/books/:id", authenticate,  updateBook)

app.delete("/books/:id", authenticate, deleteBook)


app.use("*", (req, res) => res.status(404).json({ message: "NOT Found" }));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

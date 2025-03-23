import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit if DB connection fails
    }
};
connectDB();

// Use the imported controller
app.get("/", (req,res)=>{
    res.json({ message: "Welcome to server" });
});
app.get("/health",(req,res)=>{
    res.json({message: "Server is running123"})
});
// Handle 404 errors
app.get("*", (req,res)=>{
    res.json({message: "NOT Found"})
});

const PORT = process.env.PORT || 5000; // Change to another available port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

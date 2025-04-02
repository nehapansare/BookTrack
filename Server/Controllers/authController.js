import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Student from "../Modules/Student.js";

const JWT_SECRET = "your_secret_key_here";


export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await Student.findOne({ email });

        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Student({ name, email, password: hashedPassword, role: role || "student" });
        await newUser.save();

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Student.findOne({ email });

        if (!user) return res.status(401).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

        // Include user data in the response
        res.json({
            message: "Login successful",
            token,
            role: user.role,
            user: { id: user._id, name: user.name, email: user.email } // Add user details
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

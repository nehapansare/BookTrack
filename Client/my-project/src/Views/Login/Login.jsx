import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from '../../assets/img/image8.jpg';

function Login() {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password || (!isLogin && !credentials.name)) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsLoading(true);

        try {
            if (isLogin) {
                // Login API call
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                    email: credentials.email,
                    password: credentials.password,
                });

                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("studentId", data.user.id);

                toast.success("Login successful!");

                navigate(data.role === "admin" ? "/admindashboard" : "/");
            } else {
                // Register API call
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                });

                toast.success("Account created! Please login.");
                setIsLogin(true); // Switch to login view
                setCredentials({ name: "", email: "", password: "" });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-gray-100"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Toaster position="top-center" />
            <div
                className="bg-white p-6 rounded-lg shadow-md w-96"
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    minHeight: "450px",
                }}
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={credentials.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-4 py-3 rounded-md font-medium text-white"
                        style={{ backgroundColor: isLoading ? "#476442" : "#476545" }}
                    >
                        {isLoading ? "Processing..." : isLogin ? "Sign In" : "Register"}
                    </button>

                    <p className="text-center text-sm mt-4 text-gray-700">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            type="button"
                            className="text-blue-600 ml-1 underline"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setCredentials({ name: "", email: "", password: "" });
                            }}
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;

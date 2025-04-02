import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from '../../assets/img/image8.jpg'; 

function Login() {
    const [credentials, setCredentials] = useState({ 
        email: "", 
        password: "",
        name: ""
    });
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!credentials.email || !credentials.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email: credentials.email,
                password: credentials.password
            });

            console.log("API Response:", data); // Debugging log

            // Store token and user data in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);  
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("studentId", data.user.id);  // ✅ Store student ID separately
            
            toast.success("Login successful!");
            navigate("/"); // Redirect to home page after login
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="flex justify-center items-center min-h-screen bg-gray-100" 
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <Toaster position="top-center" />
            <div className="bg-white p-6 rounded-lg shadow-md w-150" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", height: "auto", minHeight: "450px" }}>
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                
                <form className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
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
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
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
                        onClick={handleLogin}
                        disabled={isLoading}
                        className={`w-full mt-6 py-3 rounded-md font-medium text-white`}
                        style={{
                            backgroundColor: isLoading ? "#476442" : "#476545",
                        }}
                    >
                        {isLoading ? "Processing..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication method
import { auth } from "../firebase-config"; // Import Firebase auth
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate to the home page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to home page after successful login
      navigate("/"); // Redirect to home page

    } catch (error) {
      setError("Invalid credentials. Please try again."); // Set error message if login fails
    }
  };

  return (
    <div className="login-container min-h-screen bg-[#F5EFED] flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#7F9055] mb-6 text-center">Вход</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Имейл"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F9055] focus:border-[#7F9055]"
          />
          
          {/* Password Input */}
          <input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F9055] focus:border-[#7F9055]"
          />
          
          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-[#7F9055] text-white rounded-lg hover:bg-[#A2B57F] transition duration-200"
          >
            Влез
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Нямате акаунт? <a href="/register" className="text-[#7F9055] hover:text-[#A2B57F]">Регистрирай се тук</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

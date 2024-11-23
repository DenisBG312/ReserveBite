import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication method
import { auth, db } from "../firebase-config"; // Import Firebase auth and Firestore
import { useNavigate } from "react-router-dom"; // Import useNavigate for page redirection
import { doc, setDoc } from "firebase/firestore"; // Firestore functions to add user data

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate to the home page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validate form data
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Create a new document in Firestore with the user's information
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date(),
      });

      // Redirect to the home page after successful registration
      navigate("/"); // Redirect to home page

    } catch (error) {
      setError(error.message); // Set error message if registration fails
    }
  };

  return (
    <div className="register-container min-h-screen bg-[#F5EFED] flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#7F9055] mb-6 text-center">Регистриране</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name Input */}
          <input
            type="text"
            placeholder="Първо име"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F9055] focus:border-[#7F9055]"
          />
          
          {/* Last Name Input */}
          <input
            type="text"
            placeholder="Последно име"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F9055] focus:border-[#7F9055]"
          />

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
          
          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Повтори паролата"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7F9055] focus:border-[#7F9055]"
          />
          
          {/* Error Message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-[#7F9055] text-white rounded-lg hover:bg-[#A2B57F] transition duration-200"
          >
            Регистрирай се
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Вече имате акаунт? <a href="/login" className="text-[#7F9055] hover:text-[#A2B57F]">Влез тук</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

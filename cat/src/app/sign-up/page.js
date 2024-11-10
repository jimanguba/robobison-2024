"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [email, setEmail] = useState(""); // User email
  const [password, setPassword] = useState(""); // User password
  const [passwordVisibility, setPasswordVisibility] = useState(false); // Show/hide password
  const [error, setError] = useState(null); // Print out the error --> Password doesn't satisfy some constraints
  const router = useRouter();

  // Define password criteria as an array of tuples
  const passwordCriteria = [
    [password.length >= 8, "At least 8 characters"],
    [/[A-Z]/.test(password), "At least one uppercase letter"],
    [/[a-z]/.test(password), "At least one lowercase letter"],
    [/\d/.test(password), "At least one number"],
    [
      /[!@#$%^&*]/.test(password),
      "At least one special character (e.g., @, $, !, %, *, ?)",
    ],
  ];

  // Function to handle user sign-up
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if all criteria pass before allowing signup
    if (!passwordCriteria.every(([isValid]) => isValid)) {
      setError("Password does not meet all criteria.");
      return;
    }

    try {
      const auth = getAuth();
      // Create user with Firebase
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      if (user) {
        // Add the user to the database
        await addUserToDatabase(user);

        // Clear the form
        setEmail("");
        setPassword("");

        // Redirect to the home page
        router.push("/");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  // Function to add user to the database using an API route
  const addUserToDatabase = async (user) => {
    try {
      // The body should be a simple JSON object with only the uid
      const response = await fetch("/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid, // Only the UID is provided from Firebase Auth
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add user to the database");
      }

      console.log("User added to database successfully");
    } catch (error) {
      console.error("Error adding user to the database:", error);
      setError("Failed to save user information. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F6E9E0]">
      <h1 className="text-black text-6xl">Sign Up</h1>
      <form
        onSubmit={handleSignup}
        className="flex flex-col items-center justify-center h-screen bg-[#EEDFD5] w-3/6 h-3/6 m-10"
      >
        <label htmlFor="email" className="block text-black text-2xl">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#F6E9E0] w-3/6 p-2 mt-1 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
        />

        <label htmlFor="password" className="block text-black text-2xl">
          Password:
        </label>
        <div className="w-3/6 relative flex">
          <input
            type={passwordVisibility ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#F6E9E0] w-full p-2 mt-1 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          ></input>

          <button
            type="button"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
            className="absolute right-3 bottom-6 text-black"
          >
            {!passwordVisibility ? (
              <FaRegEyeSlash size={22} />
            ) : (
              <FaRegEye size={22} />
            )}
          </button>
        </div>

        <div className="mb-4 w-3/6">
          <ul className="text-sm">
            {passwordCriteria.map(([isValid, message], index) => (
              <li
                key={index}
                className={isValid ? "text-green-600" : "text-red-600"}
              >
                - {message}
              </li>
            ))}
          </ul>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-3/6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;

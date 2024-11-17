"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseClient";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Background, Cat } from "@/app/page"; // Import Background and Cat

const LogIn = () => {
  const [email, setEmail] = useState(""); // User email
  const [password, setPassword] = useState(""); // User password
  const [passwordVisibility, setPasswordVisibility] = useState(false); // Show/hide password
  const [user] = useAuthState(auth);

  const router = useRouter();

  const addUserToDatabase = async (user) => {
    try {
      // The body should be a simple JSON object with only the uid
      console.log("user in addUserToDatabase", user);
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
        console.error("Failed to add user to the database");
      }

      console.log("User added to database successfully");
    } catch (error) {
      console.error("Error adding user to the database:", error);
      setError("Failed to save user information. Please try again.");
    }
  };
  // Redirect to hompage if user already log in
  // Redirect to homepage if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/cats");
      addUserToDatabase(user);
    }
  }, [user]);

  // Handle login
  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      // Add the user to the database
      await addUserToDatabase(res);

      // Clear the form
      setEmail("");
      setPassword("");

      // Redirect to the home page
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-[#F6E9E0] relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="flex items-center justify-center w-1/2">
        {/* Cat Component */}
        <Cat mood={3} />
      </div>

      <div className="flex items-center justify-center w-1/2 mt-10 z-10">
        <div className="absolute bg-[#EEDFD5] w-[550px] p-8 rounded-xl shadow-lg">
          <h1
            className="text-fontColMain font-readyforfall text-5xl text-center mb-6"
            style={{ textShadow: "2px 2px 4px rgba(121, 79, 44, 0.25)" }}
          >
            Log In
          </h1>
          <form onSubmit={handleLogIn} className="flex flex-col">
            <label
              htmlFor="email"
              className="block text-fontColMain font-readyforfall text-2xl mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#F6E9E0] p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-fontColMain font-readyforfall"
            />

            <label
              htmlFor="password"
              className="block text-fontColMain font-readyforfall text-2xl mb-2"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={passwordVisibility ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#F6E9E0] p-2 mb-4 w-full border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-fontColMain font-readyforfall"
              />
              <button
                type="button"
                onClick={() => setPasswordVisibility(!passwordVisibility)}
                className="absolute right-3 top-2 text-fontColMain"
              >
                {!passwordVisibility ? (
                  <FaRegEyeSlash size={19} />
                ) : (
                  <FaRegEye size={19} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white font-readyforfall rounded hover:bg-indigo-600 transition-colors duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { Background, Cat } from "@/app/page"; // Import the Cat component

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const passwordCriteria = [
    [password.length >= 8, "At least 8 characters"],
    [/[A-Z]/.test(password), "At least one uppercase letter"],
    [/[a-z]/.test(password), "At least one lowercase letter"],
    [/\d/.test(password), "At least one number"],
    [
      /[!@#$%^&*?. ]/.test(password),
      "At least one special character (e.g., @, $, !, %, *, ?)",
    ],
  ];

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (!passwordCriteria.every(([isValid]) => isValid)) {
      setError("Password does not meet all criteria.");
      return;
    }

    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      if (user) {
        await addUserToDatabase(user);
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  const addUserToDatabase = async (user) => {
    try {
      const response = await fetch("/api/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
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
    <div className="flex h-screen bg-[#F6E9E0] relative">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>
      <div className="flex items-center justify-center w-2/5">
        <Cat mood={3} />
      </div>

      <div className="flex items-center justify-center w-1/2 mt-10">
        {" "}
        <div className="absolute bg-[#EEDFD5] w-[550px] p-8 rounded-xl shadow-lg">
          <h1
            className="text-fontColMain font-readyforfall text-5xl text-center mb-6"
            style={{ textShadow: "2px 2px 4px rgba(121, 79, 44, 0.25)" }}
          >
            Sign Up
          </h1>
          <form onSubmit={handleSignup} className="flex flex-col">
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

            <div className="mb-4 w-full">
              <ul className="text-sm">
                {passwordCriteria.map(([isValid, message], index) => (
                  <li
                    key={index}
                    className={isValid ? "text-green-600" : "text-red-600"}
                  >
                    {!isValid ? message : ""}
                  </li>
                ))}
              </ul>
            </div>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 bg-indigo-500 text-white font-readyforfall rounded hover:bg-indigo-600 transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

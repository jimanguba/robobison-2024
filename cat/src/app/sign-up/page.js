"use client";

import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [email, setEmail] = useState(""); // User email
  const [password, setPassword] = useState(""); // User password
  const [passwordVisibility, setPasswordVisibility] = useState(false); // Show/hide password
  const [error, setError] = useState(null); // Print out the error --> Password doesnt satisfy some constraints
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth); // create user hook

  // Password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if all criteria pass before allowing signup
    if (!passwordCriteria.every(([isValid]) => isValid)) {
      setError("Password does not meet all criteria.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log(res);
      console.log("Cai dcm");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(e);
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

        {/* {error && (
          <div className="w-3/6">
            {error.split("\n").map((line, index) => (
              <p className="text-red-600" key={index}>
                {line}
              </p>
            ))}
          </div>
        )} */}

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

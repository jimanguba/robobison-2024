"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const LogIn = () => {
  const [email, setEmail] = useState(""); // User email
  const [password, setPassword] = useState(""); // User password
  const [passwordVisibility, setPasswordVisibility] = useState(false); // Show/hide password
  const [signInWithEmailAndPassword, user] = useAuthState(auth);

  const router = useRouter();

  // Redirect to hompage if user already log in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  // Handle log in from user
  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);

      setEmail("");
      setPassword("");

      router.push("/");
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F6E9E0]">
      <h1 className="text-black text-6xl">Log In</h1>
      <form
        onSubmit={handleLogIn}
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

        <button
          type="submit"
          className="w-3/6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogIn;

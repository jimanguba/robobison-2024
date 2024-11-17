"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseClient";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

const LogOutButton = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        router.push("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <Button
      className="text-[#683bd3] font-bold uppercase hover:bg-[#d6c4b7] px-4 py-2 rounded transition-all duration-300"
      onClick={handleSignOut}
      variant="text"
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;

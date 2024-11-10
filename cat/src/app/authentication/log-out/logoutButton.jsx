"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseClient";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

const LogOutButton = () => {
  const handleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <Button onClick={handleSignOut} variant="text">
      Log Out
    </Button>
  );
};

export default LogOutButton;

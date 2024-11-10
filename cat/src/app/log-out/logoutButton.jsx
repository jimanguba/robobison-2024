"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { Button, Typography } from "@mui/material";
import { signOut } from "firebase/auth";

const LogOutButton = () => {
  const [user] = useAuthState(auth);

  const router = useRouter();

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

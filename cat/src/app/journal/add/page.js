"use client";

import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import MoodCard from "./MoodCard";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#F6E9E0]">
      <MoodCard></MoodCard>
    </div>
  );
}

"use client";

import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseClient";
import { useRouter } from "next/navigation";
import LogOutButton from "./authentication/log-out/logoutButton";
import AddNotificationForm from "./components/AddNotificationForm";
import MoodChart from "./journal/chart/MoodChart";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const data = [
    { label: "1", score: 3 },
    { label: "2", score: 0 },
    { label: "3", score: 2 },
    { label: "4", score: 5 },
    { label: "5", score: 1 },
    { label: "6", score: 3 },
    { label: "7", score: 4 },
    { label: "8", score: 2 },
    { label: "9", score: 5 },
    { label: "10", score: 1 },
    { label: "11", score: 3 },
    { label: "12", score: 4 },
    { label: "13", score: 2 },
    { label: "14", score: 5 },
    { label: "15", score: 1 },
    { label: "16", score: 3 },
    { label: "17", score: 4 },
    { label: "18", score: 2 },
    { label: "19", score: 5 },
    { label: "20", score: 1 },
    { label: "21", score: 3 },
    { label: "22", score: 4 },
    { label: "23", score: 2 },
    { label: "24", score: 5 },
    { label: "25", score: 1 },
    { label: "26", score: 3 },
    { label: "27", score: 4 },
    { label: "28", score: 2 },
    { label: "29", score: 5 },
  ];

  // Use useEffect to handle redirects outside of render cycle
  useEffect(() => {
    if (!user) {
      router.push("/authentication/log-in");
    }
  }, [user, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Pet app: {user ? user.email : "Dume"}
      <AddNotificationForm />
      <LogOutButton />
      <MoodChart data={data} visibleNum={8}></MoodChart>
    </div>
  );
}

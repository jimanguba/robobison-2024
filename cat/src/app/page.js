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
      <MoodChart></MoodChart>
    </div>
  );
}

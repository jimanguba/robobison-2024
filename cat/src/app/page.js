"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import LogOutButton from "./log-out/logoutButton";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // Use useEffect to handle redirects outside of render cycle
  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user, loading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      Pet app: {user ? user.email : "Dume"}
      <LogOutButton />
    </div>
  );
}

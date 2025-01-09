"use client";

import { useState, useEffect, useRef } from "react";
import { auth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import styles from "../../styles/NotificationButton.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./Notification";
import { IoNotifications } from "react-icons/io5";

export default function NotificationButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const buttonRef = useRef(null);

  // Reference to track the current user state
  const userRef = useRef();
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Monitor the authentication state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUser(user);
      } else {
        console.log("User is not logged in");
        setUser(null);
        setNotificationsEnabled(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Toggle dropdown visibility
  const handleButtonClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // Fetch notifications from fastapi server
  useEffect(() => {
    if (!user) return;

    // fetch reminder after every 1 minute
    const fetchReminder = async () => {
      try {
        const notificationData = {
          delay: 2,
          title: "Meeting Reminder",
          message: "Don't forget the team meeting at 3 PM.",
          sender: "noti-server",
          recipient: user.uid,
        };

        const response = await fetch(
          "http://127.0.0.1:8000/send-notification/",
          {
            method: "POST", // Specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Inform the server that the body is JSON
            },
            body: JSON.stringify(notificationData), // Convert the JavaScript object to JSON
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const interval = setInterval(fetchReminder, 60000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [user]);

  return (
    <div className={styles.floatingButtonContainer}>
      <button
        className={styles.floatingButton}
        onClick={handleButtonClick}
        ref={buttonRef}
        style={{
          backgroundColor: showDropdown ? "rgb(252, 242, 232)" : "transparent",
          boxShadow: showDropdown ? "0 0 10px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <IoNotifications color="rgb(232, 138, 70)" size={100} />
      </button>

      {showDropdown && <Notification />}
      <ToastContainer />
    </div>
  );
}

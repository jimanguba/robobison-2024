"use client";

import { useState, useEffect, useRef } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { auth, messaging } from "../firebase/config"; // Import Firebase Auth and Messaging
import { onAuthStateChanged } from "firebase/auth";
import Message from "./Message"; // Import Message component
import styles from "../../styles/NotificationButton.module.css"; // Optional CSS module for styling

export default function NotificationButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false); // Initially off
  const [user, setUser] = useState(null); // User state
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Monitor the authentication state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUser(user);
      } else {
        console.log("User is not logged in");
        setUser(null);
        setNotificationsEnabled(false); // Disable notifications if logged out
      }
    });

    return () => unsubscribeAuth(); // Clean up auth listener on unmount
  }, []);

  // Toggle dropdown visibility
  const handleButtonClick = () => {
    setShowDropdown((prev) => !prev);
  };
  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Request notification permission and register service worker when enabling notifications
  const enableNotifications = async () => {
    console.log("Current notification permission:", Notification.permission);

    try {
      console.log("Requesting notification permission...");
      const permission = await Notification.requestPermission();
      console.log("Notification permission:", permission);
  
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("Service Worker registered:", registration);
  
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });
  
        if (!token) {
          console.error("Failed to retrieve notification token");
          setNotificationsEnabled(false);
          return;
        }
  
        console.log("Notification token:", token);
        setNotificationsEnabled(true);
  
        onMessage(messaging, (payload) => {
          console.log("Notification received:", payload);
          setNotifications((prev) => [
            ...prev,
            {
              title: payload.notification?.title,
              body: payload.notification?.body,
              image: payload.notification?.image,
              receivedAt: new Date().toLocaleString(),
            },
          ]);
        });
      } else {
        console.warn("Notification permission denied");
        setNotificationsEnabled(false); // Disable notifications if permission is denied
      }
    } catch (error) {
      console.error("Error during notification setup:", error);
    }
  };

  // Toggle notifications on/off
  const toggleNotifications = () => {
    if (!notificationsEnabled) {
      enableNotifications(); // Only request permissions when turning notifications on
    } else {
      setNotificationsEnabled(false); // Turn off notifications
    }
  };

  return (
    <div className={styles.floatingButtonContainer}>
      <button className={styles.floatingButton} onClick={handleButtonClick} ref={buttonRef}>
        •••
      </button>

      {showDropdown && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <div className={styles.dropdownHeader}>
            <span>Notifications</span>
            <button
              onClick={toggleNotifications}
              className={styles.toggleButton}
            >
              {notificationsEnabled ? "Turn Off" : "Turn On"}
            </button>
          </div>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Message key={index} notification={notification} />
            ))
          ) : (
            <p>No notifications yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

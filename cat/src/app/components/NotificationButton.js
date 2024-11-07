"use client";

import { useState, useEffect, useRef } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { auth, messaging } from "../firebase/config"; // Import Firebase Auth and Messaging
import { onAuthStateChanged } from "firebase/auth";
import Message from "./Message";
import styles from "../../styles/NotificationButton.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [user, setUser] = useState(null);
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
        setNotificationsEnabled(false);
      }
    });

    return () => unsubscribeAuth();
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
        const registration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );
        console.log("Service Worker registered:", registration);

        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        if (token) {
          setNotificationsEnabled(true);
          onMessage(messaging, (payload) => {
            toast.info(
              `${payload.notification?.title}: ${payload.notification?.body}`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
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
        }
      } else {
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error("Error during notification setup:", error);
    }
  };

  // Toggle notifications on/off
  const toggleNotifications = () => {
    if (!notificationsEnabled) {
      enableNotifications();
    } else {
      setNotificationsEnabled(false);
    }
  };

  // Function to trigger a test notification
  const triggerTestNotification = () => {
    toast.info("Test Notification: This is a test notification", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className={styles.floatingButtonContainer}>
      <button
        className={styles.floatingButton}
        onClick={handleButtonClick}
        ref={buttonRef}
      >
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
          <button
            onClick={triggerTestNotification}
            className={styles.testButton}
          >
            Trigger Test Notification
          </button>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Message key={index} notification={notification} />
            ))
          ) : (
            <p>No notifications yet.</p>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

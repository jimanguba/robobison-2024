"use client";

import { useState, useEffect, useRef } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { auth, messaging } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import Message from "./Message";
import styles from "../../styles/NotificationButton.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { supabase } from "@/lib/supabaseClient";

export default function NotificationButton() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
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

  useEffect(() => {
    // Function to handle messages from the service worker
    const handleServiceWorkerMessage = (event) => {
      console.log("Message received from Service Worker:", event.data);

      if (event.data && event.data.notification) {
        const payload = event.data;

        console.log("Processing Service Worker message:", payload);

        const newNotification = {
          title: payload.notification?.title,
          message: payload.notification?.body,
          userUid: userRef.current?.uid,
          isRead: false,
          createdAt: new Date().toISOString(),
        };

        // Show toast notification
        toast.info(`${newNotification.title}: ${newNotification.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Add to local state
        setNotifications((prev) => [newNotification, ...prev]);

        // Save to Supabase
        supabase
          .from("notifications")
          .insert(newNotification)
          .then(({ error }) => {
            if (error) {
              console.error("Error saving notification to Supabase:", error);
            } else {
              console.log("Notification saved to Supabase successfully");
            }
          });
      }
    };

    // Add event listener for messages from the service worker
    navigator.serviceWorker.addEventListener(
      "message",
      handleServiceWorkerMessage
    );

    // Cleanup function to remove the listener when component unmounts
    return () => {
      navigator.serviceWorker.removeEventListener(
        "message",
        handleServiceWorkerMessage
      );
    };
  }, [user]);

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

  // // Request notification permission and register service worker when enabling notifications
  // const enableNotifications = async () => {
  //   console.log("Current notification permission:", Notification.permission);

  //   try {
  //     console.log("Requesting notification permission...");
  //     const permission = await Notification.requestPermission();
  //     console.log("Notification permission:", permission);

  //     if (permission === "granted") {
  //       const registration = await navigator.serviceWorker.register(
  //         "/firebase-messaging-sw.js",
  //         { scope: "/" }
  //       );
  //       console.log("Service Worker registered:", registration);

  //       const token = await getToken(messaging, {
  //         vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  //         serviceWorkerRegistration: registration,
  //       });

  //       if (token && user) {
  //         // Save the FCM token to Supabase for the authenticated user
  //         const { error } = await supabase
  //           .from("User")
  //           .update({ fcmToken: token })
  //           .eq("uid", user.uid);

  //         if (error) {
  //           console.error("Error saving FCM token to Supabase:", error);
  //         } else {
  //           console.log("FCM token saved to Supabase successfully");
  //         }

  //         setNotificationsEnabled(true);
  //         // In onMessage callback within enableNotifications:
  //         onMessage(messaging, async (payload) => {
  //           console.log("Foreground message received: ", payload);
  //           const newNotification = {
  //             title: payload.notification?.title,
  //             message: payload.notification?.body,
  //             userUid: user.uid,
  //             isRead: false, // Initially, the notification is unread
  //             createdAt: new Date().toISOString(), // Use ISO format for storing in DB
  //           };

  //           // Show toast notification
  //           toast.info(`${newNotification.title}: ${newNotification.message}`, {
  //             position: "top-right",
  //             autoClose: 5000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //           });

  //           // Add to local state
  //           setNotifications((prev) => [newNotification, ...prev]);

  //           // Save to Supabase
  //           const { error: insertError } = await supabase
  //             .from("notifications")
  //             .insert(newNotification);

  //           if (insertError) {
  //             console.error(
  //               "Error saving notification to Supabase:",
  //               insertError
  //             );
  //           } else {
  //             console.log("Notification saved to Supabase successfully");
  //           }
  //         });
  //       }
  //     } else {
  //       setNotificationsEnabled(false);
  //     }
  //   } catch (error) {
  //     console.error("Error during notification setup:", error);
  //   }
  // };

  // Schedule a notification to trigger after 30 seconds
  const scheduleNotification = () => {
    console.log("Scheduling notification for 30 seconds later...");

    const newNotification = {
      title: "Scheduled Notification",
      message: "This notification was scheduled 30 seconds ago.",
      userUid: user?.uid || "Unknown",
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    const localScheduledTime = new Date(new Date().getTime() + 30 * 1000); // 30 seconds from now in local time
    console.log(
      "Scheduled to trigger at local time:",
      localScheduledTime.toLocaleString()
    );

    setTimeout(() => {
      console.log(
        "Triggering scheduled notification at local time:",
        new Date().toLocaleString()
      );
      console.log(
        "Triggering scheduled notification at UTC time:",
        new Date().toISOString()
      );

      // Show toast notification
      toast.info(`${newNotification.title}: ${newNotification.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Add to local state
      setNotifications((prev) => [newNotification, ...prev]);
    }, 30000); // 30 seconds delay
  };

  if (!user) {
    return null;
  }

  // Fetch notifications from fastapi server
  const fetchNotifications = async () => {
    try {
      const notificationData = {
        schedule: 10,
        title: "Meeting Reminder",
        message: "Don't forget the team meeting at 3 PM.",
        recipient: "user@example.com",
      };

      const response = await fetch("http://127.0.0.1:8000/send-notification/", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Inform the server that the body is JSON
        },
        body: JSON.stringify(notificationData), // Convert the JavaScript object to JSON
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      alert(data.message);
      // setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
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

            <button onClick={fetchNotifications} className={styles.testButton}>
              Schedule Test Notification
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
      <ToastContainer />
    </div>
  );
}

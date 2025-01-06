import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;
let auth;
let messaging;

if (typeof window !== "undefined") {
  // Initialize Firebase app only if running in a browser
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

  // Initialize Firebase services
  auth = getAuth(app);

  try {
    messaging = getMessaging(app);
  } catch (error) {
    console.warn(
      "Firebase Messaging is not supported in this environment:",
      error.message
    );
  }
}

// Function to generate FCM token
export const generateToken = async () => {
  if (typeof window === "undefined") return;

  const permission = await Notification.requestPermission();
  console.log(`Notification permission: ${permission}`);

  if (permission === "granted" && messaging) {
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BJv-iWtya0Az2rdM-ubxrb9lsjXASOyykjenOBBOA7XnMxaQzSp8vMwWTm2pA9nps4feW7KOLcPSkI7avvA8pQc",
      });
      console.log("FCM Token:", token);
      return token;
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  } else {
    console.warn("Notification permission denied or Messaging is unavailable");
  }
};

export { app, auth, messaging };

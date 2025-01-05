import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseClient";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, CircularProgress } from "@mui/material";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [user, loading] = useAuthState(auth); // Use react-firebase-hooks for auth state

  // Fetch old notifications when the user is authenticated
  useEffect(() => {
    const fetchOldNotification = async () => {
      if (!user) return;

      try {
        const response = await fetch(
          `/api/notifications/retrieve-noti?userUid=${user.uid}`
        );

        if (!response.ok) throw new Error("Failed to fetch notifications");

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (user) fetchOldNotification();
  }, [user]);

  // Poll for new notifications
  useEffect(() => {
    if (!user) return;

    // Function to store the notification in the database
    const storeNotification = async (notification) => {
      const dbs_notification = {
        title: notification.title,
        message: notification.message,
        userUid: user.uid,
      };

      try {
        const response = await fetch("/api/notifications/add", {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dbs_notification),
        });

        if (response.ok) {
        } else {
          alert("Failed to store notification");
        }
      } catch (error) {
        console.error("Error storing notification:", error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await fetch("/api/notifications/receive-noti", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sender: "client", userId: user.uid }),
        });

        // if (!response.ok) throw new Error("Failed to fetch notifications");
        if (response.ok) {
          const newNotification = await response.json();
          setNotifications((prev) => [newNotification, ...prev]);
          alert("new noti");
          await storeNotification(newNotification);
        }
      } catch (error) {
        console.error("Error polling notifications:", error);
      }
    };

    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [user]);

  // Notification card styles
  const cardHoverEffect = () => ({
    backgroundColor: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    borderRadius: "18px",
    padding: "15px",
    margin: "10px 0",
    transition: "transform 0.2s, box-shadow 0.2s",
    transform: "none",
    boxShadow: "none",
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "rgb(252, 242, 232)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          color: "rgb(237, 146, 61)",
          marginBottom: 12,
        }}
      >
        Notifications
      </h1>
      {notifications.length > 0 ? (
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            paddingRight: "10px",
          }}
        >
          {notifications.map((noti, index) => (
            <div key={index}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  margin: "0",
                  color: "rgb(245, 170, 100)",
                }}
              >
                {noti.title}
              </h3>
              <p
                style={{
                  fontSize: "16px",
                  margin: "5px 0 0",
                  color: "rgb(129, 88, 50)",
                }}
              >
                {noti.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            color: "#888",
          }}
        >
          No notifications yet.
        </p>
      )}
    </div>
  );
};

export default Notification;

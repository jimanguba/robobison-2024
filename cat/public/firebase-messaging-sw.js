// Import Firebase scripts for app and messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAydaNmVWQ_Je7rTaJVknuNCbBmPBGZ0xQ",
  authDomain: "petapp-8a369.firebaseapp.com",
  projectId: "petapp-8a369",
  storageBucket: "petapp-8a369.firebasestorage.app",
  messagingSenderId: "386496141516",
  appId: "1:386496141516:web:df98001a6115d982b00a69",
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  // Show the notification in the browser
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Broadcast the notification data to all clients (i.e., open tabs)
  self.clients
    .matchAll({ type: "window", includeUncontrolled: true })
    .then(function (clients) {
      clients.forEach(function (client) {
        const broadcastPayload = {
          notification: {
            title: payload.notification.title,
            body: payload.notification.body,
          }
        };
        client.postMessage(broadcastPayload);
      });
    });
});

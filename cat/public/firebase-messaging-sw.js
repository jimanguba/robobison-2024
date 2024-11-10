// Import Firebase scripts for app and messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

let messaging;

// Wait for the configuration to be sent from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.firebaseConfig) {
    // Initialize Firebase app in the service worker with the received config
    firebase.initializeApp(event.data.firebaseConfig);
    messaging = firebase.messaging();

    // Set up background message handler
    messaging.onBackgroundMessage((payload) => {
      console.log("Received background message: ", payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  }
});

// public/firebase-messaging-sw.js
// Tanzania Reach — Firebase Cloud Messaging background service worker

importScripts('https://www.gstatic.com/firebasejs/10.9.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.9.1/firebase-messaging-compat.js');

// Set up background config (automatically filled by clients at runtime)
const firebaseConfig = {
  apiKey: "placeholder",
  authDomain: "placeholder",
  projectId: "placeholder",
  storageBucket: "placeholder",
  messagingSenderId: "placeholder",
  appId: "placeholder"
};

// Parse initial parameters passed via registration query params if present
const urlParams = new URLSearchParams(location.search);
if (urlParams.has('messagingSenderId')) {
  firebaseConfig.apiKey = urlParams.get('apiKey');
  firebaseConfig.projectId = urlParams.get('projectId');
  firebaseConfig.messagingSenderId = urlParams.get('messagingSenderId');
  firebaseConfig.appId = urlParams.get('appId');
}

if (firebaseConfig.messagingSenderId !== "placeholder") {
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  // Background message handler
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title || 'Tanzania Reach Briefing';
    const notificationOptions = {
      body: payload.notification.body || 'New regulatory updates are available.',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}

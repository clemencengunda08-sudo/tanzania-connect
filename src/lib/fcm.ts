// src/lib/fcm.ts
// Tanzania Reach — Firebase Cloud Messaging Client Helper

import { getMessaging, getToken } from "firebase/messaging";
import { app } from "@/firebase";

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

export async function requestNotificationPermission(): Promise<string | null> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    console.warn("[FCM] Notifications are not supported in this browser environment.");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("[FCM] Notification permission was denied by the user.");
      return null;
    }

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
    });

    if (token) {
      console.log("[FCM] Device registered successfully. Token:", token);
      return token;
    } else {
      console.warn("[FCM] No registration token returned.");
      return null;
    }
  } catch (error) {
    console.error("[FCM] Device registration failed:", error);
    return null;
  }
}

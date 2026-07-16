"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/firebase/admin";

export async function createSessionAction(
  idToken: string
): Promise<{ success: boolean; error?: string }> {
  if (!idToken) {
    return { success: false, error: "No token provided" };
  }

  try {
    if (!adminAuth) {
      throw new Error("Admin Auth not initialized");
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    const { adminDb } = await import("@/firebase/admin");
    if (!adminDb) {
      throw new Error("Admin DB not initialized");
    }

    const adminDoc = await adminDb.collection("admin_users").doc(decoded.uid).get();

    if (!adminDoc.exists || !adminDoc.data()?.active) {
      return { success: false, error: "Access denied. Not an admin user." };
    }

    const expiresIn = 60 * 60 * 24 * 7 * 1000; // 7 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const cookieStore = await cookies();
    cookieStore.set("firebase-session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("[Auth] createSession failed:", error);
    return { success: false, error: "Authentication failed" };
  }
}

export async function signOutAction(): Promise<void> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("firebase-session");

  if (sessionCookie?.value && adminAuth) {
    try {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie.value);
      await adminAuth.revokeRefreshTokens(decoded.uid);
    } catch (e) {
      // Ignore session errors during signout
    }
  }

  cookieStore.delete("firebase-session");
  redirect("/p-access/login");
}

"use server";

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { MediaFile, MediaCategory } from "@/types";

// Verify admin helper
async function verifyAdmin() {
  const { cookies } = await import("next/headers");
  const { redirect } = await import("next/navigation");
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("firebase-session");

  const cookieValue = sessionCookie?.value;

  if (!cookieValue) {
    redirect("/p-access/login");
    throw new Error("Unauthorized: No session cookie found");
  }

  try {
    const { adminAuth, adminDb } = await import("@/firebase/admin");
    if (!adminAuth || !adminDb) throw new Error("Admin SDK not ready");

    const decoded = await adminAuth.verifySessionCookie(cookieValue, true);
    const adminDoc = await adminDb.collection("admin_users").doc(decoded.uid).get();

    if (!adminDoc.exists || !adminDoc.data()?.active) {
      redirect("/p-access/login");
      throw new Error("Unauthorized: Inactive or non-existent admin");
    }

    return decoded.uid;
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) throw error;
    redirect("/p-access/login");
    throw new Error("Unauthorized: Authentication failed");
  }
}

export async function saveMediaMetadataAction(data: {
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  type: "image" | "document" | "video" | "other";
  category: MediaCategory;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt: string;
  storagePath: string;
}): Promise<{
  success: boolean;
  id?: string;
  error?: string;
}> {
  const adminUid = await verifyAdmin();

  try {
    const docRef = await addDoc(collection(db, "media"), {
      ...data,
      description: "",
      tags: [],
      usedIn: [],
      uploadedAt: serverTimestamp(),
      uploadedBy: adminUid,
    });

    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getMediaListAction(category?: MediaCategory): Promise<MediaFile[]> {
  await verifyAdmin();

  try {
    const baseQuery = collection(db, "media");
    const q = category
      ? query(baseQuery, where("category", "==", category), orderBy("uploadedAt", "desc"))
      : query(baseQuery, orderBy("uploadedAt", "desc"));

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as MediaFile[];
  } catch (error) {
    console.error("[Media] List failed:", error);
    return [];
  }
}

export async function updateMediaAction(mediaId: string, data: Partial<MediaFile>): Promise<{ success: boolean; error?: string }> {
  await verifyAdmin();
  const { id: _id, uploadedAt: _ua, uploadedBy: _ub, storagePath: _sp, ...safeData } = data as MediaFile;
  try {
    await updateDoc(doc(db, "media", mediaId), safeData);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMediaAction(mediaId: string, storagePath: string): Promise<{ success: boolean; error?: string }> {
  await verifyAdmin();
  try {
    await deleteDoc(doc(db, "media", mediaId));
    const { adminApp } = await import("@/firebase/admin");
    if (adminApp) {
      const { getStorage } = await import("firebase-admin/storage");
      const bucket = getStorage(adminApp).bucket();
      await bucket.file(storagePath).delete();
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

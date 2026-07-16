"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type {
  Sector,
  AdminUser,
  SiteSettings,
} from "@/types";

// ─────────────────────────────────────────────
// AUTH VERIFICATION
// ─────────────────────────────────────────────

async function verifyAdminSession(
  requiredRole?: "owner" | "admin" | "editor"
): Promise<AdminUser> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("firebase-session");
  const cookieValue = sessionCookie?.value;

  if (!cookieValue) {
    redirect("/p-access/login");
    throw new Error("Unauthorized");
  }

  let adminData: AdminUser | null = null;
  let shouldRedirect = false;

  try {
    const { adminAuth, adminDb } = await import("@/firebase/admin");

    if (!adminAuth || !adminDb) {
      throw new Error("Admin SDK not initialized");
    }

    const decodedToken = await adminAuth.verifySessionCookie(
      cookieValue,
      true
    );

    const adminDoc = await adminDb
      .collection("admin_users")
      .doc(decodedToken.uid)
      .get();

    if (!adminDoc.exists) {
      shouldRedirect = true;
    } else {
      adminData = adminDoc.data() as AdminUser;

      if (!adminData.active) {
        shouldRedirect = true;
      }

      if (requiredRole && !shouldRedirect) {
        const roleHierarchy = {
          viewer: 0,
          editor: 1,
          admin: 2,
          owner: 3,
        };

        const userLevel = (roleHierarchy as any)[adminData.role] ?? -1;
        const requiredLevel = (roleHierarchy as any)[requiredRole] ?? 999;

        if (userLevel < requiredLevel) {
          throw new Error("Insufficient permissions");
        }
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error;
    }
    console.error("[Admin] Session verification failed:", error);
    shouldRedirect = true;
  }

  if (shouldRedirect) {
    redirect("/p-access/login");
    throw new Error("Redirecting...");
  }

  return adminData!;
}

// ─────────────────────────────────────────────
// SECTOR ACTIONS
// ─────────────────────────────────────────────

export async function getSectorsAction(): Promise<Sector[]> {
  await verifyAdminSession("editor");

  try {
    const { adminDb } = await import("@/firebase/admin");
    if (!adminDb) throw new Error("Admin DB not ready");

    const snapshot = await adminDb
      .collection("sectors")
      .orderBy("order", "asc")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Sector[];
  } catch (error) {
    console.error("[Admin] getSectors failed:", error);
    return [];
  }
}

export async function createSectorAction(
  data: Omit<Sector, "id" | "createdAt" | "lastUpdated">
): Promise<{ success: boolean; id?: string; error?: string }> {
  const admin = await verifyAdminSession("editor");

  try {
    const { adminDb } = await import("@/firebase/admin");
    if (!adminDb) throw new Error("Admin DB not ready");

    const existing = await adminDb
      .collection("sectors")
      .where("slug", "==", data.slug)
      .get();

    if (!existing.empty) {
      return { success: false, error: "A sector with this slug already exists" };
    }

    const docRef = await adminDb.collection("sectors").add({
      ...data,
      createdAt: new Date(),
      lastUpdated: new Date(),
      updatedBy: admin.uid,
      viewCount: 0,
      aiGenerated: false,
    });

    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSectorAction(
  sectorId: string,
  data: Partial<Sector>
): Promise<{ success: boolean; error?: string }> {
  const admin = await verifyAdminSession("editor");

  const { id: _id, createdAt: _createdAt, ...safeData } = data as any;

  try {
    const { adminDb } = await import("@/firebase/admin");
    if (!adminDb) throw new Error("Admin DB not ready");

    await adminDb.collection("sectors").doc(sectorId).update({
      ...safeData,
      lastUpdated: new Date(),
      updatedBy: admin.uid,
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSectorAction(
  sectorId: string
): Promise<{ success: boolean; error?: string }> {
  await verifyAdminSession("owner");

  try {
    const { adminDb } = await import("@/firebase/admin");
    if (!adminDb) throw new Error("Admin DB not ready");

    await adminDb.collection("sectors").doc(sectorId).delete();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ─────────────────────────────────────────────
// SETTINGS ACTIONS
// ─────────────────────────────────────────────

export async function getSettingsAction(): Promise<SiteSettings | null> {
  await verifyAdminSession("admin");

  try {
    const { adminDb } = await import("@/firebase/admin");
    if (!adminDb) throw new Error("Admin DB not ready");

    const snapshot = await adminDb.collection("settings").doc("main").get();
    if (!snapshot.exists) return null;

    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as SiteSettings;
  } catch (error) {
    console.error("[Admin] getSettings failed:", error);
    return null;
  }
}

export async function updateSettingsAction(
  data: Partial<SiteSettings>
): Promise<{ success: boolean; error?: string }> {
  await verifyAdminSession("owner");

  try {
    const { adminDb } = await import("@/firebase/admin");
    if (!adminDb) throw new Error("Admin DB not ready");

    await adminDb.collection("settings").doc("main").update({
      ...data,
      lastUpdated: new Date(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

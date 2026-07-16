'use server';

/**
 * @fileOverview Server Actions for Tanzania Reach Admin Operations.
 */

import { db, auth } from '@/firebase';
import { 
  doc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  collection, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import type { SiteConfigDoc, SectorPageDoc, AdminRole } from '@/types';

async function verifyServerAdmin(requiredRole?: AdminRole): Promise<boolean> {
  const user = auth?.currentUser;
  if (!user) return false;

  try {
    const adminDoc = await getDoc(doc(db, 'admin_users', user.uid));
    if (!adminDoc.exists()) return false;
    
    const role = adminDoc.data().role as AdminRole;
    if (requiredRole && role !== requiredRole && role !== 'owner') return false;
    
    return ['owner', 'super_admin', 'editor'].includes(role);
  } catch {
    return false;
  }
}

export async function updateGlobalSettings(data: Partial<SiteConfigDoc>) {
  const isAdmin = await verifyServerAdmin('owner');
  if (!isAdmin) throw new Error('Unauthorized');

  const docRef = doc(db, 'settings', 'global');
  await setDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  revalidatePath('/p-access/settings');
  revalidatePath('/');
  return { success: true };
}

export async function addSectorAction(data: Omit<SectorPageDoc, 'id'>) {
  const isAdmin = await verifyServerAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  const colRef = collection(db, 'sectors');
  const docRef = await addDoc(colRef, {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  revalidatePath('/p-access/content');
  revalidatePath('/guides');
  return { success: true, id: docRef.id };
}

export async function updateSectorAction(id: string, data: Partial<SectorPageDoc>) {
  const isAdmin = await verifyServerAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  const docRef = doc(db, 'sectors', id);
  await setDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  revalidatePath('/p-access/content');
  return { success: true };
}

export async function deleteSectorAction(id: string) {
  const isOwner = await verifyServerAdmin('owner');
  if (!isOwner) throw new Error('Unauthorized: Owner role required');

  const docRef = doc(db, 'sectors', id);
  await deleteDoc(docRef);

  revalidatePath('/p-access/content');
  return { success: true };
}

export async function updateImageSlotAction(slotId: string, url: string) {
  const isAdmin = await verifyServerAdmin();
  if (!isAdmin) throw new Error('Unauthorized');

  const docRef = doc(db, 'settings', 'media_slots');
  await setDoc(docRef, {
    [slotId]: url,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  revalidatePath('/p-access/media');
  revalidatePath('/');
  return { success: true };
}
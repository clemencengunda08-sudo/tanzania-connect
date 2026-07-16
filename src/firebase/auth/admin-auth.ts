
'use client';

import { 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import type { AdminRole, AdminUserDoc } from '@/types';

/**
 * Verifies if a user has admin permissions by checking the Firestore 'admin_users' collection.
 */
async function verifyAdminRole(uid: string): Promise<AdminRole> {
  if (!db) throw new Error('Database not initialized.');
  
  try {
    const adminDoc = await getDoc(doc(db, 'admin_users', uid));
    
    if (!adminDoc.exists()) {
      throw new Error(`Access Denied: Your UID [${uid}] is not registered. Please add this UID to 'admin_users' collection in Console.`);
    }

    const data = adminDoc.data() as AdminUserDoc;
    const role = data.role;
    if (!['owner', 'super_admin', 'editor'].includes(role)) {
      throw new Error(`Insufficient Permissions: Role '${role}' is not authorized.`);
    }

    return role;
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    
    if (error.code === 'permission-denied') {
      throw new Error(`Firebase Permission Denied: Your UID [${uid}] is valid, but your Firestore SECURITY RULES are blocking access. Please update the Rules tab.`);
    }
    
    throw new Error(error.message || 'Security verification failed.');
  }
}

export async function signInAdmin(email: string, password: string): Promise<{ user: User; role: AdminRole }> {
  if (!auth) throw new Error('Auth system not ready.');
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const role = await verifyAdminRole(credential.user.uid);
    return { user: credential.user, role };
  } catch (err: unknown) {
    if (auth.currentUser) await firebaseSignOut(auth);
    throw err;
  }
}

export async function signInWithGoogleAdmin(): Promise<{ user: User; role: AdminRole }> {
  if (!auth) throw new Error('Auth system not ready.');
  const provider = new GoogleAuthProvider();
  try {
    const credential = await signInWithPopup(auth, provider);
    const role = await verifyAdminRole(credential.user.uid);
    return { user: credential.user, role };
  } catch (err: unknown) {
    if (auth.currentUser) await firebaseSignOut(auth);
    throw err;
  }
}

export const signOut = (): Promise<void> => auth ? firebaseSignOut(auth) : Promise.resolve();

export const getCurrentUser = (): Promise<User | null> =>
  new Promise((resolve) => {
    if (!auth) {
      resolve(null);
      return;
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      unsub();
      resolve(user);
    });
  });

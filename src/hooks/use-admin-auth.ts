'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/firebase';

interface AdminUser {
  user: User;
  role: 'super_admin' | 'editor' | 'owner';
}

export function useAdminAuth() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setAdmin(null);
        setLoading(false);
        return;
      }

      try {
        // Safe check - rules now allow users to read their own profile
        const snap = await getDoc(doc(db, 'admin_users', user.uid));
        if (snap.exists()) {
          const role = snap.data().role;
          if (['super_admin', 'editor', 'owner'].includes(role)) {
            setAdmin({ user, role });
          } else {
            setAdmin(null);
          }
        } else {
          setAdmin(null);
        }
      } catch (err: any) {
        // Silent fail for non-admins to prevent UI blocking blur
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { admin, loading, isAuthenticated: !!admin };
}
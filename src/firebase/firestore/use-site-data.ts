'use client';

/**
 * @fileOverview Client hooks for real-time DATA READING.
 * All WRITES have been moved to Server Actions for security.
 */

import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { SiteConfigDoc, SectorPageDoc } from '@/types';
import { 
  updateGlobalSettings, 
  addSectorAction, 
  updateSectorAction, 
  deleteSectorAction, 
  updateImageSlotAction 
} from '@/lib/actions/admin-actions';

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteConfigDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const docRef = doc(db, 'settings', 'global');
    const unsub = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setSettings(snap.data() as SiteConfigDoc);
      }
      setLoading(false);
    }, (error) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'settings/global',
        operation: 'get',
      }));
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateSettings = async (newData: Partial<SiteConfigDoc>) => {
    return await updateGlobalSettings(newData);
  };

  return { settings, updateSettings, loading };
}

export function useImageSlots() {
  const [slots, setSlots] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const docRef = doc(db, 'settings', 'media_slots');
    const unsub = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setSlots(snap.data() as Record<string, string>);
      }
      setLoading(false);
    }, () => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'settings/media_slots',
        operation: 'get',
      }));
      setLoading(false);
    });
    return unsub;
  }, []);

  const updateSlot = async (slotId: string, url: string) => {
    return await updateImageSlotAction(slotId, url);
  };

  return { slots, updateSlot, loading };
}

export function useSectors() {
  const [sectors, setSectors] = useState<SectorPageDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;
    const colRef = collection(db, 'sectors');
    
    // Using a simpler query for public access index
    const unsub = onSnapshot(colRef, (snap) => {
      const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as SectorPageDoc));
      setSectors(data);
      setLoading(false);
    }, (error) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: 'sectors',
        operation: 'list',
      }));
      setLoading(false);
    });
    return unsub;
  }, []);

  const addSector = async (data: Omit<SectorPageDoc, 'id'>) => {
    return await addSectorAction(data);
  };

  const updateSector = async (id: string, data: Partial<SectorPageDoc>) => {
    return await updateSectorAction(id, data);
  };

  const deleteSector = async (id: string) => {
    return await deleteSectorAction(id);
  };

  return { sectors, addSector, updateSector, deleteSector, loading };
}
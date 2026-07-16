'use client';

import { useEffect, useState, useMemo } from 'react';
import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { X, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteConfigDoc } from '@/types';

export function MaintenanceBanner() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem("tr-maintenance-dismissed");
      if (stored === "true") setDismissed(true);
    }
  }, []);

  const globalSettingsRef = useMemo(() => {
    if (!db || !mounted) return null;
    return doc(db, 'settings', 'global');
  }, [mounted]);

  // UseDoc handles loading state internally
  const { data: settings, loading } = useDoc<SiteConfigDoc>(globalSettingsRef);

  // Return nothing during SSR or if still loading/dismissed
  if (!mounted || loading || !settings || dismissed) {
    return null;
  }

  // Safe access with optional chaining and fallback
  const isMaintenance = settings?.maintenanceMode === true;
  if (!isMaintenance) return null;

  const handleDismiss = (): void => {
    setDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("tr-maintenance-dismissed", "true");
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[150] bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg"
      >
        <div className="container mx-auto px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm font-bold tracking-tight">
            <div className="p-1 bg-white/20 rounded-lg">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            <span>
              <span className="hidden sm:inline">System Notice: </span>
              Scheduled maintenance is in progress.
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

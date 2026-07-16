'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  where,
  Timestamp,
  getCountFromServer
} from 'firebase/firestore';
import { db } from '@/firebase';

export interface AIQuery {
  id: string;
  query: string;
  sector: string;
  confidence: 'high' | 'medium' | 'low';
  timestamp: Timestamp;
}

export interface DashboardStats {
  totalQueries: number;
  todayQueries: number;
  topSector: string;
  highConfidenceRate: number;
}

/**
 * Hook to listen to the last 20 AI queries in real-time.
 */
export function useRecentQueries() {
  const [queries, setQueries] = useState<AIQuery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const q = query(
      collection(db, 'ai_queries'),
      orderBy('timestamp', 'desc'),
      limit(20)
    );

    const unsub = onSnapshot(q, (snap) => {
      setQueries(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as AIQuery))
      );
      setLoading(false);
    }, (error) => {
      console.warn('Recent queries fetch failed:', error);
      setLoading(false);
    });

    return unsub;
  }, []);

  return { queries, loading };
}

/**
 * Hook to fetch aggregate dashboard statistics.
 */
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    async function fetchStats() {
      try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [totalSnap, todaySnap, highSnap] = await Promise.all([
          getCountFromServer(collection(db, 'ai_queries')),
          getCountFromServer(
            query(
              collection(db, 'ai_queries'),
              where('timestamp', '>=', Timestamp.fromDate(today))
            )
          ),
          getCountFromServer(
            query(
              collection(db, 'ai_queries'),
              where('confidence', '==', 'high')
            )
          ),
        ]);

        const total = totalSnap.data().count;

        setStats({
          totalQueries: total,
          todayQueries: todaySnap.data().count,
          topSector: 'General',
          highConfidenceRate: total > 0
            ? Math.round((highSnap.data().count / total) * 100)
            : 0,
        });
      } catch (err) {
        console.warn('Stats fetch failed, using defaults:', err);
        setStats({
          totalQueries: 0,
          todayQueries: 0,
          topSector: 'None',
          highConfidenceRate: 0,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { stats, loading };
}

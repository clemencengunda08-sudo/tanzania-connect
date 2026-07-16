'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/firebase';
import { AIQuery } from './use-dashboard';

export interface DailyTrend {
  date: string;
  count: number;
}

export interface SectorMetric {
  name: string;
  value: number;
}

export interface ConfidenceMetric {
  name: string;
  value: number;
}

export function useAnalyticsData(days: number = 30) {
  const [data, setData] = useState<AIQuery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    // Fetch enough records for client-side aggregation (limit to 500 for MVP)
    const q = query(
      collection(db, 'ai_queries'),
      orderBy('timestamp', 'desc'),
      limit(500)
    );

    const unsub = onSnapshot(q, (snap) => {
      const records = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AIQuery));
      setData(records);
      setLoading(false);
    });

    return unsub;
  }, []);

  // Compute Daily Trend
  const trendData: DailyTrend[] = Object.entries(
    data.reduce<Record<string, number>>((acc, q) => {
      const date = q.timestamp?.toDate().toISOString().split('T')[0];
      if (date) acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-days);

  // Compute Sector Distribution
  const sectorData: SectorMetric[] = Object.entries(
    data.reduce<Record<string, number>>((acc, q) => {
      const sector = q.sector?.toLowerCase() || 'general';
      acc[sector] = (acc[sector] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Compute Confidence Breakdown
  const confidenceData: ConfidenceMetric[] = Object.entries(
    data.reduce<Record<string, number>>((acc, q) => {
      const level = q.confidence || 'low';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, { high: 0, medium: 0, low: 0 })
  ).map(([name, value]) => ({ name, value }));

  return {
    raw: data,
    trend: trendData,
    sectors: sectorData,
    confidence: confidenceData,
    loading
  };
}

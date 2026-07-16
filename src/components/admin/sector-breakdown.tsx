'use client';

import { useRecentQueries } from '@/firebase/firestore/use-dashboard';

const sectorEmoji: Record<string, string> = {
  immigration:    '🛂',
  agriculture:    '🌾',
  banking:        '🏦',
  housing:        '🏡',
  healthcare:     '🏥',
  transport:      '🚌',
  wildlife:       '🦁',
  food:           '🍽️',
  corporate:      '🏢',
  infrastructure: '🏗️',
  entertainment:  '🎭',
  history:        '📜',
  culture:        '✨',
  general:        '🌍',
};

export function SectorBreakdown() {
  const { queries, loading } = useRecentQueries();

  const counts = queries.reduce<Record<string, number>>((acc, q) => {
    const s = q.sector?.toLowerCase() || 'general';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const max = sorted[0]?.[1] || 1;

  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
      <h2 className="font-headline font-semibold text-white text-sm mb-5">
        Activity by Sector
      </h2>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-8 w-full bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <p className="text-xs text-slate-600 text-center py-8 italic font-medium">
          No aggregate data available
        </p>
      ) : (
        <div className="space-y-4">
          {sorted.map(([sector, count]) => (
            <div key={sector}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-300 flex items-center gap-2 capitalize">
                  <span className="text-base">{sectorEmoji[sector] || '📄'}</span>
                  {sector}
                </span>
                <span className="text-[10px] font-black font-mono text-slate-500">
                  {count}
                </span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

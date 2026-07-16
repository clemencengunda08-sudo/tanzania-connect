'use client';

import { useRecentQueries } from '@/firebase/firestore/use-dashboard';
import { MessageSquare, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const confidenceColor = {
  high:   'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low:    'bg-red-500/10 text-red-400 border-red-500/20',
};

function timeAgo(timestamp: { toDate: () => Date } | null) {
  if (!timestamp) return 'just now';
  const seconds = Math.floor((Date.now() - timestamp.toDate().getTime()) / 1000);
  if (seconds < 60)  return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return `${Math.floor(seconds / 3600)}h ago`;
}

export function QueryFeed() {
  const { queries, loading } = useRecentQueries();

  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-3xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-tanzania-400" />
          <h2 className="font-headline font-semibold text-white text-sm">
            Live AI Queries
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">Live Feed</span>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-6 py-4 flex gap-4 animate-pulse">
              <div className="h-4 w-3/4 bg-white/5 rounded" />
              <div className="h-4 w-12 bg-white/5 rounded ml-auto" />
            </div>
          ))
        ) : queries.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-slate-700" />
            <p className="text-sm text-slate-500">No recent queries detected</p>
          </div>
        ) : (
          queries.map((q) => (
            <div key={q.id} className="px-6 py-4 flex items-start gap-4 hover:bg-white/[0.02] transition-colors group">
              <Badge variant="outline" className="shrink-0 mt-0.5 capitalize border-white/10 text-slate-400 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                {q.sector}
              </Badge>
              <p className="text-sm text-slate-300 flex-1 leading-relaxed">
                {q.query}
              </p>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded border ${confidenceColor[q.confidence]}`}>
                  {q.confidence}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-600">
                  <Clock className="w-2.5 h-2.5" />
                  {timeAgo(q.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

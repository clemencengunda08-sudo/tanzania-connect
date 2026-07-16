'use client';

import { useAnalyticsData } from '@/firebase/firestore/use-analytics';
import { useDashboardStats } from '@/firebase/firestore/use-dashboard';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { StatCard } from '@/components/admin/stat-card';
import { 
  BarChart2, Zap, 
  Loader2, ArrowLeft 
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy-load charts with any cast to bypass Recharts type incompatibility in dynamic imports
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer) as any, { ssr: false }) as any;
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart) as any, { ssr: false }) as any;
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar) as any, { ssr: false }) as any;
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis) as any, { ssr: false }) as any;
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis) as any, { ssr: false }) as any;
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid) as any, { ssr: false }) as any;
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip) as any, { ssr: false }) as any;
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell) as any, { ssr: false }) as any;

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];

export default function AdminAnalyticsPage() {
  const { sectors, raw, loading: dataLoading } = useAnalyticsData(7);

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-200">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-headline font-black tracking-tight text-white">
              System Intelligence
            </h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">
              Data Metrics & Usage Insights
            </p>
          </div>
          <Link href="/p-access/dashboard">
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </button>
          </Link>
        </header>

        <div className="p-10 space-y-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="System Logs"
              value={raw.length}
              sub="Total entries detected"
              icon={BarChart2}
              color="blue"
            />
            <StatCard
              label="Active Sectors"
              value={sectors.length}
              sub="Categorized data nodes"
              icon={Zap}
              color="gold"
            />
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8">
            <h3 className="font-headline font-bold text-white mb-8">Interest Distribution</h3>
            <div className="h-[400px] w-full">
              {/* @ts-ignore - Recharts React 19 type mismatch */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sectors} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={100} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                    {sectors.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

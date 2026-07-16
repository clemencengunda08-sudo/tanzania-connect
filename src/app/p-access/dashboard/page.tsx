'use client';

import { useDashboardStats } from '@/firebase/firestore/use-dashboard';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { StatCard } from '@/components/admin/stat-card';
import { QueryFeed } from '@/components/admin/query-feed';
import { QuickActions } from '@/components/admin/quick-actions';
import { SectorBreakdown } from '@/components/admin/sector-breakdown';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { SEOChecklist } from '@/components/admin/seo-checklist';
import { 
  MessageSquare, 
  TrendingUp, 
  Globe, 
  Zap,
  LogOut
} from 'lucide-react';
import { signOut } from '@/firebase/auth/admin-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const { admin } = useAdminAuth();
  const { stats, loading } = useDashboardStats();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/p-access/login');
  };

  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-200">
      <AdminSidebar />

      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-headline font-black tracking-tight text-white">
              Control Center
            </h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">
              90s Session Protection Active
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-2xl border border-white/5">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-black text-primary">
                {admin?.user?.email?.[0].toUpperCase()}
              </div>
              <div className="text-right hidden md:block">
                <p className="text-xs font-bold text-white leading-none">{admin?.user?.email}</p>
                <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-1">{admin?.role}</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-2xl text-slate-400 hover:text-destructive hover:bg-destructive/10"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <div className="p-10 space-y-10 max-w-7xl mx-auto">
          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total Usage"
              value={loading ? '...' : (stats?.totalQueries ?? 0).toLocaleString()}
              sub="Aggregate data"
              icon={MessageSquare}
              color="blue"
            />
            <StatCard
              label="Active Nodes"
              value={loading ? '...' : stats?.todayQueries ?? 0}
              sub="New entries today"
              icon={TrendingUp}
              color="purple"
            />
            <StatCard
              label="Hot Sector"
              value={loading ? '...' : stats?.topSector ?? '—'}
              sub="High demand area"
              icon={Globe}
              color="gold"
            />
            <StatCard
              label="System Precision"
              value={loading ? '...' : `${stats?.highConfidenceRate ?? 0}%`}
              sub="Verification rate"
              icon={Zap}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Feed */}
            <div className="lg:col-span-2">
              <QueryFeed />
            </div>

            {/* Tools */}
            <div className="space-y-8">
              <QuickActions />
              <SEOChecklist />
              <SectorBreakdown />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

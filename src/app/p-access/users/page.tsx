'use client';

import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Shield, UserPlus, MoreVertical } from 'lucide-react';

const admins = [
  { id: '1', email: 'owner@tanzaniaconnect.co.tz', role: 'owner', status: 'Active' },
  { id: '2', email: 'editor@tanzaniaconnect.co.tz', role: 'editor', status: 'Active' },
];

export default function AdminUsersPage() {
  return (
    <div className="flex min-h-screen bg-[#0a0f1e] text-slate-200">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-headline font-black tracking-tight text-white">System Access</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Manage Administrators</p>
          </div>
          <Button className="gradient-tanzania rounded-xl font-bold gap-2">
            <UserPlus className="w-4 h-4" /> Add Admin
          </Button>
        </header>

        <div className="p-10 space-y-8 max-w-7xl mx-auto">
          <Card className="bg-slate-900/40 border-white/5 rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-white/5 p-6 bg-white/5">
              <CardTitle className="text-sm font-headline uppercase tracking-widest text-slate-400">Authorized Personnel</CardTitle>
            </CardHeader>
            <div className="divide-y divide-white/5">
              {admins.map((user) => (
                <div key={user.id} className="p-6 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-slate-500">
                      {user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{user.email}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-tighter mt-1">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">{user.status}</Badge>
                    <Button variant="ghost" size="icon" className="rounded-xl text-slate-600"><MoreVertical className="w-4 h-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex items-start gap-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white">Security Protocol</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Only "Owner" roles can add or remove other administrators. All access logs are recorded for audit purposes in the 2026 system architecture.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

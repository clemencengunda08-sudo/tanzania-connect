'use client';

import { useRouter } from 'next/navigation';
import { Settings, Users, FileText, RefreshCw, Bell, Database } from 'lucide-react';

const actions = [
  { label: 'Content',  icon: FileText,   href: '/p-access/content',  color: 'blue'   },
  { label: 'Analytics',  icon: Database,   href: '/p-access/analytics',color: 'purple' },
  { label: 'Admins', icon: Users,      href: '/p-access/users',    color: 'gold'   },
  { label: 'Alerts',   icon: Bell,       href: '/p-access/settings', color: 'green'  },
  { label: 'Settings', icon: Settings,   href: '/p-access/settings', color: 'blue'   },
  { label: 'Cache',   icon: RefreshCw,  href: null,                  color: 'purple' },
];

const colorMap: Record<string, string> = {
  blue:   'bg-tanzania-500/10 border-tanzania-500/20 text-tanzania-400 hover:bg-tanzania-500/20',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-400 hover:bg-purple-500/20',
  gold:   'bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20',
  green:  'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20',
};

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
      <h2 className="font-headline font-semibold text-white text-sm mb-5">
        Quick Access
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map(({ label, icon: Icon, href, color }) => (
          <button
            key={label}
            onClick={() => href && router.push(href)}
            className={`
              flex items-center gap-3 p-3.5 rounded-2xl
              border text-xs font-bold uppercase tracking-widest
              transition-all duration-200
              ${colorMap[color]}
            `}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

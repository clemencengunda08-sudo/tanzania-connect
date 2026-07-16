'use client';

import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, FileText, 
  BarChart2, Users, Settings, 
  Globe, Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: 'Overview',  icon: LayoutDashboard, href: '/p-access/dashboard'   },
  { label: 'Content',   icon: FileText,        href: '/p-access/content'     },
  { label: 'Media',     icon: ImageIcon,       href: '/p-access/media'       },
  { label: 'Analytics', icon: BarChart2,       href: '/p-access/analytics'   },
  { label: 'Admins',    icon: Users,           href: '/p-access/users'       },
  { label: 'System',    icon: Settings,        href: '/p-access/settings'    },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <aside className="w-64 bg-slate-900 border-r border-white/5 shrink-0 flex flex-col p-6 gap-2">
      <div className="flex items-center gap-3 px-3 py-4 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-xl shadow-lg shadow-primary/20">
          🇹🇿
        </div>
        <div>
          <p className="font-headline font-black text-white tracking-tighter text-lg leading-none">
            TANZANIA REACH
          </p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1 text-slate-500">
            Control Portal
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => router.push(href)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium
                transition-all duration-200
                ${isActive 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-slate-500'}`} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="pt-6 border-t border-white/5">
        <button
          onClick={() => router.push('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe className="w-4 h-4 shrink-0 text-slate-500" />
          View Portal
        </button>
      </div>
    </aside>
  );
}

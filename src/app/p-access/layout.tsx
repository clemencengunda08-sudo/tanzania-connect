'use client';

import { useAdminAuth } from '@/hooks/use-admin-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { signOut } from '@/firebase/auth/admin-auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Inactivity Logout Logic (90 Seconds)
  useEffect(() => {
    if (!admin) return;

    const logout = async () => {
      await signOut();
      router.replace('/p-access/login');
    };

    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(logout, 90000); // 90 Seconds
    };

    // Events to track activity
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetTimer));

    resetTimer();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach(e => window.removeEventListener(e, resetTimer));
    };
  }, [admin, router]);

  useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname === '/p-access/login';

    if (!admin && !isLoginPage) {
      router.replace('/p-access/login');
    }

    if (admin && isLoginPage) {
      router.replace('/p-access/dashboard');
    }
  }, [admin, loading, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-2xl text-white shadow-xl shadow-primary/20 animate-pulse">
            🇹🇿
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <div className="min-h-screen bg-[#0a0f1e] text-slate-200 font-body">{children}</div>;
}

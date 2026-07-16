"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { House, Compass, Newspaper, BookOpen, Info } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: any;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/guides", label: "Sectors", icon: Compass },
  { href: "/news", label: "News", icon: Newspaper },
  { href: "/phrasebook", label: "Swahili", icon: BookOpen },
  { href: "/directory", label: "Contacts", icon: Info },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return consistent structural placeholder during SSR
  if (!mounted) {
    return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border/50 h-14" aria-hidden="true" />
    );
  }

  // Hide completely on admin routes after mount
  if (pathname?.startsWith("/p-access")) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border/50 pb-[env(safe-area-inset-bottom)] px-4">
      <div className="flex justify-around items-center h-14">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center justify-center w-12 h-12 rounded-xl transition-all active:scale-90"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNavHighlight"
                  className="absolute inset-0 rounded-2xl bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <item.icon 
                className={`h-5 w-5 relative transition-transform ${isActive ? "text-primary scale-110" : "text-muted-foreground"}`} 
              />
              {isActive && (
                <motion.div
                  layoutId="activeDotIndicator"
                  className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

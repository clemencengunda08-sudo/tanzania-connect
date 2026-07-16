"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// Use emoji icons to bypass Lucide HMR issues on mobile
const MENU_LINKS = [
  { href: "/visa", label: "Immigration", icon: "🛂" },
  { href: "/corporate", label: "Corporate", icon: "🏢" },
  { href: "/agriculture", label: "Agriculture", icon: "🌾" },
  { href: "/banking", label: "Banking", icon: "🏦" },
  { href: "/infrastructure", label: "Infrastructure", icon: "🏗️" },
  { href: "/healthcare", label: "Healthcare", icon: "🏥" },
  { href: "/housing", label: "Housing", icon: "🏡" },
  { href: "/culture", label: "Culture", icon: "✨" },
  { href: "/phrasebook", label: "Phrasebook", icon: "📚" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) onClose();
  }, [pathname, mounted, onClose]);

  useEffect(() => {
    if (!mounted) return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm bg-background border-l border-border overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-xl px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-tanzania flex items-center justify-center text-white font-black text-xs">TR</div>
                <span className="font-headline font-black uppercase tracking-tighter">Tanzania Reach</span>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-xl hover:bg-muted flex items-center justify-center text-2xl text-muted-foreground">
                ×
              </button>
            </div>

            <div className="px-4 py-6">
              <h3 className="px-4 mb-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Expert Manuals</h3>
              <nav className="grid grid-cols-1 gap-1">
                {MENU_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${isActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "hover:bg-muted"}`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="px-6 py-6 border-t border-border space-y-4">
              <div className="space-y-2">
                 <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest px-1">Expert Support</p>
                 <a href="tel:+255792867427" className="w-full flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border/50 hover:bg-muted transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                       📞
                    </div>
                    <div>
                       <p className="text-xs font-bold text-foreground">0792 867 427</p>
                       <p className="text-[10px] text-muted-foreground">Direct Hotline</p>
                    </div>
                 </a>
              </div>
              
              <Link href="/contact" className="w-full flex items-center justify-center gap-2 h-14 rounded-2xl gradient-tanzania text-white font-black text-sm shadow-xl shadow-primary/20">
                💬 Get Professional Advice
              </Link>
            </div>

            <div className="px-6 py-8 text-center text-[9px] text-muted-foreground font-black uppercase tracking-[0.3em] border-t">
              © 2026 Tanzania Reach 🇹🇿
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

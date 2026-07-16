"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { MessageSquare, Phone, Radio, Plus, Sparkles } from "lucide-react";

interface FabAction {
  href?: string;
  action?: string;
  label: string;
  icon: any;
  color: string;
}

const FAB_ACTIONS: FabAction[] = [
  { href: "tel:+255792867427", label: "Expert Call", icon: Phone, color: "from-tanzania-500 to-cyan-500" },
  { href: "/news", label: "Live News", icon: Radio, color: "from-purple-500 to-pink-500" },
  { action: "ai-chat", label: "AI Advisor", icon: Sparkles, color: "from-blue-500 to-violet-500" },
  { href: "https://wa.me/255792867427", label: "WhatsApp", icon: MessageSquare, color: "from-green-500 to-emerald-500" },
];

export function FloatingActionButton() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleAiChatState = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsAiChatOpen(!!customEvent.detail?.open);
    };
    window.addEventListener("ai-chat-state", handleAiChatState);
    return () => window.removeEventListener("ai-chat-state", handleAiChatState);
  }, []);

  if (!mounted) return null;
  if (pathname?.startsWith("/p-access")) return null;
  if (isAiChatOpen) return null;

  return (
    <AnimatePresence>
      {scrolled && (
        <div className="md:hidden fixed bottom-24 right-6 z-50">
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-20 right-0 flex flex-col items-end gap-3"
              >
                {FAB_ACTIONS.map((action, index) => (
                  <motion.div
                    key={action.href || action.action}
                    initial={{ x: 20, opacity: 0, scale: 0.8 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="bg-card px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-border/50">
                      {action.label}
                    </span>
                    {action.href ? (
                      <Link
                        href={action.href}
                        target={action.href.startsWith("http") ? "_blank" : undefined}
                        onClick={() => setOpen(false)}
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-2xl active:scale-90 transition-transform`}
                      >
                        <action.icon className="h-5 w-5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          setOpen(false);
                          if (action.action === "ai-chat") {
                            window.dispatchEvent(new CustomEvent("open-ai-chat"));
                          }
                        }}
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-2xl active:scale-90 transition-transform`}
                      >
                        <action.icon className="h-5 w-5" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setOpen(!open)}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: open ? 45 : 0 }}
            className="w-16 h-16 rounded-[2rem] gradient-tanzania text-white shadow-2xl shadow-primary/40 flex items-center justify-center relative z-10 border-4 border-background"
          >
            <Plus className="h-8 w-8" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
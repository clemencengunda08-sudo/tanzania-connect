"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cookie } from "lucide-react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const ACCEPT_ALL: CookiePreferences = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

const CONSENT_KEY = "tr-cookie-consent";
const CONSENT_VERSION = "1.0";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.version === CONSENT_VERSION) {
          setPreferences(parsed.preferences);
        } else {
          setShow(true);
        }
      } catch (e) {
        setShow(true);
      }
    }
  }, [mounted]);

  const saveConsent = (prefs: CookiePreferences) => {
    const consent = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      preferences: prefs,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setShow(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => saveConsent(ACCEPT_ALL);
  const handleRejectAll = () => saveConsent(DEFAULT_PREFERENCES);

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/20 backdrop-blur-sm pointer-events-none"
          />

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-md z-[101]"
          >
            <div className="glass-card rounded-[2.5rem] p-8 shadow-2xl border-primary/10 overflow-hidden relative bg-card/90 backdrop-blur-xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              
              {!showSettings ? (
                <div className="space-y-6 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-2xl gradient-tanzania flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                      <Cookie className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-headline font-black uppercase tracking-tight leading-tight">Privacy Guard</h3>
                      <p className="text-xs text-muted-foreground uppercase font-black tracking-widest mt-1 opacity-70">Cookies & Intelligence</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                    We use encrypted identifiers to improve your experience on Tanzania Reach. Our 2026 standards ensure your data remains your own.
                  </p>

                  <div className="flex flex-col gap-3">
                    <Button onClick={handleAcceptAll} className="h-12 rounded-xl gradient-tanzania text-white font-bold shadow-xl shadow-primary/20">
                      Accept All
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" onClick={() => setShowSettings(true)} className="rounded-xl h-12 font-bold border-primary/20 hover:bg-primary/5">
                        Settings
                      </Button>
                      <Button variant="ghost" onClick={handleRejectAll} className="rounded-xl h-12 font-bold text-muted-foreground">
                        Essential
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline font-black uppercase text-lg">Preferences</h3>
                    <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <PreferenceToggle 
                      title="Essential" 
                      desc="Required for portal stability." 
                      active={true} 
                      disabled={true} 
                      onToggle={() => {}} 
                    />
                    <PreferenceToggle 
                      title="Analytics" 
                      desc="Help us track reach and utility." 
                      active={preferences.analytics} 
                      onToggle={() => togglePreference('analytics')} 
                    />
                    <PreferenceToggle 
                      title="Preferences" 
                      desc="Remember your theme and tools." 
                      active={preferences.preferences} 
                      onToggle={() => togglePreference('preferences')} 
                    />
                  </div>

                  <Button onClick={() => saveConsent(preferences)} className="w-full h-12 rounded-xl gradient-tanzania text-white font-bold">
                    Save Selection
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PreferenceToggle({ title, desc, active, disabled = false, onToggle }: { title: string, desc: string, active: boolean, disabled?: boolean, onToggle: () => void }) {
  return (
    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between gap-4">
      <div className="space-y-0.5">
        <p className="text-sm font-bold">{title}</p>
        <p className="text-[10px] text-muted-foreground font-medium">{desc}</p>
      </div>
      <button 
        onClick={onToggle}
        disabled={disabled}
        className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${active ? 'bg-primary' : 'bg-muted-foreground/30'} ${disabled ? 'opacity-50' : 'cursor-pointer'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

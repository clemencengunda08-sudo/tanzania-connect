'use client';

import { usePWA } from '@/hooks/use-pwa';
import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function InstallPrompt() {
  const { isInstallable, install } = usePWA();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isInstallable) return;
    const t = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(t);
  }, [isInstallable]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100vw-3rem)] max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-dark rounded-3xl p-5 border border-white/10 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-tanzania flex items-center justify-center text-xl shrink-0 shadow-lg shadow-primary/20">
            🇹🇿
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-headline font-bold text-white text-base">
              Install Tanzania Reach
            </p>
            <p className="text-xs text-slate-400">
              Access guides instantly, even offline.
            </p>
          </div>

          <button 
            onClick={() => setShow(false)} 
            className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-3 mt-5">
          <Button
            variant="ghost"
            onClick={() => setShow(false)}
            className="flex-1 rounded-2xl bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 h-11"
          >
            Not now
          </Button>
          <Button
            onClick={async () => { 
              const success = await install(); 
              if (success) setShow(false); 
            }}
            className="flex-[2] rounded-2xl gradient-tanzania text-white font-bold h-11 flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
          >
            <Download className="w-4 h-4" />
            Install App
          </Button>
        </div>
      </div>
    </div>
  );
}

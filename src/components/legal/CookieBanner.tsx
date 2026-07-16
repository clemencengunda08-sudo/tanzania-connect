'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('tz-reach-cookie-consent');
    if (!consent) {
      // Show banner after 3 seconds delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('tz-reach-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('tz-reach-cookie-consent', 'essential');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] flex justify-center pointer-events-none"
        >
          <Card className="max-w-2xl w-full bg-slate-950/90 backdrop-blur-xl text-white border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden pointer-events-auto">
            <CardContent className="p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 relative">
              {/* Decorative gradient orb */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                   <h4 className="font-headline font-black text-xl tracking-tight uppercase">Privacy Protocols</h4>
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  Tanzania Reach uses encrypted identifiers to enhance your manual reading experience and portal intelligence. By clicking "Accept All", you agree to our 2026 data standards.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button 
                  variant="ghost" 
                  onClick={handleDecline}
                  className="text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl h-14 px-8 font-bold"
                >
                  Essential Only
                </Button>
                <Button 
                  onClick={handleAccept}
                  className="gradient-tanzania text-white font-black rounded-2xl h-14 px-10 shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all"
                >
                  Accept All
                </Button>
              </div>

              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-6 right-6 text-slate-600 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

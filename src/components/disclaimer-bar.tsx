"use client";

import { useEffect, useState } from "react";
import { X, Info, AlertTriangle } from "lucide-react";

export function DisclaimerBar() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("tr-disclaimer-shown");
      if (stored === "true") setDismissed(true);
    }
  }, []);

  const handleDismiss = (): void => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("tr-disclaimer-shown", "true");
    }
  };

  if (!mounted || dismissed) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[120] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-amber-50 dark:bg-amber-950/90 backdrop-blur-xl border-2 border-amber-200 dark:border-amber-800 rounded-[2rem] p-5 shadow-2xl shadow-amber-900/20">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            <h4 className="font-headline font-bold text-sm text-amber-900 dark:text-amber-100 uppercase tracking-tight">
              Independent Educational Resource
            </h4>
            <div className="text-[11px] text-amber-800/90 dark:text-amber-200/80 leading-relaxed space-y-2 font-medium">
              <p>
                Tanzania Reach is a private, independent portal in development. We are <strong>NOT</strong>:
              </p>
              <ul className="grid grid-cols-1 gap-1 pl-1">
                <li className="flex items-center gap-1.5">• A Government Agency</li>
                <li className="flex items-center gap-1.5">• A Licensed Legal Advisor</li>
                <li className="flex items-center gap-1.5">• A Visa/Permit Issuer</li>
                <li className="flex items-center gap-1.5">• Affiliated with any Ministry</li>
              </ul>
              <p className="italic border-t border-amber-200/50 dark:border-amber-800/50 pt-2">
                All information is for educational purposes only. Always verify with official sources before taking action.
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors p-1"
            aria-label="Dismiss disclaimer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

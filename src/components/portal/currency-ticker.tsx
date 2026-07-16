'use client';

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, ChevronDown, X } from 'lucide-react';
import { Marquee } from '@/components/premium/marquee';

const DEFAULT_RATES = [
  { currency: 'TZS', rate: '1 TZS',       trend: 'flat' as const },
  { currency: 'USD', rate: '2,615 TZS',   trend: 'up'   as const },
  { currency: 'EUR', rate: '2,835 TZS',   trend: 'up'   as const },
  { currency: 'GBP', rate: '3,340 TZS',   trend: 'down' as const },
  { currency: 'KES', rate: '20.4 TZS',    trend: 'down' as const },
  { currency: 'UGX', rate: '0.69 TZS',    trend: 'up'   as const },
  { currency: 'ZAR', rate: '148 TZS',     trend: 'up'   as const },
  { currency: 'CNY', rate: '364 TZS',     trend: 'up'   as const },
  { currency: 'JPY', rate: '17.2 TZS',    trend: 'down' as const },
  { currency: 'AED', rate: '712 TZS',     trend: 'up'   as const },
  { currency: 'INR', rate: '31.4 TZS',    trend: 'flat' as const },
  { currency: 'RWF', rate: '2.16 TZS',    trend: 'up'   as const },
];

const STORAGE_KEY = 'tr-currency-ticker-dismissed';

/**
 * CurrencyTicker — live FX marquee that sits in the document flow directly
 * below the GlobalNav (i.e. it scrolls with the page rather than floating
 * over content).
 *
 *  Layer order (top to bottom):
 *    1. DisclaimerBar / top spacer        (36px)
 *    2. GlobalNav                         (sticky, ~72px)
 *    3. CurrencyTicker (this component)  (~36px when visible)
 *    4. Page content
 *
 *  Behavior:
 *    • Always renders in dark theme (kilimanjaro-950 + tanzania gold) — the
 *      ticker acts as a brand strip and looks identical in both site themes.
 *    • Shows on page load (unless previously dismissed in this browser).
 *    • X close button stores the dismissal in localStorage so the ticker
 *      stays hidden on subsequent visits.
 *    • Marquee pauses on hover (smooth, focused inspection).
 */
export function CurrencyTicker() {
  const [rates] = useState(DEFAULT_RATES);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [dismissed, setDismissed] = useState(false);

  // Restore dismissed state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'true') {
        setDismissed(true);
      }
    } catch {
      // localStorage may be unavailable (private mode, etc.) — fail open
    }
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Live clock (every 60s)
  // ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () =>
      setLastUpdate(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    tick();
    const interval = setInterval(tick, 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore — still hide for the current session
    }
  };

  if (dismissed) return null;

  const items = rates.map((r) => ({
    label: `1 ${r.currency} = ${r.rate}`,
    value: r.trend === 'up' ? '▲' : r.trend === 'down' ? '▼' : '◆',
  }));

  return (
    <div
      data-currency-ticker
      className={[
        'relative z-30 w-full',
        // Always dark: deep navy backdrop with tanzania gold accents
        'bg-kilimanjaro-950 dark:bg-kilimanjaro-950',
        'border-b border-tanzania-500/30 shadow-sm',
        'transition-all duration-300',
      ].join(' ')}
      role="region"
      aria-label="Tanzania shilling exchange rates"
    >
      <div className="relative flex items-center">
        <Marquee
          items={items}
          separator="·"
          speed={60}
          pauseOnHover
          className="text-[11px] font-mono font-semibold uppercase tracking-wider py-2.5 text-tanzania-100"
        />
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 bg-tanzania-500/15 backdrop-blur-md px-3 py-1 rounded-full border border-tanzania-500/40 z-10">
          <RefreshCw className="h-2.5 w-2.5 text-tanzania-400 animate-[spin_8s_linear_infinite]" />
          <span className="text-[9px] font-black uppercase tracking-widest text-tanzania-300">
            LIVE · {lastUpdate || '—'}
          </span>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss currency ticker"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 inline-flex h-6 w-6 items-center justify-center rounded-full bg-tanzania-500/10 hover:bg-tanzania-500/25 text-tanzania-200 hover:text-white border border-tanzania-500/30 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* === COMPACT MARQUEE FOR SECTIONS === */
export function CurrencyTickerInline() {
  const items = DEFAULT_RATES.map((r) => ({
    label: `${r.currency} ${r.rate}`,
    value: r.trend === 'up' ? '↑' : r.trend === 'down' ? '↓' : '→',
  }));

  return (
    <div className="relative py-3 overflow-hidden rounded-premium bg-gradient-to-r from-tanzania-500/[0.04] via-tanzania-500/[0.08] to-tanzania-500/[0.04] border-y border-tanzania-500/20">
      <Marquee
        items={items}
        separator="◆"
        speed={50}
        className="text-xs font-mono font-semibold uppercase tracking-wider"
      />
    </div>
  );
}

'use client';

import * as React from "react";
import { Banknote, Minus, Calendar, ArrowRight } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";
import { ShineBorder } from "@/components/ui/shine-border";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { CurrencySnapshot, SupportedCurrency } from "./types";

/* -------------------------------------------------------------------------- */
/*  Static metadata for the supported currencies                              */
/* -------------------------------------------------------------------------- */

interface CurrencyMeta {
  code: SupportedCurrency;
  name: string;
  flag: string;
}

const CURRENCY_META: readonly CurrencyMeta[] = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Formatting helpers                                                        */
/* -------------------------------------------------------------------------- */

/** "2,560" — locale-aware, rounded. */
function formatRate(rate: number): string {
  if (!Number.isFinite(rate)) return "—";
  return rate.toLocaleString("en-US", {
    maximumFractionDigits: rate >= 100 ? 0 : 2,
    minimumFractionDigits: 0,
  });
}

/** "Jul 12, 14:32" — short, human-readable timestamp. */
function formatUpdated(iso: string): string {
  try {
    const d = new Date(iso);
    if (!Number.isFinite(d.getTime())) return iso;
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return iso;
  }
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

function FlatBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-tanzania-500/10 px-1.5 py-0.5 text-[10px] font-medium text-tanzania-700 dark:bg-white/10 dark:text-amber-200">
      <Minus className="size-2.5" aria-hidden="true" />
      live
    </span>
  );
}

interface RateCardProps {
  code: SupportedCurrency;
  name: string;
  flag: string;
  rate: number;
}

function RateCard({ code, name, flag, rate }: RateCardProps) {
  return (
    <div className="relative w-full sm:w-[230px] shrink-0">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-kilimanjaro-900/10 bg-white/80 p-4 shadow-sm backdrop-blur-md transition-all hover:shadow-lg hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:border-tanzania-500/40 dark:hover:bg-white/10">
        <ShineBorder
          borderWidth={1}
          duration={16}
          shineColor={["#D4AF37", "#2D1B4E", "#D4AF37"]}
        />
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="text-2xl leading-none"
                aria-hidden="true"
                role="presentation"
              >
                {flag}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-kilimanjaro-900 dark:text-white">{code}</p>
                <p className="text-[10px] uppercase tracking-wider text-kilimanjaro-600/80 dark:text-white/50">
                  {name}
                </p>
              </div>
            </div>
            <FlatBadge />
          </div>

          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[11px] text-kilimanjaro-600/80 dark:text-white/50">1 {code} =</span>
            <span className="text-2xl font-bold tabular-nums text-tanzania-700 dark:text-amber-300">
              {formatRate(rate)}
            </span>
            <span className="text-xs font-semibold text-kilimanjaro-800 dark:text-white/80">TZS</span>
          </div>

          <div className="mt-1 flex items-center gap-1 text-[10px] text-kilimanjaro-500 dark:text-white/40">
            <ArrowRight className="size-2.5" aria-hidden="true" />
            <span>Bank of Tanzania reference</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RateCardSkeleton() {
  return (
    <div className="w-full sm:w-[230px] shrink-0">
      <div className="h-full rounded-2xl border border-kilimanjaro-900/10 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full bg-kilimanjaro-900/10 dark:bg-white/10" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-8 bg-kilimanjaro-900/10 dark:bg-white/10" />
                <Skeleton className="h-2 w-16 bg-kilimanjaro-900/10 dark:bg-white/10" />
              </div>
            </div>
            <Skeleton className="h-4 w-10 rounded-full bg-kilimanjaro-900/10 dark:bg-white/10" />
          </div>
          <Skeleton className="mt-2 h-7 w-32 bg-kilimanjaro-900/10 dark:bg-white/10" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Default export                                                            */
/* -------------------------------------------------------------------------- */

export interface CurrencyWidgetProps {
  /** Live rates snapshot, pre-fetched on the server. */
  rates: CurrencySnapshot | null;
  /** Optional section title override. */
  title?: string;
  /** Extra className for the outer wrapper. */
  className?: string;
  /**
   * Force the marquee to scroll even if there are few cards.
   * Defaults to `true` if there are 4 or fewer cards.
   */
  enableMarquee?: boolean;
}

export default function CurrencyWidget({
  rates,
  title = "TZS Exchange Rates",
  className,
  enableMarquee,
}: CurrencyWidgetProps) {
  const isLoading = !rates;

  // Prefer the convenient `perUnit` map (already converted to "1 unit of X = N TZS").
  // Fall back to the raw `rates` map if `perUnit` is absent, taking the reciprocal
  // (raw rates are "1 TZS = N foreign units").
  const cards = React.useMemo(() => {
    if (isLoading || !rates) return [];
    return CURRENCY_META.map((meta) => {
      let value: number;
      if (rates.perUnit && Number.isFinite(rates.perUnit[meta.code])) {
        value = rates.perUnit[meta.code];
      } else {
        const raw = rates.rates[meta.code.toLowerCase()];
        value = raw && raw > 0 ? 1 / raw : NaN;
      }
      return { ...meta, rate: value };
    });
  }, [isLoading, rates]);

  const useMarquee =
    enableMarquee ?? true;
  const timestamp = rates?.fetchedAt ?? "";

  // Unused helper to avoid TS6133 if the variable goes unused
  void timestamp;

  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-3xl border border-kilimanjaro-900/10 bg-gradient-to-br from-amber-50 via-white to-purple-50 p-4 shadow-sm backdrop-blur-md sm:p-6 dark:border-white/10 dark:from-amber-950/20 dark:via-black/30 dark:to-purple-950/40 dark:shadow-none",
        className,
      )}
      aria-label="Tanzanian Shilling exchange rates"
    >
      {/* Header */}
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Banknote className="size-4 text-tanzania-600 dark:text-amber-300" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-tanzania-700 dark:text-amber-300/80">
              {title}
            </p>
          </div>
          <h2 className="text-xl font-semibold text-kilimanjaro-900 sm:text-2xl dark:text-white">
            Tanzanian Shilling{" "}
            <span className="text-kilimanjaro-500 dark:text-white/40">/ major currencies</span>
          </h2>
        </div>
        {!isLoading && timestamp ? (
          <div className="flex items-center gap-1.5 text-[11px] text-kilimanjaro-600 dark:text-white/50">
            <Calendar className="size-3.5" aria-hidden="true" />
            <time
              dateTime={timestamp}
              suppressHydrationWarning
              className="tabular-nums"
            >
              {formatUpdated(timestamp)}
            </time>
          </div>
        ) : null}
      </header>

      {/* Cards */}
      {useMarquee ? (
        <Marquee
          pauseOnHover
          className="[--duration:28s] [--gap:0.75rem]"
          repeat={3}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <RateCardSkeleton key={i} />
              ))
            : cards.map((c) => (
                <RateCard
                  key={c.code}
                  code={c.code}
                  name={c.name}
                  flag={c.flag}
                  rate={c.rate}
                />
              ))}
        </Marquee>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <RateCardSkeleton key={i} />
              ))
            : cards.map((c) => (
                <div key={c.code} className="w-full">
                  <RateCard
                    code={c.code}
                    name={c.name}
                    flag={c.flag}
                    rate={c.rate}
                  />
                </div>
              ))}
        </div>
      )}
    </section>
  );
}

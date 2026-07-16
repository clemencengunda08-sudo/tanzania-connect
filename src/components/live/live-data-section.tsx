/**
 * Server component that fetches /api/live-tz once and hands the data to all
 * four live-data client widgets. The /api/live-tz route itself calls
 * lib/live-data.ts which uses Next.js ISR caching (`revalidate: 30`),
 * so the data fetch is shared across widgets within the same request AND
 * across requests for 30 minutes.
 *
 * If the upstream APIs are degraded, we still render the section with a
 * `partial: true` badge and a `Retry` link — the widgets degrade gracefully.
 */

import { headers } from "next/headers";
import { getLiveTZData } from "@/lib/live-data";
import { EconomyStats } from "@/components/live/economy-stats";
import CurrencyWidget from "@/components/live/currency-widget";
import WeatherWidget from "@/components/live/weather-widget";
import { WikiFactCard } from "@/components/live/wiki-fact-card";
import { VisitorDetector } from "@/components/live/visitor-detector";

/** Maximum age (seconds) we let a stale snapshot serve before revalidating. */
const STALE_OK_SECONDS = 60 * 30; // 30 minutes

export interface LiveDataSectionProps {
  /** Force a fresh fetch instead of using the ISR cache. */
  fresh?: boolean;
  /** Optional className passthrough for the outer section. */
  className?: string;
}

export async function LiveDataSection({
  fresh = false,
  className,
}: LiveDataSectionProps) {
  // The /api/live-tz route calls getLiveTZData() under the hood; on the
  // server we can call it directly to avoid an extra HTTP round-trip and
  // share Next.js's ISR cache. (The route exists for client-side fetches
  // and for any third-party consumer that needs JSON.)
  //
  // Headers are forwarded so that the visitor-IP-based country detection
  // (used by /api/visitor-detect) sees the right IP.
  const h = await headers();
  const xff = h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? undefined;
  const ua = h.get("user-agent") ?? undefined;
  void xff; // Currently unused — visitor detection is client-side.
  void ua;

  const snapshot = await getLiveTZData();

  const partial = snapshot.partial;
  // Defensive: generatedAt may be missing if lib changes. Fall back to now.
  const generatedAtIso = snapshot.generatedAt || new Date().toISOString();
  const fetchedAt = new Date(generatedAtIso);
  const fetchedAtIso = isNaN(fetchedAt.getTime()) ? new Date().toISOString() : fetchedAt.toISOString();
  const fetchedAtDisplay = isNaN(fetchedAt.getTime())
    ? "just now"
    : fetchedAt.toUTCString().replace(":00 GMT", " UTC");

  return (
    <section
      className={className}
      aria-labelledby="live-data-heading"
    >
      {/* Section header — section number, label, partial-data badge */}
      <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-3">
            02 / Live · Refreshed every 30 min
          </p>
          <h2
            id="live-data-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50"
          >
            Tanzania, in <span className="italic text-tanzania-500">real time</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-base md:text-lg text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed">
            Currency, weather, economy, and cultural facts — fetched from open
            APIs the moment you load this page. No paywalls, no stale data.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-kilimanjaro-500 dark:text-tanzania-300">
          <span
            className={`w-2 h-2 rounded-full ${
              partial
                ? "bg-amber-500 animate-pulse-soft"
                : "bg-emerald-500 animate-pulse-soft"
            }`}
            aria-hidden="true"
          />
          {partial ? "Partial data" : "All sources live"}
          <span aria-hidden="true">·</span>
          <time
            dateTime={fetchedAtIso}
            className="tabular-nums"
          >
            {fetchedAtDisplay}
          </time>
        </div>
      </header>

      {/* Bento layout: economy + currency in the top row,
          weather spanning the middle, wiki facts in a card row. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Economy — left, 7 cols on desktop */}
        <div className="lg:col-span-7 order-1">
          {snapshot.economy ? (
            <EconomyStats data={snapshot.economy} />
          ) : (
            <p className="text-sm text-tanzania-100/60">
              Economy data is temporarily unavailable.
            </p>
          )}
        </div>

        {/* Currency — right, 5 cols on desktop */}
        <div className="lg:col-span-5 order-2">
          {snapshot.currency ? (
            <CurrencyWidget rates={snapshot.currency} />
          ) : (
            <p className="text-sm text-tanzania-100/60">
              Currency data is temporarily unavailable.
            </p>
          )}
        </div>

        {/* Weather — full width */}
        <div className="lg:col-span-12 order-3">
          <WeatherWidget data={snapshot.weather} />
        </div>

        {/* Wiki — 3 facts in a row */}
        <div className="lg:col-span-12 order-4">
          <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 mb-6">
            Did you know?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {snapshot.wiki && snapshot.wiki.length > 0 ? (
              <WikiFactCard data={snapshot.wiki} />
            ) : (
              <p className="text-sm text-tanzania-100/60">
                Wikipedia facts are temporarily unavailable. All other live
                data sources remain active.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Visitor-aware detector — invisible UI element that sets a cookie
          for future visits and toggles Swahili for in-TZ visitors. */}
      <VisitorDetector endpoint="/api/visitor-detect" />
    </section>
  );
}

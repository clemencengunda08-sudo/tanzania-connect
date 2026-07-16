/**
 * Canonical TypeScript types for the live data widgets.
 *
 * The data fetcher lives in `src/lib/live-data.ts` (server-only). This
 * file is the single source of truth for the SHAPES that client widgets
 * consume. We define the shapes here (rather than re-exporting from
 * live-data) so that:
 *
 *  1. Client widgets can import these types without dragging in
 *     `server-only` (and the bundler error that follows).
 *  2. The fetcher and the widget can iterate independently — as long as
 *     the produced JSON matches the shapes declared here, the contract
 *     is honored.
 */

/* -------------------------------------------------------------------------- */
/*  Weather                                                                   */
/* -------------------------------------------------------------------------- */

/** A single city snapshot. */
export interface WeatherSnapshot {
  city: string;
  country: "Tanzania";
  lat: number;
  lon: number;
  temperatureC: number;
  windKph: number;
  weatherCode: number;
  icon: string; // Lucide icon name (e.g. "Sun", "CloudRain")
  description: string; // human-readable label
  time: string; // ISO timestamp
}

/* -------------------------------------------------------------------------- */
/*  Currency                                                                  */
/* -------------------------------------------------------------------------- */

/** The home currency. */
export type HomeCurrency = "TZS";

/** Per-unit rates: 1 unit of TZS equals X of each foreign currency. */
export type CurrencyPerUnit = {
  USD: number;
  EUR: number;
  GBP: number;
  CNY: number;
  KES: number;
  ZAR: number;
};

/** Codes we surface in the currency widget, in display order. */
export const SUPPORTED_CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "CNY",
  "KES",
  "ZAR",
] as const;
export type SupportedCurrency = (typeof SUPPORTED_CURRENCIES)[number];

/** Per-currency trend signal vs the previous published rate. */
export interface CurrencyTrend {
  code: SupportedCurrency;
  /** Positive = TZS strengthened, negative = TZS weakened (percentage points). */
  percent: number;
  direction: "up" | "down" | "flat";
}

/** Currency snapshot returned by /api/live-tz. */
export interface CurrencySnapshot {
  base: HomeCurrency;
  /**
   * Raw API rates: 1 TZS equals X of each foreign currency (lowercase codes).
   * The fawazahmed0 exchange-rate API returns rates in this direction.
   */
  rates: Record<string, number>;
  /** Per-unit rates: how many TZS equal 1 unit of each foreign currency. */
  perUnit: CurrencyPerUnit;
  asOf: string; // ISO date from currency API
  fetchedAt: string; // ISO timestamp when we made the call
  /** Optional per-currency trend (server may omit if no history). */
  trends?: CurrencyTrend[];
}

/* -------------------------------------------------------------------------- */
/*  Economy                                                                   */
/* -------------------------------------------------------------------------- */

/** Single point-in-time snapshot of key Tanzanian economic indicators. */
export interface EconomySnapshot {
  country: "Tanzania";
  countryCode: "TZ";
  year: number;
  gdpUsd: number | null;
  population: number | null;
  inflationPct: number | null;
  tourismArrivals: number | null;
  internetUsersPct: number | null;
  lifeExpectancyYears: number | null;
  electricityAccessPct: number | null;
  lastUpdated: string;
  /** Optional human-readable source (e.g. "World Bank"). */
  source?: string;
}

/* -------------------------------------------------------------------------- */
/*  Wikipedia facts                                                           */
/* -------------------------------------------------------------------------- */

/** A summary card sourced from Wikipedia. */
export interface WikiFact {
  topic: string; // display name
  slug: string; // URL-safe slug
  description: string; // short summary text
  extract: string; // lead paragraph (truncated to ~280 chars)
  url: string; // canonical Wikipedia URL
  thumbnail?: string; // image URL (optional)
  pageId?: number;
}

/* -------------------------------------------------------------------------- */
/*  Combined live payload                                                     */
/* -------------------------------------------------------------------------- */

export interface LiveTZData {
  weather: WeatherSnapshot[];
  currency: CurrencySnapshot;
  economy: EconomySnapshot;
  wiki: WikiFact[];
  fetchedAt: string;
}

/* -------------------------------------------------------------------------- */
/*  Visitor / language detection                                              */
/* -------------------------------------------------------------------------- */

/** Recommended UI language derived from visitor location. */
export type RecommendedLang = "sw" | "en";

/** Visitor geolocation result, returned by /api/visitor-detect. */
export interface VisitorInfo {
  /** ISO 3166-1 alpha-2 country code (e.g. "TZ", "US"). */
  country: string;
  /** Resolved city name, or null if unknown. */
  city: string | null;
  /** Recommended UI language. */
  recommendedLang: RecommendedLang;
  /** Client IP (best-effort, may be anonymised). */
  ip: string;
  /** Whether this was a real lookup or a fallback. */
  source: "live" | "fallback";
}

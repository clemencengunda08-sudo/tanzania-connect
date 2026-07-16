/**
 * @fileOverview Server-side live data layer for Tanzania Reach.
 *
 * Aggregates 4 no-key public APIs (Open-Meteo, fawazahmed0 currency-api,
 * World Bank indicators, Wikipedia REST summary) and exposes typed
 * fetchers that the `/api/live-tz` route consumes.
 *
 * All fetchers use Next.js's built-in `fetch` cache with a 30-minute
 * revalidation window. Each request is wrapped in an AbortController with
 * a 10 s timeout. Failures resolve to safe fallbacks (null / []).
 *
 * Designed to be imported only from server contexts (RSC, route handlers,
 * server actions). Do NOT import from a client component.
 */

// NOTE: This module uses Next.js's extended `fetch` (with `next.revalidate`),
// which is only honored on the server. Importing it from a client component
// will fall back to a plain fetch and silently skip caching. Keep all
// importers on the server side (RSC, route handlers, server actions).

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WeatherSnapshot = {
  city: string;
  country: "Tanzania";
  lat: number;
  lon: number;
  temperatureC: number;
  windKph: number;
  weatherCode: number;
  icon: string; // Lucide icon name
  description: string; // human-readable label
  time: string; // ISO timestamp from API
};

export type CurrencySnapshot = {
  base: "TZS"; // Tanzanian Shilling is the home currency
  /** Map of currency code (lowercase) -> 1 unit of TZS equals X of that code. */
  rates: Record<string, number>;
  /**
   * Convenience: 1 unit of each foreign currency equals how many TZS.
   * Computed as the reciprocal of the fawazahmed0 `tzs -> x` rate.
   */
  perUnit: {
    USD: number;
    EUR: number;
    GBP: number;
    CNY: number;
    KES: number;
    ZAR: number;
  };
  asOf: string; // ISO date from currency API (e.g. "2026-07-11")
  fetchedAt: string; // ISO timestamp when we made the call
};

export type EconomySnapshot = {
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
  lastUpdated: string; // ISO date the source dataset was last refreshed
};

export type WikiFact = {
  topic: string; // display name, e.g. "Mount Kilimanjaro"
  slug: string; // URL-safe slug used in the request
  description: string; // short summary text
  extract: string; // lead paragraph (truncated to ~280 chars)
  url: string; // canonical Wikipedia URL
  thumbnail?: string; // image URL (optional)
  pageId?: number;
};

export type LiveTZData = {
  weather: WeatherSnapshot[];
  currency: CurrencySnapshot | null;
  economy: EconomySnapshot | null;
  wiki: WikiFact[];
  generatedAt: string; // ISO timestamp
  /** True if at least one upstream source failed and we used fallbacks. */
  partial: boolean;
  errors: string[];
};

// ---------------------------------------------------------------------------
// Static configuration
// ---------------------------------------------------------------------------

const CITIES: ReadonlyArray<{ name: string; lat: number; lon: number }> = [
  { name: "Dar es Salaam", lat: -6.7924, lon: 39.2083 },
  { name: "Dodoma", lat: -6.1722, lon: 35.7395 },
  { name: "Arusha", lat: -3.3869, lon: 36.683 },
  { name: "Zanzibar City", lat: -6.1659, lon: 39.2026 },
  { name: "Mwanza", lat: -2.5164, lon: 32.9175 },
  { name: "Kilimanjaro", lat: -3.3333, lon: 37.3333 },
];

const TRACKED_CURRENCIES: ReadonlyArray<string> = ["usd", "eur", "gbp", "cny", "kes", "zar"];

type WBIndicatorKey =
  | "gdpUsd"
  | "population"
  | "inflationPct"
  | "tourismArrivals"
  | "internetUsersPct"
  | "lifeExpectancyYears"
  | "electricityAccessPct";

const WB_INDICATORS: ReadonlyArray<{ key: WBIndicatorKey; code: string }> = [
  { key: "gdpUsd", code: "NY.GDP.MKTP.CD" },
  { key: "population", code: "SP.POP.TOTL" },
  { key: "inflationPct", code: "FP.CPI.TOTL.ZG" },
  { key: "tourismArrivals", code: "ST.INT.ARVL" },
  { key: "internetUsersPct", code: "IT.NET.USER.ZS" },
  { key: "lifeExpectancyYears", code: "SP.DYN.LE00.IN" },
  { key: "electricityAccessPct", code: "EG.ELC.ACCS.ZS" },
];

const WIKI_TOPICS: ReadonlyArray<{ slug: string; display: string }> = [
  { slug: "Tanzania", display: "Tanzania" },
  { slug: "Mount_Kilimanjaro", display: "Mount Kilimanjaro" },
  { slug: "Zanzibar", display: "Zanzibar" },
  { slug: "Serengeti_National_Park", display: "Serengeti National Park" },
  { slug: "Lake_Manyara", display: "Lake Manyara" },
  { slug: "Ngorongoro_Conservation_Area", display: "Ngorongoro Conservation Area" },
];

const REVALIDATE_SECONDS = 1800; // 30 minutes
const REQUEST_TIMEOUT_MS = 10_000;

// ---------------------------------------------------------------------------
// Weather code -> Lucide icon + human description
// (https://open-meteo.com/en/docs#weathervariables)
// ---------------------------------------------------------------------------

function describeWeatherCode(code: number): { icon: string; description: string } {
  if (code === 0) return { icon: "Sun", description: "Clear sky" };
  if (code === 1) return { icon: "Sun", description: "Mainly clear" };
  if (code === 2) return { icon: "CloudSun", description: "Partly cloudy" };
  if (code === 3) return { icon: "Cloud", description: "Overcast" };
  if (code >= 45 && code <= 48) return { icon: "CloudFog", description: "Fog" };
  if (code >= 51 && code <= 57) return { icon: "CloudDrizzle", description: "Drizzle" };
  if (code >= 61 && code <= 67) return { icon: "CloudRain", description: "Rain" };
  if (code >= 71 && code <= 77) return { icon: "CloudSnow", description: "Snow" };
  if (code >= 80 && code <= 82) return { icon: "CloudRain", description: "Rain showers" };
  if (code >= 85 && code <= 86) return { icon: "CloudSnow", description: "Snow showers" };
  if (code >= 95 && code <= 99) return { icon: "CloudLightning", description: "Thunderstorm" };
  return { icon: "Cloud", description: "Unknown" };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function createTimeoutSignal(ms: number): AbortSignal {
  // AbortSignal.timeout is available in Node 18+ and modern browsers; falls
  // back to AbortController if not present.
  if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
    return AbortSignal.timeout(ms);
  }
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller.signal;
}

async function safeFetch<T>(url: string, label: string): Promise<T | null> {
  try {
    // Next.js extends fetch with `next.revalidate` for ISR caching.
    // See: https://nextjs.org/docs/app/api-reference/functions/fetch
    // The `next` field is not part of standard `RequestInit`, so we cast
    // the init object through `unknown` to satisfy TS.
    const init = {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["live-tz", label] },
      signal: createTimeoutSignal(REQUEST_TIMEOUT_MS),
      headers: {
        Accept: "application/json",
        "User-Agent": "TanzaniaConnect/1.0",
      },
    } as unknown as RequestInit;
    const res = await fetch(url, init);
    if (!res.ok) {
      console.warn(`[live-data] ${label} returned HTTP ${res.status} for ${url}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[live-data] ${label} fetch failed: ${msg}`);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Fetcher 1: Weather (Open-Meteo)
// ---------------------------------------------------------------------------

type OpenMeteoCityResponse = {
  latitude: number;
  longitude: number;
  current_weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
  };
};

export async function getWeather(): Promise<WeatherSnapshot[]> {
  const settled = await Promise.allSettled(
    CITIES.map((city) => {
      const url =
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${city.lat}&longitude=${city.lon}` +
        `&current_weather=true` +
        `&hourly=temperature_2m,precipitation,windspeed_10m`;
      return safeFetch<OpenMeteoCityResponse>(url, `weather:${city.name}`);
    })
  );

  const snapshots: WeatherSnapshot[] = [];
  settled.forEach((result, idx) => {
    if (result.status !== "fulfilled" || !result.value) return;
    const data = result.value;
    const city = CITIES[idx];
    if (!city || !data.current_weather) return;
    const { icon, description } = describeWeatherCode(data.current_weather.weathercode);
    snapshots.push({
      city: city.name,
      country: "Tanzania",
      lat: data.latitude,
      lon: data.longitude,
      temperatureC: data.current_weather.temperature,
      windKph: data.current_weather.windspeed,
      weatherCode: data.current_weather.weathercode,
      icon,
      description,
      time: data.current_weather.time,
    });
  });

  return snapshots;
}

// ---------------------------------------------------------------------------
// Fetcher 2: Currency rates (fawazahmed0/exchange-api, base TZS)
// ---------------------------------------------------------------------------

type CurrencyApiResponse = {
  date: string;
  tzs?: Record<string, number>;
};

export async function getTZSRates(): Promise<CurrencySnapshot | null> {
  const url =
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/tzs.json`;
  const data = await safeFetch<CurrencyApiResponse>(url, "currency:tzs");
  if (!data || !data.tzs) return null;

  // The fawazahmed0 API expresses rates as "1 TZS = X <code>".
  // We expose them as-is in `rates`, and additionally compute
  // "1 <code> = X TZS" in `perUnit` which is the more conventional framing.
  const perUnit = {
    USD: 0,
    EUR: 0,
    GBP: 0,
    CNY: 0,
    KES: 0,
    ZAR: 0,
  } as CurrencySnapshot["perUnit"];

  for (const code of TRACKED_CURRENCIES) {
    const direct = data.tzs[code];
    if (typeof direct !== "number" || direct <= 0) continue;
    const inverse = 1 / direct;
    switch (code) {
      case "usd":
        perUnit.USD = inverse;
        break;
      case "eur":
        perUnit.EUR = inverse;
        break;
      case "gbp":
        perUnit.GBP = inverse;
        break;
      case "cny":
        perUnit.CNY = inverse;
        break;
      case "kes":
        perUnit.KES = inverse;
        break;
      case "zar":
        perUnit.ZAR = inverse;
        break;
    }
  }

  return {
    base: "TZS",
    rates: data.tzs,
    perUnit,
    asOf: data.date,
    fetchedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Fetcher 3: Economy (World Bank Indicators API)
// ---------------------------------------------------------------------------

type WorldBankResponse = [
  { page: number; pages: number; per_page: number; total: number; lastupdated: string },
  Array<{
    indicator: { id: string; value: string };
    country: { id: string; value: string };
    countryiso3code: string;
    date: string;
    value: number | null;
  }>,
];

export async function getTanzaniaEconomy(): Promise<EconomySnapshot | null> {
  const settled = await Promise.allSettled(
    WB_INDICATORS.map(({ code }) => {
      const url =
        `https://api.worldbank.org/v2/country/TZ/indicator/${code}` +
        `?format=json&per_page=1&mrv=1`;
      return safeFetch<WorldBankResponse>(url, `economy:${code}`);
    })
  );

  const snapshot: EconomySnapshot = {
    country: "Tanzania",
    countryCode: "TZ",
    year: 0,
    gdpUsd: null,
    population: null,
    inflationPct: null,
    tourismArrivals: null,
    internetUsersPct: null,
    lifeExpectancyYears: null,
    electricityAccessPct: null,
    lastUpdated: new Date().toISOString(),
  };

  let anyData = false;
  let latestUpdate = "";

  settled.forEach((result, idx) => {
    if (result.status !== "fulfilled" || !result.value) return;
    const tuple = result.value;
    // WorldBank returns [meta, data[]]; the data array may be empty.
    if (!Array.isArray(tuple) || tuple.length < 2 || !Array.isArray(tuple[1]) || tuple[1].length === 0) {
      return;
    }
    const entry = tuple[1][0];
    const { key } = WB_INDICATORS[idx];
    if (entry.value !== null && entry.value !== undefined) {
      (snapshot as Record<WBIndicatorKey, number | null>)[key] = entry.value;
    }
    if (entry.date) {
      const y = Number.parseInt(entry.date, 10);
      if (!Number.isNaN(y)) {
        // Take the most recent year across all indicators.
        if (y > snapshot.year) snapshot.year = y;
      }
    }
    if (tuple[0]?.lastupdated) {
      if (tuple[0].lastupdated > latestUpdate) latestUpdate = tuple[0].lastupdated;
    }
    anyData = true;
  });

  if (!anyData) return null;
  if (latestUpdate) snapshot.lastUpdated = latestUpdate;
  return snapshot;
}

// ---------------------------------------------------------------------------
// Fetcher 4: Wikipedia summary facts
// ---------------------------------------------------------------------------

type WikiSummary = {
  type?: string;
  title: string;
  displaytitle?: string;
  description?: string;
  extract?: string;
  content_urls?: { desktop?: { page?: string } };
  thumbnail?: { source: string; width: number; height: number };
  originalimage?: { source: string; width: number; height: number };
  pageid?: number;
  lang?: string;
};

export async function getWikiFacts(): Promise<WikiFact[]> {
  const settled = await Promise.allSettled(
    WIKI_TOPICS.map(({ slug }) => {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`;
      return safeFetch<WikiSummary>(url, `wiki:${slug}`);
    })
  );

  const facts: WikiFact[] = [];
  settled.forEach((result, idx) => {
    if (result.status !== "fulfilled" || !result.value) return;
    const { slug, display } = WIKI_TOPICS[idx];
    const data = result.value;
    const extract = (data.extract ?? "").slice(0, 280);
    const url =
      data.content_urls?.desktop?.page ?? `https://en.wikipedia.org/wiki/${slug}`;
    facts.push({
      topic: data.title ?? display,
      slug,
      description: data.description ?? "",
      extract,
      url,
      thumbnail: data.thumbnail?.source,
      pageId: data.pageid,
    });
  });

  return facts;
}

// ---------------------------------------------------------------------------
// Aggregator
// ---------------------------------------------------------------------------

/**
 * Fetch all four live data sources in parallel and return a combined payload.
 * Each individual source falls back to a safe default (null / []) on failure,
 * so a single broken API does not break the whole page. The `partial` flag
 * is set when any source failed.
 */
export async function getLiveTZData(): Promise<LiveTZData> {
  const [weather, currency, economy, wiki] = await Promise.all([
    getWeather(),
    getTZSRates(),
    getTanzaniaEconomy(),
    getWikiFacts(),
  ]);

  const errors: string[] = [];
  if (weather.length === 0) errors.push("weather");
  if (!currency) errors.push("currency");
  if (!economy) errors.push("economy");
  if (wiki.length === 0) errors.push("wiki");

  return {
    weather,
    currency,
    economy,
    wiki,
    generatedAt: new Date().toISOString(),
    partial: errors.length > 0,
    errors,
  };
}

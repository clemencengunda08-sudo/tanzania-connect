import { NextResponse } from "next/server";
import { getLiveTZData, type LiveTZData } from "@/lib/live-data";

/**
 * GET /api/live-tz
 *
 * Aggregated live data feed for Tanzania Reach. Combines:
 *  - weather (Open-Meteo) for 6 cities
 *  - currency rates (fawazahmed0/exchange-api) keyed on TZS
 *  - economy (World Bank indicators)
 *  - Wikipedia summary facts for headline topics
 *
 * Caching strategy
 *  - `revalidate = 1800` makes the route ISR-cached by Next.js for 30 min.
 *  - Response headers add `s-maxage=1800, stale-while-revalidate=3600`
 *    so CDNs/proxies can serve a stale copy for an extra hour while
 *    refreshing in the background.
 *
 * On partial failure the response includes a `partial: true` flag and
 * a list of the sources that failed (via the lib's `errors` array). The
 * HTTP status stays 200 as long as we managed to call at least the
 * aggregator; the caller can inspect `partial` to know it's degraded.
 */

// Force dynamic to avoid build-time fetch hangs
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  try {
    const data: LiveTZData = await getLiveTZData();

    const body = data.partial
      ? {
          ...data,
          // Surface a top-level `error` string for callers that only
          // inspect a few top-level fields. Kept for backwards compat
          // with the spec.
          error: `partial: missing ${data.errors.join(", ") || "unknown"}`,
        }
      : data;

    return NextResponse.json(body, {
      status: 200,
      headers: {
        // ISR via Next's runtime
        "Cache-Control":
          "public, s-maxage=1800, stale-while-revalidate=3600",
        "X-Live-TZ-Sources": data.errors.length === 0
          ? "all"
          : `missing:${data.errors.join(",")}`,
      },
    });
  } catch (err) {
    // Catastrophic failure: the lib itself threw. The individual fetchers
    // already swallow their own errors and return null/[]; reaching this
    // catch means something more fundamental went wrong (e.g. a network
    // total failure during Promise.all scheduling).
    const message = err instanceof Error ? err.message : "unknown error";
    console.error("[api/live-tz] fatal error:", err);

    const empty: LiveTZData = {
      weather: [],
      currency: null,
      economy: null,
      wiki: [],
      generatedAt: new Date().toISOString(),
      partial: true,
      errors: ["all"],
    };

    return NextResponse.json(
      {
        ...empty,
        error: message,
        partial: true,
      },
      {
        status: 200, // still 200 — payload documents the failure
        headers: {
          "Cache-Control": "no-store",
          "X-Live-TZ-Sources": "all-failed",
        },
      }
    );
  }
}

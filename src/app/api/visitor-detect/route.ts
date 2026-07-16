/**
 * GET /api/visitor-detect
 *
 * Server-side visitor geolocation. Calls BigDataCloud's free
 * `/data/client-info` endpoint and returns a normalized payload that the
 * <VisitorDetector /> client component can consume.
 *
 * Cached for 1 hour via Next.js Data Cache. Falls back to an
 * "everything unknown, recommend English" payload if the upstream call
 * fails or rate-limits — never returns 5xx for a non-critical lookup.
 */

import { NextResponse, type NextRequest } from "next/server";
import type { RecommendedLang, VisitorInfo } from "@/components/live/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Cache the upstream response for 1 hour.
const REVALIDATE_SECONDS = 3600;

const BDC_URL = "https://api.bigdatacloud.net/data/client-info";

interface BDCResponse {
  ip?: string;
  country?: { isoCode?: string; name?: string };
  city?: { name?: string };
}

const FALLBACK: VisitorInfo = {
  country: "XX",
  city: null,
  recommendedLang: "en",
  ip: "",
  source: "fallback",
};

export async function GET(request: NextRequest) {
  // The BigDataCloud free endpoint uses the requester's IP. We let it
  // read it from the connection; we just pass through our headers.
  const apiKey = process.env.BIGDATACLOUD_API_KEY;

  try {
    const url = new URL(BDC_URL);
    if (apiKey) url.searchParams.set("key", apiKey);
    // Lighten the response — we only need a few fields.
    url.searchParams.set("localityLanguage", "en");

    const res = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
        "User-Agent": "TanzaniaReach/1.0 (+https://tanzaniareach.example)",
      },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      return NextResponse.json(FALLBACK, {
        status: 200,
        headers: { "x-visitor-source": "fallback-http" },
      });
    }

    const data = (await res.json()) as BDCResponse;
    const country = (data.country?.isoCode ?? "XX").toUpperCase();
    const city = data.city?.name ?? null;
    const lang: RecommendedLang = country === "TZ" ? "sw" : "en";
    const ip = data.ip ?? clientIpFromHeaders(request);

    const payload: VisitorInfo = {
      country,
      city,
      recommendedLang: lang,
      ip,
      source: "live",
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "x-visitor-source": "live",
        "Cache-Control": `public, max-age=${REVALIDATE_SECONDS}, s-maxage=${REVALIDATE_SECONDS}`,
      },
    });
  } catch {
    // BigDataCloud unreachable / timeout — return a non-error fallback so
    // the client never has to special-case 5xx.
    const payload: VisitorInfo = {
      ...FALLBACK,
      ip: clientIpFromHeaders(request),
    };
    return NextResponse.json(payload, {
      status: 200,
      headers: { "x-visitor-source": "fallback-error" },
    });
  }
}

/** Best-effort client IP extraction from common reverse-proxy headers. */
function clientIpFromHeaders(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "";
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    ""
  );
}

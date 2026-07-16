"use client";

/**
 * VisitorDetector — silent client component.
 *
 * On mount:
 *   1. Fetches /api/visitor-detect to get the visitor's country/city.
 *   2. Sets `localStorage['tz-lang']` to "sw" if country is TZ, otherwise "en".
 *   3. Updates `document.documentElement.lang` accordingly.
 *   4. Dispatches a `tz-lang-detected` custom event so the rest of the app
 *      can react (e.g. swap copy, swap routes, log analytics).
 *
 * Renders nothing. Safe to drop into any layout.
 */

import { useEffect } from "react";
import type { RecommendedLang, VisitorInfo } from "./types";

const TZ_LANG_STORAGE_KEY = "tz-lang";
const TZ_LANG_EVENT = "tz-lang-detected";

export interface VisitorDetectorProps {
  /**
   * Optional override of the API endpoint, useful for tests or self-hosted
   * mirrors. Defaults to "/api/visitor-detect".
   */
  endpoint?: string;
  /**
   * Disable the network call (e.g. in Storybook, tests, or admin views).
   * Defaults to false.
   */
  disabled?: boolean;
}

export function VisitorDetector({
  endpoint = "/api/visitor-detect",
  disabled = false,
}: VisitorDetectorProps) {
  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;

    // Don't re-run if a previous detector on the same page already set the flag.
    const existing = window.localStorage.getItem(TZ_LANG_STORAGE_KEY);
    if (existing === "sw" || existing === "en") {
      document.documentElement.lang = existing;
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);

    fetch(endpoint, { signal: controller.signal, cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Visitor detect failed: ${res.status}`);
        const data = (await res.json()) as VisitorInfo;
        const lang: RecommendedLang = data.recommendedLang;
        applyLanguage(lang);
        dispatchEvent(lang, data);
      })
      .catch((err) => {
        // Silent: never break the page over a geo lookup failure.
        if (process.env.NODE_ENV !== "production") {
          // eslint-disable-next-line no-console
          console.debug("[VisitorDetector] falling back to 'en':", err);
        }
        applyLanguage("en");
        dispatchEvent("en", null);
      })
      .finally(() => {
        window.clearTimeout(timeout);
      });

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [endpoint, disabled]);

  return null;
}

function applyLanguage(lang: RecommendedLang) {
  if (typeof document === "undefined") return;
  try {
    window.localStorage.setItem(TZ_LANG_STORAGE_KEY, lang);
  } catch {
    // localStorage may be disabled (Safari private mode, etc.) — ignore.
  }
  document.documentElement.lang = lang;
}

function dispatchEvent(lang: RecommendedLang, info: VisitorInfo | null) {
  if (typeof window === "undefined") return;
  const event = new CustomEvent<{ lang: RecommendedLang; info: VisitorInfo | null }>(
    TZ_LANG_EVENT,
    { detail: { lang, info } }
  );
  window.dispatchEvent(event);
}

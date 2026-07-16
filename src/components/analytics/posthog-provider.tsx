'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ─── Initialise PostHog once on mount ──────────────────────────────────────
function PostHogInit() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    if (typeof window === 'undefined') return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';

    if (!key) {
      // No key set — PostHog is silently disabled in this environment
      return;
    }

    posthog.init(key, {
      api_host: host,
      capture_pageview: false,          // We capture page views manually via the router
      capture_pageleave: true,
      persistence: 'localStorage',
      autocapture: false,               // Opt-in only — avoids accidental PII capture
      disable_session_recording: true,  // Enable in PostHog dashboard if needed
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') {
          ph.debug(false);
        }
      },
    });

    initialized.current = true;
  }, []);

  return null;
}

// ─── Page view tracker — fires on every route change ───────────────────────
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (!ph) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    ph.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams, ph]);

  return null;
}

// ─── Main provider — wrap around the entire app ────────────────────────────
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PostHogInit />
      <PageViewTracker />
      {children}
    </PHProvider>
  );
}

// ─── Helper hook — use anywhere to track custom events ─────────────────────
export { usePostHog };

/**
 * Usage example inside any Client Component:
 *
 * import { usePostHog } from '@/components/analytics/posthog-provider';
 *
 * const ph = usePostHog();
 * ph.capture('sector_guide_viewed', { sector: 'agriculture' });
 */

'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_tanzania_reach_telemetry_pub';
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    // Privacy-safe PostHog initialization
    // Tracks page duration, errors/crashes, and popular pages WITHOUT storing personal identity data
    try {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: 'identified_only', // Never profile anonymous visitors
        capture_pageview: false, // Handled manually below on route change
        capture_pageleave: true, // Accurately records which pages users stay on the most!
        autocapture: {
          dom_event_allowlist: ['click'], // Minimal touchpoint telemetry
        },
        disable_session_recording: true, // Disabled to prevent rrweb DOM MutationObserver thrashing with GSAP and animations
        persistence: 'memory', // Avoids intrusive cookies if privacy policy prefers
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') {
            // Optional dev logging
          }
        },
      });
    } catch {
      // Safe fallback if blocked by ad-blocker
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      {/* Suspense boundary is REQUIRED: useSearchParams() bails out of static
          prerendering — without it, "collecting page data" fails for /_not-found
          and other statically generated pages. */}
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}

function PostHogPageView(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
        page_title: document.title,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

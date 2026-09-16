'use client';

import dynamic from 'next/dynamic';

// Non-critical floating and client-only background widgets deferred from initial SSR
const InstallPrompt = dynamic(
  () => import('@/components/pwa/InstallPrompt').then((m) => m.InstallPrompt),
  { ssr: false }
);
const CookieConsent = dynamic(
  () => import('@/components/cookie-consent').then((m) => m.CookieConsent),
  { ssr: false }
);
const ScrollProgress = dynamic(
  () => import('@/components/scroll-progress').then((m) => m.ScrollProgress),
  { ssr: false }
);
const FirebaseErrorListener = dynamic(
  () => import('@/components/FirebaseErrorListener').then((m) => m.FirebaseErrorListener),
  { ssr: false }
);
const AIChat = dynamic(
  () => import('@/components/portal/ai-chat').then((m) => m.AIChat),
  { ssr: false }
);

export function ClientWidgets() {
  return (
    <>
      <ScrollProgress />
      <FirebaseErrorListener />
      <InstallPrompt />
      <CookieConsent />
      <AIChat />
    </>
  );
}

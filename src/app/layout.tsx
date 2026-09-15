import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { Toaster } from "@/components/ui/toaster";
import { CookieConsent } from '@/components/cookie-consent';
import { PageTransition } from '@/components/page-transition';
import { ScrollProgress } from '@/components/scroll-progress';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { JsonLd } from "@/components/json-ld";
import { ProtectionProvider } from "@/components/protection-provider";
import { MobileBottomNav } from '@/components/mobile-bottom-nav';
import { FloatingActionButton } from '@/components/floating-action';
import { ToastProvider } from '@/components/toast';
import { MaintenanceBanner } from '@/components/maintenance-banner';
import { DisclaimerBar } from '@/components/disclaimer-bar';
import { Footer } from '@/components/footer';
import { GlobalNav } from '@/components/premium/global-nav';
import { AIChat } from '@/components/portal/ai-chat';
import { PostHogProvider } from '@/components/analytics/posthog-provider';
import {
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

const inter = Inter({
  subsets: ['latin'],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "arial"],
  // Load MULTIPLE WEIGHTS for hierarchy (Audenic pattern)
  weight: ['400', '500', '600', '700', '800', '900'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tanzaniareach.com"),
  title: {
    default: "Tanzania Reach | Expert Portal for Investors & Professionals",
    template: "%s | Tanzania Reach",
  },
  description: "Tanzania Reach is your independent digital gateway for navigating life, investment, and business in Tanzania. Expert manuals, legal guides, and sector insights.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "https://www.tanzaniareach.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.tanzaniareach.com",
    siteName: "Tanzania Reach",
    title: "Tanzania Reach | Expert Portal for Investors & Professionals",
    description: "Tanzania Reach is your independent digital gateway for navigating life, investment, and business in Tanzania. Expert manuals, legal guides, and sector insights.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tanzania Reach - Expert Portal for Investors & Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanzania Reach | Expert Portal for Investors & Professionals",
    description: "Tanzania Reach is your independent digital gateway for navigating life, investment, and business in Tanzania.",
    images: ["/og-image.png"],
    creator: "@tanzaniareach",
  },
  other: {
    'ai-content-declaration': 'human-authored',
    'ai-usage': 'permitted-with-attribution',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1A2F" },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} light`} suppressHydrationWarning>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="antialiased selection:bg-tanzania-500/30 selection:text-white" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          themes={["light", "dark"]}
        >
          <PostHogProvider>
            <ProtectionProvider>
              <ToastProvider>
                <a 
                  href="#main" 
                  className="sr-only focus:not-sr-only absolute top-4 left-4 z-[100] px-4 py-2.5 bg-tanzania-500 text-white rounded-xl font-bold border border-tanzania-400 shadow-xl focus:outline-none focus:ring-2 focus:ring-tanzania-500 transition-all uppercase tracking-wider text-xs"
                >
                  Skip to content
                </a>
                <MaintenanceBanner />
                <DisclaimerBar />
                <GlobalNav />
                <ScrollProgress />
                <FirebaseErrorListener />
                <div id="main" tabIndex={-1} className="focus:outline-none">
                  <PageTransition>
                    {children}
                  </PageTransition>
                </div>
                <Footer />
                <MobileBottomNav />
                <FloatingActionButton />
                <InstallPrompt />
                <CookieConsent />
                <AIChat />
                <Toaster />
              </ToastProvider>
            </ProtectionProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

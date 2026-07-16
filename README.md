# 🇹🇿 Tanzania Reach

> **The independent intelligence portal for professionals navigating life, business, and investment in Tanzania.**

![Status](https://img.shields.io/badge/status-🟡%20Beta-yellow)
![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black)
![React](https://img.shields.io/badge/React-19-blue)
![Firebase](https://img.shields.io/badge/Firebase-11-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![License](https://img.shields.io/badge/license-Private-red)

---

## 📋 Table of Contents

1. [Project Identity](#1--project-identity)
2. [Live System Snapshot](#2--live-system-snapshot)
3. [System Architecture](#3--system-architecture)
4. [Complete File Structure](#4--complete-file-structure)
5. [Installation & Setup](#5--installation--setup)
6. [How To Use It](#6--how-to-use-it)
7. [Database Schema](#7--database-schema)
8. [AI Integration Details](#8--ai-integration-details)
9. [Current Limitations & Known Bugs](#9--current-limitations--known-bugs)
10. [Modification & Addon Guide](#10--modification--addon-guide)
11. [Deployment Guide](#11--deployment-guide)
12. [Cost Calculator](#12--cost-calculator)
13. [Roadmap](#13--roadmap)
14. [Lessons Learned](#14--lessons-learned)
15. [Quick Reference Card](#15--quick-reference-card)

---


## 1 🪪 Project Identity

### What Is This? (For a 10-year-old)

Tanzania Reach is a website that helps grown-ups who want to move to, invest in, or do business in Tanzania understand all the rules, steps, and agencies they need to deal with — all explained clearly in one place, instead of scattered across 30 different government websites.

### What Is This? (For a Developer)

Tanzania Reach is a **Next.js 15 App Router** web application serving as a structured, editorial intelligence portal for Tanzania. It aggregates regulatory data, sector investment guides, live economic indicators (currency rates, weather, World Bank stats), and a live Tanzania news feed — rendered via React Server Components with 30-minute ISR cache windows. The admin dashboard (`/p-access`) is protected by Firebase Authentication + session cookies via Next.js middleware, with role-based Firestore security rules (`owner / admin / editor`). The AI layer uses **Google Genkit + Gemini** for a planned AI assistant. Deployed on **Firebase App Hosting** with auto-scaling Cloud Run containers.

### What Business Problem Does It Solve?

Foreign investors, expats, executives, and professionals who want to operate in Tanzania face a deeply fragmented information landscape: 30+ ministries, 90+ regulatory agencies, zero authoritative English-language aggregated source. Due diligence that should take days takes months. Tanzania Reach compresses that research surface into 18 structured sector guides with real fees, named agencies, and actual timelines. It monetises via sponsored content placements, premium downloads, and future subscription tiers targeting consulting firms, law practices, and institutional investors entering Sub-Saharan Africa's fourth-largest economy.

### Version & Status

| Item | Detail |
|------|--------|
| **Version** | `0.1.0` |
| **Status** | 🟡 **Beta** — Core portal live, AI assistant and full CMS in active development |
| **Domain** | `www.tanzaniareach.com` |
| **Dev Port** | `localhost:9002` |
| **Deployment** | Firebase App Hosting (Cloud Run) |

### Who Built It & Why

Built by an independent developer as a private editorial product targeting the growing wave of foreign professionals entering Tanzania's expanding economy. The motivation was personal research friction — discovering that no professional-grade, English-language, aggregated regulatory reference existed for Tanzania.

### What Makes This Different

| Feature | Tanzania Reach | Typical Alternatives |
|---------|---------------|----------------------|
| Structured sector guides | ✅ 18 sectors, named agencies, real timelines | ❌ Generic blog posts |
| Live economic indicators | ✅ Real-time TZS exchange, weather, World Bank stats | ❌ Static / manual updates |
| Role-based editorial CMS | ✅ Built-in `/p-access` admin | ❌ Expensive third-party CMS |
| AI assistant | ✅ Gemini-powered, Tanzania-tuned (in development) | ❌ None |
| PWA + offline support | ✅ next-pwa configured | ❌ Rarely implemented |
| Zero paywalls | ✅ Fully free to read | ❌ Most have paywalls |
| Bot / scraper protection | ✅ Middleware blocks scrapers at the Edge | ❌ None |

---


## 2 📊 Live System Snapshot

### Component Status Table

| Component | Status | What It Does | Tech Used |
|-----------|--------|-------------|-----------|
| **Landing Page** | ✅ Live | Hero, sector marquee, intro statement, stats, pillars, sector grid, about band, news feed, CTA | Next.js RSC, Framer Motion, GSAP |
| **Sector Guides (18)** | ✅ Live | agriculture, mining, tourism, immigration, real estate, legal, banking, healthcare, energy, technology, education, wildlife, culture, transport, food, entertainment, phrasebook, directory | Next.js SSG |
| **Live Data API** `/api/live-tz` | ✅ Live | Currency rates, weather, economy stats — 30-min ISR cache | Open-Meteo, fawazahmed0, World Bank, Wikipedia REST |
| **Tanzania News Feed** | ✅ Live | Server-rendered live headlines from Tanzanian newsrooms | `/api/tz-news`, ISR |
| **Visitor Detector** | ✅ Live | Geo-detects if visitor is inside Tanzania | `/api/visitor-detect`, Edge runtime |
| **Admin Dashboard** `/p-access` | ✅ Live | Login, dashboard, content management, user roles, analytics, media, settings | Firebase Auth + Firestore |
| **Downloads Section** | ✅ Live | Downloadable PDF guides with canvas watermarks | Firebase Storage |
| **AI Assistant** `/assistant` | 🟡 Partial | Page + UI shell exist; Genkit backend configured but not yet wired to the chat UI | Google Genkit, Gemini |
| **Dark / Light Theme** | ✅ Live | System-aware with manual toggle | next-themes |
| **PWA** | ✅ Live | Installable, offline shell | next-pwa, Workbox |
| **Cookie Consent** | ✅ Live | GDPR-compliant consent bar | Custom component |
| **SEO / OG Images** | ✅ Live | Dynamic OG images per route, JSON-LD structured data, sitemap.xml, robots.txt | Next.js Edge runtime |
| **Sponsor Ad Slots** | ✅ Live | Configurable monetisation slots | Custom component |
| **Firestore Security Rules** | ✅ Live | Role-based rules: `owner`, `admin`, `editor` | Firebase Firestore Rules |
| **Edge Middleware** | ✅ Live | Bot blocking, admin route session guard, security headers | Next.js Edge Middleware |

### ✅ Fully Working Right Now

- All 18 sector guide pages render with full SEO metadata
- Live currency exchange rates (USD, EUR, GBP, CNY, KES, ZAR vs TZS) — refreshed every 30 minutes
- Real-time Dar es Salaam weather via Open-Meteo (zero API key required)
- Tanzania news feed pulling live headlines from local newsrooms
- Full admin dashboard: login, user management, content editor, media library, global settings
- Downloads section with watermarked PDFs from Firebase Storage
- Dark / light theme with system preference detection
- PWA: installable on Android and desktop Chrome
- Bot / scraper blocking in Edge middleware (curl, scrapy, wget, python-requests, axios, etc.)
- GDPR cookie consent + educational disclaimer bar

### 🟡 Partially Working

| Feature | What Works | What Doesn't |
|---------|-----------|--------------|
| **AI Assistant** | Page loads, UI shell renders cleanly | Genkit flows not yet wired to the chat UI — no responses returned |
| **SWC Compiler** | App builds successfully via Babel fallback | Native `@next/swc-win32-x64-msvc` binary is invalid on this Windows install |
| **Live Data at build time** | ISR serves cached data correctly | World Bank + Wikipedia APIs intermittently timeout during cold `next build` |

### 🔲 Planned — Not Started Yet

- [ ] Public user accounts and saved content
- [ ] Email newsletter integration
- [ ] Full Tanzania company directory with full-text search
- [ ] Interactive regulatory timeline builder
- [ ] Mobile app (React Native / Expo)
- [ ] Multi-language support (Swahili + English)

### ❌ Tried and Abandoned

| Item | Reason Abandoned |
|------|----------------|
| **Live data block on homepage** | Bento grid card overlap + stationary marquee visual bug; data still available at `/api/live-tz` |
| **Hero stats grid** | Caused content overlap, crowded the hero visual hierarchy |
| **"Featured In" logo marquee** | Looked noisy, broke premium editorial aesthetic |
| **Process + Testimonial sections** | Felt generic and "AI-slopped"; page is cleaner without them |

---


## 3 🏗️ System Architecture

### High-Level Architecture Diagram

```
                     ┌──────────────────────────────────────┐
                     │           VISITOR (Browser)           │
                     └─────────────────┬────────────────────┘
                                       │ HTTPS
                                       ▼
                     ┌──────────────────────────────────────┐
                     │      Next.js Edge Middleware          │
                     │  bot-block · session guard · headers  │
                     └───────┬──────────────────┬───────────┘
                             │ Pass              │ Block → 403
                             ▼                  ▼
          ┌──────────────────────────┐    ┌─────────────────┐
          │   Firebase App Hosting   │    │  Blocked Bot    │
          │  (Cloud Run + Next.js)   │    └─────────────────┘
          └────────┬─────────────────┘
                   │
     ┌─────────────┼───────────────────────────────────────────┐
     │             │                                           │
     ▼             ▼                                           ▼
┌──────────┐  ┌───────────────────────────┐        ┌──────────────────┐
│  Public  │  │       API Routes          │        │  Admin Routes    │
│  Pages   │  │                           │        │  /p-access/**    │
│ (SSG/ISR)│  │  GET /api/live-tz         │        │                  │
│          │  │  GET /api/tz-news         │        │  Firebase Auth   │
│ 18 sector│  │  GET /api/visitor-detect  │        │  Session Cookie  │
│ /about   │  └──────────┬────────────────┘        │  Guard           │
│ /guides  │             │                         └───────┬──────────┘
│ /download│             │                                 │
└──────────┘             ▼                                 ▼
                ┌─────────────────────┐          ┌──────────────────┐
                │  lib/live-data.ts   │          │   Firestore DB   │
                │  (Server fetcher,   │          │                  │
                │  ISR 30 min cache)  │          │  /sectors        │
                │                     │          │  /guides         │
                │  Open-Meteo ────────┤          │  /admin_users    │
                │  fawazahmed0 ───────┤          │  /settings       │
                │  World Bank ────────┤          │  /media          │
                │  Wikipedia ─────────┤          │  /ai_queries     │
                └─────────────────────┘          └───────┬──────────┘
                                                         │
                                                         ▼
                                                ┌──────────────────┐
                                                │ Firebase Storage │
                                                │  /downloads/**   │
                                                │  /media/**       │
                                                └──────────────────┘

                                                ┌──────────────────┐
                                                │  Google Genkit   │
                                                │  + Gemini AI     │
                                                │  /assistant      │
                                                │  (in progress)   │
                                                └──────────────────┘
```

### Step-by-Step: What Happens When a User Visits the Homepage

| Step | What Happens |
|------|-------------|
| **1** | Request arrives at Firebase App Hosting — a managed Cloud Run container running the Next.js server |
| **2** | Edge Middleware fires instantly: checks User-Agent against the scraper blocklist, verifies admin routes have a valid `firebase-session` cookie, injects security headers (`X-Frame-Options`, `HSTS`, `CSP`, etc.) |
| **3** | `src/app/page.tsx` RSC is evaluated — it is a React Server Component. Next.js checks the ISR cache; if the page was pre-rendered and is not stale, the cached HTML is returned in < 50 ms |
| **4** | The browser receives fully-rendered HTML — hero, sector marquee, intro statement, stats block, pillars, sector grid, and about band are all present in the initial payload (zero JavaScript needed to see content) |
| **5** | React hydrates the client components: `HeroSection` starts the typewriter animation, `ParticleField` initialises the canvas, GSAP registers `ScrollTrigger` listeners |
| **6** | The CSS `animate-marquee` keyframe runs the sector strip continuously — no JavaScript loop |
| **7** | As the user scrolls, GSAP `ScrollTrigger` fires `slide-left`, `slide-right`, and `fade-up` reveals on section headlines |
| **8** | User navigates to `/agriculture` — pre-rendered static page from the CDN edge cache loads in < 100 ms |
| **9** | User opens `/assistant` — the AI page loads; when a message is submitted, a Next.js Server Action invokes a Genkit flow which calls the Gemini API |

---


## 4 📁 Complete File Structure

```
tanzania-connect-main/
│
├── .env                            # Local environment variables — NEVER commit this
├── .firebaserc                     # Firebase project alias → tanzaniareach
├── .gitignore                      # Standard Next.js gitignore
├── apphosting.yaml                 # Firebase App Hosting: CPU, RAM, concurrency, secrets
├── components.json                 # Shadcn/ui config: base colour, import paths
├── firebase.json                   # Firebase CLI config: hosting, Firestore, Storage rules
├── firestore.rules                 # Firestore role-based security rules (owner/admin/editor)
├── storage.rules                   # Firebase Storage security rules
├── next.config.ts                  # Next.js: CSP headers, image domains, ISR, compression
├── next-env.d.ts                   # Next.js TypeScript ambient type declarations
├── package.json                    # 83 dependencies + npm scripts
├── postcss.config.mjs              # PostCSS config for Tailwind CSS
├── tailwind.config.ts              # Tailwind theme: custom colours, animations, fonts
├── tailwing.config.ts              # ⚠️ ORPHAN — misspelled duplicate, safe to delete
├── tsconfig.json                   # TypeScript config with @/* path aliases
│
├── docs/
│   └── blueprint.md                # Original product blueprint and design specification
│
├── public/
│   ├── favicon.ico                 # Site favicon
│   ├── manifest.json               # PWA web app manifest
│   ├── og-image.png                # Default Open Graph social preview image
│   └── *.png / *.svg               # All favicon variants (16px → 512px)
│
├── scripts/
│   ├── generate-favicons.mjs       # Node script: auto-generate all favicon sizes
│   └── generate-og-image.mjs       # Node script: generate OG image from template
│
└── src/
    │
    ├── middleware.ts               # Edge middleware: bot-block + admin session guard
    │
    ├── actions/                    # Next.js Server Actions (form submissions, mutations)
    │
    ├── ai/
    │   ├── dev.ts                  # Genkit dev server entry point (npm run genkit:dev)
    │   └── flows/                  # Genkit AI flow definitions — Tanzania assistant logic
    │
    ├── app/                        # Next.js App Router — every page lives here
    │   ├── globals.css             # Global CSS: design tokens, keyframe animations, fonts
    │   ├── layout.tsx              # Root layout: Google Fonts, providers, GlobalNav, Footer
    │   ├── page.tsx                # Homepage route /
    │   ├── loading.tsx             # Global Suspense fallback skeleton
    │   ├── error.tsx               # Global error boundary page
    │   ├── global-error.tsx        # Root-level error boundary (outside layout)
    │   ├── not-found.tsx           # 404 page
    │   ├── robots.ts               # Dynamic robots.txt generation
    │   ├── sitemap.ts              # Dynamic XML sitemap for all 43 routes
    │   ├── opengraph-image.tsx     # Dynamic OG image for homepage
    │   ├── twitter-image.tsx       # Dynamic Twitter card image
    │   │
    │   ├── api/
    │   │   ├── live-tz/            # GET /api/live-tz — aggregated Tanzania live data
    │   │   ├── tz-news/            # GET /api/tz-news — live news headlines
    │   │   └── visitor-detect/     # GET /api/visitor-detect — geo IP country detection
    │   │
    │   ├── about/                  # /about — mission and team page
    │   ├── accommodation/          # /accommodation — accommodation sector
    │   ├── agriculture/            # /agriculture — agribusiness investment guide
    │   ├── banking/                # /banking — banking and finance guide
    │   ├── corporate/              # /corporate — company formation guide
    │   ├── culture/                # /culture — cultural guide
    │   ├── directory/              # /directory — business directory
    │   ├── downloads/              # /downloads — downloadable PDF guides
    │   ├── entertainment/          # /entertainment — entertainment sector
    │   ├── etiquette/              # /etiquette — business etiquette guide
    │   ├── food-and-drink/         # /food-and-drink — food and dining guide
    │   ├── guides/                 # /guides — all 18 sector guides index
    │   ├── healthcare/             # /healthcare — healthcare investment guide
    │   ├── housing/                # /housing — real estate investment guide
    │   ├── infrastructure/         # /infrastructure — infrastructure and energy
    │   ├── phrasebook/             # /phrasebook — Swahili phrasebook
    │   ├── privacy/                # /privacy — privacy policy
    │   ├── terms/                  # /terms — terms of service
    │   ├── transport/              # /transport — transport sector guide
    │   ├── visa/                   # /visa — immigration and entry guide
    │   ├── wildlife/               # /wildlife — wildlife and conservation guide
    │   ├── assistant/              # /assistant — AI chat powered by Genkit + Gemini
    │   ├── cookies/                # /cookies — cookie policy
    │   ├── loader-demo/            # /loader-demo — internal animation test page
    │   ├── mwijay/                 # /mwijay — developer/founder profile
    │   │
    │   ├── admin/                  # ⚠️ LEGACY admin panel — being replaced by /p-access
    │   │
    │   └── p-access/               # PRODUCTION admin panel
    │       ├── dashboard/          # Overview stats and quick actions
    │       ├── content/            # Create, edit, and publish sector content
    │       ├── users/              # Manage admin user roles
    │       ├── analytics/          # Site traffic analytics
    │       ├── media/              # Firebase Storage media library
    │       ├── settings/           # Global site settings (Firestore backed)
    │       └── login/              # Admin login (Firebase email + password)
    │
    ├── components/
    │   ├── home-page-client.tsx    # Landing page — all sections assembled (Client Component)
    │   ├── hero-section.tsx        # Hero: badge, headline, typewriter, CTA buttons, particles
    │   ├── footer.tsx              # Site footer: nav links, brand, social links
    │   ├── disclaimer-bar.tsx      # Educational resource disclaimer popup
    │   ├── cookie-consent.tsx      # Cookie consent GDPR banner
    │   ├── download-card.tsx       # Individual download item card
    │   ├── downloads-client.tsx    # Downloads page client wrapper
    │   ├── sponsor-ads.tsx         # Configurable sponsor / ad slots (monetisation)
    │   ├── floating-action.tsx     # Floating back-to-top action button
    │   ├── mobile-bottom-nav.tsx   # Mobile bottom navigation bar
    │   ├── mobile-menu.tsx         # Mobile hamburger slide-out drawer
    │   ├── page-transition.tsx     # Page-level Framer Motion transition wrapper
    │   ├── scroll-progress.tsx     # Scroll position progress bar
    │   ├── theme-toggle.tsx        # Dark / light mode toggle button
    │   ├── theme-provider.tsx      # next-themes provider wrapper
    │   ├── loader.tsx              # Full-screen page loader animation
    │   ├── spinner.tsx             # Inline loading spinner
    │   ├── toast.tsx               # Toast notification system
    │   ├── stagger.tsx             # Staggered child animation wrapper
    │   ├── typing.tsx              # Reusable typewriter text component
    │   ├── json-ld.tsx             # JSON-LD structured data script injector
    │   ├── maintenance-banner.tsx  # Site maintenance mode banner
    │   ├── protection-provider.tsx # Client-side admin route auth guard
    │   ├── FirebaseErrorListener.tsx # Global Firebase error event listener
    │   ├── animated-button.tsx     # Premium animated button component
    │   ├── animated-input.tsx      # Premium animated input field
    │   │
    │   ├── premium/                # Premium interactive animated components
    │   │   ├── global-nav.tsx      # Main nav bar — sticky glass pill on scroll
    │   │   ├── blur-text.tsx       # Word-by-word blur-in text reveal animation
    │   │   ├── letter-reveal.tsx   # Per-character staggered reveal animation
    │   │   ├── marquee.tsx         # Infinite scrolling marquee (items array prop)
    │   │   ├── marquee-strip.tsx   # Full-width marquee section strip
    │   │   ├── particle-field.tsx  # Canvas-based ambient particle background
    │   │   ├── scroll-reveal.tsx   # GSAP ScrollTrigger animation wrapper
    │   │   ├── reveal-on-scroll.tsx # Framer Motion viewport-triggered reveal
    │   │   ├── spotlight-card.tsx  # Card with radial spotlight hover effect
    │   │   ├── magnet-button.tsx   # Magnetic cursor CTA button
    │   │   ├── stats.tsx           # Animated count-up statistics block
    │   │   ├── regulator-strip.tsx # Scrolling regulatory institution strip
    │   │   └── tanzania-news-feed.tsx # Live Tanzania news feed component
    │   │
    │   ├── live/                   # Live data display components
    │   │   ├── live-data-section.tsx  # Assembles all live widgets
    │   │   ├── currency-widget.tsx    # TZS exchange rate cards with marquee
    │   │   ├── currency-ticker.tsx    # Compact scrolling FX ticker strip
    │   │   ├── wiki-fact-card.tsx     # Wikipedia fact cards grid
    │   │   └── types.ts               # Shared types for live data
    │   │
    │   ├── ui/                     # Shadcn/ui + custom base UI components (40+ files)
    │   │   ├── marquee.tsx         # Generic CSS-animation marquee component
    │   │   ├── blur-fade.tsx       # Blur + fade entrance animation
    │   │   ├── card-spotlight.tsx  # Card with spotlight hover tracking
    │   │   ├── shine-border.tsx    # Animated shine border effect
    │   │   ├── magic-card.tsx      # Gradient-following magic card
    │   │   ├── skeleton.tsx        # Loading skeleton placeholder
    │   │   └── *.tsx               # All Radix-based Shadcn/ui components
    │   │
    │   ├── admin/                  # Admin panel UI components
    │   ├── ai/                     # AI assistant UI components
    │   ├── layout/                 # Page layout wrapper components
    │   ├── legal/                  # Legal page components (terms, privacy, cookies)
    │   ├── portal/                 # Dashboard shell components
    │   ├── pwa/                    # PWA install prompt components
    │   └── smoothui/               # Third-party smooth UI micro-interaction components
    │
    ├── firebase/
    │   ├── config.ts               # Firebase client SDK initialisation (public env vars)
    │   ├── admin.ts                # Firebase Admin SDK init — server-only
    │   ├── index.ts                # Re-exports: auth, db, storage
    │   ├── errors.ts               # Firebase error code → human-readable message mapper
    │   ├── error-emitter.ts        # Global Firebase error event bus
    │   ├── auth/                   # Authentication utilities and custom hooks
    │   └── firestore/              # Firestore collection query hooks
    │
    ├── hooks/
    │   └── use-typing.ts           # Typewriter animation hook
    │
    ├── lib/
    │   ├── live-data.ts            # SERVER ONLY: fetches weather, currency, economy, wiki
    │   ├── sector-metadata.ts      # SEO title, description, keywords for all 18 sectors
    │   ├── tanzania-data.ts        # Static Tanzania facts, sectors array, getSectorUrl helper
    │   ├── schema.ts               # JSON-LD structured data schemas (homepage, organisation)
    │   ├── downloads-config.ts     # Download file metadata config (PDF titles, sizes, etc.)
    │   ├── placeholder-images.ts   # Placeholder image URL array
    │   ├── placeholder-images.json # Placeholder image data
    │   ├── upload.ts               # Firebase Storage file upload utility
    │   ├── watermark.ts            # Canvas-based PDF watermark application utility
    │   └── utils.ts                # cn() Tailwind classname merge utility
    │
    └── types/                      # Shared TypeScript type definitions
```

---


## 5 ⚙️ Installation & Setup

### Prerequisites

| Tool | Minimum Version | Download |
|------|----------------|----------|
| **Node.js** | v20.x LTS | [nodejs.org/en/download](https://nodejs.org/en/download) |
| **npm** | v10.x (bundled with Node) | Included with Node.js |
| **Git** | Any recent version | [git-scm.com/downloads](https://git-scm.com/downloads) |
| **Firebase CLI** | Latest | Run: `npm install -g firebase-tools` |

Verify your tools are ready:
```bash
node --version     # must print v20.x.x or higher
npm --version      # must print 10.x.x or higher
firebase --version # must print 14.x.x or higher
```

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/tanzania-connect-main.git
cd tanzania-connect-main
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

**Expected output (final lines):**
```
added 847 packages, and audited 848 packages in 45s
found 0 vulnerabilities
```

---

### Step 3 — Create Your Environment File

Create a file named `.env` in the project root and populate it:

```bash
# ─── Site Identity ─────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:9002
NEXT_PUBLIC_SITE_NAME=Tanzania Reach

# ─── Firebase Client SDK (Public — safe in browser) ────────
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy_YOUR_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456

# ─── Firebase Admin SDK (Private — NEVER expose) ───────────
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_CONTENT\n-----END PRIVATE KEY-----\n"

# ─── Google AI / Gemini ─────────────────────────────────────
GOOGLE_GENAI_API_KEY=AIzaSy_YOUR_GEMINI_KEY
```

**Where to get each value:**

| Variable | Where to Find It |
|----------|-----------------|
| `NEXT_PUBLIC_FIREBASE_*` | Firebase Console → Project Settings → General → Your Apps → Web App → SDK Config |
| `FIREBASE_ADMIN_CLIENT_EMAIL` `FIREBASE_ADMIN_PRIVATE_KEY` | Firebase Console → Project Settings → Service Accounts → **Generate New Private Key** |
| `GOOGLE_GENAI_API_KEY` | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) → Create API Key |

> **Important:** The `FIREBASE_ADMIN_PRIVATE_KEY` must be wrapped in double quotes and use `\n` (literal backslash-n) for newlines. Copy it exactly as exported from Firebase.

---

### Step 4 — Connect Firebase

```bash
firebase login
firebase use your-project-id
```

---

### Step 5 — Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.5.9
  - Local:        http://localhost:9002
  - Environments: .env

 ✓ Starting...
 ✓ Ready in 2.3s
```

Open your browser at **http://localhost:9002**

---

### Step 6 — Verify Everything Works

| Check | What to Look For |
|-------|----------------|
| Homepage loads | Tanzania Reach hero with animated headline appears |
| Sector nav works | Hover the nav → sector dropdown appears |
| Dark mode toggle | Click theme icon in nav → page switches light ↔ dark |
| Sector page works | Go to `/agriculture` → full guide content loads |
| Admin login works | Go to `/p-access/login` → login form appears |
| Live data API works | Visit `http://localhost:9002/api/live-tz` → JSON response with currency + weather data |

---

### Common Setup Errors and Fixes

| Error Message | Cause | Fix |
|---------------|-------|-----|
| `next-swc-win32-x64-msvc.node is not a valid Win32 application` | SWC native binary corrupt on Windows | Run `npm install @next/swc-win32-x64-msvc` |
| `Error: FIREBASE_ADMIN_PRIVATE_KEY: Could not deserialize key data` | Newlines in private key escaped incorrectly | Wrap entire key in double quotes; use literal `\n` for newlines |
| `Cannot read properties of undefined (reading 'call')` | Stale `.next` build cache | Delete `.next` folder, restart `npm run dev` |
| `Module not found: Can't resolve '@/components/...'` | Missing path alias in tsconfig | Confirm `tsconfig.json` has `"@/*": ["./src/*"]` under `paths` |
| `Error: listen EADDRINUSE: address already in use 9002` | Port already occupied | Run `npx kill-port 9002` then restart |
| `FirebaseError: Invalid API key` | Wrong Firebase API key in `.env` | Re-copy the API key from Firebase Console exactly |
| `NEXT_DIST_DIR` build errors | Old lockfile mismatch | Delete `node_modules` and `package-lock.json`, run `npm install` again |

---


## 6 🖥️ How To Use It

### Browsing Sector Guides (Public)

All sector guides are fully static — no JavaScript required to read them.

```
http://localhost:9002/                   # Homepage
http://localhost:9002/guides             # All 18 sector guides index
http://localhost:9002/agriculture        # Agriculture & agribusiness guide
http://localhost:9002/mining             # Mining & minerals guide
http://localhost:9002/banking            # Banking & finance guide
http://localhost:9002/visa               # Immigration & entry guide
http://localhost:9002/healthcare         # Healthcare sector guide
http://localhost:9002/tourism            # Tourism investment guide
http://localhost:9002/downloads          # Downloadable PDF guides
http://localhost:9002/phrasebook         # Swahili phrasebook
http://localhost:9002/assistant          # AI assistant chat
```

---

### Live Data API

**`GET /api/live-tz`** — Returns aggregated live Tanzania data. Cached for 30 minutes via ISR.

```bash
curl http://localhost:9002/api/live-tz
```

**Example Response:**
```json
{
  "generatedAt": "2026-07-15T07:30:00.000Z",
  "partial": false,
  "weather": {
    "city": "Dar es Salaam",
    "country": "Tanzania",
    "temperatureC": 28,
    "windKph": 14,
    "weatherCode": 1,
    "icon": "Sun",
    "description": "Mainly Clear",
    "time": "2026-07-15T07:00"
  },
  "currency": {
    "base": "TZS",
    "perUnit": {
      "USD": 2627,
      "EUR": 2993,
      "GBP": 3412,
      "CNY": 362,
      "KES": 20,
      "ZAR": 148
    },
    "asOf": "2026-07-15",
    "fetchedAt": "2026-07-15T07:29:45.123Z"
  },
  "economy": {
    "gdpUsd": 90100000000,
    "population": 65000000,
    "inflationPercent": 3.3,
    "tourismArrivals": 1510000,
    "internetPenetrationPercent": 30.6,
    "lifeExpectancy": 65.9
  },
  "wiki": [
    {
      "topic": "Tanzania",
      "url": "https://en.wikipedia.org/wiki/Tanzania",
      "extract": "Tanzania, officially the United Republic of Tanzania, is a country in East Africa...",
      "thumbnail": "https://upload.wikimedia.org/wikipedia/commons/..."
    }
  ]
}
```

**Error response (when upstream API fails):**
```json
{
  "generatedAt": "2026-07-15T07:30:00.000Z",
  "partial": true,
  "weather": null,
  "currency": null,
  "economy": null,
  "wiki": []
}
```

---

### News API

**`GET /api/tz-news`** — Returns current Tanzania news headlines.

```bash
curl http://localhost:9002/api/tz-news
```

---

### Visitor Detection API

**`GET /api/visitor-detect`** — Returns the visitor's detected country code based on IP geolocation.

```bash
curl http://localhost:9002/api/visitor-detect
```

Used internally to optionally surface Swahili-first language hints for visitors browsing from inside Tanzania.

---

### Admin Dashboard

**Step 1:** Navigate to `http://localhost:9002/p-access/login`
**Step 2:** Sign in with your Firebase admin email and password
**Step 3:** You are redirected to `/p-access/dashboard`

| Route | What It Does |
|-------|-------------|
| `/p-access/dashboard` | Site overview: page counts, recent activity |
| `/p-access/content` | Create, edit, and publish sector guide content |
| `/p-access/users` | Add admins, assign roles (`owner` / `admin` / `editor`) |
| `/p-access/analytics` | Site traffic, page views, engagement |
| `/p-access/media` | Upload and manage files in Firebase Storage |
| `/p-access/settings` | Global config: maintenance mode, site title, announcements |

> **First-time setup:** The first admin user must be created manually in the Firebase Console → Firestore → `admin_users` collection. Set `role: "owner"` and `active: true`.

---


## 7 🗄️ Database Schema

### Collection: `sectors`

Stores sector guide content. Document ID equals the sector slug.

```
sectors/{sectorId}
├── id: string "agriculture"          → Sector slug — also the document ID
├── title: string                     → Display title for this sector
├── content: string                   → Full rich-text or Markdown body content
├── status: string "published"        → Enum: draft | published | archived
├── updatedAt: timestamp              → Timestamp of last edit
└── updatedBy: string "uid_xxx"       → Firebase Auth UID of the admin who last edited
```

### Collection: `guides`

Stores individual guide documents (sub-articles within sectors).

```
guides/{guideId}
├── id: string "abc123"               → Auto-generated Firestore document ID
├── sectorSlug: string "agriculture"  → Foreign key linking to sectors/{sectorSlug}
├── title: string                     → Guide article title
├── body: string                      → Full guide content in Markdown
├── status: string "draft"            → Enum: draft | published | archived
├── createdAt: timestamp              → When the guide was first created
├── updatedAt: timestamp              → When the guide was last updated
└── authorId: string "uid_xxx"        → Firebase Auth UID of the author
```

### Collection: `admin_users`

Role assignments for CMS administrators. Document ID = Firebase Auth UID.

```
admin_users/{uid}
├── id: string "uid_firebase_abc"     → Firebase Auth UID — also the document ID
├── email: string "admin@domain.com"  → Admin's email address
├── role: string "owner"              → Enum: owner | admin | editor
├── active: boolean true              → false = account suspended; login still allowed but no Firestore write access
├── createdAt: timestamp              → When this admin record was created
└── addedBy: string "uid_owner"       → UID of the owner who created this entry
```

**Role permissions:**

| Operation | `owner` | `admin` | `editor` |
|-----------|---------|---------|---------|
| Read sectors and guides | ✅ | ✅ | ✅ |
| Create and edit content | ✅ | ✅ | ✅ |
| Delete content | ✅ | ❌ | ❌ |
| Add or modify admin users | ✅ | ❌ | ❌ |
| Edit global site settings | ✅ | ❌ | ❌ |
| Upload media | ✅ | ✅ | ✅ |
| Delete media | ✅ | ❌ | ❌ |

### Collection: `settings`

Global site configuration. One document: `settings/global`.

```
settings/global
├── maintenanceMode: boolean false    → When true, shows maintenance banner on all public pages
├── siteTitle: string                 → Overrides the default site title in metadata
└── announcementBanner: string ""     → Non-empty string shows a site-wide announcement strip
```

### Collection: `media`

Records for files stored in Firebase Storage.

```
media/{mediaId}
├── id: string "img_abc123"           → Auto-generated document ID
├── url: string "https://storage..."  → Firebase Storage public download URL
├── filename: string "photo.jpg"      → Original uploaded filename
├── contentType: string "image/jpeg"  → MIME type
├── sizeBytes: number 204800          → File size in bytes
├── uploadedAt: timestamp             → When the file was uploaded
└── uploadedBy: string "uid_xxx"      → Admin UID who uploaded it
```

### Collection: `ai_queries`

Logs AI assistant interactions for monitoring and cost tracking.

```
ai_queries/{queryId}
├── id: string "query_abc"            → Auto-generated document ID
├── query: string                     → The user's question
├── response: string                  → The AI-generated answer
├── tokensUsed: number 1250           → Total Gemini tokens consumed (input + output)
├── model: string "gemini-2.5-pro"    → Exact model version used
├── error: string | null              → Error message if the request failed; otherwise null
└── createdAt: timestamp              → When the query was made
```

### How Collections Relate

```
admin_users ─── (authorId) ──▶ guides
                (updatedBy) ──▶ sectors
                (uploadedBy) ─▶ media

guides ─── (sectorSlug) ──▶ sectors
```

---


## 8 🤖 AI Integration Details

### Model and Framework

| Item | Value |
|------|-------|
| **AI Model** | Google Gemini (gemini-2.5-pro or gemini-2.5-flash) |
| **Orchestration** | Firebase Genkit v1.28 |
| **SDK Package** | `@genkit-ai/google-genai` v1.28.0 |
| **Dev UI** | `http://localhost:4000` (run `npm run genkit:dev`) |
| **API Key Variable** | `GOOGLE_GENAI_API_KEY` |
| **Invocation** | Next.js Server Action → Genkit flow → Gemini API |

### Why Gemini + Genkit Specifically

- **Native Firebase integration** — no extra authentication layer, same Google Cloud project
- **Genkit flow architecture** — provides trace logging, dev UI, retry logic, and testable flows out of the box
- **Generous free tier** — Gemini Flash offers 1 million tokens per day free; the AI assistant runs at zero cost during beta
- **AI Studio simplicity** — a single API key from `aistudio.google.com` grants access with no OAuth complexity

### Prompt Structure

The Tanzania assistant prompts are constructed dynamically in `src/ai/flows/`:

```typescript
// Simplified example of the prompt template
const systemPrompt = `
You are Tanzania Reach AI — an expert assistant specialising in Tanzania's
regulatory environment, investment landscape, and professional relocation.

GROUND RULES:
- Only answer questions related to Tanzania, East Africa, or the user's
  specific professional context in Tanzania
- Always cite specific agencies by their official names:
  TIC (Tanzania Investment Centre), BRELA, TCRA, TMAA, TANAPA, etc.
- Never provide legal or financial advice — recommend consulting a
  licensed professional for binding decisions
- Keep responses concise: under 400 words unless the user requests detail
- Write in plain English, not legalese
- If you do not know the answer, say so clearly rather than hallucinating

CONTEXT:
The user is a professional (investor, expat, executive) researching Tanzania.
They are likely comparing Tanzania with other African markets.
`;

const userPrompt = `USER QUESTION: ${userInput}`;

const finalPrompt = `${systemPrompt}\n\n${userPrompt}`;
```

### Token Usage and Cost Estimates

| Scenario | Avg Tokens / Request | Gemini 2.5 Flash Cost | Gemini 2.5 Pro Cost |
|----------|---------------------|----------------------|---------------------|
| Short Q&A (< 100 words) | ~800 tokens | $0.000075 | $0.00120 |
| Detailed guide request | ~2,500 tokens | $0.000234 | $0.00375 |
| 100 queries per day | ~80,000 tokens | ~$0.0075 / day | ~$0.12 / day |
| 1,000 queries per day | ~800,000 tokens | ~$0.075 / day | ~$1.20 / day |

> **Flash free tier:** 1 million tokens per day — the assistant runs entirely free through beta.
> **Pro free tier:** 250,000 tokens per day — sufficient for moderate early usage.

### Error Handling Flow

```
User submits message
    ↓
Next.js Server Action invoked
    ↓
Genkit flow starts with 10-second AbortController timeout
    ↓ (on success)
Response streamed back to UI → logged to /ai_queries
    ↓ (on timeout or API error)
Fallback message returned: "Our AI assistant is temporarily unavailable.
Please try again in a few moments."
    ↓
Error logged to /ai_queries with error field populated
```

### What Happens When the AI Returns Bad Output

- Responses are displayed as-is — no output filtering is currently applied
- The disclaimer on `/assistant` states that AI responses are for informational purposes only and should not be treated as legal or financial advice
- The admin can review all queries in `/p-access/analytics` via the `ai_queries` collection

### Ideas for Improving AI Quality

1. **RAG (Retrieval-Augmented Generation)** — embed all sector guide content as Firestore vector embeddings; retrieve the most relevant chunks before sending to Gemini so answers are grounded in the site's own authoritative content
2. **Conversation memory** — use Genkit session state to maintain context across a multi-turn conversation
3. **Streaming responses** — stream tokens to the UI as they arrive for dramatically better perceived speed
4. **Response caching** — cache common questions (e.g. "How do I get a work permit?") in Firestore to reduce API calls and latency

---


## 9 🐛 Current Limitations & Known Bugs

### Known Bugs

| Bug | Steps to Reproduce | Severity | Status |
|-----|--------------------|----------|--------|
| **SWC native binary invalid on Windows** | Run `npm run dev` — terminal warns `next-swc-win32-x64-msvc.node is not a valid Win32 application` | Low — app falls back to Babel and still works | Open |
| **World Bank / Wikipedia API timeouts at build** | Run `npx next build` — see `[live-data] economy fetch failed: timeout` in output | Low — ISR serves cached data to users; only affects cold builds | Open |
| **Duplicate Tailwind config file** | `tailwing.config.ts` (misspelled "tailwing") exists alongside the correct `tailwind.config.ts` | Cosmetic — orphaned file confuses future developers | Open |
| **`mounted` state in HomePageClient is a no-op** | `useState(true)` immediately + `useEffect(() => setMounted(true))` — sets a value to itself | Cosmetic tech debt, zero user impact | Open |
| **AI assistant returns no response** | Open `/assistant`, type any question, submit — spinner shows but no reply arrives | High — feature is not functional end-to-end | In progress |

### Performance Bottlenecks

| Bottleneck | Description | Impact | Fix at Scale |
|-----------|-------------|--------|-------------|
| **First Load JS bundle ~485 kB** | Framer Motion, GSAP, Three.js, and tsparticles all load on the homepage simultaneously | Slower TTI on slow 3G connections | Code-split animation libraries per route using `next/dynamic` with `{ ssr: false }` |
| **Live data cold start** | `/api/live-tz` makes 4 parallel external API calls on cache miss — worst case 10 s before response | Users on first uncached load see delay | Pre-warm the cache with a scheduled cron ping |
| **ParticleField canvas on main thread** | The tsparticles canvas animation runs on the main thread | Frame drops on low-end Android devices | Move to a Web Worker or replace with a pure CSS particle alternative |

### Security Issues To Address Before Full Launch

- **`typescript.ignoreBuildErrors: true`** in `next.config.ts` — production builds skip type checking entirely. Enable type-safe builds in CI before public launch.
- **No rate limiting on `/api/live-tz` or `/api/tz-news`** — a malicious client could hammer these endpoints. Add Vercel Edge rate limiting or a Redis-backed rate limiter.
- **Firebase session cookies are not explicitly rotated** — implement server-side session refresh for `/p-access` admin routes on each authenticated request.
- **CSP `unsafe-inline` and `unsafe-eval`** are currently permitted for scripts — tighten these once GSAP and inline script dependencies are better controlled.

### Technical Debt

| Item | Description | Priority |
|------|-------------|---------|
| **Two admin panels** | `/admin` (legacy) and `/p-access` (production) both exist. `/admin` should be deleted entirely. | High |
| **`tailwing.config.ts`** | Misspelled duplicate config file — never referenced, purely confusing. Delete it. | Low |
| **`reactStrictMode: false`** | Disabled in `next.config.ts` to avoid GSAP double-invocation issues. Re-enable with proper GSAP `useEffect` cleanup. | Medium |
| **Mixed styling patterns** | Several components combine Tailwind classes with inline `style={{}}` props inconsistently. | Low |
| **No automated tests** | Zero unit or integration tests currently exist. Add Vitest + Playwright before v1.0. | High |

---


## 10 🔧 Modification & Addon Guide

---

### MOD 1: Add a New Sector Guide Page

- **Difficulty:** ⭐ Easy
- **Time to implement:** 30 minutes
- **Files to modify:** `src/lib/sector-metadata.ts`, `src/lib/tanzania-data.ts`, `src/app/sitemap.ts`, `src/components/home-page-client.tsx`
- **Files to create:** `src/app/[new-sector]/page.tsx`

**Steps:**
1. Open `src/lib/sector-metadata.ts` and add a new entry to `sectorMetaMap` following the existing pattern (slug, title, description, keywords, ogTitle, ogDescription)
2. Open `src/lib/tanzania-data.ts` and add the sector to the `sectors` array
3. Copy an existing sector page (e.g. `src/app/banking/page.tsx`) to `src/app/[new-sector]/page.tsx` and update the content
4. Add the route to the static routes list in `src/app/sitemap.ts`
5. Optionally add the slug to `TOP_SECTORS` in `src/components/home-page-client.tsx` to show it in the homepage sector grid

**Test:** Navigate to `/[new-sector]` — page loads with correct title, description, and content

---

### MOD 2: Switch the AI Model (Gemini → GPT-4o)

- **Difficulty:** ⭐⭐⭐ Medium
- **Time to implement:** 1 day
- **Files to modify:** `src/ai/flows/*.ts`, `.env`, `package.json`, `apphosting.yaml`
- **Dependencies to add:** `npm install openai`

**Steps:**
1. Run `npm install openai`
2. Add `OPENAI_API_KEY=sk-your-key-here` to `.env`
3. Replace Genkit flow invocations with direct OpenAI client calls:

```typescript
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function askTanzaniaAssistant(question: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: question },
    ],
    max_tokens: 600,
  });
  return response.choices[0].message.content ?? 'No response received.';
}
```
4. Add `OPENAI_API_KEY` as a secret in `apphosting.yaml`
5. Update `/ai_queries` logs to record `model: 'gpt-4o'`

---

### MOD 3: Add Public User Accounts

- **Difficulty:** ⭐⭐⭐ Medium
- **Time to implement:** 3–5 days
- **Files to create:** `src/app/login/page.tsx`, `src/app/account/page.tsx`, `src/firebase/auth/user-auth.ts`
- **Files to modify:** `firestore.rules`, `src/middleware.ts`

**Steps:**
1. Enable Google Sign-In and Email/Password in Firebase Console → Authentication → Sign-in Methods
2. Create a `/login` page with Google OAuth and email sign-in form
3. Create a `/account` page showing the user's profile and saved guides
4. Add a `users` Firestore collection for public user profiles:
   - `users/{uid}` — `email`, `displayName`, `photoUrl`, `savedGuides: string[]`, `createdAt`
5. Update `firestore.rules` to allow users to read and write only their own `users/{uid}` document
6. Update `src/middleware.ts` to handle public user session cookies separately from admin session cookies

**Test:** Sign in via Google → profile page loads → save a guide → saved list persists on page refresh

---

### MOD 4: Add Stripe Subscription / Payment

- **Difficulty:** ⭐⭐⭐⭐ Hard
- **Time to implement:** 1–2 weeks
- **Dependencies to add:** `npm install stripe @stripe/stripe-js`
- **New env vars:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- **Files to create:** `src/app/pricing/page.tsx`, `src/app/api/stripe/checkout/route.ts`, `src/app/api/stripe/webhook/route.ts`, `src/lib/stripe.ts`

**Steps:**
1. Create a Stripe account at [stripe.com](https://stripe.com) — free to create
2. Create monthly and annual subscription products in the Stripe Dashboard
3. Build a `/pricing` page with plan comparison table and "Subscribe" buttons
4. Create `POST /api/stripe/checkout` to create a Stripe Checkout session for the selected plan
5. Create `POST /api/stripe/webhook` to handle `customer.subscription.created` and `customer.subscription.deleted` events
6. On successful subscription, write `subscription: { status: 'active', plan: 'pro', expiresAt }` to `users/{uid}` in Firestore
7. Update Firestore security rules to gate premium content behind subscription status check

---

### MOD 5: Add Email Notifications (Resend)

- **Difficulty:** ⭐⭐ Easy-Medium
- **Time to implement:** 2–4 hours
- **Dependencies to add:** `npm install resend`
- **New env vars:** `RESEND_API_KEY`

Sign up for a free Resend account at [resend.com](https://resend.com) — 3,000 emails per month free.

```typescript
// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, name: string) {
  await resend.emails.send({
    from: 'Tanzania Reach <hello@tanzaniareach.com>',
    to,
    subject: 'Welcome to Tanzania Reach',
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>You now have access to Tanzania's most comprehensive investment portal.</p>
      <a href="https://www.tanzaniareach.com/guides">Browse all 18 sector guides →</a>
    `,
  });
}
```

Call `sendWelcomeEmail()` from the user registration Server Action.

---

### MOD 6: Add Analytics (PostHog)

- **Difficulty:** ⭐ Easy
- **Time to implement:** 2 hours
- **Dependencies to add:** `npm install posthog-js`
- **New env var:** `NEXT_PUBLIC_POSTHOG_KEY`

```typescript
// src/app/layout.tsx — add inside the body providers
import posthog from 'posthog-js';
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    capture_pageview: false, // use Next.js router events instead
  });
}
```

PostHog free tier includes 1 million events per month — more than sufficient for a growing portal.

---

### MOD 7: Add Push Notifications (Firebase Cloud Messaging)

- **Difficulty:** ⭐⭐ Easy-Medium
- **Time to implement:** 1 day
- **Files to modify:** `public/manifest.json`, `next.config.ts`
- **New env var:** `NEXT_PUBLIC_FIREBASE_VAPID_KEY`

1. Enable Firebase Cloud Messaging in Firebase Console → Cloud Messaging
2. Get your VAPID key from Firebase Console → Project Settings → Cloud Messaging → Web Push certificates
3. Create a service worker at `public/firebase-messaging-sw.js` to receive background push events
4. Add a "Subscribe to Tanzania alerts" button in the UI that requests notification permission and saves the FCM token to Firestore
5. Send notifications from the admin panel by posting to the FCM REST API with the stored tokens

---


## 11 🚀 Deployment Guide

### Deploy to Firebase App Hosting

```bash
# 1. Build the production bundle locally to verify it compiles
npx next build

# 2. Deploy the app and all rules in one command
firebase deploy

# Or deploy specific targets individually
firebase deploy --only hosting
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
```

---

### Configure Production Secrets

Firebase App Hosting reads secrets from **Firebase Secret Manager**, not from `.env` files.

```bash
# Store each secret
firebase apphosting:secrets:set GOOGLE_GENAI_API_KEY
firebase apphosting:secrets:set FIREBASE_ADMIN_PRIVATE_KEY
firebase apphosting:secrets:set FIREBASE_ADMIN_CLIENT_EMAIL

# Grant App Hosting permission to read each secret
firebase apphosting:secrets:grantaccess GOOGLE_GENAI_API_KEY
firebase apphosting:secrets:grantaccess FIREBASE_ADMIN_PRIVATE_KEY
firebase apphosting:secrets:grantaccess FIREBASE_ADMIN_CLIENT_EMAIL
```

Public environment variables (prefixed `NEXT_PUBLIC_`) are configured directly in `apphosting.yaml`:

```yaml
# apphosting.yaml
env:
  - variable: NEXT_PUBLIC_SITE_URL
    value: https://www.tanzaniareach.com
    availability: [BUILD, RUNTIME]
  - variable: NEXT_PUBLIC_FIREBASE_API_KEY
    value: AIzaSy_YOUR_PUBLIC_KEY
    availability: [BUILD, RUNTIME]
```

---

### Set Up a Custom Domain

1. Firebase Console → Hosting → **Add Custom Domain**
2. Enter `www.tanzaniareach.com`
3. Firebase provides a TXT record — add it to your DNS registrar to verify ownership
4. Firebase provisions an SSL certificate automatically via Let's Encrypt
5. Also add `tanzaniareach.com` (apex domain) and configure a redirect to `www`

---

### Monitor After Deployment

| Tool | Location | What to Check |
|------|----------|--------------|
| Firebase Console | console.firebase.google.com | App Hosting request count, Cloud Run instance count, error rate |
| Cloud Logging | Firebase → App Hosting → Logs | Server-side rendering errors, API timeouts, admin auth failures |
| Firestore Metrics | Firebase → Firestore → Usage | Daily reads / writes vs. free tier limits |
| Vercel Analytics | Pre-integrated via `@vercel/analytics` | Core Web Vitals (LCP, FID, CLS), page views, bounce rate |
| Error boundary logs | `/global-error.tsx` and `/error.tsx` catch and surface runtime errors | Watch for unhandled React errors in production |

---

### Roll Back if Something Breaks

```bash
# List all previous Firebase Hosting releases
firebase hosting:releases:list --limit 10

# Immediately roll back to a specific release
firebase hosting:rollout RELEASE_ID
```

For Next.js code changes, Git is the authoritative rollback mechanism:

```bash
git revert HEAD           # Revert the last commit
git push                  # Push reverted code
firebase deploy --only hosting  # Redeploy the reverted build
```

---


## 12 💰 Cost Calculator

All estimates assume Firebase Blaze pay-as-you-go plan (required for App Hosting). Free-tier limits apply first.

| Service | Free Tier Limit | Pay-As-You-Go Rate | At 100 users/day | At 1,000 users/day |
|---------|----------------|-------------------|-----------------|-------------------|
| **Firebase App Hosting** | 2M requests/month, 360 CPU-hours | $0.40 / 1M requests | ~$0 | ~$0.20/month |
| **Firestore reads** | 50,000 reads/day | $0.06 / 100K reads | ~$0 | ~$0.60/month |
| **Firestore writes** | 20,000 writes/day | $0.18 / 100K writes | ~$0 | ~$0.10/month |
| **Firebase Storage** | 5 GB stored, 1 GB download/day | $0.026 / GB stored, $0.12 / GB download | ~$0 | ~$0.50/month |
| **Firebase Auth** | 50,000 MAU | $0.0055 / MAU above 50K | $0 | $0 |
| **Gemini Flash API** | 1M tokens/day | $0.075 / 1M input tokens | $0 | ~$1/month |
| **Open-Meteo (Weather)** | Unlimited | Free forever | $0 | $0 |
| **fawazahmed0 Currency API** | Unlimited | Free forever | $0 | $0 |
| **World Bank Data API** | Unlimited | Free forever | $0 | $0 |
| **Wikipedia REST API** | Unlimited | Free forever | $0 | $0 |
| **Domain registration (.com)** | N/A | ~$12/year | ~$1/month | ~$1/month |
| **SSL Certificate** | Included via Firebase | Free (Let's Encrypt) | $0 | $0 |
| **TOTAL ESTIMATE** | | | **~$1/month** | **~$3.40/month** |

> **Key insight:** Tanzania Reach is architected to cost nearly nothing through the growth phase. The Firebase Blaze plan's free-tier limits on a low-traffic portal mean the bill is effectively zero until you reach thousands of daily active users. All four live data sources are permanently free with no API keys required.

---


## 13 🗺️ Roadmap

### SHORT TERM — Next 2 Weeks

Priority order, highest first:

1. **Fix SWC binary on Windows** — Run `npm install @next/swc-win32-x64-msvc` to restore the Rust-based compiler and eliminate the build warning. Reduces build times significantly.
2. **Wire AI assistant end-to-end** — Connect the Genkit flows in `src/ai/flows/` to the `/assistant` chat UI so that submitted questions return actual Gemini responses.
3. **Delete legacy `/admin` panel** — The `/p-access` admin is production-ready. Remove the legacy `src/app/admin/` directory entirely to eliminate confusion.
4. **Delete `tailwing.config.ts`** — Remove the misspelled orphan Tailwind config file.
5. **Re-enable TypeScript strict mode** — Remove `ignoreBuildErrors: true` from `next.config.ts`, fix all resulting type errors, and add type checking to the CI pipeline.

### MEDIUM TERM — Next 3 Months

Features needed to make Tanzania Reach a genuinely complete product:

- [ ] Public user accounts — Google Sign-In, saved guides, reading history, personalised sector recommendations
- [ ] Full CMS workflow — rich text editor in `/p-access/content` with media embedding, draft previews, and publish scheduling
- [ ] Email newsletter — weekly Tanzania Business Briefing via Resend; subscriber capture form on homepage
- [ ] Tanzania Company Directory — searchable Firestore database of licensed businesses, law firms, government agencies, and embassies
- [ ] Interactive Regulatory Timeline — visual step-by-step process builder for common tasks (e.g. company registration, work permit application)
- [ ] Swahili language toggle — full bilingual support for the domestic professional market
- [ ] Automated tests — Vitest unit tests for utility functions; Playwright E2E tests for critical user journeys

### LONG TERM — 6–12 Months

If everything goes well, Tanzania Reach becomes the **Bloomberg Terminal for Sub-Saharan African market entry**:

**Version 2.0 vision:**
- AI-generated on-demand due diligence reports tailored to a specific investment thesis (e.g. "What do I need to set up a solar energy company in Dodoma?")
- Corporate API subscriptions — law firms, consulting groups, and investment banks pay for programmatic access to regulatory data
- Verified business directory with real agency contacts, licence status, and response time ratings
- Mobile app (Expo / React Native) for offline access to sector guides in low-connectivity regions
- Real-time regulatory change alerts via Firebase Cloud Messaging — subscribers notified when laws, fees, or procedures change
- Peer network — verified Tanzania-based professionals (lawyers, accountants, fixers) available for on-platform introductions
- Coverage expansion — Rwanda, Kenya, and Ethiopia added as additional country portals under the same infrastructure

---


## 14 📚 Lessons Learned

### What Worked Better Than Expected

**Next.js ISR for live data caching.** The 30-minute revalidation window means that even when an upstream API (World Bank, Wikipedia) goes down, users never see an error — they see the last good cached data. This made the "live data" feature reliable enough to ship without a database layer for that data.

**Firebase App Hosting.** Zero-configuration deployment with automatic SSL, custom domain management, and Cloud Run auto-scaling made the infrastructure genuinely invisible. Deploying a new version is a single `firebase deploy` command.

**Tailwind CSS design tokens.** Defining the entire design system in `tailwind.config.ts` (custom colours, type scale, animations) kept 43 pages visually consistent without a single CSS module or styled-component.

**GSAP ScrollTrigger.** Produces dramatically more precise scroll-reveal animations than Framer Motion's `useInView`. The scrub functionality, timeline control, and performance headroom are significant advantages for a content-heavy editorial site.

### What Was Harder Than Expected

**Windows SWC binary issues.** Next.js's native Rust compiler fails on certain Windows configurations without warning. This caused hours of debugging before discovering it was a binary-level OS compatibility issue, not a code problem. Always test on the exact target OS before finalising build instructions.

**Next.js 15 App Router caching model.** The mental model for `fetch()` with `next.revalidate`, ISR, dynamic segments, and Server vs. Client Components required significant unlearning from the Pages Router. The documentation is thorough but the mental model shift is genuinely large.

**Framer Motion + GSAP coexistence.** Running both animation libraries simultaneously created subtle memory leak risks from improperly cleaned-up ScrollTrigger instances. Proper `useEffect` cleanup functions with `gsap.context().revert()` are mandatory.

**Firebase Admin SDK in Cloud Run.** Getting the service account private key to work inside a Firebase App Hosting container required Secret Manager — the `.env` pattern that works locally does not work in production Cloud Run without additional configuration.

### What I Would Do Differently Starting Over

1. **Monorepo structure** — separate admin, public portal, and AI service into distinct packages from day one. The `/admin` vs `/p-access` duplication was entirely avoidable.
2. **Design the Firestore schema before writing any UI** — building the collections and security rules upfront would have prevented two major schema refactors mid-build.
3. **Turbopack from day one** — Next.js 15 Turbopack is stable enough for production. The Webpack → Turbopack migration tax is not worth paying.
4. **One animation library** — choose GSAP or Framer Motion, never both. Running both adds ~180 kB to the JavaScript bundle and creates coexistence complexity with no user-visible benefit.
5. **Delete legacy code immediately** — the moment `/p-access` was confirmed working, `/admin` should have been deleted. Stale code in a codebase is cognitive debt that accrues interest on every future session.

### Universal Lessons That Apply to All Future Projects

- **ISR is underrated.** For content-heavy public sites, ISR with aggressive cache windows and on-demand revalidation beats both full SSR and full SSG in the real world — combining the performance of static with the flexibility of server rendering.
- **Role-based security rules pay for themselves.** Writing thorough Firestore security rules upfront takes an hour. Recovering from a production data breach or accidental deletion takes days.
- **Bundle weight compounds.** Every premium dependency (GSAP, Framer Motion, tsparticles, Three.js) that loads simultaneously is weight that every visitor carries. Make dependency choices with the final bundle weight in mind, not just the feature the library unlocks.
- **Middleware is underused.** Next.js Edge Middleware is an elegant place to handle bot blocking, auth guards, A/B testing, and geo-routing — all before a single server-side render begins.

---


## 15 ⚡ Quick Reference Card

> Everything needed to run, operate, and fix Tanzania Reach — on one page.

### Start the Dev Server

```bash
npm run dev
# → Opens at http://localhost:9002
```

### Build for Production

```bash
npx next build
```

### Deploy to Firebase

```bash
firebase deploy
```

### Run the AI Dev Server (Genkit UI at http://localhost:4000)

```bash
npm run genkit:dev
```

---

### Most Important Local URLs

| URL | Purpose |
|-----|---------|
| `http://localhost:9002/` | Homepage |
| `http://localhost:9002/guides` | All 18 sector guides |
| `http://localhost:9002/api/live-tz` | Live Tanzania data (JSON) |
| `http://localhost:9002/api/tz-news` | Live news feed (JSON) |
| `http://localhost:9002/p-access/login` | Admin login |
| `http://localhost:9002/p-access/dashboard` | Admin dashboard |
| `http://localhost:9002/assistant` | AI assistant |
| `http://localhost:4000` | Genkit AI developer UI |

---

### Required Environment Variables

```bash
# Public (safe in browser)
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Private (server only — NEVER expose)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=

# AI
GOOGLE_GENAI_API_KEY=
```

---

### Common Fix Commands

```bash
# Fix most runtime errors — clear the Next.js build cache
Remove-Item -Recurse -Force .next

# Full dependency reinstall
Remove-Item -Recurse -Force node_modules
npm install

# Fix Windows SWC compiler warning
npm install @next/swc-win32-x64-msvc

# Kill port 9002 if already in use
npx kill-port 9002

# Check TypeScript errors without building
npm run typecheck

# Lint the codebase
npm run lint
```

---

### Important File Locations

| File | Role |
|------|------|
| `src/app/page.tsx` | Homepage entry point |
| `src/components/home-page-client.tsx` | All landing page sections |
| `src/components/hero-section.tsx` | Hero banner component |
| `src/lib/live-data.ts` | All external API calls (weather, currency, economy, wiki) |
| `src/lib/sector-metadata.ts` | SEO metadata for all 18 sector pages |
| `src/middleware.ts` | Bot blocking + admin auth guard |
| `firestore.rules` | Firestore role-based security rules |
| `next.config.ts` | Next.js configuration (headers, images, ISR) |
| `tailwind.config.ts` | Design system tokens (colours, animations, fonts) |
| `.env` | Local environment variables |
| `apphosting.yaml` | Firebase App Hosting production config |

---

<div align="center">

**Tanzania Reach** · Built for professionals navigating East Africa's most dynamic economy

`v0.1.0` · 🟡 Beta · Next.js 15 · Firebase · Gemini AI

*Last updated: July 2026*

</div>

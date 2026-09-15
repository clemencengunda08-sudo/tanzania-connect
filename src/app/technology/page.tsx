import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, Smartphone, ShieldCheck, Terminal, Server, ArrowLeft, 
  Info, CheckCircle2, Building2, Zap, Globe, Lock, ArrowUpRight,
  TrendingUp, MapPin
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";
import { JsonLd } from "@/components/json-ld";
import { MarqueeStrip } from "@/components/premium/marquee-strip";
import { RegulatorStrip } from "@/components/premium/regulator-strip";
import { SectorTypewriter } from "@/components/premium/sector-typewriter";
import {
  sectorArticleSchema,
  breadcrumbSchema,
  faqSchema,
  sectorFaqs,
} from "@/lib/schema";

const SLUG = "technology";
const meta = getSectorMeta(SLUG)!;
const FEATURED_IMAGE = "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202048/tanzania_connect/static/tanzania-tech-hub.png";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/technology",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/technology",
    siteName: "Tanzania Reach",
    title: meta.ogTitle,
    description: meta.ogDescription,
    locale: "en_US",
    images: [
      {
        url: FEATURED_IMAGE,
        width: 1200,
        height: 630,
        alt: "Tanzania Technology & Startups Ecosystem",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tanzaniareach",
    title: meta.ogTitle,
    description: meta.ogDescription,
    images: [FEATURED_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const TECH_PILLARS = [
  {
    name: "Fintech & Open APIs",
    icon: Smartphone,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    desc: "Mobile money penetration is above 98% with $5.8B+ in monthly transfers. Bank of Tanzania governs PSP Class 1, 2, and 3 licenses with open API integrations for M-Pesa, Airtel Money, and Mixx by Yas.",
    stat: "$5.8B+/mo",
    statLabel: "Mobile Volume",
  },
  {
    name: "Silicon Zanzibar SEZ",
    icon: Terminal,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    desc: "Official tech free-zone in Fumba Town offering 0% corporate tax for 5 years, 10% flat expat tax, and streamlined Class B tech residence permits issued in under 14 days.",
    stat: "0% Tax",
    statLabel: "5-Year Holiday",
  },
  {
    name: "Broadband & Subsea Fiber",
    icon: Server,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    desc: "Connected to 5 international undersea cables (2Africa, SEACOM, EASSy, DARE1, PEACE) and 8,300+ km of National ICT Broadband Backbone (NICTBB) powering 8 landlocked neighboring states.",
    stat: "8,300+ km",
    statLabel: "Fiber Backbone",
  },
];

const LICENSING_TIERS = [
  {
    regulator: "TCRA",
    name: "Applications Services (AS) License",
    scope: "Web apps, SaaS platforms, cloud software, e-commerce, digital marketplaces",
    cost: "$500 App fee · $4,000 Initial license fee (valid for 3 years)",
    compliance: "Local company registration (BRELA), tax clearance (TRA), terms of service, and PDPC registration",
  },
  {
    regulator: "Bank of Tanzania",
    name: "Payment Service Provider (PSP) License",
    scope: "Digital wallets, payment gateways, cross-border remittance, aggregator APIs",
    cost: "Class 1: TZS 2B capital · Class 2: TZS 1B capital · Class 3: TZS 500M capital",
    compliance: "Audited financial track record, ISO 27001 / PCI-DSS compliance, escrow reserves at BoT",
  },
  {
    regulator: "PDPC",
    name: "Data Controller / Processor Registration",
    scope: "Any business collecting personal information of Tanzanian citizens or residents",
    cost: "Statutory registration tiers under the Personal Data Protection Act (2022)",
    compliance: "Designated Data Protection Officer (DPO), privacy impact assessments, cross-border transfer approval",
  },
];

const TECH_HUBS = [
  {
    name: "Buni Hub",
    location: "Sayansi, Kijitonyama, Dar es Salaam",
    focus: "Public sector innovation, maker space, IoT prototyping & early-stage student founders",
    affiliation: "COSTECH (Commission for Science & Technology)",
  },
  {
    name: "Sahara Accelerator",
    location: "Oysterbay, Dar es Salaam",
    focus: "Venture building, corporate innovation partnerships, angel investor syndicate",
    affiliation: "Sahara Ventures Group",
  },
  {
    name: "Silicon Zanzibar HQ",
    location: "Fumba Town, Unguja, Zanzibar",
    focus: "Relocation hub for global scaleups, remote engineering teams, and frontier tech",
    affiliation: "ZIPA (Zanzibar Investment Promotion Authority)",
  },
  {
    name: "Seedspace Dar es Salaam",
    location: "Victoria, New Bagamoyo Rd, Dar es Salaam",
    focus: "International co-working, high-speed fiber, networking with global VC funds",
    affiliation: "Seedstars Network",
  },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50 pb-24 md:pb-16">
      <JsonLd
        data={sectorArticleSchema({
          slug: SLUG,
          title: meta.title,
          description: meta.description,
          image: FEATURED_IMAGE,
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Guides", url: "/guides" }, { name: meta.title, url: `/guides/${SLUG}` }])} />

      <main className="pt-28 md:pt-36 p-6 md:p-12 max-w-5xl mx-auto space-y-12">
        {/* Navigation Marquee */}
        <MarqueeStrip
          caption="Tech Ecosystem Live"
          items={[
            { label: 'TCRA', value: "App Services License" },
            { label: 'COSTECH', value: "Research Permit" },
            { label: 'Silicon Zanzibar', value: "0% Tax Zone" },
            { label: 'NICTBB', value: "8,300km Fiber" },
            { label: 'BoT PSP', value: "Fintech Open API" },
            { label: '2Africa', value: "Subsea Landing" },
            { label: 'PDPC', value: "Data Protection" },
          ]}
          speed={2}
        />

        {/* High-Performance Executive Hero (Zero 3D lag) */}
        <div className="relative h-[440px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-kilimanjaro-900/10 dark:border-white/10 z-10">
          {/* High-Resolution Real Backdrop */}
          <div className="absolute inset-0 -z-20 bg-kilimanjaro-950">
            <Image
              src={FEATURED_IMAGE}
              alt="Dar es Salaam Technology and Innovation Hub"
              fill
              priority
              className="object-cover opacity-35 dark:opacity-25 select-none pointer-events-none"
            />
          </div>
          
          {/* Executive Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-kilimanjaro-950 via-kilimanjaro-950/70 to-transparent z-10 pointer-events-none" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-12 z-20 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-tanzania-500 text-white font-black uppercase tracking-wider text-[10px] px-3 py-1">
                Tech & Innovation
              </Badge>
              <span className="text-[10px] font-bold uppercase tracking-widest text-tanzania-300 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                2026 Executive Briefing
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]">
              Technology & <span className="gradient-tanzania-text">Startups</span>
            </h1>

            <div className="flex items-center gap-3 text-white/90 text-base md:text-xl font-display">
              <span className="font-semibold tracking-wide">Ecosystem driver:</span>
              <SectorTypewriter
                sector="technology"
                className="text-xl md:text-2xl text-tanzania-300 font-bold"
                textClassName="text-tanzania-300"
                caretClassName="bg-tanzania-300"
              />
            </div>

            {/* Live Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 max-w-3xl">
              <div>
                <div className="text-lg md:text-xl font-black text-white">65M+</div>
                <div className="text-[10px] uppercase tracking-wider text-tanzania-200/70 font-semibold">Active SIMs</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-black text-emerald-400">5 Cables</div>
                <div className="text-[10px] uppercase tracking-wider text-tanzania-200/70 font-semibold">Subsea Fiber</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-black text-amber-400">$5.8B+</div>
                <div className="text-[10px] uppercase tracking-wider text-tanzania-200/70 font-semibold">Mo. Mobile Money</div>
              </div>
              <div>
                <div className="text-lg md:text-xl font-black text-tanzania-400">0% Duty</div>
                <div className="text-[10px] uppercase tracking-wider text-tanzania-200/70 font-semibold">TIC IT Equipment</div>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-tanzania-600 dark:text-tanzania-400 hover:text-tanzania-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to all guides
        </Link>

        {/* Executive Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-kilimanjaro-950 dark:text-white">
            Tanzania's Digital Economy Blueprint
          </h2>
          <p className="text-base md:text-lg text-kilimanjaro-700 dark:text-tanzania-200/80 leading-relaxed max-w-4xl font-normal">
            Tanzania is emerging as the digital transit hub for East and Central Africa. With 98% mobile subscription density, ubiquitous interoperable mobile money (M-Pesa, Airtel Money, Mixx by Yas), and landing points for major intercontinental subsea cables, tech enterprises and venture-backed startups are establishing permanent regional footprints across Dar es Salaam and Zanzibar.
          </p>
        </section>

        {/* 3 Core Tech Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_PILLARS.map((sec) => (
            <Card key={sec.name} className="border border-kilimanjaro-900/10 dark:border-white/10 shadow-lg rounded-3xl bg-white dark:bg-kilimanjaro-900/40 p-6 flex flex-col justify-between hover:border-tanzania-500/40 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl border ${sec.color}`}>
                    <sec.icon className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-tanzania-600 dark:text-tanzania-400">{sec.stat}</span>
                    <p className="text-[9px] uppercase tracking-wider text-kilimanjaro-400">{sec.statLabel}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-kilimanjaro-900 dark:text-white">{sec.name}</h3>
                <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-300/80 leading-relaxed">{sec.desc}</p>
              </div>
            </Card>
          ))}
        </section>

        {/* Regulatory & Licensing Roadmaps (Actionable Real Info) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-tanzania-500" />
            <h2 className="text-2xl font-bold tracking-tight text-kilimanjaro-950 dark:text-white">
              Essential Tech Licensing & Statutory Framework
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {LICENSING_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-kilimanjaro-900/10 dark:border-white/10 bg-white dark:bg-kilimanjaro-900/30 p-6 space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 text-[10px] font-black uppercase tracking-wider border border-tanzania-500/20">
                      {tier.regulator}
                    </span>
                    <h3 className="text-base font-bold text-kilimanjaro-900 dark:text-white">{tier.name}</h3>
                  </div>
                  <span className="text-xs font-medium text-kilimanjaro-500 dark:text-tanzania-300/70">
                    {tier.cost}
                  </span>
                </div>
                <p className="text-xs text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed font-medium">
                  <strong className="text-kilimanjaro-900 dark:text-white">Scope: </strong>{tier.scope}
                </p>
                <p className="text-[11px] text-kilimanjaro-500 dark:text-tanzania-400 leading-relaxed">
                  <strong>Requirements: </strong>{tier.compliance}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Startup Hubs & Innovation Ecosystem */}
        <section className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-tanzania-500" />
              <h2 className="text-2xl font-bold tracking-tight text-kilimanjaro-950 dark:text-white">
                Incubation Centers & Co-Working Hubs
              </h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-tanzania-500">
              Dar es Salaam · Zanzibar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECH_HUBS.map((hub) => (
              <div
                key={hub.name}
                className="rounded-2xl border border-kilimanjaro-900/10 dark:border-white/10 bg-white dark:bg-kilimanjaro-900/30 p-5 space-y-2 hover:border-tanzania-500/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-kilimanjaro-900 dark:text-white">{hub.name}</h4>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-tanzania-600 dark:text-tanzania-400 bg-tanzania-500/10 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-kilimanjaro-500 dark:text-tanzania-400">
                  <MapPin className="w-3 h-3 text-tanzania-500 shrink-0" />
                  <span>{hub.location}</span>
                </div>
                <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-300 leading-relaxed">
                  {hub.focus}
                </p>
                <div className="text-[10px] text-kilimanjaro-400 dark:text-tanzania-400/60 font-semibold pt-1">
                  Affiliation: {hub.affiliation}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Investor Incentives Bento */}
        <div className="rounded-3xl bg-gradient-to-br from-kilimanjaro-900 to-kilimanjaro-950 border border-white/10 p-8 text-white space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold">TIC & Silicon Zanzibar Strategic Incentives</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-white/80">
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">Capital Equipment Duty</h4>
              <p className="leading-relaxed">
                Registered TIC tech enterprises receive 100% import duty exemption on computer servers, data storage racks, telecommunication hardware, and testing apparatus.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">Talent & Work Visas</h4>
              <p className="leading-relaxed">
                Silicon Zanzibar fast-tracks Class B expert work permits for international software architects, CTOs, and AI engineers with no minimum Tanzanian equity quota.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">Foreign Exchange Freedoms</h4>
              <p className="leading-relaxed">
                Tech export companies registered with EPZA or TIC can hold offshore and local USD accounts to receive international SaaS subscriptions without forced currency conversion.
              </p>
            </div>
          </div>
        </div>

        {/* Regulator Compliance Strip */}
        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'TCRA', full: 'Tanzania Communications Regulatory Authority', url: 'https://www.tcra.go.tz', scope: 'Telecom, internet & digital media licensing' },
            { short: 'COSTECH', full: 'Tanzania Commission for Science & Technology', url: 'https://www.costech.or.tz', scope: 'Research authorization & tech hub coordination', accent: 'serengeti' },
            { short: 'BoT', full: 'Bank of Tanzania', url: 'https://www.bot.go.tz', scope: 'National payment systems & fintech regulation' },
            { short: 'ZIPA', full: 'Zanzibar Investment Promotion Authority', url: 'https://www.zipa.go.tz', scope: 'Silicon Zanzibar incentives & business permits', accent: 'zanzibar' },
            { short: 'PDPC', full: 'Personal Data Protection Commission', url: 'https://www.pdpc.go.tz', scope: 'Data privacy & compliance registration' },
          ]}
        />
      </main>
    </div>
  );
}

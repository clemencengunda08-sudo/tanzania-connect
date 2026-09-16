'use client';
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { sectorMetaMap, getAllSectorSlugs } from "@/lib/sector-metadata";
import { tanzaniaStats, sectors, getSectorUrl } from "@/lib/tanzania-data";
import { SpotlightCard } from "@/components/premium/spotlight-card";
import { Marquee } from "@/components/premium/marquee";
import { BlurText } from "@/components/premium/blur-text";
import { Stats as StatsBlock } from "@/components/premium/stats";
import { MagnetButton } from "@/components/premium/magnet-button";
import { RevealOnScroll } from "@/components/premium/reveal-on-scroll";
import { ScrollReveal } from "@/components/premium/scroll-reveal";

// Defer heavy below-the-fold GSAP & canvas components to keep initial bundle lean
const CurvedLoop = dynamic(() => import("@/components/premium/curved-loop"), { ssr: false });
const SmokyText = dynamic(() => import("@/components/premium/smoky-text"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/premium/particle-field").then((m) => m.ParticleField), { ssr: false });
const MagneticSpotlightMarquee = dynamic(() => import("@/components/premium/magnetic-spotlight-marquee").then((m) => m.MagneticSpotlightMarquee), { ssr: false });
const ScrollExpandSection = dynamic(() => import("@/components/premium/scroll-expand-section").then((m) => m.ScrollExpandSection), { ssr: false });
const ScrollSyncedText = dynamic(() => import("@/components/premium/scroll-synced-text").then((m) => m.ScrollSyncedText), { ssr: false });
const VerticalColumnsSlider = dynamic(() => import("@/components/premium/vertical-columns-slider").then((m) => m.VerticalColumnsSlider), { ssr: false });
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Compass,
  Shield,
  Globe2,
  Briefcase,
  GraduationCap,
  Hospital,
  Banknote,
  Wifi,
  Zap,
  Sprout,
  Mountain,
  Building2,
  Landmark,
  Car,
  Utensils,
  Music4,
  Map,
  Languages,
  Phone,
  BookOpen,
  Trees,
  CheckCircle2,
  MoveRight,
  Star,
  ChevronRight,
} from "lucide-react";

import { HeroSection } from "@/components/hero-section";

// ===== Sector feature list (top 9) =====
const TOP_SECTORS = [
  "agriculture",
  "mining",
  "tourism",
  "immigration",
  "real-estate",
  "legal",
  "banking",
  "healthcare",
  "energy",
  "technology",
  "education",
  "wildlife",
  "culture",
  "transport",
  "food-and-drink",
  "entertainment",
  "phrasebook",
  "directory",
];

// Map sector slugs → icons (Lucide)
const sectorIconMap: Record<string, typeof Sprout> = {
  agriculture: Sprout,
  mining: Mountain,
  tourism: Compass,
  immigration: Globe2,
  "real-estate": Building2,
  legal: Landmark,
  banking: Banknote,
  healthcare: Hospital,
  energy: Zap,
  technology: Wifi,
  education: GraduationCap,
  wildlife: Trees,
  culture: Music4,
  transport: Car,
  "food-and-drink": Utensils,
  entertainment: Music4,
  phrasebook: Languages,
  directory: Phone,
};

// 3 sector pillars (signature)
const PILLARS = [
  {
    icon: Compass,
    title: "Research-grade intelligence",
    desc: "Curated research on Tanzania's 18 priority sectors. Every guide is written by domain experts and refreshed quarterly.",
  },
  {
    icon: Shield,
    title: "Compliance-first",
    desc: "We never replace a licensed attorney or accountant. We organize the complexity so your professional becomes 10x faster.",
  },
  {
    icon: Sparkles,
    title: "Structured for decisions",
    desc: "Information architecture designed for high-stakes decisions. Named agencies, real fees, actual timelines.",
  },
];


const INSTITUTIONS = [
  "Tanzania Investment Centre",
  "BRELA",
  "TCRA",
  "Bank of Tanzania",
  "TANESCO",
  "TATO",
  "TAWA",
  "EWURA",
];

export function HomePageClient() {
  const [mounted, setMounted] = useState(true);
  useEffect(() => setMounted(true), []);

  // Note: keep `mounted` as a no-op for downstream consumers; render content
  // unconditionally on both server and client to avoid an empty home page
  // when client-side hydration is delayed or blocked.

  const marqueeImages = [...PlaceHolderImages, ...PlaceHolderImages];
  const spotlightImages = PlaceHolderImages.map((img) => img.imageUrl);
  const allSectorItems = TOP_SECTORS.map((s) => ({
    label: sectorMetaMap[s]?.title?.split(" — ")[0] ?? s,
  }));

  return (
    <>
      <main className="overflow-x-hidden bg-tanzania-50 dark:bg-kilimanjaro-950">
        <HeroSection />

        {/* ============== MARQUEE — SECTORS ============== */}
        <section className="relative py-4 border-y border-kilimanjaro-900/10 dark:border-tanzania-50/10 overflow-hidden bg-tanzania-100/40 dark:bg-kilimanjaro-900/40">
          <CurvedLoop
            text="Agriculture ✦ Mining ✦ Tourism ✦ Immigration ✦ Real Estate ✦ Banking ✦ Energy ✦ Healthcare ✦ Technology ✦ Wildlife ✦ "
            font={{
              fontFamily: "var(--font-inter)",
              fontWeight: 900,
              fontSize: 32,
              letterSpacing: "2px"
            }}
            color="currentColor"
            curveAmount={0}
            gap={6}
            baseVelocity={18}
            className="text-kilimanjaro-950 dark:text-tanzania-100 uppercase"
          />
        </section>

        {/* ============== INTRO STATEMENT & INLINE STATS ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 pt-6 pb-8 md:pt-8 md:pb-12 max-w-[1600px] mx-auto">
          <div className="max-w-4xl text-kilimanjaro-950 dark:text-tanzania-50">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-headline font-black tracking-tight text-kilimanjaro-950 dark:text-white leading-[1.12]">
              Tanzania is vast, intricate, and quietly one of Africa's most{" "}
              <span className="bg-gradient-to-r from-tanzania-500 via-tanzania-400 to-zanzibar-400 bg-clip-text text-transparent italic">
                rewarding frontiers.
              </span>
            </h2>
          </div>
          <RevealOnScroll delay={0.4}>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed mb-6">
              We curate licensing requirements, regulations, agency contacts, and timelines so that
              investors, executives, and explorers spend their first 90 days building, not searching.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.6}>
            <div className="border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10 pt-6">
              <StatsBlock
                stats={[
                  { value: 31, label: "Regions administered", suffix: "" },
                  { value: 26, label: "National parks", suffix: "" },
                  { value: 65, label: "Million residents", suffix: "M+" },
                  { value: 18, label: "Sector guides curated", suffix: "" },
                ]}
                indexLabel={false}
              />
            </div>
          </RevealOnScroll>
        </section>

        {/* ============== PILLARS ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-10 md:py-16 max-w-[1600px] mx-auto">
          <ScrollReveal variant="slide-left" duration={0.8} distance={40}>
            <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-8 max-w-2xl">
              Three commitments to every professional who lands here.
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10 pt-8">
            {PILLARS.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 0.1}>
                <div className="flex flex-col h-full">
                  <div className="w-9 h-9 rounded-xl bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 flex items-center justify-center mb-4">
                    <p.icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-display text-lg font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-2">
                    {p.title}
                  </h4>
                  <p className="text-xs md:text-sm text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <ScrollExpandSection />

        {/* ============== STREAMLINED FEATURED SECTORS HUB ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-10 md:py-16 max-w-[1600px] mx-auto">
          <ScrollReveal variant="fade-up" distance={20}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
              <RevealOnScroll>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tanzania-500/10 border border-tanzania-500/20 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-tanzania-500" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-tanzania-600 dark:text-tanzania-400">
                    Curated Intelligence
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-4xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50">
                  Priority Sectors & <span className="italic text-tanzania-500">Expert</span> Guides.
                </h3>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15}>
                <Link
                  href="/guides"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kilimanjaro-900 dark:bg-tanzania-100 text-tanzania-50 dark:text-kilimanjaro-950 font-medium text-xs sm:text-sm hover:scale-105 transition-all shadow-md shrink-0"
                >
                  Browse all 18 Sector Manuals <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </RevealOnScroll>
            </div>

            {/* Quick Sector Filter Chips Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar scroll-smooth">
              {[
                { label: "Agriculture", slug: "agriculture", icon: Sprout },
                { label: "Mining & Minerals", slug: "mining", icon: Mountain },
                { label: "Visa & Immigration", slug: "immigration", icon: Globe2 },
                { label: "Tourism & Hotels", slug: "tourism", icon: Compass },
                { label: "Real Estate", slug: "real-estate", icon: Building2 },
                { label: "Banking & Forex", slug: "banking", icon: Banknote },
                { label: "Energy & Utilities", slug: "energy", icon: Zap },
                { label: "Legal Framework", slug: "legal", icon: Landmark },
                { label: "Technology & ICT", slug: "technology", icon: Wifi },
              ].map((chip) => {
                const ChipIcon = chip.icon;
                return (
                  <Link
                    key={chip.slug}
                    href={getSectorUrl(chip.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-kilimanjaro-900/10 dark:border-tanzania-50/10 bg-tanzania-50/60 dark:bg-kilimanjaro-900/60 text-xs font-medium text-kilimanjaro-800 dark:text-tanzania-200 hover:border-tanzania-500/50 hover:bg-tanzania-500/10 hover:text-tanzania-600 dark:hover:text-tanzania-400 transition-all whitespace-nowrap shrink-0"
                  >
                    <ChipIcon className="w-3 h-3 text-tanzania-500" />
                    <span>{chip.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/guides"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-tanzania-500/15 border border-tanzania-500/30 text-xs font-semibold text-tanzania-600 dark:text-tanzania-400 hover:bg-tanzania-500/25 transition-all whitespace-nowrap shrink-0"
              >
                <span>+9 More</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Compact 4-Card Spotlight Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { slug: "agriculture", tag: "Agribusiness & Land" },
                { slug: "mining", tag: "Gold, Lithium & TMAA" },
                { slug: "immigration", tag: "Work Permits & Visas" },
                { slug: "tourism", tag: "Safaris & Hospitality" },
              ].map(({ slug, tag }, i) => {
                const meta = sectorMetaMap[slug];
                if (!meta) return null;
                const Icon = sectorIconMap[slug] ?? Compass;
                return (
                  <ScrollReveal key={slug} variant="fade-up" delay={i * 0.06} distance={15}>
                    <SpotlightCard
                      href={getSectorUrl(slug)}
                      ariaLabel={meta.title.split(" — ")[0]}
                      className="group h-full p-5 bg-card border-kilimanjaro-900/10 dark:border-tanzania-50/10 rounded-2xl hover:border-tanzania-500/40 transition-all"
                      glowColor="200, 149, 25"
                    >
                      <div className="flex flex-col h-full justify-between min-h-[150px]">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div className="w-9 h-9 rounded-xl bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            <span className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 border border-tanzania-500/20">
                              {tag}
                            </span>
                          </div>
                          <h4 className="font-display text-lg font-semibold tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-1.5 group-hover:text-tanzania-500 transition-colors">
                            {meta.title.split(" — ")[0]}
                          </h4>
                          <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed line-clamp-2">
                            {meta.ogDescription}
                          </p>
                        </div>
                        <div className="mt-4 pt-2.5 border-t border-kilimanjaro-900/5 dark:border-tanzania-50/5 flex items-center justify-between">
                          <span className="text-xs font-medium text-tanzania-600 dark:text-tanzania-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
                            View Guide <ArrowRight className="w-3 h-3" />
                          </span>
                          <span className="font-mono text-[10px] text-kilimanjaro-400 dark:text-tanzania-400">
                            0{i + 1}
                          </span>
                        </div>
                      </div>
                    </SpotlightCard>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Premium Photo Marquee Wake Showcase */}
          <div className="mt-8">
            <MagneticSpotlightMarquee images={spotlightImages} />
          </div>
        </section>

        {/* ============== SCROLL SYNCED ANIMATED TEXT ============== */}
        <ScrollSyncedText />

        {/* ============== VERTICAL DUAL COLUMNS PARALLAX SLIDER ============== */}
        <VerticalColumnsSlider />

        {/* ============== DARK BAND — ABOUT ============== */}
        <section className="relative my-10 overflow-hidden">
          <div className="absolute inset-0 bg-kilimanjaro-950" />
          <div className="absolute inset-0 opacity-15">
            <ParticleField count={30} color="212, 175, 55" />
          </div>
          <div className="relative px-6 md:px-12 lg:px-24 py-16 md:py-24 max-w-[1600px] mx-auto text-tanzania-50">
            <BlurText
              as="h2"
              text="An independent intelligence hub, built so the country can speak for itself."
              className="font-display text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.1] tracking-tightest max-w-3xl"
              step={0.025}
              delay={0.15}
              by="word"
            />
            <RevealOnScroll delay={0.4}>
              <div className="mt-8 flex flex-col md:flex-row items-start gap-6">
                <p className="text-tanzania-200 text-base leading-relaxed max-w-2xl">
                  We are not the government. We are not a law firm. We are a private editorial team
                  that organizes 30 ministries, 90+ regulators, and 18 priority sectors into a single,
                  navigable surface.
                </p>
                <MagnetButton
                  href="/about"
                  variant="tanzania"
                  className="shrink-0"
                >
                  About us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </MagnetButton>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ============== INSTITUTIONS — scrolling marquee strip ============== */}
        <section className="relative border-y border-kilimanjaro-900/10 dark:border-tanzania-50/10 bg-tanzania-100/30 dark:bg-kilimanjaro-900/30 overflow-hidden py-2">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pt-3">
            <p className="text-center text-[11px] font-medium text-kilimanjaro-400 dark:text-tanzania-400/70 uppercase tracking-widest">
              Indexing the institutions that move Tanzania
            </p>
          </div>
          <CurvedLoop
            text="Tanzania Investment Centre ✦ BRELA ✦ TCRA ✦ Bank of Tanzania ✦ TANESCO ✦ TATO ✦ TAWA ✦ EWURA ✦ TRA ✦ TMDA ✦ NIDA ✦ DSE ✦ TIRA ✦ CMSA ✦ TPF ✦ Immigration ✦ "
            font={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 32,
              letterSpacing: "2px",
            }}
            color="currentColor"
            curveAmount={0}
            gap={6}
            baseVelocity={12}
            className="text-kilimanjaro-800 dark:text-tanzania-200"
          />
        </section>

        {/* ============== CTA ============== */}
        {/* ============== FURSA ZA UWEKEZAJI (OPPORTUNITIES) & CTA ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-12 md:py-20 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <div className="rounded-3xl border border-kilimanjaro-900/10 dark:border-tanzania-50/10 bg-gradient-to-b from-white via-tanzania-50/40 to-white dark:from-kilimanjaro-900/60 dark:via-kilimanjaro-900/40 dark:to-kilimanjaro-950 p-8 md:p-14 shadow-2xl overflow-hidden relative">
              {/* Subtle ambient corner glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-tanzania-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-zanzibar-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tanzania-500/10 border border-tanzania-500/20 mb-6">
                  <span className="w-2 h-2 rounded-full bg-tanzania-500 animate-pulse" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-tanzania-600 dark:text-tanzania-400">
                    Fursa za Uwekezaji · Investment Corridors
                  </span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-kilimanjaro-950 dark:text-white mb-5 leading-tight">
                  Your first 90 days in Tanzania,{" "}
                  <span className="bg-gradient-to-r from-tanzania-500 to-tanzania-400 bg-clip-text text-transparent italic">
                    mapped before landing.
                  </span>
                </h2>

                <p className="text-sm md:text-base text-kilimanjaro-600 dark:text-tanzania-200 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                  Whether establishing an agribusiness footprint along the SAGCOT corridor, acquiring an exploration license from TMAA, or incorporating via BRELA—our editorial roadmaps are free, verified, and updated quarterly.
                </p>

                {/* 3 Executive Opportunity Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10">
                  <div className="p-4 rounded-2xl bg-white/70 dark:bg-kilimanjaro-800/40 border border-kilimanjaro-900/5 dark:border-white/5 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-tanzania-600 dark:text-tanzania-400 mb-1">
                      TIC Strategic Status
                    </div>
                    <div className="text-xs font-medium text-kilimanjaro-800 dark:text-tanzania-100">
                      Zero import duty on capital goods and 10-year fiscal stability guarantees.
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/70 dark:bg-kilimanjaro-800/40 border border-kilimanjaro-900/5 dark:border-white/5 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-tanzania-600 dark:text-tanzania-400 mb-1">
                      SEZ & Corridors
                    </div>
                    <div className="text-xs font-medium text-kilimanjaro-800 dark:text-tanzania-100">
                      Bagamoyo, Mkapa SEZ & Silicon Zanzibar with direct SGR electric rail links.
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/70 dark:bg-kilimanjaro-800/40 border border-kilimanjaro-900/5 dark:border-white/5 backdrop-blur-sm">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-tanzania-600 dark:text-tanzania-400 mb-1">
                      Capital Security
                    </div>
                    <div className="text-xs font-medium text-kilimanjaro-800 dark:text-tanzania-100">
                      100% foreign equity allowed and constitutionally guaranteed profit repatriation.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                  <MagnetButton href="/guides" variant="primary" className="w-full sm:w-auto">
                    Explore all 18 sectors
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </MagnetButton>
                  <MagnetButton href="/visa" variant="outline" className="w-full sm:w-auto">
                    Start with legal & entry
                  </MagnetButton>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </main>
    </>
  );
}

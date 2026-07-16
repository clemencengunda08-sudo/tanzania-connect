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
import CurvedLoop from "@/components/premium/curved-loop";
import SmokyText from "@/components/premium/smoky-text";
import { BlurText } from "@/components/premium/blur-text";
import { Stats as StatsBlock } from "@/components/premium/stats";
import { MagnetButton } from "@/components/premium/magnet-button";
import { RevealOnScroll } from "@/components/premium/reveal-on-scroll";
import { ParticleField } from "@/components/premium/particle-field";
import { ScrollReveal } from "@/components/premium/scroll-reveal";
import { MagneticSpotlightMarquee } from "@/components/premium/magnetic-spotlight-marquee";
import { ScrollExpandSection } from "@/components/premium/scroll-expand-section";
import { ScrollSyncedText } from "@/components/premium/scroll-synced-text";
import { VerticalColumnsSlider } from "@/components/premium/vertical-columns-slider";
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
        <section className="relative px-6 md:px-12 lg:px-24 pt-12 pb-16 md:pt-16 md:pb-24 max-w-[1600px] mx-auto">
          <div className="h-32 md:h-44 flex items-center justify-start max-w-5xl text-kilimanjaro-900 dark:text-tanzania-50">
            <SmokyText
              text="Tanzania is vast, intricate, and quietly one of Africa's most rewarding frontiers."
              color="currentColor"
              intensity={8}
              appearTrigger="scroll"
              animationMode="multiLine"
              font={{
                fontFamily: "var(--font-inter)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 4.5rem)",
                lineHeight: "1.1",
                textAlign: "left",
              }}
            />
          </div>
          <RevealOnScroll delay={0.6}>
            <p className="mt-6 max-w-2xl text-lg text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed mb-10">
              We curate licensing requirements, regulations, agency contacts, and timelines so that
              investors, executives, and explorers spend their first 90 days building, not searching.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.8}>
            <div className="border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10 pt-10">
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
        <section className="relative px-6 md:px-12 lg:px-24 py-20 md:py-28 max-w-[1600px] mx-auto">
          <ScrollReveal variant="slide-left" duration={1} distance={60}>
            <h3 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-16 max-w-2xl">
              Three commitments to every professional who lands here.
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10 pt-12">
            {PILLARS.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 0.1}>
                <div className="flex flex-col h-full">
                  <div className="w-10 h-10 rounded-xl bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 flex items-center justify-center mb-6">
                    <p.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-display text-xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-3">
                    {p.title}
                  </h4>
                  <p className="text-sm text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <ScrollExpandSection />

        {/* ============== SECTOR GRID ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <ScrollReveal variant="fade-up" distance={30}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
            <RevealOnScroll>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tanzania-600 dark:text-tanzania-400 mb-4">
                Sector library
              </p>
              <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50">
                Eighteen sectors. <span className="italic text-tanzania-500">One</span> source of truth.
              </h3>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-tanzania-600 dark:text-tanzania-400 font-medium hover:gap-3 transition-all shrink-0"
              >
                Browse all 18 <ArrowUpRight className="w-4 h-4" />
              </Link>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOP_SECTORS.map((slug, i) => {
              const meta = sectorMetaMap[slug];
              if (!meta) return null;
              const Icon = sectorIconMap[slug] ?? Compass;
              return (
                <ScrollReveal key={slug} variant="fade-up" delay={(i % 6) * 0.05} distance={30}>
                  <SpotlightCard
                    href={getSectorUrl(slug)}
                    ariaLabel={meta.title.split(" — ")[0]}
                    className="group h-full p-6 bg-card border-kilimanjaro-900/10 dark:border-tanzania-50/10 rounded-3xl"
                    glowColor="200, 149, 25"
                  >
                    <div className="flex flex-col h-full min-h-[160px]">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-500">
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-kilimanjaro-400 dark:text-tanzania-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tanzania-500" />
                      </div>
                      <h4 className="font-display text-lg md:text-xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-2">
                        {meta.title.split(" — ")[0]}
                      </h4>
                      <p className="text-xs md:text-sm text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed flex-1">
                        {meta.ogDescription}
                      </p>
                      <div className="mt-4 pt-3 border-t border-kilimanjaro-900/5 dark:border-tanzania-50/5 flex items-center justify-between">
                        <span className="font-mono text-[12px] text-kilimanjaro-500 dark:text-tanzania-300">
                          {String(i + 1).padStart(2, "0")} / {TOP_SECTORS.length}
                        </span>
                        <span className="font-mono text-[11px] text-tanzania-500/80">
                          #{meta.keywords[0].toLowerCase()}
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
          <div className="mt-16">
            <MagneticSpotlightMarquee images={spotlightImages} />
          </div>
        </section>

        {/* ============== SCROLL SYNCED ANIMATED TEXT ============== */}
        <ScrollSyncedText />

        {/* ============== VERTICAL DUAL COLUMNS PARALLAX SLIDER ============== */}
        <VerticalColumnsSlider />

        {/* ============== DARK BAND — ABOUT ============== */}
        <section className="relative my-20 overflow-hidden">
          <div className="absolute inset-0 bg-kilimanjaro-950" />
          <div className="absolute inset-0 opacity-15">
            <ParticleField count={30} color="212, 175, 55" />
          </div>
          <div className="relative px-6 md:px-12 lg:px-24 py-28 md:py-40 max-w-[1600px] mx-auto text-tanzania-50">
            <BlurText
              as="h2"
              text="An independent intelligence hub, built so the country can speak for itself."
              className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tightest max-w-4xl"
              step={0.025}
              delay={0.15}
              by="word"
            />
            <RevealOnScroll delay={0.5}>
              <div className="mt-14 flex flex-col md:flex-row items-start gap-10">
                <p className="text-tanzania-200 text-lg leading-relaxed max-w-2xl">
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
        <section className="relative border-y border-kilimanjaro-900/10 dark:border-tanzania-50/10 bg-tanzania-100/30 dark:bg-kilimanjaro-900/30 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 pt-6">
            <p className="text-center text-xs font-medium text-kilimanjaro-400 dark:text-tanzania-400/70">
              Indexing the institutions that move Tanzania
            </p>
          </div>
          <CurvedLoop
            text="Tanzania Investment Centre ✦ BRELA ✦ TCRA ✦ Bank of Tanzania ✦ TANESCO ✦ TATO ✦ TAWA ✦ EWURA ✦ TRA ✦ TMDA ✦ NIDA ✦ DSE ✦ TIRA ✦ CMSA ✦ TPF ✦ Immigration ✦ "
            font={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 48,
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
        <section className="relative px-6 md:px-12 lg:px-24 py-28 md:py-40 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <BlurText
                as="h2"
                text="Your first 90 days in Tanzania, mapped before you board the flight."
                className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.08] tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 mb-8"
                step={0.025}
                delay={0.15}
                by="word"
              />
              <p className="text-lg text-kilimanjaro-600 dark:text-tanzania-200 max-w-xl mx-auto mb-10">
                Open the immigration briefing, the mining license roadmap, or the SAGCOT corridor overview.
                No paywall. No email gate.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagnetButton href="/visa" variant="primary">
                  Start with immigration
                  <ArrowRight className="w-4 h-4 ml-2" />
                </MagnetButton>
                <MagnetButton href="/guides" variant="outline">
                  All sector guides
                </MagnetButton>
              </div>
            </div>
          </RevealOnScroll>
        </section>
      </main>
    </>
  );
}

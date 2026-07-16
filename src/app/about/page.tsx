"use client";

import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Globe,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Compass,
  Target,
  Heart,
  BookOpen,
  Mail,
  ArrowRight,
  XCircle,
  Star,
  Quote,
} from "lucide-react";
import Link from "next/link";
import { SpotlightCard } from "@/components/premium/spotlight-card";
import { SingleTypewriter } from "@/components/typing";
import { BlurText } from "@/components/premium/blur-text";
import { MagnetButton } from "@/components/premium/magnet-button";
import { MarqueeStrip } from "@/components/premium/marquee-strip";
import { RegulatorStrip } from "@/components/premium/regulator-strip";
import { RevealOnScroll } from "@/components/premium/reveal-on-scroll";

const NOT_LIST = [
  "Government agency",
  "Visa / permit issuer",
  "Licensed legal firm",
  "Government fee collector",
  "Ministry-certified body",
  "Official state source",
];

const OFFICIAL_SOURCES = [
  { name: "TIC — Investment Centre", url: "https://www.tic.go.tz", desc: "Foreign investment licensing" },
  { name: "BRELA — Business Registration", url: "https://www.brela.go.tz", desc: "Company incorporation" },
  { name: "TRA — Revenue Authority", url: "https://www.tra.go.tz", desc: "Tax & fiscal compliance" },
  { name: "Immigration Department", url: "https://www.immigration.go.tz", desc: "Visas, permits, residence" },
  { name: "BoT — Bank of Tanzania", url: "https://www.bot.go.tz", desc: "Banking & forex" },
  { name: "TCRA — Communications", url: "https://www.tcra.go.tz", desc: "Telecom & ICT licensing" },
];

const PRINCIPLES = [
  {
    icon: Target,
    title: "Displacement-grade research",
    desc: "Every guide is sourced, footnoted, and refreshed. We cite primary sources — not aggregators.",
  },
  {
    icon: Heart,
    title: "Editorial care",
    desc: "We write for high-stakes decisions. Plain English. No filler. No SEO spam.",
  },
  {
    icon: Compass,
    title: "Always current",
    desc: "Tanzania's regulations shift quietly. Our cadence: quarterly review, immediate red-flag on material change.",
  },
  {
    icon: BookOpen,
    title: "Educational, not advisory",
    desc: "We are an intelligence layer. We never replace your attorney, accountant, or licensed advisor.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 grain-overlay">

      <main className="relative overflow-hidden pt-28 md:pt-32">
        {/* ============== HERO ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 pt-40 pb-24 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <RevealOnScroll>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-6 flex items-center gap-3">
                  <span className="w-10 h-px bg-tanzania-500" /> About the portal
                </p>
              </RevealOnScroll>
              <SingleTypewriter
                text="An independent intelligence hub."
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50"
                speed={40}
                startDelay={300}
                cursorClassName="bg-tanzania-500"
              />
              <RevealOnScroll delay={0.4}>
                <p className="mt-8 max-w-2xl text-lg md:text-xl text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed text-balance">
                  Tanzania Reach is a private initiative established to simplify Tanzanian business rules
                  for the global community. We are not a government agency or a law firm. We organize the facts.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-4">
              <RevealOnScroll delay={0.3}>
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto lg:ml-auto">
                  <div className="absolute inset-0 rounded-premium-lg bg-gradient-to-br from-tanzania-500 to-zanzibar-500 shadow-lift" />
                  <div className="absolute inset-0 rounded-premium-lg flex items-center justify-center text-tanzania-50">
                    <Globe className="w-14 h-14" strokeWidth={1.5} />
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ============== MARQUEE ============== */}
        <section className="py-12 border-y border-kilimanjaro-900/10 dark:border-tanzania-50/10 overflow-hidden bg-tanzania-100/40 dark:bg-kilimanjaro-900/40">
          <MarqueeStrip
            items={[
              { label: "Independent" },
              { label: "Educational" },
              { label: "Editorial" },
              { label: "Sourced" },
              { label: "Refreshed" },
              { label: "Dar es Salaam" },
            ]}
            separator="◆"
            speed={2}
            className="text-xl md:text-2xl font-display font-medium tracking-tight"
          />
        </section>

        {/* ============== WHO WE ARE ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <RevealOnScroll>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-4">
                  01 / Position
                </p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 leading-[1.05]">
                  Who we are.
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <RevealOnScroll delay={0.1}>
                <p className="text-lg text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed">
                  Tanzania Reach is an <strong className="text-kilimanjaro-900 dark:text-tanzania-50">independent information portal</strong> built to help foreigners, expats, and investors handle Tanzanian regulations.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <p className="text-lg text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed italic border-l-2 border-tanzania-500 pl-6">
                  We operate as a private informational hub. We are <strong>NOT</strong> affiliated with the Government of Tanzania, any government agency, or any political organization. Our content is curated from publicly available policies, official sources, and verified expert insights.
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* ============== WHAT WE ARE NOT ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <div className="relative rounded-premium-lg bg-amber-50/60 dark:bg-amber-950/20 border-2 border-amber-300/60 dark:border-amber-700/40 p-12 md:p-16 overflow-hidden card-lift">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400 mb-8">
                  <AlertTriangle className="w-7 h-7" strokeWidth={1.5} />
                  <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tightest uppercase">
                    What we are not
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {NOT_LIST.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-5 rounded-premium-sm bg-amber-100/40 dark:bg-amber-900/20 border border-amber-300/40 dark:border-amber-700/30 card-lift"
                    >
                      <XCircle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />
                      <span className="font-medium text-amber-900 dark:text-amber-100">Not a {item.toLowerCase()}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-sm text-amber-900/80 dark:text-amber-200/70 leading-relaxed max-w-3xl pt-6 border-t border-amber-300/40 dark:border-amber-700/30">
                  This portal is for educational and informational purposes only. We do not represent any
                  government authority and we do not provide official legal or professional advice.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* ============== PRINCIPLES ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-4">
              02 / Doctrine
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 max-w-4xl mb-20">
              Four principles. <span className="italic text-tanzania-500">No exceptions.</span>
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRINCIPLES.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 0.08}>
                <SpotlightCard className="h-full p-10 bg-card border-kilimanjaro-900/10 dark:border-tanzania-50/10 rounded-premium card-lift">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-tanzania-500/10 text-tanzania-600 dark:text-tanzania-400 flex items-center justify-center">
                      <p.icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-3">
                        {p.title}
                      </h3>
                      <p className="text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ============== ALWAYS VERIFY ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-6">
              <RevealOnScroll>
                <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em]">03 / Verification</p>
                </div>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50">
                  Always verify.
                </h2>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <RevealOnScroll delay={0.1}>
                <p className="text-lg text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed">
                  Before making any business or legal decision in Tanzania, verify with the official sources below.
                  Our work is to compress the noise — not to replace the institutions.
                </p>
              </RevealOnScroll>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {OFFICIAL_SOURCES.map((org, i) => (
              <RevealOnScroll key={org.name} delay={i * 0.05}>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-premium-sm bg-card border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-6 hover:border-tanzania-500/40 transition-all card-lift"
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-tanzania-500">
                      0{i + 1} / {OFFICIAL_SOURCES.length}
                    </p>
                    <ArrowUpRight className="w-4 h-4 text-kilimanjaro-400 dark:text-tanzania-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tanzania-500" />
                  </div>
                  <h4 className="font-display text-lg font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-1">
                    {org.name}
                  </h4>
                  <p className="text-sm text-kilimanjaro-600 dark:text-tanzania-200">{org.desc}</p>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ============== CTA ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-32 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-6">
                04 / Connect
              </p>
              <BlurText
                as="h2"
                text="Questions about the mission or data sources?"
                className="font-display text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 mb-10"
                step={0.03}
                delay={0.1}
                by="word"
              />
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagnetButton href="/contact" variant="primary">
                  <Mail className="w-4 h-4 mr-2" /> Contact the team
                </MagnetButton>
                <MagnetButton href="/mwijay" variant="outline">
                  Meet the studio
                  <ArrowRight className="w-4 h-4 ml-2" />
                </MagnetButton>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* ============== REGULATORY CREDIBILITY ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-20 max-w-[1600px] mx-auto">
          <RegulatorStrip
            caption="Verified against the institutions governing Tanzania"
            regulators={[
              { short: 'TIC',    full: 'Tanzania Investment Centre',     url: 'https://www.tic.go.tz',         scope: 'Investment promotion',   accent: 'serengeti' },
              { short: 'BRELA',  full: 'Business Registration & Licensing Agency', url: 'https://www.brela.go.tz', scope: 'Company law', accent: 'acacia' },
              { short: 'TRA',    full: 'Tanzania Revenue Authority',     url: 'https://www.tra.go.tz',         scope: 'Tax & customs',          accent: 'baobab' },
              { short: 'TID',    full: 'Tanzania Immigration Department',url: 'https://www.immigration.go.tz', scope: 'Visa & residence',       accent: 'kilimanjaro' },
              { short: 'BoT',    full: 'Bank of Tanzania',               url: 'https://www.bot.go.tz',         scope: 'Monetary policy',        accent: 'zanzibar' },
              { short: 'TCRA',   full: 'Tanzania Communications Reg. Auth.', url: 'https://www.tcra.go.tz',   scope: 'Telecom & ICT' },
              { short: 'EWURA',  full: 'Energy & Water Utilities Reg. Auth.', url: 'https://www.ewura.go.tz', scope: 'Utilities', accent: 'serengeti' },
            ]}
          />
        </section>

      </main>
    </div>
  );
}

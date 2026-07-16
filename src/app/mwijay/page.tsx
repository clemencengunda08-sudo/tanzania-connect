"use client";

import { Navbar1 } from "@/components/ui/navbar1";
import Link from "next/link";
import {
  ArrowLeft,
  Terminal,
  Cpu,
  Globe,
  GraduationCap,
  Code2,
  MessageCircle,
  Phone,
  Instagram,
  Sparkles,
  ArrowUpRight,
  Quote,
  Star,
  Compass,
  ChevronRight,
} from "lucide-react";
import { SpotlightCard } from "@/components/premium/spotlight-card";
import { SingleTypewriter } from "@/components/typing";
import { MagnetButton } from "@/components/premium/magnet-button";
import { MarqueeStrip } from "@/components/premium/marquee-strip";
import { RevealOnScroll } from "@/components/premium/reveal-on-scroll";

const EXPERTISE = [
  { label: "Information architecture", icon: Code2 },
  { label: "Regulatory research", icon: Compass },
  { label: "Editorial design", icon: Sparkles },
  { label: "Systems engineering", icon: Cpu },
  { label: "Brand & motion", icon: Terminal },
  { label: "Public-sector fluency", icon: Globe },
];

const PROJECTS = [
  {
    name: "Piano Sifa",
    role: "Afro-Gospel Amapiano",
    desc: "Cinematic sound design + visual world for a genre of worship that didn't exist before.",
    href: "https://audiomack.com/pianosifa",
    tag: "Music",
  },
  {
    name: "Mwijay Music App",
    role: "Cross-platform TS",
    desc: "Native-feel music + short-form video player. Streaming, offline, multi-region.",
    href: "/",
    tag: "Engineering",
  },
  {
    name: "Tanzania Reach",
    role: "Editorial product",
    desc: "This portal. 18 sectors, one navigation layer over the country's bureaucracy.",
    href: "/",
    tag: "Editorial",
  },
];

export default function CreditsPage() {
  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 grain-overlay">
      <Navbar1 />

      <main className="relative overflow-hidden">
        {/* ============== HERO ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 pt-40 pb-24 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-12 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-3 h-3" /> Back to home
            </Link>
          </RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <RevealOnScroll>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-6 flex items-center gap-3">
                  <span className="w-10 h-px bg-tanzania-500" /> The studio
                </p>
              </RevealOnScroll>
              <SingleTypewriter
                text="Architects of intelligence."
                className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50"
                speed={40}
                startDelay={300}
                cursorClassName="bg-tanzania-500"
              />
              <RevealOnScroll delay={0.4}>
                <p className="mt-8 max-w-2xl text-lg md:text-xl text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed text-balance">
                  Tanzania Reach is engineered at the intersection of technology, design, and national
                  integration — by a small studio in Dar es Salaam with a global standard.
                </p>
              </RevealOnScroll>
            </div>
            <div className="lg:col-span-4">
              <RevealOnScroll delay={0.3}>
                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto lg:ml-auto">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-tanzania-500 to-zanzibar-500 shadow-lift" />
                  <div className="absolute inset-0 rounded-[2rem] flex items-center justify-center text-tanzania-50">
                    <Terminal className="w-14 h-14" strokeWidth={1.5} />
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
              { label: "TypeScript" },
              { label: "Next.js" },
              { label: "Framer Motion" },
              { label: "Tailwind" },
              { label: "Editorial Design" },
              { label: "Information Architecture" },
              { label: "AI Orchestration" },
              { label: "Afro-Gospel" },
            ]}
            separator="◆"
            speed={2}
            className="text-xl md:text-2xl font-display font-medium tracking-tight"
          />
        </section>

        {/* ============== EXPERTISE ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-4">
              01 / Disciplines
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 max-w-4xl mb-20">
              We work where <span className="italic text-tanzania-500">research</span>, <span className="italic text-tanzania-500">design</span>, and <span className="italic text-tanzania-500">engineering</span> meet.
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EXPERTISE.map((e, i) => (
              <RevealOnScroll key={e.label} delay={i * 0.05}>
                <SpotlightCard className="p-8 bg-card border-kilimanjaro-900/10 dark:border-tanzania-50/10">
                  <e.icon className="w-6 h-6 text-tanzania-500 mb-4" strokeWidth={1.5} />
                  <p className="font-display text-lg font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50">
                    {e.label}
                  </p>
                </SpotlightCard>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ============== TEAM ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-4">
              02 / The team
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 max-w-4xl mb-20">
              Two founders. One editorial doctrine.
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* David */}
            <RevealOnScroll>
              <SpotlightCard
                className="h-full p-10 md:p-12 bg-card border-kilimanjaro-900/10 dark:border-tanzania-50/10"
                glowColor="200, 149, 25"
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tanzania-500 to-zanzibar-500 flex items-center justify-center text-tanzania-50 font-display text-2xl font-medium">
                      MD
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50">
                        David Erick Mwijage
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-500 mt-1">
                        Mwijay Davie · Lead Architect
                      </p>
                    </div>
                  </div>
                  <p className="text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed">
                    Creative technologist. Founder of <span className="font-medium text-tanzania-500">Ideazzy</span>{" "}
                    and <span className="font-medium text-tanzania-500">Piano Sifa</span>. Builds the visual and
                    editorial spine of the studio.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/255790942616"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-tanzania-100/40 dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 hover:border-tanzania-500/40 transition-all text-sm font-medium"
                    >
                      <MessageCircle className="w-5 h-5 text-tanzania-500" />
                      WhatsApp · 0790 942 616
                    </a>
                    <a
                      href="https://instagram.com/mwijay.davie"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-tanzania-100/40 dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 hover:border-tanzania-500/40 transition-all text-sm font-medium"
                    >
                      <Instagram className="w-5 h-5 text-tanzania-500" />
                      @mwijay.davie
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </RevealOnScroll>

            {/* Clemence */}
            <RevealOnScroll delay={0.1}>
              <SpotlightCard
                className="h-full p-10 md:p-12 bg-card border-kilimanjaro-900/10 dark:border-tanzania-50/10"
                glowColor="200, 149, 25"
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tanzania-600 to-zanzibar-500 flex items-center justify-center text-tanzania-50 font-display text-2xl font-medium">
                      CN
                    </div>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50">
                        Clemence William Ng'unda
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-500 mt-1">
                        Systems Engineer
                      </p>
                    </div>
                  </div>
                  <p className="text-kilimanjaro-700 dark:text-tanzania-200 leading-relaxed italic border-l-2 border-tanzania-500 pl-6">
                    &ldquo;Driving technical excellence through secure cloud infrastructure and scalable digital
                    frameworks for Tanzania's future.&rdquo;
                  </p>
                  <div className="pt-4 border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-kilimanjaro-500 dark:text-tanzania-300">
                      Cloud · Systems · Scale
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          </div>
        </section>

        {/* ============== PROJECTS ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 mb-4">
              03 / Adjacent work
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 max-w-4xl mb-20">
              Other vessels of the same studio.
            </h2>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <RevealOnScroll key={p.name} delay={i * 0.08}>
                <SpotlightCard
                  href={p.href}
                  ariaLabel={p.name}
                  className="group h-full p-8 bg-card border-kilimanjaro-900/10 dark:border-tanzania-50/10"
                >
                  <div className="flex flex-col h-full min-h-[240px]">
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-500">
                        0{i + 1} · {p.tag}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-kilimanjaro-400 dark:text-tanzania-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-tanzania-500" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 mb-2">
                      {p.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-kilimanjaro-500 dark:text-tanzania-300 mb-4">
                      {p.role}
                    </p>
                    <p className="text-sm text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed flex-1">
                      {p.desc}
                    </p>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ============== INSTITUTION ============== */}
        <section className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-[1600px] mx-auto">
          <RevealOnScroll>
            <div className="relative rounded-[2.5rem] bg-card border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-12 md:p-20 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-tanzania-500/5 to-zanzibar-500/5" />
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-tanzania-500 to-zanzibar-500 flex items-center justify-center text-tanzania-50 mx-auto shadow-lift">
                  <GraduationCap className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50 mb-4">
                    BBIT Excellence
                  </h3>
                  <p className="text-kilimanjaro-700 dark:text-tanzania-200 text-lg leading-relaxed">
                    Developed by BBIT students of the{" "}
                    <strong className="text-kilimanjaro-900 dark:text-tanzania-50">
                      United African University of Tanzania (UAUT)
                    </strong>
                    . A testament to the rising digital talent in Dar es Salaam, 2024–2026.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <MagnetButton href="/" variant="primary">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Home intelligence
                  </MagnetButton>
                  <MagnetButton href="/about" variant="outline">
                    Read the manifesto
                  </MagnetButton>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* ============== FOOTER LINE ============== */}
        <section className="px-6 md:px-12 lg:px-24 py-16 max-w-[1600px] mx-auto text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-kilimanjaro-400 dark:text-tanzania-400">
            Technology · Unity · Progress · Tanzania Reach 2026
          </p>
        </section>
      </main>
    </div>
  );
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Smartphone, ShieldCheck, Terminal, Server, ArrowLeft, Info, HelpCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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
        url: "https://www.tanzaniareach.com/og-image.png",
        width: 1200,
        height: 630,
        alt: meta.ogTitle,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tanzaniareach",
    title: meta.ogTitle,
    description: meta.ogDescription,
    images: ["https://www.tanzaniareach.com/og-image.png"],
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

const subsectors = [
  {
    name: "Fintech & Payments",
    icon: Smartphone,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
    desc: "Tanzania boasts a highly active mobile money economy (M-Pesa, Tigo Pesa, Airtel Money). BoT regulates payment service providers under the National Payment Systems Act.",
  },
  {
    name: "Silicon Zanzibar",
    icon: Terminal,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300",
    desc: "An official initiative offering special work/residence permits, tax exemptions, and fast-tracked licensing for tech startups and software engineers setting up offices in Zanzibar.",
  },
  {
    name: "ICT Infrastructure",
    icon: Server,
    color: "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300",
    desc: "Connected to the National ICT Broadband Backbone (NICTBB) and multiple undersea cables. Co-location centers and local cloud hosting are governed by TCRA.",
  },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50 pb-24 md:pb-12">
      <JsonLd
        data={sectorArticleSchema({
          slug: SLUG,
          title: meta.title,
          description: meta.description,
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Guides", url: "/guides" }, { name: meta.title, url: `/guides/${SLUG}` }])} />

      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-12">
        {/* Navigation Marquee */}
        <MarqueeStrip
          caption="Tech Ecosystem Live"
          items={[
            { label: 'TCRA', value: "Regulatory License" },
            { label: 'COSTECH', value: "Research Permit" },
            { label: 'Silicon Zanzibar', value: "Incentives" },
            { label: 'NICTBB', value: "Fiber Backbone" },
            { label: 'M-Pesa', value: "Open API" },
            { label: 'DTBi', value: "Startup Hub" },
          ]}
          speed={2}
        />

        {/* Hero Banner with User Spline robot */}
        <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50 z-10">
          {/* Fallback Real Image */}
          <div className="absolute inset-0 -z-20 bg-kilimanjaro-950">
            <Image
              src="/images/tanzania/tanzania-tech-hub.png"
              alt="Technology Hub Backdrop"
              fill
              priority
              className="object-cover opacity-20 select-none pointer-events-none"
            />
          </div>
          {/* Spline 3D Backdrop - Robot */}
          <div className="spline-container absolute inset-0 z-0 pointer-events-none bg-black/40 overflow-hidden">
            <iframe
              src="https://my.spline.design/genkubgreetingrobot-EvrgiSuHNbFePq6J406vx29a/"
              frameBorder="0"
              width="100%"
              height="100%"
              className="w-[102%] h-[106%] -translate-y-[3%] -translate-x-[1%] scale-[1.04] pointer-events-none"
            ></iframe>
          </div>
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Heading Content */}
          <div className="absolute inset-0 flex items-end p-8 md:p-12 z-20">
            <div className="space-y-4">
              <Badge className="bg-primary text-primary-foreground font-bold">Tech & Innovation</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Technology & Startups
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">Building the future:</span>
                <SectorTypewriter
                  sector="technology"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-tanzania-600 dark:text-tanzania-400 hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all guides
        </Link>

        {/* Intro */}
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl font-medium">
          Tanzania is scaling its digital frontier. Powered by high mobile money adoption and national broadband investments, startups and global entities are establishing key hubs in Dar es Salaam and Zanzibar.
        </p>

        {/* Key Areas Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subsectors.map((sec) => (
            <Card key={sec.name} className="border-none shadow-lg rounded-[2.5rem] bg-card overflow-hidden flex flex-col hover:shadow-xl transition-all">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${sec.color}`}>
                    <sec.icon className="h-7 w-7" />
                  </div>
                </div>
                <CardTitle className="text-2xl">{sec.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <p className="text-md text-muted-foreground leading-relaxed font-light">{sec.desc}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* 2-Column Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-headline font-bold text-primary flex items-center gap-3">
              <Cpu className="h-8 w-8" />
              Incubation & Startup Ecosystem
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-light">
              Tanzania's technology hubs provide incubation, seed funding, and product testing resources. Primary initiatives like COSTECH's Buni Hub support startups with co-working spaces, maker spaces, and intellectual property advisories.
            </p>
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 flex gap-4 items-start">
              <Info className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-bold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider">Startup Act Notice</h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                  Tanzania's private sector is actively working with the Ministry of ICT to formulate a formal Startup Act. This legislation aims to provide automated tax breaks and direct funding options for early-stage founders.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative h-72 md:h-80 rounded-[3rem] overflow-hidden border border-border/50 shadow-xl bg-muted">
            <Image
              src="/images/tanzania/tanzania-tech-hub.png"
              alt="Tech Incubator Hub in Tanzania"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Buni Hub Innovation Center, Dar es Salaam</span>
            </div>
          </div>
        </section>

        {/* Regulator Compliance Strip */}
        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'TCRA', full: 'Tanzania Communications Regulatory Authority', url: 'https://www.tcra.go.tz', scope: 'Telecom, internet & digital media licensing' },
            { short: 'COSTECH', full: 'Tanzania Commission for Science & Technology', url: 'https://www.costech.or.tz', scope: 'Research authorization & tech hub coordination', accent: 'serengeti' },
            { short: 'BoT', full: 'Bank of Tanzania', url: 'https://www.bot.go.tz', scope: 'National payment systems & fintech regulation' },
            { short: 'ZIPA', full: 'Zanzibar Investment Promotion Authority', url: 'https://www.zipa.go.tz', scope: 'Silicon Zanzibar incentives & business permits', accent: 'zanzibar' },
          ]}
        />
      </main>
    </div>
  );
}

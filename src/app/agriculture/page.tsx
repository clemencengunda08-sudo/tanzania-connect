import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sprout, Wheat, Coffee, Info, ArrowLeft, Landmark, TrendingUp, Ship, Droplets } from "lucide-react"
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

const SLUG = "agriculture";
const meta = getSectorMeta(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/agriculture",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/agriculture",
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

const crops = [
  { 
    name: "Coffee", 
    icon: Coffee, 
    regions: "Kilimanjaro, Mbeya, Ruvuma", 
    type: "Export",
    details: "Primarily Arabica in high altitudes and Robusta in Bukoba. Most is sold through the Moshi Auction."
  },
  { 
    name: "Cashews", 
    icon: Sprout, 
    regions: "Mtwara, Lindi, Pwani", 
    type: "Export",
    details: "Tanzania is a top global producer. Government focus is now on local processing rather than raw nut exports."
  },
  { 
    name: "Horticulture", 
    icon: Sprout, 
    regions: "Arusha, Kilimanjaro, Njombe", 
    type: "High Value",
    details: "The fastest-growing sub-sector (flowers, vegetables, fruits) utilizing cool climates and air-freight via JRO."
  },
  { 
    name: "Sisal", 
    icon: Wheat, 
    regions: "Tanga, Morogoro", 
    type: "Industrial",
    details: "Once the world leader; seeing a resurgence for use in construction materials and biogas."
  },
]

export default function AgriculturePage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd
        data={sectorArticleSchema({
          slug: SLUG,
          title: meta.title,
          description: meta.description,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          {
            name: "Home",
            url: "https://www.tanzaniareach.com",
          },
          {
            name: "Agriculture",
            url: "https://www.tanzaniareach.com/agriculture",
          },
        ])}
      />
      {sectorFaqs[SLUG] && (
        <JsonLd data={faqSchema(sectorFaqs[SLUG])} />
      )}
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fade-in">
        <MarqueeStrip
          caption="Live from farm-gate to port"
          items={[
            { label: 'Coffee Auction', value: 'Moshi' },
            { label: 'Cashew Board', value: 'Mtwara' },
            { label: 'Tobacco Auction', value: 'Morogoro' },
            { label: 'Sisal Authority', value: 'Tanga' },
            { label: 'Tea Board', value: 'Mufindi' },
            { label: 'Pyrethrum', value: 'Iringa' },
            { label: 'SAGCOT', value: 'Southern Corridor' },
            { label: 'TAHA', value: 'Horticulture' },
          ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="/images/tanzania/agriculture-tanzania.jpg"
            alt="Tanzania Agriculture"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania Farming"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Economic Pillar</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Agriculture & Agribusiness
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">From the soil:</span>
                <SectorTypewriter
                  sector="agriculture"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section className="space-y-6">
              <h2 className="text-3xl font-headline font-bold text-primary uppercase">Strategic Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Agriculture is the foundation of Tanzania's economy, contributing 26% to the GDP and providing employment to roughly 75% of the workforce. The country possesses 44 million hectares of arable land, yet only 33% is under cultivation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {crops.map((crop) => (
                  <Card key={crop.name} className="sector-card group">
                    <CardHeader className="p-8 pb-4">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <crop.icon className="h-6 w-6 text-primary group-hover:text-white" />
                      </div>
                      <CardTitle className="text-2xl mt-4 font-headline uppercase">{crop.name}</CardTitle>
                      <Badge variant="secondary" className="w-fit">{crop.type}</Badge>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-2">
                      <p className="font-bold text-sm text-primary">{crop.regions}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{crop.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-8 glass-card p-10 rounded-[2.5rem]">
              <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Land Tenure for Foreigners</h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">1</div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold uppercase tracking-tighter">Derivative Rights</h4>
                    <p className="text-muted-foreground leading-relaxed">Foreigners cannot own land 'outright'. Instead, they obtain a <strong>Derivative Right</strong> from the Tanzania Investment Centre (TIC). This is a long-term lease for investment purposes, typically for 33, 66, or 99 years.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">2</div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold uppercase tracking-tighter">TIC Facilitation</h4>
                    <p className="text-muted-foreground leading-relaxed">To qualify for agricultural land, the project must be registered with TIC. The minimum investment for foreigners is <strong>$500,000</strong>. TIC acts as the 'Land Bank' to identify suitable land for investors.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <Card className="border-primary/20 bg-primary/5 rounded-[2rem] overflow-hidden shadow-sm">
              <CardHeader className="bg-primary text-white p-6">
                <CardTitle className="flex items-center gap-3 text-xl uppercase font-headline">
                  <TrendingUp className="h-6 w-6" />
                  Incentives
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm"><strong>Zero Duty</strong> on imported capital goods (tractors, irrigation equipment).</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm"><strong>100% Capital Allowance</strong> on agricultural expenditure.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm"><strong>VAT Exemption</strong> on various agricultural inputs and tools.</p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3 uppercase font-headline">
                  <Landmark className="h-6 w-6 text-primary" />
                  Key Regions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="font-bold text-primary">SAGCOT Corridor</p>
                  <p className="text-xs text-muted-foreground italic">Southern Agricultural Growth Corridor</p>
                  <p className="text-sm leading-relaxed">Includes Morogoro, Iringa, Njombe, and Mbeya. High potential for large-scale commercial farming.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-primary">Lake Zone</p>
                  <p className="text-sm leading-relaxed">Mwanza and Kagera regions. Dominant in cotton and fisheries (Nile Perch).</p>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>

        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'TIC',    full: 'Tanzania Investment Centre', url: 'https://www.tic.go.tz',   scope: 'Land bank & investor facilitation', accent: 'serengeti' },
            { short: 'TRA',    full: 'Tanzania Revenue Authority',  url: 'https://www.tra.go.tz',   scope: 'Tax & duty incentives' },
            { short: 'TAHA',   full: 'Tanzania Horticulture Assoc.',url: 'https://www.taha.or.tz',  scope: 'Fresh produce exports', accent: 'acacia' },
            { short: 'TBS',    full: 'Tanzania Bureau of Standards',url: 'https://www.tbs.go.tz',   scope: 'Quality & grading' },
            { short: 'MIT',    full: 'Ministry of Agriculture',     url: 'https://www.kilimo.go.tz',scope: 'Policy & sector strategy' },
            { short: 'TANIPAC',full: 'Tanzania National Plant Health Authority', url: 'https://www.tanipac.go.tz', scope: 'Phytosanitary', accent: 'baobab' },
          ]}
        />
      </main>
    </div>
  )
}

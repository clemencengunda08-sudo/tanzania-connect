import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Train, Zap, HardHat, Ship, Radio, Droplets, ArrowLeft, Landmark, Construction, Globe } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
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

const SLUG = "infrastructure";
const meta = getSectorMeta("energy")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/infrastructure",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/infrastructure",
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

const infraProjects = [
  {
    title: "The Standard Gauge Railway (SGR)",
    icon: Train,
    content: "Tanzania is constructing a 2,102km SGR network to link Dar es Salaam with neighboring landlocked countries. This is the most modern rail system in East Africa.",
    details: [
      "Dar to Dodoma: Fully operational with electric trains, reducing travel time to 3.5 hours.",
      "Cargo Capacity: Designed to carry up to 10,000 tonnes per train, revolutionizing logistics.",
      "Regional Integration: Future phases will connect Mwanza, Kigoma, and eventually Rwanda/Burundi."
    ]
  },
  {
    title: "Energy & Power (TANESCO)",
    icon: Zap,
    content: "The government is aggressively expanding power generation to meet industrial demand through the Tanzania Electric Supply Company (TANESCO).",
    details: [
      "JNHPP: The Julius Nyerere Hydropower Project (2,115 MW) is the backbone of future energy security.",
      "Renewables: Growing focus on solar and wind projects in regions like Singida and Dodoma.",
      "Connectivity: The Rural Energy Agency (REA) has brought electricity to over 90% of Tanzanian villages."
    ]
  },
  {
    title: "Ports & Maritime",
    icon: Ship,
    content: "Dar es Salaam Port is a major gateway for the East African region, handling over 90% of Tanzania's international trade.",
    details: [
      "Dar Port Expansion: Modernization of berths and deepening of the channel to accommodate larger vessels.",
      "Gateway Status: Serving Malawi, Zambia, DRC, Rwanda, Burundi, and Uganda.",
      "Secondary Ports: Tanga, Mtwara, and the cruise terminal in Zanzibar (Malindi) are seeing major upgrades."
    ]
  },
  {
    title: "Digital & Telecoms",
    icon: Radio,
    content: "Managed by TCRA, Tanzania has one of the most competitive and developed telecommunications sectors in the region.",
    details: [
      "National Fiber Backbone: Extensive high-speed internet connectivity spanning the entire country.",
      "Mobile Penetration: Over 50 million active mobile subscriptions with high 4G/5G availability in urban areas.",
      "Data Centers: Growing investment in tier-3 data centers to support the burgeoning fintech ecosystem."
    ]
  }
]

export default function InfrastructurePage() {
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
            name: "Infrastructure",
            url: "https://www.tanzaniareach.com/infrastructure",
          },
        ])}
      />
      {sectorFaqs[SLUG] && (
        <JsonLd data={faqSchema(sectorFaqs[SLUG])} />
      )}
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fade-in">
        <MarqueeStrip
          caption="Live from the grid, rail, port & runway"
          items={[
            { label: 'TANESCO', value: 'Power' },
            { label: 'REA', value: 'Rural Grid' },
            { label: 'Julius Nyerere', value: '2,115 MW' },
            { label: 'TAZARA', value: 'Rail' },
            { label: 'SGR', value: 'Standard Gauge' },
            { label: 'TPA', value: 'Port of Dar' },
            { label: 'KIA', value: 'Kilimanjaro Airport' },
            { label: 'JNIA T3', value: 'International' },
            { label: 'TPDF', value: 'Petroleum' },
            { label: 'ATCL', value: 'Air Tanzania' },
          ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="/images/tanzania/infrastructure-banner.jpg"
            alt="Tanzania Infrastructure & Utilities"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania SGR and Energy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">National Vision & Utilities</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Infrastructure & Utilities
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">From the grid:</span>
                <SectorTypewriter
                  sector="infrastructure"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          A comprehensive manual on the backbone of Tanzania&apos;s development—from the Standard Gauge Railway to the National ICT Fiber Backbone.
        </p>

        <div className="grid grid-cols-1 gap-12">
          {infraProjects.map((project) => (
            <section key={project.title} className="group">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="h-16 w-16 rounded-2xl bg-card border shadow-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <project.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-4">{project.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.content}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.details.map((detail, idx) => (
                      <Card key={idx} className="border-none shadow-sm bg-muted/30 rounded-2xl p-6">
                        <div className="h-2 w-8 bg-primary/20 rounded-full mb-4" />
                        <p className="text-sm font-medium leading-relaxed">{detail}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Technical Utilities Grid */}
        <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Utility Management Systems</h2>
            <p className="text-muted-foreground">Essential information for operating facilities and businesses in Tanzania.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary">
                <Globe className="h-6 w-6" />
                <h4 className="font-bold">Fiber Optic Access</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The NICTBB (National ICT Broadband Backbone) provides high-capacity bandwidth. Major providers like TTCL, Vodacom, and Tigo leverage this for enterprise solutions.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-tanzania-600">
                <Droplets className="h-6 w-6" />
                <h4 className="font-bold">Water Supply</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Managed by DAWASA (Dar) and RUWASA (Rural). Industrial water rates are standardized and projects requiring high volume must apply for specific discharge permits.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-secondary-foreground">
                <HardHat className="h-6 w-6" />
                <h4 className="font-bold">Road Connectivity</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Managed by TANROADS. Most major corridors connecting to Rwanda, Burundi, and Zambia are paved and maintained to high international standards.
              </p>
            </div>
          </div>
        </section>

        <Card className="bg-primary text-white rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <Landmark className="h-20 w-20 opacity-20 shrink-0" />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Regulatory Authority: TCRA & EWURA</h3>
              <p className="text-lg opacity-80 leading-relaxed">
                Infrastructure operation is strictly regulated. The Tanzania Communications Regulatory Authority (TCRA) and the Energy and Water Utilities Regulatory Authority (EWURA) provide the licensing framework for all service providers.
              </p>
            </div>
          </div>
        </Card>

        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short:'TANESCO', full:'Tanzania Electric Supply Company', url:'https://www.tanesco.co.tz', scope:'Power generation & grid' },
            { short:'REA', full:'Rural Energy Agency', url:'https://www.rea.go.tz', scope:'Off-grid electrification' },
            { short:'EWURA', full:'Energy & Water Utilities Regulatory Authority', url:'https://www.ewura.go.tz', scope:'Sector oversight' },
            { short:'TPDF', full:'Tanzania Petroleum Development Corporation', url:'https://www.tpdc.co.tz', scope:'Oil & gas upstream' },
            { short:'TPA', full:'Tanzania Ports Authority', url:'https://www.tpa.or.tz', scope:'Port operations' },
            { short:'TAZARA', full:'Tanzania-Zambia Railway Authority', url:'https://www.tazarasite.com', scope:'Cross-border rail' },
          ]}
        />
      </main>
    </div>
  )
}

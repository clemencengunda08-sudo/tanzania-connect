import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Key, MapPin, Shield, Zap, Droplets, Info, ArrowLeft, Building, Landmark } from "lucide-react"
import { MarqueeStrip } from "@/components/premium/marquee-strip"
import { RegulatorStrip } from "@/components/premium/regulator-strip"
import { SectorTypewriter } from "@/components/premium/sector-typewriter"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";
import { JsonLd } from "@/components/json-ld";
import {
  sectorArticleSchema,
  breadcrumbSchema,
  faqSchema,
  sectorFaqs,
} from "@/lib/schema";

const SLUG = "real-estate";
const meta = getSectorMeta(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/housing",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/housing",
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

const neighborhoods = [
  {
    name: "Masaki & Oysterbay",
    city: "Dar es Salaam",
    type: "Premium Expert",
    features: "Secure, close to international schools, high-end restaurants, and embassies."
  },
  {
    name: "Mikocheni",
    city: "Dar es Salaam",
    type: "Mid-to-High",
    features: "Residential feel, good for families, mix of stand-alone houses and apartments."
  },
  {
    name: "Njiro",
    city: "Arusha",
    type: "Popular Expert",
    features: "Quiet, green, views of Mount Meru, home to many NGO and UN staff."
  },
  {
    name: "Stone Town",
    city: "Zanzibar",
    type: "Cultural/Boutique",
    features: "Historical apartments, dense urban living, requires high cultural sensitivity."
  }
]

export default function HousingPage() {
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
            name: "Housing",
            url: "https://www.tanzaniareach.com/housing",
          },
        ])}
      />
      {sectorFaqs[SLUG] && (
        <JsonLd data={faqSchema(sectorFaqs[SLUG])} />
      )}
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-12">
        <MarqueeStrip
          caption="Live from the property market"
          items={[
              { label: 'NHC', value: "Public housing" },
              { label: 'WST', value: "Title deeds" },
              { label: 'TANROADS', value: "Access roads" },
              { label: 'DAWASA', value: "Water" },
              { label: 'TANESCO', value: "Grid power" },
              { label: 'LCT', value: "Labour" },
              { label: 'CRDB', value: "Mortgage finance" },
              { label: 'NMB', value: "Home loans" },
            ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="/images/tanzania/dar-es-salaam-housing.png"
            alt="Tanzania Housing & Real Estate Skyline in Dar es Salaam"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania Property"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Living & Property</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Housing & Real Estate
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">Secure your space:</span>
                <SectorTypewriter
                  sector="housing"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          A comprehensive guide to finding, securing, and maintaining a home in Tanzania, from modern city apartments to coastal villas.
        </p>

        {/* The Broker System */}
        <Card className="bg-primary/5 border-none rounded-[2.5rem] p-10 shadow-sm border border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <Key className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-headline font-bold">The 'Dalali' (Broker) System</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most rental transactions in Tanzania go through independent agents known as <strong>Madalali</strong>. While there are formal real estate agencies, the local broker is the most common way to find a house.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Badge variant="secondary" className="shrink-0 h-fit">Fee Structure</Badge>
                  <p className="text-sm">The standard commission is <strong>one month's rent</strong>, paid by the tenant upon signing the contract.</p>
                </div>
                <div className="flex gap-4">
                  <Badge variant="secondary" className="shrink-0 h-fit">Verification</Badge>
                  <p className="text-sm">Ensure the broker is known in the local community. Always insist on seeing the landlord in person before exchanging any cash.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative h-[220px] rounded-3xl overflow-hidden shadow-md border bg-card">
                <Image
                  src="/images/tanzania/dalali-system.png"
                  alt="Tanzania Dalali System Key Handover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="bg-card p-6 rounded-2xl shadow-sm border space-y-2">
                <h4 className="font-bold text-primary flex items-center gap-2 text-xs uppercase tracking-wider">
                  <Info className="h-4 w-4" />
                  Expert Tip
                </h4>
                <p className="text-xs italic text-muted-foreground leading-relaxed">
                  "Finding a home often happens through word-of-mouth. Join local expert WhatsApp groups or ask colleagues at work—often the best houses never even make it to the broker lists."
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Neighborhoods Grid */}
        <section className="space-y-8">
          <h2 className="text-3xl font-headline font-bold text-primary">Popular Residential Hubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {neighborhoods.map((area) => (
              <Card key={area.name} className="border-none shadow-md rounded-[2rem] hover:shadow-lg transition-all bg-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">{area.name}</CardTitle>
                      <p className="text-xs font-bold text-primary uppercase tracking-widest">{area.city}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/20 text-primary">{area.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.features}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Essential Utilities */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-none shadow-sm rounded-[2rem] bg-orange-50/30 dark:bg-orange-950/10 border border-orange-100 dark:border-orange-900/50">
            <CardHeader>
              <Zap className="h-8 w-8 text-orange-500 mb-4" />
              <CardTitle className="text-lg">Electricity (Luku)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tanzania uses a pre-paid system called <strong>LUKU</strong>. You buy units via Mobile Money (M-Pesa) and enter a 20-digit token into your house's meter.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-tanzania-50/30 dark:bg-tanzania-950/10 border border-tanzania-100 dark:border-blue-900/50">
            <CardHeader>
              <Droplets className="h-8 w-8 text-tanzania-500 mb-4" />
              <CardTitle className="text-lg">Water Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Managed by <strong>DAWASA/DAWASCO</strong>. Most houses have underground tanks and electric pumps. Always check if a house has a reliable backup supply.</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[2rem] bg-green-50/30 dark:bg-green-950/10 border border-green-100 dark:border-green-900/50">
            <CardHeader>
              <Shield className="h-8 w-8 text-green-500 mb-4" />
              <CardTitle className="text-lg">Security & Guards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Most experts employ a <strong>Mlinzi</strong> (guard) or use security firms like Knight Support or SGA. High walls and electric fences are standard in Dar.</p>
            </CardContent>
          </Card>
        </section>

        {/* Payment Terms Section */}
        <section className="bg-muted/30 p-10 rounded-[3rem] space-y-8">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-headline font-bold">Standard Payment Terms</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rental agreements in Tanzania differ significantly from Western norms. It is standard to pay <strong>6 months or 12 months in advance</strong>. Monthly payments are very rare and usually come at a significant premium.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-2xl shadow-sm">
                  <p className="font-bold text-primary">Taxes</p>
                  <p className="text-xs text-muted-foreground">Landlords are responsible for paying 10% Withholding Tax on rent. Ensure your contract clarifies who handles this.</p>
                </div>
                <div className="p-4 bg-card rounded-2xl shadow-sm">
                  <p className="font-bold text-primary">Renewal</p>
                  <p className="text-xs text-muted-foreground">Typically required 2-3 months before the end of the term. Rent increases are common after the first year.</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-80 bg-primary text-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-center gap-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Landmark className="h-6 w-6" />
                Can Foreigners Buy?
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                Foreigners cannot own land 'outright'. To purchase property, you typically need to be a registered investor with the <strong>TIC (Tanzania Investment Centre)</strong> to obtain a Derivative Right of occupancy for commercial or residential use.
              </p>
              <Button variant="secondary" className="w-full font-bold">Learn About TIC</Button>
            </div>
          </div>
        </section>
        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'NHC', full: 'National Housing Corporation', url: 'https://www.nhc.co.tz', scope: 'Public housing' },
            { short: 'WST', full: 'Ministry of Lands & WST', url: 'https://www.wst.go.tz', scope: 'Title deeds & surveys', accent: 'serengeti' },
            { short: 'CRDB', full: 'CRDB Bank PLC', url: 'https://www.crdbbank.co.tz', scope: 'Mortgage finance', accent: 'acacia' },
            { short: 'NMB', full: 'NMB Bank PLC', url: 'https://www.nmbbank.co.tz', scope: 'Home loans' },
            { short: 'TANROADS', full: 'Tanzania Roads Agency', url: 'https://www.tanroads.go.tz', scope: 'Access roads' },
            { short: 'DAWASA', full: 'Dar es Salaam Water & Sewerage Authority', url: 'https://www.dawasa.go.tz', scope: 'Water supply' },
            { short: 'EWURA', full: 'Energy & Water Utilities Reg. Auth.', url: 'https://www.ewura.go.tz', scope: 'Utilities tariffs' },
          ]}
        />
      </main>
    </div>
  )
}

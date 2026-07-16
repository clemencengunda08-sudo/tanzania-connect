import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, Info, ArrowLeft, Gem, Flame, Landmark, Coins } from "lucide-react"
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

const SLUG = "mining";
const meta = getSectorMeta(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/mining",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/mining",
    siteName: "Tanzania Reach",
    title: meta.ogTitle,
    description: meta.ogDescription,
    locale: "en_US",
    images: [
      {
        url: "https://www.tanzaniareach.comhttps://res.cloudinary.com/dwykuhmp5/image/upload/v1784202018/tanzania_connect/static/mining-banner.png",
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
    images: ["https://www.tanzaniareach.comhttps://res.cloudinary.com/dwykuhmp5/image/upload/v1784202018/tanzania_connect/static/mining-banner.png"],
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

export default function MiningPage() {
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
            name: "Mining",
            url: "https://www.tanzaniareach.com/mining",
          },
        ])}
      />
      {sectorFaqs[SLUG] && (
        <JsonLd data={faqSchema(sectorFaqs[SLUG])} />
      )}
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-12">
        <MarqueeStrip
          caption="Live from the mineral market"
          items={[
            { label: 'Gold Price', value: 'Geita' },
            { label: 'Tanzanite Price', value: 'Mererani' },
            { label: 'Diamonds', value: 'Mwadui' },
            { label: 'Graphite', value: 'Lindi' },
            { label: 'Nickel', value: 'Kabanga' },
            { label: 'Helium', value: 'Rukwa' },
          ]}
          speed={2}
        />


        {/* Hero Section */}
        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202018/tanzania_connect/static/mining-banner.png"
            alt="Tanzania Mining & Minerals"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Mineral Wealth</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Mining & Minerals
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">Secure your licenses:</span>
                <SectorTypewriter
                  sector="mining"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Tanzania is rich in mineral wealth, serving as Africa's fourth-largest gold producer and the world's only source of Tanzanite.
        </p>

        {/* Section 1: Gold & Precious Metals */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Coins className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-headline font-bold">Gold & Precious Metals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Gold dominates Tanzania's mineral export sector. The Lake Victoria Goldfield hosts major operations such as AngloGold Ashanti's Geita Gold Mine and Barrick Gold's Bulyanhulu and North Mara mines.
              </p>
              <p>
                The government promotes local processing, requiring refining to be completed in-country prior to export to maximize the domestic value chain.
              </p>
            </div>
            <div className="relative h-[250px] rounded-3xl overflow-hidden shadow-md border">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202004/tanzania_connect/static/gold-mining.png"
                alt="Gold processing in Tanzania"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Tanzanite & Gemstones */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Gem className="h-5 w-5" />
            </div>
            <h2 className="text-3xl font-headline font-bold">Tanzanite & Gemstones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[250px] rounded-3xl overflow-hidden shadow-md border order-last md:order-first">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202050/tanzania_connect/static/tanzanite-mine.png"
                alt="Raw Tanzanite Crystal"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Tanzanite is a rare blue-violet gemstone found exclusively in a 7-kilometer strip near the Mererani Hills of Manyara Region, northern Tanzania.
              </p>
              <p>
                The government has constructed a wall around the Mererani mining area to control smuggling and monitor output. Gemstone sorting, cutting, and polishing must be performed domestically before export.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Strategic Minerals */}
        <section className="space-y-6">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Flame className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-headline font-bold">Strategic & Critical Minerals</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Tanzania is positioning itself as a hub for green energy minerals, with massive deposits of graphite (Lindi/Nachingu), lithium, and nickel (Kabanga Nickel project).
              </p>
              <p>
                These deposits attract global battery and automotive manufacturer partnerships, supporting local industrialization and battery-grade mineral processing plants.
              </p>
            </div>
            <div className="relative h-[250px] rounded-3xl overflow-hidden shadow-md border">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201991/tanzania_connect/static/diamond-mining.png"
                alt="Tanzanian mineral sorting facility"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <Card className="bg-primary/5 border-none rounded-[2.5rem] p-10 shadow-sm border border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                  <Landmark className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-headline font-bold">TMAA Regulatory & Royalties</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The mining industry is regulated by the <strong>Mining Commission</strong> and the <strong>Tanzania Mineral Audit Agency (TMAA)</strong>. Foreign entities must obtain either a Prospecting License (PL) or a Mining License (ML).
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Badge variant="secondary" className="shrink-0 h-fit">Royalty Rates</Badge>
                  <p className="text-sm">Royalties are set at <strong>6%</strong> for precious metals and gemstones, <strong>5%</strong> for uranium and coal, and <strong>3%</strong> for other industrial minerals.</p>
                </div>
                <div className="flex gap-4">
                  <Badge variant="secondary" className="shrink-0 h-fit">Local Content</Badge>
                  <p className="text-sm">Tanzanian law mandates a minimum 16% free-carried interest for the government in major mining ventures, plus local employee and supplier hiring requirements.</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-[2rem] shadow-sm flex flex-col justify-center space-y-4 border">
              <h4 className="font-bold text-primary flex items-center gap-2">
                <Info className="h-5 w-5" />
                Investment Note
              </h4>
              <p className="text-sm italic text-muted-foreground">
                "Joint ventures with local primary mining cooperatives (PML holders) are an excellent route for mid-sized operations to access licensed reserves quickly while satisfying local content targets."
              </p>
            </div>
          </div>
        </Card>

        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'TEAMA', full: 'Tanzania Mining Commission', url: 'https://www.tumetrans.go.tz', scope: 'Mining licenses' },
            { short: 'GST',   full: 'Geological Survey of Tanzania', url: 'https://www.gst.go.tz', scope: 'Mineral mapping', accent: 'serengeti' },
            { short: 'NEMC',  full: 'National Environment Management Council', url: 'https://www.nemc.or.tz', scope: 'Environmental audits', accent: 'acacia' },
            { short: 'TRA',   full: 'Tanzania Revenue Authority', url: 'https://www.tra.go.tz', scope: 'Royalty collection' },
            { short: 'NDC',   full: 'National Development Corporation', url: 'https://www.ndc.go.tz', scope: 'Joint ventures' },
          ]}
        />
      </main>
    </div>
  )
}

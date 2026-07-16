import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bus, Bike, Car, Train, Info, AlertTriangle, ArrowLeft, Zap, Key, MapPin } from "lucide-react"
import { MarqueeStrip } from "@/components/premium/marquee-strip"
import { RegulatorStrip } from "@/components/premium/regulator-strip"
import { SectorTypewriter } from "@/components/premium/sector-typewriter"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";

const meta = getSectorMeta("transport")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/transport",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/transport",
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

const transportOptions = [
  {
    type: "Dala-dala",
    icon: Bus,
    desc: "Small buses/vans that follow specific routes. The most common form of transport for the general population.",
    tips: "Always ask the 'Kondakta' (conductor) for the destination. Rates are standardized (usually 500-600 TZS for city routes).",
    safety: "Often very crowded. Keep a close eye on your belongings in 'vifaru' (congested areas).",
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    type: "Boda Boda",
    icon: Bike,
    desc: "Motorcycle taxis. The fastest way to beat Dar es Salaam's 'foleni' (traffic jam).",
    tips: "Essential for reaching places cars can't. Negotiate the price before the ride starts.",
    safety: "Carry high risk. Always insist on a helmet and avoid using them on high-speed expressways.",
    color: "bg-red-100 text-red-800"
  },
  {
    type: "Bolt / Uber",
    icon: Car,
    desc: "Popular ride-hailing apps available in Dar es Salaam, Arusha, and Mwanza.",
    tips: "Often more reliable for price transparency. You can select 'Bajaji' options within the app for cheaper short trips.",
    safety: "Verify the driver's face and car plate. Avoid taking off-app trips even if requested by the driver.",
    color: "bg-green-100 text-green-800"
  },
  {
    type: "Tuk-Tuk (Bajaji)",
    icon: Car,
    desc: "Three-wheeled vehicles. A safer and more comfortable alternative to motorcycles for short distances.",
    tips: "Excellent for carrying groceries or short commutes. They are surprisingly resilient on rough unpaved roads.",
    safety: "More stable than motorcycles but still open-sided; secure your bags towards the center of the seat.",
    color: "bg-tanzania-100 text-tanzania-800"
  }
]

const premiumTransport = [
  {
    title: "DART (Dar es Salaam Rapid Transit)",
    icon: Bus,
    content: "A world-class Bus Rapid Transit system featuring dedicated lanes that bypass Dar's notorious traffic. It connects the suburbs directly to the City Centre (Posta).",
    details: [
      "Smart Cards: You must purchase a 'DART Card' at the stations. Cash is not accepted on the buses.",
      "Efficiency: Reduces a 2-hour commute from Kimara to Posta to just 45 minutes.",
      "Routes: Primarily covers Morogoro Road, but phase 2 and 3 expansion is currently underway."
    ]
  },
  {
    title: "The EV Revolution",
    icon: Zap,
    content: "Tanzania is emerging as a regional leader in electric mobility, particularly in the two and three-wheeler segments to reduce carbon footprint.",
    details: [
      "E-Motorcycles: Companies like Spiro and Tri are rolling out battery-swapping stations across major cities.",
      "E-Buses: DART is currently trialing electric buses for cleaner urban mass transit.",
      "Charging: Infrastructure is currently focused on commercial swapping rather than private home-charging stations."
    ]
  },
  {
    title: "Car Rental & Self-Drive",
    icon: Key,
    content: "For those who prefer independence, renting a vehicle is possible but requires careful legal compliance.",
    details: [
      "Driver License: Foreigners can drive on a valid international license for up to 90 days. Beyond that, a local license is required.",
      "With Driver: Most experts prefer 'Car with Driver' rentals. This mitigates liability and avoids the stress of navigating complex local road rules.",
      "4x4 Requirement: If traveling outside Dar or Arusha, a 4WD vehicle is mandatory due to terrain conditions."
    ]
  }
]

export default function TransportPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-12">
        <MarqueeStrip
          caption="Live road, rail, port, air"
          items={[
              { label: 'TANROADS', value: "Roads" },
              { label: 'TAZARA', value: "Rail" },
              { label: 'TRL', value: "Freight" },
              { label: 'TPF', value: "Highway patrol" },
              { label: 'SUMATRA', value: "Regulator" },
              { label: 'TPA', value: "Port of Dar" },
              { label: 'ZMA', value: "Mtwara port" },
              { label: 'KAAWA', value: "Kigamboni ferry" },
            ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202051/tanzania_connect/static/transport-banner.jpg"
            alt="Tanzania Transport & Navigation"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania Roads and SGR"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Mobility & Navigation</Badge>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight break-words">
                Transport & Navigation
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">On the move:</span>
                <SectorTypewriter
                  sector="transport"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          From the historic &apos;Dala-dala&apos; culture to the modern &apos;DART&apos; system and the futuristic &apos;SGR&apos; rail, navigating Tanzania is a study in diversity.
        </p>

        {/* Regular Transport Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {transportOptions.map((opt) => (
            <Card key={opt.type} className="border-none shadow-lg rounded-[2.5rem] overflow-hidden flex flex-col bg-card">
              <CardHeader className="p-8 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${opt.color}`}>
                    <opt.icon className="h-7 w-7" />
                  </div>
                  <Badge variant="secondary" className="font-bold text-sm px-4">Local Mode</Badge>
                </div>
                <CardTitle className="text-2xl">{opt.type}</CardTitle>
                <CardDescription className="text-lg mt-2">{opt.desc}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-6 flex-1">
                <div className="p-4 bg-primary/5 rounded-2xl flex gap-4">
                  <Info className="h-6 w-6 text-primary shrink-0" />
                  <p className="text-md text-muted-foreground leading-relaxed">{opt.tips}</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-red-500 shrink-0" />
                  <p className="text-md font-medium text-red-900 dark:text-red-100 leading-relaxed">{opt.safety}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Premium & Specialized Infrastructure */}
        <div className="space-y-10">
          <h2 className="text-3xl font-headline font-bold text-primary border-b pb-4">Specialized Infrastructure</h2>
          {premiumTransport.map((item) => (
            <section key={item.title} className="group">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="h-16 w-16 rounded-2xl bg-card border shadow-xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-2xl font-headline font-bold mb-2">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="p-5 bg-card rounded-2xl border shadow-sm flex gap-4">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                        <p className="text-sm font-medium leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Inter-City SGR Callout */}
        <Card className="bg-primary/95 text-primary-foreground rounded-[3rem] p-8 md:p-10 shadow-2xl relative overflow-hidden border border-primary/20">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center shadow-lg">
                  <Train className="h-7 w-7 text-secondary-foreground" />
                </div>
                <h3 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">Inter-City: The SGR Train</h3>
              </div>
              <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed max-w-2xl">
                The Standard Gauge Railway is the most modern and comfortable link between Dar es Salaam, Morogoro, and Dodoma. Featuring First Class and Business Class cabins, it has revolutionized travel for experts and business visitors.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="border-secondary text-secondary font-bold text-xs py-1 px-4">DAR - DOM in 3.5 Hours</Badge>
                <Badge variant="outline" className="border-secondary text-secondary font-bold text-xs py-1 px-4">Electric Locomotives</Badge>
              </div>
            </div>
            <div className="lg:col-span-5 relative h-56 md:h-64 rounded-[2rem] overflow-hidden border border-white/10 shadow-xl bg-black/20">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202036/tanzania_connect/static/sgr-pic-user.jpg"
                alt="Modern Standard Gauge Railway (SGR) Electric Train in Tanzania"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 bg-white/5 rounded-full blur-3xl" />
        </Card>

        {/* Navigation Note */}
        <section className="bg-muted/30 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 border-2 border-dashed border-muted">
          <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-lg">
            <MapPin className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">Navigating Addressing</h4>
            <p className="text-muted-foreground leading-relaxed">
              Tanzania uses a descriptive addressing system. Most locations are found by referencing major landmarks (e.g., "Opposite the big Baobab tree" or "Near the Gapco Petrol Station"). Ensure you have local SIM data for Google Maps, as street names are rarely used in daily conversation.
            </p>
          </div>
        </section>
        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'TANROADS', full: 'Tanzania Roads Agency', url: 'https://www.tanroads.go.tz', scope: 'Trunk & regional roads' },
            { short: 'TAZARA', full: 'Tanzania-Zambia Railway', url: 'https://www.tazara.co.tz', scope: 'Cross-border rail', accent: 'serengeti' },
            { short: 'TRL', full: 'Tanzania Railways Ltd', url: 'https://www.trl.co.tz', scope: 'Domestic rail & freight' },
            { short: 'TPA', full: 'Tanzania Ports Authority', url: 'https://www.tpa.co.tz', scope: 'Port of Dar es Salaam', accent: 'zanzibar' },
            { short: 'ZMA', full: 'Zanzibar Maritime Authority', url: 'https://www.zma.go.tz', scope: 'Mtwara & Mkoani ports' },
            { short: 'SUMATRA', full: 'Surface & Marine Transport Reg. Auth.', url: 'https://www.sumatra.or.tz', scope: 'Transport licensing' },
            { short: 'TAA', full: 'Tanzania Airports Authority', url: 'https://www.taa.go.tz', scope: 'Aviation terminals' },
          ]}
        />
      </main>
    </div>
  )
}

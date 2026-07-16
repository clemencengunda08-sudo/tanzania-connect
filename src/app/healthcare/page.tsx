import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, Droplets, Pill, Info, HeartPulse, ArrowLeft, Building2, Landmark, Stethoscope, AlertCircle } from "lucide-react"
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

const SLUG = "healthcare";
const meta = getSectorMeta(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/healthcare",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/healthcare",
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

const healthTips = [
  {
    title: "Malaria Prevention",
    icon: ShieldAlert,
    content: "Tanzania is a malaria-endemic country. Use mosquito nets, repellent (DEET), and consult your doctor about prophylactic medication (Malarone/Doxycycline) before arrival. If you develop a fever, get a rapid test immediately.",
    severity: "High Priority"
  },
  {
    title: "Water Safety",
    icon: Droplets,
    content: "Do not drink tap water. Always use bottled or filtered/boiled water, even for brushing teeth. Ensure the seal on bottled water is intact when purchasing from street vendors.",
    severity: "Essential"
  },
  {
    title: "Vaccinations",
    icon: Pill,
    content: "Recommended: Yellow Fever (mandatory if coming from endemic zones), Hepatitis A & B, Typhoid, and Tetanus. Rabies is recommended for long-term stays or those working with animals.",
    severity: "Pre-Travel"
  }
]

const hospitalLevels = [
  {
    level: "National Referral Hospitals",
    desc: "The apex of the system. Muhimbili National Hospital (MNH) in Dar es Salaam is the primary facility for highly specialized treatment and complex surgeries.",
    examples: "Muhimbili National Hospital, Mloganzila"
  },
  {
    level: "Zonal Referral Hospitals",
    desc: "Large specialized hospitals serving specific geographical zones (North, West, South, Lake). Highly technical with modern diagnostic equipment.",
    examples: "KCMC (Moshi), Bugando (Mwanza), BMC (Mbeya)"
  },
  {
    level: "Regional & District Hospitals",
    desc: "Located in every regional capital and district. These handle common surgeries, maternity, and specialized outpatient care.",
    examples: "Mount Meru (Arusha), Temeke (Dar)"
  },
  {
    level: "Health Centers & Dispensaries",
    desc: "Primary care facilities. Dispensaries are the most basic unit (outpatient only), while Health Centers (Kituo cha Afya) may have a few beds and basic surgical capacity.",
    examples: "Local community clinics"
  }
]

export default function HealthcarePage() {
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
            name: "Healthcare",
            url: "https://www.tanzaniareach.com/healthcare",
          },
        ])}
      />
      {sectorFaqs[SLUG] && (
        <JsonLd data={faqSchema(sectorFaqs[SLUG])} />
      )}
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fade-in">
        <MarqueeStrip
          caption="Hospitals, regulators & insurance — at a glance"
          items={[
            { label: 'Muhimbili National', value: 'MNH' },
            { label: 'Bugando', value: 'Mwanza' },
            { label: 'KCMC', value: 'Moshi' },
            { label: 'Aga Khan', value: 'Dar' },
            { label: 'Jakaya Kikwete', value: 'Cardiac' },
            { label: 'Ocean Road', value: 'Oncology' },
            { label: 'NHIF', value: 'Insurance' },
            { label: 'TMDA', value: 'Regulation' },
          ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="/images/tanzania/healthcare-banner.jpg"
            alt="Tanzania Healthcare & Safety"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania Healthcare"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Health & Safety</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Healthcare & Safety
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">In your corner:</span>
                <SectorTypewriter
                  sector="healthcare"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          A comprehensive guide to navigating Tanzania&apos;s healthcare hierarchy, emergency response, and preventative measures.
        </p>

        {/* Quick Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {healthTips.map((tip) => (
            <Card key={tip.title} className="border-none shadow-md rounded-[2rem] flex flex-col bg-card">
              <CardHeader className="p-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-secondary/10 rounded-2xl">
                    <tip.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <Badge variant="outline" className="border-secondary text-secondary-foreground text-[10px]">{tip.severity}</Badge>
                </div>
                <CardTitle className="text-xl">{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1">
                <p className="text-muted-foreground leading-relaxed">{tip.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Public vs Private Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-headline font-bold text-primary">Public vs. Private Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-primary/5 p-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-card rounded-xl">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Private Hospitals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Preferred by most foreigners and experts for speed and comfort.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong>Efficiency:</strong> Shorter wait times and standardized administrative processes.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong>Cost:</strong> Higher fees; usually require upfront payment or pre-approved international insurance.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong>Key Names:</strong> Aga Khan Hospital, Oysterbay Hospital, Regency Medical Centre.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg rounded-[2.5rem] overflow-hidden">
              <CardHeader className="bg-tanzania-50/50 p-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-card rounded-xl">
                    <Landmark className="h-6 w-6 text-tanzania-600" />
                  </div>
                  <CardTitle className="text-2xl">Government Hospitals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <p className="text-muted-foreground leading-relaxed font-medium">
                  The backbone of national care with high technical expertise.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-tanzania-600 mt-2 shrink-0" />
                    <span><strong>Expertise:</strong> Often house the country's most senior specialists and specialized units (e.g., Jakaya Kikwete Cardiac Institute).</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-tanzania-600 mt-2 shrink-0" />
                    <span><strong>Crowds:</strong> Can be very busy; navigate via 'Private Wings' for a faster, albeit more expensive, experience.</span>
                  </li>
                  <li className="flex gap-3 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-tanzania-600 mt-2 shrink-0" />
                    <span><strong>Insurance:</strong> Primary providers for NHIF (National Health Insurance Fund) users.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Hierarchy Section */}
        <section className="bg-muted/30 p-10 rounded-[3rem] space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-headline font-bold">The Healthcare Hierarchy</h2>
            <p className="text-muted-foreground">Understanding the referral system is key to receiving the right level of care.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hospitalLevels.map((lvl, idx) => (
              <div key={idx} className="flex gap-6 items-start bg-card p-6 rounded-[2rem] shadow-sm">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Stethoscope className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold">{lvl.level}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{lvl.desc}</p>
                  <p className="text-xs font-bold text-primary italic">Examples: {lvl.examples}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance & Evacuation */}
        <Card className="border-primary/20 bg-primary/5 rounded-[2.5rem] p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg">
              <Info className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold">Medical Insurance & Evacuation</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Standard travel insurance may not cover all facilities. For serious issues, medical evacuation to Nairobi or Johannesburg is common. Ensure your policy includes specific <strong>Air Evacuation (AMREF Flying Doctors)</strong> membership, as this can be life-saving in remote areas.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-4 py-1">AMREF Flying Doctors</Badge>
                <Badge variant="secondary" className="px-4 py-1">Knight Support</Badge>
                <Badge variant="secondary" className="px-4 py-1">International SOS</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Emergency Call Action */}
        <div className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 rounded-[2.5rem] p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="relative">
            <HeartPulse className="h-20 w-20 text-red-500 shrink-0" />
            <AlertCircle className="absolute -top-2 -right-2 h-8 w-8 text-red-600 bg-card rounded-full" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-headline font-bold text-red-900 dark:text-red-100">In a Critical Emergency</h3>
            <p className="text-xl text-red-800 dark:text-red-200 leading-relaxed">
              Dial <strong>112</strong> for police or <strong>115</strong> for an ambulance. Note: Emergency response times vary significantly. For immediate trauma, a private taxi to the nearest <strong>International Hospital</strong> is often the fastest route.
            </p>
          </div>
        </div>

        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short:'MoH', full:'Ministry of Health Tanzania', url:'https://www.moh.go.tz', scope:'National health policy' },
            { short:'TMDA', full:'Tanzania Medicines & Medical Devices Authority', url:'https://www.tmda.go.tz', scope:'Drug & device safety' },
            { short:'NHIF', full:'National Health Insurance Fund', url:'https://www.nhif.or.tz', scope:'Universal health coverage' },
            { short:'MUHAS', full:'Muhimbili University of Health & Allied Sciences', url:'https://www.muhas.ac.tz', scope:'Tertiary teaching' },
            { short:'NIMR', full:'National Institute for Medical Research', url:'https://www.nimr.or.tz', scope:'Health research' },
            { short:'AMREF', full:'African Medical & Research Foundation', url:'https://amref.org', scope:'Community health' },
          ]}
        />
      </main>
    </div>
  )
}

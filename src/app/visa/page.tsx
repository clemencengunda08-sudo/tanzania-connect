import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Landmark, ShieldCheck, FileText, Activity, ArrowLeft, Users, Briefcase, Scale, HelpCircle } from "lucide-react"
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

const SLUG = "immigration";
const meta = getSectorMeta(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/visa",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/visa",
    siteName: "Tanzania Reach",
    title: meta.ogTitle,
    description: meta.ogDescription,
    locale: "en_US",
    images: [{ url: "https://www.tanzaniareach.com/og-image.png", width: 1200, height: 630 }],
  },
};

const immigrationSections = [
  {
    title: "The e-Visa Framework",
    icon: FileText,
    content: "Tanzania's primary entry mechanism for tourists and business visitors. Applications must be submitted via the official portal (immigration.go.tz).",
    details: [
      "Standard Visa ($50): Single entry, valid for 90 days.",
      "Multiple Entry ($100): Valid for 12 months with 90-day stays.",
      "Business Visa ($250): For meetings or short assignments (max 90 days).",
      "Processing Time: Typically 10-14 days."
    ]
  },
  {
    title: "Residence Permits",
    icon: Landmark,
    content: "Mandatory for anyone staying longer than 90 days. Managed by the Immigration Department.",
    details: [
      "Class A: For self-employed investors ($250k+ investment).",
      "Class B: For employed professional experts.",
      "Class C: For students, volunteers, and retirees.",
      "Validity: Usually issued for 2 years, renewable."
    ]
  }
]

export default function VisaPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={sectorArticleSchema({ slug: SLUG, title: meta.title, description: meta.description })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: "https://www.tanzaniareach.com" }, { name: "Immigration", url: "https://www.tanzaniareach.com/visa" }])} />
      {sectorFaqs[SLUG] && <JsonLd data={faqSchema(sectorFaqs[SLUG])} />}
      
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fade-in">
        <MarqueeStrip
          caption="Live immigration status"
          items={[
            { label: 'eVisa Portal', value: 'Online' },
            { label: 'Class A Work', value: 'Class A' },
            { label: 'Class B Investor', value: 'Class B' },
            { label: 'Class C Residence', value: 'Class C' },
            { label: 'Class D Student', value: 'Class D' },
            { label: 'Multi-Entry', value: '2 Years' },
            { label: 'Border Posts', value: '32 Points' },
            { label: 'KIA Arrivals', value: '~24h' },
            { label: 'JNIA Terminal 3', value: 'International' },
          ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202052/tanzania_connect/static/zanzibar-beach.jpg"
            alt="Tanzania Immigration & Entry"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania Border"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Legal & Status</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Immigration & Entry
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">Your pathway:</span>
                <SectorTypewriter
                  sector="visa"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {immigrationSections.map((section) => (
            <section key={section.title} className="group">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="h-16 w-16 rounded-2xl glass-card flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                  <section.icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-4">{section.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.details.map((detail, idx) => (
                      <Card key={idx} className="glass-card p-6 border-none shadow-sm flex gap-4">
                        <div className="h-1 w-6 bg-primary/30 rounded-full mb-3 shrink-0 mt-2" />
                        <p className="text-sm font-medium leading-relaxed">{detail}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* FAQ Section for AI Overview */}
        <section className="space-y-8 bg-muted/30 p-10 rounded-[3rem]">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-headline font-bold uppercase tracking-tight">Expert Q&A</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectorFaqs[SLUG]?.map((faq, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-lg font-bold text-foreground">Q: {faq.question}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary text-white rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <Badge className="bg-white/20 text-white border-white/20">Critical Alert</Badge>
            <h3 className="text-3xl md:text-4xl font-headline font-bold">The 'Tourist Visa' Compliance</h3>
            <p className="text-lg opacity-80 leading-relaxed">
              Conducting business or professional work on a standard Tourist Visa is a serious offense in Tanzania. Ensure you have a <strong className="font-semibold text-tanzania-300">Business Visa</strong> or a valid <strong className="font-semibold text-tanzania-300">Work Permit</strong>.
            </p>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 bg-white/5 rounded-full blur-3xl" />
        </section>

        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'TID',   full: 'Tanzania Immigration Department',       scope: 'Entry permits & residence',        url: 'https://www.immigration.go.tz', accent: 'kilimanjaro' },
            { short: 'MoHA',  full: 'Ministry of Home Affairs',             scope: 'Class A/B/C classification',        url: 'https://www.moha.go.tz' },
            { short: 'TIRA',  full: 'Tanzania Insurance Regulatory Authority', scope: 'Travel insurance compliance',    url: 'https://www.tira.go.tz' },
            { short: 'eVisa', full: 'Tanzania eVisa Portal',                scope: 'Online application',               url: 'https://visa.immigration.go.tz', accent: 'zanzibar' },
            { short: 'NIDA',  full: 'National Identification Authority',    scope: 'Resident ID',                       url: 'https://www.nida.go.tz' },
            { short: 'MoFA',  full: 'Ministry of Foreign Affairs',          scope: 'Diplomatic protocols',             url: 'https://www.foreign.go.tz' },
          ]}
        />
      </main>
    </div>
  )
}

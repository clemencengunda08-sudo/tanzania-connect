import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Banknote, Building, CreditCard, ArrowLeft, Landmark, Network, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

const SLUG = "banking";
const meta = getSectorMeta(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/banking",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/banking",
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

const bankingSections = [
  {
    title: "Major Banking Institutions",
    icon: Building,
    content: "Tanzania's banking sector is divided between local giants and international private banks. Local giants like CRDB and NMB have the most extensive branch networks, while international banks like Standard Chartered, Absa, and Stanbic cater more to corporate and high-net-worth clients.",
    details: [
      { label: "NMB Bank", desc: "The largest network in the country with over 220+ branches. Best for rural accessibility." },
      { label: "CRDB Bank", desc: "The largest bank by assets. Highly innovative with excellent digital services." },
      { label: "Stanbic / Absa", desc: "Preferred by many foreigners for international transfers and corporate banking." }
    ]
  },
  {
    title: "Sim-Banking & Mobile Apps",
    icon: Smartphone,
    content: "Almost every major bank offers 'Sim-Banking'. This is a mobile app (or USSD code *150#) that allows you to manage your account, pay bills, and—most importantly—move money between your bank account and your Mobile Money (M-Pesa/Tigo Pesa) instantly.",
    details: [
      { label: "Integration", desc: "Allows seamless transfers to any mobile number in Tanzania." },
      { label: "USSD Codes", desc: "Works even without internet using GSM codes (e.g., *150*00# for CRDB)." },
      { label: "24/7 Access", desc: "Queue-free utility payments and airtime top-ups." }
    ]
  },
  {
    title: "The 'Wakala' System",
    icon: Network,
    content: "Instead of searching for branches or ATMs, look for 'Wakala' (Agency Banking) signs at small shops. These are authorized agents for banks like CRDB and NMB where you can deposit or withdraw cash using your card or mobile app.",
    details: [
      { label: "Ubiquity", desc: "Available in almost every street corner and remote village." },
      { label: "Deposits", desc: "Instant cash deposits into your account via the agent." },
      { label: "Efficiency", desc: "Faster than visiting a branch for simple cash transactions." }
    ]
  }
]

export default function BankingPage() {
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
            name: "Banking",
            url: "https://www.tanzaniareach.com/banking",
          },
        ])}
      />
      {sectorFaqs[SLUG] && (
        <JsonLd data={faqSchema(sectorFaqs[SLUG])} />
      )}
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fade-in">
        <MarqueeStrip
          caption="Live banking network"
          items={[
            { label: 'NMB Bank', value: 'Listed' },
            { label: 'CRDB Bank', value: 'Listed' },
            { label: 'NBC Holdings', value: 'Listed' },
            { label: 'KCB Tanzania', value: 'Subsidiary' },
            { label: 'Standard Chartered', value: 'Foreign' },
            { label: 'Equity Bank', value: 'Foreign' },
            { label: 'Absa Bank', value: 'Foreign' },
            { label: 'Exim Bank', value: 'Local' },
            { label: 'TPB Bank', value: 'Local' },
          ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="/images/tanzania/banking.jpg"
            alt="Tanzania Financial Sector"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania Finance"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Financial Hub</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Banking & Finance
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">Trusted by:</span>
                <SectorTypewriter
                  sector="banking"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Currency Alert */}
        <Card className="bg-orange-50 border-orange-200 rounded-[2.5rem] p-8 md:p-10 border-2">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="h-16 w-16 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-200">
              <Banknote className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-headline font-bold text-orange-950 text-center md:text-left">The USD Note Policy</h3>
              <p className="text-lg text-orange-900 leading-relaxed text-center md:text-left">
                Tanzanian banks and bureaus <strong>strictly reject</strong> US Dollar notes printed before <strong>2006</strong>. Notes must be crisp, un-marked, and un-torn. Larger denominations ($50, $100) receive a significantly better exchange rate than smaller notes.
              </p>
            </div>
          </div>
        </Card>

        {/* Main Sections */}
        <div className="grid grid-cols-1 gap-10">
          {bankingSections.map((section) => (
            <Card key={section.title} className="border-none shadow-xl rounded-[3rem] overflow-hidden bg-card">
              <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="p-10 lg:p-12 lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                      <section.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-headline font-bold">{section.title}</h2>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {section.details.map((detail) => (
                      <div key={detail.label} className="space-y-1">
                        <p className="font-bold text-primary">{detail.label}</p>
                        <p className="text-sm text-muted-foreground">{detail.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-muted/30 p-10 lg:p-12 flex flex-col justify-center space-y-6 border-l">
                  <h4 className="font-bold text-xl flex items-center gap-2">
                    <Zap className="h-5 w-5 text-secondary-foreground" />
                    Expert Insight
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "For most foreigners, opening a CRDB or NMB account is a game-changer. It unlocks the ability to pay for everything from government fees to local groceries via your phone, bypassing the need for physical cash."
                  </p>
                  <Badge className="bg-primary text-white w-fit px-4 py-1">Resident Tip</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* ATM & Limits */}
        <section className="bg-primary/5 p-12 rounded-[3rem] border border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-primary" />
              ATM Logistics
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Standard withdrawal limits at ATMs range from <strong>400,000 TZS</strong> to <strong>1,000,000 TZS</strong> per transaction. Visa and Mastercard are widely supported. Ensure your bank knows you are in Tanzania to avoid security blocks.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Landmark className="h-6 w-6 text-primary" />
              Opening an Account
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To open a local account as a foreigner, you generally need:
              <br />• Valid Passport
              <br />• Residence Permit (Class A, B, or C)
              <br />• TIN Certificate (Taxpayer Identification Number)
              <br />• Two passport-sized photos
            </p>
          </div>
        </section>

        <RegulatorStrip
          caption="Regulated by"
          regulators={[
            { short: 'BoT',  full: 'Bank of Tanzania',                          scope: 'Central bank & monetary policy', url: 'https://www.bot.go.tz', accent: 'serengeti' },
            { short: 'DSE',  full: 'Dar es Salaam Stock Exchange',              scope: 'Capital markets',                url: 'https://www.dse.co.tz', accent: 'acacia' },
            { short: 'CMSA', full: 'Capital Markets & Securities Authority',    scope: 'Securities oversight',           url: 'https://www.cmsa.go.tz' },
            { short: 'TIRA', full: 'Tanzania Insurance Regulatory Authority',   scope: 'Insurance sector',               url: 'https://www.tira.go.tz' },
            { short: 'TPF',  full: 'Tanzania Pension Fund',                     scope: 'Pensions & retirement',          url: 'https://www.psspf.go.tz', accent: 'baobab' },
            { short: 'NHC',  full: 'National Housing Corporation',              scope: 'Mortgage finance',              url: 'https://www.nhc.co.tz' },
          ]}
        />
      </main>
    </div>
  )
}

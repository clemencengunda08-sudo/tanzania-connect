import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Percent, Landmark, Gavel, ArrowLeft, ShieldCheck, FileText, Landmark as Treasury, Briefcase } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";
import { MarqueeStrip } from "@/components/premium/marquee-strip";
import { RegulatorStrip } from "@/components/premium/regulator-strip";
import { SectorTypewriter } from "@/components/premium/sector-typewriter";

const meta = getSectorMeta("legal")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/corporate",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/corporate",
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

const corporateSteps = [
  {
    title: "Entity Registration (BRELA)",
    icon: Building2,
    content: "All business entities must register through the Business Registrations and Licensing Agency (BRELA) via the Online Registration System (ORS). Foreigners typically choose between two routes:",
    details: [
      "Local Subsidiary: A limited liability company incorporated in Tanzania. Minimum 2 shareholders.",
      "Branch Office: Registration of a foreign company (Certificate of Compliance). Requires a resident representative.",
      "Memorandum & Articles: All companies must submit 'MEMARTS' defining their business scope and internal regulations."
    ]
  },
  {
    title: "Taxation & TRA Compliance",
    icon: Percent,
    content: "The Tanzania Revenue Authority (TRA) oversees the fiscal regime. Registration for a Taxpayer Identification Number (TIN) is mandatory within 15 days of incorporation.",
    details: [
      "Corporate Tax: Standard rate is 30% on global income for residents, and Tanzanian-source income for non-residents.",
      "VAT (Value Added Tax): 18% rate. Registration is mandatory if annual turnover exceeds 100 Million TZS.",
      "EFD Machines: All VAT-registered businesses must use Electronic Fiscal Devices to issue government-verified receipts.",
      "Withholding Tax: 10% on dividends and rent; 15% on professional/technical services and interest."
    ]
  },
  {
    title: "Investment Centres (TIC & ZIPA)",
    icon: Treasury,
    content: "For significant projects, registering with the Tanzania Investment Centre (TIC) or Zanzibar Investment Promotion Authority (ZIPA) is crucial for fiscal incentives.",
    details: [
      "Minimum Investment: $500,000 for foreigners in Mainland (TIC) and $300,000 in Zanzibar (ZIPA).",
      "Derivative Rights: TIC facilitates 33, 66, or 99-year land leases for foreign investors who cannot own land outright.",
      "Fiscal Incentives: 0% import duty on capital goods; 100% capital allowance; VAT deferment on project capital goods.",
      "One-Stop Shop: TIC provides expedited licensing, visas, and permits from multiple government agencies in one office."
    ]
  },
  {
    title: "Labor, Permits & Social Security",
    icon: Gavel,
    content: "The Ministry of Labor and Immigration Dept manage work permits. Tanzania has a strict policy to ensure locals are prioritized for jobs.",
    details: [
      "Work Permit Class A: For self-employed investors (TIC certificate holders get automatic quotas).",
      "Work Permit Class B: For experts/employees. Requires evidence that the skill is not available in the local market.",
      "NSSF & WCF: Employers must pay 10% to the Social Security Fund (NSSF) and 0.5% - 1% to the Workers Compensation Fund.",
      "SDL: A 4% Skills Development Levy is charged on the gross payroll of companies with 10 or more employees."
    ]
  }
]

const sectoralLicenses = [
  { sector: "Tourism", body: "TALA", desc: "Mandatory for hotels, tour operators, and travel agents." },
  { sector: "Mining", body: "Mining Commission", desc: "Required for exploration (PL), mining (ML), and primary mining (PML)." },
  { sector: "Telecomm", body: "TCRA", desc: "Regulates all electronic communication and postal services." },
  { sector: "Energy", body: "EWURA", desc: "Regulates electricity, petroleum, and natural gas sectors." },
]

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fade-in">
        <MarqueeStrip
            caption="Live corporate & regulatory"
            items={[
              { label: 'BRELA', value: 'Registration' },
              { label: 'TIC',   value: 'Investment' },
              { label: 'EPZA',  value: 'Free Zones' },
              { label: 'TRA',   value: 'TIN/VAT' },
              { label: 'NSSF',  value: 'Pension' },
              { label: 'NHIF',  value: 'Health' },
              { label: 'LCT',   value: 'Labour' },
              { label: 'NEEC',  value: 'Environment' },
            ]}
            speed={2}
          />


          <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
            <Image
              src="/images/tanzania/corporate.jpg"
              alt="Tanzania Corporate & Regulatory"
              fill
              priority
              fetchPriority="high"
              className="object-cover"
              sizes="100vw"
              quality={85}
              data-ai-hint="Tanzania Business"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
              <div className="space-y-4">
                <Badge className="bg-secondary text-secondary-foreground font-bold">B2B & Investment</Badge>
                <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                  Corporate & Regulatory
                </h1>
                <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                  <span className="font-semibold tracking-wide">Powered by:</span>
                  <SectorTypewriter
                    sector="corporate"
                    className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                    textClassName="text-tanzania-300"
                    caretClassName="bg-tanzania-300"
                  />
                </div>
              </div>
            </div>
          </div>

        <div className="grid grid-cols-1 gap-12">
          {corporateSteps.map((step) => (
            <section key={step.title} className="group">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="h-16 w-16 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-2">{step.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.content}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {step.details.map((detail, idx) => (
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

        <section className="space-y-8">
          <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-primary" />
            Sectoral Licensing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectoralLicenses.map((item) => (
              <Card key={item.sector} className="border-none shadow-md rounded-[2rem] bg-card overflow-hidden">
                <CardHeader className="bg-muted/50 pb-4">
                  <CardTitle className="text-lg text-primary">{item.sector}</CardTitle>
                  <p className="text-xs font-bold opacity-60">Regulator: {item.body}</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="bg-primary text-white rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-headline font-bold">Investor Mandatory Checklist</h3>
              <p className="text-lg opacity-80">Before starting operations, ensure you have secured the following credentials.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {[
                { title: "Incorporation", detail: "BRELA Certificate" },
                { title: "Tax Status", detail: "TRA TIN & VAT Certificate" },
                { title: "Tax Clearance", detail: "Annual TRA Clearance" },
                { title: "Licensing", detail: "Local Business License" },
                { title: "Work Permits", detail: "Class A or B Permits" },
                { title: "Social Security", detail: "NSSF & WCF Numbers" },
                { title: "Safety", detail: "OSHA Compliance Certificate" },
                { title: "Incentives", detail: "TIC/ZIPA Certificate" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="text-lg font-medium">{item.title}</span>
                  <Badge className="bg-secondary text-secondary-foreground font-black">{item.detail}</Badge>
                </div>
              ))}
            </div>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 bg-white/5 rounded-full blur-3xl" />
        </Card>

        <section className="bg-muted/30 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 border-2 border-dashed border-muted">
          <div className="h-16 w-16 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-lg">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-bold">The 'Right-to-Work' Compliance</h4>
            <p className="text-muted-foreground leading-relaxed">
              Tanzania operates on a "One-for-Five" rule for foreign entities: For every foreign expert employed (Work Permit Class B), the company must demonstrate a clear plan to train five Tanzanian understudies for that specific role over time.
            </p>
          </div>
        </section>

        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'BRELA', full: 'Business Registrations & Licensing Agency', url: 'https://www.brela.go.tz', scope: 'Company registration',    accent: 'serengeti' },
            { short: 'TIC',   full: 'Tanzania Investment Centre',                url: 'https://www.tic.go.tz',   scope: 'Investment certificates', accent: 'acacia' },
            { short: 'EPZA',  full: 'Export Processing Zones Authority',         url: 'https://www.epza.go.tz',   scope: 'Free zones & SEZ',        accent: 'baobab' },
            { short: 'TRA',   full: 'Tanzania Revenue Authority',                url: 'https://www.tra.go.tz',   scope: 'Tax & TIN' },
            { short: 'CMSA',  full: 'Capital Markets & Securities Authority',    url: 'https://www.cmsa.go.tz',  scope: 'Securities' },
            { short: 'EWURA', full: 'Energy & Water Utilities Regulatory Authority', url: 'https://www.ewura.go.tz', scope: 'Utilities',         accent: 'kilimanjaro' },
          ]}
        />
      </main>
    </div>
  )
}

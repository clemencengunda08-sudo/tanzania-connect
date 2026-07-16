import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Globe, Shield, Heart, Landmark, ArrowLeft, Briefcase, Compass, Zap, Building2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";

const meta = getSectorMeta("directory")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/directory",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/directory",
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

const contacts = [
  {
    category: "Emergency Services",
    icon: Shield,
    items: [
      { name: "Police Emergency", tel: "112", icon: Phone, detail: "Toll-free national line" },
      { name: "Medical / Ambulance", tel: "115", icon: Phone, detail: "Emergency medical response" },
      { name: "Fire Department", tel: "114", icon: Phone, detail: "Fire emergencies" },
    ],
    color: "border-red-500 bg-red-50/50 dark:bg-red-950/10"
  },
  {
    category: "Investment & Business Authorities",
    icon: Briefcase,
    items: [
      { name: "TIC — Tanzania Investment Centre", tel: "+255 22 211 6328", detail: "Dar es Salaam HQ - Investment facilitation & derivative land rights", web: "www.tic.go.tz" },
      { name: "BRELA — Business Registrations Agency", tel: "+255 22 221 2800", detail: "Dar es Salaam - Company incorporation & business licensing", web: "www.brela.go.tz" },
      { name: "TRA — Revenue Authority Toll-Free", tel: "+255 800 780 078", detail: "National - Taxpayer registration, TIN issuance & customs", web: "www.tra.go.tz" },
      { name: "ZIPA — Zanzibar Investment Authority", tel: "+255 24 223 3026", detail: "Zanzibar - Investment promotions & offshore licenses", web: "www.zipa.go.tz" },
      { name: "TIC Zanzibar Branch Desk", tel: "+255 24 223 3712", detail: "Zanzibar - Coordination & facilitation of mainland projects", web: "www.tic.go.tz" },
    ],
    color: "border-amber-500 bg-amber-50/50 dark:bg-amber-950/10"
  },
  {
    category: "Travel & Immigration Authorities",
    icon: Compass,
    items: [
      { name: "Immigration Department HQ", tel: "+255 26 232 4645", detail: "Dodoma - Visas, residence & student permit clearances", web: "www.immigration.go.tz" },
      { name: "Labor Department (PMO-LYED)", tel: "+255 22 211 7266", detail: "Dar es Salaam/Dodoma - Work permits & employee clearances", web: "www.kazi.go.tz" },
      { name: "Julius Nyerere Int'l Airport (JNIA)", tel: "+255 22 284 2400", detail: "Dar es Salaam - Main entry airport customer service", web: "www.taa.go.tz" },
      { name: "Kilimanjaro Int'l Airport (KIA)", tel: "+255 27 255 4252", detail: "Northern Circuit - Tourist and charter flights coordination", web: "www.kadco.co.tz" },
    ],
    color: "border-blue-500 bg-blue-50/50 dark:bg-blue-950/10"
  },
  {
    category: "Infrastructure & Utilities",
    icon: Zap,
    items: [
      { name: "TANESCO — National Electricity Emergency", tel: "951", detail: "National - Power outage & emergency reporting", web: "www.tanesco.co.tz" },
      { name: "TANESCO HQ Dodoma", tel: "+255 22 219 4400", detail: "Dodoma - Commercial and industrial power applications", web: "www.tanesco.co.tz" },
      { name: "DAWASA — Dar es Salaam Water Supply", tel: "+255 800 110 064", detail: "Dar es Salaam - Toll-free water connections & leaks reporting", web: "www.dawasa.go.tz" },
      { name: "TCRA — Telecoms & Internet Regulator", tel: "+255 22 219 9760", detail: "Dar es Salaam - Telecom spectrum & digital licensing", web: "www.tcra.go.tz" },
    ],
    color: "border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/10"
  },
  {
    category: "Business Associations & Chambers",
    icon: Building2,
    items: [
      { name: "TPSF — Tanzania Private Sector Foundation", tel: "+255 22 212 9433", detail: "Dar es Salaam - Umbrella private sector advocacy body", web: "www.tpsf.or.tz" },
      { name: "TCCIA — Chamber of Commerce & Agriculture", tel: "+255 22 211 9436", detail: "National - Export certificates of origin & trade disputes", web: "www.tccia.com" },
      { name: "AmCham — American Chamber of Commerce", tel: "+255 784 616 111", detail: "Dar es Salaam - US-Tanzania bilateral business network", web: "www.amcham.co.tz" },
      { name: "ZATI — Zanzibar Tourism Investors Association", tel: "+255 24 223 3712", detail: "Zanzibar - Private advocacy body for hospitality investors", web: "www.zati.or.tz" },
    ],
    color: "border-purple-500 bg-purple-50/50 dark:bg-purple-950/10"
  },
  {
    category: "Embassies & High Commissions",
    icon: Landmark,
    items: [
      { name: "USA Embassy", tel: "+255 22 229 4000", detail: "Dar es Salaam - Slipway Road, Masaki", web: "tz.usembassy.gov" },
      { name: "UK High Commission", tel: "+255 22 229 0000", detail: "Dar es Salaam - Umoja House", web: "gov.uk/world/tanzania" },
      { name: "EU Delegation", tel: "+255 22 216 4500", detail: "Dar es Salaam - Umoja House", web: "eeas.europa.eu/tanzania" },
      { name: "Chinese Embassy", tel: "+255 22 266 8080", detail: "Dar es Salaam - Kajifikiri Road", web: "tz.china-embassy.gov.cn" },
      { name: "Indian High Commission", tel: "+255 22 211 5171", detail: "Dar es Salaam - Shaaban Robert St", web: "hcidar.gov.in" },
      { name: "Kenyan High Commission", tel: "+255 22 211 3055", detail: "Dar es Salaam - Kijitonyama", web: "dar-es-salaam.highcommission.go.ke" },
      { name: "German Embassy", tel: "+255 22 211 7409", detail: "Dar es Salaam - Umoja House", web: "daressalam.diplo.de" },
    ],
    color: "border-tanzania-500 bg-tanzania-50/50 dark:bg-tanzania-950/10"
  },
  {
    category: "Hospital Facilities",
    icon: Heart,
    items: [
      { name: "Aga Khan Hospital", tel: "+255 22 211 5151", detail: "Dar es Salaam - Ocean Road, International Standard", web: "www.agakhanhospitals.org" },
      { name: "Arusha Lutheran Medical Center", tel: "+255 27 254 8030", detail: "Arusha City - Suye Road", web: "www.almc.or.tz" },
      { name: "KCMC Hospital", tel: "+255 27 275 4377", detail: "Moshi - Kilimanjaro Region, Referral Center", web: "www.kcmc.ac.tz" },
    ],
    color: "border-green-500 bg-green-50/50 dark:bg-green-950/10"
  }
]

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-4xl mx-auto space-y-12">
        

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Contacts Directory</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Essential support and emergency contacts for foreigners in Tanzania.
          </p>
        </div>

        <div className="grid gap-12">
          {contacts.map((section) => (
            <section key={section.category} className="space-y-6">
              <div className="flex items-center gap-4 border-b pb-4">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <section.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-headline text-3xl font-bold">{section.category}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item: any) => (
                  <Card key={item.name} className={`border-l-[6px] shadow-sm rounded-2xl ${section.color} bg-card`}>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription className="text-md">{item.detail}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 font-black text-2xl text-primary">
                        <Phone className="h-5 w-5" />
                        {item.tel}
                      </div>
                      {item.web && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground font-medium">
                          <Globe className="h-4 w-4" />
                          {item.web}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flag, Heart, History, Map, ArrowLeft, Languages, Music, Landmark, Sparkles } from "lucide-react"
import { MarqueeStrip } from "@/components/premium/marquee-strip"
import { RegulatorStrip } from "@/components/premium/regulator-strip"
import { SectorTypewriter } from "@/components/premium/sector-typewriter"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";

const meta = getSectorMeta("culture")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/culture",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/culture",
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

const cultureInsights = [
  {
    title: "The Birth of a Nation (1964)",
    icon: Flag,
    content: "The United Republic of Tanzania was forged through the historic Union of Tanganyika and Zanzibar on April 26, 1964. Spearheaded by Mwalimu Julius Nyerere and Abeid Amani Karume, this merger remains one of Africa's most successful and stable examples of national unification. It created a unique dual-government system that balances the interests of the mainland and the semi-autonomous islands of Zanzibar.",
    details: ["Union Day: April 26th", "Founding Fathers: Nyerere & Karume", "System: Semi-autonomous Zanzibar Government"]
  },
  {
    title: "The Philosophy of Ujamaa",
    icon: Heart,
    content: "Central to the Tanzanian identity is 'Ujamaa' (African Socialism or Familyhood). Introduced by Nyerere in the Arusha Declaration of 1967, it prioritized self-reliance, rural development, and national unity over tribalism. While the economic structures moved toward a market economy in the 1980s, the social ethos of 'Utu' (humanity) and the absence of ethnic conflict are the direct results of this philosophy.",
    details: ["Emphasis on Swahili as a national language", "Abolishment of chiefdoms for national unity", "Collective community development"]
  },
  {
    title: "The Cradle of Mankind",
    icon: History,
    content: "Tanzania holds a unique position in global history. The Olduvai Gorge and the Laetoli footprints in the Ngorongoro Conservation Area provide evidence of human ancestors dating back over 3.6 million years. These sites, famously explored by the Leakey family, are critical to our understanding of human evolution and have earned the region its title as the 'Cradle of Mankind'.",
    details: ["Olduvai Gorge: 'The Grand Canyon of Evolution'", "Laetoli Footprints: Earliest evidence of bipedalism", "UNESCO World Heritage Status"]
  },
  {
    title: "Swahili: The Unifying Thread",
    icon: Languages,
    content: "Kiswahili is more than a language; it is the soul of the nation. Originating from the interaction between coastal Bantu speakers and Arab traders, it was elevated by Nyerere to be the primary language of administration and education. This strategic move successfully neutralized tribal divisions, making Tanzania one of the few African nations with a single, universally spoken indigenous language.",
    details: ["Bantu foundation with Arabic/Persian influences", "Official language of the EAC and AU", "Symbol of Pan-Africanism"]
  }
]

const artisticHeritage = [
  {
    name: "Makonde Carving",
    desc: "Intricate ebony wood carvings from the Makonde people, famous for 'Ujamaa' (life trees) and 'Shetani' (spirit) figures.",
    icon: Sparkles
  },
  {
    name: "Tingatinga Art",
    desc: "A vibrant, colorful style of painting originating in Dar es Salaam, characterized by stylized animals and village life.",
    icon: Sparkles
  },
  {
    name: "Taarab & Bongo Flava",
    desc: "From the poetic, orchestral Taarab of Zanzibar to the modern global phenomenon of Bongo Flava (Tz-Pop).",
    icon: Music
  }
]

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-16">
        <MarqueeStrip
          caption="Live from the heritage & arts sector"
          items={[
              { label: 'BASATA', value: "Arts council" },
              { label: 'BACT', value: "Copyright" },
              { label: 'MNH', value: "National Museum" },
              { label: 'UNESCO', value: "Heritage" },
              { label: 'MOT', value: "Tourism" },
              { label: 'COSOTA', value: "Society" },
            ]}
          speed={2}
        />


        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201984/tanzania_connect/static/culture-banner.jpg"
            alt="Tanzania Culture & History"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="Tanzania Savannah Culture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">National Heritage</Badge>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight break-words">
                Culture & History
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">Heritage & Philosophy:</span>
                <SectorTypewriter
                  sector="culture"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          A comprehensive guide to the foundations of the United Republic—from the dawn of humanity to the modern philosophy of national unity.
        </p>

        <div className="grid grid-cols-1 gap-16">
          {cultureInsights.map((item, idx) => (
            <section key={item.title} className="group">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="h-24 w-24 rounded-[2.5rem] bg-secondary/10 flex items-center justify-center shrink-0 shadow-sm group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-500">
                  <item.icon className="h-10 w-10 text-secondary-foreground" />
                </div>
                <div className="space-y-6 flex-1">
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-4">{item.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {item.details.map((detail, dIdx) => (
                      <Badge key={dIdx} variant="outline" className="bg-card border-primary/10 text-primary py-1.5 px-4 rounded-xl">
                        {detail}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Artistic & Musical Expression</h2>
            <p className="text-muted-foreground">Tanzania's creativity is a reflection of its diverse heritage and its forward-looking youth culture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisticHeritage.map((art) => (
              <div key={art.name} className="bg-card p-8 rounded-[2.5rem] shadow-sm border border-primary/5 space-y-4 hover:shadow-md hover:border-primary/20 transition-all">
                <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                  <art.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{art.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{art.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Card className="bg-primary text-white rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <Map className="h-20 w-20 opacity-20 shrink-0" />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Religious Harmony: A National Pride</h3>
              <p className="text-lg opacity-80 leading-relaxed">
                Tanzania is a global model for inter-faith tolerance. With a population roughly divided between Christianity and Islam, the nation has avoided the religious conflicts seen elsewhere. This is achieved through strict separation of religion from state affairs and the observance of both Christian and Islamic holidays as national events, fostering a culture of mutual respect and integration.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 bg-white/5 rounded-full blur-3xl" />
        </Card>
        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short: 'BASATA', full: 'Arts Council of Tanzania', url: 'https://www.basata.go.tz', scope: 'Arts & culture licensing' },
            { short: 'BACT', full: 'Board of Copyright of Tanzania', url: 'https://www.copyright.go.tz', scope: 'Copyright & royalties', accent: 'serengeti' },
            { short: 'MNH', full: 'National Museum of Tanzania', url: 'https://www.museums.or.tz', scope: 'Heritage collections' },
            { short: 'UNESCO', full: 'UNESCO Tanzania', url: 'https://www.unesco.org', scope: 'World heritage sites' },
            { short: 'MOT', full: 'Ministry of Tourism & Natural Resources', url: 'https://www.maliasili.go.tz', scope: 'Cultural tourism' },
            { short: 'TBC', full: 'Tanzania Broadcasting Corporation', url: 'https://www.tbc.go.tz', scope: 'Public broadcasting', accent: 'acacia' },
          ]}
        />
      </main>
    </div>
  )
}

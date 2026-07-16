import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Trophy, Tv, PartyPopper, ArrowLeft, Disc, Mic2, Star, Users2, Landmark, Video, Smile } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";
import Image from "next/image";

const meta = getSectorMeta("entertainment")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/entertainment",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/entertainment",
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

const entertainmentSectors = [
  {
    title: "The Bongo Flava Phenomenon",
    icon: Music,
    content: "Tanzania's most successful cultural export. Originating in Dar es Salaam, Bongo Flava blends hip-hop, R&B, and traditional Afrobeat rhythms into a global powerhouse genre.",
    details: [
      "Industry Leaders: Diamond Platnumz (WCB), Alikiba (Kings Music), and Harmonize (KondeGang).",
      "Global Reach: Tanzania is currently the leading African market for music streaming growth.",
      "Events: Look for 'Wasafi Festival' or 'Tigo Fiesta' for the largest live experiences."
    ]
  },
  {
    title: "Football: The Simba-Yanga Rivalry",
    icon: Trophy,
    content: "Football is the national obsession. The 'Kariakoo Derby' between Simba SC and Yanga SC (Young Africans) is one of the most intense and historic rivalries in African sports.",
    details: [
      "National Stadium: Benjamin Mkapa Stadium in Dar es Salaam hosts major matches with 60,000+ fans.",
      "Continental Success: Both clubs are regular competitors in the CAF Champions League.",
      "Local Passion: Match days turn the city red or green/yellow depending on the winner."
    ]
  },
  {
    title: "Digital Content & Comedy",
    icon: Video,
    content: "Tanzania's digital landscape is exploding. A new generation of creators and comedians have shifted the entertainment focus from traditional media to social platforms.",
    details: [
      "TikTok & Instagram: These are the primary stages for 'Bongo Digital' creators, influencing everything from local fashion to political discourse.",
      "Stand-up Comedy: A rapidly growing niche in Dar es Salaam, with regular 'Comedy Nights' featuring stars like Coy Mzungu and the Cheka Tu collective.",
      "YouTube Ecosystem: Tanzanian creators dominate East African YouTube with high-production skits, vlogs, and independent talk shows."
    ]
  },
  {
    title: "Zanzibar & Coastal Nightlife",
    icon: PartyPopper,
    content: "From the sophisticated lounges of Masaki to the full-moon parties of Nungwi, Tanzania offers a diverse nightlife scene catering to all tastes.",
    details: [
      "Dar Hubs: Masaki and Oysterbay house premium clubs like Elements, Havoc, and Kidimbwi.",
      "Zanzibar Vibes: Stone Town offers rooftop jazz and Taarab music, while Nungwi/Kendwa are famous for beach festivals.",
      "Sauti za Busara: The prestigious pan-African music festival held annually in February in Stone Town."
    ]
  }
]

const specializedSports = [
  { 
    name: "Athletics", 
    desc: "Tanzania has a strong heritage in long-distance running, particularly from the Arusha and Manyara regions.", 
    icon: Users2 
  },
  { 
    name: "Taarab", 
    desc: "A coastal orchestral music genre with deep Arabic and Swahili poetic roots, central to Zanzibar weddings.", 
    icon: Mic2 
  },
  { 
    name: "Traditional Dance", 
    desc: "Every tribe has unique dances, with the Maasai 'Adumu' (jumping dance) being the most globally recognized.", 
    icon: Star 
  }
]

export default function EntertainmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-16">
        

        {/* Hero Banner Section */}
        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201971/tanzania_connect/static/arusha-town.jpg"
            alt="Vibrant streets in Arusha Town, Tanzania"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Leisure & Lifestyle</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight">
                Entertainment & Sports
              </h1>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          A comprehensive guide to the vibrant pulse of Tanzania—from the global beats of Bongo Flava to the rise of digital content and comedy.
        </p>

        <div className="grid grid-cols-1 gap-16">
          {entertainmentSectors.map((sector, idx) => (
            <section key={sector.title} className="group space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="space-y-4 flex-1 order-first md:order-none">
                  <div className="flex items-center gap-4 border-b pb-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <sector.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-headline font-bold">{sector.title}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {sector.content}
                  </p>
                </div>
                {(sector.title.includes("Bongo Flava") || sector.title.includes("Football")) && (
                  <div className={`relative w-full md:w-[350px] h-[220px] rounded-3xl overflow-hidden shadow-md border shrink-0 ${idx === 1 ? 'order-last md:order-first' : ''}`}>
                    <Image
                      src={sector.title.includes("Bongo Flava") ? "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201979/tanzania_connect/static/bongo-flava.png" : "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202039/tanzania_connect/static/sports-stadium.png"}
                      alt={sector.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {sector.details.map((detail, idx) => (
                  <Card key={idx} className="border-none shadow-sm bg-muted/30 rounded-2xl p-6">
                    <div className="h-2 w-6 bg-primary/30 rounded-full mb-3" />
                    <p className="text-sm font-medium leading-relaxed">{detail}</p>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Specialized Cultural Assets</h2>
            <p className="text-muted-foreground">Exploring the diverse range of entertainment beyond the mainstream.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specializedSports.map((item) => (
              <div key={item.name} className="bg-card p-8 rounded-[2.5rem] shadow-sm border border-primary/5 space-y-4 hover:shadow-md hover:border-primary/20 transition-all">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{item.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Card className="bg-primary text-white rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <Landmark className="h-20 w-20 opacity-20 shrink-0" />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Media & Cinema</h3>
              <p className="text-lg opacity-80 leading-relaxed">
                Dar es Salaam is the hub of the Swahili film industry, colloquially known as <strong className="font-semibold text-tanzania-300">Bongo Movie</strong>. Modern cinema chains like Century Cinemax provide international blockbuster experiences in high-end malls across the city.
              </p>
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-64 w-64 bg-white/5 rounded-full blur-3xl" />
        </Card>
      </main>
    </div>
  )
}

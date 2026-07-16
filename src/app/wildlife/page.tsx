import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Binoculars, Compass, Calendar, ShieldCheck, Map, Camera, ArrowLeft, Info, Landmark } from "lucide-react"
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

const SLUG = "wildlife";
const meta = getSectorMeta(SLUG)!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/wildlife",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/wildlife",
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

const circuits = [
  {
    title: "The Northern Circuit",
    desc: "The world's most famous wildlife destination, featuring high-density predator populations and the iconic savanna landscapes.",
    parks: [
      { name: "Serengeti National Park", detail: "Home to the Great Migration and the highest concentration of large mammals on earth." },
      { name: "Ngorongoro Conservation Area", detail: "A UNESCO World Heritage site and a self-contained ecosystem within a massive volcanic caldera." },
      { name: "Tarangire National Park", detail: "Famous for its massive elephant herds and ancient Baobab trees." },
      { name: "Lake Manyara", detail: "Known for its tree-climbing lions and diverse birdlife around the alkaline lake." }
    ]
  },
  {
    title: "The Southern Circuit",
    desc: "Wild, remote, and vast. The South offers a more rugged and private safari experience away from the crowds.",
    parks: [
      { name: "Nyerere National Park (Selous)", detail: "One of the largest faunal reserves in the world, offering unique boat safaris on the Rufiji River." },
      { name: "Ruaha National Park", detail: "Tanzania's largest national park, home to 10% of the world's lion population." },
      { name: "Mikumi National Park", detail: "Accessible from Dar es Salaam, often called the 'Little Serengeti'." }
    ]
  }
]

export default function WildlifePage() {
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
            name: "Wildlife",
            url: "https://www.tanzaniareach.com/wildlife",
          },
        ])}
      />
      {sectorFaqs[SLUG] && (
        <JsonLd data={faqSchema(sectorFaqs[SLUG])} />
      )}
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-10 animate-fade-in">
        <MarqueeStrip
          caption="Protected areas, by the numbers"
          items={[
            { label: 'Serengeti', value: '14,750 km²' },
            { label: 'Ngorongoro', value: '8,292 km²' },
            { label: 'Selous', value: '50,000 km²' },
            { label: 'Tarangire', value: '2,850 km²' },
            { label: 'Ruaha', value: '20,226 km²' },
            { label: 'Mikumi', value: '3,230 km²' },
            { label: 'Gombe', value: '52 km²' },
            { label: 'Mahale', value: '1,613 km²' },
            { label: 'Katavi', value: '4,471 km²' },
          ]}
          speed={2}
        />


        <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202034/tanzania_connect/static/serengeti-safari.jpg"
          >
            <source src="/videos/section.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-8 md:p-16">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-black px-4 py-1">Natural Heritage</Badge>
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight">Wildlife & Safaris</h1>
              <div className="flex items-center gap-3 text-white/90 text-lg md:text-2xl font-display">
                <span className="font-semibold tracking-wide">Beyond the horizon:</span>
                <SectorTypewriter
                  sector="wildlife"
                  className="text-2xl md:text-3xl text-tanzania-300 font-bold"
                  textClassName="text-tanzania-300"
                  caretClassName="bg-tanzania-300"
                />
              </div>
              <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
                Exploring the pinnacle of African biodiversity—from the Great Migration to the hidden wilderness of the South.
              </p>
            </div>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {circuits.map((circuit) => (
              <div key={circuit.title} className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-headline font-bold text-primary">{circuit.title}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">{circuit.desc}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {circuit.parks.map((park) => (
                    <Card key={park.name} className="border-none shadow-md rounded-[2rem] bg-card hover:shadow-lg transition-all">
                      <CardHeader className="p-8 pb-4">
                        <CardTitle className="text-xl font-bold">{park.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="px-8 pb-8">
                        <p className="text-sm text-muted-foreground leading-relaxed">{park.detail}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            <Card className="bg-muted/30 border-none rounded-[3rem] p-10 space-y-8">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <Calendar className="h-7 w-7 text-primary" />
                The Great Migration Timeline
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Badge className="h-fit">Dec - Mar</Badge>
                    <p className="text-sm"><strong>Calving Season:</strong> Southern Serengeti and Ndutu area. Predators are highly active.</p>
                  </div>
                  <div className="flex gap-4">
                    <Badge className="h-fit">Apr - Jun</Badge>
                    <p className="text-sm"><strong>The Trek North:</strong> Moving through the Western Corridor. Long rains make some areas lush but challenging.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Badge className="h-fit">Jul - Oct</Badge>
                    <p className="text-sm"><strong>River Crossings:</strong> Northern Serengeti (Mara River). Dramatic crossings into Maasai Mara.</p>
                  </div>
                  <div className="flex gap-4">
                    <Badge className="h-fit">Nov - Dec</Badge>
                    <p className="text-sm"><strong>Short Rains:</strong> Migration returns south through the eastern limits of the Serengeti.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <aside className="space-y-8">
            <Card className="bg-primary text-white rounded-[2.5rem] p-8 shadow-xl overflow-hidden relative">
              <div className="relative z-10 space-y-6">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold">TANAPA Regulations</h4>
                <p className="text-sm opacity-90 leading-relaxed">
                  Tanzania National Parks (TANAPA) strictly enforces conservation rules. Off-roading is prohibited in most parks, and entry fees must be paid via the official TANAPA portal or cards; cash is not accepted at gates.
                </p>
                <ul className="space-y-2 text-xs font-medium">
                  <li className="flex gap-2"><span>•</span> Park hours: 06:00 to 18:00</li>
                  <li className="flex gap-2"><span>•</span> Drones require special permits</li>
                  <li className="flex gap-2"><span>•</span> Littering carries heavy fines</li>
                </ul>
              </div>
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 h-48 w-48 bg-white/5 rounded-full blur-2xl" />
            </Card>

            <div className="p-8 bg-secondary/10 rounded-[2rem] border-2 border-dashed border-secondary/30 space-y-4">
              <div className="flex items-center gap-3 text-secondary-foreground">
                <Compass className="h-6 w-6" />
                <h4 className="font-bold">Safari Logistics</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most experts book through licensed operators. For the best experience, choose a "Private Safari" with a local guide who can interpret animal behavior and Swahili history.
              </p>
              <Badge variant="secondary" className="w-full justify-center py-2">Licensed Operators Only</Badge>
            </div>

            <Card className="border-none shadow-lg rounded-[2rem] bg-card overflow-hidden">
              <div className="relative aspect-[9/16] w-full max-h-[500px]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202021/tanzania_connect/static/ngorongoro-crater.jpg"
                >
                  <source src="/videos/video2.mp4" type="video/mp4" />
                </video>
              </div>
              <CardContent className="p-6 space-y-4">
                <h4 className="font-bold text-primary">Conservation Focus</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Tanzania dedicates over 32% of its land to conservation. Responsible tourism directly funds the protection of these ecosystems and community anti-poaching initiatives.
                </p>
              </CardContent>
            </Card>
          </aside>
        </section>

        <section className="bg-muted/50 p-12 rounded-[3.5rem] grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-card flex items-center justify-center shadow-sm">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold">Expert Photography</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Golden hour (first and last light) provides the best contrast. A 100-400mm lens is standard for wildlife, while wide-angle lenses capture the vast Serengeti plains.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-card flex items-center justify-center shadow-sm">
              <Map className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold">Zanzibar Integration</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The "Bush to Beach" itinerary is the most popular expert choice. Direct flights connect Serengeti (Seronera) and Manyara to Zanzibar daily.
            </p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-2xl bg-card flex items-center justify-center shadow-sm">
              <Landmark className="h-6 w-6 text-primary" />
            </div>
            <h4 className="text-xl font-bold">Community Impact</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Visiting cultural bomas (like the Maasai or Hadzabe) requires sensitivity. Use ethical operators who ensure fair revenue sharing with the local communities.
            </p>
          </div>
        </section>

        <RegulatorStrip
          caption="Governed by"
          regulators={[
            { short:'TANAPA', full:'Tanzania National Parks Authority', url:'https://www.tanzaniaparks.go.tz', scope:'National parks & reserves' },
            { short:'NCAA', full:'Ngorongoro Conservation Area Authority', url:'https://www.ncaa.go.tz', scope:'Ngorongoro & Maasai' },
            { short:'TAWA', full:'Tanzania Wildlife Authority', url:'https://www.tawa.go.tz', scope:'Game reserves' },
            { short:'KINAPA', full:'Kilimanjaro National Park', url:'https://www.tanzaniaparks.go.tz/kili', scope:'Mountain trekking' },
            { short:'MNRT', full:'Ministry of Natural Resources & Tourism', url:'https://www.maliasili.go.tz', scope:'Policy' },
            { short:'TZWC', full:'Tanzania Wildlife Conservation', url:'https://www.tzwc.org', scope:'Community conservation' },
          ]}
        />
      </main>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageCircle, Briefcase, Languages, Gavel, 
  Coins, Landmark, ShieldAlert, ArrowLeft, Coffee, Zap,
  AlertTriangle, Phone
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const phrases = {
  greetings: [
    { sw: "Habari ya asubuhi?", en: "How is the morning?", response: "Njema / Salama" },
    { sw: "Shikamoo", en: "Respectful greeting for elders", response: "Marahaba" },
    { sw: "Karibu Tanzania", en: "Welcome to Tanzania", response: "Asante" },
    { sw: "Tutaonana baadaye", en: "See you later", response: "Sawa, baadaye" },
  ],
  business: [
    { sw: "Mkataba", en: "Contract / Agreement", response: "-" },
    { sw: "Kodi ya mapato", en: "Income Tax (TRA)", response: "-" },
    { sw: "Leseni ya biashara", en: "Business License", response: "-" },
    { sw: "Tunaweza kujadiliana bei?", en: "Can we negotiate the price?", response: "-" },
  ],
  legal: [
    { sw: "Hati ya usajili", en: "Certificate of registration", response: "-" },
    { sw: "Kibali cha kazi", en: "Work permit", response: "-" },
    { sw: "Wakili wa serikali", en: "State Attorney", response: "-" },
    { sw: "Mahakama Kuu", en: "High Court", response: "-" },
  ],
  finance: [
    { sw: "Akaunti ya akiba", en: "Savings account", response: "-" },
    { sw: "Namba ya utambulisho (TIN)", en: "Taxpayer ID Number", response: "-" },
    { sw: "Riba ya benki", en: "Bank interest", response: "-" },
    { sw: "Nataka kufungua akaunti", en: "I want to open an account", response: "-" },
  ],
  logistics: [
    { sw: "Nenda moja kwa moja", en: "Go straight", response: "-" },
    { sw: "Pindua kulia / kushoto", en: "Turn right / left", response: "-" },
    { sw: "Simama hapa", en: "Stop here", response: "-" },
    { sw: "Stendi ya basi iko wapi?", en: "Where is the bus stand?", response: "-" },
  ],
  emergency: [
    { sw: "Saidia!", en: "Help!", response: "Nini kimetokea?" },
    { sw: "Nahitaji daktari", en: "I need a doctor", response: "-" },
    { sw: "Piga simu polisi", en: "Call the police", response: "-" },
    { sw: "Nimepoteza pasipoti", en: "I have lost my passport", response: "-" },
  ]
}

const tabMediaMap = {
  greetings: {
    image: "/images/tanzania/arusha-town.jpg",
    label: "Local Community, Arusha",
    title: "The Art of Swahili Welcoming",
    desc: "Greetings are not a transaction but a social duty in Swahili culture. Even when asking directions or ordering food, start with 'Habari!' or 'Mambo!'. Respectful greetings lay the foundation for smooth interactions.",
  },
  business: {
    image: "/images/tanzania/corporate.jpg",
    label: "Dar Trade District",
    title: "Corporate & Formal Etiquette",
    desc: "When dealing with BRELA or government officials, formal Swahili terms show respect and seriousness. Ensure you use standard terms like 'Mkataba' (Contract) and start meetings with a polite check-in.",
  },
  legal: {
    image: "/images/tanzania/dar-es-salaam.jpg",
    label: "Dar es Salaam Court",
    title: "Navigating Regulations",
    desc: "Understanding legal terminology protects your business interest. Terms like 'Kibali cha kazi' (Work permit) are vital during interactions with the Ministry of Labor and Immigration services.",
  },
  finance: {
    image: "/images/tanzania/banking.jpg",
    label: "Corporate Bank HQ",
    title: "Financial Integration",
    desc: "Tanzania's financial sector blends modern banking with mobile money ecosystems. Learning transaction vocabulary helps in setting up local commercial and investment accounts.",
  },
  logistics: {
    image: "/images/tanzania/transport-banner.jpg",
    label: "SGR Inter-city Station",
    title: "Travel & Transit",
    desc: "Navigating cities or long-distance travel via the SGR train requires basic directional vocabulary. Local transport systems are highly social hubs where Swahili is essential.",
  },
  emergency: {
    image: "/images/tanzania/healthcare-banner.jpg",
    label: "National Hospital",
    title: "Safety & Emergency Response",
    desc: "Keep emergency phrases handy. If calling public police or seeking medical assistance, clear and direct Swahili phrases are the fastest way to obtain local support.",
  },
};

export default function PhrasebookPage() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-12">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <Languages className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="outline" className="border-primary/20 text-primary font-black uppercase tracking-widest text-[10px]">Expert Language Guide</Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-foreground uppercase leading-[0.9]">
              Swahili <span className="gradient-tanzania-text italic">Phrasebook.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
              Essential Kiswahili for experts and investors. Build trust and navigate local systems with precision.
            </p>
          </div>
          <div className="lg:col-span-4 relative h-48 md:h-56 rounded-[2rem] overflow-hidden border border-border/50 shadow-xl bg-muted">
            <Image
              src="/images/tanzania/culture-banner.jpg"
              alt="Swahili Culture"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Dar es Salaam Market</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="greetings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-muted/50 p-1.5 h-20 md:h-14 rounded-2xl md:rounded-full border border-border/50">
            <TabsTrigger value="greetings" className="flex items-center gap-2 text-xs font-bold rounded-xl md:rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg">
              <MessageCircle className="h-4 w-4" />
              <span>Hello</span>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2 text-xs font-bold rounded-xl md:rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg">
              <Briefcase className="h-4 w-4" />
              <span>Work</span>
            </TabsTrigger>
            <TabsTrigger value="legal" className="flex items-center gap-2 text-xs font-bold rounded-xl md:rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg">
              <Gavel className="h-4 w-4" />
              <span>Legal</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2 text-xs font-bold rounded-xl md:rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg">
              <Coins className="h-4 w-4" />
              <span>Money</span>
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2 text-xs font-bold rounded-xl md:rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg">
              <Landmark className="h-4 w-4" />
              <span>Travel</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2 text-xs font-bold rounded-xl md:rounded-full data-[state=active]:bg-background data-[state=active]:shadow-lg text-rose-500">
              <ShieldAlert className="h-4 w-4" />
              <span>SOS</span>
            </TabsTrigger>
          </TabsList>
          
          {Object.entries(phrases).map(([key, list]) => {
            const tabMedia = tabMediaMap[key as keyof typeof tabMediaMap];
            return (
              <TabsContent key={key} value={key} className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Phrases List */}
                  <div className="lg:col-span-8 space-y-4">
                    {list.map((item, i) => (
                      <Card key={i} className="border-none shadow-sm rounded-[2rem] bg-card hover:shadow-md transition-all border border-border/30 group overflow-hidden">
                        <CardContent className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-10 bg-primary/20 rounded-full group-hover:bg-primary transition-colors" />
                              <p className="text-3xl md:text-5xl font-black font-headline text-foreground tracking-tight">{item.sw}</p>
                            </div>
                            <p className="text-lg md:text-xl text-muted-foreground font-medium pl-5">{item.en}</p>
                          </div>
                          {item.response !== "-" && (
                            <div className="px-8 py-5 rounded-3xl bg-secondary/10 text-secondary-foreground font-bold text-base border border-secondary/20 flex flex-col">
                              <span className="text-[10px] uppercase tracking-widest opacity-60 mb-2 font-black">Common Response</span>
                              {item.response}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Right Column: Visual and Cultural Insight Card */}
                  {tabMedia && (
                    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                      <div className="relative h-64 md:h-80 rounded-[2.5rem] overflow-hidden border border-border/50 shadow-xl bg-muted">
                        <Image
                          src={tabMedia.image}
                          alt={tabMedia.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white">{tabMedia.label}</span>
                        </div>
                      </div>
                      <Card className="border-none shadow-sm rounded-[2.5rem] bg-muted/30 p-6 space-y-3">
                        <h4 className="font-headline font-bold text-lg text-primary">{tabMedia.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{tabMedia.desc}</p>
                      </Card>
                    </div>
                  )}

                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-headline font-bold">The Power of "Shikamoo"</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In Tanzania, respect for elders is paramount. Using "Shikamoo" correctly opens doors and builds immediate trust in professional settings. The correct reply is always "Marahaba".
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-white shadow-xl">
              <Coffee className="h-8 w-8" />
            </div>
            <h3 className="text-3xl font-headline font-bold">Business Etiquette</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Never skip the initial greetings. Even in a fast-paced meeting, asking "Habari yako?" (How are you?) is mandatory before diving into technical or financial discussions.
            </p>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden border border-primary/10 min-h-[220px] bg-muted shadow-lg">
            <Image
              src="/images/tanzania/swahili-cuisine.png"
              alt="Swahili Hospitality & Food"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 space-y-2">
              <h4 className="text-xl font-bold text-white">Swahili Hospitality</h4>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Tanzanian culture is warm and welcoming. Sharing a meal (like Swahili biryani or chipsi mayai) is key to building relationships.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

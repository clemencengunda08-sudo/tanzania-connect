'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from "@/components/ui/card"
import { 
  Landmark, Coins, ArrowLeft, ArrowRight,
  Briefcase, History, Sprout, Bus, HeartPulse, Home, 
  Construction, Binoculars, Utensils, Tv, ShieldCheck,
  FileText, Loader2, Search, Mountain, Cpu
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSectors } from "@/firebase/firestore/use-site-data"
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/stagger"
import { MarqueeStrip } from "@/components/premium/marquee-strip"
import { TimedSlideshow } from "@/components/premium/timed-slideshow"

const staticSectors = [
  { title: "Immigration", desc: "Visas, residence permits, and legal stay.", icon: Landmark, href: "/visa", tag: "Legal" },
  { title: "Corporate", desc: "Business registration, tax, and labor rules.", icon: Briefcase, href: "/corporate", tag: "Business" },
  { title: "Agriculture", desc: "Land tenure, crops, and agribusiness incentives.", icon: Sprout, href: "/agriculture", tag: "Economy" },
  { title: "Mining", desc: "Gold, tanzanite, royalties, and licensing.", icon: Mountain, href: "/mining", tag: "Resources" },
  { title: "Infrastructure", desc: "Rail, energy, and digital connectivity info.", icon: Construction, href: "/infrastructure", tag: "Vision" },
  { title: "Banking", desc: "Local accounts, mobile money, and USD policy.", icon: Coins, href: "/banking", tag: "Finance" },
  { title: "Technology", desc: "Startups, fintech, hubs, and telecommunications.", icon: Cpu, href: "/technology", tag: "Future" },
  { title: "Wildlife", desc: "National parks, circuits, and safari rules.", icon: Binoculars, href: "/wildlife", tag: "Nature" },
  { title: "Healthcare", desc: "Hospital hierarchy, safety, and insurance.", icon: HeartPulse, href: "/healthcare", tag: "Safety" },
  { title: "Housing", desc: "Finding a home, the broker system, and rent.", icon: Home, href: "/housing", tag: "Living" },
  { title: "Culture", desc: "History, Ujamaa, and national traditions.", icon: History, href: "/culture", tag: "Insight" },
  { title: "Transport", desc: "City travel, DART system, and inter-city SGR.", icon: Bus, href: "/transport", tag: "Mobility" },
  { title: "Food & Drink", desc: "Swahili flavors and local dining etiquette.", icon: Utensils, href: "/food-and-drink", tag: "Flavor" },
  { title: "Entertainment", desc: "Music, sports, nightlife, and cinema.", icon: Tv, href: "/entertainment", tag: "Lifestyle" },
]

function GuidesContent() {
  const { sectors, loading } = useSectors();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearch(q);
    }
  }, [searchParams]);

  const filteredStatic = staticSectors.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDynamic = sectors.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background w-full">
      <main className="p-6 md:p-12 max-w-7xl mx-auto w-full space-y-12 pt-40 pb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeIn direction="left">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 uppercase tracking-[0.2em] font-black text-[9px]">Portal Directory</Badge>
                <div className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Intelligence v2.0</div>
              </div>
              <h1 className="text-5xl font-headline font-black tracking-tighter text-foreground uppercase leading-[0.9]">
                Expert <span className="gradient-tanzania-text italic">Manuals.</span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium max-w-xl leading-relaxed">
                Professional intelligence for handling life and business in Tanzania.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="right">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
                <Input 
                  placeholder="Search manuals..." 
                  className="pl-11 h-14 w-full md:w-64 bg-muted/50 border-primary/10 rounded-xl focus:ring-primary/20 focus:border-primary transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link href="/">
                <Button variant="outline" className="rounded-xl border-primary/20 h-14 font-bold px-6 shadow-sm hidden sm:flex">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Home
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* ——— velocity marquee ——— */}
        <MarqueeStrip
          caption="Sector intelligence · 18 guides"
          items={[
            { label: 'Immigration', value: 'Visa & Permits' },
            { label: 'Corporate', value: 'BRELA · TIC' },
            { label: 'Agriculture', value: 'SAGCOT' },
            { label: 'Banking', value: 'BoT · Mobile Money' },
            { label: 'Wildlife', value: 'TANAPA' },
            { label: 'Healthcare', value: 'TMDA' },
            { label: 'Mining', value: 'Mining Commission' },
            { label: 'Energy', value: 'EWURA · TANESCO' },
            { label: 'Transport', value: 'DART · SGR' },
            { label: 'Culture', value: 'Ujamaa · Swahili' },
          ]}
          speed={2}
          variant="gold"
          className="rounded-3xl my-6"
        />

        <TimedSlideshow />

        <section className="space-y-8">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">Sector Index</h2>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {filteredStatic.length + filteredDynamic.length} Manuals Found
            </span>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStatic.map((sector) => (
              <StaggerItem key={sector.title}>
                <Link href={sector.href} className="group block h-full">
                  <Card className="sector-card h-full p-6 space-y-6 group cursor-pointer border-border/50 hover:border-primary/30 rounded-3xl transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl gradient-tanzania flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                          <sector.icon className="w-6 h-6" />
                        </div>
                        <Badge variant="outline" className="text-[9px] uppercase font-black tracking-tighter opacity-60 border-primary/20 text-primary">{sector.tag}</Badge>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-headline font-bold group-hover:text-primary transition-colors">{sector.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                          {sector.desc}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">Open Manual</span>
                      <ArrowRight className="w-4 h-4 text-primary translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </Card>
                </Link>
              </StaggerItem>
            ))}

            {!loading && filteredDynamic.map((sector) => (
              <StaggerItem key={sector.id}>
                <div className="group block h-full">
                  <Card className="sector-card h-full p-6 space-y-6 border-primary/10 bg-primary/[0.02] rounded-3xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                          <FileText className="w-6 h-6" />
                        </div>
                        <Badge className="bg-primary/20 text-primary border-primary/20 text-[9px] font-black uppercase">AI Updated</Badge>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-headline font-bold">{sector.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed font-medium">
                          {sector.description}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-primary/5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary italic">Expert insight linked.</p>
                    </div>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {loading && (
            <div className="py-12 flex justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}

          {(!loading && filteredStatic.length === 0 && filteredDynamic.length === 0) && (
            <div className="text-center py-24 glass-card rounded-[3rem]">
              <p className="text-muted-foreground font-medium">No manuals found for "{search}". Try another keyword.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function GuidesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    }>
      <GuidesContent />
    </Suspense>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Coffee, Beer, Info, ArrowLeft, Flame, Waves, Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next";
import { getSectorMeta } from "@/lib/sector-metadata";
import Image from "next/image";

const meta = getSectorMeta("food-and-drink")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  alternates: {
    canonical: "https://www.tanzaniareach.com/food-and-drink",
  },
  openGraph: {
    type: "article",
    url: "https://www.tanzaniareach.com/food-and-drink",
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

const foodCategories = [
  {
    title: "Coastal Swahili Cuisine",
    icon: Waves,
    desc: "A fusion of African, Indian, and Arabic influences, characterized by the heavy use of coconut milk and aromatic spices.",
    items: [
      { name: "Pilau", detail: "Spiced rice cooked with beef or goat. A celebratory staple across the coast." },
      { name: "Biryani", detail: "Layered rice and meat dish, particularly famous in Zanzibar and Dar es Salaam." },
      { name: "Wali wa Nazi", detail: "Rice cooked in fresh coconut milk, often served with bean stew or fish curry." },
      { name: "Mshikaki", detail: "Marinated meat skewers grilled over charcoal, a favorite evening snack." }
    ]
  },
  {
    title: "Mainland Staples",
    icon: Flame,
    desc: "Hearty, energy-dense meals that reflect the agricultural heritage of the Tanzanian interior.",
    items: [
      { name: "Ugali", detail: "The national staple made from maize flour. Always eaten with the right hand." },
      { name: "Nyama Choma", detail: "Slow-roasted goat or beef, typically served with kachumbari (tomato/onion salad)." },
      { name: "Ndizi Nyama", detail: "Green bananas cooked with meat and vegetables, popular in the Kilimanjaro region." },
      { name: "Makande", detail: "A traditional stew of maize and beans, slow-cooked to perfection." }
    ]
  }
]

const streetFood = [
  { 
    name: "Chipsi Mayai", 
    desc: "The 'Zanzibar Omelette' of the mainland—fries cooked into an omelette. Found at almost every street corner." 
  },
  { 
    name: "Zanzibar Pizza", 
    desc: "A unique crepe-like dough filled with meat, cheese, egg, and vegetables, fried on a flat griddle." 
  },
  { 
    name: "Urojo (Zanzibar Mix)", 
    desc: "A vibrant flour-based soup with potatoes, bajia, and spicy chutneys. The ultimate Zanzibar street snack." 
  }
]

export default function FoodAndDrinkPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-5xl mx-auto space-y-16">
        

        {/* Hero Banner Section */}
        <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl mb-12 border border-border/50">
          <Image
            src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202054/tanzania_connect/static/zanzibar-rooftop.jpg"
            alt="Traditional Swahili Dining on Zanzibar Rooftop"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-12">
            <div className="space-y-4">
              <Badge className="bg-secondary text-secondary-foreground font-bold">Culinary Heritage</Badge>
              <h1 className="text-2xl sm:text-4xl md:text-6xl font-headline font-bold text-white uppercase tracking-tight break-words">
                Food & Drinks
              </h1>
            </div>
          </div>
        </div>

        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          A comprehensive guide to the flavors of Tanzania—from the aromatic spices of the coast to the legendary 'Nyama Choma' of the mainland.
        </p>

        <div className="grid grid-cols-1 gap-16">
          {foodCategories.map((cat, idx) => (
            <section key={cat.title} className="space-y-8">
              <div className="flex items-center gap-4 border-b pb-4">
                <cat.icon className="h-7 w-7 text-primary" />
                <h2 className="text-3xl font-headline font-bold">{cat.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 order-first md:order-none">
                  <p className="text-lg text-muted-foreground leading-relaxed italic mb-4">{cat.desc}</p>
                  <div className="grid grid-cols-1 gap-4">
                    {cat.items.map((item) => (
                      <div key={item.name} className="p-5 bg-card rounded-2xl border border-primary/5 shadow-sm space-y-1">
                        <p className="font-bold text-primary">{item.name}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`relative h-[300px] rounded-3xl overflow-hidden shadow-md border ${idx === 1 ? 'order-last md:order-first' : ''}`}>
                  <Image
                    src={cat.title === "Coastal Swahili Cuisine" ? "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202041/tanzania_connect/static/swahili-cuisine.png" : "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201982/tanzania_connect/static/chipsi-mayai.png"}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="h-24 w-24 rounded-[2rem] bg-secondary flex items-center justify-center shrink-0 shadow-lg">
              <ShoppingBag className="h-12 w-12 text-secondary-foreground" />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-headline font-bold">Street Food Culture</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Tanzanian street food is more than a meal; it's a social ritual. Evening 'chipsi' stalls are the beating heart of local neighborhoods.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {streetFood.map((food) => (
              <div key={food.name} className="bg-card p-8 rounded-[2rem] shadow-sm border border-primary/5 space-y-3 hover:border-primary/20 transition-all">
                <h4 className="font-bold text-primary">{food.name}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{food.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
              <Coffee className="h-7 w-7 text-primary" />
              Beverages & Coffee
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-card rounded-2xl border border-primary/5 shadow-sm space-y-2">
                <p className="font-bold">The Chai Culture</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ginger-infused spiced tea is the morning standard. It's often served with 'Mandazi' (Swahili doughnuts) or 'Chapati'.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-primary/5 shadow-sm space-y-2">
                <p className="font-bold">Expert Coffee</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  While Tanzania is a top exporter of Arabica, the local 'black coffee' (Kahawa) is traditionally served from copper pots in small cups, often accompanied by peanut brittle (Kashata).
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
              <Beer className="h-7 w-7 text-primary" />
              Local Spirits & Brews
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-card rounded-2xl border border-primary/5 shadow-sm space-y-2">
                <p className="font-bold">Konyagi</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The 'Spirit of Tanzania'. A clear gin-like beverage often mixed with Stoney Tangawizi (ginger beer) to create the famous 'Stoney Gi'.
                </p>
              </div>
              <div className="p-6 bg-card rounded-2xl border border-primary/5 shadow-sm space-y-2">
                <p className="font-bold">National Beers</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Kilimanjaro, Safari, and Serengeti are the dominant local lagers, each with a loyal following among residents and experts.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Card className="bg-primary text-white rounded-[3rem] p-10 shadow-2xl overflow-hidden relative">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <Heart className="h-16 w-16 opacity-30 shrink-0" />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Dining Etiquette</h3>
              <p className="text-lg opacity-80 leading-relaxed">
                When dining locally, always use your <strong>right hand</strong> for eating, as the left is traditionally reserved for hygiene. It is customary for a bowl of water to be brought to the table for hand-washing before and after the meal. Sharing from a communal platter is a sign of deep community and respect.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

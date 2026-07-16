
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hotel, Home, Key, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const categories = [
  {
    title: "Short Term",
    icon: Hotel,
    options: ["Hotels", "Serviced Apartments", "Guest Houses"],
    price: "$20 - $200+ / night",
    desc: "Best for tourists and newly arrived experts."
  },
  {
    title: "Long Term",
    icon: Home,
    options: ["Apartments", "Villas", "Shared Houses"],
    price: "$300 - $3000+ / month",
    desc: "Requires a contract and often 6-12 months rent in advance."
  }
]

export default function AccommodationPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-4xl mx-auto space-y-12">
        

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Accommodation Guide</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Finding a home in Tanzania, from temporary stays to long-term resident housing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Card key={cat.title} className="border-none shadow-lg rounded-[2.5rem] overflow-hidden flex flex-col">
              <CardHeader className="p-8">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <cat.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-2xl">{cat.title}</CardTitle>
                <CardDescription className="text-lg mt-2">{cat.desc}</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-1 space-y-6">
                <div className="flex flex-wrap gap-2">
                  {cat.options.map(opt => <Badge key={opt} variant="secondary" className="px-4 py-1">{opt}</Badge>)}
                </div>
                <div className="text-lg font-bold text-secondary-foreground bg-secondary/10 p-5 rounded-2xl inline-block w-full text-center">
                  Typical Range: {cat.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-muted/50 border-none rounded-[2.5rem] p-10">
          <CardHeader className="px-0">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Key className="h-7 w-7 text-primary" />
              Securing Housing: Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0 grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">1</div>
                <p className="text-lg leading-relaxed"><strong>The Broker System:</strong> Most rentals use 'Madalali' (brokers). They charge a one-month fee. Ensure they are verified by locals.</p>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">2</div>
                <p className="text-lg leading-relaxed"><strong>Advance Payments:</strong> It is standard to pay 6 or 12 months upfront. This is often non-negotiable but always ask.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">3</div>
                <p className="text-lg leading-relaxed"><strong>Security Check:</strong> Look for walled properties with 24/7 'Walizi' (guards) in areas like Oysterbay or Masaki.</p>
              </div>
              <div className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">4</div>
                <p className="text-lg leading-relaxed"><strong>The Luku System:</strong> Electricity is pre-paid. Ensure the house has its own meter to avoid shared bill disputes.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

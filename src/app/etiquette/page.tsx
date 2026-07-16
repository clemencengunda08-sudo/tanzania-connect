
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Hand, Shirt, Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const etiquetteRules = [
  {
    title: "The Power of Greetings",
    icon: MessageCircle,
    content: "Greetings are a pillar of Swahili culture. Never rush into a business or personal request without a thorough exchange. 'Habari?' (How are you?) should be answered with 'Nzuri' (Good). For elders, use the respectful 'Shikamoo', to which they will reply 'Marahaba'."
  },
  {
    title: "The Right Hand Rule",
    icon: Hand,
    content: "In Tanzanian culture, the left hand is traditionally reserved for personal hygiene. Always use your right hand for eating (especially from shared platters), shaking hands, and giving or receiving money or gifts. Using the left hand is considered deeply disrespectful."
  },
  {
    title: "Dress Code Sensitivity",
    icon: Shirt,
    content: "While major cities like Dar es Salaam are cosmopolitan, modesty is highly valued. In Zanzibar (especially Stone Town) and rural mainland areas, women should cover shoulders and knees. Swimwear is strictly for beaches and resorts; walking in public in bikinis or trunks is offensive."
  },
  {
    title: "Photography & Permissions",
    icon: Camera,
    content: "Always seek verbal permission before taking photos of individuals, especially children. It is strictly illegal to photograph military personnel, government buildings, bridges, airports, or the President's residence (Ikulu). Violating this can lead to equipment confiscation and arrest."
  }
]

export default function EtiquettePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-4xl mx-auto space-y-12">
        

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Local Etiquette</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Respecting Swahili values, community traditions, and national regulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {etiquetteRules.map((rule) => (
            <Card key={rule.title} className="border-none shadow-lg bg-white rounded-[2.5rem] overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-4 bg-primary/5 p-8">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <rule.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{rule.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {rule.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

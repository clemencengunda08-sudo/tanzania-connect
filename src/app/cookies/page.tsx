import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Info, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-4xl mx-auto space-y-12">
        

        <div className="space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 shadow-xl mb-6">
            <Cookie className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Cookies Policy</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            How we use digital identifiers to improve your 2026 portal experience.
          </p>
        </div>

        <section className="space-y-8">
          <Card className="border-none shadow-lg rounded-[2.5rem] bg-card overflow-hidden">
            <CardHeader className="bg-orange-50/10 p-8 border-b border-orange-100/20">
              <CardTitle className="flex items-center gap-3 text-foreground">
                <SafeInfo className="h-6 w-6 text-orange-600" />
                What are Cookies?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-muted-foreground leading-relaxed">
              <p>Cookies are small text files stored on your device when you visit Tanzania Reach. They allow us to remember your theme preferences, keep our currency marquee updated, and provide a seamless navigation experience across our expert guides.</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md rounded-[2rem] bg-card p-8">
              <CardTitle className="text-lg mb-4 text-primary">Essential Cookies</CardTitle>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground leading-relaxed">These are necessary for the portal to function, such as managing administrative login sessions (p-access) and security protocols.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md rounded-[2rem] bg-card p-8">
              <CardTitle className="text-lg mb-4 text-primary">Preference Cookies</CardTitle>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground leading-relaxed">These remember your choice of Light or Dark mode, as well as your recent guide searches to save you time.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5 border-primary/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg">
              <Shield className="h-8 w-8" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Managing Your Privacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                You can opt-out of all non-essential cookies via our consent banner or through your browser settings. Blocking cookies may impact some advanced features of the portal intelligence.
              </p>
            </div>
          </Card>
        </section>

        <footer className="pt-12 text-center text-sm text-muted-foreground border-t">
          <p>© 2026 Tanzania Reach. Digital Excellence.</p>
        </footer>
      </main>
    </div>
  )
}

function SafeInfo(props: any) {
  return <Info {...props} />
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background mesh-bg flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-secondary/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="text-center space-y-8 max-w-lg animate-fade-in-up relative z-10">
        <div className="space-y-2">
          <p className="text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter gradient-tanzania-text opacity-20 absolute -top-20 left-1/2 -translate-x-1/2 select-none pointer-events-none">
            404
          </p>
          <h1 className="text-4xl md:text-5xl font-headline font-black text-foreground uppercase tracking-tight relative z-10">
            Lost in <span className="gradient-tanzania-text italic">Tanzania?</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed relative z-10">
            This guide or manual does not exist on Tanzania Reach. Let's get you back to the expert path.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto relative z-10">
          <Link href="/">
            <Button variant="outline" className="w-full font-bold rounded-2xl h-14 shadow-sm border-primary/20 hover:bg-primary/5 transition-all">
              🏠 Home Portal
            </Button>
          </Link>
          <Link href="/guides">
            <Button variant="outline" className="w-full font-bold rounded-2xl h-14 shadow-sm border-primary/20 hover:bg-primary/5 transition-all">
              📚 All Manuals
            </Button>
          </Link>
          <Link href="/visa">
            <Button variant="outline" className="w-full font-bold rounded-2xl h-14 shadow-sm border-primary/20 hover:bg-primary/5 transition-all">
              ✈️ Immigration
            </Button>
          </Link>
          <Link href="/news">
            <Button variant="outline" className="w-full font-bold rounded-2xl h-14 shadow-sm border-primary/20 hover:bg-primary/5 transition-all">
              📻 Live News
            </Button>
          </Link>
        </div>

        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground opacity-50 relative z-10 pt-8">
          tanzaniareach.com &bull; Expert Portal 2026
        </p>
      </div>
    </div>
  );
}
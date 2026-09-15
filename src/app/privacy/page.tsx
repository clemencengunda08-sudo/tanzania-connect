import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, ArrowLeft, Landmark, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Tanzania Reach collects, uses, and protects your data in accordance with 2025 international and local standards.",
  alternates: {
    canonical: "https://www.tanzaniareach.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-28 md:pt-32 p-6 md:p-12 max-w-4xl mx-auto space-y-12">
        

        <div className="space-y-6">
          <div className="h-16 w-16 rounded-2xl gradient-tanzania flex items-center justify-center text-white shadow-xl mb-6">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-foreground uppercase">Privacy <span className="gradient-tanzania-text italic">Protocol.</span></h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            Effective Date: January 1, 2025. Your data privacy is the bedrock of our professional intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <section className="space-y-8">
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 space-y-8 border-primary/10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Eye className="w-6 h-6" />
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">1. Data Collection & Analytics</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Tanzania Reach is a "Privacy-First" portal. We do not require account creation for public users. We collect minimal telemetry data to improve the quality of our sector manuals.
                </p>
                <ul className="space-y-4 pt-4">
                  <li className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm font-medium"><span className="text-foreground font-black">Anonymous Usage:</span> We track which manuals are read most frequently to prioritize updates. No PII (Personally Identifiable Information) is linked to these metrics.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm font-medium"><span className="text-foreground font-black">AI Logs:</span> Queries made to our assistant are logged to refine regulatory advice accuracy. These logs are stripped of IP addresses and session IDs.</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Lock className="w-6 h-6" />
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">2. Security Standards</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  We utilize military-grade encryption and global CDN protection to ensure the portal's integrity.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Transit</p>
                    <p className="text-sm font-bold text-foreground">SSL/TLS 1.3 Encryption</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Edge</p>
                    <p className="text-sm font-bold text-foreground">Cloudflare WAF Defense</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-primary">
                  <Landmark className="w-6 h-6" />
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">3. Legal Compliance</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Tanzania Reach operates in full compliance with the <span className="text-foreground font-bold italic">Tanzania Personal Data Protection Act (2022)</span> and the European GDPR standards.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 flex flex-col md:flex-row gap-10 items-center">
            <div className="w-20 h-20 rounded-3xl gradient-tanzania flex items-center justify-center text-white shrink-0 shadow-2xl shadow-primary/20">
              <Globe className="w-10 h-10" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-headline font-bold uppercase">Third-Party Disclosures</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                We do not sell, trade, or transfer your data to outside parties. We only share data with trusted service providers (Vercel, Google Cloud, Cloudflare) who assist us in operating our portal, so long as those parties agree to keep this information confidential.
              </p>
            </div>
          </section>
        </div>

        <footer className="pt-12 text-center text-xs font-black uppercase tracking-[0.3em] text-muted-foreground border-t border-primary/5">
          <p>© 2025 Tanzania Reach &bull; Built for Professionals</p>
        </footer>
      </main>
    </div>
  );
}

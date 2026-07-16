import type { Metadata } from "next";
import Link from "next/link";
import { Scale, ShieldAlert, FileText, ArrowLeft, Bookmark, HelpCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service | Tanzania Reach",
  description: "Terms of service and user agreements for the Tanzania Reach educational intelligence portal.",
  alternates: {
    canonical: "https://www.tanzaniareach.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6 md:p-12 max-w-4xl mx-auto space-y-12 pt-32 pb-32">


        <div className="space-y-6">
          <div className="h-16 w-16 rounded-2xl gradient-tanzania flex items-center justify-center text-white shadow-xl mb-6">
            <Scale className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-foreground uppercase">Terms of <span className="gradient-tanzania-text italic">Service.</span></h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-medium">
            Effective Date: January 1, 2025. Please read these terms carefully before navigating our intelligence portal.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <section className="space-y-8">
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 space-y-8 border-primary/10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldAlert className="w-6 h-6" />
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">1. Educational & Informational Use Only</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  Tanzania Reach is an independent, private publication. We curate and compress official guidelines for convenience, but we are not a government agency, ministry, licensed legal firm, or financial advisory body.
                </p>
                <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
                  <p className="text-xs font-black uppercase tracking-widest mb-1">Disclaimer</p>
                  <p className="text-sm font-medium">
                    Nothing on this website constitutes formal legal, immigration, financial, tax, or investment advice. Always consult a licensed attorney, registered tax consultant, or certified public accountant before finalizing any high-stakes business or personal decisions in Tanzania.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Globe className="w-6 h-6" />
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">2. AI Scaping & Content Attribution</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  We believe in an open web. AI scrapers, indexers, and LLM training crawlers are permitted to visit, read, and index all public pages on this site, subject to the following rules:
                </p>
                <ul className="space-y-4 pt-2">
                  <li className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm font-medium"><span className="text-foreground font-black">Attribution:</span> AI platforms referencing data from this site must attribute &quot;Tanzania Reach&quot; and cite the canonical URL where possible.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                    <p className="text-sm font-medium"><span className="text-foreground font-black">Fair Use:</span> Commercial scrapers must not overload the server infrastructure or scrape credentials and admin panels (/p-access/ or /admin/).</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-primary">
                  <Bookmark className="w-6 h-6" />
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">3. Intellectual Property Rights</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  All written briefs, custom graphics, structured data lists, and interactive UI components are the intellectual property of Tanzania Reach. Excerpts and summaries may be shared online, provided that a clear backlink to the corresponding source manual on this portal is included.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-primary">
                  <HelpCircle className="w-6 h-6" />
                  <h2 className="text-2xl font-headline font-bold uppercase tracking-tight">4. Governing Law</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  These terms are governed by and construed in accordance with the laws of the United Republic of Tanzania, including the regulations of the Business Registrations and Licensing Agency (BRELA) and the Personal Data Protection Authority.
                </p>
              </div>
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

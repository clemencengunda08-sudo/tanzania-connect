"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Landmark, 
  Plane, 
  Anchor, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Compass
} from "lucide-react";

export interface SponsorAd {
  id?: string;
  brand: string;
  category: string;
  tagline: string;
  description: string;
  gradient?: string; // Tailwind bg hover overrides (for dark mode styling)
  accentColor: string; // Tailwind borders/text accent
  highlights: string[];
  actionText: string;
  actionUrl: string;
  imageUrl?: string;
}

export const SPONSOR_ADS: SponsorAd[] = [
  {
    brand: "Tanzania Investment Centre",
    category: "Investment Promotion",
    tagline: "Official Government Agent",
    description: "The primary government agency for facilitating, coordinating, and promoting strategic foreign investments in the United Republic of Tanzania.",
    accentColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-400/10 dark:border-emerald-400/20",
    highlights: ["Fiscal Incentive Clearance", "TIC Strategic Certificates", "One-Stop Facilitation Centre"],
    actionText: "TIC Investment Guide",
    actionUrl: "/corporate",
    imageUrl: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201989/tanzania_connect/static/dar-es-salaam.jpg"
  },
  {
    brand: "Tanzania National Parks",
    category: "Conservation & Wildlife",
    tagline: "Sustainable Preservation",
    description: "Managing and conserving Tanzania's world-famous wilderness reserves—including the Serengeti, Kilimanjaro, and Tarangire.",
    accentColor: "text-green-600 bg-green-500/10 border-green-500/20 dark:text-green-400 dark:bg-green-400/10 dark:border-green-400/20",
    highlights: ["Official Reserve Management", "National Park E-Permits", "Conservation Directives"],
    actionText: "TANAPA Park Manual",
    actionUrl: "/wildlife",
    imageUrl: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202034/tanzania_connect/static/serengeti-safari.jpg"
  },
  {
    brand: "Air Tanzania",
    category: "National Airline",
    tagline: "The Wings of Kilimanjaro",
    description: "The government-owned flag carrier, operating premium domestic routes and regional links with a modern state-of-the-art aircraft fleet.",
    accentColor: "text-sky-600 bg-sky-500/10 border-sky-500/20 dark:text-sky-400 dark:bg-sky-400/10 dark:border-sky-400/20",
    highlights: ["Daily Flights to Serengeti", "Dar-to-Zanzibar Connections", "Official National Flag Carrier"],
    actionText: "Flight Connections Guide",
    actionUrl: "/transport",
    imageUrl: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202051/tanzania_connect/static/transport-banner.jpg"
  },
  {
    brand: "Zanzibar Investment Authority",
    category: "Zanzibar Investment",
    tagline: "Spice Islands Gateway",
    description: "The official authority of the Revolutionary Government of Zanzibar, facilitating strategic real estate and Blue Economy projects.",
    accentColor: "text-cyan-600 bg-cyan-500/10 border-cyan-500/20 dark:text-cyan-400 dark:bg-cyan-400/10 dark:border-cyan-400/20",
    highlights: ["Zanzibar Free Zone Setup", "Blue Economy Tax Incentives", "Strategic Real Estate Permits"],
    actionText: "ZIPA Investment Manual",
    actionUrl: "/corporate",
    imageUrl: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202052/tanzania_connect/static/zanzibar-beach.jpg"
  },
  {
    brand: "BRELA Registry",
    category: "Business Registrar",
    tagline: "Formalize Your Enterprise",
    description: "The national executive agency responsible for company registrations, trade licenses, and intellectual property patents in Tanzania.",
    accentColor: "text-amber-600 bg-amber-500/10 border-amber-500/20 dark:text-amber-500 dark:bg-amber-500/10 dark:border-amber-500/20",
    highlights: ["Online Registration System (ORS)", "Business Name Clearance", "Industrial License Clearances"],
    actionText: "BRELA Compliance Manual",
    actionUrl: "/corporate",
    imageUrl: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201989/tanzania_connect/static/dar-es-salaam.jpg"
  },
  {
    brand: "Featured Business Slot",
    category: "Sponsorship Hub",
    tagline: "Partner With Tanzania Reach",
    description: "Are you a verified hospitality, financial, or logistics firm operating in East Africa? Contact our partnerships division to highlight your brand.",
    accentColor: "text-purple-600 bg-purple-500/10 border-purple-500/20 dark:text-purple-400 dark:bg-purple-400/10 dark:border-purple-400/20",
    highlights: ["Direct Expat/Investor Outreach", "Verified Platform Presence", "Brand Listing Compliance Review"],
    actionText: "Request Partnership Specs",
    actionUrl: "/mwijay",
    imageUrl: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202023/tanzania_connect/static/safari-camp.jpg"
  }
];

export function getSponsorIcon(category: string) {
  const c = category.toLowerCase();
  if (c.includes("investment") || c.includes("registrar")) return <Landmark className="h-6 w-6 text-primary" />;
  if (c.includes("airline") || c.includes("aviation")) return <Plane className="h-6 w-6 text-primary" />;
  if (c.includes("conservation") || c.includes("wildlife")) return <Compass className="h-6 w-6 text-primary" />;
  if (c.includes("zanzibar") || c.includes("maritime")) return <Anchor className="h-6 w-6 text-primary" />;
  if (c.includes("sponsorship") || c.includes("featured")) return <Award className="h-6 w-6 text-primary" />;
  return <Sparkles className="h-6 w-6 text-primary" />;
}

export function SponsorAdCard({ ad }: { ad: SponsorAd }) {
  // Determine if there is an image to dynamically adjust visual spacing and prevent overflows
  const hasImage = !!ad.imageUrl;

  return (
    <div className="group relative w-[320px] md:w-[360px] min-h-[500px] md:min-h-[570px] h-auto shrink-0 border border-slate-200/80 dark:border-slate-800/40 hover:border-primary/40 dark:hover:border-primary/30 rounded-[2.5rem] p-7 flex flex-col justify-between transition-all duration-500 ease-out bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/50 dark:to-slate-950/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(8,112,184,0.06)] dark:shadow-black/20 dark:hover:shadow-primary/[0.02] whitespace-normal">
      <div className="space-y-4">
        {/* Brand and Category badge */}
        <div className="flex items-center justify-between">
          <Badge className={`uppercase text-[9px] font-black tracking-widest ${ad.accentColor} border`}>
            {ad.category}
          </Badge>
          <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 opacity-90">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Verified Board
          </div>
        </div>

        {/* Brand logo & title */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500 shrink-0">
            {getSponsorIcon(ad.category)}
          </div>
          <div>
            <h3 className="text-base md:text-lg font-headline font-black uppercase tracking-tight leading-none text-slate-900 dark:text-white">
              {ad.brand}
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1.5 italic">
              "{ad.tagline}"
            </p>
          </div>
        </div>

        {/* Brand Image Preview with Fallback error handling */}
        {ad.imageUrl && (
          <div className="relative h-32 md:h-36 w-full rounded-2xl overflow-hidden border border-slate-200/60 dark:border-white/5 shadow-inner bg-slate-100/50 dark:bg-slate-950/40 flex items-center justify-center">
            {/* Fallback layout shown in case image is broken/loading fails */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 text-slate-500 dark:text-slate-400 select-none">
              <div className="opacity-10 absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]" />
              <span className="text-[8px] uppercase tracking-[0.25em] font-black text-primary opacity-80 z-10">Tanzania Partner Brand</span>
              <span className="text-xs font-black text-slate-800 dark:text-slate-100 mt-2 leading-none max-w-[90%] line-clamp-1 uppercase tracking-tight z-10">{ad.brand}</span>
            </div>
            
            <img 
              src={ad.imageUrl} 
              alt={ad.brand} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-95 group-hover:opacity-100 z-10" 
              onError={(e) => {
                // Instantly hide the broken image element to reveal the fallback card below it
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent z-20 pointer-events-none" />
          </div>
        )}

        {/* Description (maelezo machache: automatically clamps tighter if there's an image banner) */}
        <p className={`text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-medium ${hasImage ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {ad.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent w-full" />

        {/* Highlights (sliced dynamically if an ad picture is loaded to conserve card space) */}
        {ad.highlights && ad.highlights.length > 0 && (
          <div className="space-y-2">
            <div className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Compliance Highlights</div>
            <div className="space-y-1.5">
              {(hasImage ? ad.highlights.slice(0, 2) : ad.highlights).map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0 animate-pulse" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 tracking-wide">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Button CTA */}
      <div className="pt-4 mt-auto">
        <Button 
          asChild 
          className="w-full h-11 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all duration-300"
        >
          <a href={ad.actionUrl}>
            {ad.actionText}
          </a>
        </Button>
      </div>
    </div>
  );
}

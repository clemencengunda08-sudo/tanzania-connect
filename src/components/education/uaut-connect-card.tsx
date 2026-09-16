'use client';

import React from 'react';
import { GraduationCap, ExternalLink, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

interface UautConnectCardProps {
  compact?: boolean;
  className?: string;
}

export function UautConnectCard({ compact = false, className = '' }: UautConnectCardProps) {
  if (compact) {
    return (
      <div className={`rounded-2xl p-5 bg-gradient-to-br from-blue-900/90 via-kilimanjaro-950 to-kilimanjaro-900 text-white border border-tanzania-500/30 shadow-xl relative overflow-hidden ${className}`}>
        <div className="absolute -right-8 -top-8 w-28 h-28 bg-tanzania-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Round 2 Applications Open
          </span>
          <span className="text-[10px] text-blue-200/80 font-mono">UAUT · Kigamboni</span>
        </div>

        <h4 className="font-display text-base font-bold tracking-tight text-white mb-1.5">
          United African University of Tanzania
        </h4>
        <p className="text-xs text-blue-100/80 leading-relaxed mb-4">
          World-class Korean-founded education in Engineering, Technology, and Business Administration at Kibada, Kigamboni.
        </p>

        <div className="flex items-center gap-2">
          <a
            href="https://www.uautconnect.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-tanzania-500 hover:bg-tanzania-400 text-white text-xs font-bold shadow-md transition-all group"
          >
            Apply Online
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="https://www.uautconnect.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Visit UAUT Connect Portal"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl p-4 sm:p-8 bg-gradient-to-br from-kilimanjaro-950 via-tanzania-950 to-kilimanjaro-900 text-white border border-tanzania-500/30 shadow-2xl relative overflow-hidden ${className}`}>
      {/* Decorative ambient glows */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-tanzania-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top badge row */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Round 2 Admissions Open · 2026/2027
          </div>
          <span className="text-xs font-mono text-tanzania-300 font-semibold flex items-center gap-1">
            <MapPin className="w-3 h-3 text-tanzania-400" />
            Vijibweni, Kibada, Kigamboni (kwa Mkorea)
          </span>
        </div>

        {/* Title & Motto */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-tanzania-500/30 border border-tanzania-400/40 flex items-center justify-center text-tanzania-300 shadow-inner">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-tanzania-400">
                Official Admissions Portal · UAUT Connect
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                United African University of Tanzania (UAUT)
              </h3>
            </div>
          </div>
          <p className="inline-block text-xs font-serif italic text-amber-300/90 tracking-wide pl-1">
            &ldquo;Change Your Mindset&rdquo;
          </p>
        </div>

        <p className="text-[13px] sm:text-sm text-blue-100/90 leading-relaxed mb-4 sm:mb-6 font-light max-w-2xl">
          Unlock global academic opportunities at UAUT. Founded through international Korean cooperation, UAUT offers cutting-edge degree and diploma programs tailored to modern industrial and technological leadership in Africa.
        </p>

        {/* Highlight Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-4 sm:mb-6">
          {[
            { title: 'Engineering & Computing', desc: 'Software, Computer Science, Telecom' },
            { title: 'Business & Management', desc: 'Accounting, Finance, Entrepreneurship' },
            { title: 'Korean Technology Synergy', desc: 'Hands-on practical labs & leadership' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-tanzania-300 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item.title}</span>
              </div>
              <p className="text-[11px] text-blue-200/70 leading-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="https://www.uautconnect.com/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-tanzania-500 hover:bg-tanzania-400 text-white text-sm font-bold shadow-lg shadow-tanzania-500/25 transition-all group"
          >
            <span>Apply for Round 2 Admissions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="https://www.uautconnect.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-colors"
          >
            <span>Visit UAUT Connect Portal</span>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

export type MarqueeItem = {
  label: string;
  value?: string;
  sublabel?: string;
  href?: string;
  badge?: string;
};

type Props = {
  items?: MarqueeItem[];
  children?: React.ReactNode;
  separator?: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export function Marquee({
  items,
  children,
  separator = '✦',
  className,
  speed = 32,
  reverse = false,
  pauseOnHover = true,
}: Props) {
  const isRich = items ? items.some((it) => it.href || it.sublabel) : false;

  const renderItem = (it: MarqueeItem, i: number) => {
    if (isRich) {
      const inner = (
        <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/70 dark:bg-kilimanjaro-900/60 border border-kilimanjaro-900/8 dark:border-tanzania-50/10 shadow-sm hover:shadow-md hover:border-tanzania-500/30 hover:bg-white dark:hover:bg-kilimanjaro-850 hover:scale-[1.02] transition-all duration-200 shrink-0 backdrop-blur-md group/pill">
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-tanzania-500/10 dark:bg-tanzania-500/20 text-tanzania-700 dark:text-tanzania-300 font-mono text-[11px] font-black tracking-wider border border-tanzania-500/20 group-hover/pill:bg-tanzania-600 group-hover/pill:text-white transition-colors shrink-0">
            {it.label}
          </span>
          <div className="flex flex-col text-left min-w-0">
            {it.value && (
              <span className="text-xs font-bold text-kilimanjaro-800 dark:text-tanzania-100 tracking-tight leading-tight truncate">
                {it.value}
              </span>
            )}
            {it.sublabel && (
              <span className="text-[10px] text-kilimanjaro-500 dark:text-tanzania-400 font-medium truncate max-w-[160px]">
                {it.sublabel}
              </span>
            )}
          </div>
          {it.href && (
            <ExternalLink className="w-2.5 h-2.5 text-tanzania-400 opacity-40 group-hover/pill:opacity-90 transition-opacity ml-0.5 shrink-0" />
          )}
        </span>
      );

      if (it.href) {
        return (
          <a
            key={i}
            href={it.href}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            {inner}
          </a>
        );
      }
      return (
        <span key={i} className="shrink-0">
          {inner}
        </span>
      );
    }

    // Compact text-only mode (e.g. currency ticker)
    return (
      <span key={i} className="inline-flex items-center gap-4 shrink-0 select-none">
        <span className="text-current">{it.label}</span>
        {it.value && (
          <span className="text-tanzania-400">{it.value}</span>
        )}
        <span className="text-tanzania-500/50">{separator}</span>
      </span>
    );
  };

  const trackContent = (
    <div
      className={cn(
        'flex shrink-0 items-center gap-4 min-w-full justify-around will-change-transform',
        reverse ? 'animate-marquee-smooth-rev' : 'animate-marquee-smooth',
        pauseOnHover && 'group-hover:[animation-play-state:paused]'
      )}
      style={
        {
          '--marquee-duration': `${speed}s`,
          '--marquee-gap': '1rem',
        } as React.CSSProperties
      }
    >
      {items ? items.map((it, i) => renderItem(it, i)) : children}
    </div>
  );

  return (
    <div
      className={cn(
        'relative overflow-hidden flex w-full select-none group mask-fade-x py-1 gap-4',
        className
      )}
      style={
        {
          '--marquee-gap': '1rem',
        } as React.CSSProperties
      }
    >
      {trackContent}
      {trackContent}
      {trackContent}
    </div>
  );
}


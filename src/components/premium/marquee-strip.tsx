'use client';

import { cn } from '@/lib/utils';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/ui/scroll-based-velocity';

type Item = {
  label: string;
  value?: string;
  badge?: string;
};

type Props = {
  /** small caption above the strip */
  caption?: string;
  items: Item[];
  /** separator glyph */
  separator?: string;
  /** animation base velocity */
  speed?: number;
  /** whether to show a second reverse row */
  dualRow?: boolean;
  /** visual variant */
  variant?: 'default' | 'gold' | 'glass' | 'outline';
  className?: string;
};

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  default:
    'bg-kilimanjaro-900/[0.04] dark:bg-tanzania-50/[0.04] border-y border-kilimanjaro-900/10 dark:border-tanzania-50/10',
  gold: 'bg-gradient-to-r from-tanzania-500/10 via-tanzania-500/15 to-tanzania-500/10 border-y border-tanzania-500/30',
  glass: 'glass-card border-y border-white/10',
  outline:
    'border-y-2 border-dashed border-tanzania-500/40 bg-tanzania-50/30 dark:bg-kilimanjaro-950/30',
};

/**
 * MarqueeStrip — velocity-reactive scroll marquee.
 * Speeds up/slows down with page scroll momentum via framer-motion.
 * Optional dual-row layout (forward + reverse rows stacked).
 */
export function MarqueeStrip({
  caption,
  items,
  separator = '◆',
  speed = 2,
  dualRow = false,
  variant = 'default',
  className,
}: Props) {
  // Scale down the speed to make all marquees much slower
  const scaledVelocity = speed * 0.3;

  const rowContent = items.map((it, i) => (
    <span
      key={i}
      className="inline-flex items-center gap-5 px-5 select-none"
    >
      <span className="font-display font-bold text-base md:text-lg tracking-tight text-kilimanjaro-900 dark:text-tanzania-50">
        {it.label}
      </span>
      {it.value && (
        <span className="font-display text-tanzania-500 italic font-medium text-base">
          {it.value}
        </span>
      )}
      <span className="text-tanzania-500/60 text-sm">{separator}</span>
    </span>
  ));

  return (
    <section
      className={cn(
        'relative overflow-hidden py-5',
        variantClasses[variant],
        className
      )}
    >
      {caption && (
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 mb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400 flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-tanzania-500 animate-pulse" />
            {caption}
          </p>
        </div>
      )}

      <ScrollVelocityContainer>
        <ScrollVelocityRow
          baseVelocity={scaledVelocity}
          direction={1}
          className="py-1.5"
        >
          {rowContent}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </section>
  );
}

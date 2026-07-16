'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  prefix?: string;
};

type Props = {
  stats: Stat[];
  className?: string;
  cellClassName?: string;
  indexLabel?: boolean;
};

/**
 * Stats — count-up on scroll-into-view.
 * Tanzania Connect variant with brand typography.
 */
export function Stats({ stats, className, cellClassName, indexLabel = true }: Props) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-10', className)}>
      {stats.map((s, i) => (
        <StatCell
          key={i}
          {...s}
          index={i}
          total={stats.length}
          cellClassName={cellClassName}
          indexLabel={indexLabel}
        />
      ))}
    </div>
  );
}

function StatCell({
  value,
  label,
  suffix,
  prefix,
  decimals = 0,
  index,
  total,
  cellClassName,
  indexLabel,
}: Stat & { index: number; total: number; cellClassName?: string; indexLabel: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger more generously (was '-15%' which made stats sit at "0" until
  // the user scrolled them deep into view). '0%' fires as soon as any part
  // touches the viewport.
  const inView = useInView(ref, { once: true, margin: '0%' });
  // Initialize display to the formatted final value so that even if the count-up
  // animation never fires (e.g. IntersectionObserver unsupported, headless
  // browser quirks, JS error during hydration), users still see the correct
  // number — never a stuck "0".
  const initialDisplay =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  const [display, setDisplay] = useState(initialDisplay);
  const motionValue = useMotionValue(value);
  const displayValue = useTransform(motionValue, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  );

  // Safety fallback (HOISTED): if `inView` never fires for any reason
  // (IntersectionObserver unsupported, headless browser quirks, very large
  // initial render above the fold, or any layout edge case), snap to the
  // final value after 2.5s so users NEVER see a stuck "0".
  useEffect(() => {
    const fallback = window.setTimeout(() => {
      motionValue.set(value);
      setDisplay(
        decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
      );
    }, 2500);
    return () => window.clearTimeout(fallback);
  }, [value, decimals, motionValue]);

  useEffect(() => {
    if (!inView) return;
    // Reset to 0 so we can animate 0 → value when in view.
    motionValue.set(0);
    setDisplay(decimals > 0 ? '0'.padEnd(decimals + 2, '0') : '0');
    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    const unsub = displayValue.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, value, decimals, motionValue, displayValue]);

  const formatted = decimals === 0 && value >= 100
    ? Number(display).toLocaleString('en-US')
    : display;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative', cellClassName)}
    >
      {indexLabel && (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-kilimanjaro-500 dark:text-tanzania-300 mb-3">
          0{index + 1} <span className="text-tanzania-500">/</span> {String(total).padStart(2, '0')}
        </p>
      )}
      <p className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tightest text-kilimanjaro-900 dark:text-tanzania-50">
        {prefix}
        {formatted}
        {suffix && <span className="text-tanzania-500">{suffix}</span>}
      </p>
      <p className="mt-3 text-sm text-kilimanjaro-600 dark:text-tanzania-200 text-balance">{label}</p>
    </motion.div>
  );
}

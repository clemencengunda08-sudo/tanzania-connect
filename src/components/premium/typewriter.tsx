'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  className?: string;
  /** delay before typing starts (ms) */
  delay?: number;
  /** ms per character */
  speed?: number;
  /** show blinking caret after text is done */
  showCaret?: boolean;
  /** caret color class */
  caretClassName?: string;
  /** restart on text change */
  trigger?: number;
};

/**
 * Typewriter — single-line kinetic reveal.
 * Simpler than TypeWriter — used for intros, slogans, monologues.
 */
export function Typewriter({
  text,
  className,
  delay = 0,
  speed = 45,
  showCaret = true,
  caretClassName = 'text-tanzania-500',
  trigger,
}: Props) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setOut('');
    setDone(false);
    let cancelled = false;
    let i = 0;
    const start = setTimeout(function tick() {
      if (cancelled) return;
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) {
        setTimeout(tick, speed + Math.random() * 18);
      } else {
        setDone(true);
      }
    }, delay);
    return () => {
      cancelled = true;
      clearTimeout(start);
    };
  }, [text, speed, delay, trigger]);

  return (
    <span ref={ref} className={cn('inline-flex items-baseline', className)}>
      <span>{out}</span>
      {showCaret && (
        <span
          aria-hidden
          className={cn(
            'ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] font-extrabold',
            done ? 'animate-pulse' : 'animate-pulse',
            caretClassName
          )}
          style={{ background: 'currentColor' }}
        />
      )}
    </span>
  );
}

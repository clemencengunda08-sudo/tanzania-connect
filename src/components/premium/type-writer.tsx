'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

type Props = {
  words: string[];
  className?: string;
  /** ms per character while typing */
  typeSpeed?: number;
  /** ms per character while deleting */
  deleteSpeed?: number;
  /** pause at full word in ms */
  holdTime?: number;
  /** pause when empty in ms */
  pauseTime?: number;
  /** loop the words (default true) */
  loop?: boolean;
  /** caret symbol */
  cursor?: string;
  /** caret color class (Tailwind) */
  cursorClassName?: string;
  /** start animation only when scrolled into view (default true) */
  startOnView?: boolean;
};

/**
 * TypeWriter — kinetic typewriter with caret that cycles through words.
 * Audenic-style: paused-on-hover, smooth character reveal, blinking caret.
 *
 * Used in hero sections, sector intros, and CTA ribbons.
 */
export function TypeWriter({
  words,
  className,
  typeSpeed = 65,
  deleteSpeed = 38,
  holdTime = 1400,
  pauseTime = 380,
  loop = true,
  cursor = '|',
  cursorClassName = 'text-tanzania-500',
  startOnView = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px' });

  const [index, setIndex] = useState(0); // current word index
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'deleting' | 'paused'>('typing');
  const [started, setStarted] = useState(!startOnView);

  useEffect(() => {
    if (startOnView && inView) setStarted(true);
  }, [inView, startOnView]);

  useEffect(() => {
    if (!started || words.length === 0) return;
    const word = words[index % words.length];

    let delay: number;
    switch (phase) {
      case 'typing':
        if (text.length < word.length) {
          delay = typeSpeed + Math.random() * 30; // humanize
          const t = setTimeout(() => setText(word.slice(0, text.length + 1)), delay);
          return () => clearTimeout(t);
        }
        setPhase('holding');
        return;
      case 'holding':
        const h = setTimeout(() => setPhase('deleting'), holdTime);
        return () => clearTimeout(h);
      case 'deleting':
        if (text.length > 0) {
          delay = deleteSpeed;
          const t = setTimeout(() => setText(word.slice(0, text.length - 1)), delay);
          return () => clearTimeout(t);
        }
        if (loop) {
          setPhase('paused');
        } else {
          return;
        }
        return;
      case 'paused':
        const p = setTimeout(() => {
          setIndex((i) => (i + 1) % words.length);
          setPhase('typing');
        }, pauseTime);
        return () => clearTimeout(p);
    }
  }, [text, phase, index, words, typeSpeed, deleteSpeed, holdTime, pauseTime, loop, started]);

  return (
    <span ref={ref} className={cn('inline-flex items-baseline', className)}>
      <span aria-live="polite" className="text-balance">
        {text}
        <span className="sr-only">{words.join(', ')}</span>
      </span>
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        className={cn('ml-0.5 inline-block font-extrabold', cursorClassName)}
      >
        {cursor}
      </motion.span>
    </span>
  );
}

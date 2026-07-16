'use client';
import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
};

/**
 * RevealOnScroll — fade + translate on scroll-into-view.
 * The default entrance animation for any premium block.
 */
export function RevealOnScroll({
  children,
  className,
  delay = 0,
  duration = 0.7,
  y = 28,
  once = true,
  margin = '-10%',
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: margin as `${number}%` });
  const reduce = useReducedMotion();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = motion[as];

  return (
    <Component
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

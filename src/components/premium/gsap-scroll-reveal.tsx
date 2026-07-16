'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  as?: 'div' | 'section' | 'span' | 'h1' | 'h2' | 'p';
};

/**
 * GSAPScrollReveal — Premium scroll-triggered reveal.
 * Children fade up with cubic easing, optionally staggered.
 * Game-like: each element arrives with weight.
 */
export function GSAPScrollReveal({
  children,
  className,
  delay = 0,
  y = 60,
  duration = 1.1,
  stagger = 0,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const target = stagger > 0 ? ref.current.children : ref.current;
      gsap.from(target, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
};

/**
 * GSAPSplitText — Letter-by-letter reveal on scroll.
 * The Audenic-style cinematic headline animation.
 */
export function GSAPSplitText({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const chars = ref.current.querySelectorAll('.split-char');
      gsap.from(chars, {
        y: 100,
        opacity: 0,
        rotateX: -90,
        duration: 1,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: ref }
  );

  const Component = Tag as 'h1';
  return (
    <Component ref={ref as never} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="split-char inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </Component>
  );
}

type PinnedProps = {
  children: ReactNode;
  className?: string;
  pinDuration?: string; // e.g. '100%'
};

/**
 * GSAPPinnedSection — Pinned section that scrubs content.
 * Game-like: scroll triggers 3D rotations, fades, slides.
 */
export function GSAPPinnedSection({
  children,
  className,
  pinDuration = '100%',
}: PinnedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const sections = ref.current.querySelectorAll('[data-pin-step]');
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => `+=${pinDuration}`,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = up, positive = down
};

/**
 * GSAPParallax — Subtle parallax on scroll.
 * Creates depth like in premium sites.
 */
export function GSAPParallax({
  children,
  className,
  speed = -0.3,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type MagneticScrollProps = {
  children: ReactNode;
  className?: string;
  strength?: number; // 0-1
};

/**
 * GSAPScrollProgress — Top progress bar driven by scroll.
 */
export function GSAPScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'max',
        scrub: 0.3,
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-tanzania-500 via-tanzania-500 to-zanzibar-500 z-[200] origin-left"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}

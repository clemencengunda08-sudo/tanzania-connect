"use client";

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  /** Animation type */
  variant?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-in' | 'parallax';
  /** Delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Distance to travel (px) */
  distance?: number;
  /** Stagger child animations (s) */
  stagger?: number;
  /** Optional className */
  className?: string;
  /** Optional id */
  id?: string;
  /** Trigger once or every scroll */
  once?: boolean;
}

/**
 * ScrollReveal — GSAP-powered scroll-triggered animations.
 * Default: fade-up (30px → 0) with cubic ease.
 * For parallax, children translate at different speed as you scroll.
 */
export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.9,
  distance = 40,
  stagger = 0,
  className = '',
  id,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // For parallax, we need direct element control
    if (variant === 'parallax') {
      gsap.fromTo(
        el,
        { y: -distance },
        {
          y: distance,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
      return;
    }

    // For child-staggered animations
    const targets = stagger > 0 ? el.children : el;

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once,
      },
    };

    switch (variant) {
      case 'fade-up':
        fromVars.y = distance;
        toVars.y = 0;
        break;
      case 'slide-left':
        fromVars.x = distance;
        toVars.x = 0;
        break;
      case 'slide-right':
        fromVars.x = -distance;
        toVars.x = 0;
        break;
      case 'scale-in':
        fromVars.scale = 0.9;
        toVars.scale = 1;
        break;
      case 'fade-in':
      default:
        break;
    }

    if (stagger > 0) {
      gsap.fromTo(targets, fromVars, { ...toVars, stagger });
    } else {
      gsap.fromTo(el, fromVars, toVars);
    }
  }, {
    dependencies: [variant, delay, duration, distance, stagger, once],
    scope: ref,
  });

  return (
    <div ref={ref} className={className} id={id}>
      {children}
    </div>
  );
}

/**
 * SectionParallax — applies a parallax background effect to a section.
 * The first child element (e.g. an image) moves slower as the user scrolls.
 */
export function SectionParallax({
  children,
  speed = 0.4,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        backgroundPositionY: `${speed * 100}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

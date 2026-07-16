'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollSyncedText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    const title = titleRef.current;

    if (!container) return;

    // Horizontal synced translation on vertical scroll
    if (row1) {
      gsap.fromTo(
        row1,
        { x: '10%' },
        {
          x: '-10%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }

    if (row2) {
      gsap.fromTo(
        row2,
        { x: '-15%' },
        {
          x: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }

    // Zoom/Rotation effect on images inside rows on scroll
    const images = container.querySelectorAll('.scroll-img');
    images.forEach((img, i) => {
      gsap.fromTo(
        img,
        { rotate: i % 2 === 0 ? -10 : 10, scale: 0.8 },
        {
          rotate: i % 2 === 0 ? 5 : -5,
          scale: 1.1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom center',
            scrub: true,
          },
        }
      );
    });

    // Animate letters in the title when scrolled into view
    const letters = container.querySelectorAll('.slide-letter');
    if (letters.length > 0) {
      gsap.fromTo(
        letters,
        { y: '100%', opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        {
          y: '0%',
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, { scope: containerRef });

  const titleWords = ['T', 'A', 'N', 'Z', 'A', 'N', 'I', 'A'];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-36 overflow-hidden bg-gradient-to-b from-transparent via-tanzania-500/5 to-transparent"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center space-y-16">
        
        {/* Sliding brand header (KYRO-style sliding letters) */}
        <div ref={titleRef} className="text-center select-none overflow-hidden pb-4">
          <h2 className="leading-none tracking-tight text-kilimanjaro-950 dark:text-white">
            <span className="block text-[14vw] sm:text-[10vw] md:text-[8vw] font-black uppercase">
              {titleWords.map((letter, idx) => (
                <span
                  key={idx}
                  className="slide-letter inline-block"
                  style={{ display: 'inline-block' }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h2>
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.35em] text-tanzania-500 dark:text-tanzania-400 mt-4 font-black">
            The Gateway to East Africa
          </p>
        </div>

        {/* Scroll-driven horizontal stagger layout */}
        <div className="w-full flex flex-col space-y-8 items-center text-center">
          
          {/* Row 1 (Translates Left on Scroll) */}
          <div ref={row1Ref} className="flex flex-nowrap items-center justify-center gap-4 sm:gap-6 whitespace-nowrap will-change-transform">
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold font-display text-kilimanjaro-900 dark:text-white">
              Explore the wild,
            </span>
            <div className="relative inline-block w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 bg-muted rounded-2xl overflow-hidden shadow-xl border border-white/10 scroll-img shrink-0">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202034/tanzania_connect/static/serengeti-safari.jpg"
                alt="Serengeti Safari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 200px"
              />
            </div>
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold italic text-tanzania-500">
              discover Zanzibar,
            </span>
            <div className="relative inline-block w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 bg-muted rounded-2xl overflow-hidden shadow-xl border border-white/10 scroll-img shrink-0">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202052/tanzania_connect/static/zanzibar-beach.jpg"
                alt="Zanzibar Beach"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 200px"
              />
            </div>
          </div>

          {/* Row 2 (Translates Right on Scroll) */}
          <div ref={row2Ref} className="flex flex-nowrap items-center justify-center gap-4 sm:gap-6 whitespace-nowrap will-change-transform">
            <div className="relative inline-block w-20 h-12 sm:w-28 sm:h-16 md:w-36 md:h-20 bg-muted rounded-2xl overflow-hidden shadow-xl border border-white/10 scroll-img shrink-0">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202019/tanzania_connect/static/mount-kilimanjaro.jpg"
                alt="Mount Kilimanjaro"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 200px"
              />
            </div>
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold font-display text-kilimanjaro-900 dark:text-white">
              build your legacy
            </span>
            <div className="relative inline-block w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 bg-muted rounded-2xl overflow-hidden shadow-xl border border-white/10 scroll-img shrink-0">
              <Image
                src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201989/tanzania_connect/static/dar-es-salaam.jpg"
                alt="Dar es Salaam"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100px, 200px"
              />
            </div>
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold italic text-tanzania-500">
              in Tanzania.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ScrollSyncedText;

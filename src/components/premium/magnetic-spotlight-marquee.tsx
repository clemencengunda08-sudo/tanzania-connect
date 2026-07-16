'use client';

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticSpotlightMarqueeProps {
  className?: string;
  images?: string[];
  title?: string[];
  navEmail?: string;
  navLinks?: string;
}

const config = {
  marqueeScrollSpeed: 180,
  stripFollowEase: 0.08,
  stripEdgeInset: 180,
  contentRiseRate: 0.65,
  risenTopGap: 80,
  liftHeadStart: 100,
  wakeStrength: 1.8,
  wakeReach: 100,
  lineSettleEase: 0.12,
};

const DEFAULT_TITLE = ["Tanzania Reach"];

export function MagneticSpotlightMarquee({
  className,
  images = [],
  title = DEFAULT_TITLE,
  navEmail = "expert@tanzaniareach.com",
  navLinks = "Checklists, Sectors, Regulatory Board",
}: MagneticSpotlightMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeStripRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // State to hold cloned images to fill width
  const [clonedImages, setClonedImages] = useState<string[]>(images);

  useEffect(() => {
    if (!images || images.length === 0) return;
    if (!marqueeTrackRef.current || !marqueeStripRef.current || !containerRef.current || !contentWrapperRef.current) return;

    const marqueeTrack = marqueeTrackRef.current;

    // Calculate width statically to avoid issues with unloaded images
    const isMobile = window.innerWidth < 768;
    const itemWidth = isMobile ? 180 : 280;
    const gap = 16;
    const oneSetWidth = images.length * (itemWidth + gap);
    const setsNeeded = Math.ceil(window.innerWidth / oneSetWidth) + 2;
    
    const newImages = [];
    for (let i = 0; i < setsNeeded; i++) {
      newImages.push(...images);
    }
    setClonedImages(newImages);

    const ctx = gsap.context(() => {
      setTimeout(() => {
         gsap.to(marqueeTrack, {
           x: `-${oneSetWidth}px`,
           duration: oneSetWidth / 120, // balanced speed
           ease: "none",
           repeat: -1,
           modifiers: {
             x: (x) => `${gsap.utils.wrap(-oneSetWidth, 0, parseFloat(x))}px`
           }
         });
      }, 100);
    }, marqueeTrack);

    return () => ctx.revert();
  }, [images]);

  // Wake effect logic
  useEffect(() => {
    if (!containerRef.current || !marqueeStripRef.current || !contentWrapperRef.current) return;

    const spotlightSection = containerRef.current;
    const marqueeStrip = marqueeStripRef.current;

    let stripBaseTop = 0;
    let stripHeight = 0;
    let sectionHeight = 0;
    let stripRestCenterY = 0;
    let contentTopAtRest = 0;

    let stripTargetY = 0;
    let stripCurrentY = 0;
    let stripPrevY = 0;
    let hasPointerMoved = false;

    let targets: { el: HTMLElement; restCenterY: number; currentY: number }[] = [];
    let rafId: number;

    const measureGeometry = () => {
      if (!spotlightSection || !marqueeStrip) return;
      sectionHeight = spotlightSection.getBoundingClientRect().height;
      stripBaseTop = marqueeStrip.offsetTop;
      stripHeight = marqueeStrip.offsetHeight;
      
      stripRestCenterY = config.stripEdgeInset;
      
      const elements = Array.from(spotlightSection.querySelectorAll('.wake-target')) as HTMLElement[];
      
      let blockTop = Infinity;
      targets = elements.map(el => {
        let y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== spotlightSection) {
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement;
        }
        const restCenterY = y + el.offsetHeight / 2;
        blockTop = Math.min(blockTop, restCenterY - el.offsetHeight / 2);
        
        return {
          el,
          restCenterY,
          currentY: 0
        };
      });

      contentTopAtRest = isFinite(blockTop) ? blockTop : sectionHeight * 0.4;
      
      if (!hasPointerMoved) {
        const restY = config.stripEdgeInset - stripHeight / 2;
        stripTargetY = restY;
        stripCurrentY = restY;
        stripPrevY = restY;
        gsap.set(marqueeStrip, { y: stripCurrentY });
      }
    };

    setTimeout(measureGeometry, 150);
    window.addEventListener('resize', measureGeometry);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = spotlightSection.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      hasPointerMoved = true;
      stripTargetY = pointerY - stripHeight / 2;
    };

    const handlePointerLeave = () => {
      hasPointerMoved = false;
      stripTargetY = config.stripEdgeInset - stripHeight / 2;
    };

    spotlightSection.addEventListener('mousemove', handlePointerMove);
    spotlightSection.addEventListener('mouseleave', handlePointerLeave);

    const render = () => {
      stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase;
      gsap.set(marqueeStrip, { y: stripCurrentY });

      const stripCenterY = stripBaseTop + stripCurrentY + stripHeight / 2;
      const stripVelocityY = stripCurrentY - stripPrevY;
      stripPrevY = stripCurrentY;

      const descentBelowRest = Math.max(0, stripCenterY - stripRestCenterY);
      const maxRise = Math.max(0, contentTopAtRest - config.risenTopGap);
      const contentRise = -Math.min(
        descentBelowRest * config.contentRiseRate,
        maxRise
      );

      targets.forEach(line => {
        const gapToStrip = line.restCenterY - stripCenterY;
        const reachedLine = stripCenterY + config.liftHeadStart >= line.restCenterY;
        
        const wakeInfluence = Math.exp(
          -(gapToStrip * gapToStrip) / (2 * config.wakeReach * config.wakeReach)
        );
        const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;
        
        const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
        
        line.currentY += (lineTarget - line.currentY) * config.lineSettleEase;
        gsap.set(line.el, { y: line.currentY });
      });

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', measureGeometry);
      if (spotlightSection) {
        spotlightSection.removeEventListener('mousemove', handlePointerMove);
        spotlightSection.removeEventListener('mouseleave', handlePointerLeave);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "spotlight relative w-full h-[45vh] min-h-[320px] md:h-[55vh] md:min-h-[420px] overflow-hidden bg-kilimanjaro-950 text-white rounded-[2.5rem] border border-tanzania-500/20 shadow-2xl my-12",
        className
      )}
    >
      {/* Top Details */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between z-40 text-[9px] md:text-xs font-mono tracking-widest opacity-60 pointer-events-none uppercase">
        <div>{navEmail}</div>
        <div>{navLinks}</div>
      </div>

      {/* Spotlight Marquee Strip - Larger Pictures */}
      <div 
        ref={marqueeStripRef} 
        className="spotlight-marquee absolute left-0 w-full z-20 h-[210px] md:h-[310px] pointer-events-none"
        style={{ top: 0 }} 
      >
        <div 
          ref={marqueeTrackRef} 
          className="spotlight-marquee-track flex gap-4 h-full items-center absolute top-0 left-0"
        >
          {clonedImages.map((img, idx) => (
            <div key={idx} className="w-[130px] h-[190px] md:w-[200px] md:h-[280px] shrink-0 rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-white/5">
              <img
                src={img}
                alt="Tanzania spotlight visual"
                className="w-full h-full object-cover select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout - Title Only */}
      <div 
        ref={contentWrapperRef}
        className="spotlight-content-wrapper relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 z-30 pointer-events-none mix-blend-difference"
      >
        {/* Title - One Line */}
        <h2 
          className="text-[10vw] md:text-[6.5rem] font-display font-medium tracking-tightest text-center flex flex-col items-center select-none text-white leading-none whitespace-nowrap"
        >
          {title.map((line, idx) => (
            <div key={idx} className="wake-target inline-block relative">
              {line}
              {idx === title.length - 1 && (
                <span className="absolute right-[-0.15em] bottom-[0.1em] w-[0.12em] h-[0.12em] bg-tanzania-500 rounded-full animate-pulse-soft"></span>
              )}
            </div>
          ))}
        </h2>
      </div>
    </section>
  );
}

export default MagneticSpotlightMarquee;

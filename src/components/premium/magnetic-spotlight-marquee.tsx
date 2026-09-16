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

function SpotlightImage({ src }: { src: string }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full h-full bg-neutral-900/60 flex items-center justify-center">
      {/* Pulse skeleton */}
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/80 via-neutral-700/80 to-neutral-800/80 animate-pulse" />
      )}

      {/* Error state fallback */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-tanzania-950/40 to-kilimanjaro-950/40 p-4 text-center">
          <svg className="w-8 h-8 text-tanzania-500/40 mb-2 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-mono select-none">Tanzania Connect</span>
        </div>
      ) : (
        <img
          src={src}
          alt="Tanzania spotlight visual"
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          className={cn(
            "w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ease-out-expo",
            loading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        />
      )}
    </div>
  );
}

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
           repeat: -1,
           ease: "none",
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
      if (!containerRef.current || !marqueeStripRef.current || !contentWrapperRef.current) return;
      
      const rect = spotlightSection.getBoundingClientRect();
      sectionHeight = rect.height;
      
      const stripRect = marqueeStrip.getBoundingClientRect();
      stripHeight = stripRect.height;
      
      stripRestCenterY = sectionHeight * 0.55;
      stripBaseTop = stripRestCenterY - stripHeight * 0.5;
      
      marqueeStrip.style.top = `${stripBaseTop}px`;
      
      const wakeTargets = contentWrapperRef.current.querySelectorAll('.wake-target');
      targets = Array.from(wakeTargets).map((el: any) => {
        const elRect = el.getBoundingClientRect();
        const elRelativeCenter = elRect.top - rect.top + elRect.height * 0.5;
        return {
          el,
          restCenterY: elRelativeCenter,
          currentY: 0,
        };
      });
      
      contentTopAtRest = sectionHeight * 0.5;
    };

    setTimeout(measureGeometry, 200);
    window.addEventListener('resize', measureGeometry);

    let isVisible = false;
    let isRendering = false;

    const startRender = () => {
      if (!isRendering && isVisible) {
        isRendering = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = spotlightSection.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      
      const normY = relativeY / sectionHeight;
      const margin = config.stripEdgeInset / sectionHeight;
      const clampedNormY = Math.max(margin, Math.min(1 - margin, normY));
      
      stripTargetY = (clampedNormY - 0.5) * sectionHeight * 0.85;
      hasPointerMoved = true;
      startRender();
    };

    const handlePointerLeave = () => {
      stripTargetY = 0;
      hasPointerMoved = true;
      startRender();
    };

    spotlightSection.addEventListener('mousemove', handlePointerMove);
    spotlightSection.addEventListener('mouseleave', handlePointerLeave);

    const render = () => {
      stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase;
      gsap.set(marqueeStrip, { y: stripCurrentY });

      const stripVelocityY = stripCurrentY - stripPrevY;
      stripPrevY = stripCurrentY;

      const stripCenterY = stripRestCenterY + stripCurrentY;
      let hasPendingMotion = Math.abs(stripTargetY - stripCurrentY) > 0.08 || Math.abs(stripVelocityY) > 0.05;

      targets.forEach((line) => {
        const distanceToStrip = line.restCenterY - stripCenterY;
        const reachedLine = Math.abs(distanceToStrip) < config.wakeReach;
        
        const riseRatio = Math.max(0, 1 - (stripCenterY / contentTopAtRest));
        const contentRise = -riseRatio * config.risenTopGap * config.contentRiseRate;
        
        const wakeInfluence = Math.exp(-Math.pow(distanceToStrip / (config.wakeReach * 0.6), 2));
        const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;
        
        const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
        
        line.currentY += (lineTarget - line.currentY) * config.lineSettleEase;
        gsap.set(line.el, { y: line.currentY });

        if (Math.abs(lineTarget - line.currentY) > 0.08) {
          hasPendingMotion = true;
        }
      });

      if (isVisible && (hasPendingMotion || hasPointerMoved)) {
        rafId = requestAnimationFrame(render);
      } else {
        isRendering = false;
        hasPointerMoved = false;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && hasPointerMoved) {
          startRender();
        } else if (!isVisible && isRendering) {
          cancelAnimationFrame(rafId);
          isRendering = false;
        }
      },
      { threshold: 0.05 }
    );
    io.observe(spotlightSection);

    return () => {
      window.removeEventListener('resize', measureGeometry);
      io.disconnect();
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
              <SpotlightImage src={img} />
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

"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const destinationData = [
  {
    place: 'Mount Kilimanjaro',
    title: 'THE ROOF',
    title2: 'OF AFRICA',
    description: 'Mount Kilimanjaro, the highest peak in Africa, stands as an iconic symbol of natural wonder. Rising 5,895 meters above the savannah, its snow-capped peak challenges climbers and inspires travelers from around the globe.',
    image: '/images/tanzania/mount-kilimanjaro.jpg'
  },
  {
    place: 'Serengeti National Park',
    title: 'THE GREAT',
    title2: 'WILD MIGRATION',
    description: 'Witness the world\'s most spectacular wildlife event. Millions of wildebeest, zebras, and gazelles traverse the Serengeti plains in an endless circle of life, followed closely by Africa\'s apex predators.',
    image: '/images/tanzania/serengeti-safari.jpg'
  },
  {
    place: 'Zanzibar Stone Town',
    title: 'THE SPICE',
    title2: 'ISLAND COAST',
    description: 'Stroll through the narrow labyrinth of Stone Town, a UNESCO World Heritage site rich in culture and history. Enjoy the pristine beaches and turquoise waters of Nungwi and Kendwa.',
    image: '/images/tanzania/zanzibar-beach.jpg'
  },
  {
    place: 'Ngorongoro Crater',
    title: 'THE INTACT',
    title2: 'VOLCANIC CALDERA',
    description: 'Explore the world\'s largest inactive and unfilled volcanic caldera. A natural sanctuary hosting over 25,000 large mammals, including the rare black rhino, living in ecological harmony.',
    image: '/images/tanzania/ngorongoro-crater.jpg'
  },
  {
    place: 'Mafia Island',
    title: 'MARINE',
    title2: 'RESERVE HAVEN',
    description: 'A secluded paradise for divers and snorkelers. Mafia Island hosts vibrant coral reefs, green turtle nesting sites, and seasonal congregations of whale sharks in crystal clear waters.',
    image: '/images/tanzania/mafia-island.jpg'
  },
  {
    place: 'Arusha Highlands',
    title: 'GATEWAY TO',
    title2: 'NORTHERN SAFARI',
    description: 'Nestled under Mount Meru, Arusha offers lush coffee plantations, temperate highland climates, and serves as the primary base for expeditions to Kilimanjaro and the Serengeti.',
    image: '/images/tanzania/arusha-town.jpg'
  }
];

export function TimedSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 1200, height: 600 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Resize listener
  useEffect(() => {
    const updateDims = () => {
      if (containerRef.current) {
        setDims({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Timer loop for auto-play (6s)
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinationData.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % destinationData.length);
    resetTimer();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + destinationData.length) % destinationData.length);
    resetTimer();
  };

  // GSAP animation logic
  useGSAP(() => {
    if (!dims.width || !dims.height) return;

    const active = activeIndex;
    const rest: number[] = [];
    for (let i = 1; i < destinationData.length; i++) {
      rest.push((activeIndex + i) % destinationData.length);
    }

    // 1. Active card covers the full container viewport
    gsap.to(`#card-${active}`, {
      x: 0,
      y: 0,
      width: dims.width,
      height: dims.height,
      borderRadius: 40, // Match premium container curvature
      zIndex: 10,
      duration: 0.8,
      ease: "power3.inOut",
    });

    // 2. Animate text details of the active card
    gsap.fromTo(
      `#details-${active} .animate-item`,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.2 }
    );

    // 3. Stacked cards alignment in bottom right
    const isMobile = dims.width < 768;
    const cardWidth = isMobile ? 120 : 160;
    const cardHeight = isMobile ? 180 : 240;
    const gap = 16;
    const offsetTop = dims.height - (isMobile ? 220 : 290);
    const offsetLeft = dims.width - (isMobile ? 140 : 540);

    rest.forEach((i, idx) => {
      if (isMobile) {
        // Hide all stacked cards on mobile to keep layout clean
        gsap.to(`#card-${i}`, {
          opacity: 0,
          scale: 0.8,
          zIndex: 0,
          duration: 0.4,
        });
      } else {
        // Spread stacked cards on desktop
        const xNew = offsetLeft + idx * (cardWidth + gap);
        const yNew = offsetTop;

        gsap.to(`#card-${i}`, {
          x: xNew,
          y: yNew,
          width: cardWidth,
          height: cardHeight,
          borderRadius: 24, // Soft premium curves
          opacity: idx < 3 ? 1 : 0, // Show max 3 cards in queue
          scale: 1,
          zIndex: 20 + idx,
          duration: 0.8,
          ease: "power3.inOut",
        });
      }
    });

    // 4. Animate the progress bar fill from 0% to 100% over the 6s window
    gsap.fromTo(
      ".progress-fill",
      { width: "0%" },
      { width: "100%", duration: 6, ease: "none" }
    );

  }, { dependencies: [activeIndex, dims], scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[550px] md:h-[650px] rounded-[2.5rem] bg-zinc-950 border border-border/40 overflow-hidden select-none shadow-2xl"
    >
      {/* Background Cards */}
      {destinationData.map((item, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={idx}
            id={`card-${idx}`}
            className="absolute bg-cover bg-center cursor-pointer overflow-hidden group/card"
            style={{ backgroundImage: `url(${item.image})` }}
            onClick={() => {
              if (!isActive) {
                setActiveIndex(idx);
                resetTimer();
              }
            }}
          >
            {/* Dark Overlay Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300" />

            {/* Stacked Card Content (Invisible when active) */}
            <div
              id={`card-content-${idx}`}
              className={`absolute bottom-6 left-6 right-6 text-white transition-all duration-500 ${
                isActive ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
              }`}
            >
              <p className="text-[9px] font-mono uppercase tracking-[0.25em] text-tanzania-400 mb-1.5">{item.place}</p>
              <h4 className="font-display text-sm font-bold uppercase tracking-tight leading-none group-hover/card:text-tanzania-300 transition-colors">
                {item.title} <br />
                <span className="text-white">{item.title2}</span>
              </h4>
            </div>
          </div>
        );
      })}

      {/* Details Box (Left Side Overlay) */}
      {destinationData.map((item, idx) => (
        <div
          key={idx}
          id={`details-${idx}`}
          className={`absolute left-8 md:left-16 top-1/4 max-w-[85%] md:max-w-[480px] z-30 transition-opacity duration-300 ${
            idx === activeIndex ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="place-box overflow-hidden mb-3 animate-item">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/95 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-tanzania-500 rounded-full" />
              {item.place}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-none animate-item">
            {item.title}
          </h2>
          <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-tanzania-400 leading-none animate-item">
            {item.title2}
          </h2>
          <p className="text-xs md:text-sm text-white/80 leading-relaxed mt-5 max-w-sm md:max-w-md font-medium text-balance animate-item">
            {item.description}
          </p>
          <div className="flex items-center gap-4 mt-8 animate-item">
            <Link href="/wildlife">
              <Button className="rounded-full bg-tanzania-500 hover:bg-tanzania-600 text-white font-mono text-xs uppercase tracking-wider px-8 h-12 shadow-lg shadow-tanzania-500/20 active:scale-95 transition-all">
                Explore Destination
              </Button>
            </Link>
          </div>
        </div>
      ))}

      {/* Top Slide indicator stripe */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-white/10 z-40">
        <div className="h-full bg-tanzania-500 progress-fill" style={{ width: "0%" }} />
      </div>

      {/* Pagination Controls */}
      <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-16 flex items-center justify-between md:justify-start gap-6 z-40">
        {/* Left / Right Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full border border-white/20 hover:border-white/50 text-white/80 hover:text-white flex items-center justify-center bg-black/10 hover:bg-white/10 backdrop-blur-md active:scale-90 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full border border-white/20 hover:border-white/50 text-white/80 hover:text-white flex items-center justify-center bg-black/10 hover:bg-white/10 backdrop-blur-md active:scale-90 transition-all cursor-pointer"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* ProgressBar & Numbers */}
        <div className="flex items-center gap-4 md:ml-6">
          <span className="font-mono text-xs font-bold text-white/40">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <div className="w-24 md:w-36 h-[2px] bg-white/10 overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-tanzania-500 transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / destinationData.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-white/90">
            {String(destinationData.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

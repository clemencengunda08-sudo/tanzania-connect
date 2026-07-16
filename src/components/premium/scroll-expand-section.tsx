"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollExpandSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%",
        scrub: 1,
        pin: true,
      }
    });

    // Phase 1: Expand clip-path to cover the whole screen and reduce border-radius to 0px
    tl.to(maskRef.current, {
      clipPath: "inset(0vh 0vw round 0px)",
      ease: "power2.inOut",
      duration: 1,
    });

    // Phase 2: Fade in and slide up text elements
    tl.to(".expand-text-item", {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      ease: "power2.out",
      duration: 0.8,
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-tanzania-50 dark:bg-kilimanjaro-950"
    >
      <div
        ref={maskRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center z-10"
        style={{
          clipPath: "inset(20vh 15vw round 32px)",
          willChange: "clip-path",
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202034/tanzania_connect/static/serengeti-safari.jpg"
            alt="Serengeti Safari Wilderness"
            fill
            sizes="100vw"
            className="object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Text Overlay */}
        <div className="text-center text-white z-20 px-6 max-w-4xl">
          <h2 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tightest mb-4 opacity-0 translate-y-8 expand-text-item leading-[0.9]">
            A Land of <br className="sm:hidden" />
            <span className="italic bg-gradient-to-br from-tanzania-200 via-zanzibar-300 to-tanzania-400 bg-clip-text text-transparent">Breathtaking Scale.</span>
          </h2>
          <p className="text-sm md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed opacity-0 translate-y-8 expand-text-item font-medium">
            From the peaks of Kilimanjaro to the horizons of the Serengeti, explore a landscape of infinite opportunity and cultural heritage.
          </p>
        </div>
      </div>
    </div>
  );
}

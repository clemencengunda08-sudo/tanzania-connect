"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Typewriter,
  LetterReveal,
} from "@/components/typing";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroBg = PlaceHolderImages.find((p) => p.id === "mount-kilimanjaro");

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Continuous breathing float for the background image
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scale: 1.04,
        y: -8,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // 2. Mouse Parallax effect on the background and text wrapper
    const section = sectionRef.current;
    if (section && !window.matchMedia("(pointer: coarse)").matches) {
      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        gsap.to(".bg-parallax", {
          x: x * -25,
          y: y * -15,
          duration: 1.4,
          ease: "power2.out",
          overwrite: "auto"
        });

        gsap.to(".hero-content-wrapper", {
          x: x * 15,
          y: y * 10,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      
      section.addEventListener("mousemove", onMouseMove);
      return () => {
        section.removeEventListener("mousemove", onMouseMove);
      };
    }
  }, { scope: sectionRef });

  useGSAP(() => {
    // 3. Magnetic CTA button effect
    const btn = btnRef.current;
    if (btn && !window.matchMedia("(pointer: coarse)").matches) {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        gsap.to(btn, {
          x: x * 16,
          y: y * 16,
          scale: 1.02,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "elastic.out(1, 0.55)",
          overwrite: "auto"
        });
      };

      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);
      return () => {
        btn.removeEventListener("mousemove", onMouseMove);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 py-20 md:py-24 bg-kilimanjaro-950"
      style={{ perspective: 1000 }}
    >
      {/* === Background image === */}
      {heroBg && (
        <div ref={bgRef} className="absolute inset-0 -z-10 bg-parallax">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroBg.imageUrl}
              alt={heroBg.description}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          {/* Gradient overlay for depth + readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-kilimanjaro-950/70 via-kilimanjaro-950/30 to-kilimanjaro-950/80" />
          <div className="absolute inset-0 bg-gradient-to-tr from-tanzania-900/30 via-transparent to-transparent" />
        </div>
      )}

      <div className="container mx-auto text-center max-w-5xl relative z-10 hero-content-wrapper">
        {/* Badge — clean, no emoji */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-fit mb-8"
        >
          <Badge className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] bg-white/10 text-white/90 border-white/20 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-tanzania-400 animate-pulse mr-2 inline-block" />
            Live in Tanzania · 2026 Edition
          </Badge>
        </motion.div>

        {/* Main Heading — 2 lines max */}
        <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[7rem] font-headline font-black tracking-[-0.04em] text-white leading-[0.95] md:leading-[0.9] mb-8">
          <LetterReveal text="Navigate" className="block" immediate={true} />
          <span className="block mt-2">
            <span className="italic bg-gradient-to-br from-tanzania-200 via-zanzibar-300 to-tanzania-400 bg-clip-text text-transparent">
              Tanzania.
            </span>
          </span>
        </h1>

        {/* Typing Subtitle */}
        <div className="text-lg md:text-xl text-white/80 font-normal leading-relaxed max-w-3xl mx-auto mb-12 min-h-[4rem] md:min-h-[3rem] flex flex-col md:flex-row items-center justify-center">
          <span className="md:mr-3">Professional intelligence for</span>
          <div className="min-w-[150px] md:min-w-[220px] inline-block text-center md:text-left mt-2 md:mt-0">
            <Typewriter
              texts={["investment", "immigration", "business", "real estate", "tourism", "mining"]}
              className="font-semibold text-white border-b-2 border-tanzania-400"
              cursorClassName="bg-tanzania-300"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/guides" className="w-full sm:w-auto">
            <Button
              ref={btnRef}
              size="lg"
              className="w-full h-14 px-10 rounded-full bg-white text-kilimanjaro-900 text-base font-semibold shadow-xl hover:bg-tanzania-50 transition-all gap-2.5 group"
            >
              Explore sectors
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
          <Link href="/news" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 px-10 rounded-full border-white/25 bg-white/5 backdrop-blur-md text-white text-base font-medium hover:bg-white/10 hover:border-white/40 transition-all gap-2"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              Live news
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

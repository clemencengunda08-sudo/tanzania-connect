"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MapPin, Train, Camera } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const columnLeftItems = [
  {
    title: "Mount Kilimanjaro",
    desc: "Africa's highest snow-capped peak standing at 5,895 meters above the savannah plains.",
    image: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202019/tanzania_connect/static/mount-kilimanjaro.jpg",
    badge: "Roof of Africa",
    icon: Sparkles,
  },
  {
    title: "The Great Migration",
    desc: "Millions of wildebeests, zebras, and gazelles traversing the endless Serengeti grasslands.",
    image: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202034/tanzania_connect/static/serengeti-safari.jpg",
    badge: "Serengeti National Park",
    icon: Camera,
  },
  {
    title: "Zanzibar White Sands",
    desc: "Crystal-clear turquoise waters and soft sand beaches lining the historic Spice Island.",
    image: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202052/tanzania_connect/static/zanzibar-beach.jpg",
    badge: "Coastal Paradise",
    icon: MapPin,
  },
];

const columnRightItems = [
  {
    title: "The Modern SGR Train",
    desc: "Standard Gauge Railway linking the port hub of Dar es Salaam directly to the capital Dodoma.",
    image: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202036/tanzania_connect/static/sgr-pic-user.jpg",
    badge: "Electric Transit",
    icon: Train,
  },
  {
    title: "Urban Skyline Development",
    desc: " Dar es Salaam's commercial center expansion with skyscrapers overlooking the harbor.",
    image: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201988/tanzania_connect/static/dar-es-salaam-housing.png",
    badge: "Dar es Salaam",
    icon: Sparkles,
  },
  {
    title: "Traditional Heritage",
    desc: "A rich tapestry of 120+ tribes living in harmony, preserving Kiswahili culture.",
    image: "https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201984/tanzania_connect/static/culture-banner.jpg",
    badge: "Swahili Culture",
    icon: MapPin,
  },
];

export function VerticalColumnsSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Media query to only run vertical opposite scroll parallax on md and up
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Left column moves up on scroll, starting at 0% and ending at -22%
      gsap.fromTo(
        ".scroll-col-left",
        { y: "0%" },
        {
          y: "-22%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );

      // Right column moves down on scroll, starting at -22% and ending at 0%
      gsap.fromTo(
        ".scroll-col-right",
        { y: "-22%" },
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="vertical-columns-section relative px-6 md:px-12 lg:px-24 py-24 overflow-hidden max-w-[1400px] mx-auto bg-tanzania-50/50 dark:bg-kilimanjaro-950/20"
    >
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 uppercase tracking-[0.2em] font-black text-[9px]">
          Scenic Parallax
        </Badge>
        <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-kilimanjaro-900 dark:text-tanzania-50 leading-tight">
          A Symphony of <span className="italic text-tanzania-500">Nature & Progress</span>
        </h3>
        <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
          Experience the transition from pristine wildlife reserves to modern electric transit as you scroll through Tanzania's signature trade and tourism landmarks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:max-h-[1000px] overflow-hidden pt-8 pb-16">
        {/* Left Column (scrolls up) */}
        <div className="scroll-col-left space-y-8 flex flex-col will-change-transform">
          {columnLeftItems.map((item) => (
            <Card
              key={item.title}
              className="border-none shadow-xl rounded-[2.5rem] bg-card overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] duration-300"
            >
              <div className="relative h-64 md:h-72 w-full bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-black/60 backdrop-blur-md text-white font-semibold text-[10px] px-3 py-1 uppercase tracking-wider rounded-full">
                    {item.badge}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-2xl font-bold tracking-tight">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Column (scrolls down) */}
        <div className="scroll-col-right space-y-8 flex flex-col will-change-transform">
          {columnRightItems.map((item) => (
            <Card
              key={item.title}
              className="border-none shadow-xl rounded-[2.5rem] bg-card overflow-hidden transition-all hover:shadow-2xl hover:scale-[1.01] duration-300"
            >
              <div className="relative h-64 md:h-72 w-full bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-black/60 backdrop-blur-md text-white font-semibold text-[10px] px-3 py-1 uppercase tracking-wider rounded-full">
                    {item.badge}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-2xl font-bold tracking-tight">{item.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

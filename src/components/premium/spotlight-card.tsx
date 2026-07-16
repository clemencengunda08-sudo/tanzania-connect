'use client';
import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";

type Props = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  tiltStrength?: number;   // 0-1
  glowColor?: string;      // rgba string
  spotlight?: boolean;     // mouse-tracked radial glow
  onClick?: () => void;
  href?: string;
  ariaLabel?: string;
};

export function SpotlightCard({
  children,
  className,
  innerClassName,
  tiltStrength = 0.8,
  glowColor = '200, 149, 25',
  spotlight = true,
  onClick,
  href,
  ariaLabel,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Direct GSAP tilt
    const rotateY = (x - 0.5) * 12 * tiltStrength;
    const rotateX = -(y - 0.5) * 12 * tiltStrength;

    gsap.to(card, {
      rotateY,
      rotateX,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Spotlight glow position
    if (spotlight && glowRef.current) {
      gsap.to(glowRef.current, {
        background: `radial-gradient(350px circle at ${x * 100}% ${y * 100}%, rgba(${glowColor}, 0.18), transparent 65%)`,
        duration: 0.2,
        overwrite: "auto",
      });
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    const card = cardRef.current;
    if (!card) return;

    // Elastic spring back on leave!
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      transformPerspective: 1000,
      duration: 0.8,
      ease: "elastic.out(1, 0.65)",
      overwrite: "auto",
    });

    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.5 });
    }
  };

  const Component = href ? "a" : "div";
  const extraProps = href ? { href, "aria-label": ariaLabel } : {};

  return (
    <Component
      ref={cardRef as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative block rounded-[2.5rem] overflow-hidden border border-border/40 bg-card cursor-pointer",
        "transition-shadow duration-500",
        hovered ? "shadow-lift border-primary/20" : "",
        className
      )}
      style={{ transformStyle: "preserve-3d" }}
      {...extraProps}
    >
      {spotlight && (
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ mixBlendMode: "screen" }}
        />
      )}
      <div className={cn("relative z-10 h-full", innerClassName)}>
        {children}
      </div>
    </Component>
  );
}

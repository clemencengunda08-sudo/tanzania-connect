"use client";

/**
 * Tanzania Connect — Premium Crystal Loader
 * ───────────────────────────────────────────
 * Brand: Purple Majesty #2D1B4E + Tanzanite Gold #D4AF37 + Sky Blue accents
 * Six rotating crystals in 3D perspective, staggered emergence animation.
 * Pure CSS / Tailwind — no extra dependencies.
 *
 * Usage:
 *   <Loader />            // full-screen overlay
 *   <Loader inline />     // inline spinner
 *   <Loader label="Loading parks…" />   // with text
 */

import { cn } from "@/lib/utils";

interface LoaderProps {
  /** Render in a fixed full-viewport overlay (default) or inline */
  variant?: "overlay" | "inline";
  /** Optional text shown under the crystals */
  label?: string;
  /** Size in pixels (default 200) */
  size?: number;
  className?: string;
}

export default function Loader({
  variant = "overlay",
  label,
  size = 200,
  className,
}: LoaderProps) {
  // Six crystals in a rotating fan
  const crystals = [
    { bg: "from-[#2D1B4E] to-[#4C2A85]", delay: "0s" },
    { bg: "from-[#4C2A85] to-[#7A4FB8]", delay: "0.3s" },
    { bg: "from-[#7A4FB8] to-[#D4AF37]", delay: "0.6s" },
    { bg: "from-[#D4AF37] to-[#E8C76A]", delay: "0.9s" },
    { bg: "from-[#E8C76A] to-[#38BDF8]", delay: "1.2s" },
    { bg: "from-[#38BDF8] to-[#2D1B4E]", delay: "1.5s" },
  ];

  const inner = (
    <div
      className="flex flex-col items-center justify-center gap-5"
      style={{ width: size, height: size + (label ? 40 : 0) }}
    >
      <div
        className="relative"
        style={{ width: size, height: size, perspective: "800px" }}
      >
        <div className="absolute inset-0 animate-[tc-spin_4s_linear_infinite] [transform-style:preserve-3d]">
          {crystals.map((c, i) => (
            <div
              key={i}
              className={cn(
                "absolute left-1/2 top-1/2 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-gradient-to-br opacity-0 [transform-style:preserve-3d]",
                c.bg
              )}
              style={{
                animation: `tc-emerge 2s ease-in-out infinite alternate, tc-fadein 0.3s ease-out forwards, tc-pulse 2s ease-in-out infinite`,
                animationDelay: c.delay,
                transformOrigin: "bottom center",
                transform: "translate(-50%, -50%) rotateX(45deg) rotateZ(0deg)",
              }}
            />
          ))}
        </div>

        {/* Central glow */}
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E8C76A] shadow-[0_0_30px_8px_rgba(212,175,55,0.4)]" />
      </div>

      {label && (
        <p className="text-sm font-medium tracking-wide text-[#D4AF37] animate-pulse">
          {label}
        </p>
      )}
    </div>
  );

  if (variant === "inline") {
    return <div className={cn("inline-flex", className)}>{inner}</div>;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0F0822] via-[#1A0F2E] to-[#2D1B4E]/95 backdrop-blur-md",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={label || "Loading"}
    >
      {inner}

      {/* Keyframes — injected via style tag so they ship with the loader */}
      <style jsx global>{`
        @keyframes tc-spin {
          from {
            transform: rotateZ(0deg) rotateX(45deg);
          }
          to {
            transform: rotateZ(360deg) rotateX(45deg);
          }
        }
        @keyframes tc-emerge {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.5) rotateX(45deg);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1) rotateX(45deg);
            opacity: 1;
          }
        }
        @keyframes tc-fadein {
          to {
            opacity: 0.85;
          }
        }
        @keyframes tc-pulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
          }
          50% {
            box-shadow: 0 0 35px rgba(212, 175, 55, 0.7);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * WikiFactCard — image-led grid of Wikipedia summary cards.
 *
 * Server component that delegates the hover-spotlight and entrance
 * blur-fade animations to client subcomponents. Each card leads with the
 * thumbnail and reveals the title/extract on hover. Falls back to a
 * brand gradient + initials placeholder when no thumbnail is provided.
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ShineBorder } from "@/components/ui/shine-border";
import type { WikiFact } from "./types";

interface WikiFactCardProps {
  /** Facts to render. */
  data: WikiFact[];
  /** Gold accent for highlights (default brand gold). */
  accentColor?: string;
  /** Purple/navy accent for titles (default brand purple). */
  titleColor?: string;
}

const PLACEHOLDER_GRADIENTS = [
  "from-kilimanjaro-700 via-kilimanjaro-500 to-gold-500",
  "from-tanzania-700 via-tanzania-500 to-gold-400",
  "from-gold-600 via-gold-400 to-tanzania-cyan-400",
  "from-kilimanjaro-800 via-gold-700 to-gold-500",
];

export function WikiFactCard({
  data,
  accentColor = "#D4AF37",
  titleColor = "#2D1B4E",
}: WikiFactCardProps) {
  return (
    <section
      aria-label="Tanzania facts from Wikipedia"
      className="w-full"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen
            className="h-4 w-4"
            style={{ color: accentColor }}
            aria-hidden
          />
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            Tanzania · Did You Know
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {data.map((fact, i) => (
            <BlurFade
              key={fact.url}
              delay={0.05 + i * 0.07}
              duration={0.45}
              inView
              direction="up"
            >
              <FactCard
                fact={fact}
                accentColor={accentColor}
                titleColor={titleColor}
                placeholderGradient={
                  PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length]
                }
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FactCardProps {
  fact: WikiFact;
  accentColor: string;
  titleColor: string;
  placeholderGradient: string;
}

function FactCard({
  fact,
  accentColor,
  titleColor,
  placeholderGradient,
}: FactCardProps) {
  // The canonical WikiFact exposes `topic` (display) and `url` (Wikipedia link).
  // We treat `extract` (lead paragraph) as the primary body copy and
  // `description` (short summary) as a fallback when extract is missing.
  const body = fact.extract?.trim() || fact.description?.trim() || "";
  const hasImage = Boolean(fact.thumbnail);

  return (
    <CardSpotlight
      radius={280}
      color={`${accentColor}33`}
      className="group h-full overflow-hidden rounded-2xl border border-black/5 bg-white p-0 dark:border-white/10 dark:bg-kilimanjaro-900/60"
    >
      <div className="relative isolate flex h-full flex-col">
        <ShineBorder
          borderWidth={1}
          duration={12}
          shineColor={[accentColor, "#FFFFFF", accentColor]}
        />

        {/* Image / placeholder hero — 16:10 to feel editorial */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          {hasImage ? (
            <Image
              src={fact.thumbnail as string}
              alt={fact.topic}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              unoptimized={fact.thumbnail!.includes("upload.wikimedia.org")}
            />
          ) : (
            <PlaceholderTile
              title={fact.topic}
              gradient={placeholderGradient}
            />
          )}

          {/* Bottom gradient overlay so title remains readable on real images */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
          />

          {/* Floating "Read on Wikipedia" badge that fades in on hover */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-end opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-kilimanjaro-950 shadow"
              style={{ backgroundColor: accentColor }}
            >
              Read on Wikipedia
              <ArrowUpRight className="h-3 w-3" aria-hidden />
            </span>
          </div>
        </div>

        {/* Title + extract */}
        <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
          <h3
            className="text-base font-semibold leading-tight sm:text-lg"
            style={{ color: titleColor }}
          >
            {fact.topic}
          </h3>
          {body ? (
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          ) : null}

          <div className="mt-auto pt-3">
            <Link
              href={fact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-opacity hover:opacity-80"
              style={{ color: accentColor }}
            >
              Continue reading
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </CardSpotlight>
  );
}

/** Decorative gradient tile used when a fact has no thumbnail. */
function PlaceholderTile({
  title,
  gradient,
}: {
  title: string;
  gradient: string;
}) {
  const initials = title
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative h-full w-full bg-gradient-to-br ${gradient}`}
      role="img"
      aria-label={`${title} — image coming soon`}
    >
      {/* Subtle noise via SVG so the gradient doesn't look flat */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-20 mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
      <div className="relative flex h-full w-full items-center justify-center">
        <span className="font-display text-4xl font-bold text-white/90 drop-shadow-sm sm:text-5xl">
          {initials}
        </span>
      </div>
    </div>
  );
}

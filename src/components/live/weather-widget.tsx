'use client';

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  CloudDrizzle,
  Wind,
  MapPin,
  Thermometer,
  CloudSun,
  type LucideIcon,
} from "lucide-react";

import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { WeatherSnapshot } from "./types";

/* -------------------------------------------------------------------------- */
/*  Icon resolution                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Resolve a Lucide icon component from the string name supplied in
 * {@link WeatherSnapshot.icon}. Falls back to `Cloud` for anything we
 * don't know.
 */
function resolveIcon(name: string): LucideIcon {
  switch (name) {
    case "Sun":
      return Sun;
    case "Cloud":
      return Cloud;
    case "CloudSun":
      return CloudSun;
    case "CloudRain":
      return CloudRain;
    case "CloudDrizzle":
      return CloudDrizzle;
    case "CloudSnow":
      return CloudSnow;
    case "CloudFog":
      return CloudFog;
    case "CloudLightning":
      return CloudLightning;
    default:
      return Cloud;
  }
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export interface WeatherWidgetProps {
  /** Live snapshots for 6 Tanzanian cities, pre-fetched on the server. */
  data: WeatherSnapshot[];
  /** Optional section title override. */
  title?: string;
  /** Optional subtitle / tagline. */
  subtitle?: string;
  /** Extra className for the outer wrapper. */
  className?: string;
}

/**
 * Single city card. Extracted so each card can have its own memo boundary
 * and hover/spring animation.
 */
function CityCard({ snapshot }: { snapshot: WeatherSnapshot }) {
  const Icon = resolveIcon(snapshot.icon);
  const isWindy = snapshot.windKph >= 25;
  const updated = new Date(snapshot.time);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="relative h-full"
    >
      <MagicCard
        className="h-full rounded-2xl"
        gradientSize={220}
        gradientColor="#D4AF37"
        gradientOpacity={0.18}
        gradientFrom="#D4AF37"
        gradientTo="#2D1B4E"
      >
        <ShineBorder
          borderWidth={1}
          duration={18}
          shineColor={["#D4AF37", "#2D1B4E", "#D4AF37"]}
        />
        <div className="relative z-10 flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
          {/* Header: city name + pin */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium uppercase tracking-wider text-amber-300/80">
                Tanzania
              </p>
              <h3 className="truncate text-base font-semibold text-white sm:text-lg">
                {snapshot.city}
              </h3>
            </div>
            <MapPin
              className="size-4 shrink-0 text-white/40"
              aria-hidden="true"
            />
          </div>

          {/* Temperature + icon */}
          <div className="flex items-end justify-between gap-2">
            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl font-bold leading-none text-white sm:text-5xl"
                suppressHydrationWarning
              >
                {Math.round(snapshot.temperatureC)}
              </span>
              <span className="text-lg font-medium text-white/70">°C</span>
            </div>
            <div className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/20 to-purple-900/40 ring-1 ring-amber-300/30">
              <Icon
                className="size-6 text-amber-300"
                aria-label={snapshot.description}
                role="img"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-xs capitalize text-white/60">
            {snapshot.description}
          </p>

          {/* Metrics */}
          <div className="mt-auto grid grid-cols-2 gap-2 text-xs">
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1.5 text-white/75",
                isWindy && "text-amber-200",
              )}
            >
              <Wind className="size-3.5" aria-hidden="true" />
              <span className="tabular-nums">
                {Math.round(snapshot.windKph)} km/h
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1.5 text-white/55">
              <span className="tabular-nums">
                {isFinite(updated.getTime())
                  ? `Updated ${updated.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`
                  : "Live"}
              </span>
            </div>
          </div>
        </div>
      </MagicCard>
    </motion.div>
  );
}

/** Skeleton placeholder for the loading state. */
function CityCardSkeleton() {
  return (
    <div className="relative h-full rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-2.5 w-12 bg-white/10" />
            <Skeleton className="h-4 w-24 bg-white/10" />
          </div>
          <Skeleton className="size-4 rounded-full bg-white/10" />
        </div>
        <div className="flex items-end justify-between">
          <Skeleton className="h-10 w-16 bg-white/10" />
          <Skeleton className="size-11 rounded-full bg-white/10" />
        </div>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <Skeleton className="h-7 bg-white/10" />
          <Skeleton className="h-7 bg-white/10" />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Default export                                                            */
/* -------------------------------------------------------------------------- */

export default function WeatherWidget({
  data,
  title = "Live Weather",
  subtitle = "Real-time conditions across Tanzania",
  className,
}: WeatherWidgetProps) {
  const isLoading = !data || data.length === 0;
  // Stable skeletons: render 6 placeholder cards to match the 6-city grid.
  const skeletonSlots = React.useMemo(
    () => Array.from({ length: 6 }, (_, i) => i),
    [],
  );

  return (
    <section
      className={cn(
        "w-full rounded-3xl border border-white/10 bg-gradient-to-br from-purple-950/40 via-black/30 to-amber-950/20 p-4 backdrop-blur-md sm:p-6",
        className,
      )}
      aria-label="Tanzania live weather"
    >
      {/* Header */}
      <header className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Thermometer className="size-4 text-amber-300" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-300/80">
              {title}
            </p>
          </div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">
            {subtitle}
          </h2>
        </div>
        {!isLoading && data[0] ? (
          <p className="hidden text-right text-[11px] text-white/40 sm:block">
            {data.length} cities · updated{" "}
            {new Date(data[0].time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        ) : null}
      </header>

      {/* Bento grid: 2 cols on mobile, 3 on lg */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {isLoading
          ? skeletonSlots.map((i) => <CityCardSkeleton key={i} />)
          : data.map((snapshot) => (
              <CityCard
                key={`${snapshot.city}-${snapshot.lat}-${snapshot.lon}`}
                snapshot={snapshot}
              />
            ))}
      </div>
    </section>
  );
}

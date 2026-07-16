/**
 * EconomyStats — premium animated stat dashboard for Tanzania Reach.
 *
 * Server component. Renders six key Tanzanian indicators in a 2x3 / 3x2
 * responsive grid. Each card uses MagicCard for the cursor-following
 * gradient hover effect, ShineBorder for the animated gold accent border,
 * and NumberTicker for the count-up reveal animation.
 *
 * Data is passed in as props (typed by EconomySnapshot) — this component
 * performs no fetching itself, keeping it pure and easy to test.
 */

import {
  Banknote,
  Users,
  TrendingUp,
  Plane,
  Wifi,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border";
import { NumberTicker } from "@/components/ui/number-ticker";
import type { EconomySnapshot } from "./types";

interface EconomyStatsProps {
  /** Snapshot of the latest economic indicators. */
  data: EconomySnapshot;
  /** Optional override of the gold accent (#D4AF37 by default). */
  accentColor?: string;
  /** Optional override of the purple/navy text accent (#2D1B4E by default). */
  labelColor?: string;
}

interface StatConfig {
  /** Key in the EconomySnapshot (may be `null` upstream). */
  key: keyof Pick<
    EconomySnapshot,
    | "gdpUsd"
    | "population"
    | "inflationPct"
    | "tourismArrivals"
    | "internetUsersPct"
    | "lifeExpectancyYears"
  >;
  label: string;
  /** Lucide icon component. */
  icon: LucideIcon;
  /** Unit suffix rendered after the number (e.g. "M", "%", " yrs"). */
  suffix: string;
  /** Decimal places for the ticker. */
  decimalPlaces: number;
  /** Optional display formatter: if set, overrides the raw number (e.g. divide by 1e9). */
  format?: (value: number) => number;
  /** Optional caption shown below the value (e.g. "of GDP"). */
  caption?: string;
}

const STAT_CONFIG: StatConfig[] = [
  {
    key: "gdpUsd",
    label: "Nominal GDP",
    icon: Banknote,
    suffix: "B",
    decimalPlaces: 1,
    // gdpUsd comes in as raw USD; we want "$75.7B" so divide by 1e9.
    format: (v) => v / 1_000_000_000,
    caption: "USD, current prices",
  },
  {
    key: "population",
    label: "Population",
    icon: Users,
    suffix: "M",
    decimalPlaces: 1,
    format: (v) => v / 1_000_000,
    caption: "people",
  },
  {
    key: "inflationPct",
    label: "Inflation",
    icon: TrendingUp,
    suffix: "%",
    decimalPlaces: 1,
    caption: "annual CPI change",
  },
  {
    key: "tourismArrivals",
    label: "Tourism",
    icon: Plane,
    suffix: "M",
    decimalPlaces: 2,
    format: (v) => v / 1_000_000,
    caption: "international arrivals",
  },
  {
    key: "internetUsersPct",
    label: "Internet",
    icon: Wifi,
    suffix: "%",
    decimalPlaces: 1,
    caption: "penetration",
  },
  {
    key: "lifeExpectancyYears",
    label: "Life Expectancy",
    icon: HeartPulse,
    suffix: " yrs",
    decimalPlaces: 1,
    caption: "at birth",
  },
];

export function EconomyStats({
  data,
  accentColor = "#D4AF37",
  labelColor = "#2D1B4E",
}: EconomyStatsProps) {
  const source = data.source ?? "World Bank";

  return (
    <section
      aria-label="Tanzania economic indicators"
      className="w-full"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header — small caps eyebrow + stat line */}
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: accentColor }}
          >
            Tanzania · Live Indicators
          </p>
          <p className="text-xs text-muted-foreground tabular-nums">
            {data.year} · Source: {source}
          </p>
        </div>

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          role="list"
        >
          {STAT_CONFIG.map((stat, i) => {
            const raw = data[stat.key] as number | null;
            // Render the card even when the data layer hasn't filled this field
            // yet — the ticker animates to 0 and the caption still explains.
            const safe = raw ?? 0;
            const value = stat.format ? stat.format(safe) : safe;
            const Icon = stat.icon;
            return (
              <StatCard
                key={stat.key}
                icon={<Icon className="h-5 w-5" aria-hidden />}
                label={stat.label}
                value={value}
                suffix={stat.suffix}
                decimalPlaces={stat.decimalPlaces}
                caption={stat.caption}
                accentColor={accentColor}
                labelColor={labelColor}
                delay={i * 0.08}
                isMissing={raw === null}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
  decimalPlaces: number;
  caption: string | undefined;
  accentColor: string;
  labelColor: string;
  delay: number;
  isMissing: boolean;
}

function StatCard({
  icon,
  label,
  value,
  suffix,
  decimalPlaces,
  caption,
  accentColor,
  labelColor,
  delay,
  isMissing,
}: StatCardProps) {
  return (
    <div
      role="listitem"
      className="relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-kilimanjaro-900/60"
    >
      {/* Animated gold border accent */}
      <ShineBorder
        borderWidth={1}
        duration={10 + delay * 2}
        shineColor={[accentColor, "#FFFFFF", accentColor]}
      />

      {/* Magic-card mouse-tracking gradient overlay */}
      <MagicCard
        gradientSize={180}
        gradientColor={accentColor}
        gradientOpacity={0.12}
        gradientFrom={accentColor}
        gradientTo="#9E7AFF"
        className="rounded-2xl"
      >
        <div className="relative z-10 flex h-full flex-col gap-3 p-5 sm:p-6">
          {/* Top row: icon + label */}
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg"
              style={{
                backgroundColor: `${accentColor}1A`, // 10% alpha
                color: accentColor,
              }}
            >
              {icon}
            </span>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: labelColor }}
            >
              {label}
            </p>
          </div>

          {/* Big number with suffix */}
          <div className="flex items-baseline gap-1">
            <span
              className="text-4xl font-bold tabular-nums sm:text-5xl"
              style={{ color: accentColor, lineHeight: 1 }}
            >
              <NumberTicker
                value={value}
                delay={delay}
                decimalPlaces={decimalPlaces}
                className="text-current"
              />
            </span>
            <span
              className="text-base font-semibold sm:text-lg"
              style={{ color: accentColor, opacity: 0.75 }}
            >
              {suffix}
            </span>
          </div>

          {/* Caption */}
          {caption ? (
            <p className="mt-auto text-xs text-muted-foreground">
              {caption}
              {isMissing ? (
                <span className="ml-1 italic opacity-70">· data pending</span>
              ) : null}
            </p>
          ) : null}
        </div>
      </MagicCard>
    </div>
  );
}

/**
 * Barrel export for live-data widgets.
 *
 * Consumers should import from "@/components/live" rather than the
 * individual files so the import surface stays stable as the directory
 * evolves.
 */

export { EconomyStats } from "./economy-stats";
export { WikiFactCard } from "./wiki-fact-card";
export { VisitorDetector } from "./visitor-detector";
export { default as WeatherWidget } from "./weather-widget";
export type { WeatherWidgetProps } from "./weather-widget";
export { default as CurrencyWidget } from "./currency-widget";
export type { CurrencyWidgetProps } from "./currency-widget";

export type {
  EconomySnapshot,
  WikiFact,
  VisitorInfo,
  RecommendedLang,
  WeatherSnapshot,
  CurrencySnapshot,
  LiveTZData,
  SupportedCurrency,
} from "./types";

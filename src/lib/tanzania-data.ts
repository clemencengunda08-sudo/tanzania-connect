/**
 * @fileOverview Single source of truth for Tanzania aggregate statistics
 * shown on the home page. These numbers are intentionally rounded for
 * storytelling — full citations live in the per-sector guides.
 */

export type TanzaniaStat = {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  prefix?: string;
};

export const tanzaniaStats: TanzaniaStat[] = [
  { value: 31, label: "Administrative regions" },
  { value: 26, label: "National parks & reserves" },
  { value: 65, label: "Population (millions)", suffix: "M+" },
  { value: 18, label: "Sector guides curated" },
];

export type Sector = {
  slug: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name (resolved in component)
};

export const sectors: Sector[] = [
  { slug: "agriculture", title: "Agriculture", description: "SAGCOT corridor, cash crops, land tenure", icon: "Sprout" },
  { slug: "mining", title: "Mining", description: "Gold, tanzanite, lithium, regulatory framework", icon: "Mountain" },
  { slug: "tourism", title: "Tourism", description: "Serengeti, Kilimanjaro, Zanzibar hospitality", icon: "Compass" },
  { slug: "immigration", title: "Immigration", description: "Visas, work permits, residence classes", icon: "Globe2" },
  { slug: "real-estate", title: "Real Estate", description: "CCRO titles, foreign ownership law", icon: "Building2" },
  { slug: "legal", title: "Legal", description: "BRELA, contracts, dispute resolution", icon: "Landmark" },
  { slug: "banking", title: "Banking", description: "Forex, mobile money, BoT regulations", icon: "Banknote" },
  { slug: "healthcare", title: "Healthcare", description: "Private hospitals, international insurance", icon: "Hospital" },
  { slug: "energy", title: "Energy", description: "Solar, hydropower, natural gas, TANESCO", icon: "Zap" },
  { slug: "technology", title: "Technology", description: "Fintech, Buni Hub, TCRA licensing", icon: "Wifi" },
  { slug: "education", title: "Education", description: "International schools, NECTA, partnerships", icon: "GraduationCap" },
  { slug: "wildlife", title: "Wildlife", description: "TAWA, conservation, photographic safaris", icon: "Trees" },
  { slug: "culture", title: "Culture", description: "Etiquette, customs, Swahili foundation", icon: "Music4" },
  { slug: "transport", title: "Transport", description: "SGR, DART, ride-hailing, road networks", icon: "Car" },
  { slug: "food-and-drink", title: "Food & Drink", description: "Swahili cuisine, dining, Nyama Choma", icon: "Utensils" },
  { slug: "entertainment", title: "Entertainment", description: "Bongo Flava, football, nightlife", icon: "Music4" },
  { slug: "phrasebook", title: "Swahili Phrasebook", description: "Essential phrases for daily life", icon: "Languages" },
  { slug: "directory", title: "Directory", description: "Embassies, hospitals, key agencies", icon: "Phone" },
];

export function getSectorUrl(slug: string): string {
  const urlMap: Record<string, string> = {
    agriculture: "/agriculture",
    mining: "/mining",
    tourism: "/guides", // No separate static page, maps to Guides index
    immigration: "/visa",
    "real-estate": "/housing",
    legal: "/corporate",
    banking: "/banking",
    healthcare: "/healthcare",
    energy: "/infrastructure", // Map energy to infrastructure
    technology: "/infrastructure", // Map technology to infrastructure
    education: "/guides", // No separate static page, maps to Guides index
    wildlife: "/wildlife",
    culture: "/culture",
    transport: "/transport",
    "food-and-drink": "/food-and-drink",
    entertainment: "/entertainment",
    phrasebook: "/phrasebook",
    directory: "/directory",
  };
  return urlMap[slug] || "/guides";
}

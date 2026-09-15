/**
 * @fileOverview Single source of truth for Sector SEO and Metadata.
 */

export type SectorMeta = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
};

export const sectorMetaMap: Record<string, SectorMeta> = {
  agriculture: {
    slug: "agriculture",
    title: "Agriculture & Agribusiness Investment Guide",
    description:
      "Complete guide to agricultural investment in Tanzania. Land acquisition, crop sectors, SAGCOT corridor, export regulations, and agribusiness licensing for foreign investors.",
    keywords: [
      "Tanzania agriculture investment",
      "agribusiness Tanzania",
      "SAGCOT Tanzania",
      "Tanzania farming guide",
      "Tanzania land acquisition",
      "crop export Tanzania",
    ],
    ogTitle: "Agriculture & Agribusiness in Tanzania — Expert Guide",
    ogDescription:
      "Navigate Tanzania's agricultural sector with confidence. Licensing, land rights, SAGCOT corridor, and investment opportunities explained for foreign experts.",
  },

  mining: {
    slug: "mining",
    title: "Mining & Minerals Investment Guide",
    description:
      "Expert guide to Tanzania's mining sector. Gold, tanzanite, diamonds, lithium, graphite. TMAA licensing, royalty frameworks, and investment opportunities for foreigners.",
    keywords: [
      "Tanzania mining investment",
      "Tanzania gold mining",
      "tanzanite investment",
      "TMAA Tanzania",
      "Tanzania minerals",
      "lithium Tanzania",
      "mining license Tanzania",
    ],
    ogTitle: "Mining & Minerals in Tanzania — Investor Guide",
    ogDescription:
      "Gold, tanzanite, lithium and more. Complete mining investment guide covering TMAA regulations, royalties, and licensing for Tanzania.",
  },

  tourism: {
    slug: "tourism",
    title: "Tourism & Hospitality Investment Guide",
    description:
      "Invest in Tanzania's world-class tourism sector. Serengeti, Kilimanjaro, Zanzibar. Hotel licensing, TATO registration, tour operator permits, and eco-tourism opportunities.",
    keywords: [
      "Tanzania tourism investment",
      "Tanzania hotel investment",
      "Zanzibar tourism business",
      "Serengeti safari business",
      "TATO registration",
      "eco-tourism Tanzania",
      "Tanzania hospitality",
    ],
    ogTitle: "Tourism & Hospitality Investment in Tanzania",
    ogDescription:
      "From Serengeti to Zanzibar. Expert guide to hotel licensing, TATO registration, and tourism investment opportunities in Tanzania.",
  },

  immigration: {
    slug: "immigration",
    title: "Tanzania Visa & Immigration Guide for Foreigners",
    description:
      "Complete Tanzania immigration guide for foreigners. Work permits, residence permits, investor visas, Class G permits, TRA requirements, and step-by-step applications.",
    keywords: [
      "Tanzania work permit",
      "Tanzania residence permit",
      "Tanzania investor visa",
      "Tanzania immigration guide",
      "Class G permit Tanzania",
      "Tanzania visa foreigners",
      "TRA Tanzania",
    ],
    ogTitle: "Tanzania Visa & Immigration — Complete Foreign Guide",
    ogDescription:
      "Work permits, investor visas, residence permits. Step-by-step immigration guide for foreigners moving to or investing in Tanzania.",
  },

  "real-estate": {
    slug: "real-estate",
    title: "Real Estate & Land Investment Guide",
    description:
      "Navigate Tanzania real estate as a foreigner. Land ownership laws, CCRO titles, Right of Occupancy, property rights, Dar es Salaam market insights, and legal frameworks.",
    keywords: [
      "Tanzania real estate investment",
      "Tanzania property foreigners",
      "Tanzania land ownership",
      "CCRO Tanzania",
      "Dar es Salaam real estate",
      "Right of Occupancy Tanzania",
      "Tanzania property law",
    ],
    ogTitle: "Real Estate in Tanzania — Foreign Investor Guide",
    ogDescription:
      "Land ownership laws, CCRO titles, and property rights for foreigners in Tanzania. Dar es Salaam market insights and legal frameworks explained.",
  },

  legal: {
    slug: "legal",
    title: "Legal Framework & Business Compliance Guide",
    description:
      "Tanzania business legal guide for foreigners. Company registration via BRELA, contracts, dispute resolution, intellectual property protection, and compliance frameworks.",
    keywords: [
      "Tanzania business law",
      "Tanzania company registration",
      "BRELA Tanzania",
      "Tanzania legal guide foreigners",
      "business compliance Tanzania",
      "Tanzania dispute resolution",
      "IP protection Tanzania",
    ],
    ogTitle: "Tanzania Business & Legal Framework — Expert Guide",
    ogDescription:
      "Company registration, BRELA, contracts, and IP protection. Complete legal guide for foreign businesses operating in Tanzania.",
  },

  banking: {
    slug: "banking",
    title: "Banking, Mobile Money & Finance Guide",
    description:
      "Open bank accounts in Tanzania as a foreigner. Bank of Tanzania regulations, mobile money systems, forex rules, investment accounts, and full financial compliance guide.",
    keywords: [
      "Tanzania banking foreigners",
      "Tanzania bank account opening",
      "Bank of Tanzania regulations",
      "forex Tanzania",
      "mobile money Tanzania",
      "Tanzania financial guide",
      "Tanzania investment account",
    ],
    ogTitle: "Banking & Finance in Tanzania — Foreigner Guide",
    ogDescription:
      "Open accounts, understand forex rules, and navigate mobile money in Tanzania. Complete banking guide for foreign residents and investors.",
  },

  healthcare: {
    slug: "healthcare",
    title: "Healthcare System & Medical Facilities Guide",
    description:
      "Navigate Tanzania's healthcare system as a foreigner. Private hospitals, international insurance, medical facilities in Dar es Salaam, Arusha, and Zanzibar.",
    keywords: [
      "Tanzania healthcare foreigners",
      "Tanzania private hospitals",
      "Tanzania medical guide",
      "health insurance Tanzania",
      "Dar es Salaam hospitals",
      "Aga Khan Hospital Tanzania",
      "Tanzania medical facilities",
    ],
    ogTitle: "Healthcare in Tanzania — Guide for Foreigners",
    ogDescription:
      "Private hospitals, international insurance, and medical facilities across Tanzania. Essential healthcare guide for foreign residents and expats.",
  },

  energy: {
    slug: "energy",
    title: "Energy, Gas & Utilities Investment Guide",
    description:
      "Tanzania energy sector investment opportunities. Solar, natural gas, hydropower, TANESCO grid, off-grid solutions, renewable energy investment, and EWURA licensing.",
    keywords: [
      "Tanzania energy investment",
      "Tanzania solar energy",
      "TANESCO Tanzania",
      "EWURA Tanzania",
      "Tanzania renewable energy",
      "Tanzania natural gas",
      "off-grid Tanzania",
    ],
    ogTitle: "Energy & Utilities Investment in Tanzania",
    ogDescription:
      "Solar, gas, hydropower and grid solutions. Complete guide to energy sector investment with EWURA licensing and TANESCO framework for Tanzania.",
  },

  technology: {
    slug: "technology",
    title: "Technology & Startups Investment Guide",
    description:
      "Tanzania tech ecosystem for investors and professionals. Fintech, e-commerce, TCRA licensing, startup ecosystem, Buni Hub, and digital transformation opportunities.",
    keywords: [
      "Tanzania technology investment",
      "Tanzania fintech",
      "TCRA Tanzania",
      "Tanzania startup ecosystem",
      "ICT investment Tanzania",
      "Buni Hub Tanzania",
      "Tanzania e-commerce",
    ],
    ogTitle: "Technology & ICT Investment in Tanzania",
    ogDescription:
      "Fintech, e-commerce, and digital transformation opportunities in Tanzania. TCRA licensing, startup ecosystem, and ICT investment guide.",
  },

  education: {
    slug: "education",
    title: "Education Sector Guide for Foreigners",
    description:
      "Invest or work in Tanzania's education sector. International schools, university partnerships, NECTA framework, and private school registration guide.",
    keywords: [
      "Tanzania education investment",
      "Tanzania international schools",
      "NECTA Tanzania",
      "Tanzania university partnerships",
      "private school Tanzania",
      "Tanzania education foreigners",
    ],
    ogTitle: "Education in Tanzania — Investment & Work Guide",
    ogDescription:
      "International schools, NECTA framework, and private institution registration. Complete education sector guide for foreigners in Tanzania.",
  },

  wildlife: {
    slug: "wildlife",
    title: "Wildlife & Conservation Business Guide",
    description:
      "Tanzania wildlife and conservation business opportunities. Game reserves, TAWA regulations, conservation partnerships, photographic safari licensing, and anti-poaching frameworks.",
    keywords: [
      "Tanzania wildlife investment",
      "Tanzania conservation business",
      "TAWA Tanzania",
      "game reserve Tanzania",
      "safari business Tanzania",
      "photographic safari license",
      "Tanzania national parks",
    ],
    ogTitle: "Wildlife & Conservation in Tanzania — Business Guide",
    ogDescription:
      "Game reserves, TAWA regulations, and safari licensing. Complete guide to wildlife and conservation business opportunities in Tanzania.",
  },

  culture: {
    slug: "culture",
    title: "Culture & Society Guide for Foreigners",
    description:
      "Understand Tanzanian culture, customs, and society. Business etiquette, Swahili language basics, religious practices, social norms, and integration guide for expats.",
    keywords: [
      "Tanzania culture guide",
      "Tanzania business etiquette",
      "Swahili language basics",
      "Tanzania expat guide",
      "Tanzania social norms",
      "Tanzania customs",
    ],
    ogTitle: "Tanzania Culture & Society — Foreigner Integration Guide",
    ogDescription:
      "Business etiquette, Swahili basics, religious practices and social norms. Essential culture guide for foreigners integrating into Tanzanian society.",
  },

  transport: {
    slug: "transport",
    title: "Transport & Navigation Guide",
    description: "Navigate Tanzania with ease. Guide to Dala-dalas, Boda Bodas, ride-hailing apps, DART bus system, and the new SGR electric train.",
    keywords: ["Tanzania transport", "DART Dar es Salaam", "SGR Tanzania train", "Bolt Uber Tanzania", "driving in Tanzania"],
    ogTitle: "Transport & Logistics in Tanzania — Expert Guide",
    ogDescription: "From city commutes to inter-city rail. Complete guide to navigating Tanzania's transport network for experts.",
  },

  "food-and-drink": {
    slug: "food-and-drink",
    title: "Food, Drink & Culinary Heritage",
    description: "Explore the flavors of Tanzania. Swahili cuisine, street food culture, dining etiquette, and local beverage guide for international visitors.",
    keywords: ["Tanzania food guide", "Swahili cuisine", "Zanzibar pizza", "Tanzania dining etiquette", "Nyama Choma"],
    ogTitle: "Tanzania Culinary Guide — Flavors & Etiquette",
    ogDescription: "A comprehensive professional guide to Tanzania's rich food culture, street snacks, and formal dining customs.",
  },

  entertainment: {
    slug: "entertainment",
    title: "Entertainment, Music & Sports Guide",
    description: "The pulse of Tanzania. Bongo Flava, football rivalries, nightlife, cinema, and digital content ecosystem for residents and experts.",
    keywords: ["Bongo Flava", "Tanzania nightlife", "Simba Yanga derby", "Tanzania entertainment", "cinema Dar es Salaam"],
    ogTitle: "Entertainment & Lifestyle in Tanzania — Expert Guide",
    ogDescription: "Discover the vibrant entertainment scene of Tanzania, from global music beats to the intense football passion.",
  },

  phrasebook: {
    slug: "phrasebook",
    title: "Essential Swahili Phrasebook for Expats",
    description: "Master the basics of Kiswahili. Essential greetings, market interactions, and survival phrases for foreigners living in Tanzania.",
    keywords: ["Swahili for foreigners", "Kiswahili phrases", "Tanzania language guide", "Swahili greetings", "learning Swahili"],
    ogTitle: "Master Basic Swahili — Essential Expat Phrasebook",
    ogDescription: "Break language barriers with our curated guide to essential Swahili phrases for daily life and business in Tanzania.",
  },

  directory: {
    slug: "directory",
    title: "Essential Contacts & Emergency Directory",
    description: "Verified directory of emergency services, embassies, hospitals, and key government agencies for foreigners in Tanzania.",
    keywords: ["Tanzania emergency numbers", "embassies in Dar es Salaam", "Tanzania hospital contacts", "official directory Tanzania"],
    ogTitle: "Official Contacts Directory — Tanzania Reach",
    ogDescription: "Immediate access to essential emergency, medical, and diplomatic contacts across the United Republic of Tanzania.",
  },
};

export function getSectorMeta(slug: string): SectorMeta | null {
  return sectorMetaMap[slug] ?? null;
}

export function getAllSectorSlugs(): string[] {
  return Object.keys(sectorMetaMap);
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, RefreshCw, Radio, CheckCircle2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Build the internal /news/article URL so each news card routes through
 *  our own detail page rather than jumping blindly to an external link. */
function articleUrl(item: NewsItem): string {
  const p = new URLSearchParams();
  if (item.link)        p.set('url',         item.link);
  if (item.title)       p.set('title',       item.title);
  if (item.source)      p.set('source',      item.source);
  if (item.category)    p.set('category',    item.category);
  if (item.description) p.set('description', item.description);
  if (item.imageUrl)    p.set('imageUrl',    item.imageUrl);
  if (item.pubDate)     p.set('pubDate',     item.pubDate);
  return `/news/article?${p.toString()}`;
}


type NewsItem = {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  category: 'politics' | 'business' | 'sports' | 'culture' | 'general';
  description?: string;
  imageUrl?: string;
};

const TZ_SOURCES = [
  { name: 'Daily News', url: 'https://dailynews.co.tz/feed/', category: 'general' as const },
  { name: 'The Citizen', url: 'https://www.thecitizen.co.tz/rss', category: 'general' as const },
  { name: 'Mwananchi', url: 'https://www.mwananchi.co.tz/feed/', category: 'general' as const },
  { name: 'IPP Media', url: 'https://www.ippmedia.com/feed', category: 'business' as const },
];

const CATEGORY_STYLES: Record<NewsItem['category'], { dot: string; badge: string }> = {
  politics: { dot: 'bg-zanzibar-500', badge: 'bg-zanzibar-500/10 text-zanzibar-700 dark:text-zanzibar-300 border-zanzibar-500/20' },
  business: { dot: 'bg-tanzania-500', badge: 'bg-tanzania-500/10 text-tanzania-700 dark:text-tanzania-300 border-tanzania-500/20' },
  sports:   { dot: 'bg-amber-500', badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20' },
  culture:  { dot: 'bg-emerald-500', badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20' },
  general:  { dot: 'bg-kilimanjaro-700 dark:bg-slate-400', badge: 'bg-kilimanjaro-500/10 text-kilimanjaro-800 dark:text-slate-200 border-kilimanjaro-500/20' },
};

const CATEGORIES = [
  { id: 'all', label: 'All Stories' },
  { id: 'business', label: 'Business & Economy' },
  { id: 'politics', label: 'Politics & Governance' },
  { id: 'sports', label: 'Sports' },
  { id: 'culture', label: 'Culture & Tourism' },
  { id: 'general', label: 'General' },
] as const;

const PLACEHOLDER_NEWS: NewsItem[] = [
  {
    title: 'Tanzania Launches New Digital Investment Portal for Foreign Investors',
    link: 'https://dailynews.co.tz',
    source: 'Daily News',
    pubDate: new Date().toISOString(),
    category: 'business',
    description: 'The government unveils TIC 2.0 — a unified platform for permits, land, and tax.',
    imageUrl: 'https://res.cloudinary.com/dwykuhmp5/image/upload/f_auto,q_auto:eco,w_400/v1784201983/tanzania_connect/static/corporate.jpg',
  },
  {
    title: 'SGR Phase 5 Construction Reaches Dodoma Corridor Milestone',
    link: 'https://www.thecitizen.co.tz',
    source: 'The Citizen',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    category: 'general',
    description: 'Tanzania Railway Corporation completes critical electrified segment linking central regions.',
    imageUrl: 'https://res.cloudinary.com/dwykuhmp5/image/upload/f_auto,q_auto:eco,w_400/v1784202036/tanzania_connect/static/sgr-pic-user.jpg',
  },
  {
    title: 'Serengeti Wildlife Census Records 15% Growth in Lion Population',
    link: 'https://www.mwananchi.co.tz',
    source: 'Mwananchi',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    category: 'culture',
    description: 'TANAPA environmental protection initiatives yield substantial rebound in savannah biodiversity.',
    imageUrl: 'https://res.cloudinary.com/dwykuhmp5/image/upload/f_auto,q_auto:eco,w_400/v1784202027/tanzania_connect/static/serengeti-migration.jpg',
  },
  {
    title: 'Bank of Tanzania Holds Policy Rate Steady at 6% — Inflation Eases',
    link: 'https://www.ippmedia.com',
    source: 'IPP Media',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    category: 'business',
    description: 'Central bank monetary policy committee affirms currency stability and strong reserve buffers.',
    imageUrl: 'https://res.cloudinary.com/dwykuhmp5/image/upload/f_auto,q_auto:eco,w_400/v1784201976/tanzania_connect/static/banking.jpg',
  },
  {
    title: 'Zanzibar Tourism Records 22% Year-on-Year Growth in Q3',
    link: 'https://dailynews.co.tz',
    source: 'Daily News',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    category: 'culture',
    description: 'Spice Island welcoming higher international tourist arrivals with expansion of direct chartered flights.',
    imageUrl: 'https://res.cloudinary.com/dwykuhmp5/image/upload/f_auto,q_auto:eco,w_400/v1784202052/tanzania_connect/static/zanzibar-beach.jpg',
  },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function SourceLogo({ source }: { source: string }) {
  const s = source.toLowerCase();
  if (s.includes('daily news') || s.includes('tsn')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-950/30 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-black tracking-wider shadow-sm shrink-0">
        <span className="w-3.5 h-3.5 rounded bg-emerald-700 text-amber-300 font-serif font-black text-[8px] flex items-center justify-center border border-amber-400/30 shadow-inner">
          TSN
        </span>
        DAILY NEWS
      </span>
    );
  }
  if (s.includes('citizen')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-950/30 border border-red-500/40 text-red-700 dark:text-red-300 text-[10px] font-black tracking-wider shadow-sm shrink-0">
        <span className="w-3.5 h-3.5 rounded bg-red-600 text-white font-sans font-black text-[8px] flex items-center justify-center shadow-inner">
          TC
        </span>
        THE CITIZEN
      </span>
    );
  }
  if (s.includes('mwananchi')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-950/30 border border-amber-500/40 text-amber-800 dark:text-amber-300 text-[10px] font-black tracking-wider shadow-sm shrink-0">
        <span className="w-3.5 h-3.5 rounded bg-neutral-900 text-amber-400 font-black text-[9px] flex items-center justify-center border border-amber-500/50 shadow-inner">
          M
        </span>
        MWANANCHI
      </span>
    );
  }
  if (s.includes('ipp') || s.includes('guardian') || s.includes('nipashe')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-950/30 border border-blue-500/40 text-blue-700 dark:text-blue-300 text-[10px] font-black tracking-wider shadow-sm shrink-0">
        <span className="w-3.5 h-3.5 rounded bg-blue-700 text-white font-black text-[8px] flex items-center justify-center shadow-inner">
          IPP
        </span>
        IPP MEDIA
      </span>
    );
  }
  if (s.includes('east') || s.includes('african')) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-indigo-950/30 border border-indigo-500/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-black tracking-wider shadow-sm shrink-0">
        <span className="w-3.5 h-3.5 rounded bg-indigo-700 text-white font-serif font-black text-[8px] flex items-center justify-center shadow-inner">
          EA
        </span>
        THE EASTAFRICAN
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-kilimanjaro-200/70 dark:bg-kilimanjaro-700/80 border border-kilimanjaro-400/30 dark:border-kilimanjaro-500/50 text-kilimanjaro-800 dark:text-tanzania-100 text-[10px] font-bold tracking-wider shrink-0">
      {source}
    </span>
  );
}

function getNewsImage(title: string, category: string): string {
  const t = title.toLowerCase();
  const c = 'https://res.cloudinary.com/dwykuhmp5/image/upload/f_auto,q_auto:eco,w_400/v178420';

  // Sports & Stadiums
  if (/\b(sports|football|soccer|simba|yanga|caf|fifa|afcon|stadium|arena|mkapa|samia stadium|taifa stars|golf|boxing|marathon)\b/i.test(t)) {
    return `${c}2046/tanzania_connect/static/sports-stadium.png`;
  }

  // Technology, AI, ICT, Telecom
  if (/\b(tech|technology|ai|artificial intelligence|ict|software|digital|telecom|vodacom|airtel|tigo|fintech|app|cyber|coding)\b/i.test(t)) {
    return `${c}2048/tanzania_connect/static/tanzania-tech-hub.png`;
  }

  // SGR & Railways
  if (/\b(sgr|train|rail|railway|trc|locomotive|electric train)\b/i.test(t)) {
    return `${c}2036/tanzania_connect/static/sgr-pic-user.jpg`;
  }

  // Mining & Minerals
  if (/\b(mining|gold|tanzanite|geita|mirerani|diamond|mine|mineral|copper|lithium|graphite)\b/i.test(t)) {
    const mining = [
      `${c}2050/tanzania_connect/static/tanzanite-mine.png`,
      `${c}2004/tanzania_connect/static/gold-mining.png`,
      `${c}2018/tanzania_connect/static/mining-banner.png`,
      `${c}1991/tanzania_connect/static/diamond-mining.png`
    ];
    return mining[Math.abs(hashString(title)) % mining.length];
  }

  // Banking, Economy, Currency
  if (/\b(bank|banking|bot|bank of tanzania|currency|shilling|inflation|forex|fx|reserves|loan|interest rate|treasury)\b/i.test(t)) {
    return `${c}1976/tanzania_connect/static/banking.jpg`;
  }

  // Wildlife & National Parks
  if (/\b(serengeti|safari|lion|elephant|wildlife|tanapa|conservation|ngorongoro|tarangire|ruaha|migration|cheetah|leopard|poaching)\b/i.test(t)) {
    const wild = [
      `${c}2027/tanzania_connect/static/serengeti-migration.jpg`,
      `${c}2034/tanzania_connect/static/serengeti-safari.jpg`,
      `${c}2024/tanzania_connect/static/safari-elephant.jpg`,
      `${c}2001/tanzania_connect/static/giraffe-tarangire.jpg`,
      `${c}2021/tanzania_connect/static/ngorongoro-crater.jpg`
    ];
    return wild[Math.abs(hashString(title)) % wild.length];
  }

  // Ports & Maritime
  if (/\b(port|shipping|dar es salaam port|tpa|vessel|berth|maritime|ship|ferry|cargo|dock)\b/i.test(t)) {
    return `${c}1989/tanzania_connect/static/dar-es-salaam.jpg`;
  }

  // Energy & Hydroelectric
  if (/\b(energy|power|electricity|dam|jnhpp|nyerere|tanesco|solar|grid|gas|lng)\b/i.test(t)) {
    return `${c}2013/tanzania_connect/static/infrastructure-banner.jpg`;
  }

  // Agriculture, Fisheries & Food
  if (/\b(agriculture|farmer|farming|crop|harvest|coffee|tea|avocado|cashew|cotton|fisheries|fish|livestock|cattle|food security|nutrition)\b/i.test(t)) {
    return `${c}1969/tanzania_connect/static/agriculture-tanzania.jpg`;
  }

  // Zanzibar & Coast
  if (/\b(zanzibar|pemba|unguja|beach|island|stone town|spice|coastal|seaweed)\b/i.test(t)) {
    const zanzibar = [
      `${c}2052/tanzania_connect/static/zanzibar-beach.jpg`,
      `${c}2054/tanzania_connect/static/zanzibar-rooftop.jpg`,
      `${c}2015/tanzania_connect/static/mafia-island.jpg`
    ];
    return zanzibar[Math.abs(hashString(title)) % zanzibar.length];
  }

  // Healthcare & Medicine
  if (/\b(health|hospital|medical|doctor|nurse|clinic|vaccine|disease|muhimbili|ministry of health|surgery|patient)\b/i.test(t)) {
    return `${c}2006/tanzania_connect/static/healthcare-banner.jpg`;
  }

  // Education, University, Students, Admissions
  if (/\b(university|student|school|education|college|admission|admissions|uaut|campus|academic|degree|diploma|tcu|scholarship)\b/i.test(t)) {
    return `${c}2048/tanzania_connect/static/tanzania-tech-hub.png`;
  }

  if (category === 'business') {
    return `${c}1983/tanzania_connect/static/corporate.jpg`;
  }
  if (category === 'culture') {
    return `${c}1984/tanzania_connect/static/culture-banner.jpg`;
  }
  
  // Diverse fallback pool indexed by title hash — guarantees adjacent stories never share images
  const DIVERSE_FALLBACK_POOL = [
    `${c}2048/tanzania_connect/static/tanzania-tech-hub.png`,
    `${c}2036/tanzania_connect/static/sgr-pic-user.jpg`,
    `${c}2027/tanzania_connect/static/serengeti-migration.jpg`,
    `${c}2052/tanzania_connect/static/zanzibar-beach.jpg`,
    `${c}2019/tanzania_connect/static/mount-kilimanjaro.jpg`,
    `${c}1976/tanzania_connect/static/banking.jpg`,
    `${c}2004/tanzania_connect/static/gold-mining.png`,
    `${c}1969/tanzania_connect/static/agriculture-tanzania.jpg`,
    `${c}2046/tanzania_connect/static/sports-stadium.png`,
    `${c}1983/tanzania_connect/static/corporate.jpg`,
    `${c}2013/tanzania_connect/static/infrastructure-banner.jpg`,
    `${c}2050/tanzania_connect/static/tanzanite-mine.png`,
    `${c}2006/tanzania_connect/static/healthcare-banner.jpg`,
    `${c}2034/tanzania_connect/static/serengeti-safari.jpg`,
    `${c}2021/tanzania_connect/static/ngorongoro-crater.jpg`,
    `${c}1984/tanzania_connect/static/culture-banner.jpg`,
    `${c}2054/tanzania_connect/static/zanzibar-rooftop.jpg`,
    `${c}2001/tanzania_connect/static/giraffe-tarangire.jpg`,
    `${c}2015/tanzania_connect/static/mafia-island.jpg`,
    `${c}1989/tanzania_connect/static/dar-es-salaam.jpg`,
  ];

  return DIVERSE_FALLBACK_POOL[Math.abs(hashString(title)) % DIVERSE_FALLBACK_POOL.length];
}

function NewsCardThumbnail({ primaryUrl, fallbackUrl, alt }: { primaryUrl: string; fallbackUrl: string; alt: string }) {
  const [src, setSrc] = useState(primaryUrl);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-kilimanjaro-100 dark:bg-kilimanjaro-900 overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 bg-kilimanjaro-200/50 dark:bg-kilimanjaro-800/50 animate-pulse" />
      )}
      {/* Native img with async decoding and lazy loading delivers maximum mobile FPS and bypasses SSR image bottlenecks */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (src !== fallbackUrl) {
            setSrc(fallbackUrl);
          }
        }}
        className={cn(
          'w-full h-full object-cover group-hover:scale-105 transition-all duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

const STORAGE_KEY = 'tz_reach_news_cache_v2';

export function TanzaniaNewsFeed({ className, limit = 15 }: { className?: string; limit?: number }) {
  const [news, setNews] = useState<NewsItem[]>(PLACEHOLDER_NEWS.slice(0, limit));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);
  const [instantLoaded, setInstantLoaded] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch('/api/tz-news', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data?.items?.length) {
          setNews(data.items);
          // Store in localStorage for instant mobile loading on future visits
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
              items: data.items,
              timestamp: Date.now(),
            }));
          } catch {
            /* ignore quota issues */
          }
        }
      }
    } catch {
      /* keep existing or placeholder */
    } finally {
      setLastSync(new Date());
      setLoading(false);
    }
  }

  useEffect(() => {
    setMounted(true);

    // Instant Mobile Cache Hydration (0ms wait)
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.items) && parsed.items.length > 0) {
          setNews(parsed.items);
          setInstantLoaded(true);
          if (parsed.timestamp) {
            setLastSync(new Date(parsed.timestamp));
          }
        }
      }
    } catch {
      /* ignore JSON parse failure */
    }

    // Refresh live in background
    refresh();
    const t = setInterval(refresh, 1000 * 60 * 30);
    return () => clearInterval(t);
  }, []);

  const filteredNews = (selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)
  ).slice(0, limit);

  return (
    <section className={cn('relative', className)}>
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-5 h-5 text-zanzibar-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zanzibar-500 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-kilimanjaro-900 dark:text-tanzania-50">
                Live · Tanzania Newsroom
              </h3>
              {instantLoaded && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Zap className="w-2.5 h-2.5" /> Instant
                </span>
              )}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-kilimanjaro-500 dark:text-tanzania-400 mt-0.5 flex items-center gap-1.5">
              <span>{mounted ? lastSync.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '--:--'}</span>
              <span>·</span>
              <span>{TZ_SOURCES.length} sources active</span>
            </p>
          </div>
        </div>

        <button
          onClick={refresh}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-xl border border-kilimanjaro-200 dark:border-kilimanjaro-600 bg-white/50 dark:bg-kilimanjaro-800 hover:bg-white dark:hover:bg-kilimanjaro-700 text-[11px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:text-tanzania-100 transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={cn('w-3 h-3', loading && 'animate-spin')} />
          {loading ? 'Refreshing...' : 'Sync News'}
        </button>
      </div>

      {/* Horizontal Category Pill Filter - Touch Optimized for Mobile */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-5 no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0',
                isActive
                  ? 'bg-tanzania-500 text-white shadow-md shadow-tanzania-500/25 scale-[1.02]'
                  : 'bg-kilimanjaro-100/70 dark:bg-kilimanjaro-800 text-kilimanjaro-600 dark:text-tanzania-200 hover:bg-kilimanjaro-200/60 dark:hover:bg-kilimanjaro-700'
              )}
            >
              {cat.label}
              {cat.id !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({news.filter(n => n.category === cat.id).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* News list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredNews.map((item, i) => {
            const style = CATEGORY_STYLES[item.category] || CATEGORY_STYLES.general;
            const fallbackImg = getNewsImage(item.title, item.category);
            const primaryImg = item.imageUrl || fallbackImg;

            return (
              <motion.a
                key={`${item.link}-${i}`}
                href={articleUrl(item)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ delay: Math.min(i * 0.03, 0.2), duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group block rounded-2xl border border-tanzania-200/70 dark:border-tanzania-50/10 bg-white dark:bg-kilimanjaro-800 p-3.5 sm:p-4 hover:border-tanzania-500/50 hover:bg-tanzania-50/40 dark:hover:bg-kilimanjaro-700 transition-all duration-200 shadow-sm"
              >
                <div className="flex gap-3 sm:gap-4 items-start">
                  {/* High-speed thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-tanzania-200/50 dark:border-kilimanjaro-700/50">
                    <NewsCardThumbnail
                      key={`${item.title}-${i}-${primaryImg}`}
                      primaryUrl={primaryImg}
                      fallbackUrl={fallbackImg}
                      alt={item.title}
                    />
                  </div>

                  {/* Story details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', style.dot)} />
                      <span className={cn('px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full border', style.badge)}>
                        {item.category}
                      </span>
                      <SourceLogo source={item.source} />
                      <span className="text-[10px] text-kilimanjaro-400 dark:text-kilimanjaro-400">·</span>
                      <span className="text-[10px] text-kilimanjaro-500 dark:text-tanzania-300 font-medium flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {mounted ? timeAgo(item.pubDate) : 'recently'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-kilimanjaro-900 dark:text-white leading-snug group-hover:text-tanzania-600 dark:group-hover:text-tanzania-200 transition-colors line-clamp-2">
                      {item.title}
                    </h4>

                    {item.description && (
                      <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-200/90 mt-1 line-clamp-2 leading-relaxed hidden sm:block">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Chevron icon — indicates internal navigation to detail page */}
                  <ExternalLink className="w-4 h-4 text-kilimanjaro-300 group-hover:text-tanzania-500 transition-colors shrink-0 mt-1 hidden sm:block" />
                </div>
              </motion.a>
            );

          })}
        </AnimatePresence>

        {filteredNews.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-kilimanjaro-50 dark:bg-kilimanjaro-900/30 border border-dashed border-kilimanjaro-200 dark:border-kilimanjaro-800">
            <p className="text-sm font-medium text-kilimanjaro-600 dark:text-tanzania-300">
              No headlines currently found in this category.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-3 text-xs font-bold text-tanzania-600 dark:text-tanzania-300 underline"
            >
              Show all stories
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-5 pt-3 border-t border-kilimanjaro-900/5 dark:border-tanzania-50/10 text-[10px] text-kilimanjaro-400 dark:text-tanzania-500">
        <span className="uppercase tracking-widest">
          Verified RSS Feeds
        </span>
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
          <CheckCircle2 className="w-3 h-3" /> Live Pipeline
        </span>
      </div>
    </section>
  );
}

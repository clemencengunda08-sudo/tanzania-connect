'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ExternalLink, Clock, RefreshCw, Radio } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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
  politics: { dot: 'bg-zanzibar-500', badge: 'bg-zanzibar-500/10 text-zanzibar-700 border-zanzibar-500/20' },
  business: { dot: 'bg-tanzania-500', badge: 'bg-tanzania-500/10 text-tanzania-700 border-tanzania-500/20' },
  sports:   { dot: 'bg-tanzania-500', badge: 'bg-tanzania-500/10 text-tanzania-700 border-tanzania-500/20' },
  culture:  { dot: 'bg-tanzania-500', badge: 'bg-tanzania-500/10 text-tanzania-700 border-tanzania-500/20' },
  general:  { dot: 'bg-kilimanjaro-700', badge: 'bg-kilimanjaro-500/10 text-kilimanjaro-800 border-kilimanjaro-500/20' },
};

const PLACEHOLDER_NEWS: NewsItem[] = [
  {
    title: 'Tanzania Launches New Digital Investment Portal for Foreign Investors',
    link: '#',
    source: 'Daily News',
    pubDate: new Date().toISOString(),
    category: 'business',
    description: 'The government unveils TIC 2.0 — a unified platform for permits, land, and tax.',
  },
  {
    title: 'SGR Phase 5 Construction Reaches Dodoma Corridor Milestone',
    link: '#',
    source: 'The Citizen',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    category: 'general',
  },
  {
    title: 'Serengeti Wildlife Census Records 15% Growth in Lion Population',
    link: '#',
    source: 'Mwananchi',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    category: 'culture',
  },
  {
    title: 'Bank of Tanzania Holds Policy Rate Steady at 6% — Inflation Eases',
    link: '#',
    source: 'IPP Media',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
    category: 'business',
  },
  {
    title: 'Zanzibar Tourism Records 22% Year-on-Year Growth in Q3',
    link: '#',
    source: 'Daily News',
    pubDate: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    category: 'culture',
  },
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function getNewsImage(title: string, category: string): string {
  const t = title.toLowerCase();
  
  if (t.includes('serengeti') || t.includes('safari') || t.includes('lion') || t.includes('elephant') || t.includes('wildlife') || t.includes('census') || t.includes('animal') || t.includes('park') || t.includes('conservation')) {
    const wild = ['https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202034/tanzania_connect/static/serengeti-safari.jpg', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202027/tanzania_connect/static/serengeti-migration.jpg', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202024/tanzania_connect/static/safari-elephant.jpg', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202001/tanzania_connect/static/giraffe-tarangire.jpg', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202021/tanzania_connect/static/ngorongoro-crater.jpg'];
    return wild[Math.abs(hashString(title)) % wild.length];
  }
  
  if (t.includes('zanzibar') || t.includes('beach') || t.includes('tourism') || t.includes('tourist') || t.includes('resort') || t.includes('island') || t.includes('stone town') || t.includes('pemba') || t.includes('mafia')) {
    const zanzibar = ['https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202052/tanzania_connect/static/zanzibar-beach.jpg', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202054/tanzania_connect/static/zanzibar-rooftop.jpg', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202015/tanzania_connect/static/mafia-island.jpg'];
    return zanzibar[Math.abs(hashString(title)) % zanzibar.length];
  }
  
  if (t.includes('kilimanjaro') || t.includes('mountain') || t.includes('hike') || t.includes('climb') || t.includes('peak')) {
    return 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202019/tanzania_connect/static/mount-kilimanjaro.jpg';
  }
  
  if (t.includes('sgr') || t.includes('rail') || t.includes('train') || t.includes('infrastructure') || t.includes('road') || t.includes('bridge') || t.includes('construction') || t.includes('port') || t.includes('harbour') || t.includes('energy') || t.includes('power') || t.includes('electricity') || t.includes('utility')) {
    return 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202013/tanzania_connect/static/infrastructure-banner.jpg';
  }
  
  if (t.includes('agriculture') || t.includes('coffee') || t.includes('farm') || t.includes('crop') || t.includes('harvest') || t.includes('cashew') || t.includes('tea') || t.includes('cotton')) {
    return 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201969/tanzania_connect/static/agriculture-tanzania.jpg';
  }
  
  if (t.includes('mining') || t.includes('gold') || t.includes('tanzanite') || t.includes('diamond') || t.includes('mine') || t.includes('mineral')) {
    const mining = ['https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202018/tanzania_connect/static/mining-banner.png', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202004/tanzania_connect/static/gold-mining.png', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202050/tanzania_connect/static/tanzanite-mine.png', 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201991/tanzania_connect/static/diamond-mining.png'];
    return mining[Math.abs(hashString(title)) % mining.length];
  }
  
  if (t.includes('bank') || t.includes('inflation') || t.includes('finance') || t.includes('economy') || t.includes('economic') || t.includes('shilling') || t.includes('currency') || t.includes('money') || t.includes('revenue') || t.includes('tax') || t.includes('tra')) {
    return 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201976/tanzania_connect/static/banking.jpg';
  }
  
  if (t.includes('dar') || t.includes('salaam') || t.includes('city') || t.includes('corporate') || t.includes('hq') || t.includes('headquarters') || t.includes('office')) {
    return 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201989/tanzania_connect/static/dar-es-salaam.jpg';
  }

  if (category === 'business') {
    return 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201983/tanzania_connect/static/corporate.jpg';
  }
  if (category === 'culture') {
    return 'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201984/tanzania_connect/static/culture-banner.jpg';
  }
  
  const generic = [
    'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201989/tanzania_connect/static/dar-es-salaam.jpg',
    'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784201971/tanzania_connect/static/arusha-town.jpg',
    'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202019/tanzania_connect/static/mount-kilimanjaro.jpg',
    'https://res.cloudinary.com/dwykuhmp5/image/upload/v1784202034/tanzania_connect/static/serengeti-safari.jpg'
  ];
  return generic[Math.abs(hashString(title)) % generic.length];
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function TanzaniaNewsFeed({ className, limit = 5 }: { className?: string; limit?: number }) {
  const [news, setNews] = useState<NewsItem[]>(PLACEHOLDER_NEWS.slice(0, limit));
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date>(new Date());
  const [mounted, setMounted] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      const res = await fetch('/api/tz-news', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data?.items?.length) setNews(data.items.slice(0, limit));
      }
    } catch {
      /* keep placeholder */
    } finally {
      setLastSync(new Date());
      setLoading(false);
    }
  }

  useEffect(() => {
    setMounted(true);
    refresh();
    const t = setInterval(refresh, 1000 * 60 * 30);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return (
    <section className={cn('relative', className)}>
      {/* Live indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-5 h-5 text-zanzibar-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zanzibar-500 animate-pulse-soft" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-kilimanjaro-900 dark:text-tanzania-50">
              Live · Tanzania
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-kilimanjaro-500 mt-0.5">
              {mounted ? lastSync.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '--:--'} · {TZ_SOURCES.length} sources
            </p>
          </div>
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-kilimanjaro-600 hover:text-tanzania-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn('w-3 h-3', loading && 'animate-spin')} /> Sync
        </button>
      </div>

      {/* News list */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {news.map((item, i) => {
            const style = CATEGORY_STYLES[item.category];
            const imgPath = item.imageUrl || getNewsImage(item.title, item.category);
            return (
              <motion.a
                key={`${item.title}-${i}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group block rounded-2xl border border-tanzania-200/60 dark:border-kilimanjaro-700/60 bg-tanzania-50/60 dark:bg-kilimanjaro-800/30 p-4 hover:border-tanzania-500/40 hover:bg-tanzania-100/60 dark:hover:bg-kilimanjaro-800/50 transition-all duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-tanzania-200/40 dark:border-kilimanjaro-700/40">
                    <Image
                      src={imgPath}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 80px, 96px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', style.dot)} />
                      <span className={cn('px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-full border', style.badge)}>
                        {item.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-kilimanjaro-500">
                        {item.source}
                      </span>
                      <span className="text-[10px] text-kilimanjaro-400">·</span>
                      <span className="text-[10px] text-kilimanjaro-500 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" /> {mounted ? timeAgo(item.pubDate) : 'recently'}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-kilimanjaro-900 dark:text-tanzania-50 leading-snug group-hover:text-tanzania-700 dark:group-hover:text-tanzania-300 transition-colors">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-kilimanjaro-600 dark:text-kilimanjaro-300 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-kilimanjaro-400 group-hover:text-tanzania-500 transition-colors shrink-0 mt-1" />
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="text-[10px] text-kilimanjaro-400 mt-4 text-center uppercase tracking-widest">
        Sources: Daily News · The Citizen · Mwananchi · IPP Media
      </p>
    </section>
  );
}

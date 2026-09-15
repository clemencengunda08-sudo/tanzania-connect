import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  Newspaper,
  BookOpen,
  Globe2,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────
   Next.js 15: searchParams is a Promise — must be awaited
───────────────────────────────────────────────────────────────── */
type SearchParams = Promise<{
  url?: string;
  title?: string;
  source?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  pubDate?: string;
}>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const p = await searchParams;
  const title = p.title ?? 'News Article';
  const description = p.description ?? 'Read the latest news from Tanzania.';

  return {
    title: `${title} | Tanzania Reach News`,
    description,
    openGraph: {
      title: `${title} | Tanzania Reach News`,
      description,
      url: 'https://www.tanzaniareach.com/news',
      type: 'article',
    },
  };
}

const CATEGORY_META: Record<
  string,
  { label: string; badge: string }
> = {
  politics: {
    label: 'Politics & Governance',
    badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20',
  },
  business: {
    label: 'Business & Economy',
    badge: 'bg-tanzania-500/10 text-tanzania-700 dark:text-tanzania-300 border-tanzania-500/20',
  },
  sports: {
    label: 'Sports',
    badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  },
  culture: {
    label: 'Culture & Tourism',
    badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  },
  general: {
    label: 'General',
    badge: 'bg-kilimanjaro-500/10 text-kilimanjaro-700 dark:text-kilimanjaro-300 border-kilimanjaro-500/20',
  },
};

function sourceColor(source: string): string {
  const s = source.toLowerCase();
  if (s.includes('citizen')) return 'border-red-500/30 bg-red-950/10 text-red-700 dark:text-red-300';
  if (s.includes('daily')) return 'border-emerald-500/30 bg-emerald-950/10 text-emerald-700 dark:text-emerald-300';
  if (s.includes('mwananchi')) return 'border-amber-500/30 bg-amber-950/10 text-amber-800 dark:text-amber-300';
  if (s.includes('ipp') || s.includes('guardian')) return 'border-blue-500/30 bg-blue-950/10 text-blue-700 dark:text-blue-300';
  if (s.includes('east')) return 'border-indigo-500/30 bg-indigo-950/10 text-indigo-700 dark:text-indigo-300';
  return 'border-kilimanjaro-300/30 bg-kilimanjaro-100/30 text-kilimanjaro-700 dark:text-tanzania-200';
}

function timeAgo(iso: string | undefined): string {
  if (!iso) return '';
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (isNaN(diff)) return '';
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default async function ArticlePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const p = await searchParams;

  const url = p.url ?? null;
  const title = p.title ?? 'Tanzania News';
  const source = p.source ?? 'Tanzania News';
  const category = p.category ?? 'general';
  const description = p.description ?? null;
  const imageUrl = p.imageUrl ?? null;
  const pubDate = p.pubDate ?? null;


  const catMeta = CATEGORY_META[category] || CATEGORY_META.general;
  const ago = timeAgo(pubDate || undefined);

  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50">
      {imageUrl && (
        <div className="absolute top-0 left-0 right-0 h-[420px] -z-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20 dark:opacity-10 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tanzania-50/80 to-tanzania-50 dark:via-kilimanjaro-950/80 dark:to-kilimanjaro-950" />
        </div>
      )}

      <main className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-24 max-w-[900px] mx-auto pt-24 sm:pt-32 pb-20">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-tanzania-600 dark:text-tanzania-400 hover:text-tanzania-700 dark:hover:text-tanzania-300 transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to newsroom
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${catMeta.badge}`}>
            {catMeta.label}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${sourceColor(source)}`}>
            {source}
          </span>
          {ago && (
            <span className="flex items-center gap-1 text-[11px] text-kilimanjaro-400 dark:text-tanzania-500">
              <Clock className="w-3 h-3" />
              {ago}
            </span>
          )}
        </div>

        <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-kilimanjaro-900 dark:text-tanzania-50 mb-8">
          {title}
        </h1>

        {imageUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-kilimanjaro-900/10 dark:border-tanzania-50/10 shadow-xl mb-8 bg-kilimanjaro-100 dark:bg-kilimanjaro-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        {description && (
          <p className="text-lg sm:text-xl text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed font-light mb-8 border-l-4 border-tanzania-500/40 pl-4">
            {description}
          </p>
        )}

        <div className="rounded-2xl bg-white/80 dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/8 dark:border-tanzania-50/8 p-5 mb-8 flex items-start gap-4">
          <Newspaper className="w-5 h-5 text-tanzania-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-kilimanjaro-800 dark:text-tanzania-100 mb-1">
              Aggregated from {source}
            </p>
            <p className="text-xs text-kilimanjaro-500 dark:text-tanzania-400 leading-relaxed">
              Tanzania Reach aggregates headlines from verified Tanzanian
              publishers. We are not the author of this story. Click the button
              below to read the full article on the original publisher&apos;s
              website.
            </p>
          </div>
        </div>

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-tanzania-500 hover:bg-tanzania-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-tanzania-500/30 hover:shadow-tanzania-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-4 w-full sm:w-auto justify-center sm:justify-start"
          >
            <BookOpen className="w-4 h-4" />
            Read Full Story on {source}
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        ) : (
          <p className="text-sm text-kilimanjaro-500 italic">
            No external link available for this article.
          </p>
        )}

        <div className="mt-12 pt-8 border-t border-kilimanjaro-900/8 dark:border-tanzania-50/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-kilimanjaro-500 dark:text-tanzania-400">
            <Globe2 className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-medium">
              Tanzania Reach · Live News Aggregator
            </span>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-kilimanjaro-900/10 dark:border-tanzania-50/10 text-xs font-bold text-kilimanjaro-700 dark:text-tanzania-200 hover:border-tanzania-500/40 hover:text-tanzania-600 dark:hover:text-tanzania-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all stories
          </Link>
        </div>
      </main>
    </div>
  );
}

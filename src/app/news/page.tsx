import type { Metadata } from "next";
import { TanzaniaNewsFeed } from "@/components/premium/tanzania-news-feed";
import { MarqueeStrip } from "@/components/premium/marquee-strip";
import { Radio, ArrowLeft, Newspaper, TrendingUp, Globe2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Live News & Briefings — Tanzania Reach",
  description:
    "Aggregated live news feed and daily summaries from Tanzania's leading newsrooms. Stay informed on business, immigration, and policies.",
  alternates: {
    canonical: "https://www.tanzaniareach.com/news",
  },
  openGraph: {
    title: "Live News & Briefings — Tanzania Reach",
    description:
      "Daily summaries and aggregated live headlines from the United Republic of Tanzania.",
    url: "https://www.tanzaniareach.com/news",
    type: "website",
  },
};

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50">
      <main>
        {/* ——— Hero header ——— */}
        <section className="relative pt-32 md:pt-40 pb-16 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto overflow-hidden rounded-b-[3rem] z-10">
          {/* Fallback Real Image */}
          <div className="absolute inset-0 -z-20 bg-kilimanjaro-950">
            <Image
              src="/images/tanzania/dar-es-salaam-housing.png"
              alt="Tanzania Skyline Backdrop"
              fill
              priority
              className="object-cover opacity-25 dark:opacity-20 select-none pointer-events-none"
            />
          </div>
          {/* Spline 3D Backdrop */}
          <div className="spline-container absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <iframe
              src="https://my.spline.design/crystalball-de222de54d6fc4752fa850b54fb654de/"
              frameBorder="0"
              width="100%"
              height="100%"
              id="aura-spline"
              className="w-[102%] h-[106%] -translate-y-[3%] -translate-x-[1%] scale-[1.04] pointer-events-none"
            ></iframe>
          </div>
          {/* Legibility overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tanzania-50/70 to-tanzania-50 dark:via-kilimanjaro-950/80 dark:to-kilimanjaro-950 z-10 pointer-events-none" />

          {/* Content wrapper */}
          <div className="relative z-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-tanzania-600 dark:text-tanzania-400 hover:text-tanzania-700 dark:hover:text-tanzania-300 transition-colors mb-10 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
              <div>
                {/* Live badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zanzibar-500/10 text-zanzibar-600 dark:text-zanzibar-400 text-[10px] font-black uppercase tracking-[0.2em] border border-zanzibar-500/20 mb-6">
                  <Radio className="w-3 h-3 animate-pulse" />
                  Live feed · Auto-refreshed
                </div>

                <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] text-kilimanjaro-900 dark:text-tanzania-50 mb-6">
                  Today in<br />
                  <span className="text-tanzania-500">Tanzania.</span>
                </h1>

                <p className="text-lg text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed max-w-lg font-light">
                  Headlines aggregated from Tanzania&apos;s leading independent publishers.
                  Refreshed every 30 minutes — no paywalls, no noise.
                </p>
              </div>

              {/* Stats sidebar */}
              <div className="grid grid-cols-3 gap-4 lg:justify-end">
                {[
                  { icon: Newspaper, label: "Sources", value: "4" },
                  { icon: TrendingUp, label: "Refreshed", value: "30m" },
                  { icon: Globe2, label: "Coverage", value: "National" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/60 dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/8 dark:border-tanzania-50/8 backdrop-blur-sm"
                  >
                    <stat.icon className="w-5 h-5 text-tanzania-500 mb-2" />
                    <p className="text-2xl font-black text-kilimanjaro-900 dark:text-tanzania-50 leading-none mb-1">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-kilimanjaro-500 dark:text-tanzania-400 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— Velocity marquee ——— */}
        <MarqueeStrip
          caption="News sources"
          items={[
            { label: "Daily News", value: "Dar es Salaam" },
            { label: "The Citizen", value: "National" },
            { label: "Mwananchi", value: "Swahili" },
            { label: "IPP Media", value: "Business" },
            { label: "Business Times", value: "Finance" },
            { label: "Tanzania Invest", value: "Investment" },
            { label: "East African", value: "Regional" },
          ]}
          speed={2}
          variant="outline"
        />

        {/* ——— News feed ——— */}
        <section className="px-6 md:px-12 lg:px-24 py-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main feed */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-white dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-8 shadow-xl">
                <TanzaniaNewsFeed limit={20} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* About the feed */}
              <div className="rounded-3xl bg-kilimanjaro-950 text-tanzania-50 p-8">
                <h3 className="font-display text-lg font-medium mb-3 tracking-tight">
                  About this feed
                </h3>
                <p className="text-sm text-tanzania-200 leading-relaxed">
                  Tanzania Reach aggregates RSS headlines from verified
                  Tanzanian newsrooms. All stories link directly to the
                  original publishers — we are not the author.
                </p>
                <div className="mt-6 pt-6 border-t border-tanzania-50/10">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-tanzania-400 font-medium">
                    Sources verified by
                  </p>
                  <p className="text-sm font-bold mt-1 text-tanzania-300">
                    Tanzania Reach Editorial · 2026
                  </p>
                </div>
              </div>

              {/* Coverage areas */}
              <div className="rounded-3xl bg-white dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-8">
                <h3 className="font-display text-base font-medium mb-4 tracking-tight">
                  Coverage areas
                </h3>
                {[
                  { area: "Business & Investment", dot: "bg-tanzania-500" },
                  { area: "Politics & Governance", dot: "bg-zanzibar-500" },
                  { area: "Wildlife & Tourism", dot: "bg-emerald-500" },
                  { area: "Infrastructure & SGR", dot: "bg-kilimanjaro-700" },
                  { area: "Banking & Finance", dot: "bg-amber-500" },
                ].map((c) => (
                  <div key={c.area} className="flex items-center gap-3 py-2.5 border-b border-kilimanjaro-900/5 dark:border-tanzania-50/5 last:border-0">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                    <span className="text-sm text-kilimanjaro-700 dark:text-tanzania-200 font-medium">
                      {c.area}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tanzania in Focus Gallery */}
              <div className="rounded-3xl bg-white dark:bg-kilimanjaro-900/40 border border-kilimanjaro-900/10 dark:border-tanzania-50/10 p-8">
                <h3 className="font-display text-base font-medium mb-4 tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tanzania-500 animate-pulse" />
                  Tanzania in Focus
                </h3>
                <p className="text-xs text-kilimanjaro-500 dark:text-tanzania-400 leading-relaxed mb-4">
                  Visual snapshots of the United Republic of Tanzania, from the peaks of Kilimanjaro to the white sands of Zanzibar.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "mount-kilimanjaro", name: "Mt. Kilimanjaro", path: "/images/tanzania/mount-kilimanjaro.jpg" },
                    { id: "zanzibar-beach", name: "Zanzibar Beaches", path: "/images/tanzania/zanzibar-beach.jpg" },
                    { id: "serengeti-safari", name: "Serengeti Savanna", path: "/images/tanzania/serengeti-safari.jpg" },
                    { id: "dar-es-salaam", name: "Dar es Salaam", path: "/images/tanzania/dar-es-salaam.jpg" },
                  ].map((img) => (
                    <div key={img.id} className="relative group aspect-square rounded-2xl overflow-hidden border border-kilimanjaro-900/10 dark:border-tanzania-50/10 bg-muted">
                      <Image
                        src={img.path}
                        alt={img.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">{img.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href="/guides"
                className="block rounded-3xl p-8 bg-tanzania-500 text-white hover:bg-tanzania-600 transition-colors group"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-70 mb-3">
                  Expert portal
                </p>
                <h3 className="font-display text-lg font-medium leading-tight mb-4 tracking-tight">
                  Need sector-specific intelligence?
                </h3>
                <p className="text-sm opacity-80 leading-relaxed mb-4">
                  Dive into our 18 curated expert manuals covering immigration, investment, wildlife, and more.
                </p>
                <span className="text-xs font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  Browse all manuals →
                </span>
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

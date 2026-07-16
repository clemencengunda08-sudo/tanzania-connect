'use client';

interface CheckItem {
  label: string;
  status: "done" | "pending" | "warning";
  description: string;
  link?: string;
}

const SEO_CHECKLIST: CheckItem[] = [
  {
    label: "Sitemap live & dynamic",
    status: "done",
    description: "tanzaniareach.com/sitemap.xml is configured with Firestore data.",
    link: "/sitemap.xml",
  },
  {
    label: "robots.txt active",
    status: "done",
    description: "Crawling rules and AI scraper blocking configured.",
    link: "/robots.txt",
  },
  {
    label: "hreflang tags implemented",
    status: "done",
    description: "English and Swahili alternate language signals added.",
  },
  {
    label: "Sitemap submitted to Google",
    status: "pending",
    description: "Submit sitemap.xml in Google Search Console",
    link: "https://search.google.com/search-console",
  },
  {
    label: "Google Search Console verified",
    status: "pending",
    description: "Add verification code to layout.tsx metadata",
  },
  {
    label: "JSON-LD Structured Data",
    status: "done",
    description: "Organization, Website, and Article schemas detected.",
  },
  {
    label: "Dynamic OG Images",
    status: "done",
    description: "Social previews enabled for all sector pages.",
  }
];

const STATUS_CONFIG = {
  done: { icon: "✅", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  pending: { icon: "⏳", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  warning: { icon: "⚠️", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
};

export function SEOChecklist() {
  const done = SEO_CHECKLIST.filter((i) => i.status === "done").length;
  const total = SEO_CHECKLIST.length;
  const percent = Math.round((done / total) * 100);

  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-headline font-bold text-white uppercase tracking-tight">SEO Health Check</h3>
          <p className="text-xs text-slate-500 mt-1">{done}/{total} Protocol tasks active</p>
        </div>
        <div className="text-2xl font-black text-primary">{percent}%</div>
      </div>

      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${percent}%` }} />
      </div>

      <div className="space-y-2 max-h-[400px] overflow-auto pr-2 custom-scrollbar">
        {SEO_CHECKLIST.map((item, index) => {
          const config = STATUS_CONFIG[item.status];
          return (
            <div key={index} className={`flex items-start gap-3 p-3 rounded-2xl border ${config.bg} ${config.border}`}>
              <span className="text-sm mt-0.5">{config.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${config.color} uppercase tracking-widest`}>{item.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.description}</p>
              </div>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black text-primary hover:underline shrink-0">OPEN</a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

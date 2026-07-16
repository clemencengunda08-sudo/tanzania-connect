import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { getSectorMeta, getAllSectorSlugs } from "@/lib/sector-metadata";
import { JsonLd } from "@/components/json-ld";
import { sectorArticleSchema, breadcrumbSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params at build time for SSG speed
export async function generateStaticParams() {
  const slugs = getAllSectorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const meta = getSectorMeta(slug);
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `https://www.tanzaniareach.com/guides/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://www.tanzaniareach.com/guides/${slug}`,
      siteName: "Tanzania Reach",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: ["https://www.tanzaniareach.com/og-image.png"],
    },
  };
}

export default async function DynamicSectorGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const meta = getSectorMeta(slug);
  if (!meta) notFound();

  // Basic formatted paragraphs for guides that are dynamically defined
  const dummyContent = [
    `Welcome to the authoritative entry portal for ${meta.ogTitle || meta.title}. This guide compiles regulatory licensing requirements, key government agencies, and operational procedures for professionals and foreign investors.`,
    `Tanzania's regulatory environment is managed through several central authorities. When operating within this sector, registration with the Tanzania Investment Centre (TIC) is highly recommended to secure tax incentives and capital facilitation.`,
    `To get started, review the compliance checklist below and verify each item with the designated governing ministries.`
  ];

  return (
    <div className="min-h-screen bg-tanzania-50 dark:bg-kilimanjaro-950 text-kilimanjaro-900 dark:text-tanzania-50">
      <JsonLd
        data={sectorArticleSchema({
          slug,
          title: meta.title,
          description: meta.description,
        })}
      />
      <JsonLd data={breadcrumbSchema([{ name: "Guides", url: "/guides" }, { name: meta.title, url: `/guides/${slug}` }])} />

      <main className="relative overflow-hidden pt-28 md:pt-32 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto pb-24">
        {/* Back Link */}
        <Link
          href="/guides"
          className="inline-flex items-center gap-2 text-sm text-tanzania-600 dark:text-tanzania-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all guides
        </Link>

        {/* Title */}
        <div className="space-y-4 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-tanzania-600 dark:text-tanzania-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Regulatory briefing
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-medium tracking-tight leading-tight">
            {meta.ogTitle || meta.title.split(" — ")[0]}
          </h1>
          <p className="text-lg text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed font-light">
            {meta.ogDescription || meta.description}
          </p>
        </div>

        {/* Advisory Warning */}
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 mb-12 flex gap-4 items-start">
          <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-bold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider">Independent Advisory Notice</h4>
            <p className="text-xs text-kilimanjaro-600 dark:text-tanzania-200 leading-relaxed">
              This guide is curated by the Tanzania Reach editorial team from public resources. It is not legal, tax, or investment advice. Always verify licensing requirements and fee schedules with the relevant regulatory agencies before committing capital.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="prose dark:prose-invert max-w-none space-y-6 text-base leading-relaxed text-kilimanjaro-700 dark:text-tanzania-100">
          {dummyContent.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        {/* Quick Links Section */}
        <div className="mt-16 pt-12 border-t border-kilimanjaro-900/10 dark:border-tanzania-50/10">
          <h3 className="text-xl font-display font-bold mb-6">Key Verification Agencies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://www.tic.go.tz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center p-4 rounded-xl border border-kilimanjaro-900/10 dark:border-tanzania-50/10 hover:border-tanzania-500 transition-all bg-card"
            >
              <div>
                <h5 className="font-bold text-sm">Tanzania Investment Centre (TIC)</h5>
                <p className="text-xs text-muted-foreground">General investment licensing</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="https://www.brela.go.tz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center p-4 rounded-xl border border-kilimanjaro-900/10 dark:border-tanzania-50/10 hover:border-tanzania-500 transition-all bg-card"
            >
              <div>
                <h5 className="font-bold text-sm">BRELA</h5>
                <p className="text-xs text-muted-foreground">Company registration & business name search</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

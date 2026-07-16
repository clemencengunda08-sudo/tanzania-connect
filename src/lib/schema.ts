// Schema.org JSON-LD definitions for Tanzania Reach
// Optimized for 2026 AI Overviews

const BASE_URL = "https://www.tanzaniareach.com";
const LOGO_URL = `${BASE_URL}/favicon.svg`;
const OG_IMAGE = `${BASE_URL}/og-image.png`;

// 1. ORGANIZATION
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Tanzania Reach",
  alternateName: "TZ Reach",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${BASE_URL}/#logo`,
    url: LOGO_URL,
    width: 512,
    height: 512,
    caption: "Tanzania Reach Logo",
  },
  image: OG_IMAGE,
  description: "Tanzania Reach is your independent digital gateway for navigating life, investment, and business in Tanzania. Expert manuals and legal guides.",
  foundingLocation: { "@type": "Country", name: "Tanzania" },
  areaServed: { "@type": "Country", name: "Tanzania" },
  sameAs: [
    "https://twitter.com/tanzaniareach",
    "https://www.linkedin.com/company/tanzania-reach"
  ],
};

// 2. WEBSITE
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Tanzania Reach",
  publisher: { "@id": `${BASE_URL}/#organization` },
  inLanguage: ["en", "sw"],
};

// 3. HOME PAGE
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Tanzania Reach | Expert Portal for Investors & Professionals",
  description: "One-stop digital gateway for experts and investors navigating life and business in Tanzania.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
};

// 4. SECTOR ARTICLE SCHEMA
export function sectorArticleSchema({
  slug,
  title,
  description,
  dateModified,
}: {
  slug: string;
  title: string;
  description: string;
  dateModified?: string;
}) {
  const url = `${BASE_URL}/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}/#article`,
    headline: title,
    description: description,
    url: url,
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: dateModified ?? new Date().toISOString(),
    author: { "@id": `${BASE_URL}/#organization` },
    publisher: { "@id": `${BASE_URL}/#organization` },
    image: OG_IMAGE,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

// 5. BREADCRUMB
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// 6. FAQ SCHEMA (AI Optimization)
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// 7. SECTOR-SPECIFIC FAQs
export const sectorFaqs: Record<string, { question: string; answer: string }[]> = {
  immigration: [
    {
      question: "How long does a Tanzania work permit take?",
      answer: "A Tanzania work permit typically takes 3 to 6 weeks to process. Investor permits (Class A) may take longer depending on documentation and TIC registration status.",
    },
    {
      question: "Can foreigners own property in Tanzania?",
      answer: "Foreigners cannot own land outright but can hold a 'Derivative Right' of occupancy from TIC, typically for 33, 66, or 99 years.",
    },
  ],
  agriculture: [
    {
      question: "Can foreigners invest in Tanzania agriculture?",
      answer: "Yes. Foreigners can invest via the Tanzania Investment Centre (TIC). Minimum investment is $500,000 to qualify for incentives and land derivative rights.",
    },
    {
      question: "What is the SAGCOT corridor?",
      answer: "The Southern Agricultural Growth Corridor of Tanzania (SAGCOT) is a major government initiative focusing on commercial farming opportunities in Morogoro, Iringa, Njombe, and Mbeya.",
    },
  ],
};

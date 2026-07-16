import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = "https://www.tanzaniareach.com";

  return {
    rules: [
      // Allow ALL search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/p-access/", "/mwijay"],
      },
      // Explicitly allow AI crawlers
      {
        userAgent: [
          "GPTBot",              // OpenAI/ChatGPT
          "ChatGPT-User",        // ChatGPT browsing
          "ClaudeBot",           // Anthropic Claude
          "Claude-Web",          // Claude web
          "PerplexityBot",       // Perplexity AI
          "Perplexity-User",     // Perplexity user
          "Google-Extended",     // Google AI training
          "Applebot",            // Apple search
          "Applebot-Extended",   // Apple AI
          "Bytespider",          // TikTok
          "CCBot",               // Common Crawl (used by many AI)
          "anthropic-ai",        // Anthropic training
          "cohere-ai",           // Cohere
          "FacebookBot",         // Meta AI
          "Meta-ExternalAgent",  // Meta
          "YouBot",              // You.com
          "Amazonbot",           // Amazon AI
        ],
        allow: "/",
        disallow: ["/admin/", "/api/", "/p-access/", "/mwijay"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

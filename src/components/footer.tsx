import Link from "next/link";
import { Linkedin, Twitter, Mail, Globe, Shield } from "lucide-react";

const FOOTER_LINKS = {
  "Priority Sectors": [
    { label: "Agriculture & Land", href: "/agriculture" },
    { label: "Mining & Resources", href: "/mining" },
    { label: "Real Estate & Housing", href: "/housing" },
    { label: "Banking & Forex", href: "/banking" },
    { label: "All 18 Sector Manuals →", href: "/guides" },
  ],
  "Resources & Guides": [
    { label: "Live News & Briefings", href: "/news" },
    { label: "Contact Desk", href: "/contact" },
    { label: "Official Directory", href: "/directory" },
    { label: "Swahili Phrasebook", href: "/phrasebook" },
    { label: "About Tanzania Reach", href: "/about" },
  ],
  "Legal & Regulatory": [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Compliance & Disclaimer", href: "/terms" },
    { label: "Cookie Settings", href: "/cookies" },
  ],
};

const SOCIAL = [
  { Icon: Twitter, href: "https://twitter.com/tanzaniareach", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com/company/tanzaniareach", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:info@tanzaniareach.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative mt-6 md:mt-10 overflow-hidden border-t border-kilimanjaro-900/10 bg-white text-kilimanjaro-900 dark:border-tanzania-800/60 dark:bg-tanzania-950 dark:text-tanzania-50">
      {/* Top mesh gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tanzania-400 to-transparent" />

      {/* Background glow */}
      <div className="absolute -top-40 left-1/4 w-80 h-80 bg-tanzania-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-80 h-80 bg-zanzibar-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Top section: brand + links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6">
          {/* Brand block */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tanzania-400 via-tanzania-500 to-tanzania-700 flex items-center justify-center shadow-md shadow-tanzania-500/30 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-white text-sm">TR</span>
              </div>
              <div>
                <div className="text-sm font-headline font-black tracking-tight text-kilimanjaro-950 dark:text-white leading-none">Tanzania Reach</div>
                <div className="text-[9px] uppercase tracking-[0.18em] text-tanzania-500 dark:text-tanzania-300 font-bold mt-0.5">Independent Portal</div>
              </div>
            </Link>

            <p className="text-xs leading-relaxed max-w-md font-normal text-kilimanjaro-600 dark:text-tanzania-100/70">
              The professional gateway for investors, executives, and foreigners
              navigating life, capital, and compliance in the United Republic of Tanzania.
            </p>

            {/* Trust badges & contact chips */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-kilimanjaro-900/10 bg-kilimanjaro-50 text-[9px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:border-tanzania-700/50 dark:bg-tanzania-900/60 dark:text-tanzania-200">
                <Shield className="w-2.5 h-2.5 text-tanzania-600 dark:text-tanzania-300" />
                <span>Educational only</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-kilimanjaro-900/10 bg-kilimanjaro-50 text-[9px] font-bold uppercase tracking-wider text-kilimanjaro-700 dark:border-tanzania-700/50 dark:bg-tanzania-900/60 dark:text-tanzania-200">
                <Globe className="w-2.5 h-2.5 text-tanzania-600 dark:text-tanzania-300" />
                <span>v2.0 · 2026</span>
              </div>
              <Link
                href="/contact"
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-tanzania-500/30 bg-tanzania-500/10 text-[9px] font-bold uppercase tracking-wider text-tanzania-600 dark:text-tanzania-300 hover:bg-tanzania-500/20 transition-colors"
              >
                info@tanzaniareach.com
              </Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg border border-kilimanjaro-900/10 bg-kilimanjaro-50 flex items-center justify-center text-kilimanjaro-700 hover:text-tanzania-700 hover:border-tanzania-500 transition-all dark:border-tanzania-800/50 dark:bg-tanzania-900/50 dark:text-tanzania-200 dark:hover:text-white dark:hover:bg-tanzania-700"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="md:col-span-2 sm:col-span-4 col-span-6 space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-tanzania-600 dark:text-tanzania-300">
                {heading}
              </div>
              <ul className="space-y-1.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs font-normal text-kilimanjaro-600 hover:text-tanzania-600 dark:text-tanzania-200/80 dark:hover:text-white transition-colors inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom legal bar */}
        <div className="pt-4 border-t border-kilimanjaro-900/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 dark:border-tanzania-800/60">
          <div className="text-[10px] font-normal text-kilimanjaro-500 dark:text-tanzania-300/60">
            © 2026 Tanzania Reach. Independent educational resource. Not affiliated with any Government Agency, Ministry, or Licensed Legal Advisor.
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-kilimanjaro-600 dark:text-tanzania-200/80">
            <span>Made by</span>
            <span className="inline-flex items-center gap-1 font-bold text-tanzania-600 dark:text-tanzania-300">
              <span className="w-1.5 h-1.5 rounded-full bg-tanzania-500 inline-block animate-pulse" />
              Altraware Technologies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

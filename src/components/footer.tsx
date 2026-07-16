import Link from "next/link";
import { Linkedin, Twitter, Mail, Globe, Shield } from "lucide-react";

const FOOTER_LINKS = {
  Sectors: [
    { label: "All 18 Sectors →", href: "/guides" },
  ],
  Resources: [
    { label: "Today's News", href: "/news" },
    { label: "About", href: "/about" },
    { label: "Contact Directory", href: "/directory" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

const SOCIAL = [
  { Icon: Twitter, href: "https://twitter.com/tanzaniareach", label: "Twitter" },
  { Icon: Linkedin, href: "https://linkedin.com/company/tanzaniareach", label: "LinkedIn" },
  { Icon: Mail, href: "mailto:hello@tanzaniareach.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-kilimanjaro-900/10 bg-white text-kilimanjaro-900 dark:border-tanzania-800/60 dark:bg-tanzania-950 dark:text-tanzania-50">
      {/* Top mesh gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tanzania-400 to-transparent" />

      {/* Background glow */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-tanzania-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-zanzibar-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        {/* Top section: brand + links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Brand block */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-tanzania-400 via-tanzania-500 to-tanzania-700 flex items-center justify-center shadow-lg shadow-tanzania-500/30 group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-white text-lg">TR</span>
              </div>
              <div>
                <div className="text-lg font-headline font-black tracking-tighter">Tanzania Reach</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-tanzania-300/70 font-black">Independent Portal</div>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-md font-medium text-kilimanjaro-700 dark:text-tanzania-100/70">
              The professional gateway for investors, executives, and foreigners
              navigating life, capital, and compliance in the United Republic of Tanzania.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-kilimanjaro-900/10 bg-kilimanjaro-50 text-[10px] font-black uppercase tracking-widest text-kilimanjaro-700 dark:border-tanzania-700/50 dark:bg-tanzania-900/60 dark:text-tanzania-200">
                <Shield className="w-3 h-3 text-tanzania-600 dark:text-tanzania-300" />
                <span>Educational only</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-kilimanjaro-900/10 bg-kilimanjaro-50 text-[10px] font-black uppercase tracking-widest text-kilimanjaro-700 dark:border-tanzania-700/50 dark:bg-tanzania-900/60 dark:text-tanzania-200">
                <Globe className="w-3 h-3 text-tanzania-600 dark:text-tanzania-300" />
                <span>v2.0 · 2026</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 pt-4">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-kilimanjaro-900/10 bg-kilimanjaro-50 flex items-center justify-center text-kilimanjaro-700 hover:text-tanzania-700 hover:border-tanzania-500 hover:-translate-y-0.5 transition-all dark:border-tanzania-800/50 dark:bg-tanzania-900/50 dark:text-tanzania-200 dark:hover:text-white dark:hover:bg-tanzania-700 dark:hover:border-tanzania-500"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading} className="md:col-span-2 space-y-5">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-tanzania-600 dark:text-tanzania-300">
                {heading}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-kilimanjaro-700 hover:text-tanzania-600 dark:text-tanzania-100/80 dark:hover:text-white transition-colors inline-flex items-center group"
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

          {/* Newsletter placeholder */}
          <div className="md:col-span-1 space-y-5">
            <div className="text-[10px] font-black uppercase tracking-[0.25em] text-tanzania-600 dark:text-tanzania-300">
              Reach
            </div>
            <div className="text-xs leading-relaxed font-medium text-kilimanjaro-600 dark:text-tanzania-100/60">
              Built in Dar es Salaam.<br />
              For the world.
            </div>
          </div>
        </div>

        {/* Bottom legal bar */}
        <div className="pt-8 border-t border-kilimanjaro-900/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 dark:border-tanzania-800/60">
          <div className="text-[11px] font-medium text-kilimanjaro-600 dark:text-tanzania-200/60">
            © 2026 Tanzania Reach. Independent educational resource. Not affiliated with any Government Agency, Ministry, or Licensed Legal Advisor.
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-kilimanjaro-500 dark:text-tanzania-300/60">
            <span>Made with</span>
            <span className="text-tanzania-500 dark:text-tanzania-400">◆</span>
            <span>in Dar es Salaam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  // NOTE: No "Home" entry — the logo already links to the landing page (/)
  {
    href: '/visa',
    label: 'Legal & Entry',
    children: [
      { href: '/visa', label: 'Immigration & Visas' },
      { href: '/corporate', label: 'Corporate Setup' },
      { href: '/directory', label: 'Official Directory' },
    ],
  },
  {
    href: '/guides',
    label: 'Investment',
    children: [
      { href: '/agriculture', label: 'Agriculture & Land' },
      { href: '/mining', label: 'Mining & Resources' },
      { href: '/housing', label: 'Real Estate' },
      { href: '/banking', label: 'Banking & Forex' },
      { href: '/infrastructure', label: 'Infrastructure & Energy' },
      { href: '/technology', label: 'Technology & ICT' },
      { href: '/guides', label: 'All 18 Sector Guides →' },
    ],
  },
  { href: '/phrasebook', label: 'Swahili' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const MOBILE_EXTRA_LINKS = [
  { href: '/directory', label: 'Emergency & Directory' },
  { href: '/contact', label: 'Direct Desk & Inquiries' },
];

/**
 * GlobalNav — fixed top navbar visible on EVERY page.
 * Top state: Elegant translucent banner over hero/page content.
 * Scrolled state: Morphs smoothly into the signature floating glass island pill.
 */
export function GlobalNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isScrolled = mounted && scrolled;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 py-3 md:py-4 px-3 md:px-6 pointer-events-auto transition-all duration-300">
        <div
          className={cn(
            'mx-auto w-full flex items-center justify-between transition-all duration-500 ease-out',
            isScrolled
              ? 'max-w-[1240px] rounded-full px-4 md:px-6 py-2 bg-white/95 border border-slate-200/90 text-slate-900 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:bg-kilimanjaro-950/95 dark:border-white/10 dark:text-white dark:shadow-black/70'
              : 'max-w-[1360px] rounded-2xl md:rounded-full px-4 md:px-6 py-2.5 bg-kilimanjaro-950/75 border border-white/10 text-white backdrop-blur-md shadow-lg shadow-black/25'
          )}
        >
          {/* === LOGO === */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 shrink-0"
            aria-label="Tanzania Reach home"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-tanzania-400 via-tanzania-500 to-tanzania-700 font-extrabold text-white shadow-lg shadow-tanzania-500/30 transition-transform group-hover:scale-105"
            >
              TR
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn(
                'text-[10px] font-bold uppercase tracking-[0.18em]',
                isScrolled ? 'text-tanzania-600 dark:text-tanzania-400' : 'text-tanzania-300'
              )}>
                Tanzania
              </span>
              <span className={cn(
                'text-sm font-extrabold tracking-tight',
                isScrolled ? 'text-slate-950 dark:text-white' : 'text-white'
              )}>
                REACH
              </span>
            </div>
          </Link>

          {/* === DESKTOP LINKS === */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenMenu(link.href)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'group flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all',
                      isScrolled
                        ? isActive
                          ? 'bg-slate-100 text-slate-950 font-bold dark:bg-white/15 dark:text-white'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 dark:text-white/85 dark:hover:text-white dark:hover:bg-white/10'
                        : isActive
                          ? 'bg-white/20 text-white font-bold backdrop-blur-sm'
                          : 'text-white/85 hover:text-white hover:bg-white/15'
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          'h-3.5 w-3.5 transition-transform',
                          isScrolled
                            ? 'text-slate-400 group-hover:text-slate-900 dark:text-white/60 dark:group-hover:text-white'
                            : 'text-white/60 group-hover:text-white',
                          openMenu === link.href && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && openMenu === link.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2 z-50"
                      >
                        <div className="w-64 rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-kilimanjaro-950/95">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-xl px-4 py-2.5 text-[13px] font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* === RIGHT CTAs === */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/about"
              className={cn(
                'hidden md:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold border transition-all',
                isScrolled
                  ? 'border-slate-200 bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 hover:text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white'
                  : 'border-white/20 bg-white/10 text-white/90 hover:bg-white/20 hover:text-white'
              )}
            >
              <Globe className="h-3 w-3 text-tanzania-400" />
              <span>EN</span>
            </Link>

            <ThemeToggle />

            <Link
              href="/guides"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-tanzania-500 px-4 py-2 text-[12px] font-semibold text-white shadow-lg shadow-tanzania-500/30 transition-all hover:bg-tanzania-600 hover:scale-[1.02] active:scale-95"
            >
              Expert Manuals
              <span aria-hidden>→</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={cn(
                'lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all',
                isScrolled
                  ? 'border-slate-200 bg-slate-100 text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white'
                  : 'border-white/20 bg-white/10 text-white'
              )}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* === MOBILE DRAWER === */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-kilimanjaro-950/80 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-kilimanjaro-950 p-6 pt-20 border-l border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-tanzania-500 flex items-center justify-center text-white font-extrabold text-xs">
                    TR
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Tanzania Reach</div>
                    <div className="text-[9px] uppercase tracking-wider text-tanzania-400 font-semibold">Portal Navigation</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full bg-white/10 text-white/80 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.href} className="border-b border-white/5">
                    <Link
                      href={link.href}
                      className={cn(
                        'block py-3 text-base font-semibold transition-colors',
                        pathname === link.href ? 'text-tanzania-400' : 'text-white/90 hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pb-3 pl-3 space-y-1.5 border-l-2 border-tanzania-500/30 ml-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-1 text-xs text-white/70 hover:text-tanzania-300 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {MOBILE_EXTRA_LINKS.map((link) => (
                  <div key={link.href} className="border-b border-white/5">
                    <Link
                      href={link.href}
                      className="block py-3 text-base font-semibold text-white/70 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <Link
                  href="/guides"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-tanzania-500 py-3 text-sm font-semibold text-white shadow-lg shadow-tanzania-500/30"
                >
                  Expert Manuals →
                </Link>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <p className="text-[11px] text-white/60">Direct Advisory & Desk</p>
                  <a href="tel:+255792867427" className="text-xs font-bold text-tanzania-300 block mt-1 hover:underline">
                    +255 792 867 427
                  </a>
                  <a href="mailto:info@tanzaniareach.com" className="text-xs font-medium text-white/80 block mt-0.5 hover:underline">
                    info@tanzaniareach.com
                  </a>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

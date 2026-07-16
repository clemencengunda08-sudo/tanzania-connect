'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  {
    href: '/visa',
    label: 'Legal & Entry',
    children: [
      { href: '/visa', label: 'Immigration & Entry' },
      { href: '/corporate', label: 'Corporate Setup' },
      { href: '/directory', label: 'Directory' },
    ],
  },
  {
    href: '/guides',
    label: 'Investment',
    children: [
      { href: '/agriculture', label: 'Agriculture' },
      { href: '/banking', label: 'Banking' },
      { href: '/housing', label: 'Real Estate' },
      { href: '/mining', label: 'Mining' },
      { href: '/infrastructure', label: 'Infrastructure & Energy' },
    ],
  },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
];

/**
 * GlobalNav — fixed top navbar present on EVERY page.
 * Audenic-style: transparent on top → glass pill when scrolled.
 * Uses ONE font (Inter) with weight contrast.
 */
export function GlobalNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5'
        )}
      >
        <div
          className={cn(
            'mx-auto w-[90%] max-w-[1400px] flex items-center justify-between rounded-full transition-all duration-500',
            scrolled
              ? 'bg-kilimanjaro-950/80 backdrop-blur-xl border border-white/10 shadow-lg px-6 py-2.5'
              : 'bg-transparent px-4 py-2 border border-transparent'
          )}
        >
            {/* === LOGO === */}
            <Link
              href="/"
              className="group flex items-center gap-2.5"
              aria-label="Tanzania Reach home"
            >
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-tanzania-500 to-tanzania-700 font-extrabold text-white shadow-lg shadow-tanzania-500/30 transition-all',
                  scrolled ? 'scale-90' : 'scale-100'
                )}
              >
                TR
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-tanzania-600 dark:text-tanzania-300">
                  Tanzania
                </span>
                <span className={cn(
                  'text-sm font-extrabold tracking-tight transition-colors',
                  scrolled ? 'text-white' : 'text-kilimanjaro-950 dark:text-white'
                )}>
                  REACH
                </span>
              </div>
            </Link>

            {/* === DESKTOP LINKS === */}
            <nav className="hidden lg:flex items-center gap-1">
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
                        'group flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-medium transition-all',
                        scrolled
                          ? isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                          : isActive
                            ? 'bg-kilimanjaro-950/10 text-kilimanjaro-950 dark:bg-white/10 dark:text-white'
                            : 'text-kilimanjaro-700 hover:text-kilimanjaro-950 hover:bg-kilimanjaro-950/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/5'
                      )}
                    >
                      {link.label}
                      {link.children && (
                        <ChevronDown
                          className={cn(
                            'h-3.5 w-3.5 transition-transform',
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
                          className="absolute left-0 top-full pt-2"
                        >
                          <div className="w-64 rounded-2xl border border-white/10 bg-kilimanjaro-950/95 p-2 shadow-2xl backdrop-blur-xl">
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block rounded-xl px-4 py-2.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
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
            <div className="flex items-center gap-2">
              <Link
                href="/news"
                className={cn(
                  'hidden md:flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all',
                  scrolled
                    ? 'border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white'
                    : 'border border-kilimanjaro-950/15 bg-kilimanjaro-950/5 text-kilimanjaro-700 hover:bg-kilimanjaro-950/10 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white'
                )}
              >
                <Globe className="h-3 w-3" />
                <span>EN</span>
              </Link>
              <ThemeToggle />
              <Link
                href="/guides"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-tanzania-500 px-4 py-2 text-[12px] font-semibold text-white shadow-lg shadow-tanzania-500/30 transition-all hover:bg-tanzania-400 hover:scale-[1.02]"
              >
                Expert Manuals
                <span aria-hidden>→</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
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
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-kilimanjaro-950/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-kilimanjaro-950 p-6 pt-24"
            >
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.href} className="border-b border-white/5">
                    <Link
                      href={link.href}
                      className="block py-4 text-lg font-semibold text-white"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="pb-3 pl-4 space-y-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-1.5 text-sm text-white/60"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Link
                href="/guides"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-tanzania-500 py-3 text-sm font-semibold text-white"
              >
                Expert Manuals →
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Landmark, Briefcase, Sprout, Coins, Construction, Settings, X, ChevronDown, Sparkles, ArrowUpRight, Sun, Moon, Radio } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useTheme } from "next-themes";
import { MobileMenu } from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
}

const Navbar1 = ({
  logo = {
    url: "/",
    title: "Tanzania Reach",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Legal & Entry",
      url: "#",
      items: [
        {
          title: "Immigration",
          description: "Visas, residence permits, and border compliance.",
          icon: <Landmark className="size-5 shrink-0" />,
          url: "/visa",
        },
        {
          title: "Corporate",
          description: "Entity registration, tax, and labor compliance.",
          icon: <Briefcase className="size-5 shrink-0" />,
          url: "/corporate",
        },
      ],
    },
    {
      title: "Investment",
      url: "#",
      items: [
        {
          title: "Agriculture",
          description: "Land tenure, crops, and agribusiness incentives.",
          icon: <Sprout className="size-5 shrink-0" />,
          url: "/agriculture",
        },
        {
          title: "Banking",
          description: "Mobile money, local accounts, and USD policies.",
          icon: <Coins className="size-5 shrink-0" />,
          url: "/banking",
        },
        {
          title: "Infrastructure",
          description: "SGR rail, energy, and digital connectivity.",
          icon: <Construction className="size-5 shrink-0" />,
          url: "/infrastructure",
        },
      ],
    },
    { title: "News", url: "/#news", icon: <Radio className="w-3.5 h-3.5" /> },
  ],
}: Navbar1Props) => {
  const { admin } = useAdminAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    // Scroll-aware navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hydration-safe placeholder
  if (!mounted) {
    return (
      <nav className="py-4 border-b bg-background h-20 flex items-center px-4 md:px-6">
        <div className="w-8 h-8 rounded-lg bg-muted animate-pulse" />
        <div className="ml-4 h-6 w-32 bg-muted rounded animate-pulse" />
      </nav>
    );
  }

  return (
    <>
      <motion.section
        initial={false}
        animate={{
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--background) 80%, transparent)"
            : "color-mix(in srgb, var(--background) 0%, transparent)",
          borderColor: scrolled
            ? "color-mix(in srgb, var(--foreground) 10%, transparent)"
            : "color-mix(in srgb, var(--foreground) 5%, transparent)",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-[100] border-b pt-[env(safe-area-inset-top)]"
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <Link href={logo.url} className="group flex items-center gap-2.5">
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-tanzania-500 via-tanzania-600 to-tanzania-800 flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-tanzania-500/30"
                >
                  <span className="relative z-10">TR</span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-tanzania-300 to-zanzibar-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tighter uppercase leading-none">
                    {logo.title}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-tanzania-600 dark:text-tanzania-400 leading-none mt-0.5">
                    Tanzania Reach
                  </span>
                </div>
              </Link>

              <div className="hidden lg:block">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menu.map((item) => (
                      <NavigationMenuItem key={item.title}>
                        {item.items ? (
                          <>
                            <NavigationMenuTrigger
                              onMouseEnter={() => setHoveredItem(item.title)}
                              onMouseLeave={() => setHoveredItem(null)}
                              className="relative font-bold text-muted-foreground hover:text-foreground transition-colors bg-transparent"
                            >
                              {hoveredItem === item.title && (
                                <motion.span
                                  layoutId="nav-hover"
                                  className="absolute inset-0 rounded-lg bg-tanzania-500/10 -z-10"
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                              )}
                              {item.title}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                              <ul className="w-80 p-3">
                                {item.items.map((sub) => (
                                  <li key={sub.title}>
                                    <NavigationMenuLink asChild>
                                      <Link className="flex gap-4 rounded-xl p-3 hover:bg-muted group transition-all" href={sub.url}>
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                          {sub.icon}
                                        </div>
                                        <div>
                                          <div className="text-sm font-bold">{sub.title}</div>
                                          <p className="text-xs text-muted-foreground mt-1">{sub.description}</p>
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <Link
                              onMouseEnter={() => setHoveredItem(item.title)}
                              onMouseLeave={() => setHoveredItem(null)}
                              className="relative px-4 py-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                              href={item.url}
                            >
                              {item.icon}
                              {item.title}
                              {hoveredItem === item.title && (
                                <motion.span
                                  layoutId="nav-hover"
                                  className="absolute inset-0 rounded-lg bg-tanzania-500/10 -z-10"
                                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                              )}
                            </Link>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="relative w-10 h-10 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 flex items-center justify-center transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {resolvedTheme === "dark" ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4 text-tanzania-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4 text-tanzania-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {admin && (
                <Button asChild variant="ghost" size="sm" className="hidden sm:flex gap-2">
                  <Link href="/p-access/dashboard">
                    <Settings className="w-4 h-4" /> Control
                  </Link>
                </Button>
              )}
              <Button
                asChild
                size="sm"
                className="hidden sm:flex bg-gradient-to-br from-tanzania-500 via-tanzania-600 to-tanzania-700 hover:from-tanzania-600 hover:to-tanzania-800 text-white border-none shadow-lg shadow-tanzania-500/30 rounded-xl px-6 group"
              >
                <Link href="/guides">
                  Expert Manuals
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1 group-hover:rotate-45 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="lg:hidden rounded-xl h-11 w-11"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </nav>
        </div>

        <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </motion.section>
    </>
  );
};

export { Navbar1 };

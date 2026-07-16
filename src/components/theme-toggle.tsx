'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full bg-muted/60 animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative h-10 w-10 rounded-full border border-kilimanjaro-900/15 dark:border-tanzania-50/15 bg-white/80 dark:bg-kilimanjaro-900/80 backdrop-blur-sm shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-md active:scale-95 group"
    >
      {/* Hover glow */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-tanzania-400/20 to-transparent" />

      {/* Icon */}
      <span className="relative z-10">
        {isDark ? (
          <Sun
            style={{ width: '1.15rem', height: '1.15rem' }}
            className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.7)] transition-transform group-hover:rotate-45 duration-300"
          />
        ) : (
          <Moon
            style={{ width: '1.15rem', height: '1.15rem' }}
            className="text-kilimanjaro-700 dark:text-tanzania-200 transition-transform group-hover:-rotate-12 duration-300"
          />
        )}
      </span>
    </button>
  );
}

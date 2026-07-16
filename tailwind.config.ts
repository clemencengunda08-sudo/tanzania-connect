import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // === ONE FONT FAMILY (Audenic pattern) — Inter at multiple weights ===
        body: ['var(--font-inter)', 'sans-serif'],
        // All headings use the same Inter family — hierarchy via size & weight, NOT different fonts
        headline: ['var(--font-inter)', 'sans-serif'],
        // Display = same Inter but with tighter tracking & heavier weight (no serif)
        display: ['var(--font-inter)', 'sans-serif'],
        // Mono stays only for technical labels (LIVE • 9:32 PM, code blocks)
        code: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // === TANZANIA REACH — BLUE DOMINANT PALETTE ===
        // ALL warm/serengeti/safari/acacia/baobab removed. Single blue brand system.

        // tanzania = signature blue (PRIMARY BRAND — used for #006FCF family)
        tanzania: {
          50:  '#eef5fc',
          100: '#d6e7f8',
          200: '#aecff1',
          300: '#7fb0e7',
          400: '#4f91de',
          500: '#2573d2',     // mid tanzania blue
          600: '#006FCF',     // *** SIGNATURE TANZANIA BLUE — PRIMARY ***
          700: '#0059a6',
          800: '#00437d',
          900: '#0a1d36',
          950: '#061327',
        },

        // tanzania-cyan = bright accent (Zanzibar coast)
        'tanzania-cyan': {
          50:  '#ecfbff',
          100: '#c9f3ff',
          200: '#9ae8ff',
          300: '#58d6ff',
          400: '#22c0ff',
          500: '#00a3f5',     // bright cyan
          600: '#0082cc',
          700: '#0166a3',
          800: '#055786',
          900: '#0a486d',
          950: '#072f4a',
        },

        // tanzania-sky = light/pastel blue
        'tanzania-sky': {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },

        // tanzania-ice = super-light blue tint
        'tanzania-ice': {
          50:  '#f8fbff',
          100: '#f0f7ff',
          200: '#dceaff',
          300: '#b8d4ff',
          400: '#8bb8ff',
          500: '#5b8ef5',
          600: '#3a6ce0',
          700: '#2b53b8',
          800: '#264890',
          900: '#243f74',
        },

        // zanzibar = turquoise-blue secondary (coastal accent)
        zanzibar: {
          50:  '#ecf6fb',
          100: '#cfe9f4',
          200: '#a0d3e9',
          300: '#65b6dc',
          400: '#3198cf',
          500: '#1a7eb3',
          600: '#136490',
          700: '#0e4a6c',
          800: '#09304a',
          900: '#04182a',
        },

        // gold = warm accent (used sparingly, for highlights & dark theme)
        gold: {
          50:  '#fefbec',
          100: '#fcf2c5',
          200: '#f8e388',
          300: '#f3cd47',
          400: '#eeb924',
          500: '#D4AF37',     // *** SIGNATURE GOLD ***
          600: '#b58a1f',
          700: '#8f681a',
          800: '#76541d',
          900: '#65471d',
          950: '#3b2707',
        },

        // kilimanjaro = deep navy (text + dark surfaces)
        kilimanjaro: {
          50:  '#f3f5f8',
          100: '#dde2eb',
          200: '#bcc6d6',
          300: '#8a9bb4',
          400: '#5a6e8c',
          500: '#3d4f6b',
          600: '#2a3a52',
          700: '#1c283c',
          800: '#0f1827',
          900: '#070c14',
          950: '#03060c',
        },

        // shadcn compatibility
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontSize: {
        'mega': ['clamp(4rem, 14vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'hero': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      },
      letterSpacing: {
        tightest: '-0.06em',
        ultra: '-0.04em',
      },
      boxShadow: {
        'glow-tanzania': '0 0 60px -15px rgba(0, 111, 207, 0.4)',
        'glow-zanzibar': '0 0 80px -20px rgba(26, 126, 179, 0.35)',
        'lift': '0 30px 60px -20px rgba(6, 19, 39, 0.25), 0 18px 36px -18px rgba(6, 19, 39, 0.15)',
        'lift-lg': '0 50px 100px -30px rgba(6, 19, 39, 0.35), 0 30px 60px -30px rgba(6, 19, 39, 0.2)',
        'inner-blue': 'inset 0 1px 0 0 rgba(214, 231, 248, 0.9), inset 0 -1px 0 0 rgba(6, 19, 39, 0.04)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-rev': 'marquee-rev 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float-slow 12s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'blink': 'blink 1.4s ease-in-out infinite',
        'reveal-up': 'reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        'ken-burns': 'ken-burns 20s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ken-burns': {
          '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.08) translate(-2%, -1%)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='3'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        'noise': "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
        'noise-light': "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.12'/></svg>\")",
        // Tanzania signature gradients — all blue
        'gradient-tanzania': 'linear-gradient(135deg, #006FCF 0%, #0059a6 50%, #0a1d36 100%)',
        'gradient-zanzibar': 'linear-gradient(135deg, #3198cf 0%, #1a7eb3 50%, #09304a 100%)',
        'gradient-deep': 'linear-gradient(135deg, #0a1d36 0%, #006FCF 50%, #3198cf 100%)',
      },
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

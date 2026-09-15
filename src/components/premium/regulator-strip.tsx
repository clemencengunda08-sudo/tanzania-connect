'use client';

import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';
import { Marquee } from '@/components/premium/marquee';

type Regulator = {
  short: string;
  full: string;
  url: string;
  scope: string;
  accent?: 'serengeti' | 'acacia' | 'baobab' | 'kilimanjaro' | 'zanzibar' | 'tanzania';
};

const REGULATORS: Regulator[] = [
  { short: 'TIC',        full: 'Tanzania Investment Centre',           url: 'https://www.tic.go.tz',           scope: 'Investment' },
  { short: 'BRELA',      full: 'Business Registrations & Licensing',   url: 'https://www.brela.go.tz',         scope: 'Company Law' },
  { short: 'TRA',        full: 'Tanzania Revenue Authority',           url: 'https://www.tra.go.tz',           scope: 'Tax' },
  { short: 'BoT',        full: 'Bank of Tanzania',                     url: 'https://www.bot.go.tz',           scope: 'Banking' },
  { short: 'DSE',        full: 'Dar es Salaam Stock Exchange',         url: 'https://www.dse.co.tz',           scope: 'Capital Markets' },
  { short: 'TCRA',       full: 'Tanzania Communications Reg. Auth.',   url: 'https://www.tcra.go.tz',          scope: 'Telecom' },
  { short: 'TANESCO',    full: 'Tanzania Electric Supply Co.',         url: 'https://www.tanesco.co.tz',       scope: 'Power' },
  { short: 'EWURA',      full: 'Energy & Water Utilities Reg. Auth.', url: 'https://www.ewura.go.tz',         scope: 'Utilities' },
  { short: 'TIRA',       full: 'Tanzania Insurance Regulatory Auth.', url: 'https://www.tira.go.tz',          scope: 'Insurance' },
  { short: 'CMSA',       full: 'Capital Markets & Securities Auth.',  url: 'https://www.cmsa.go.tz',          scope: 'Securities' },
  { short: 'Immigration',full: 'Tanzania Immigration Dept.',          url: 'https://www.immigration.go.tz',   scope: 'Visas' },
  { short: 'TMDA',       full: 'Tanzania Medicines & Devices Auth.',  url: 'https://www.tmda.go.tz',          scope: 'Healthcare' },
  { short: 'NIDA',       full: 'National ID Authority',               url: 'https://www.nida.go.tz',          scope: 'Identity' },
  { short: 'MNRT',       full: 'Ministry of Natural Resources',       url: 'https://www.maliasili.go.tz',    scope: 'Wildlife' },
];

type Props = {
  regulators?: Regulator[];
  caption?: string;
  showBadge?: boolean;
  variant?: 'gold' | 'default' | 'glass';
  className?: string;
};

export function RegulatorStrip({
  regulators = REGULATORS,
  caption = 'Official regulatory bodies. Click any institution to verify directly on their portal.',
  showBadge = true,
  variant = 'gold',
  className,
}: Props) {
  // Build rich items with official URLs and full agency names
  const items = regulators.filter(r => r.short && r.scope);
  const marqueeItems = items.map(r => ({
    label: r.short,
    value: r.scope,
    sublabel: r.full,
    href: r.url,
  }));

  return (
    <section
      className={cn(
        'relative py-6 overflow-hidden',
        variant === 'gold' && 'bg-gradient-to-r from-tanzania-500/[0.04] via-tanzania-500/[0.08] to-tanzania-500/[0.04] border-y border-tanzania-500/20',
        variant === 'default' && 'bg-kilimanjaro-900/[0.02] dark:bg-tanzania-50/[0.02] border-y border-kilimanjaro-900/8 dark:border-tanzania-50/8',
        variant === 'glass' && 'glass-card border-y border-white/10',
        className
      )}
      aria-label="Tanzania regulatory institutions"
    >
      {/* Header row */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 mb-3.5 flex items-center justify-between gap-4">
        {showBadge && (
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tanzania-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tanzania-600"></span>
            </span>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold text-tanzania-600 dark:text-tanzania-400">
              Verified Institutions & Regulatory Framework
            </p>
          </div>
        )}
        {caption && (
          <p className="hidden sm:block text-[11px] text-kilimanjaro-500 dark:text-tanzania-400 italic max-w-md text-right">
            {caption}
          </p>
        )}
      </div>

      <Marquee
        items={marqueeItems}
        speed={40}
        pauseOnHover={true}
      />
    </section>
  );
}

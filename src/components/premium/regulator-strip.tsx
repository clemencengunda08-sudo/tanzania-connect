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
  caption = 'Independent educational source. Always verify with the official institution.',
  showBadge = true,
  variant = 'gold',
  className,
}: Props) {
  // Build a flat array of label items — duplicated for seamless loop
  const items = regulators.filter(r => r.short && r.scope);
  const marqueeItems = items.map(r => ({
    label: r.short,
    value: r.scope
  }));

  return (
    <section
      className={cn(
        'relative py-8 overflow-hidden',
        variant === 'gold' && 'bg-gradient-to-r from-tanzania-500/[0.08] via-tanzania-500/[0.14] to-tanzania-500/[0.08] border-y border-tanzania-500/30',
        variant === 'default' && 'bg-kilimanjaro-900/[0.04] dark:bg-tanzania-50/[0.04] border-y border-kilimanjaro-900/10 dark:border-tanzania-50/10',
        variant === 'glass' && 'glass-card border-y border-white/10',
        className
      )}
      aria-label="Tanzania regulatory institutions"
    >
      {/* Header row */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 mb-5 flex items-center justify-between gap-4">
        {showBadge && (
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-tanzania-600 dark:text-tanzania-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Institutions
          </p>
        )}
        {caption && (
          <p className="hidden md:block text-xs text-kilimanjaro-600 dark:text-tanzania-300 italic max-w-md text-right">
            {caption}
          </p>
        )}
      </div>

      <Marquee
        items={marqueeItems}
        separator="✦"
        speed={35}
        pauseOnHover={true}
        className="text-kilimanjaro-900 dark:text-tanzania-50 font-black"
      />
    </section>
  );
}

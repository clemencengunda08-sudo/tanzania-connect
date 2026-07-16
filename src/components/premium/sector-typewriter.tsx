'use client';

import { cn } from '@/lib/utils';
import { TypeWriter } from './type-writer';

type Props = {
  /** Pre-defined sector typewriter rotation */
  sector?: 'agriculture' | 'banking' | 'visa' | 'mining' | 'tourism' | 'healthcare' | 'infrastructure' | 'wildlife' | 'corporate' | 'housing' | 'transport' | 'culture' | 'food' | 'technology';
  /** Override rotation with custom words */
  words?: string[];
  className?: string;
  /** text color for typed content */
  textClassName?: string;
  /** caret color */
  caretClassName?: string;
};

const SECTOR_WORDS: Record<NonNullable<Props['sector']>, string[]> = {
  agriculture:    ['Coffee', 'Cashews', 'Sisal', 'Tobacco', 'Tea', 'Horticulture', 'Pyrethrum', 'Cotton'],
  banking:        ['NMB', 'CRDB', 'NBC', 'KCB', 'Standard Chartered', 'Equity', 'Absa', 'Exim'],
  visa:           ['Class A', 'Class B', 'Class C', 'Residence Permit', 'Work Permit', 'eVisa', 'Multiple Entry'],
  mining:         ['Gold', 'Tanzanite', 'Diamonds', 'Rare Earths', 'Nickel', 'Coal', 'Gemstones', 'Copper'],
  tourism:        ['Serengeti', 'Kilimanjaro', 'Zanzibar', 'Ngorongoro', 'Tarangire', 'Selous', 'Ruaha', 'Pemba'],
  healthcare:     ['Muhimbili', 'KCMC', 'Bugando', 'AKUH', 'Aga Khan', 'NIMR', 'AMREF', 'TMDA'],
  infrastructure: ['TANESCO', 'REA', 'TAZARA', 'SGR', 'DART', 'JNIA', 'KIA', 'ATCL'],
  wildlife:       ['Serengeti', 'Ngorongoro', 'Selous', 'Tarangire', 'Ruaha', 'Mikumi', 'Gombe', 'Mahale'],
  corporate:      ['TIC', 'BRELA', 'EPZA', 'TRA', 'CMSA', 'DSE', 'TIRA', 'EWURA'],
  housing:        ['NHC', 'TPF', 'CCM', 'Kariakoo', 'Masaki', 'Mikocheni', 'Oyster Bay', 'Kigamboni'],
  transport:      ['TAZARA', 'SGR', 'AZMS', 'ATCL', 'TANROADS', 'TPF', 'Fastjet', 'Coastal Aviation'],
  culture:        ['Swahili', 'Maasai', 'Chagga', 'Sukuma', 'Hadzabe', 'Makonde', 'Zaramo', 'Hehe'],
  food:           ['Ugali', 'Pilau', 'Nyama Choma', 'Mishkaki', 'Zanzibar Pizza', 'Ndizi', 'Samaki', 'Vitumbua'],
  technology:     ['Fintech', 'Silicon Zanzibar', 'TCRA', 'E-Commerce', 'Buni Hub', 'Startups', 'Coding', 'Innovation'],
};

/**
 * SectorTypewriter — pre-built typewriter cycle for any sector page hero.
 * Drop into a hero banner for kinetic branding.
 */
export function SectorTypewriter({
  sector,
  words,
  className,
  textClassName = 'text-tanzania-400',
  caretClassName = 'text-tanzania-500',
}: Props) {
  const list = words ?? (sector ? SECTOR_WORDS[sector] : ['Tanzania']);
  return (
    <TypeWriter
      words={list}
      className={cn('font-display font-bold tracking-tight', className)}
      cursorClassName={caretClassName}
      typeSpeed={80}
      deleteSpeed={45}
      holdTime={1500}
    />
  );
}

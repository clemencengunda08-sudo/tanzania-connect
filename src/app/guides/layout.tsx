import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sector Intelligence Manuals',
  description:
    '18 curated expert manuals covering business registration, mining, immigration, banking, agriculture, and real estate in Tanzania.',
  alternates: {
    canonical: 'https://www.tanzaniareach.com/guides',
  },
  openGraph: {
    title: 'Sector Intelligence Manuals | Tanzania Reach',
    description:
      'Curated expert manuals covering life, business, and capital in the United Republic of Tanzania.',
    url: 'https://www.tanzaniareach.com/guides',
    type: 'website',
  },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

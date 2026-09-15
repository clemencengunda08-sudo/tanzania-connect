import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { homePageSchema } from "@/lib/schema";
import { HomePageClient } from "@/components/home-page-client";

export const metadata: Metadata = {
  title: {
    absolute: "Tanzania Reach | Expert Portal for Investors & Professionals",
  },
  description: "Your independent digital gateway for navigating life, investment, and business in the United Republic of Tanzania.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <JsonLd data={homePageSchema} />
      <HomePageClient />
    </div>
  );
}

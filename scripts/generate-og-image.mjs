// scripts/generate-og-image.mjs
// Generates static og-image.png from SVG design
// Run: node scripts/generate-og-image.mjs

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");

const OG_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <g opacity="0.04" stroke="white" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105"/><line x1="0" y1="210" x2="1200" y2="210"/><line x1="0" y1="315" x2="1200" y2="315"/><line x1="0" y1="420" x2="1200" y2="420"/><line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="200" y1="0" x2="200" y2="630"/><line x1="400" y1="0" x2="400" y2="630"/><line x1="600" y1="0" x2="600" y2="630"/><line x1="800" y1="0" x2="800" y2="630"/><line x1="1000" y1="0" x2="1000" y2="630"/>
  </g>
  <rect x="72" y="64" width="72" height="72" rx="18" fill="url(#logoGrad)"/>
  <text x="108" y="113" font-family="sans-serif" font-size="28" font-weight="900" fill="white" text-anchor="middle">TR</text>
  <text x="164" y="96" font-family="sans-serif" font-size="22" font-weight="700" fill="white">Tanzania Reach</text>
  <text x="164" y="118" font-family="sans-serif" font-size="13" font-weight="400" fill="#94a3b8" letter-spacing="2">TANZANIAREACH.COM</text>
  <text x="72" y="290" font-family="sans-serif" font-size="62" font-weight="900" fill="white" letter-spacing="-2">Expert Portal for</text>
  <text x="72" y="368" font-family="sans-serif" font-size="62" font-weight="900" fill="url(#brand)" letter-spacing="-2">Investors &amp; Professionals</text>
  <text x="72" y="420" font-family="sans-serif" font-size="20" font-weight="400" fill="#94a3b8">One-stop digital gateway for navigating life, investment &amp; business in Tanzania.</text>
  <rect x="980" y="464" width="148" height="40" rx="10" fill="#3b82f610" stroke="#3b82f630" stroke-width="1"/>
  <circle cx="1002" cy="484" r="5" fill="#22c55e"/>
  <text x="1013" y="489" font-family="sans-serif" font-size="13" fill="#94a3b8">Expert Verified</text>
  <text x="72" y="590" font-family="sans-serif" font-size="14" fill="#475569" letter-spacing="1">tanzaniareach.com</text>
  <rect x="1100" y="570" width="28" height="4" rx="2" fill="#1EB53A"/>
  <rect x="1132" y="570" width="28" height="4" rx="2" fill="#FCD116"/>
  <rect x="1164" y="570" width="28" height="4" rx="2" fill="#00A3DD"/>
</svg>
`;

async function generateOgImage() {
  console.log("\n🇹🇿 Tanzania Reach — OG Image Generator");
  console.log("════════════════════════════════════════\n");
  const outputPath = path.join(PUBLIC, "og-image.png");
  try {
    await sharp(Buffer.from(OG_SVG)).resize(1200, 630).png({ quality: 100, compressionLevel: 9 }).toFile(outputPath);
    console.log("  ✅ og-image.png generated (1200x630)");
    console.log("\n✅ OG Image ready!\n");
  } catch (err) {
    console.error("❌ Failed:", err.message);
    process.exit(1);
  }
}
generateOgImage().catch(console.error);
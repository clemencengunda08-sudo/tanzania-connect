// scripts/generate-favicons.mjs
// Tanzania Reach — Favicon Generator
// Run: node scripts/generate-favicons.mjs
//
// Requirements:
// npm install sharp --save-dev

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SVG_PATH = path.join(ROOT, "public", "favicon.svg");
const PUBLIC = path.join(ROOT, "public");

// All required favicon sizes
const SIZES = [
  {
    file: "favicon-16x16.png",
    size: 16,
    desc: "Browser tab (small)",
  },
  {
    file: "favicon-32x32.png",
    size: 32,
    desc: "Browser tab (standard)",
  },
  {
    file: "favicon-48x48.png",
    size: 48,
    desc: "Windows taskbar",
  },
  {
    file: "apple-touch-icon.png",
    size: 180,
    desc: "iOS home screen",
  },
  {
    file: "android-chrome-192x192.png",
    size: 192,
    desc: "Android home screen",
  },
  {
    file: "android-chrome-512x512.png",
    size: 512,
    desc: "Android splash + PWA",
  },
  {
    file: "og-icon.png",
    size: 256,
    desc: "Open Graph icon",
  },
  {
    file: "mstile-150x150.png",
    size: 150,
    desc: "Windows Metro tile",
  },
];

async function generateFavicons() {
  console.log("\n🇹🇿 Tanzania Reach — Favicon Generator");
  console.log("════════════════════════════════════════\n");

  // Check SVG exists
  if (!fs.existsSync(SVG_PATH)) {
    console.error("❌ favicon.svg not found in /public");
    console.error("   Create it first then run this script");
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(SVG_PATH);
  console.log("✅ SVG source loaded: public/favicon.svg\n");
  console.log("Generating PNG sizes:\n");

  // Generate all PNG sizes
  for (const { file, size, desc } of SIZES) {
    const outputPath = path.join(PUBLIC, file);
    try {
      await sharp(svgBuffer)
        .resize(size, size, {
          fit: "contain",
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .png({
          quality: 100,
          compressionLevel: 9,
          adaptiveFiltering: true,
        })
        .toFile(outputPath);

      console.log(`  ✅ ${file.padEnd(32)} ${size}x${size}  — ${desc}`);
    } catch (err) {
      console.error(`  ❌ Failed: ${file} — ${err.message}`);
    }
  }

  // Generate favicon.ico (32x32)
  try {
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(PUBLIC, "favicon.ico"));
    console.log(
      "  ✅ favicon.ico                    32x32  — Main browser icon"
    );
  } catch (err) {
    console.error(`  ❌ Failed: favicon.ico — ${err.message}`);
  }

  // Summary
  console.log("\n════════════════════════════════════════");
  console.log("🚀 All favicons generated in /public");
  console.log("\nNext steps:");
  console.log("  1. Check /public folder for all PNG files");
  console.log("  2. Run: npm run dev");
  console.log("  3. Check browser tab for favicon");
  console.log(
    "  4. Test PWA: Chrome DevTools → Application → Manifest"
  );
  console.log(
    "  5. Test: https://realfavicongenerator.net/favicon_checker"
  );
  console.log("\n✅ Tanzania Reach favicons ready for launch!\n");
}

generateFavicons().catch((err) => {
  console.error("\n❌ Generator failed:", err);
  process.exit(1);
});
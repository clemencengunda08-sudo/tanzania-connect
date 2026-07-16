"use client";

import { useState } from "react";
import Loader from "@/components/loader";

export default function LoaderDemoPage() {
  const [variant, setVariant] = useState<"overlay" | "inline">("overlay");
  const [show, setShow] = useState(true);
  const [label, setLabel] = useState("Loading wildlife data…");

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0F0822] via-[#1A0F2E] to-[#2D1B4E] p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-4xl font-bold text-[#D4AF37]">
          🔮 Tanzania Connect — Crystal Loader
        </h1>
        <p className="mb-8 text-white/70">
          Brand-aligned (purple + gold) rotating crystal loader, pure CSS / Tailwind, no
          styled-components.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Overlay variant */}
          <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6 backdrop-blur">
            <h2 className="mb-4 text-xl font-semibold text-[#D4AF37]">
              Overlay (full screen)
            </h2>
            <button
              onClick={() => {
                setShow(true);
                setVariant("overlay");
              }}
              className="rounded-lg bg-[#D4AF37] px-4 py-2 font-semibold text-[#0F0822] transition hover:scale-105"
            >
              Show overlay
            </button>
          </div>

          {/* Inline variant */}
          <div className="rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6 backdrop-blur">
            <h2 className="mb-4 text-xl font-semibold text-[#D4AF37]">
              Inline spinner
            </h2>
            <div className="flex items-center justify-center rounded-lg bg-black/30 p-8">
              <Loader
                variant="inline"
                label="Loading parks…"
                size={160}
              />
            </div>
          </div>
        </div>

        {/* Brand info */}
        <div className="mt-10 rounded-2xl border border-[#D4AF37]/20 bg-white/5 p-6 backdrop-blur">
          <h2 className="mb-3 text-xl font-semibold text-[#D4AF37]">Usage</h2>
          <pre className="overflow-x-auto rounded-lg bg-black/50 p-4 text-sm text-[#38BDF8]">
{`import Loader from "@/components/loader";

// Full-screen overlay
{loading && <Loader />}

// Inline spinner with text
<Loader variant="inline" label="Loading parks…" size={160} />`}
          </pre>
        </div>
      </div>

      {/* The actual overlay loader — only shown when toggled */}
      {show && variant === "overlay" && (
        <div onClick={() => setShow(false)} className="fixed inset-0 z-[60]">
          <Loader
            label={label}
            className="cursor-pointer"
          />
        </div>
      )}
    </main>
  );
}

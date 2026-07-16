import { ImageResponse } from "next/og";
import { getSectorMeta } from "@/lib/sector-metadata";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SLUG = "agriculture";

const accent = {
  from: "#16a34a",
  to: "#15803d",
  pill: "rgba(22,163,74,0.15)",
  icon: "🌾",
};

export default function SectorOgImage() {
  const meta = getSectorMeta(SLUG);
  const title = meta?.ogTitle ?? "Agriculture & Agribusiness";
  const description = meta?.ogDescription ?? "Expert guide for agricultural investment in Tanzania.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent.pill} 0%, transparent 70%)`,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "900", color: "white" }}>TR</div>
            <span style={{ fontSize: "18px", fontWeight: "600", color: "rgba(148,163,184,1)" }}>Tanzania Reach</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 20px", borderRadius: "100px", background: accent.pill, border: `1px solid ${accent.from}40` }}>
            <span style={{ fontSize: "20px" }}>{accent.icon}</span>
            <span style={{ color: "white", fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>{SLUG}</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 10, maxWidth: "850px" }}>
          <div style={{ width: "60px", height: "4px", borderRadius: "2px", background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`, display: "flex" }} />
          <div style={{ fontSize: "52px", fontWeight: "900", color: "white", lineHeight: "1.1", letterSpacing: "-1.5px" }}>{title}</div>
          <div style={{ fontSize: "20px", color: "rgba(148,163,184,1)", lineHeight: "1.5", maxWidth: "700px" }}>{description}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", zIndex: 10 }}>
          <span style={{ color: "rgba(100,116,139,1)", fontSize: "15px", letterSpacing: "1px" }}>tanzaniareach.com/{SLUG}</span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "flex" }} />
            <span style={{ color: "rgba(148,163,184,1)", fontSize: "13px" }}>Expert Verified Guide</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

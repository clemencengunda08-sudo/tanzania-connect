import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tanzania Reach — Expert Portal for Investors & Professionals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function RootOgImage() {
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
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-120px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Grid lines background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* TOP SECTION: Logo + Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background:
                "linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "900",
              color: "white",
              letterSpacing: "-1px",
              boxShadow: "0 8px 32px rgba(59,130,246,0.4)",
            }}
          >
            TR
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "white",
                letterSpacing: "-0.5px",
              }}
            >
              Tanzania Reach
            </span>
            <span
              style={{
                fontSize: "13px",
                color: "rgba(148,163,184,1)",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              tanzaniareach.com
            </span>
          </div>
        </div>

        {/* MIDDLE SECTION: Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 10,
            maxWidth: "800px",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              fontWeight: "900",
              color: "white",
              lineHeight: "1.1",
              letterSpacing: "-2px",
            }}
          >
            Expert Portal for
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #3b82f6, #7c3aed)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Investors & Professionals
            </span>
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "rgba(148,163,184,1)",
              lineHeight: "1.5",
              maxWidth: "680px",
            }}
          >
            One-stop digital gateway for navigating life,
            investment, and business in Tanzania.
          </div>
        </div>

        {/* BOTTOM SECTION: Sector pills + Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "nowrap",
            }}
          >
            {[
              "Mining",
              "Agriculture",
              "Tourism",
              "Immigration",
              "Real Estate",
            ].map((sector) => (
              <div
                key={sector}
                style={{
                  padding: "8px 16px",
                  borderRadius: "100px",
                  border: "1px solid rgba(59,130,246,0.3)",
                  background: "rgba(59,130,246,0.08)",
                  color: "rgba(147,197,253,1)",
                  fontSize: "13px",
                  fontWeight: "500",
                  display: "flex",
                }}
              >
                {sector}
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 20px",
              borderRadius: "12px",
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.25)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#22c55e",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "rgba(148,163,184,1)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Expert Verified
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

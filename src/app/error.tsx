"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global error boundary — catches unhandled client exceptions
 * and shows a friendly "we hit a snag" page instead of Vercel's
 * bare "Application Error" screen.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console for debugging — Vercel will pick this up in
    // Runtime Logs if you have them enabled.
    console.error("[Tanzania Reach] Unhandled error:", error);
  }, [error]);

  return (
    <div
      className="min-h-[75vh] flex items-center justify-center p-6 bg-gradient-to-b from-kilimanjaro-950 to-[#0F2540] text-[#E6EDF3]"
    >
      <div
        style={{
          maxWidth: 560,
          textAlign: "center",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "40px 32px",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#D4AF37",
            marginBottom: 16,
          }}
        >
          Tanzania Reach
        </div>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          Something just hiccuped.
        </h1>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "rgba(230,237,243,0.7)",
            margin: "0 0 24px",
          }}
        >
          A client-side error interrupted this page. The rest of the site is
          still live — try again, or head back home.
        </p>
        {error?.digest && (
          <p
            style={{
              fontSize: 11,
              fontFamily: "ui-monospace, monospace",
              color: "rgba(230,237,243,0.4)",
              margin: "0 0 24px",
            }}
          >
            ref: {error.digest}
          </p>
        )}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => reset()}
            style={{
              background:
                "linear-gradient(135deg, #2D1B4E 0%, #D4AF37 100%)",
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

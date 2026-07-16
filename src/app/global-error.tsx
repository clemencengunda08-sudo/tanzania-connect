"use client";

/**
 * global-error.tsx — the LAST-RESORT error boundary.
 * This only fires when the root layout itself fails to render.
 * Replaces Vercel's "Application Error: a client-side exception
 * has occurred" with a branded fallback.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          background: "#0A1A2F",
          color: "#E6EDF3",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          margin: 0,
        }}
      >
        <div
          style={{
            maxWidth: 480,
            textAlign: "center",
            padding: 32,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#D4AF37",
              marginBottom: 16,
            }}
          >
            Tanzania Reach
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 12px" }}>
            We hit a snag.
          </h1>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "rgba(230,237,243,0.7)",
              margin: "0 0 24px",
            }}
          >
            Something broke at the root of the page. Reloading usually fixes
            it.
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
          <button
            onClick={() => reset()}
            style={{
              background: "linear-gradient(135deg, #2D1B4E 0%, #D4AF37 100%)",
              color: "white",
              border: "none",
              borderRadius: 999,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  );
}

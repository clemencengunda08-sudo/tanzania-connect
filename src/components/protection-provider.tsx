'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useProtection } from '@/hooks/use-protection';

/**
 * InvisibleWatermark is SSR-safe as it's just static HTML/CSS.
 */
function InvisibleWatermark() {
  return (
    <>
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        Tanzania Reach — tanzaniareach.com
        © 2024-2026 Tanzania Reach. All rights reserved.
        Unauthorized reproduction or AI training prohibited.
        This UI is protected and property of TZ Reach.
      </span>
      <style>{`
        @media print {
          body::before {
            content: "Tanzania Reach — UNAUTHORIZED COPY — tanzaniareach.com";
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 40px;
            font-weight: 900;
            color: rgba(59, 130, 246, 0.1);
            z-index: 9999;
          }
        }
      `}</style>
    </>
  );
}

export function ProtectionProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Run protection effects only on client
  const { devToolsOpen } = useProtection({
    disableRightClick: true,
    disableDevTools: true,
    enableConsoleWarning: true,
  });

  return (
    <>
      {/* These are rendered on both Server and Client to prevent mismatch */}
      <InvisibleWatermark />

      {/* DevTools warning is client-only and only shows after mount if detected */}
      {mounted && devToolsOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99999,
          background: 'linear-gradient(90deg, #1e40af, #7c3aed)',
          color: 'white', textAlign: 'center', padding: '6px', fontSize: '12px', fontWeight: 600
        }}>
          🔒 Tanzania Reach — Security Monitor Active
        </div>
      )}
      
      {children}
    </>
  );
}

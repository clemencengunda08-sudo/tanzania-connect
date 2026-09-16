'use client';

import React, { useEffect, useState } from 'react';
import { isDesktopBrowser, useProtection } from '@/hooks/use-protection';

/**
 * InvisibleWatermark is SSR-safe as it's just static HTML/CSS.
 */
function InvisibleWatermark() {
  return (
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
  );
}

export function ProtectionProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDesktop(isDesktopBrowser());
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

      {/* DevTools warning — PC only. Mobile browsers false-positive on
          window-metric detection, so the monitor never runs on phones. */}
      {mounted && isDesktop && devToolsOpen && (
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

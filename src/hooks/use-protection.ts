'use client';

import { useEffect, useRef, useState } from 'react';

interface ProtectionConfig {
  disableRightClick?: boolean;
  disableDevTools?: boolean;
  enableConsoleWarning?: boolean;
  enableWatermark?: boolean;
  disableKeyboardShortcuts?: boolean;
}

interface ProtectionState {
  devToolsOpen: boolean;
  copyAttempted: boolean;
  rightClickBlocked: number;
}

/**
 * Desktop-only gate for the protection suite.
 *
 * Mobile browsers (iOS Safari, Android Chrome, Samsung Internet, in-app
 * webviews, standalone PWAs) report unreliable window metrics —
 * outerWidth/outerHeight vs innerWidth/innerHeight shift when the URL bar
 * collapses, the on-screen keyboard opens, or the page zooms — which made
 * the devtools watchdog fire false positives ("Security Monitor Active"
 * banner appearing on iPhones with DevTools closed). Blocking long-press /
 * context menus on phones also breaks native touch UX.
 *
 * Returns true only for real desktop-class browsers.
 */
export function isDesktopBrowser(): boolean {
  if (typeof window === 'undefined') return false;

  const nav = window.navigator as Navigator & {
    userAgentData?: { mobile?: boolean };
    standalone?: boolean;
  };
  const ua = nav.userAgent ?? '';

  // 1) Chromium User-Agent Client Hints — the most reliable signal.
  if (nav.userAgentData && typeof nav.userAgentData.mobile === 'boolean') {
    return !nav.userAgentData.mobile;
  }

  const maxTouchPoints = nav.maxTouchPoints ?? 0;

  // 2) Explicit mobile / tablet UA strings.
  if (/Android|iPhone|iPod|iPad|IEMobile|BlackBerry|Opera Mini|Mobile Safari/i.test(ua)) {
    return false;
  }

  // 3) iPadOS 13+ masquerades as desktop Safari ("Macintosh") — catch it via touch.
  if (/Macintosh/i.test(ua) && maxTouchPoints > 1) {
    return false;
  }

  // 4) Installed PWA (standalone display mode) — common on phones.
  const standalone =
    window.matchMedia?.('(display-mode: standalone)')?.matches || nav.standalone === true;
  if (standalone) {
    return false;
  }

  // 5) Touch-first devices (coarse primary pointer, no hover) count as mobile.
  const coarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false;
  const noHover = window.matchMedia?.('(hover: none)')?.matches ?? false;
  if (coarsePointer && noHover && maxTouchPoints > 0) {
    return false;
  }

  return true;
}

export function useProtection(config: ProtectionConfig = {}): ProtectionState {
  const {
    disableRightClick = true,
    disableDevTools = true,
    enableConsoleWarning = true,
    enableWatermark = true,
    disableKeyboardShortcuts = true,
  } = config;

  const [state, setState] = useState<ProtectionState>({
    devToolsOpen: false,
    copyAttempted: false,
    rightClickBlocked: 0,
  });

  const devToolsCheckRef = useRef<ReturnType<typeof setInterval>>(null);
  const warningShownRef = useRef(false);
  const positiveChecksRef = useRef(0);
  const devToolsOpenRef = useRef(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) return;

    // 📱 PC-ONLY: the entire protection suite is skipped on phones and
    // tablets. Mobile browsers shift innerWidth/innerHeight when the URL
    // bar collapses or the keyboard opens, which made the devtools
    // watchdog raise false "DevTools detected" positives on iPhones.
    // Blocking long-press/context menus also breaks native touch UX.
    if (!isDesktopBrowser()) return;

    if (enableConsoleWarning && !warningShownRef.current) {
      warningShownRef.current = true;
      console.clear();
      console.log(
        '%c⛔ STOP!',
        'color: #ef4444; font-size: 48px; font-weight: 900; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);'
      );
      console.log(
        '%cThis is Tanzania Reach — a private platform.',
        'color: #f8fafc; font-size: 16px; font-weight: 600; background: #0f172a; padding: 8px 16px; border-radius: 4px;'
      );
      console.log(
        '%c🔒 Unauthorized copying of UI, code, or design is tracked and prohibited.',
        'color: #94a3b8; font-size: 13px; padding: 4px 8px;'
      );

      const noise = ["© 2024 Tanzania Reach", "tanzaniareach.com", "IP Protected"];
      noise.forEach(msg => console.log(`%c${msg}`, 'color: transparent; font-size: 1px;'));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!disableKeyboardShortcuts) return;
      const blocked = [
        e.key === 'F12',
        (e.ctrlKey || e.metaKey) && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase()),
        (e.ctrlKey || e.metaKey) && ['U', 'S', 'P'].includes(e.key.toUpperCase()),
      ];
      if (blocked.some(Boolean)) {
        e.preventDefault();
        e.stopPropagation();
        setState(prev => ({ ...prev, copyAttempted: true }));
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (!disableRightClick) return;
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      e.preventDefault();
      setState(prev => ({ ...prev, rightClickBlocked: prev.rightClickBlocked + 1 }));
    };

    const detectDevTools = () => {
      if (!disableDevTools) return;
      const threshold = 160;
      // Hardened against browser quirks that fake size deltas:
      // - fullscreen pages/media report stretched inner sizes
      // - some webviews / kiosk modes report outerWidth/outerHeight as 0
      const inFullscreen = Boolean(document.fullscreenElement);
      const zeroMetrics = window.outerWidth === 0 || window.outerHeight === 0;
      const sizeDelta =
        window.outerWidth - window.innerWidth > threshold ||
        window.outerHeight - window.innerHeight > threshold;
      const isOpen = !inFullscreen && !zeroMetrics && sizeDelta;

      // Require two consecutive positive checks (~2s) — window chrome
      // animations and zoom changes can briefly fake a delta in some
      // browsers.
      positiveChecksRef.current = isOpen ? positiveChecksRef.current + 1 : 0;
      const confirmed = positiveChecksRef.current >= 2;
      if (confirmed === devToolsOpenRef.current) return;
      devToolsOpenRef.current = confirmed;
      if (confirmed) {
        console.clear();
        console.log('%c🔍 DevTools detected', 'color: #ef4444; font-size: 20px;');
      }
      setState(prev =>
        prev.devToolsOpen === confirmed ? prev : { ...prev, devToolsOpen: confirmed }
      );
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('contextmenu', handleContextMenu);
    devToolsCheckRef.current = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('contextmenu', handleContextMenu);
      if (devToolsCheckRef.current) clearInterval(devToolsCheckRef.current);
      positiveChecksRef.current = 0;
      devToolsOpenRef.current = false;
    };
  }, [disableRightClick, disableDevTools, enableConsoleWarning, enableWatermark, disableKeyboardShortcuts]);

  return state;
}

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

  const devToolsCheckRef = useRef<NodeJS.Timeout>(null);
  const warningShownRef = useRef(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) return;

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
      const isOpen = (window.outerWidth - window.innerWidth > threshold) || (window.outerHeight - window.innerHeight > threshold);
      if (isOpen) {
        setState(prev => {
          if (!prev.devToolsOpen) {
            console.clear();
            console.log('%c🔍 DevTools detected', 'color: #ef4444; font-size: 20px;');
          }
          return { ...prev, devToolsOpen: true };
        });
      } else {
        setState(prev => ({ ...prev, devToolsOpen: false }));
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('contextmenu', handleContextMenu);
    devToolsCheckRef.current = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('contextmenu', handleContextMenu);
      if (devToolsCheckRef.current) clearInterval(devToolsCheckRef.current);
    };
  }, [disableRightClick, disableDevTools, enableConsoleWarning, enableWatermark, disableKeyboardShortcuts]);

  return state;
}

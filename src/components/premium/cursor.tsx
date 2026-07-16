'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom magnetic cursor — Audenic-inspired.
 * - Hidden on touch devices
 * - Inner dot (8px) follows mouse precisely
 * - Outer ring (40px) follows with spring lag
 * - On hover over [data-cursor] elements, expands + changes color
 * - Uses Tanzania blue (#006FCF) with optional gold accent on hover
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.6 });

  useEffect(() => {
    // Detect touch device
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor], input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      }
    };
    const onHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-cursor], input, textarea, select, [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onHoverStart, true);
    document.addEventListener('mouseout', onHoverEnd, true);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onHoverStart, true);
      document.removeEventListener('mouseout', onHoverEnd, true);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer ring (springy) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : 40,
            height: isHovering ? 56 : 40,
            backgroundColor: isHovering
              ? 'rgba(212, 175, 55, 0.15)' // gold tint
              : 'rgba(0, 111, 207, 0.10)', // tanzania blue tint
            borderColor: isHovering ? 'rgba(212, 175, 55, 0.6)' : 'rgba(0, 111, 207, 0.5)',
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          className="rounded-full border-2 backdrop-blur-sm"
          style={{
            opacity: isVisible ? 1 : 0,
          }}
        />
      </motion.div>

      {/* Inner dot (precise) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 8,
            height: isHovering ? 6 : 8,
            backgroundColor: isHovering ? '#D4AF37' : '#006FCF', // gold or tanzania blue
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="rounded-full"
          style={{
            boxShadow: isHovering
              ? '0 0 12px rgba(212, 175, 55, 0.6)'
              : '0 0 8px rgba(0, 111, 207, 0.5)',
            opacity: isVisible ? 1 : 0,
          }}
        />
      </motion.div>
    </>
  );
}

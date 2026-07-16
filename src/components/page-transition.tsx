"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

import type { Variants } from "framer-motion";

// framer-motion v12+ requires `as const` for cubic-bezier tuples
// so TypeScript treats them as a 4-tuple, not number[].
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE_OUT_EXPO,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: EASE_OUT_EXPO,
    },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function PageLoadingBar() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.6 },
      }}
      exit={{
        scaleX: 1,
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      className="fixed top-0 left-0 right-0 h-[3px] gradient-tanzania z-[200] origin-left shadow-lg shadow-primary/50"
    />
  );
}

"use client";

import { motion } from "framer-motion";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const dotSizeMap = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4",
  xl: "w-5 h-5",
};

export function Spinner({ size = "md", className = "" }: SpinnerProps) {
  const containerSize = sizeMap[size];
  const dotSize = dotSizeMap[size];

  return (
    <div className={`relative inline-block ${containerSize} ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className={`absolute ${dotSize} rounded-full gradient-tanzania`}
          style={{
            top: i === 0 ? 0 : i === 2 ? "auto" : "50%",
            bottom: i === 2 ? 0 : "auto",
            left: i === 3 ? 0 : i === 1 ? "auto" : "50%",
            right: i === 1 ? 0 : "auto",
            transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-20 h-20 rounded-3xl gradient-tanzania flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-primary/30"
        >
          TR
        </motion.div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Initialising Portal</span>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function InlineLoader() {
  return (
    <div className="inline-flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className="w-1.5 h-1.5 rounded-full bg-current"
        />
      ))}
    </div>
  );
}

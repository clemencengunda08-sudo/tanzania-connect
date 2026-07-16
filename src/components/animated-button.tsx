"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  type?: "button" | "submit";
}

const variants = {
  primary: "gradient-tanzania text-white hover:shadow-xl hover:shadow-primary/40",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10",
  ghost: "bg-transparent text-foreground hover:bg-muted",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  icon,
  iconPosition = "right",
  loading = false,
  type = "button",
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2",
        "rounded-xl font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      </span>

      {loading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
        />
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className="inline-flex">{icon}</span>
      )}

      {!loading && <span className="relative">{children}</span>}

      {!loading && icon && iconPosition === "right" && (
        <motion.span
          className="inline-flex"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  );
}

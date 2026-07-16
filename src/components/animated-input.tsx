"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "tel" | "url";
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function AnimatedInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  error,
  icon,
  className,
}: AnimatedInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFloating = focused || value.length > 0;

  return (
    <div className={cn("relative", className)}>
      <div className={cn(
        "relative rounded-xl border-2 transition-all",
        focused 
          ? "border-primary shadow-lg shadow-primary/10" 
          : "border-border",
        error && "border-destructive"
      )}>
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </span>
        )}

        <motion.label
          animate={{
            y: isFloating ? -10 : 12,
            scale: isFloating ? 0.85 : 1,
            x: isFloating ? -2 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className={cn(
            "absolute left-3 origin-left pointer-events-none",
            "px-1 bg-background",
            isFloating
              ? "text-primary font-medium text-xs"
              : "text-muted-foreground text-base",
            icon && !isFloating && "left-10"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </motion.label>

        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={cn(
            "w-full px-3 py-3 bg-transparent focus:outline-none text-foreground",
            icon && "pl-10"
          )}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-destructive flex items-center gap-1"
        >
          <span>⚠️</span>
          {error}
        </motion.p>
      )}
    </div>
  );
}

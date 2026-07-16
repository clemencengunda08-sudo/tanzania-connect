"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  useTypewriter,
  useInView,
  useCounter,
  useSingleTyping,
} from "@/hooks/use-typing";

interface TypewriterProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
}

export function Typewriter({
  texts,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2500,
  className = "",
  cursorClassName = "",
  showCursor = true,
}: TypewriterProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { text } = useTypewriter({
    texts,
    typeSpeed,
    deleteSpeed,
    pauseTime,
  });

  if (!mounted) {
    return <span className={`inline-flex items-center whitespace-nowrap ${className}`}>{texts[0]}</span>;
  }

  return (
    <span className={`inline-flex items-center whitespace-nowrap ${className}`}>
      <span className="truncate">{text}</span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`inline-block w-[2px] md:w-[3px] ml-1 bg-current rounded-full shrink-0 ${cursorClassName}`}
          style={{ height: "1em" }}
        />
      )}
    </span>
  );
}

interface SingleTypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
}

export function SingleTypewriter({
  text,
  speed = 50,
  startDelay = 0,
  className = "",
  cursorClassName = "",
  showCursor = true,
}: SingleTypewriterProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const { displayText, isComplete } = useSingleTyping({
    text,
    speed,
    startDelay,
    enabled: true,
  });

  if (!mounted) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {displayText}
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={`inline-block w-[3px] ml-1 bg-current shrink-0 ${cursorClassName}`}
          style={{ height: "0.85em", verticalAlign: "middle" }}
        />
      )}
    </span>
  );
}

interface LetterRevealProps {
  text: string;
  className?: string;
  staggerDelay?: number;
  immediate?: boolean;
}

export function LetterReveal({ text, className = "", staggerDelay = 0.03, immediate = false }: LetterRevealProps) {
  const letters = text.split("");
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <span className={className}>{text}</span>;

  const shouldShow = immediate || inView;

  return (
    <span ref={ref as any} className={`inline-block ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: i * staggerDelay, ease: "easeOut" }}
          className="inline-block"
          style={{ display: letter === " " ? "inline" : "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function AnimatedCounter({ end, suffix = "", duration = 2000 }: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const count = useCounter({ end, duration, enabled: inView });
  // `useCounter` returns 0 when not enabled. To avoid a stuck "0" if inView
  // never fires (headless browsers, IntersectionObserver edge cases, layout
  // issues), fall back to the final value whenever the animation hasn't
  // produced a non-zero value yet.
  const display = count > 0 ? count : end;

  return (
    <span ref={ref as any}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

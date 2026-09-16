"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterOptions {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  startDelay?: number;
}

interface SingleTypingOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
}

interface CounterOptions {
  end: number;
  duration?: number;
  enabled?: boolean;
}

export function useTypewriter({
  texts,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
  loop = true,
  startDelay = 500,
}: TypewriterOptions) {
  const [text, setText] = useState(texts[0] || "");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started || texts.length === 0) return;

    const currentText = texts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentText) {
      if (loop || textIndex < texts.length - 1) {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (loop ? (prev + 1) % texts.length : prev + 1));
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentText.slice(0, prev.length + 1)
        );
      }, isDeleting ? deleteSpeed : typeSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, textIndex, isDeleting, started, texts, typeSpeed, deleteSpeed, pauseTime, loop]);

  return { text, isTyping: !isDeleting && started, isDeleting };
}

export function useSingleTyping({
  text,
  speed = 50,
  startDelay = 0,
  enabled = true,
}: SingleTypingOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayText("");
      setIsComplete(false);
      return;
    }

    let currentIndex = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay, enabled]);

  return { displayText, isComplete };
}

export function useCounter({
  end,
  duration = 2000,
  enabled = true,
}: CounterOptions): number {
  const [count, setCount] = useState(end);

  useEffect(() => {
    if (!enabled) {
      // If disabled (not yet in view), show the end value immediately rather
      // than 0, so the UI never gets stuck displaying zero if inView never
      // fires (e.g. headless browser, IntersectionObserver unsupported,
      // observer disconnected, etc.).
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(startValue + (end - startValue) * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, enabled]);

  return count;
}

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
): {
  ref: React.RefObject<T | null>;
  inView: boolean;
} {
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
        ...options,
      }
    );

    observer.observe(ref.current);

    // Safety fallback: in headless/limited browsers, IntersectionObserver can
    // fail silently. After 1.5s, if inView is still false, fire it manually
    // so counters/animations never get stuck at 0.
    const fallback = window.setTimeout(() => {
      setInView((current) => current || true);
    }, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [options]);

  return { ref, inView };
}

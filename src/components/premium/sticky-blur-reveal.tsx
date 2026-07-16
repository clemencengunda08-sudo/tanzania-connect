"use client";

import { useRef, useEffect, useState } from "react";

interface FontStyle {
  fontFamily?: string;
  fontWeight?: string | number;
}

interface StickyBlurRevealProps {
  text?: string;
  color?: string;
  font?: FontStyle;
  fontSize?: number;
  lineHeight?: number;
  fullRevealDistance?: number;
  initialBlur?: number;
  initialOpacity?: number;
  letterSpacing?: number;
}

export function StickyBlurReveal({
  text = "This text unblurs and fades in word by word as you scroll",
  color = "currentColor",
  font,
  fontSize = 24,
  lineHeight = 1.5,
  fullRevealDistance = 1000,
  initialBlur = 3,
  initialOpacity = 0.1,
  letterSpacing = 0,
}: StickyBlurRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = (text || "").split(" ");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let startPosition = 0;
    let endPosition = 0;
    let containerHeight = 0;

    const handleScroll = () => {
      if (!isVisible) return;
      const currentScroll = window.scrollY;
      const elementTop = startPosition - currentScroll;
      const visibleHeight = window.innerHeight - elementTop;
      const progress = (visibleHeight - containerHeight) / (fullRevealDistance - containerHeight);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const rect = entry.boundingClientRect;
          startPosition = window.scrollY + rect.top;
          containerHeight = rect.height;
          endPosition = startPosition + fullRevealDistance;
          handleScroll();
        } else {
          setIsVisible(false);
        }
      },
      { threshold: [0] }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [fullRevealDistance, isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        color: color,
        fontFamily: font?.fontFamily,
        fontWeight: font?.fontWeight,
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
        opacity: isVisible ? 1 : 0,
        letterSpacing: `${letterSpacing}px`,
        textAlign: "center",
        boxSizing: "border-box",
        padding: 0,
        margin: 0,
      }}
    >
      {words.map((word, index) => {
        const wordProgress = (scrollProgress - index / words.length) * words.length;
        const progress = Math.max(0, Math.min(1, wordProgress));
        const blurAmount = initialBlur * (1 - progress);
        const opacity = initialOpacity + (1 - initialOpacity) * progress;

        return (
          <span
            key={index}
            style={{
              display: "inline-block",
              marginRight: "0.25em",
              filter: `blur(${blurAmount}px)`,
              opacity: opacity,
              transition: "filter 0.2s ease-out, opacity 0.2s ease-out",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

export default StickyBlurReveal;

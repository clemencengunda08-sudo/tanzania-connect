'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SlideData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  imageUrl: string;
}

const slides: SlideData[] = [
  {
    title: 'Venetian Dusk',
    subtitle: 'Autumn / Winter Collection',
    description:
      'Where ancient architecture meets the dying light — a palette drawn from terracotta, aged stone, and the shimmering canals of Venice at twilight.',
    accent: '#C4956A',
    imageUrl:
      'https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Nordic Silence',
    subtitle: 'Spring / Summer Collection',
    description:
      'Inspired by the vast stillness of Scandinavian fjords — clean lines, muted tones, and the quiet power of unadorned beauty.',
    accent: '#8BA7B8',
    imageUrl:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Kyoto Garden',
    subtitle: 'Resort Collection',
    description:
      'Moss-covered pathways and paper lanterns — an ode to the meditative elegance of Japanese garden design and its timeless restraint.',
    accent: '#7A9E7E',
    imageUrl:
      'https://images.unsplash.com/photo-1528164344705-47542687000d?w=900&h=1200&fit=crop&q=80',
  },
  {
    title: 'Saharan Gold',
    subtitle: 'Capsule Collection',
    description:
      'The desert reveals its secrets at dawn — liquid gold spilling across endless dunes, textures carved by centuries of wind and time.',
    accent: '#D4A955',
    imageUrl:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&h=1200&fit=crop&q=80',
  },
];

export function ElegantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number, dir?: 'next' | 'prev') => {
      if (isTransitioning || index === currentIndex) return;
      setDirection(dir || (index > currentIndex ? 'next' : 'prev'));
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex, 'next');
  }, [currentIndex, goToSlide]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(prevIndex, 'prev');
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 100 / (SLIDE_DURATION / 50);
      });
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="carousel-wrapper w-full bg-kilimanjaro-950/20 dark:bg-kilimanjaro-950/50 backdrop-blur-md rounded-[2.5rem] border border-border/40 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background accent wash */}
      <div
        className="carousel-bg-wash absolute inset-0 pointer-events-none z-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, ${currentSlide.accent}18 0%, transparent 70%)`,
        }}
      />

      <div className="carousel-inner relative z-10 flex flex-col-reverse md:flex-row w-full h-full min-h-[550px]">
        {/* Left: Text Content */}
        <div className="carousel-content flex-1 flex items-center p-8 md:p-16 z-20">
          <div className="carousel-content-inner max-w-[480px] flex flex-col">
            {/* Collection number */}
            <div
              className={`carousel-collection-num flex items-center gap-3 mb-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
            >
              <span className="carousel-num-line w-8 h-[2px] bg-tanzania-500/50" />
              <span className="carousel-num-text font-mono text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`carousel-title font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-2 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p
              className={`carousel-subtitle font-mono text-xs font-bold uppercase tracking-wider mb-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
              style={{ color: currentSlide.accent }}
            >
              {currentSlide.subtitle}
            </p>

            {/* Description */}
            <p
              className={`carousel-description text-sm text-white/70 leading-relaxed mb-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-70 translate-y-0'}`}
            >
              {currentSlide.description}
            </p>

            {/* Navigation Arrows */}
            <div className="carousel-nav-arrows flex gap-3">
              <button
                onClick={goPrev}
                className="carousel-arrow-btn w-11 h-11 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/80 hover:text-white bg-black/10 hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goNext}
                className="carousel-arrow-btn w-11 h-11 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/80 hover:text-white bg-black/10 hover:bg-white/5 active:scale-95 transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="carousel-image-container flex-1 relative p-8 md:p-16 flex items-center justify-center bg-black/10">
          <div
            className={`carousel-image-frame relative w-full max-w-[320px] h-[400px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95 -rotate-1' : 'opacity-100 scale-100 rotate-0'}`}
          >
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.title}
              className="carousel-image w-full h-full object-cover transition-transform duration-10000 ease-out hover:scale-105"
            />
            <div
              className="carousel-image-overlay absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${currentSlide.accent}22 0%, transparent 50%)`,
              }}
            />
          </div>

          {/* Decorative frame corners */}
          <div className="carousel-frame-corner carousel-frame-corner--tl absolute top-10 left-10 w-6 h-6 border-t-2 border-l-2 rounded-tl-xl transition-colors duration-1000 pointer-events-none" style={{ borderColor: currentSlide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br absolute bottom-10 right-10 w-6 h-6 border-b-2 border-r-2 rounded-br-xl transition-colors duration-1000 pointer-events-none" style={{ borderColor: currentSlide.accent }} />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="carousel-progress-bar flex w-full border-t border-white/5 bg-black/10">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item flex-1 flex flex-col items-start p-4 md:p-6 text-left border-r border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track w-full h-[2px] bg-white/10 mb-2 overflow-hidden rounded-full">
              <div
                className="carousel-progress-fill h-full w-0 transition-all duration-75 ease-linear"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                  backgroundColor: index === currentIndex ? currentSlide.accent : undefined,
                }}
              />
            </div>
            <span className={`carousel-progress-label text-[10px] md:text-xs font-bold uppercase transition-all duration-300 ${index === currentIndex ? 'text-white opacity-100' : 'text-white/40 opacity-40'}`}>{slide.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default ElegantCarousel;

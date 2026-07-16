import { cn } from '@/lib/utils';

type Props = {
  text: string;
  className?: string;
  delay?: number;
  step?: number;          // seconds per char
  duration?: number;      // blur-to-clear seconds
  startOnView?: boolean;
  triggerOnce?: boolean;
  by?: 'character' | 'word';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
};

/**
 * BlurText — each character (or word) starts blurred+down, snaps into focus.
 * Reuses Audenic's signature entrance: iOS-grade typography motion.
 */
export function BlurText({
  text,
  className,
  delay = 0,
  step = 0.04,
  duration = 0.7,
  startOnView = true,
  triggerOnce = true,
  by = 'character',
  as: As = 'h2',
}: Props) {
  const tokens = by === 'word' ? text.split(' ') : Array.from(text);
  return (
    <As className={cn('inline-block overflow-visible', className)}>
      {tokens.map((tok, i) => (
        <span
          key={i}
          aria-hidden={by === 'word' ? 'true' : undefined}
          className="inline-block"
          style={{
            opacity: 0,
            transform: 'translateY(0.35em)',
            filter: 'blur(8px)',
            animation: `blur-reveal ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * step}s forwards`,
            animationFillMode: 'both',
            whiteSpace: 'pre',
          }}
        >
          {by === 'word' ? `${tok} ` : tok}
        </span>
      ))}
      <style jsx>{`
        @keyframes blur-reveal {
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </As>
  );
}

import { cn } from '@/lib/utils';

type Item = { label: string; value?: string };

type Props = {
  items: Item[];
  separator?: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
};

export function Marquee({
  items,
  separator = '✦',
  className,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
}: Props) {
  const content = (
    <div
      className={cn(
        'flex shrink-0 justify-around gap-[4rem] min-w-full will-change-transform',
        reverse ? 'animate-marquee-rev' : 'animate-marquee',
        pauseOnHover && 'group-hover:[animation-play-state:paused]'
      )}
      style={{ animationDuration: `${speed}s` }}
    >
      {items.map((it, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-6 shrink-0"
        >
          <span className="text-current font-display">
            {it.label}
          </span>
          {it.value && (
            <span className="text-tanzania-500 font-display italic font-normal">
              {it.value}
            </span>
          )}
          <span className="text-tanzania-500/70 text-base">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        'overflow-hidden flex w-full select-none relative group mask-fade-x',
        className
      )}
    >
      {content}
      {content}
    </div>
  );
}

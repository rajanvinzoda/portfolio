import React, { useEffect, useRef } from 'react';

interface MarqueeProps {
  items: string[];
  outline?: boolean;
  reverse?: boolean;
  scrollVel?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  outline = false,
  reverse = false,
  scrollVel = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const xPosRef = useRef<number>(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId: number;

    const loop = () => {
      const dir = reverse ? 1 : -1;
      const speed = reduce ? 0.5 : 1.2 + Math.abs(scrollVel) * 0.35;
      xPosRef.current += dir * speed;

      const singleWidth = el.scrollWidth / 4;
      if (singleWidth > 0) {
        if (xPosRef.current <= -singleWidth) {
          xPosRef.current += singleWidth;
        } else if (xPosRef.current >= 0) {
          xPosRef.current -= singleWidth;
        }
      }

      const skew = reduce ? 0 : Math.max(-10, Math.min(10, scrollVel * -0.2));
      el.style.transform = `translateX(${xPosRef.current.toFixed(1)}px) skewX(${skew.toFixed(1)}deg)`;

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(rafId);
  }, [reverse, scrollVel]);

  // Repeat items for seamless infinite marquee loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap py-4 sm:py-6 relative z-10 select-none pointer-events-none" aria-hidden="true">
      <div
        ref={containerRef}
        className={`inline-flex gap-8 sm:gap-12 text-[clamp(28px,5vw,72px)] font-extrabold tracking-[-0.04em] will-change-transform ${
          outline
            ? 'text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.4)]'
            : 'text-[#f5f3ff]'
        }`}
      >
        {repeatedItems.map((item, idx) => (
          <span key={idx} className="inline-flex items-center gap-8 sm:gap-12">
            <span>{item}</span>
            <i className={`not-italic inline-block animate-[spin2_6s_linear_infinite] ${
              outline ? 'text-[#22d3ee] [-webkit-text-stroke:0]' : 'text-[#ff4d8d]'
            }`}>
              ✦
            </i>
          </span>
        ))}
      </div>
    </div>
  );
};

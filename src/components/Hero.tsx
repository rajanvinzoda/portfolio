import React, { useEffect, useRef } from 'react';
import { OrbCanvas } from './OrbCanvas.tsx';

interface HeroProps {
  headline: string;
  sub: string;
  scrollVel: number;
  hue: number;
  githubUser: string;
}

export const Hero: React.FC<HeroProps> = ({ headline, sub, scrollVel, hue, githubUser }) => {
  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    if (!h1) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let chars = h1.querySelectorAll<HTMLSpanElement>('.c');
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rafId: number;

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener('pointermove', onPointerMove);

    let t0 = performance.now();
    const updateWave = (now: number) => {
      const t = (now - t0) / 1000;
      const r = h1.getBoundingClientRect();

      if (r.bottom >= 0 && r.top <= window.innerHeight) {
        chars.forEach((c, i) => {
          const b = c.getBoundingClientRect();
          const dx = mx - (b.left + b.width / 2);
          const dy = my - (b.top + b.height / 2);
          const dist = Math.hypot(dx, dy);
          const k = Math.max(0, 1 - dist / 180);

          if (k > 0.002) {
            c.style.transform = `translateY(${(-k * 22).toFixed(1)}px) scale(${(1 + k * 0.32).toFixed(3)}) rotate(${(dx * -0.02 * k).toFixed(1)}deg)`;
            c.style.color = `hsl(${(i * 24 + t * 90) % 360} 95% ${(100 - k * 35).toFixed(0)}%)`;
          } else {
            c.style.transform = '';
            c.style.color = '';
          }
        });
      }

      rafId = requestAnimationFrame(updateWave);
    };

    rafId = requestAnimationFrame(updateWave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [headline]);

  const words = headline.split(' ');

  return (
    <div id="top" className="relative min-h-[92svh] md:min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-12 pt-24 pb-16 overflow-hidden">
      {/* 3D Mathematical Orb */}
      <OrbCanvas scrollVel={scrollVel} hue={hue} />

      {/* Main kinetic typography layout */}
      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-xs font-semibold text-[#22d3ee] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-pulse" />
          <span>Available for Full-Stack & Android Engineering Roles</span>
        </div>

        <h1
          ref={h1Ref}
          className="relative m-0 text-[clamp(40px,7.8vw,108px)] leading-[0.98] tracking-[-0.045em] font-extrabold text-[#f5f3ff] max-w-[13em] select-none"
        >
          {words.map((word, wIdx) => (
            <span key={wIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4">
              {Array.from(word).map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="c inline-block transition-[transform,color] duration-150 ease-out will-change-transform"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="relative max-w-[34em] mt-7 text-[#a7a3c0] text-[clamp(16px,1.5vw,20px)] leading-relaxed font-normal">
          {sub}
        </p>

        {/* Action quick links */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <a
            href="#work"
            className="rip px-5 py-2.5 rounded-full text-sm font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite] hover:scale-105 active:scale-95 transition-transform"
          >
            Explore Projects ↓
          </a>
          <a
            href={`https://github.com/${githubUser}`}
            target="_blank"
            rel="noreferrer"
            className="rip px-4 py-2.5 rounded-full text-sm font-semibold text-[#f5f3ff] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.12)] transition-transform hover:-translate-y-0.5"
          >
            GitHub Profile ↗
          </a>
          <a
            href="https://www.linkedin.com/in/rajan-maheshwari-6372582a7"
            target="_blank"
            rel="noreferrer"
            className="rip px-4 py-2.5 rounded-full text-sm font-semibold text-[#a7a3c0] hover:text-[#f5f3ff] transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="#contact"
            className="rip px-4 py-2.5 rounded-full text-sm font-semibold text-[#a7a3c0] hover:text-[#f5f3ff] transition-colors"
          >
            Contact details
          </a>
        </div>
      </div>

      {/* Interactive hints */}
      <div className="hidden sm:block absolute left-4 sm:left-8 md:left-12 bottom-[calc(26px+env(safe-area-inset-bottom,0px))] text-xs text-[#a7a3c0]/80">
        Move your cursor across text. Click anywhere for sparks. Explore projects and interactive tools below.
      </div>

      {/* Bobbing scroll indicator */}
      <a
        href="#work"
        className="absolute right-4 sm:right-8 md:right-12 bottom-[calc(26px+env(safe-area-inset-bottom,0px))] w-[22px] h-[36px] border-[1.5px] border-[#a7a3c0]/60 rounded-xl flex justify-center pt-2 hover:border-[#22d3ee] transition-colors"
        aria-label="Scroll to work"
      >
        <span className="w-1 h-2 rounded-full bg-[#22d3ee] animate-[bob_1.4s_ease-in-out_infinite]" />
      </a>
    </div>
  );
};

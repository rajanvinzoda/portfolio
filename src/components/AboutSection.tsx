import React, { useEffect, useRef, useState } from 'react';

interface AboutSectionProps {
  aboutText: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ aboutText }) => {
  const containerRef = useRef<HTMLParagraphElement | null>(null);
  const [litCount, setLitCount] = useState<number>(0);
  const words = aboutText.split(' ');

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.55 + rect.height * 0.5)));
      setLitCount(Math.round(p * words.length));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length]);

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-12 z-20">
      {/* Section Title */}
      <div className="mb-10 sm:mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-[#ff4d8d] mb-2 block">
          Perspective & Craft
        </span>
        <h2 className="text-[clamp(36px,7vw,92px)] font-extrabold tracking-[-0.045em] leading-none bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] [-webkit-background-clip:text] bg-clip-text text-transparent animate-[flow_7s_linear_infinite]">
          About
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Kinetic word-by-word reveal on left */}
        <div className="lg:col-span-8">
          <p
            ref={containerRef}
            className="m-0 text-[clamp(26px,4vw,52px)] leading-[1.16] tracking-[-0.035em] font-semibold max-w-[22em]"
          >
            {words.map((word, i) => {
              const isLit = i < litCount;
              const hue = (i * 14 + 190) % 360;
              return (
                <span
                  key={i}
                  style={
                    {
                      '--wc': `hsl(${hue} 95% 68%)`,
                    } as React.CSSProperties
                  }
                  className={`inline-block mr-2.5 transition-[opacity,color,transform] duration-300 hover:-translate-y-1.5 hover:-rotate-3 cursor-default ${
                    isLit ? 'opacity-100 text-[var(--wc)]' : 'opacity-20 text-[#f5f3ff]'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* Quick Profile Summary Card on right */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#110f1c] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.22)] transition-all shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden group">
            {/* Colorful top accent glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite]" />

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-14 h-14 rounded-2xl p-[2px] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite] shrink-0 overflow-hidden shadow-lg flex items-center justify-center">
                <div className="w-full h-full bg-[#110f1c] rounded-2xl flex items-center justify-center font-extrabold text-base bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3))] bg-clip-text text-transparent">
                  RM
                </div>
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#f5f3ff]">Rajan Maheshwari</h3>
                <p className="text-xs text-[#22d3ee] font-mono">Full-Stack & Android Developer</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-[#a7a3c0] pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between">
                <span>Location</span>
                <span className="text-[#f5f3ff] font-medium">India · Remote Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span>GitHub</span>
                <a
                  href="https://github.com/rajanvinzoda"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#22d3ee] hover:underline font-mono"
                >
                  @rajanvinzoda
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>LinkedIn</span>
                <a
                  href="https://www.linkedin.com/in/rajan-maheshwari-6372582a7"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#f5f3ff] hover:text-[#22d3ee] transition-colors"
                >
                  Rajan Maheshwari ↗
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Primary Focus</span>
                <span className="text-[#a3e635] font-semibold">Android, React & AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

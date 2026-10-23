import React, { useEffect, useRef, useState } from 'react';
import { Milestone, SkillCategory, SkillItem } from '../data/portfolioData.ts';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
  milestones: Milestone[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skillCategories,
  milestones,
}) => {
  const [animated, setAnimated] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const normalizeSkill = (item: SkillItem | string): SkillItem => {
    if (typeof item === 'string') {
      return { name: item, level: 8, description: '' };
    }
    return item;
  };

  const getCategoryColor = (idx: number): {
    accent: string;
    gradient: string;
    border: string;
    glow: string;
  } => {
    switch (idx % 3) {
      case 0:
        return {
          accent: '#22d3ee',
          gradient: 'linear-gradient(90deg, #22d3ee, #7c5cff)',
          border: 'rgba(34, 211, 238, 0.3)',
          glow: 'rgba(34, 211, 238, 0.15)',
        };
      case 1:
        return {
          accent: '#ff4d8d',
          gradient: 'linear-gradient(90deg, #ff4d8d, #ffb02e)',
          border: 'rgba(255, 77, 141, 0.3)',
          glow: 'rgba(255, 77, 141, 0.15)',
        };
      case 2:
      default:
        return {
          accent: '#a3e635',
          gradient: 'linear-gradient(90deg, #a3e635, #22d3ee)',
          border: 'rgba(163, 230, 53, 0.3)',
          glow: 'rgba(163, 230, 53, 0.15)',
        };
    }
  };

  const getProficiencyLabel = (level: number): string => {
    if (level >= 9) return 'Expert';
    if (level >= 8) return 'Advanced';
    if (level >= 7) return 'Proficient';
    return 'Intermediate';
  };

  return (
    <section id="stack" ref={sectionRef} className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-12 z-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a3e635] mb-2 block">
            Tools, Technologies & Proficiency
          </span>
          <h2 className="text-[clamp(36px,7vw,92px)] font-extrabold tracking-[-0.045em] leading-none bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] [-webkit-background-clip:text] bg-clip-text text-transparent animate-[flow_7s_linear_infinite]">
            Tech Stack & Journey
          </h2>
        </div>

        {/* Technologies count badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-[#a7a3c0] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)]">
            Categorized Technologies
          </span>
        </div>
      </div>

      {/* Feature 3: Interactive System Architecture & Data Flow */}
      <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#110f1c]/95 to-[#0c0a16]/98 border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#22d3ee] mb-1 block">
              System Architecture Visualizer
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Production Clean Architecture & Data Flow
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#a7a3c0] px-3 py-1 rounded-full bg-white/5 border border-white/10 self-start sm:self-auto">
            Unidirectional Data Flow (UDF)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-[#22d3ee]/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white group-hover:text-[#22d3ee] transition-colors">UI & Presentation</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#22d3ee]/20 text-[#22d3ee]">Declarative</span>
              </div>
              <p className="text-xs text-[#a7a3c0] leading-relaxed mb-3">
                Jetpack Compose & React 19 state hoisting with 120fps recomposition isolation.
              </p>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono text-white/70">
              <span className="px-1.5 py-0.5 rounded bg-white/5">Compose</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">React 19</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">Canvas</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-[#7c5cff]/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white group-hover:text-[#7c5cff] transition-colors">Reactive StateFlow</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#7c5cff]/20 text-[#7c5cff]">UDF</span>
              </div>
              <p className="text-xs text-[#a7a3c0] leading-relaxed mb-3">
                Immutable ViewModels exposing StateFlow streams across Coroutine dispatchers.
              </p>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono text-white/70">
              <span className="px-1.5 py-0.5 rounded bg-white/5">StateFlow</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">Coroutines</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">Hooks</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-[#ff4d8d]/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white group-hover:text-[#ff4d8d] transition-colors">Domain & Repo</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#ff4d8d]/20 text-[#ff4d8d]">SSOT</span>
              </div>
              <p className="text-xs text-[#a7a3c0] leading-relaxed mb-3">
                Single Source of Truth mediating network and cache with offline-first policy.
              </p>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono text-white/70">
              <span className="px-1.5 py-0.5 rounded bg-white/5">Repository</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">Offline-1st</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">UseCases</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.025] border border-white/10 hover:border-[#a3e635]/60 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">Data & Cloud</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#a3e635]/20 text-[#a3e635]">Persistence</span>
              </div>
              <p className="text-xs text-[#a7a3c0] leading-relaxed mb-3">
                SQLite Room database, Retrofit/Ktor HTTP clients, and Firebase real-time sync.
              </p>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px] font-mono text-white/70">
              <span className="px-1.5 py-0.5 rounded bg-white/5">Room DB</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">Ktor</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5">Firebase</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Skills Categories */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-[#f5f3ff]">
              Technical Proficiencies
            </h3>
            <span className="text-xs font-mono text-[#a7a3c0]">
              Frameworks & Architectures
            </span>
          </div>

          <div className="space-y-6">
            {skillCategories.map((cat, catIdx) => {
              const theme = getCategoryColor(catIdx);
              return (
                <div
                  key={catIdx}
                  className="p-5 sm:p-6 rounded-3xl bg-[#110f1c] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.22)] transition-all shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)]"
                >
                  {/* Category Title */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[rgba(255,255,255,0.06)]">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }}
                      />
                      <h4 className="font-extrabold text-base sm:text-lg text-[#f5f3ff]">
                        {cat.name}
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-[#a7a3c0]">
                      {cat.items.length} proficiencies
                    </span>
                  </div>

                  {/* Clean Skill Cards Grid (No graphs) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cat.items.map((rawItem, sIdx) => {
                      const item = normalizeSkill(rawItem);
                      return (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-2xl bg-[rgba(255,255,255,0.025)] border border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] transition-all group flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-bold text-xs sm:text-sm text-[#f5f3ff] group-hover:text-[#22d3ee] transition-colors">
                              {item.name}
                            </span>
                            <span
                              className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border"
                              style={{
                                borderColor: `${theme.accent}40`,
                                color: theme.accent,
                              }}
                            >
                              {getProficiencyLabel(item.level)}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-[11px] text-[#a7a3c0] leading-relaxed m-0 group-hover:text-white/85 transition-colors">
                              {item.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Philosophy Note */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[rgba(17,15,28,0.7)] border border-[rgba(255,255,255,0.1)] backdrop-blur-sm">
            <h4 className="text-xs font-bold text-[#22d3ee] uppercase tracking-wider mb-2">
              Proficiency Benchmark & Architecture
            </h4>
            <p className="text-xs sm:text-sm text-[#a7a3c0] leading-relaxed">
              Ratings reflect real-world shipping experience across production apps, high-concurrency systems, and responsive native UI. Tested against sub-100ms feedback latency budgets, state resilience, and unit test coverage.
            </p>
          </div>
        </div>

        {/* Right Column: Career & Academic Milestones */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#f5f3ff]">
            Career & Academic Milestones
          </h3>

          <div className="relative pl-6 space-y-7 border-l border-[rgba(255,255,255,0.15)]">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing Node Dot */}
                <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#110f1c] border-2 border-[#ff4d8d] group-hover:scale-125 group-hover:border-[#22d3ee] transition-all" />

                <span className="text-xs font-mono font-bold text-[#22d3ee]">
                  {milestone.year}
                </span>
                <h4 className="text-base font-bold text-[#f5f3ff] mt-0.5">
                  {milestone.role}
                </h4>
                <p className="text-xs font-semibold text-[#ffb02e] mb-1.5">
                  {milestone.org}
                </p>
                <p className="text-xs text-[#a7a3c0] leading-relaxed">
                  {milestone.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Core Strengths summary card */}
          <div className="p-5 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)]">
            <h4 className="text-xs font-bold text-[#ffb02e] uppercase tracking-wider mb-3">
              Full-Stack & Android Specialization
            </h4>
            <div className="space-y-2 text-xs text-[#a7a3c0]">
              <div className="flex items-center justify-between">
                <span>Native Android & Kotlin SDK</span>
                <span className="font-mono text-[#f5f3ff] font-bold">9.2 / 10</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Modern React & TypeScript SPAs</span>
                <span className="font-mono text-[#f5f3ff] font-bold">9.0 / 10</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Real-Time WebSockets & Firebase</span>
                <span className="font-mono text-[#f5f3ff] font-bold">8.8 / 10</span>
              </div>
              <div className="flex items-center justify-between">
                <span>UI Micro-interactions & Canvas 2D</span>
                <span className="font-mono text-[#f5f3ff] font-bold">8.7 / 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

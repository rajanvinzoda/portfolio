import React, { useEffect, useRef, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Project, StatItem } from '../data/portfolioData.ts';
import { GitHubRepoViewer } from './GitHubRepoViewer.tsx';

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: (i % 3) * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

interface ProjectsSectionProps {
  stats: StatItem[];
  projects: Project[];
  githubUser: string;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  stats,
  projects,
  githubUser,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showGitHubLive, setShowGitHubLive] = useState<boolean>(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [animatedStats, setAnimatedStats] = useState<boolean>(false);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Stats counter animation on intersect
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimatedStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    card.style.setProperty('--mx', `${x * 100}%`);
    card.style.setProperty('--my', `${y * 100}%`);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      card.style.transform = `perspective(900px) rotateY(${((x - 0.5) * 12).toFixed(2)}deg) rotateX(${((0.5 - y) * 12).toFixed(2)}deg) translateY(-6px) scale(1.02)`;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = '';
  };

  return (
    <section id="work" className="relative py-16 sm:py-24 px-4 sm:px-8 md:px-12 z-20">
      {/* Section Title */}
      <div className="mb-10 sm:mb-14">
        <span className="text-xs font-bold uppercase tracking-widest text-[#22d3ee] mb-2 block">
          Featured Engineering & Code
        </span>
        <h2 className="text-[clamp(36px,7vw,92px)] font-extrabold tracking-[-0.045em] leading-none bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] [-webkit-background-clip:text] bg-clip-text text-transparent animate-[flow_7s_linear_infinite]">
          Selected work
        </h2>
      </div>

      {/* Numbers / Stats Grid */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 pb-8 border-b border-[rgba(255,255,255,0.08)]"
      >
        {stats.map((stat, i) => (
          <div key={i} className="group relative">
            <b className="block text-[clamp(40px,6vw,80px)] font-extrabold tracking-[-0.05em] leading-none bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] [-webkit-background-clip:text] bg-clip-text text-transparent animate-[flow_6s_linear_infinite]">
              {animatedStats ? stat.n : 0}
              {stat.s}
            </b>
            <span className="text-sm font-medium text-[#a7a3c0] mt-1 block">
              {stat.l}
            </span>
            <div
              className={`h-[3px] mt-3 rounded-full bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] transition-transform duration-1000 origin-left ease-out ${
                animatedStats ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Filter and Live GitHub Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rip px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] text-[#0a0814] shadow-md'
                  : 'text-[#a7a3c0] hover:text-[#f5f3ff]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Live GitHub Repo Explorer Toggle */}
        <button
          onClick={() => setShowGitHubLive(!showGitHubLive)}
          className={`rip inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
            showGitHubLive
              ? 'bg-[#7c5cff]/20 border-[#7c5cff] text-[#22d3ee]'
              : 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.1)] text-[#a7a3c0] hover:text-[#f5f3ff]'
          }`}
        >
          <span>{showGitHubLive ? '▲ Hide Live GitHub Repos' : '▼ View Live GitHub Repos'}</span>
        </button>
      </div>

      {/* GitHub Live Repos Viewer Accordion */}
      {showGitHubLive && <GitHubRepoViewer username={githubUser} />}

      {/* Projects 3D Cards Grid with Scroll-Triggered Entrance Animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mt-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id || idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardVariants}
            className="h-full"
          >
            <div
              data-cursor="View"
              onClick={() => onSelectProject(project)}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={
                {
                  '--c1': project.c[0],
                  '--c2': project.c[1],
                  '--c3': project.c[2],
                } as React.CSSProperties
              }
              className="card-glow group relative flex flex-col min-h-[440px] h-full rounded-[28px] bg-[#110f1c] border border-[rgba(255,255,255,0.12)] cursor-pointer overflow-hidden transition-[transform,box-shadow] duration-250 ease-out will-change-transform hover:shadow-[0_20px_50px_-15px_rgba(124,92,255,0.25)]"
            >
              {/* Header Art visual canvas */}
              <div
                className="relative h-[200px] overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.c[0]}, ${project.c[1]})`,
                }}
              >
                <i
                  className="art-shape-1 absolute opacity-80"
                  style={{ background: project.c[2] }}
                />
                <i
                  className="art-shape-2 absolute opacity-90"
                  style={{ background: project.c[1] }}
                />
                <i
                  className="art-shape-3 absolute bg-white opacity-35"
                />

                {/* Card Number Index */}
                <span className="absolute right-5 top-3 z-10 font-extrabold text-4xl sm:text-5xl text-white/85 tracking-[-0.04em] select-none">
                  0{idx + 1}
                </span>

                {/* Category pill */}
                <div className="absolute left-5 bottom-4 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold text-white/90 uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.035em] text-[#f5f3ff] group-hover:text-[#22d3ee] transition-colors mb-2">
                    {project.t}
                  </h3>
                  <p className="text-sm text-[#a7a3c0] leading-relaxed line-clamp-3">
                    {project.d}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs px-2.5 py-0.5 rounded-full border border-[rgba(255,255,255,0.12)] text-[#a7a3c0] group-hover:border-[var(--c1)] group-hover:text-[#f5f3ff] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Card footer CTA */}
                  <div className="flex items-center justify-between mt-5 pt-3 text-xs font-semibold text-[#a7a3c0]">
                    <span className="group-hover:text-[#22d3ee] flex items-center gap-1 transition-colors">
                      <span>View Case Study</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-white underline text-[11px]"
                        title="View code on GitHub"
                      >
                        GitHub Repo ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

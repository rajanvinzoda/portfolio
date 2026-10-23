import React, { useEffect, useRef, useState } from 'react';
import { INITIAL_PORTFOLIO_DATA, PortfolioData, Project } from './data/portfolioData.ts';
import { ParticleFX } from './components/ParticleFX.tsx';
import { Navigation } from './components/Navigation.tsx';
import { Hero } from './components/Hero.tsx';
import { Marquee } from './components/Marquee.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { ResumeModal } from './components/ResumeModal.tsx';
import { SkillsSection } from './components/SkillsSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { LiveEditDrawer } from './components/LiveEditDrawer.tsx';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('pf-rajan-portfolio-v2');
      if (saved) {
        return { ...INITIAL_PORTFOLIO_DATA, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback to initial
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [scrollVel, setScrollVel] = useState<number>(0);
  const [hue, setHue] = useState<number>(0);

  const lastScrollY = useRef<number>(0);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Sync to localStorage
  const handleDataChange = (updated: PortfolioData) => {
    setData(updated);
    try {
      localStorage.setItem('pf-rajan-portfolio-v2', JSON.stringify(updated));
    } catch {
      // Ignore quota errors
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Sync title
  useEffect(() => {
    document.title = `${data.name} · Developer Portfolio`;
  }, [data.name]);

  // Initial loader
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 200 : 900;
    const start = performance.now();

    const frame = () => {
      const now = performance.now();
      const p = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      setLoadingProgress(Math.round(ease * 100));

      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => setIsLoaded(true), 150);
      }
    };

    requestAnimationFrame(frame);
  }, []);

  // Scroll listener for progress bar, velocity, and hue
  useEffect(() => {
    let vel = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - vh;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${docHeight > 0 ? y / docHeight : 0})`;
      }

      const dy = y - lastScrollY.current;
      lastScrollY.current = y;
      vel += (dy - vel) * 0.15;
      setScrollVel(vel);
      setHue((y * 0.12) % 360);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="custom-cursor-area relative min-h-screen bg-[#07060d] text-[#f5f3ff] overflow-x-hidden selection:bg-[#ff4d8d] selection:text-white">
      {/* Intro Loader */}
      {!isLoaded && (
        <div
          id="ld"
          className="fixed inset-0 z-90 bg-[#07060d] flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          <div className="text-[clamp(80px,20vw,200px)] font-extrabold tracking-[-0.06em] leading-none bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] [-webkit-background-clip:text] bg-clip-text text-transparent animate-[flow_3s_linear_infinite]">
            {loadingProgress}
          </div>
          <div className="absolute left-0 bottom-0 h-1.5 w-full bg-[rgba(255,255,255,0.06)]">
            <div
              className="h-full bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] transition-all duration-75"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Top Scroll Progress Bar */}
      <div ref={progressBarRef} id="bar" />

      {/* Ambient background glowing orbs */}
      <div className="bg-ambient" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      {/* Particle Sparks Canvas & Custom Cursor */}
      <ParticleFX hue={hue} />

      {/* Top Navigation */}
      <Navigation
        name={data.name}
        onOpenEdit={() => setIsEditOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('contact');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero
          headline={data.headline}
          sub={data.sub}
          scrollVel={scrollVel}
          hue={hue}
          githubUser={data.githubUser}
        />

        {/* Marquee 1 (Hollow Stroke) */}
        <Marquee
          items={data.skills}
          outline
          reverse={false}
          scrollVel={scrollVel}
        />

        {/* Selected Work */}
        <ProjectsSection
          stats={data.stats}
          projects={data.projects}
          githubUser={data.githubUser}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Marquee 2 (Vibrant solid) */}
        <Marquee
          items={data.skills}
          outline={false}
          reverse
          scrollVel={scrollVel}
        />

        {/* Tech Stack Matrix & Journey */}
        <SkillsSection
          skillCategories={data.skillCategories}
          milestones={data.milestones}
        />

        {/* About Section with kinetic word highlight */}
        <AboutSection aboutText={data.about} />

        {/* Contact Section */}
        <ContactSection
          email={data.email}
          links={data.links}
          portfolioData={data}
          onShowToast={showToast}
        />
      </main>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 1-Page Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        data={data}
      />

      {/* Floating Edit Details Button */}
      <button
        onClick={() => setIsEditOpen(!isEditOpen)}
        className="rip fixed right-4 sm:right-6 bottom-[calc(24px+env(safe-area-inset-bottom,0px))] z-40 px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite] shadow-[0_10px_30px_-5px_rgba(124,92,255,0.4)] hover:scale-105 active:scale-95 transition-transform"
        aria-label="Edit portfolio details"
      >
        ✎ Edit details
      </button>

      {/* Live Customizer Drawer */}
      <LiveEditDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={data}
        onChange={handleDataChange}
        onShowToast={showToast}
      />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="toast-msg">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

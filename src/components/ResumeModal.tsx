import React, { useEffect } from 'react';
import { PortfolioData } from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, data }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = async () => {
    const md = `# ${data.name} - Developer Resume
Email: ${data.email} | GitHub: https://github.com/${data.githubUser} | LinkedIn: https://www.linkedin.com/in/rajan-maheshwari-6372582a7

## Summary
${data.about}

## Core Competencies
- Languages: Kotlin, TypeScript, Java, JavaScript, SQL, HTML5 / Canvas 2D
- Mobile: Android SDK, Jetpack Compose, Coroutines, StateFlow, Room DB, ExoPlayer / Media3
- Frontend: React 19, Next.js, Tailwind CSS, Vite
- Backend & Cloud: Firebase, Node.js, Express, REST APIs, WebSockets

## Featured Engineering Projects
- AI Study Planner: Reduced schedule generation latency from 1.8s to 120ms with local heuristic algorithms; boosted student task completion by 34%.
- CampusConnect: Real-time messaging with <50ms socket latency; reduced cold-start time by 42% via Baseline Profiles; supported 1,200+ concurrent sessions.
- VibeFlow: Zero-lag ExoPlayer audio engine with 60fps dynamic FFT visualizer and 38% memory optimization.
- JARVIS: Automated 12+ daily developer CLI tasks, slashing terminal command setup by 65%.

## Education
Bachelor of Technology in Computer Science & Engineering (2021 – 2025)`;

    try {
      await navigator.clipboard.writeText(md);
      alert('Resume Markdown copied to clipboard!');
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-[pn-in_0.3s_cubic-bezier(0.22,1,0.36,1)] print:p-0 print:bg-white print:static"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#110f1c] border border-[rgba(255,255,255,0.15)] shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col text-[#18181b] print:border-none print:shadow-none print:max-h-none print:w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Action Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-[#161326] border-b border-white/10 text-white print:hidden">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base tracking-tight">{data.name} — Executive Resume</span>
            <span className="text-[11px] font-mono text-[#22d3ee] px-2 py-0.5 rounded-full bg-[#22d3ee]/10 border border-[#22d3ee]/30">
              1-Page Formatted
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="rip px-3.5 py-1.5 rounded-full text-xs font-bold bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] text-[#0a0814]"
            >
              🖨️ Print / Save PDF
            </button>
            <button
              onClick={handleCopyMarkdown}
              className="rip px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15"
            >
              📋 Copy Markdown
            </button>
            <button
              onClick={onClose}
              className="rip w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-xs ml-2"
              aria-label="Close resume"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Paper Container */}
        <div className="p-6 sm:p-10 bg-white font-sans text-xs sm:text-[13px] leading-relaxed print:p-0">
          {/* Header */}
          <div className="border-b border-slate-200 pb-4 mb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 m-0">
              {data.name}
            </h1>
            <div className="text-xs sm:text-sm font-bold text-[#6366f1] mt-1">
              Full-Stack & Native Android Software Engineer
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-600 text-xs mt-2 font-medium">
              <span>📍 Open to Relocation & Remote</span>
              <span>•</span>
              <a href={`mailto:${data.email}`} className="text-slate-900 underline">{data.email}</a>
              <span>•</span>
              <a href={`https://github.com/${data.githubUser}`} target="_blank" rel="noreferrer" className="text-slate-900 underline">github.com/{data.githubUser}</a>
              <span>•</span>
              <a href="https://www.linkedin.com/in/rajan-maheshwari-6372582a7" target="_blank" rel="noreferrer" className="text-slate-900 underline">linkedin.com/in/rajan-maheshwari</a>
            </div>
          </div>

          {/* Summary */}
          <section className="mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 border-b border-slate-200 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-slate-700 m-0">
              {data.about} Specialized in high-concurrency real-time systems, 60-120fps motion fluidity, sub-second latency optimization, and offline-first reactive state architectures across Kotlin and TypeScript.
            </p>
          </section>

          {/* Competencies */}
          <section className="mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 border-b border-slate-200 pb-1 mb-2">
              Technical Core Competencies
            </h2>
            <div className="space-y-1 text-slate-700">
              <div><strong className="text-slate-900">Languages:</strong> Kotlin, TypeScript, Java, JavaScript (ESNext), SQL, HTML5 / Canvas 2D</div>
              <div><strong className="text-slate-900">Mobile & Android:</strong> Android SDK, Jetpack Compose, Coroutines & StateFlow, Room DB, ExoPlayer / Media3, Material 3, Baseline Profiles</div>
              <div><strong className="text-slate-900">Web & Frontend:</strong> React 19, Next.js, Tailwind CSS, Vite, Web Workers, Web Audio API, Responsive Motion</div>
              <div><strong className="text-slate-900">Backend & Cloud:</strong> Firebase Suite (Firestore, Auth, Storage), Node.js, Express, REST APIs, WebSockets, Git CI/CD</div>
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-4">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 border-b border-slate-200 pb-1 mb-2">
              Key Engineering Projects & Quantified Impact
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-bold text-slate-900 text-sm">AI Study Planner — Automated Productivity Suite</h3>
                  <span className="text-[11px] font-mono text-slate-500">TypeScript, React 19, Tailwind, Web Workers</span>
                </div>
                <ul className="list-disc pl-4 mt-1 text-slate-700 space-y-0.5">
                  <li>Reduced schedule generation latency from <strong>1.8s to 120ms</strong> with local heuristic bin-packing.</li>
                  <li>Boosted student study completion by <strong>34% across 450+ recorded sessions</strong> with persistent streak tracking.</li>
                  <li>Delivered <strong>60fps smooth calendar matrix rendering</strong> with zero jank on mobile viewports.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-bold text-slate-900 text-sm">CampusConnect — Real-Time University Mobile Ecosystem</h3>
                  <span className="text-[11px] font-mono text-slate-500">Kotlin, Jetpack Compose, Firebase, Room DB</span>
                </div>
                <ul className="list-disc pl-4 mt-1 text-slate-700 space-y-0.5">
                  <li>Built real-time messaging pipeline with <strong>&lt;50ms socket latency</strong> and offline-first Room synchronization.</li>
                  <li>Decreased cold-start launch time by <strong>42%</strong> using modular lazy loading and Baseline Profiles.</li>
                  <li>Scaled broadcast listeners supporting <strong>1,200+ concurrent student sessions</strong>.</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-baseline flex-wrap gap-1">
                  <h3 className="font-bold text-slate-900 text-sm">VibeFlow Music Player — Low-Latency Native Audio Engine</h3>
                  <span className="text-[11px] font-mono text-slate-500">Kotlin, ExoPlayer / Media3, Fast Fourier Transform (FFT)</span>
                </div>
                <ul className="list-disc pl-4 mt-1 text-slate-700 space-y-0.5">
                  <li>Zero-lag ExoPlayer audio engine paired with a <strong>60fps dynamic FFT visualizer</strong>.</li>
                  <li>Optimized native memory footprint by <strong>38%</strong> utilizing Glide memory caching and bitmap recycling.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-sky-700 border-b border-slate-200 pb-1 mb-2">
              Education
            </h2>
            <div className="flex justify-between items-baseline flex-wrap gap-1">
              <div>
                <h3 className="font-bold text-slate-900">Bachelor of Technology in Computer Science & Engineering</h3>
                <p className="text-slate-600 m-0 text-xs">Focus on Distributed Systems, Mobile Architecture, and Human-Computer Interaction</p>
              </div>
              <span className="text-[11px] font-mono text-slate-500">2021 – 2025</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

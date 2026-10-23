import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-[pn-in_0.3s_cubic-bezier(0.22,1,0.36,1)]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#110f1c] border border-[rgba(255,255,255,0.15)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-6 sm:p-8 text-[#f5f3ff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="rip absolute right-5 top-5 w-10 h-10 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.15)] text-[#f5f3ff] transition-colors"
          aria-label="Close project modal"
        >
          ✕
        </button>

        {/* Header Art banner */}
        <div
          className="relative h-44 sm:h-52 rounded-2xl overflow-hidden mb-6 flex items-end p-6"
          style={{
            background: `linear-gradient(135deg, ${project.c[0]}, ${project.c[1]})`,
          }}
        >
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-wider font-bold text-white/80">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              {project.t}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#a7a3c0] text-base sm:text-lg leading-relaxed mb-6">
          {project.d}
        </p>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#22d3ee] mb-3">
              Engineering & Architecture Highlights
            </h3>
            <ul className="space-y-2 text-sm text-[#f5f3ff]/90">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#ff4d8d] font-bold text-base leading-none mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#a7a3c0] mb-2.5">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] text-[#f5f3ff]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.1)]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rip inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite] hover:scale-105 transition-transform"
            >
              <span>View Code on GitHub</span>
              <span>↗</span>
            </a>
          )}
          {project.href && project.href !== '#' && project.href !== project.githubUrl && (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="rip inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-[#f5f3ff] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.16)] border border-[rgba(255,255,255,0.12)] transition-colors"
            >
              <span>Live Demonstration</span>
              <span>↗</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="rip ml-auto px-4 py-2 text-sm text-[#a7a3c0] hover:text-[#f5f3ff]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

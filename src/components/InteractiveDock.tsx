import React, { useState } from 'react';
import { PortfolioData } from '../data/portfolioData.ts';
import { AnimatedDock, DockItemData } from '@/components/ui/animated-dock';
import { Github, Linkedin, Mail, FolderGit2, Code2, Sparkles, MessageCircleQuestion } from 'lucide-react';

interface InteractiveDockProps {
  portfolioData: PortfolioData;
}

type DockState = 'dock' | 'search' | 'think' | 'answer';

export const InteractiveDock: React.FC<InteractiveDockProps> = ({ portfolioData }) => {
  const [query, setQuery] = useState<string>('');
  const [dockState, setDockState] = useState<DockState>('dock');
  const [answerText, setAnswerText] = useState<string>('');

  const quickPrompts = [
    { label: 'Work', q: 'Tell me about your projects' },
    { label: 'Stack', q: 'What is your tech stack?' },
    { label: 'GitHub', q: 'What is your GitHub?' },
    { label: 'Contact', q: 'How can I contact you?' },
  ];

  const getAnswer = (q: string): string => {
    const s = q.toLowerCase();
    const projectNames = portfolioData.projects.map((p) => p.t).join(', ');

    if (/work|project|built|made|portfolio|app|system|simulation/.test(s)) {
      return `Rajan has engineered ${projectNames}. Scroll to the Selected work section for live demos and code repositories.`;
    }
    if (/skill|stack|tech|know|language|framework|tool/.test(s)) {
      return `Rajan works with ${portfolioData.skills.join(', ')}. Specialized in Kotlin, Android SDK, TypeScript, React, and real-time backend systems.`;
    }
    if (/github|repo|code|git/.test(s)) {
      return `You can find Rajan's public repositories at github.com/${portfolioData.githubUser}. Check the "View Live GitHub Repos" button in the projects section!`;
    }
    if (/contact|hire|email|reach|mail|connect|message/.test(s)) {
      return `Reach out via email at ${portfolioData.email}. You can also connect on LinkedIn or click the giant email handle at the bottom to copy it directly!`;
    }
    if (/experience|years|background|study|student|degree|education/.test(s)) {
      return `${portfolioData.milestones[0]?.desc || 'Rajan is a full-stack and Android developer building high-performance applications.'}`;
    }
    return portfolioData.answers.default || `I'm ${portfolioData.name}'s interactive assistant. Ask me about projects, skills, or how to get in touch.`;
  };

  const submitQuery = (textToSubmit: string) => {
    if (!textToSubmit.trim() || dockState === 'think') return;

    setDockState('think');
    const answer = getAnswer(textToSubmit);

    if ((window as any).__spawnParticles) {
      (window as any).__spawnParticles(window.innerWidth / 2, window.innerHeight - 80, 20, 3, true);
    }

    setTimeout(() => {
      setAnswerText(answer);
      setDockState('answer');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitQuery(query);
  };

  const handleClose = () => {
    setDockState('dock');
    setQuery('');
    setAnswerText('');
  };

  // Dock items using Rajan's real details & navigation targets
  const dockItems: DockItemData[] = [
    {
      link: `https://github.com/${portfolioData.githubUser}`,
      target: '_blank',
      Icon: <Github size={20} className="hover:text-[#22d3ee] transition-colors" />,
    },
    {
      link: 'https://www.linkedin.com/in/rajan-maheshwari-6372582a7',
      target: '_blank',
      Icon: <Linkedin size={20} className="hover:text-[#7c5cff] transition-colors" />,
    },
    {
      link: '#work',
      Icon: <FolderGit2 size={20} className="hover:text-[#ff4d8d] transition-colors" />,
    },
    {
      link: '#stack',
      Icon: <Code2 size={20} className="hover:text-[#ffb02e] transition-colors" />,
    },
    {
      link: `mailto:${portfolioData.email}`,
      Icon: <Mail size={20} className="hover:text-[#a3e635] transition-colors" />,
    },
    {
      link: '#',
      Icon: <Sparkles size={20} className="text-[#22d3ee] animate-pulse" />,
      onClick: (e) => {
        e.preventDefault();
        setDockState('search');
      },
    },
  ];

  return (
    <div className="fixed left-1/2 bottom-[calc(20px+env(safe-area-inset-bottom,0px))] -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
      {/* If in Search / Answer mode, show prompt chips */}
      {dockState === 'search' && (
        <div className="flex items-center gap-1.5 mb-2 pointer-events-auto animate-[pn-in_0.3s_ease-out]">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(p.q);
                submitQuery(p.q);
              }}
              className="rip px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgba(17,15,28,0.85)] hover:bg-[rgba(30,26,48,0.95)] border border-[rgba(255,255,255,0.1)] text-[#a7a3c0] hover:text-[#f5f3ff] transition-colors backdrop-blur-md whitespace-nowrap shadow-sm"
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => setDockState('dock')}
            className="rip px-2 py-1 rounded-full text-[11px] font-semibold text-[#a7a3c0] hover:text-white"
            title="Return to dock"
          >
            ✕
          </button>
        </div>
      )}

      {/* Dock View Mode 1: Animated Spring Magnification Dock */}
      {dockState === 'dock' && (
        <div className="pointer-events-auto relative group">
          <AnimatedDock
            items={dockItems}
            className="bg-[#110f1c]/85 border-[rgba(255,255,255,0.12)] backdrop-blur-xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] pb-2.5 h-16"
          />
          {/* Subtle assistant toggle pill */}
          <button
            onClick={() => setDockState('search')}
            className="rip absolute -top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite] shadow-md flex items-center gap-1 hover:scale-105 transition-transform"
          >
            <MessageCircleQuestion size={11} />
            <span>Ask AI</span>
          </button>
        </div>
      )}

      {/* Dock View Mode 2: Search Input / Thinking / Answer container */}
      {dockState !== 'dock' && (
        <div
          className={`relative pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] bg-[rgba(17,15,28,0.94)] border border-[rgba(255,255,255,0.15)] backdrop-blur-xl animate-[breathe_4s_ease-in-out_infinite] overflow-hidden ${
            dockState === 'think'
              ? 'w-14 h-14 rounded-full flex items-center justify-center'
              : dockState === 'answer'
              ? 'w-[min(440px,calc(100vw-32px))] rounded-[26px] p-5 cursor-pointer shadow-2xl'
              : 'w-[min(480px,calc(100vw-32px))] h-14 rounded-full px-4 flex items-center'
          }`}
        >
          {/* Conic Glow Edge */}
          <div
            className="absolute inset-0 rounded-[inherit] p-[2px] pointer-events-none opacity-40 animate-[spin_3s_linear_infinite]"
            style={{
              background: 'conic-gradient(from var(--angle), var(--p4), var(--p1), var(--p2), var(--p3), var(--p4))',
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          />

          {/* State: SEARCH Form */}
          {dockState === 'search' && (
            <form onSubmit={handleSubmit} className="relative z-10 w-full flex items-center gap-2">
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about Rajan's apps, Android, stack..."
                aria-label="Ask about Rajan's work"
                maxLength={120}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[#f5f3ff] placeholder-[#a7a3c0] text-xs sm:text-sm px-2 font-medium"
              />
              <button
                type="submit"
                aria-label="Send query"
                className="rip flex-none w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite] hover:scale-110 active:scale-90 transition-transform"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => setDockState('dock')}
                className="text-xs text-[#a7a3c0] hover:text-white px-1.5"
                title="Back to dock icons"
              >
                ✕
              </button>
            </form>
          )}

          {/* State: THINKING */}
          {dockState === 'think' && (
            <div className="relative z-10 flex items-center gap-1.5" aria-label="Thinking">
              <span className="w-2 h-2 rounded-full bg-[#22d3ee] animate-[dot_1s_infinite]" />
              <span className="w-2 h-2 rounded-full bg-[#ff4d8d] animate-[dot_1s_infinite_0.15s]" />
              <span className="w-2 h-2 rounded-full bg-[#ffb02e] animate-[dot_1s_infinite_0.3s]" />
            </div>
          )}

          {/* State: ANSWER */}
          {dockState === 'answer' && (
            <div onClick={handleClose} className="relative z-10 text-left">
              <div className="flex items-center justify-between gap-2 mb-2 text-xs text-[#a7a3c0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
                  <span className="font-semibold text-white">Answer</span>
                </div>
                <span className="text-[11px] hover:text-white">tap to dismiss ✕</span>
              </div>
              <p className="text-xs sm:text-sm text-[#f5f3ff] leading-relaxed">
                {answerText}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

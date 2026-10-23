import React, { useRef, useState } from 'react';
import { PortfolioData, SocialLink } from '../data/portfolioData.ts';
import { InteractiveDock } from './InteractiveDock.tsx';

interface ContactSectionProps {
  email: string;
  links: SocialLink[];
  portfolioData: PortfolioData;
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  email,
  links,
  portfolioData,
  onShowToast,
}) => {
  const mailRef = useRef<HTMLAnchorElement | null>(null);
  const [showQuickForm, setShowQuickForm] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = mailRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);

    if (dist < 300) {
      el.style.transform = `translate(${dx * 0.12}px, ${dy * 0.18}px)`;
    } else {
      el.style.transform = '';
    }
  };

  const handlePointerLeave = () => {
    if (mailRef.current) {
      mailRef.current.style.transform = '';
    }
  };

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      onShowToast('Email copied to clipboard!');
      if ((window as any).__spawnParticles) {
        (window as any).__spawnParticles(e.clientX, e.clientY, 60, 5, true);
      }
    } catch {
      window.location.href = `mailto:${email}`;
      onShowToast('Opening mail client...');
    }
  };

  const handleSendQuickNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject || 'Project Inquiry / Conversation'
    )}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoUrl;
    onShowToast('Drafting message in your email client...');
    setShowQuickForm(false);
    setMessage('');
    setSubject('');
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-8 md:px-12 text-center pb-44 z-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#a7a3c0] mb-3">
        Let’s connect
      </p>
      <p className="text-base sm:text-lg text-[#a7a3c0] max-w-md mx-auto mb-6">
        Have a project, role, or technical challenge in mind? Click below to copy my email or draft a note.
      </p>

      {/* Giant Magnetic Email Banner */}
      <div className="py-4">
        <a
          ref={mailRef}
          href={`mailto:${email}`}
          onClick={handleCopyEmail}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          data-cursor="Copy"
          className="inline-block text-[clamp(28px,6.5vw,94px)] font-extrabold tracking-[-0.045em] text-[#f5f3ff] hover:text-[#ffb02e] transition-[color,transform] duration-200 break-all select-none group cursor-pointer"
        >
          {Array.from(email).map((ch, idx) => (
            <span
              key={idx}
              className="inline-block transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105"
            >
              {ch}
            </span>
          ))}
        </a>
      </div>

      <div className="text-xs text-[#a7a3c0]/70 mt-2">
        (Click email to instantly copy to clipboard)
      </div>

      {/* Replaced Image 2 with Image 1: The Interactive Spring Dock directly in-page */}
      <InteractiveDock portfolioData={portfolioData} />

      {/* Secondary Quick Action Pills from Image 2 */}
      <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 mt-4">
        <a
          href="#contact"
          className="rip px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-[#f5f3ff] hover:bg-white/12 hover:-translate-y-0.5 transition-all"
        >
          Resume ↗
        </a>
        <button
          onClick={() => setShowQuickForm(!showQuickForm)}
          className="rip px-4 py-2 rounded-full border border-[#7c5cff]/40 bg-[#7c5cff]/15 text-xs font-semibold text-[#22d3ee] hover:bg-[#7c5cff]/30 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          {showQuickForm ? '✕ Close Quick Note' : '✉ Send a Quick Note'}
        </button>
      </div>

      {/* Quick Email Form Drawer */}
      {showQuickForm && (
        <form
          onSubmit={handleSendQuickNote}
          className="mt-8 max-w-lg mx-auto p-6 rounded-3xl bg-[#110f1c] border border-[rgba(255,255,255,0.15)] text-left animate-[pn-in_0.4s_ease-out]"
        >
          <h4 className="text-base font-bold text-[#f5f3ff] mb-1">
            Send a direct note to {email}
          </h4>
          <p className="text-xs text-[#a7a3c0] mb-4">
            This will open your email client pre-populated with your message.
          </p>

          <label className="block text-xs font-semibold text-[#a7a3c0] mb-1">
            Subject
            <input
              type="text"
              placeholder="e.g. Full-Stack Role / Project Collaboration"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-sm focus:border-[#7c5cff] outline-none"
            />
          </label>

          <label className="block text-xs font-semibold text-[#a7a3c0] mt-3 mb-1">
            Message
            <textarea
              rows={4}
              required
              placeholder="Hi Vinzo, I came across your portfolio and wanted to discuss..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full px-3.5 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-sm focus:border-[#7c5cff] outline-none resize-vertical"
            />
          </label>

          <div className="flex items-center justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowQuickForm(false)}
              className="px-4 py-2 text-xs font-semibold text-[#a7a3c0] hover:text-[#f5f3ff]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rip px-5 py-2 rounded-full text-xs font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite]"
            >
              Open in Mail App →
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

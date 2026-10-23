import React, { useEffect, useRef, useState } from 'react';

interface NavigationProps {
  name: string;
  onOpenEdit: () => void;
  onOpenContact: () => void;
  onOpenCommandMenu?: () => void;
  onOpenResume?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ name, onOpenEdit, onOpenContact, onOpenCommandMenu, onOpenResume }) => {
  const [activeSection, setActiveSection] = useState<string>('work');
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const indRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef<number>(0);

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Stack', href: '#stack', id: 'stack' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Scrambler characters
  const CIPHER = '!<>-_\\/[]{}=+*^?#abcdefghijklmnopqrstuvwxyz';

  const moveIndicator = (targetEl: HTMLElement | null) => {
    const ind = indRef.current;
    if (!ind) return;
    if (!targetEl) {
      ind.style.opacity = '0';
      return;
    }
    ind.style.opacity = '1';
    ind.style.width = `${targetEl.offsetWidth}px`;
    ind.style.transform = `translateX(${targetEl.offsetLeft}px)`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const diff = y - lastScrollY.current;

      if (diff > 8 && y > 220) {
        setIsHeaderHidden(true);
      } else if (diff < -8 || y < 120) {
        setIsHeaderHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Intersection observer for active nav
    const sectionIds = ['work', 'stack', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-35% 0px -45% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector<HTMLElement>(`a[href="#${activeSection}"]`);
    moveIndicator(activeLink);
  }, [activeSection]);

  const handleLinkHover = (e: React.PointerEvent<HTMLAnchorElement>, originalText: string) => {
    moveIndicator(e.currentTarget);
    let i = 0;
    const target = e.currentTarget;
    const interval = setInterval(() => {
      target.textContent = originalText
        .split('')
        .map((c, k) => (k < i ? c : CIPHER[Math.floor(Math.random() * CIPHER.length)]))
        .join('');
      if (++i > originalText.length) {
        clearInterval(interval);
        target.textContent = originalText;
      }
    }, 35);

    (target as any).__cipherInterval = interval;
  };

  const handleLinkLeave = (e: React.PointerEvent<HTMLAnchorElement>, originalText: string) => {
    const target = e.currentTarget;
    if ((target as any).__cipherInterval) {
      clearInterval((target as any).__cipherInterval);
    }
    target.textContent = originalText;
    if (navRef.current) {
      const activeLink = navRef.current.querySelector<HTMLElement>(`a[href="#${activeSection}"]`);
      moveIndicator(activeLink);
    }
  };

  return (
    <header
      id="hd"
      className={`fixed left-0 right-0 top-0 z-40 flex items-center justify-between gap-4 md:gap-8 px-4 sm:px-8 md:px-12 pt-[calc(14px+env(safe-area-inset-top,0px))] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isHeaderHidden ? '-translate-y-[130%]' : 'translate-y-0'
      }`}
    >
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#top"
        className="flex items-center gap-2.5 font-extrabold tracking-[-0.03em] text-[17px] md:text-[19px] text-[#f5f3ff] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
      >
        <span
          className="inline-block w-2.5 h-2.5 rounded-full bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_3s_linear_infinite,bob_2s_ease-in-out_infinite] group-hover:scale-125 transition-transform"
          aria-hidden="true"
        />
        <span>{name}</span>
      </a>

      {/* Zone 2: 4 clean single-line nav links with animated pill */}
      <nav
        ref={navRef}
        id="nav"
        className="relative flex items-center p-1 rounded-full bg-[rgba(20,17,36,0.65)] border border-[rgba(255,255,255,0.12)] backdrop-blur-md"
      >
        <span
          ref={indRef}
          id="ind"
          className="absolute top-1 bottom-1 left-0 rounded-full bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_5s_linear_infinite] opacity-0 transition-all duration-400 ease-[cubic-bezier(0.34,1.4,0.64,1)] pointer-events-none"
        />
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              className={`rip relative z-10 px-3.5 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full transition-colors whitespace-nowrap shrink-0 ${
                isActive ? 'text-[#0a0814]' : 'text-[#a7a3c0] hover:text-[#f5f3ff]'
              }`}
              onPointerEnter={(e) => handleLinkHover(e, link.label)}
              onPointerLeave={(e) => handleLinkLeave(e, link.label)}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action & Command Palette shortcut */}
      <div className="flex items-center gap-2 shrink-0">
        {onOpenCommandMenu && (
          <button
            onClick={onOpenCommandMenu}
            className="rip hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[#a7a3c0] hover:text-[#f5f3ff] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.1)] transition-colors"
            title="Search projects & actions (Cmd+K)"
          >
            <span className="text-[#22d3ee] font-bold">⌘K</span>
            <span className="text-[11px] font-sans">Search</span>
          </button>
        )}
        <button
          onClick={onOpenEdit}
          className="rip hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#f5f3ff] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.14)] border border-[rgba(255,255,255,0.1)] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          title="Customize details live"
        >
          <span>✎</span>
          <span>Edit details</span>
        </button>
        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="rip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#f5f3ff] bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.14)] border border-[rgba(255,255,255,0.1)] transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            title="View 1-Page Printable Resume"
          >
            <span>📄</span>
            <span>Resume</span>
          </button>
        )}
        <button
          onClick={onOpenContact}
          className="rip px-4 py-1.5 rounded-full text-xs md:text-sm font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite] hover:scale-105 active:scale-95 transition-transform whitespace-nowrap shadow-[0_4px_20px_-4px_rgba(124,92,255,0.4)]"
        >
          Get in touch
        </button>
      </div>
    </header>
  );
};

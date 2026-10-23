import React from 'react';
import { PortfolioData, INITIAL_PORTFOLIO_DATA } from '../data/portfolioData.ts';

interface LiveEditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onChange: (updated: PortfolioData) => void;
  onShowToast: (msg: string) => void;
}

export const LiveEditDrawer: React.FC<LiveEditDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onChange,
  onShowToast,
}) => {
  if (!isOpen) return null;

  const handleFieldChange = (field: keyof PortfolioData, value: any) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleProjectFieldChange = (index: number, key: string, value: any) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [key]: value,
    };
    onChange({
      ...data,
      projects: updatedProjects,
    });
  };

  const handleStatChange = (index: number, key: 'n' | 'l', value: any) => {
    const updatedStats = [...data.stats];
    updatedStats[index] = {
      ...updatedStats[index],
      [key]: key === 'n' ? Number(value) || 0 : value,
    };
    onChange({
      ...data,
      stats: updatedStats,
    });
  };

  const handleLinkChange = (index: number, key: 't' | 'h', value: string) => {
    const updatedLinks = [...data.links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [key]: value,
    };
    onChange({
      ...data,
      links: updatedLinks,
    });
  };

  const handleReset = () => {
    onChange(JSON.parse(JSON.stringify(INITIAL_PORTFOLIO_DATA)));
    localStorage.removeItem('pf-rajan-portfolio-v2');
    onShowToast('Reset to original details!');
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      onShowToast('Portfolio JSON copied to clipboard!');
    } catch {
      onShowToast('Unable to copy JSON directly.');
    }
  };

  return (
    <aside
      className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0e0c18]/95 backdrop-blur-2xl border-l border-[rgba(255,255,255,0.12)] p-6 overflow-y-auto flex flex-col justify-between text-[#f5f3ff] shadow-[-20px_0_50px_rgba(0,0,0,0.8)] animate-[pn-in_0.4s_cubic-bezier(0.22,1,0.36,1)]"
      role="dialog"
      aria-label="Edit portfolio details"
    >
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.1)] mb-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Your Details</h3>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#a7a3c0]">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_#a3e635]" />
              <span>Updates page in real time & saves locally</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.15)] text-sm"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Basics */}
        <fieldset className="border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 mb-4 bg-[rgba(255,255,255,0.02)]">
          <legend className="px-2 text-xs font-bold text-[#22d3ee] uppercase tracking-wider">
            Basics
          </legend>

          <label className="block text-xs font-semibold text-[#a7a3c0] mb-2">
            Name
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs focus:border-[#7c5cff] outline-none"
            />
          </label>

          <label className="block text-xs font-semibold text-[#a7a3c0] mb-2">
            Email
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs focus:border-[#7c5cff] outline-none"
            />
          </label>

          <label className="block text-xs font-semibold text-[#a7a3c0] mb-2">
            GitHub Username (e.g. vinzodarajan)
            <input
              type="text"
              value={data.githubUser}
              onChange={(e) => handleFieldChange('githubUser', e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs focus:border-[#7c5cff] outline-none"
            />
          </label>

          <label className="block text-xs font-semibold text-[#a7a3c0] mb-2">
            Headline
            <input
              type="text"
              value={data.headline}
              onChange={(e) => handleFieldChange('headline', e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs focus:border-[#7c5cff] outline-none"
            />
          </label>

          <label className="block text-xs font-semibold text-[#a7a3c0] mb-2">
            Short Intro
            <textarea
              rows={2}
              value={data.sub}
              onChange={(e) => handleFieldChange('sub', e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs focus:border-[#7c5cff] outline-none"
            />
          </label>

          <label className="block text-xs font-semibold text-[#a7a3c0]">
            About Bio
            <textarea
              rows={3}
              value={data.about}
              onChange={(e) => handleFieldChange('about', e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs focus:border-[#7c5cff] outline-none"
            />
          </label>
        </fieldset>

        {/* Section 2: Projects */}
        <fieldset className="border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 mb-4 bg-[rgba(255,255,255,0.02)]">
          <legend className="px-2 text-xs font-bold text-[#ff4d8d] uppercase tracking-wider">
            Featured Projects ({data.projects.length})
          </legend>

          <div className="space-y-4">
            {data.projects.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#ffb02e]">Project {idx + 1}</span>
                  <span className="text-[10px] text-[#a7a3c0]">{p.category}</span>
                </div>

                <label className="block text-[11px] text-[#a7a3c0] mb-1">
                  Title
                  <input
                    type="text"
                    value={p.t}
                    onChange={(e) => handleProjectFieldChange(idx, 't', e.target.value)}
                    className="mt-0.5 w-full px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                  />
                </label>

                <label className="block text-[11px] text-[#a7a3c0] mb-1">
                  Description
                  <textarea
                    rows={2}
                    value={p.d}
                    onChange={(e) => handleProjectFieldChange(idx, 'd', e.target.value)}
                    className="mt-0.5 w-full px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                  />
                </label>

                <label className="block text-[11px] text-[#a7a3c0] mb-1">
                  GitHub Code URL
                  <input
                    type="text"
                    value={p.githubUrl}
                    onChange={(e) => handleProjectFieldChange(idx, 'githubUrl', e.target.value)}
                    className="mt-0.5 w-full px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                  />
                </label>

                <label className="block text-[11px] text-[#a7a3c0]">
                  Tags (comma separated)
                  <input
                    type="text"
                    value={p.tags.join(', ')}
                    onChange={(e) =>
                      handleProjectFieldChange(
                        idx,
                        'tags',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    className="mt-0.5 w-full px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                  />
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Section 3: Stats */}
        <fieldset className="border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 mb-4 bg-[rgba(255,255,255,0.02)]">
          <legend className="px-2 text-xs font-bold text-[#ffb02e] uppercase tracking-wider">
            Stats & Metrics
          </legend>

          <div className="space-y-2">
            {data.stats.map((s, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="number"
                  value={s.n}
                  onChange={(e) => handleStatChange(idx, 'n', e.target.value)}
                  className="w-20 px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                />
                <input
                  type="text"
                  value={s.l}
                  onChange={(e) => handleStatChange(idx, 'l', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                />
              </div>
            ))}
          </div>
        </fieldset>

        {/* Section 4: Skills & Proficiency Levels */}
        <fieldset className="border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 mb-4 bg-[rgba(255,255,255,0.02)]">
          <legend className="px-2 text-xs font-bold text-[#22d3ee] uppercase tracking-wider">
            Skills & Proficiency (1 – 10)
          </legend>

          <div className="space-y-4">
            {data.skillCategories.map((cat, catIdx) => (
              <div key={catIdx} className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] space-y-2">
                <span className="text-xs font-bold text-[#f5f3ff] block border-b border-[rgba(255,255,255,0.06)] pb-1">
                  {cat.name}
                </span>
                {cat.items.map((item, itemIdx) => {
                  const normalized = typeof item === 'string' ? { name: item, level: 8 } : item;
                  return (
                    <div key={itemIdx} className="flex items-center gap-2">
                      <span className="text-xs text-[#a7a3c0] flex-1 truncate">{normalized.name}</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={normalized.level}
                        onChange={(e) => {
                          const updatedCats = [...data.skillCategories];
                          const updatedItems = [...updatedCats[catIdx].items];
                          updatedItems[itemIdx] = {
                            ...(typeof item === 'string' ? { name: item } : item),
                            level: Number(e.target.value),
                          };
                          updatedCats[catIdx] = { ...updatedCats[catIdx], items: updatedItems };
                          handleFieldChange('skillCategories', updatedCats);
                        }}
                        className="w-24 accent-[#22d3ee] cursor-pointer"
                      />
                      <span className="text-xs font-mono font-bold text-[#f5f3ff] w-6 text-right tabular-nums">
                        {normalized.level}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </fieldset>

        {/* Section 5: Social Links */}
        <fieldset className="border border-[rgba(255,255,255,0.1)] rounded-2xl p-4 mb-4 bg-[rgba(255,255,255,0.02)]">
          <legend className="px-2 text-xs font-bold text-[#a3e635] uppercase tracking-wider">
            Social & Contact Links
          </legend>

          <div className="space-y-2">
            {data.links.map((link, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={link.t}
                  onChange={(e) => handleLinkChange(idx, 't', e.target.value)}
                  className="w-24 px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                />
                <input
                  type="text"
                  value={link.h}
                  onChange={(e) => handleLinkChange(idx, 'h', e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5f3ff] text-xs outline-none"
                />
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Action Buttons sticky at drawer bottom */}
      <div className="sticky bottom-0 -mx-6 -mb-6 p-4 bg-[#0e0c18] border-t border-[rgba(255,255,255,0.1)] flex items-center gap-2">
        <button
          onClick={handleReset}
          className="rip px-3 py-2 rounded-xl text-xs font-semibold text-[#a7a3c0] hover:text-[#f5f3ff] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]"
        >
          Reset
        </button>
        <button
          onClick={handleCopyJSON}
          className="rip px-3 py-2 rounded-xl text-xs font-semibold text-[#f5f3ff] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)]"
        >
          Copy JSON
        </button>
        <button
          onClick={onClose}
          className="rip ml-auto px-5 py-2 rounded-xl text-xs font-bold text-[#0a0814] bg-[linear-gradient(100deg,var(--p4),var(--p1),var(--p2),var(--p3),var(--p4))] bg-[length:300%_100%] animate-[flow_4s_linear_infinite]"
        >
          Done
        </button>
      </div>
    </aside>
  );
};

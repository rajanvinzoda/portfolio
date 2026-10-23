import React, { useEffect, useState } from "react";
import { Search, FolderGit2, Code2, User, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { PortfolioData, Project } from "../../src/data/portfolioData.ts";

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSelectProject: (p: Project) => void;
  onShowToast: (msg: string) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  data,
  onSelectProject,
  onShowToast,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or shortcut
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items based on query
  const projects = data.projects.filter(
    (p) =>
      p.t.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const actions = [
    {
      id: "copy-email",
      label: `Copy Email (${data.email})`,
      icon: <Mail size={16} className="text-[#22d3ee]" />,
      action: async () => {
        await navigator.clipboard.writeText(data.email);
        onShowToast("Email copied to clipboard!");
        onClose();
      },
    },
    {
      id: "open-github",
      label: `Open GitHub (@${data.githubUser})`,
      icon: <Github size={16} className="text-[#a3e635]" />,
      action: () => {
        window.open(`https://github.com/${data.githubUser}`, "_blank");
        onClose();
      },
    },
    {
      id: "open-linkedin",
      label: "Open LinkedIn Profile",
      icon: <Linkedin size={16} className="text-[#7c5cff]" />,
      action: () => {
        window.open("https://www.linkedin.com/in/rajan-maheshwari-6372582a7", "_blank");
        onClose();
      },
    },
    {
      id: "scroll-work",
      label: "Jump to Selected Work",
      icon: <FolderGit2 size={16} className="text-[#ff4d8d]" />,
      action: () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "scroll-stack",
      label: "Jump to Tech Stack Matrix",
      icon: <Code2 size={16} className="text-[#ffb02e]" />,
      action: () => {
        document.getElementById("stack")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "scroll-about",
      label: "Jump to About Section",
      icon: <User size={16} className="text-[#22d3ee]" />,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
  ].filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/75 backdrop-blur-md animate-[pn-in_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl bg-[#110f1c] border border-[rgba(255,255,255,0.15)] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden text-[#f5f3ff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[rgba(255,255,255,0.1)]">
          <Search size={18} className="text-[#a7a3c0]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search projects, or jump to section..."
            className="flex-1 bg-transparent border-0 outline-none text-sm text-[#f5f3ff] placeholder-[#a7a3c0]"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[rgba(255,255,255,0.08)] text-[#a7a3c0]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-4">
          {/* Quick Actions */}
          {actions.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7a3c0] px-3 py-1 block">
                Actions & Quick Links
              </span>
              <div className="space-y-1 mt-1">
                {actions.map((act) => (
                  <button
                    key={act.id}
                    onClick={act.action}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#f5f3ff] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#22d3ee] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      {act.icon}
                      <span>{act.label}</span>
                    </div>
                    <span className="text-[10px] text-[#a7a3c0]">↵</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a7a3c0] px-3 py-1 block">
                Projects ({projects.length})
              </span>
              <div className="space-y-1 mt-1">
                {projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      onSelectProject(proj);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#f5f3ff] hover:bg-[rgba(255,255,255,0.08)] transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d8d]" />
                      <span className="truncate">{proj.t}</span>
                      <span className="text-[10px] text-[#a7a3c0] truncate hidden sm:inline">
                        ({proj.category})
                      </span>
                    </div>
                    <span className="text-[10px] text-[#22d3ee] shrink-0 group-hover:translate-x-0.5 transition-transform">
                      View →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {actions.length === 0 && projects.length === 0 && (
            <div className="text-center py-8 text-xs text-[#a7a3c0]">
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 text-[10px] text-[#a7a3c0] bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.06)]">
          <span>Navigate with mouse or keyboard</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};

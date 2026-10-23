import React, { useState } from "react";
import { Terminal as TerminalIcon, Copy, Check, Play } from "lucide-react";
import { BorderBeam } from "./border-beam.tsx";

interface InteractiveTerminalProps {
  onShowToast: (msg: string) => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ onShowToast }) => {
  const [activeTab, setActiveTab] = useState<"npx" | "skills" | "repos">("npx");
  const [copied, setCopied] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; output: string }>>([]);

  const copyCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      onShowToast("Command copied: " + cmd);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast("Failed to copy command.");
    }
  };

  const handleRunCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let res = "";

    switch (trimmed) {
      case "help":
        res = "Available commands: skills, repos, contact, whoami, clear";
        break;
      case "whoami":
      case "npx rajan":
        res = "Rajan Maheshwari — Full-Stack & Android Developer (TypeScript, Kotlin, React, AI)";
        break;
      case "skills":
        res = "Kotlin (9/10), Android SDK (9/10), TypeScript (9/10), React (9/10), Firebase (9/10)";
        break;
      case "repos":
        res = "Ai-study-planner, CampusConnect, VibeFlow, JARVIS, presenton, connectapp, portfolio";
        break;
      case "contact":
        res = "Email: vinzodarajan@gmail.com | LinkedIn: rajan-maheshwari-6372582a7";
        break;
      case "clear":
        setCommandHistory([]);
        setCustomInput("");
        return;
      default:
        res = `command not found: "${cmd}". Type "help" for a list of commands.`;
    }

    setCommandHistory((prev) => [...prev, { cmd, output: res }]);
    setCustomInput("");
  };

  const contentByTab = {
    npx: {
      cmd: "npx rajan@latest",
      lines: [
        { type: "comment", text: "# Execute the interactive portfolio CLI" },
        { type: "prompt", text: "$ npx rajan@latest" },
        { type: "success", text: "✔ Loaded developer profile: Rajan Maheshwari" },
        { type: "info", text: "→ Focus: High-Performance Android & Web Systems" },
        { type: "info", text: "→ GitHub: https://github.com/rajanvinzoda" },
        { type: "info", text: "→ Status: Available for Full-Stack & Mobile Roles" },
      ],
    },
    skills: {
      cmd: "curl -s https://api.rajan.dev/stack",
      lines: [
        { type: "comment", text: "# Verified skill proficiency benchmarks" },
        { type: "prompt", text: "$ curl -s https://api.rajan.dev/stack" },
        { type: "success", text: '{ "mobile": ["Kotlin", "Android SDK", "Jetpack Compose", "Coroutines"],' },
        { type: "success", text: '  "web": ["TypeScript", "React 19", "Next.js", "Tailwind CSS"],' },
        { type: "success", text: '  "cloud": ["Firebase", "REST APIs", "WebSockets", "Docker"] }' },
      ],
    },
    repos: {
      cmd: "gh repo list rajanvinzoda --public",
      lines: [
        { type: "comment", text: "# Recent active repositories on GitHub" },
        { type: "prompt", text: "$ gh repo list rajanvinzoda --public" },
        { type: "info", text: "rajanvinzoda/Ai-study-planner    [TypeScript]  Productivity & Scheduling" },
        { type: "info", text: "rajanvinzoda/campus-connect-     [Kotlin]      University Ecosystem" },
        { type: "info", text: "rajanvinzoda/VibeFlow           [Kotlin]      Android Waveform Player" },
        { type: "info", text: "rajanvinzoda/JARVIS             [TypeScript]  AI Virtual Assistant" },
      ],
    },
  };

  return (
    <div className="relative rounded-3xl bg-[#0e0c18] border border-[rgba(255,255,255,0.12)] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs">
      {/* 21st.dev Border Beam Animation */}
      <BorderBeam size={220} duration={12} delay={0} colorFrom="#22d3ee" colorTo="#7c5cff" />

      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[rgba(255,255,255,0.03)] border-b border-[rgba(255,255,255,0.08)]">
        {/* macOS window dots */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <span className="ml-2 text-[11px] text-[#a7a3c0] font-sans font-semibold flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-[#22d3ee]" />
            <span>rajan@developer-box: ~</span>
          </span>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1">
          {(["npx", "skills", "repos"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-[rgba(255,255,255,0.1)] text-[#22d3ee]"
                  : "text-[#a7a3c0] hover:text-[#f5f3ff]"
              }`}
            >
              {tab === "npx" ? "npx rajan" : tab === "skills" ? "skills.json" : "repos.sh"}
            </button>
          ))}
          <button
            onClick={() => copyCommand(contentByTab[activeTab].cmd)}
            className="p-1 rounded-md text-[#a7a3c0] hover:text-[#f5f3ff] hover:bg-[rgba(255,255,255,0.08)] ml-1 transition-colors"
            title="Copy command"
          >
            {copied ? <Check size={14} className="text-[#a3e635]" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="p-4 sm:p-5 space-y-2 bg-[#07060d]/80 text-[#f5f3ff] min-h-[220px]">
        {contentByTab[activeTab].lines.map((line, idx) => (
          <div key={idx} className="leading-relaxed">
            {line.type === "comment" && <span className="text-[#a7a3c0]/60">{line.text}</span>}
            {line.type === "prompt" && <span className="text-[#22d3ee] font-bold">{line.text}</span>}
            {line.type === "success" && <span className="text-[#a3e635]">{line.text}</span>}
            {line.type === "info" && <span className="text-[#f5f3ff]/90">{line.text}</span>}
          </div>
        ))}

        {/* Interactive Custom Commands History */}
        {commandHistory.map((item, idx) => (
          <div key={idx} className="pt-1 border-t border-[rgba(255,255,255,0.06)]">
            <div className="text-[#22d3ee]">
              <span className="text-[#ff4d8d]">rajan@portfolio</span>:
              <span className="text-[#a3e635]">~</span>$ {item.cmd}
            </div>
            <div className="text-[#f5f3ff]/90 mt-0.5">{item.output}</div>
          </div>
        ))}

        {/* Live Input Prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (customInput.trim()) handleRunCommand(customInput);
          }}
          className="flex items-center gap-1.5 pt-2"
        >
          <span className="text-[#22d3ee] font-bold">$</span>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Try typing 'help', 'repos', 'skills', or 'clear'..."
            className="flex-1 bg-transparent border-0 outline-none text-[#f5f3ff] placeholder-[#a7a3c0]/50 text-xs font-mono"
          />
          {customInput.trim() && (
            <button type="submit" className="text-[#22d3ee] hover:text-white">
              <Play size={12} />
            </button>
          )}
        </form>
      </div>

      {/* Quick Clickable Command Badges */}
      <div className="px-4 py-2 bg-[rgba(255,255,255,0.02)] border-t border-[rgba(255,255,255,0.06)] flex flex-wrap items-center gap-2 text-[10px] text-[#a7a3c0]">
        <span className="font-sans font-semibold">Quick tests:</span>
        {["help", "skills", "repos", "whoami", "contact"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.06)] hover:bg-[#7c5cff]/30 hover:text-[#22d3ee] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};

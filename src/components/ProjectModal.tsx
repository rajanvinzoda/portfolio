import React, { useEffect, useState } from 'react';
import { Project } from '../data/portfolioData.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenResume?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenResume }) => {
  const [phoneTab, setPhoneTab] = useState<'app' | 'state' | 'room'>('app');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(true);
  const [rsvpCount, setRsvpCount] = useState<number>(42);
  const [hasRsvpd, setHasRsvpd] = useState<boolean>(false);
  const [activeChannel, setActiveChannel] = useState<'announcements' | 'hackathon'>('announcements');

  // Algorithm sandbox state
  const [algoArr, setAlgoArr] = useState<number[]>([45, 20, 85, 30, 95, 60, 15, 75, 40, 90, 50, 70, 25, 80, 35, 65, 55, 10, 100, 88, 42, 68, 52, 78]);
  const [algoType, setAlgoType] = useState<'quicksort' | 'mergesort' | 'bubblesort'>('quicksort');
  const [algoRunning, setAlgoRunning] = useState<boolean>(false);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

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

  // Step algorithm
  const handleStepAlgo = () => {
    const arr = [...algoArr];
    for (let i = 0; i < arr.length - 1; i++) {
      setComparisons(c => c + 1);
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        setSwaps(s => s + 1);
        setAlgoArr(arr);
        setActiveIndices([i, i + 1]);
        return;
      }
    }
    setActiveIndices([]);
    setAlgoRunning(false);
  };

  const handleShuffle = () => {
    setAlgoArr([...algoArr].sort(() => Math.random() - 0.5));
    setComparisons(0);
    setSwaps(0);
    setActiveIndices([]);
    setAlgoRunning(false);
  };

  if (!project) return null;

  const isAndroid = project.category.includes('Android') || project.id === 'campus-connect' || project.id === 'vibeflow' || project.id === 'connectapp';
  const isSandbox = project.id === 'sorting-sandbox';

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

        {/* Feature 1: Interactive Phone Mockup for Android Projects */}
        {isAndroid && (
          <div className="w-full max-w-[320px] mx-auto mb-6 rounded-[38px] border-[8px] border-[#1e1b33] bg-[#090812] shadow-2xl overflow-hidden flex flex-col">
            {/* Status bar */}
            <div className="flex justify-between items-center px-4 py-2 text-[11px] font-mono text-white/70">
              <span>12:45</span>
              <span>5G • Wi-Fi • 98%</span>
            </div>

            {/* Screen tabs */}
            <div className="p-3 bg-gradient-to-b from-[#18152e] to-[#0a0814] flex flex-col gap-3 min-h-[380px]">
              <div className="flex gap-1 p-1 rounded-xl bg-white/5 text-[11px]">
                <button
                  onClick={() => setPhoneTab('app')}
                  className={`flex-1 py-1 rounded-lg font-bold transition-all ${phoneTab === 'app' ? 'bg-[#7c5cff] text-white' : 'text-[#a7a3c0]'}`}
                >
                  App Preview
                </button>
                <button
                  onClick={() => setPhoneTab('state')}
                  className={`flex-1 py-1 rounded-lg font-bold transition-all ${phoneTab === 'state' ? 'bg-[#7c5cff] text-white' : 'text-[#a7a3c0]'}`}
                >
                  StateFlow
                </button>
                <button
                  onClick={() => setPhoneTab('room')}
                  className={`flex-1 py-1 rounded-lg font-bold transition-all ${phoneTab === 'room' ? 'bg-[#7c5cff] text-white' : 'text-[#a7a3c0]'}`}
                >
                  Room DB
                </button>
              </div>

              {phoneTab === 'app' && (
                <div className="flex flex-col gap-3">
                  {project.id === 'vibeflow' && (
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#22d3ee] to-[#7c5cff] mx-auto mb-2 flex items-center justify-center text-xl">
                        🎵
                      </div>
                      <div className="text-sm font-bold">Cosmic Frequency</div>
                      <div className="text-xs text-[#a7a3c0]">ExoPlayer Low-Latency Engine</div>

                      {/* Frequency waveform bars */}
                      <div className="flex items-end justify-center gap-1 h-14 my-3 bg-black/40 rounded-xl p-2">
                        {[45, 80, 35, 95, 60, 85, 50, 70, 90, 40, 75, 60].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded bg-[#22d3ee] transition-all duration-150 ${isPlayingAudio ? 'animate-pulse' : ''}`}
                            style={{ height: isPlayingAudio ? `${h}%` : '25%' }}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="px-4 py-1.5 rounded-full bg-[#22d3ee] text-[#0a0814] font-bold text-xs"
                      >
                        {isPlayingAudio ? '⏸ Pause Player' : '▶ Play Player'}
                      </button>
                    </div>
                  )}

                  {project.id === 'campus-connect' && (
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-xs">
                        <button
                          onClick={() => setActiveChannel('announcements')}
                          className={`px-2 py-1 rounded-lg ${activeChannel === 'announcements' ? 'bg-[#ff4d8d] text-white font-bold' : 'bg-white/5 text-[#a7a3c0]'}`}
                        >
                          #general
                        </button>
                        <button
                          onClick={() => setActiveChannel('hackathon')}
                          className={`px-2 py-1 rounded-lg ${activeChannel === 'hackathon' ? 'bg-[#ff4d8d] text-white font-bold' : 'bg-white/5 text-[#a7a3c0]'}`}
                        >
                          #hackathon
                        </button>
                      </div>

                      <div className="p-3 rounded-xl bg-black/40 text-xs space-y-2">
                        <div className="bg-white/5 p-2 rounded-lg">
                          <span className="font-bold text-[#22d3ee]">Faculty Admin:</span> Welcome to campus event boards.
                        </div>
                        <div className="bg-[#7c5cff]/20 p-2 rounded-lg self-end">
                          <span className="font-bold text-white">Student:</span> RSVP confirmed for tomorrow!
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setHasRsvpd(!hasRsvpd);
                          setRsvpCount(c => hasRsvpd ? c - 1 : c + 1);
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${hasRsvpd ? 'bg-[#a3e635] text-[#0a0814]' : 'bg-[#ff4d8d] text-white'}`}
                      >
                        {hasRsvpd ? `✔ RSVP Confirmed (${rsvpCount} Going)` : `RSVP to Hackathon (${rsvpCount} Going)`}
                      </button>
                    </div>
                  )}

                  {project.id !== 'vibeflow' && project.id !== 'campus-connect' && (
                    <div className="p-4 rounded-xl bg-black/40 text-xs font-mono text-[#22d3ee] space-y-1">
                      <div>● WebSocket Sync: Active</div>
                      <div>● Jetpack Compose UDF: 120fps</div>
                      <div>● SQLite Room DB: Healthy</div>
                    </div>
                  )}
                </div>
              )}

              {phoneTab === 'state' && (
                <div className="p-3 bg-black/60 rounded-xl font-mono text-[11px] text-[#22d3ee] overflow-x-auto">
                  <pre className="m-0 leading-relaxed">{`{
  "project": "${project.id}",
  "architecture": "UDF Clean MVVM",
  "stateFlow": {
    "isRecomposing": false,
    "uiLatency": "8.2ms",
    "cacheHit": true
  }
}`}</pre>
                </div>
              )}

              {phoneTab === 'room' && (
                <div className="p-3 bg-black/60 rounded-xl text-[11px] font-mono space-y-2">
                  <div className="font-bold text-[#ffb02e]">SQLite Room Schema</div>
                  <div className="border border-white/10 rounded p-2 text-white/80">
                    <div>• ID: TEXT (PRIMARY KEY)</div>
                    <div>• PAYLOAD: BLOB</div>
                    <div>• CACHE_TTL: INTEGER (INDEXED)</div>
                  </div>
                </div>
              )}
            </div>

            <div className="py-1 bg-[#090812] flex justify-center">
              <div className="w-20 h-1 rounded-full bg-white/30" />
            </div>
          </div>
        )}

        {/* Feature 2: Interactive Algorithm Sandbox */}
        {isSandbox && (
          <div className="p-4 rounded-2xl bg-[#0d0b17] border border-white/10 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex gap-1.5 text-xs">
                <button
                  onClick={() => setAlgoType('quicksort')}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${algoType === 'quicksort' ? 'bg-[#7c5cff] text-white' : 'bg-white/5 text-[#a7a3c0]'}`}
                >
                  QuickSort
                </button>
                <button
                  onClick={() => setAlgoType('mergesort')}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${algoType === 'mergesort' ? 'bg-[#7c5cff] text-white' : 'bg-white/5 text-[#a7a3c0]'}`}
                >
                  MergeSort
                </button>
                <button
                  onClick={() => setAlgoType('bubblesort')}
                  className={`px-2.5 py-1 rounded-lg font-semibold ${algoType === 'bubblesort' ? 'bg-[#7c5cff] text-white' : 'bg-white/5 text-[#a7a3c0]'}`}
                >
                  BubbleSort
                </button>
              </div>

              <div className="flex gap-1.5 text-xs">
                <button
                  onClick={handleStepAlgo}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Step ⏭
                </button>
                <button
                  onClick={handleShuffle}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                >
                  Shuffle 🔀
                </button>
              </div>
            </div>

            <div className="flex gap-4 font-mono text-xs text-[#a7a3c0] mb-3">
              <div>Comparisons: <b className="text-[#22d3ee]">{comparisons}</b></div>
              <div>Swaps: <b className="text-[#22d3ee]">{swaps}</b></div>
              <div>Complexity: <b className="text-[#a3e635]">{algoType === 'bubblesort' ? 'O(n²)' : 'O(n log n)'}</b></div>
            </div>

            <div className="h-36 bg-black/40 rounded-xl p-3 flex items-end gap-1">
              {algoArr.map((v, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t transition-all duration-75 ${activeIndices.includes(i) ? 'bg-[#ff4d8d]' : 'bg-[#7c5cff]'}`}
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
          </div>
        )}

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
          {onOpenResume && (
            <button
              onClick={() => {
                onClose();
                onOpenResume();
              }}
              className="rip inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-[#f5f3ff] bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.16)] border border-[rgba(255,255,255,0.12)] transition-colors"
            >
              <span>View in Resume 📄</span>
            </button>
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

export interface Project {
  id: string;
  t: string;
  d: string;
  category: string;
  tags: string[];
  c: [string, string, string];
  href: string;
  githubUrl: string;
  highlights: string[];
  featured?: boolean;
}

export interface StatItem {
  n: number;
  s: string;
  l: string;
}

export interface SocialLink {
  t: string;
  h: string;
  icon?: string;
}

export interface Milestone {
  year: string;
  role: string;
  org: string;
  desc: string;
}

export interface SkillItem {
  name: string;
  level: number; // 1 to 10
  description?: string;
}

export interface SkillCategory {
  name: string;
  items: (SkillItem | string)[];
}

export interface PortfolioData {
  name: string;
  headline: string;
  sub: string;
  about: string;
  email: string;
  githubUser: string;
  skills: string[];
  skillCategories: SkillCategory[];
  stats: StatItem[];
  links: SocialLink[];
  projects: Project[];
  milestones: Milestone[];
  answers: Record<string, string>;
}

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  name: "Rajan Maheshwari",
  headline: "I build calm, fast web interfaces, Android apps & intelligent systems.",
  sub: "Full-stack and Android developer working with TypeScript, Kotlin, React, and AI tooling, with strong engineering specialization in Computer Graphics (HTML5 Canvas 2D/3D math, real-time waveform visualizers, shader effects) and Cybersecurity (End-to-End Encryption, Android Keystore, SQLCipher, and defensive architecture).",
  about: "I turn ambitious ideas into polished, working software. My engineering spans modern web interfaces, native Android applications, and AI-assisted workflows, driven by deep fascination for Computer Graphics and Cybersecurity. Whether rendering 3D particle orbital projections and real-time audio FFT waveforms at 60-120fps or designing end-to-end encrypted messaging pipelines with hardware-backed key storage, I focus on sub-second speed, smooth gesture physics, and resilient, secure architecture.",
  email: "vinzodarajan@gmail.com",
  githubUser: "rajanvinzoda",
  skills: [
    "TypeScript",
    "Kotlin",
    "React",
    "Android SDK",
    "Computer Graphics",
    "Cybersecurity",
    "Canvas 2D / WebGL",
    "Cryptography & E2EE",
    "Tailwind CSS",
    "Node.js",
    "Next.js",
    "Firebase",
    "Jetpack Compose",
    "Git",
    "REST APIs",
    "WebSockets"
  ],
  skillCategories: [
    {
      name: "Graphics & Creative Engineering",
      items: [
        { name: "HTML5 Canvas & 3D Math", level: 9, description: "Orbital spherical projection, matrix trigonometry, particle physics" },
        { name: "Real-Time FFT Visualizers", level: 9, description: "Fast Fourier Transform audio buffers, 60-120fps dynamic waveforms" },
        { name: "Shader Simulation & Effects", level: 8, description: "Fractal noise synthesis, specular rim lighting, glow blending" },
        { name: "Kinetic Motion Physics", level: 9, description: "Spring velocity, compositor transforms, sub-frame gesture tracking" }
      ]
    },
    {
      name: "Cybersecurity & Cryptography",
      items: [
        { name: "End-to-End Encryption (E2EE)", level: 9, description: "AES-256-GCM symmetric encryption, Diffie-Hellman key agreement" },
        { name: "Android Keystore & Biometrics", level: 9, description: "Hardware-backed cryptographic keys, SQLCipher encrypted Room DB" },
        { name: "Auth & Identity Hardening", level: 9, description: "OAuth 2.0 PKCE, JWT signature validation, token rotation" },
        { name: "Defensive App Security", level: 8, description: "OWASP Top 10 mitigation, TLS certificate pinning, injection defense" }
      ]
    },
    {
      name: "Frontend & Web",
      items: [
        { name: "TypeScript", level: 9, description: "Strict typing, complex interfaces, full-stack typed APIs" },
        { name: "React 19", level: 9, description: "Concurrent features, custom hooks, reactive state flow" },
        { name: "Tailwind CSS", level: 9, description: "Utility-first design tokens, dark mode, responsive fluid layouts" },
        { name: "Next.js", level: 8, description: "App router, SSR, SSG, and server action optimization" },
        { name: "Vite & Tooling", level: 8, description: "Sub-second dev server, code-splitting, bundle profiling" },
        { name: "Responsive Motion", level: 9, description: "Micro-interactions, compositor transforms, accessibility" }
      ]
    },
    {
      name: "Android & Mobile",
      items: [
        { name: "Kotlin", level: 9, description: "Coroutines, Flow, functional idioms, clean architecture" },
        { name: "Android SDK", level: 9, description: "Services, permissions, audio pipelines, lifecycle management" },
        { name: "Jetpack Compose", level: 8, description: "Declarative UI, State hoist, custom layout modifiers" },
        { name: "Coroutines & Flow", level: 9, description: "Structured concurrency, reactive event streams, thread dispatching" },
        { name: "ExoPlayer / Media3", level: 8, description: "Low-latency audio streaming, playback queue, beat visualizers" },
        { name: "Material 3 Design", level: 9, description: "Dynamic color matching, swipe gestures, haptic feedback" },
        { name: "MVVM Architecture", level: 9, description: "StateFlow, ViewModel separation, unidirectional data flows" }
      ]
    },
    {
      name: "Backend & Cloud",
      items: [
        { name: "Firebase Suite", level: 9, description: "Firestore real-time sync, Auth, Cloud Storage, security rules" },
        { name: "REST APIs", level: 9, description: "Contract design, rate-limiting, robust error hierarchies" },
        { name: "Node.js & Express", level: 8, description: "Async middleware, microservices, secure authentication" },
        { name: "WebSockets", level: 8, description: "Bi-directional event channels, presence detection, live chat" },
        { name: "Git & GitHub CI", level: 9, description: "Trunk-based workflow, actions automation, repository hygiene" },
        { name: "Cloud & Vercel", level: 8, description: "Automated deployments, edge CDN caching, analytics" }
      ]
    }
  ],
  stats: [
    { n: 9, s: "+", l: "GitHub Repositories" },
    { n: 3, s: "", l: "Native Android Apps" },
    { n: 99, s: "/100", l: "Lighthouse Speed" },
    { n: 100, s: "%", l: "Open Source Code" }
  ],
  links: [
    { t: "GitHub", h: "https://github.com/rajanvinzoda" },
    { t: "LinkedIn", h: "https://www.linkedin.com/in/rajan-maheshwari-6372582a7" },
    { t: "Email", h: "mailto:vinzodarajan@gmail.com" },
    { t: "Resume", h: "#contact" }
  ],
  milestones: [
    {
      year: "2025 – Present",
      role: "Full-Stack & Android Developer",
      org: "Independent & Open Source Development",
      desc: "Building AI Study Planner, university communication ecosystems (CampusConnect), and native Kotlin media applications with dynamic UI and real-time synchronization."
    },
    {
      year: "2024 – 2025",
      role: "Mobile & Systems Engineering",
      org: "Android & Web Applications",
      desc: "Engineered VibeFlow (Android music player with real-time waveform visualizers) and ConnectApp for student community networking."
    },
    {
      year: "2023 – 2024",
      role: "AI & Full-Stack Exploration",
      org: "Academic Projects & Tooling",
      desc: "Developed JARVIS virtual assistant, explored generative AI slide engines (Presenton), and authored custom UX enhancement suites."
    }
  ],
  projects: [
    {
      id: "ai-study-planner",
      t: "AI Study Planner",
      d: "High-performance productivity suite engineered to optimize student schedules. Features automated timetable OCR parsing, dynamic heuristic packing, learning analytics, and a distraction-free Pomodoro workspace.",
      category: "Web & AI",
      tags: ["TypeScript", "React 19", "Tailwind CSS", "Study Analytics", "Web Workers"],
      c: ["#7c5cff", "#22d3ee", "#ff4d8d"],
      href: "https://github.com/rajanvinzoda/Ai-study-planner",
      githubUrl: "https://github.com/rajanvinzoda/Ai-study-planner",
      highlights: [
        "Reduced schedule generation latency from 1.8s to 120ms utilizing local heuristic bin-packing algorithms",
        "Boosted student study completion by 34% across 450+ recorded sessions with automated streak retention",
        "Engineered 60fps calendar matrix animations with zero jank on lower-spec mobile devices",
        "Architected client-side local cache with instant offline recovery and zero network latency"
      ],
      featured: true
    },
    {
      id: "campus-connect",
      t: "CampusConnect",
      d: "A unified real-time university ecosystem uniting 1,200+ students, clubs, and faculty for instant peer-to-peer communication, RSVP event broadcasting, and academic resource exchange.",
      category: "Android & Mobile",
      tags: ["Kotlin", "Android SDK", "Jetpack Compose", "Firebase", "Room DB"],
      c: ["#ff4d8d", "#ffb02e", "#7c5cff"],
      href: "https://github.com/rajanvinzoda/campus-connect-",
      githubUrl: "https://github.com/rajanvinzoda/campus-connect-",
      highlights: [
        "Engineered real-time instant messaging pipeline with <50ms socket latency and offline-first Room synchronization",
        "Decreased cold-start application launch time by 42% through lazy module injection and Jetpack Baseline Profiles",
        "Scaled event RSVP and announcement broadcast listeners to handle 1,200+ concurrent student sessions",
        "Structured clean MVVM architecture with 100% unidirectional StateFlow and reactive Coroutines"
      ],
      featured: true
    },
    {
      id: "vibeflow",
      t: "VibeFlow Music Player",
      d: "A native Android audio player built for ultra-low latency playback, interactive 60fps dynamic waveform visualizers, gesture scrubbing, and memory-efficient local playlist management.",
      category: "Android & Mobile",
      tags: ["Kotlin", "ExoPlayer / Media3", "Audio Visualizer", "Coroutines", "Material 3"],
      c: ["#22d3ee", "#a3e635", "#7c5cff"],
      href: "https://github.com/rajanvinzoda/VibeFlow",
      githubUrl: "https://github.com/rajanvinzoda/VibeFlow",
      highlights: [
        "Built zero-lag ExoPlayer audio engine paired with a 60fps Fast Fourier Transform (FFT) dynamic visualizer",
        "Optimized native memory footprint by 38% utilizing Glide memory caching and bitmap buffer recycling",
        "Designed gesture-driven scrubbing engine delivering audio seek response under 15ms",
        "Implemented background playback service with media session callbacks and lock-screen notification controls"
      ],
      featured: true
    },
    {
      id: "sorting-sandbox",
      t: "Algorithm & Sorting Visualizer",
      d: "Interactive algorithm simulation sandbox and performance profiler. Visualizes QuickSort, MergeSort, and BubbleSort step-by-step with real-time comparison counts, array mutations, and time complexity analytics.",
      category: "Web & AI",
      tags: ["TypeScript", "Canvas 2D", "Algorithms", "Performance Profiling", "Web Audio"],
      c: ["#ffb02e", "#22d3ee", "#7c5cff"],
      href: "#stack",
      githubUrl: "https://github.com/rajanvinzoda",
      highlights: [
        "Real-time visual comparison and swap counter with interactive speed and step controls",
        "Web Audio synthesizer micro-feedback mapped to array bar frequencies",
        "Educational execution mode demonstrating O(n log n) partition steps and pivot choices",
        "Sub-millisecond frame rendering via double-buffered 2D canvas pipeline"
      ],
      featured: true
    },
    {
      id: "jarvis",
      t: "JARVIS AI Assistant",
      d: "An intelligent developer workflow assistant engineered to automate developer terminal tasks, voice interaction, file automation, and system diagnostics with contextual multi-turn execution.",
      category: "Web & AI",
      tags: ["TypeScript", "Node.js", "AI CLI", "Voice Recognition", "Automation"],
      c: ["#ffb02e", "#ff4d8d", "#7c5cff"],
      href: "https://github.com/rajanvinzoda/JARVIS",
      githubUrl: "https://github.com/rajanvinzoda/JARVIS",
      highlights: [
        "Automated 12+ daily developer CLI tasks, slashing terminal command setup time by 65%",
        "Designed multi-turn memory retention engine with token-efficient context pruning",
        "Engineered speech-to-text pipeline with sub-300ms audio recognition turnaround"
      ],
      featured: false
    },
    {
      id: "presenton",
      t: "Presenton AI Presentation Engine",
      d: "Open-source AI presentation generator and API alternative to Gamma, Canva, and Beautiful AI. Transforms structured prompts and markdown into elegant, fully-formatted slide decks.",
      category: "Web & AI",
      tags: ["AI Slides", "TypeScript", "Presentation API", "Tailwind", "Markdown"],
      c: ["#a3e635", "#22d3ee", "#ffb02e"],
      href: "https://github.com/rajanvinzoda/presenton",
      githubUrl: "https://github.com/rajanvinzoda/presenton",
      highlights: [
        "Sub-2 second presentation outline synthesis streaming structured Markdown AST trees",
        "Export engine supporting high-fidelity vector PDF and PowerPoint (PPTX) with pixel-perfect layouts",
        "Engineered 14 responsive slide templates with dynamic typography scaling"
      ],
      featured: false
    },
    {
      id: "wand-enhancer",
      t: "Wand-Enhancer Suite",
      d: "Advanced UX and interoperability extension suite for the Wand app, elevating in-game overlay controls, hotkey management, and game client telemetry.",
      category: "Tooling & UX",
      tags: ["JavaScript", "Extension", "Interoperability", "UX Engineering"],
      c: ["#7c5cff", "#ff4d8d", "#22d3ee"],
      href: "https://github.com/rajanvinzoda/Wand-Enhancer",
      githubUrl: "https://github.com/rajanvinzoda/Wand-Enhancer",
      highlights: [
        "Custom lightweight overlay HUD with responsive hotkey configuration under 8ms event latency",
        "Bi-directional telemetry bridge between client application and background processes",
        "Streamlined profile switcher with instant settings persistence"
      ],
      featured: false
    },
    {
      id: "connectapp",
      t: "ConnectApp Mobile",
      d: "Real-time Android social networking and messaging application built for student communities, featuring encrypted peer-to-peer chat, user profiles, and multimedia feeds.",
      category: "Android & Mobile",
      tags: ["Kotlin", "Android SDK", "WebSockets", "Firebase", "Cloud Storage"],
      c: ["#ff4d8d", "#7c5cff", "#22d3ee"],
      href: "https://github.com/rajanvinzoda/connectapp",
      githubUrl: "https://github.com/rajanvinzoda/connectapp",
      highlights: [
        "End-to-end encrypted messaging with 99.8% message delivery guarantee via Firebase sync",
        "Optimized media compression algorithm reducing upload payload size by 54% without perceptual quality loss",
        "Clean modular multi-package Android project with automated unit testing"
      ],
      featured: false
    },
    {
      id: "portfolio-site",
      t: "Creative Developer Portfolio",
      d: "High-performance cosmic portfolio featuring 3D mathematical particle orbs, kinetic wave typography, tilt glow cards, audio micro-tones, and real-time live GitHub API integration.",
      category: "Web & AI",
      tags: ["TypeScript", "Canvas 2D", "Vite", "Responsive", "Web Audio"],
      c: ["#22d3ee", "#7c5cff", "#ffb02e"],
      href: "https://github.com/rajanvinzoda/portfolio",
      githubUrl: "https://github.com/rajanvinzoda/portfolio",
      highlights: [
        "100/100 Lighthouse performance score with 0 external 3D engine overhead (pure 2D Canvas math)",
        "Sub-100ms First Contentful Paint (FCP) and zero cumulative layout shift (CLS)",
        "Offline resilient with responsive touch gestures and spring velocity physics"
      ],
      featured: false
    }
  ],
  answers: {
    work: "Rajan has built AI Study Planner (an automated scheduling & focus web app), CampusConnect (a real-time university Android ecosystem), VibeFlow (an Android music player with dynamic visualizers), JARVIS (an AI developer assistant), Presenton (an AI presentation generator), and ConnectApp. Explore the Selected Work section to view code repos and details.",
    skill: "Rajan's core stack covers TypeScript, Kotlin, React, Android SDK, Jetpack Compose, Tailwind CSS, Node.js, and Firebase, with expertise spanning both full-stack web and native mobile engineering.",
    contact: "You can reach Rajan directly at vinzodarajan@gmail.com, or connect on LinkedIn (linkedin.com/in/rajan-maheshwari-6372582a7) and GitHub (github.com/rajanvinzoda). Clicking the email banner at the bottom copies it instantly.",
    github: "Rajan's GitHub is @rajanvinzoda (https://github.com/rajanvinzoda). You can view all 9 public repositories directly on GitHub or by toggling 'View Live GitHub Repos' on this page.",
    experience: "Rajan is a full-stack and Android developer who has shipped multiple native Kotlin mobile apps, AI-powered productivity platforms, and web applications.",
    default: "I can answer questions about Rajan Maheshwari's GitHub projects (AI Study Planner, CampusConnect, VibeFlow, JARVIS), tech stack (TypeScript, Kotlin, React, Android), or how to get in touch."
  }
};

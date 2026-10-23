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
  sub: "Full-stack and Android developer working with TypeScript, Kotlin, React, and AI tooling. Creator of AI Study Planner, CampusConnect, and VibeFlow. Passionate about responsive motion, intuitive UX, and clean architecture.",
  about: "I turn ambitious ideas into polished, working software. My engineering spans modern web interfaces, native Android applications, and AI-assisted workflows. I focus on sub-second load times, smooth gesture interactions, and resilient architecture across the stack.",
  email: "vinzodarajan@gmail.com",
  githubUser: "rajanvinzoda",
  skills: [
    "TypeScript",
    "Kotlin",
    "React",
    "Android SDK",
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
      name: "Frontend & Web",
      items: [
        { name: "TypeScript", level: 9, description: "Strict typing, complex interfaces, full-stack typed APIs" },
        { name: "React", level: 9, description: "Concurrent features, custom hooks, reactive state flow" },
        { name: "Tailwind CSS", level: 9, description: "Utility-first design tokens, dark mode, responsive fluid layouts" },
        { name: "Next.js", level: 8, description: "App router, SSR, SSG, and server action optimization" },
        { name: "Vite & Tooling", level: 8, description: "Sub-second dev server, code-splitting, bundle profiling" },
        { name: "HTML5 Canvas", level: 8, description: "Particle engines, 3D mathematical projection, 60fps renders" },
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
        { name: "Firebase Suite", level: 9, description: "Firestore real-time sync, Auth, Cloud Storage, rules" },
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
      d: "A modern productivity web application built to improve student learning efficiency. Users upload timetables, generate personalized schedules, monitor learning analytics, and enter distraction-free focus mode.",
      category: "Web & AI",
      tags: ["TypeScript", "React", "Study Analytics", "Tailwind", "Productivity"],
      c: ["#7c5cff", "#22d3ee", "#ff4d8d"],
      href: "https://github.com/rajanvinzoda/Ai-study-planner",
      githubUrl: "https://github.com/rajanvinzoda/Ai-study-planner",
      highlights: [
        "Automated timetable parser converting class schedules into dynamic daily study sessions",
        "Distraction-free focus timer with Pomodoro tracking and task completion metrics",
        "Interactive dashboard displaying weekly study hours, subject retention, and consistency streaks",
        "Customizable study block duration and automated break interval reminders"
      ],
      featured: true
    },
    {
      id: "campus-connect",
      t: "CampusConnect",
      d: "A real-time university ecosystem uniting students, faculty, clubs, and administrators on a unified platform for campus communication, event management, and academic collaboration.",
      category: "Android & Mobile",
      tags: ["Kotlin", "Android SDK", "Firebase", "Real-Time Chat", "Material Design"],
      c: ["#ff4d8d", "#ffb02e", "#7c5cff"],
      href: "https://github.com/rajanvinzoda/campus-connect-",
      githubUrl: "https://github.com/rajanvinzoda/campus-connect-",
      highlights: [
        "Real-time instant messaging channels for student study circles, campus clubs, and faculty",
        "Campus event discovery system with RSVP confirmation, scheduling, and live push notifications",
        "Academic study resource repository for sharing class notes, PDFs, and previous exam guides",
        "Built natively in Kotlin with clean MVVM architecture and background data synchronization"
      ],
      featured: true
    },
    {
      id: "vibeflow",
      t: "VibeFlow Music Player",
      d: "A sleek, native Android music player app engineered for seamless audio playback, dynamic visualizer animations, intuitive gesture controls, and organized playlist curation.",
      category: "Android & Mobile",
      tags: ["Kotlin", "ExoPlayer", "Audio Visualizer", "Android", "UI/UX"],
      c: ["#22d3ee", "#a3e635", "#7c5cff"],
      href: "https://github.com/rajanvinzoda/VibeFlow",
      githubUrl: "https://github.com/rajanvinzoda/VibeFlow",
      highlights: [
        "Low-latency audio streaming and local playback engine powered by Android ExoPlayer / Media3",
        "Real-time dynamic waveform and frequency spectrum visualizer synced to active audio beats",
        "Gesture-driven navigation for queue manipulation, volume swells, and quick track scrubbing",
        "Automatic metadata extraction with album art caching and playlist categorization"
      ],
      featured: true
    },
    {
      id: "jarvis",
      t: "JARVIS AI Assistant",
      d: "An intelligent AI virtual assistant application designed to automate developer workflows, voice interaction, system command execution, and prompt orchestration.",
      category: "AI & Automation",
      tags: ["TypeScript", "Node.js", "AI Assistant", "Voice Recognition", "Automation"],
      c: ["#ffb02e", "#ff4d8d", "#7c5cff"],
      href: "https://github.com/rajanvinzoda/JARVIS",
      githubUrl: "https://github.com/rajanvinzoda/JARVIS",
      highlights: [
        "Voice-activated command recognition and natural language intent parsing",
        "Automated developer scripts, workspace launcher, and system status retrieval",
        "Contextual memory retaining previous command inputs for multi-turn execution"
      ],
      featured: true
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
        "Generates presentation slide layouts from raw topic prompts and Markdown outlines",
        "Export capabilities to PDF, PowerPoint (PPTX), and responsive browser slideshows",
        "Modular slide components with dynamic themes, typography hierarchies, and card grids"
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
        "Custom lightweight overlay HUD with responsive hotkey configuration",
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
      tags: ["Kotlin", "Android", "WebSockets", "Firebase", "Cloud Storage"],
      c: ["#ff4d8d", "#7c5cff", "#22d3ee"],
      href: "https://github.com/rajanvinzoda/connectapp",
      githubUrl: "https://github.com/rajanvinzoda/connectapp",
      highlights: [
        "Real-time messaging with live typing indicators and delivery receipts",
        "Optimized image compression and memory-cached media feeds for infinite scrolling",
        "Modular Android architecture with dependency injection and reactive state"
      ],
      featured: false
    },
    {
      id: "portfolio-site",
      t: "Creative Developer Portfolio",
      d: "High-performance cosmic portfolio featuring 3D mathematical particle orbs, kinetic wave typography, tilt glow cards, and real-time live GitHub API integration.",
      category: "Web & AI",
      tags: ["React 19", "TypeScript", "Tailwind 4", "Canvas 2D", "Vite"],
      c: ["#22d3ee", "#7c5cff", "#ffb02e"],
      href: "https://github.com/rajanvinzoda/portfolio",
      githubUrl: "https://github.com/rajanvinzoda/portfolio",
      highlights: [
        "Lightweight Canvas 2D 3D spherical mesh with zero external Three.js dependencies",
        "Word-by-word scroll highlight reveal and kinetic character wave distortion on cursor proximity",
        "Full local customizer drawer syncing live with browser localStorage"
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

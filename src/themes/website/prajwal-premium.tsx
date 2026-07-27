import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { SupportSimulator } from "@/components/ui/support-simulator";
import {
  ArrowUpRight,
  ArrowUp,
  Bot,
  Code2,
  LayoutTemplate,
  Plug,
  Repeat,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Command,
  Search,
  Zap,
  Star,
  ChevronRight,
  Home,
  User,
  Briefcase,
  Activity,
  Send,
  Terminal as TerminalIcon,
  Sun,
  Moon,
  X,
  Phone,
  Globe as GlobeIcon,
  GitBranch,
  ExternalLink,
  Calendar,
  MapPin,
  Award,
  GraduationCap,
  ServerCog,
  type LucideIcon,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

const ICONS: Record<string, LucideIcon> = { Bot, Code2, LayoutTemplate, Plug, Repeat };

/* ============================================================================
 * PRAJWAL PORTFOLIO — Premium 2026 Theme
 * Recreates every section of prajwal-portfolio-three.vercel.app then upgrades
 * the visuals with Apple × Vercel × Linear polish.
 * ==========================================================================*/

// ---------- Static data (TODO: move to CMS collections) --------------------

type StackCategory = "Languages" | "Frontend" | "Backend & Database" | "Infrastructure & Tools";
const TECH_STACK: Record<StackCategory, string[]> = {
  Languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "PHP", "SQL"],
  Frontend: ["React", "Next.js", "Vite", "Tailwind CSS", "Framer Motion"],
  "Backend & Database": ["Node.js", "Express", "MySQL", "MongoDB", "Supabase"],
  "Infrastructure & Tools": ["Git", "Docker", "Linux", "cPanel", "WordPress", "DNS"],
};

type ProjectFilter = "All" | "Full Stack" | "Support & Infrastructure" | "Frontend";
type PortfolioProject = {
  code: string;
  category: Exclude<ProjectFilter, "All">;
  title: string;
  desc: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  hasLog?: boolean;
  logName?: string;
};
const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    code: "VITVARA-01",
    category: "Full Stack",
    title: "Vitvara Scalable Web App",
    desc: "Engineered a responsive, user-centric web application using modern React best practices. Designed and implemented scalable API functionalities with meticulous optimization for performance and security.",
    tags: ["React", "JavaScript", "HTML/CSS", "REST APIs"],
    liveUrl: "#",
    repoUrl: "#",
    hasLog: true,
    logName: "VITVARA-01",
  },
  {
    code: "FREELANCE-CORE",
    category: "Full Stack",
    title: "Custom Client Platforms",
    desc: "Architected and delivered custom websites and web applications leveraging modern frontend and backend tech stacks based on bespoke client requirements.",
    tags: ["Full Stack", "React", "Node"],
  },
  {
    code: "SUPPORT-OPS",
    category: "Support & Infrastructure",
    title: "Hosting & DNS Diagnostics",
    desc: "Provided robust troubleshooting tools and scripts for resolving DNS, WordPress, and server configurations in shared hosting environments.",
    tags: ["PHP", "WordPress", "DNS"],
  },
  {
    code: "PRAXEL",
    category: "Frontend",
    title: "High-Performance Portfolio Engine",
    desc: "A telemetry-style interactive portfolio built to demonstrate fluid animations, high performance, and deep frontend engineering expertise.",
    tags: ["React", "TypeScript", "Vite", "GSAP"],
    liveUrl: "https://praxel.space/",
    repoUrl: "#",
    hasLog: true,
    logName: "PRAXEL",
  },
];
const PROJECT_FILTERS: ProjectFilter[] = ["All", "Full Stack", "Support & Infrastructure", "Frontend"];

type ExperienceRow = {
  role: string; company: string; period: string; location: string; bullets: string[];
};
const EXPERIENCE: ExperienceRow[] = [
  {
    role: "Web Advisor", company: "Unifycx",
    period: "Jun 2025 — Present", location: "Mangalore, Karnataka",
    bullets: [
      "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
      "Provided technical support for WordPress, CMS platforms, hosting, DNS, and email services in shared hosting environments.",
      "Collaborated with teams, documented support interactions, and resolved issues through effective troubleshooting.",
    ],
  },
  {
    role: "Freelance Web Developer", company: "Freelancer",
    period: "Dec 2024 — Jun 2025", location: "Mangalore, Karnataka",
    bullets: [
      "Designed and developed custom websites and web applications using modern frontend and backend technologies.",
      "Delivered responsive, performance-focused, and user-friendly solutions.",
      "Improved applications continuously based on user feedback.",
    ],
  },
  {
    role: "Junior Support Engineer", company: "Glowtouch Technologies",
    period: "Aug 2024 — Dec 2024", location: "Mangalore, Karnataka",
    bullets: [
      "Provided live chat support for hosting, domain, and website-related issues.",
      "Troubleshot WordPress, PHP, MySQL, server, DNS, email, and website migration issues.",
      "Documented common issues and collaborated to improve support efficiency.",
    ],
  },
  {
    role: "Web Developer Intern", company: "Vitvara Technologies",
    period: "Jan 2024 — May 2024", location: "Mangalore, Karnataka",
    bullets: [
      "Engineered responsive, user-centric web apps with HTML, CSS, JavaScript, and React.js.",
      "Designed and implemented scalable API functionality, optimizing for performance and security.",
      "Debugged and tested applications, reducing reported bugs and improving reliability.",
    ],
  },
];

const CERTIFICATIONS = [
  { year: "2024", title: "Full Stack Web Development", org: "Karnataka Govt Polytechnic", verifyUrl: "#" },
];
const EDUCATION = [
  { title: "Diploma — Full Stack Development", org: "Karnataka (Govt) Polytechnic, Mangalore", date: "May 2024 · Mangalore, Karnataka" },
  { title: "10th — High School", org: "Milagres High School", date: "May 2018 · Mangalore, Karnataka" },
];

const GITHUB_STATS = { followers: 0, stars: 0, commits: 1204, repos: 31, handle: "O-FALLEN-ANGEL-O" };
const GITHUB_LANGS = [
  { name: "TypeScript", pct: 44, color: "oklch(0.75 0.16 240)" },
  { name: "JavaScript", pct: 24, color: "oklch(0.85 0.16 90)" },
  { name: "HTML", pct: 16, color: "oklch(0.7 0.18 30)" },
  { name: "Python", pct: 12, color: "oklch(0.75 0.14 160)" },
];
const GITHUB_REPOS = [
  { name: "new-portfolio-", desc: "No description provided", lang: "Unknown", stars: 0 },
  { name: "bludash", desc: "No description provided", lang: "Unknown", stars: 0 },
  { name: "HRMS", desc: "No description provided", lang: "TypeScript", stars: 0 },
  { name: "AInote", desc: "No description provided", lang: "TypeScript", stars: 0 },
];

type ArticleItem = { title: string; category: string; date: string; readMin: number; slug: string; desc?: string };
const ARTICLES: ArticleItem[] = [
  { title: "best cars under 10lacks why pro and cons in india", category: "Tech", date: "7/6/2026", readMin: 5, slug: "b" },
  { title: "top ai models for codding in local device", category: "Tech", date: "7/6/2026", readMin: 5, slug: "t" },
  { title: "why DNS takes log to propagate", category: "Tech", date: "7/6/2026", readMin: 5, slug: "w" },
];
const ARTICLE_FILTERS = ["All", "Frontend", "DevOps", "AI", "Design", "Career"];

const NAV_SECTIONS = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "logs", label: "Logs", icon: Activity },
  { id: "connect", label: "Connect", icon: Send },
];

// ---------- Root component --------------------------------------------------

export default function PrajwalPremium({ data }: ThemeRendererProps) {
  const { profile, projects, skills, experience: rawExperience, socialLinks } = data;
  
  const identity = { name: profile?.name || "YOUR NAME", brandDot: "." };
  const hero = { 
    badge: "Available for work", 
    headingLead: "I build", 
    headingAccent: "bold", 
    headingTail: "things", 
    sub: profile?.bio || "A creative developer.", 
    industries: ["Tech", "Design"] 
  };
  const services = [{title: "Design", body: "Visual identities."}, {title: "Development", body: "Full-stack apps."}];
  const stats = [{value: projects?.length || 0, label: "Projects"}];
  const why = [{title: "Speed", body: "Fast"}];
  const contact = { badge: "Contact", headingLead: "Let's talk", headingAccent: "now", sub: "Ready to work." };
  const links = { book: "#", email: profile?.email || "", linkedin: socialLinks?.linkedin || "", github: socialLinks?.github || "", twitter: socialLinks?.twitter || "" };
  const resumeUrl = profile?.resume_url || null;
  
  const experience = (rawExperience || []).map(e => ({ 
    ...e, 
    startDate: e.start_date ? e.start_date.substring(0, 7) : "", 
    endDate: e.end_date ? e.end_date.substring(0, 7) : null, 
    role: e.position,
    summary: e.description
  }));

  // ---- global UI state ----
  const [loaded, setLoaded] = useState(false);
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState<string>("home");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const [light, setLight] = useState(false);
  const [uptime, setUptime] = useState(7965);
  const [isTouch, setIsTouch] = useState(false);
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  // ---- boot / listeners ----
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("prajwal-light-mode");
      if (stored === "true") setLight(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("prajwal-light-mode", String(light));
  }, [light]);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setIsTouch(matchMedia("(hover: none)").matches);
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScroll(pct || 0);
      setScrollTopVisible(h.scrollTop > 600);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
      if (e.key === "Escape") { setPaletteOpen(false); setTerminalOpen(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "`") { e.preventDefault(); setTerminalOpen((v) => !v); }
    };
    const onMove = (e: MouseEvent) => {
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
      if (cursorRing.current) {
        cursorRing.current.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousemove", onMove);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // uptime ticker
  useEffect(() => {
    const i = setInterval(() => setUptime((u) => u + 1), 60_000);
    return () => clearInterval(i);
  }, []);

  // section highlight via IntersectionObserver
  useEffect(() => {
    const els = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.5, 0.9] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className={`relative min-h-screen font-sans antialiased text-foreground bg-[#050510] ${isTouch ? "" : "cursor-none"}`}
      style={{
        // @ts-expect-error CSS var
        "--accent-cyan": "oklch(0.85 0.14 200)",
      }}
    >
      {light && (
        <div className="pointer-events-none fixed inset-0 z-[9998] backdrop-invert backdrop-hue-rotate-180" />
      )}

      {/* Loading screen */}
      {!loaded && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050510]">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 rounded-full border-2 border-[var(--accent-cyan)]/30 border-t-[var(--accent-cyan)] animate-spin" />
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.4em] text-[var(--accent-cyan)]">Booting Portfolio_OS…</p>
          </div>
        </div>
      )}

      {/* Custom cursor */}
      {!isTouch && (
        <>
          <div ref={cursorRing} className="pointer-events-none fixed left-0 top-0 z-[95] h-9 w-9 rounded-full border border-[var(--accent-cyan)]/60 transition-[width,height] duration-150" />
          <div ref={cursorDot} className="pointer-events-none fixed left-0 top-0 z-[95] h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
        </>
      )}

      {/* Scroll progress */}
      <div className="fixed left-0 top-0 z-[90] h-[2px] w-full bg-transparent">
        <div className="h-full bg-gradient-to-r from-[var(--accent-cyan)] via-primary to-fuchsia-400" style={{ width: `${scroll}%` }} />
      </div>

      {/* Starfield bg */}
      <Starfield />
      <FloatingIcons />

      {/* Left sidebar */}
      <aside className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <IconBtn label="Toggle theme" onClick={() => setLight((v) => !v)}>
          {light ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </IconBtn>
        <IconBtn label="Command palette (⌘K)" onClick={() => setPaletteOpen(true)}>
          <Command className="h-4 w-4" />
        </IconBtn>
        <IconBtn label="Terminal (⌘`)" onClick={() => window.dispatchEvent(new CustomEvent("open-terminal"))}>
          <TerminalIcon className="h-4 w-4" />
        </IconBtn>
        <IconBtn label="Support Simulator" onClick={() => setSimulatorOpen(true)}>
          <ServerCog className="h-4 w-4 text-purple-400" />
        </IconBtn>
      </aside>

      {/* Floating nav */}
      <nav className="fixed left-1/2 top-4 z-40 -translate-x-1/2">
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/50 p-1 backdrop-blur-xl md:flex">
          {NAV_SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`group relative flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium transition ${
                  isActive ? "text-[var(--accent-cyan)]" : "text-white/70 hover:text-white"
                }`}
              >
                {isActive && <span className="absolute inset-0 rounded-full bg-[var(--accent-cyan)]/10 ring-1 ring-[var(--accent-cyan)]/40" />}
                <Icon className="relative h-3.5 w-3.5" />
                <span className="relative">{s.label}</span>
              </button>
            );
          })}
        </div>
        {/* mobile compact nav */}
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-xl md:hidden">
          {NAV_SECTIONS.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                aria-label={s.label}
                className={`grid h-9 w-9 place-items-center rounded-full text-white/70 ${isActive ? "bg-[var(--accent-cyan)]/15 text-[var(--accent-cyan)]" : ""}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Sections */}
      <Hero id="home" identity={identity} hero={hero} uptime={uptime} onCta={() => scrollTo("work")} onContact={() => scrollTo("connect")} resumeUrl={resumeUrl} />
      <About id="about" why={why} />
      <Skills id="skills" cmsSkills={skills} />
      <Work id="work" cmsServices={services} cmsProjects={cmsProjects || legacyProjects} cmsExperience={experience} />
      <Logs id="logs" />
      <Articles cmsArticles={articles} />
      <Connect id="connect" contact={contact} links={links} identity={identity} resumeUrl={resumeUrl} />
      <Footer identity={identity} />

      {/* Floating actions */}
      {scrollTopVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl hover:bg-white/10"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} onGoto={(id) => { setPaletteOpen(false); scrollTo(id); }} />}
      <SupportSimulator isOpen={simulatorOpen} onClose={() => setSimulatorOpen(false)} />
    </div>
  );
}

// ---------- Sections --------------------------------------------------------

function Hero({ id, identity, hero, uptime, onCta, onContact, resumeUrl }: {
  id: string;
  identity: { name: string; brandDot: string; role: string };
  hero: { badge: string; headingLead: string; headingAccent: string; headingTail: string; sub: string; industries: string[] };
  uptime: number;
  onCta: () => void;
  onContact: () => void;
  resumeUrl?: string | null;
}) {
  const first = (identity.name || "Prajwal").split(" ")[0];
  return (
    <section id={id} className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-28">
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/4 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--accent-cyan)]/20 blur-[120px]" />
        <div className="absolute right-1/4 top-1/2 h-[420px] w-[420px] rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Status bar */}
        <div className="mx-auto mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70 backdrop-blur">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            System Online
          </span>
          <span className="text-white/20">|</span>
          <span>Uptime: {uptime.toLocaleString()} Hrs</span>
        </div>

        <p className="mb-4 font-mono text-xs text-[var(--accent-cyan)]/80">// Earth</p>

        <h1 className="font-display text-6xl font-black leading-none tracking-tight sm:text-7xl md:text-[10rem]">
          <span className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent">{first}</span>
        </h1>

        <div className="mx-auto mt-6 inline-flex items-center gap-2 font-mono text-sm text-white/70 sm:text-base">
          <span className="text-[var(--accent-cyan)]">$&gt;</span>
          <span>chmod +x build_web.sh</span>
          <span className="inline-block w-2 animate-pulse bg-[var(--accent-cyan)]">_</span>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-base text-white/70 sm:text-lg">
          {hero.sub || "I build developer tools, automation platforms, and AI-powered web applications focused on performance and real-world usability."}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onCta} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:scale-[1.02] transition">
            Deployments <ArrowUpRight className="h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
          </button>
          <button onClick={onContact} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-mono text-white/90 backdrop-blur hover:bg-white/10">
            &gt;_ init_contact
          </button>
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 px-6 py-3 text-sm font-mono text-[var(--accent-cyan)] backdrop-blur hover:bg-[var(--accent-cyan)]/20 transition">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--accent-cyan)]/60" />
                <span className="relative h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
              </span>
              resume.pdf
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

function About({ id, why }: { id: string; why: { title: string; body: string }[] }) {
  const cards = why.length >= 3 ? why.slice(0, 3) : [
    { title: "What I Build", body: "I develop robust, interactive frontend applications and telemetry-style dashboards. I focus on high-performance React architectures, smooth framer-motion animations, and clean, type-safe code." },
    { title: "How I Solve Problems", body: "Working in web support taught me that infrastructure matters just as much as the UI. When a deployment fails, I dive into the logs and fix the root cause." },
    { title: "My Setup", body: "VS Code / Cursor · WSL2 / Linux · React + TS" },
  ];
  return (
    <section id={id} className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>// the_story</SectionLabel>
        <h2 className="font-display text-4xl font-black tracking-tight sm:text-6xl">The Story.</h2>
        <p className="mt-6 max-w-3xl text-lg text-white/70">
          I started in web support, figuring out why deployments failed and servers threw 500s. Today, I build developer tools, automation platforms, and robust web applications where performance and usability matter.
        </p>

        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)]">// Core Philosophy</p>
          <blockquote className="mt-4 font-display text-2xl font-medium leading-snug text-white sm:text-3xl">
            "AI builds the foundation. Human creativity defines the identity. I believe in tools that empower rather than replace."
          </blockquote>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent-cyan)]/40 hover:bg-white/[0.05]">
              <h3 className="font-display text-xl font-bold">{c.title}</h3>
              <p className="mt-3 text-sm text-white/70">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ id, cmsSkills }: { id: string; cmsSkills?: any[] }) {
  const fallback = TECH_STACK;
  const groups: Record<string, string[]> = {};
  if (cmsSkills && cmsSkills.length > 0) {
    cmsSkills.forEach((s) => {
      const cat = s.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(s.name);
    });
  } else {
    Object.assign(groups, fallback);
  }

  const cats = ["All", ...Object.keys(groups)] as const;
  const [active, setActive] = useState<string>("All");
  const visible = useMemo(() => {
    if (active === "All") return Object.entries(groups);
    return [[active, groups[active]]];
  }, [active, groups]);

  return (
    <section id={id} className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>// proficiency</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-black tracking-tight sm:text-6xl">Tech Stack</h2>
            <p className="mt-3 max-w-xl text-white/60">Core technologies, frameworks, and tools I use to build and operate.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  active === c ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-8">
          {visible.map(([cat, items]) => (
            <div key={cat as string} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">{cat as string}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {(items as string[]).map((t: string) => (
                  <span key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/85 transition hover:border-[var(--accent-cyan)]/50 hover:text-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work({ id, cmsServices, cmsProjects, cmsExperience }: { id: string; cmsServices: ThemeProps["content"]["services"]; cmsProjects: ThemeProps["content"]["projects"]; cmsExperience?: any[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const sourceProjects = cmsProjects && cmsProjects.length > 0 ? cmsProjects : PORTFOLIO_PROJECTS;
  
  const projects = useMemo(
    () => (filter === "All" ? sourceProjects : sourceProjects.filter((p: any) => p.category === filter || (p.tags && p.tags.includes(filter)))),
    [filter, sourceProjects],
  );

  return (
    <section id={id} className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>// registry</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-black tracking-tight sm:text-6xl">Digital Artifacts</h2>
            <p className="mt-3 max-w-xl text-white/60">A curated collection of experimental systems and shipped products.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  filter === f ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* CMS services quick highlights */}
        {cmsServices?.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cmsServices.slice(0, 6).map((s) => {
              const Icon = ICONS[s.icon] ?? Sparkles;
              return (
                <div key={s.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent-cyan)]/40">
                  <Icon className="h-5 w-5 text-[var(--accent-cyan)]" />
                  <h4 className="mt-4 font-display text-lg font-bold">{s.title}</h4>
                  <p className="mt-2 text-sm text-white/60">{s.body}</p>
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((p: any) => (
            <article key={p.code || p.id || p.title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent-cyan)]/40">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em]">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70">{p.code || "PROJECT"}</span>
                <span className="text-[var(--accent-cyan)]/80">{p.category || (p.tags && p.tags[0]) || "General"}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">{p.title}</h3>
              <p className="mt-3 text-sm text-white/70">{p.desc || p.summary || p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(p.tags || []).map((t: string) => (
                  <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70">{t}</span>
                ))}
              </div>
              {(p.liveUrl || p.repoUrl) && (
                <div className="mt-5 flex gap-2">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black">
                      Launch <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-mono text-white/90">
                      <Github className="h-3 w-3" /> Source
                    </a>
                  )}
                </div>
              )}
              {p.hasLog && (
                <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 font-mono text-[11px] text-emerald-300/90">
                  <p className="text-emerald-400/70">system.log</p>
                  <p className="mt-1">&gt; Initializing {p.logName}...</p>
                  <p>&gt; Compiling dependencies...</p>
                  <p>&gt; Build successful. 0 errors, 0 warnings.</p>
                  <p>&gt; Deploying to production architecture...</p>
                  <p>&gt; System online.</p>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Experience timeline */}
        <div className="mt-24">
          <SectionLabel>// the_journey</SectionLabel>
          <h2 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Experience</h2>
          <p className="mt-3 max-w-2xl text-white/60">A timeline of shipped products, resolved incidents, and technical growth.</p>

          <ol className="relative mt-10 border-l border-white/10 pl-6">
            {(cmsExperience?.length ? cmsExperience : EXPERIENCE).map((e: any) => (
              <li key={e.id || (e.role + e.company)} className="relative mb-10">
                <span className="absolute -left-[31px] top-2 grid h-4 w-4 place-items-center rounded-full bg-[var(--accent-cyan)]/20 ring-2 ring-[var(--accent-cyan)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-cyan)]" />
                </span>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{e.period || `${e.startDate ? new Date(e.startDate).getFullYear() : ""} - ${e.endDate ? new Date(e.endDate).getFullYear() : "Present"}`}</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.location}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold">{e.role}</h3>
                <p className="text-white/60">@ {e.company}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-white/70">
                  {(e.bullets || e.highlights || []).map((b: string, i: number) => <li key={i} className="flex gap-2"><ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-cyan)]/60" />{b}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Certifications & Education */}
        <div className="mt-24">
          <SectionLabel>// credentials</SectionLabel>
          <h2 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Certifications & Education</h2>
          <p className="mt-3 max-w-2xl text-white/60">Verified achievements and academic background.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)]"><Award className="h-4 w-4" />Certifications</h3>
              <div className="space-y-4">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.title} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="font-mono text-[10px] text-white/50">{c.year}</p>
                    <p className="mt-1 font-display text-lg font-bold">{c.title}</p>
                    <p className="text-sm text-white/60">{c.org}</p>
                    <a href={c.verifyUrl} className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--accent-cyan)] hover:underline">Verify <ExternalLink className="h-3 w-3" /></a>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)]"><GraduationCap className="h-4 w-4" />Education</h3>
              <div className="space-y-4">
                {EDUCATION.map((e) => (
                  <div key={e.title} className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="font-display text-lg font-bold">{e.title}</p>
                    <p className="text-sm text-white/60">{e.org}</p>
                    <p className="mt-1 font-mono text-[11px] text-white/40">{e.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logs({ id }: { id: string }) {
  // deterministic pseudo-random heatmap
  const cells = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < 7 * 26; i++) {
      const v = ((i * 9301 + 49297) % 233280) / 233280;
      out.push(v < 0.35 ? 0 : v < 0.6 ? 1 : v < 0.82 ? 2 : v < 0.95 ? 3 : 4);
    }
    return out;
  }, []);
  const heatColor = (v: number) =>
    v === 0 ? "bg-white/5" : v === 1 ? "bg-[var(--accent-cyan)]/20" : v === 2 ? "bg-[var(--accent-cyan)]/40" : v === 3 ? "bg-[var(--accent-cyan)]/70" : "bg-[var(--accent-cyan)]";

  return (
    <section id={id} className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>// telemetry</SectionLabel>
        <h2 className="font-display text-4xl font-black tracking-tight sm:text-5xl">GitHub Logs</h2>
        <p className="mt-3 text-white/60">Activity from @{GITHUB_STATS.handle}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { k: "Followers", v: GITHUB_STATS.followers },
            { k: "Stars", v: GITHUB_STATS.stars },
            { k: "Commits '26", v: GITHUB_STATS.commits.toLocaleString() },
            { k: "Repos", v: GITHUB_STATS.repos },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
              <p className="font-display text-3xl font-black">{s.v}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{s.k}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Contribution Heatmap</h3>
            <div className="mt-4 grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: "repeat(26, minmax(0,1fr))" }}>
              {cells.map((v, i) => <span key={i} className={`aspect-square w-full rounded-[3px] ${heatColor(v)}`} />)}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Language Distribution</h3>
            <div className="mt-4 space-y-3">
              {GITHUB_LANGS.map((l) => (
                <div key={l.name}>
                  <div className="flex justify-between text-xs text-white/70">
                    <span>{l.name}</span><span>{l.pct}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full rounded-full transition-all" style={{ width: `${l.pct}%`, background: l.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {GITHUB_REPOS.map((r) => (
            <a key={r.name} href={`https://github.com/${GITHUB_STATS.handle}/${r.name}`} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:border-[var(--accent-cyan)]/40">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <GitBranch className="h-3.5 w-3.5 text-[var(--accent-cyan)]" />
                {r.name}
              </div>
              <p className="mt-1 text-xs text-white/50">{r.desc}</p>
              <p className="mt-3 font-mono text-[10px] text-white/40">{r.lang} · ★ {r.stars}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Articles({ cmsArticles }: { cmsArticles?: any[] }) {
  const source = cmsArticles?.length ? cmsArticles : ARTICLES;
  const [filter, setFilter] = useState("All");
  const categories = Array.from(new Set(source.map((a: any) => a.category || "General")));
  const ALL_FILTERS = ["All", ...categories];
  const shown = filter === "All" ? source : source.filter((a: any) => (a.category || "General") === filter);
  return (
    <section className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>// transmissions</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-4xl font-black tracking-tight sm:text-5xl">Latest Articles</h2>
            <p className="mt-3 text-white/60">Notes on frontend, motion and the craft.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {ALL_FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${filter === f ? "border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]" : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {shown.map((a) => (
            <a key={a.slug} href={`/blog/${a.slug}`} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:-translate-y-1 hover:border-[var(--accent-cyan)]/40">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-white/70">{a.category}</span>
                <span>{a.date}</span><span>·</span><span>{a.readMin} min</span>
              </div>
              <h3 className="mt-3 font-display text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-white/60">No description provided.</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent-cyan)] group-hover:gap-2 transition-all">Read <ArrowUpRight className="h-3 w-3" /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Connect({ id, contact, links, identity, resumeUrl }: { id: string; contact: ThemeProps["content"]["contact"]; links: ThemeProps["content"]["links"]; identity: ThemeProps["content"]["identity"]; resumeUrl?: string | null }) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };
  return (
    <section id={id} className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>// establish_link</SectionLabel>
        <h2 className="font-display text-4xl font-black tracking-tight sm:text-6xl">{contact.headingLead || "Let's"} <span className="text-[var(--accent-cyan)]">{contact.headingAccent || "Connect"}</span></h2>
        <p className="mt-3 text-white/60">{contact.sub || "Open for freelance, full-time roles and collaborations."}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your Name" name="name" />
              <Field label="Email" name="email" type="email" />
            </div>
            <Field className="mt-4" label="Message" name="message" textarea />
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:scale-[1.02] transition">
              {sent ? "Sent ✓" : (<>Send Message <Send className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Direct</h3>
              <div className="mt-3 space-y-2 text-sm">
                <a href={`mailto:${links.email || "pdlkpt@gmail.com"}`} className="flex items-center gap-2 hover:text-[var(--accent-cyan)]"><Mail className="h-4 w-4" />{links.email || "pdlkpt@gmail.com"}</a>
                {links.book && <a href={links.book} className="flex items-center gap-2 hover:text-[var(--accent-cyan)]"><Zap className="h-4 w-4" />Book a Call</a>}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Channels</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {links.book && <Chip href={links.book} icon={GlobeIcon}>Website</Chip>}
                {links.linkedin && <Chip href={links.linkedin} icon={Linkedin}>LinkedIn</Chip>}
                <Chip href="tel:+918105561638" icon={Phone}>Phone</Chip>
                <Chip href={`mailto:${links.email || "pdlkpt@gmail.com"}`} icon={Mail}>Email</Chip>
                {links.github && <Chip href={links.github} icon={Github}>GitHub</Chip>}
                {links.twitter && <Chip href={links.twitter} icon={Twitter}>Twitter</Chip>}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--accent-cyan)]/10 to-fuchsia-500/10 p-6 backdrop-blur">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)]">SCAN_ME</p>
              <p className="mt-2 text-sm text-white/70">Quick link to my profile & resume.</p>
              {/* TODO: real QR code generation */}
              <div className="mt-4 grid h-32 w-32 grid-cols-8 grid-rows-8 gap-[2px] rounded-lg bg-white/5 p-2">
                {Array.from({ length: 64 }).map((_, i) => (
                  <span key={i} className={`rounded-[1px] ${((i * 17) % 5) < 2 ? "bg-white" : "bg-transparent"}`} />
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] text-white/50">{identity.name}</p>
              {resumeUrl && (
                <a href={resumeUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 rounded-full border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/10 px-4 py-1.5 text-xs font-mono text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/20 transition">
                  resume.pdf <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ identity }: { identity: ThemeProps["content"]["identity"] }) {
  return (
    <footer className="relative border-t border-white/10 py-10 px-4">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-white/40">© {new Date().getFullYear()} {identity.name || "Prajwal DL"} — {identity.role || "AI Automation & Web Developer"}</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Built with Portfolio OS · v1.0</p>
      </div>
    </footer>
  );
}

// ---------- Overlays --------------------------------------------------------

function CommandPalette({ onClose, onGoto }: { onClose: () => void; onGoto: (id: string) => void; }) {
  const [q, setQ] = useState("");
  const items = [
    ...NAV_SECTIONS.map((s) => ({ label: `Go to ${s.label}`, action: () => onGoto(s.id) })),
    { label: "Open GitHub", action: () => window.open(`https://github.com/${GITHUB_STATS.handle}`, "_blank") },
    { label: "Email Prajwal", action: () => (window.location.href = "mailto:pdlkpt@gmail.com") },
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/70 px-4 pt-24 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b18]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <Search className="h-4 w-4 text-white/50" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Type a command…" className="w-full bg-transparent outline-none placeholder:text-white/40" />
          <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/60">ESC</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.map((i, idx) => (
            <li key={idx}>
              <button onClick={i.action} className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5">
                <span>{i.label}</span><ChevronRight className="h-3 w-3 text-white/30" />
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-4 text-center text-sm text-white/40">No results</li>}
        </ul>
      </div>
    </div>
  );
}



// ---------- Small helpers ---------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-[var(--accent-cyan)]/80">{children}</p>;
}

function IconBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-[var(--accent-cyan)] shadow-lg">
      {children}
    </button>
  );
}

function Chip({ href, icon: Icon, children }: { href: string; icon: LucideIcon; children: React.ReactNode }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)]">
      <Icon className="h-3.5 w-3.5" />{children}
    </a>
  );
}

function Field({ label, name, type = "text", textarea, className = "" }: { label: string; name: string; type?: string; textarea?: boolean; className?: string }) {
  const base = "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-[var(--accent-cyan)]/60";
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{label}</span>
      {textarea ? <textarea name={name} rows={5} className={base} placeholder={label} /> : <input name={name} type={type} className={base} placeholder={label} />}
    </label>
  );
}

// ---------- Background layers ----------------------------------------------

function Starfield() {
  const stars = useMemo(() => Array.from({ length: 60 }).map((_, i) => ({
    x: ((i * 9301 + 49297) % 233280) / 233280 * 100,
    y: ((i * 4831 + 12345) % 233280) / 233280 * 100,
    s: (((i * 733) % 100) / 100) * 2 + 0.5,
    d: (((i * 137) % 100) / 100) * 6 + 2,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span key={i} className="absolute rounded-full bg-white/40" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.s}px`, height: `${s.s}px`, animation: `pulse ${s.d}s ease-in-out ${i * 0.1}s infinite` }} />
      ))}
    </div>
  );
}

function FloatingIcons() {
  const items = [
    { Icon: GitBranch, x: "50%", y: "16%" },
    { Icon: Code2, x: "8%", y: "24%" },
    { Icon: TerminalIcon, x: "88%", y: "20%" },
    { Icon: Star, x: "82%", y: "72%" },
    { Icon: LayoutTemplate, x: "12%", y: "76%" },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {items.map(({ Icon, x, y }, i) => (
        <Icon key={i} className="absolute h-6 w-6 text-white/10" style={{ left: x, top: y, animation: `float ${6 + i}s ease-in-out ${i * 0.4}s infinite` }} />
      ))}
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulse { 0%,100%{opacity:.2} 50%{opacity:1} }
      `}</style>
    </div>
  );
}

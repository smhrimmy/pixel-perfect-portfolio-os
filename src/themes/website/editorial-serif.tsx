import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Feather,
  Sparkles,
  Bookmark,
  ExternalLink,
  Layers,
  RotateCcw,
  BookMarked,
  Library,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";

// Synthesized Vintage Library Audio
function playLibrarySound(type: 'page-turn' | 'book-slide' | 'wax-seal' | 'shelf-thud', isMuted: boolean) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'page-turn') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.14);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'book-slide') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'wax-seal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else {
      // Shelf thud
      osc.type = 'sine';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {}
}

export default function TheReadingRoom({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const links = (data as any)?.socialLinks || (data as any)?.links || {};
  const rawExperience = (data as any)?.experience || [];
  const rawEducation = (data as any)?.education || [];
  const rawProjects = (data as any)?.projects || (data as any)?.cmsProjects || [];

  const candidateName = profile?.name || "Prajwal DL";
  const bio =
    profile?.bio ||
    "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills. Eager to contribute to a dynamic team and support organizational goals.";
  const email = profile?.email || links?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || links?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || links?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = profile?.website || links?.website || "https://praxel.space/";
  const github = profile?.github || links?.github || "https://github.com/smhrimmy";

  // Metaphor & Interaction States
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSection, setActiveSection] = useState<"shelf" | "desk" | "chronicles" | "academy" | "letter">("shelf");
  const [shelfCategory, setShelfCategory] = useState<"all" | "fullstack" | "cloud" | "frontend">("all");

  // Dribbble Interactive Bookshelf States
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [bookPageIndex, setBookPageIndex] = useState(0); // 0 = Spread 1 (Overview), 1 = Spread 2 (Specs), 2 = Spread 3 (Links)

  // Unfolding Letter Contact State
  const [letterUnfolded, setLetterUnfolded] = useState(false);
  const [letterMessage, setLetterMessage] = useState("");

  // Custom Quill Cursor position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const libraryCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Loader dismiss
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Desktop Quill Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, [role="button"], input, textarea, .pullable-book, .bookshelf-book');
      setIsHoveringClickable(!!isClickable);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedBook) {
          setSelectedBook(null);
          playLibrarySound("shelf-thud", isMuted);
        }
        if (loading) setLoading(false);
      } else if (selectedBook) {
        if (e.key === "ArrowRight") {
          setBookPageIndex((prev) => Math.min(prev + 1, 2));
          playLibrarySound("page-turn", isMuted);
        } else if (e.key === "ArrowLeft") {
          setBookPageIndex((prev) => Math.max(prev - 1, 0));
          playLibrarySound("page-turn", isMuted);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBook, loading, isMuted]);

  // Atmospheric Lamp Light & Dust Particles Canvas
  useEffect(() => {
    if (loading) return;
    const canvas = libraryCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 900);
    let height = (canvas.height = 480);

    const motes = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: Math.random() * 0.35 + 0.1,
      alpha: Math.random() * 0.5 + 0.25,
    }));

    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Deep Oak Library Wall Gradient (#1A0F0A -> #2E1A11)
      const bg = ctx.createRadialGradient(width * 0.5, 80, 20, width * 0.5, height * 0.6, width * 0.65);
      bg.addColorStop(0, "#3A2216");
      bg.addColorStop(0.5, "#24150E");
      bg.addColorStop(1, "#150B07");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Warm Brass Lamp Spotlight Cone with micro-flicker
      const flicker = Math.sin(t * 7) * 0.03 + Math.cos(t * 11) * 0.02;
      const spot = ctx.createRadialGradient(width * 0.5, 40, 10, width * 0.5, height * 0.65, width * 0.55);
      spot.addColorStop(0, `rgba(245, 208, 140, ${0.35 + flicker})`);
      spot.addColorStop(0.4, `rgba(232, 192, 125, ${0.14 + flicker * 0.5})`);
      spot.addColorStop(1, "rgba(36, 21, 14, 0)");
      ctx.fillStyle = spot;
      ctx.fillRect(0, 0, width, height);

      // Floating Illuminated Dust Motes
      motes.forEach((m) => {
        m.x += m.speedX;
        m.y -= m.speedY;
        if (m.y < 0) m.y = height;
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 208, 140, ${m.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#F5D08C";
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 480;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  // The 6 Leather-Bound Books on the Shelf (Dribbble Interactive Bookshelf spec)
  const bookshelfBooks = [
    {
      id: "book-1",
      vol: "VOL. I",
      title: "Portfolio OS",
      subtitle: "20 Tactile Themes & Spatial OS",
      year: "2026",
      category: "fullstack",
      spineColor: "#801A1A", // Deep Crimson Leather
      spineAccent: "#D4AF37", // Gold Foil Emboss
      height: 290,
      width: 52,
      pagesCount: "340 pp.",
      pages: [
        {
          chapter: "Chapter I: Spatial Architecture",
          title: "The Problem & Spatial Metaphor",
          summary: "Modern portfolio templates have regressed into flat, indistinguishable grids. Portfolio OS was architected as a tangible operating system with 20 real-world physical metaphors, sub-100ms LCP, and a dual draft-to-live pipeline.",
          highlight: "Decoupled 3D state loops from React render cycles for reliable 60fps on mid-range devices.",
        },
        {
          chapter: "Chapter II: Technical Stack",
          title: "Engineered with TanStack & Three.js",
          summary: "Built with React 19, TypeScript, TanStack Start (SSR), Tailwind CSS, Framer Motion, and WebGL Canvas. Implemented synthesized Web Audio API soundscapes with 0 asset latency.",
          highlight: "Full Studio HQ Terminal management for real-time visitor matrix analytics and theme hot-swapping.",
        },
        {
          chapter: "Chapter III: Verification & Live Coordinates",
          title: "Live Production Deployment",
          summary: "100/100 Lighthouse Performance scores, 0 hydration warnings, zero-downtime deployment pipelines.",
          liveUrl: "https://praxel.space/",
          repoUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
        },
      ],
      tags: ["React 19", "TypeScript", "TanStack Start", "Three.js", "Tailwind CSS"],
    },
    {
      id: "book-2",
      vol: "VOL. II",
      title: "Praxel Space",
      subtitle: "Cloud Hosting & DNS Orchestrator",
      year: "2025",
      category: "cloud",
      spineColor: "#1B4332", // Forest Emerald Leather
      spineAccent: "#C5A059",
      height: 310,
      width: 56,
      pagesCount: "280 pp.",
      pages: [
        {
          chapter: "Chapter I: Cloud Infrastructure",
          title: "Automated Web Services Portal",
          summary: "Managing multi-domain DNS records, SSL certifications, and shared server migrations often introduces downtime risks. Praxel Space provides a unified diagnostics portal for mission-critical web services.",
          highlight: "Integrated automated Let's Encrypt SSL orchestration and live DNS propagation checkers.",
        },
        {
          chapter: "Chapter II: Backend & Integrations",
          title: "PHP, MySQL & Server Shell Hooks",
          summary: "Engineered high-throughput shell migration scripts, automated cPanel database backups, and client email configuration tools with 99.9% uptime SLA.",
          highlight: "Zero-downtime website transfers across shared and cloud server topologies.",
        },
        {
          chapter: "Chapter III: Production Metrics",
          title: "Operational Impact & SLA",
          summary: "Reduced client onboarding time by 65% and resolved over 1,200 hosting and server inquiries.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["DNS Management", "SSL Automation", "WordPress", "PHP", "MySQL", "cPanel"],
    },
    {
      id: "book-3",
      vol: "VOL. III",
      title: "Vitvara Web App",
      subtitle: "Scalable Reactive Frontend",
      year: "2024",
      category: "frontend",
      spineColor: "#1A365D", // Midnight Navy Leather
      spineAccent: "#E5C158",
      height: 275,
      width: 48,
      pagesCount: "220 pp.",
      pages: [
        {
          chapter: "Chapter I: User-Centric UI",
          title: "Frontend Engineering Internship",
          summary: "Engineered and developed responsive, user-centric web applications using modern React.js best practices adhering to strict performance and maintainability guidelines.",
          highlight: "Created reusable component libraries reducing UI development time by 40%.",
        },
        {
          chapter: "Chapter II: API Optimization",
          title: "REST APIs & Data Integrity",
          summary: "Designed and implemented scalable API endpoints, meticulously optimizing payload sizes and latency. Systematically tested with automated suites to eliminate regressions.",
          highlight: "Verified cross-browser compatibility across Chrome, Safari, Firefox, and mobile engines.",
        },
        {
          chapter: "Chapter III: Reliability",
          title: "Quality Assurance & Outcomes",
          summary: "Zero high-priority regression tickets during release cycles and elevated user satisfaction ratings.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    },
    {
      id: "book-4",
      vol: "VOL. IV",
      title: "Client Platforms",
      subtitle: "Bespoke CMS & Web Engineering",
      year: "2025",
      category: "fullstack",
      spineColor: "#7B341E", // Cognac Leather
      spineAccent: "#D4AF37",
      height: 295,
      width: 50,
      pagesCount: "310 pp.",
      pages: [
        {
          chapter: "Chapter I: Freelance Solutions",
          title: "Bespoke Web Development",
          summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies tailored to bespoke business requirements.",
          highlight: "Delivered responsive, high-converting digital storefronts and corporate landing pages.",
        },
        {
          chapter: "Chapter II: Modular Systems",
          title: "Component Reusability & Node.js",
          summary: "Crafted modular component suites with React, Node.js, and custom WordPress themes, integrating secure contact pipelines and payment gateways.",
          highlight: "Optimized Core Web Vitals to achieve sub-1.2s Largest Contentful Paint.",
        },
        {
          chapter: "Chapter III: Deployments",
          title: "Client Success & Handover",
          summary: "Seamless deployments with client handover documentation, admin dashboards, and ongoing maintenance.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["React.js", "Node.js", "WordPress", "UI/UX Design", "MySQL"],
    },
    {
      id: "book-5",
      vol: "VOL. V",
      title: "Full Stack Matrix",
      subtitle: "Karnataka Polytechnic Diploma",
      year: "2024",
      category: "frontend",
      spineColor: "#4A154B", // Royal Purple Leather
      spineAccent: "#E5C158",
      height: 285,
      width: 46,
      pagesCount: "190 pp.",
      pages: [
        {
          chapter: "Chapter I: Academic Rigor",
          title: "Diploma in Full Stack Development",
          summary: "Graduated May 2024 from Karnataka (Govt) Polytechnic, Mangalore. Comprehensive mastery over software engineering fundamentals, database structures, and web technologies.",
          highlight: "Honors coursework in Algorithms, Full Stack Systems, and Network Administration.",
        },
        {
          chapter: "Chapter II: Applied Engineering",
          title: "Hands-on Capstones & Projects",
          summary: "Built end-to-end full stack web platforms with relational databases, user authentication, and responsive interfaces.",
          highlight: "Developed strong collaborative foundation in team problem-solving and rapid prototyping.",
        },
        {
          chapter: "Chapter III: Foundations",
          title: "Continuous Learning Attitude",
          summary: "Proactive problem solver eager to contribute to forward-thinking engineering teams.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["Full Stack", "Data Structures", "Algorithms", "PHP & MySQL", "JavaScript"],
    },
    {
      id: "book-6",
      vol: "VOL. VI",
      title: "Support Operations",
      subtitle: "Glowtouch & Unifycx Logs",
      year: "2024-25",
      category: "cloud",
      spineColor: "#2D3142", // Antique Charcoal Leather
      spineAccent: "#D4AF37",
      height: 305,
      width: 54,
      pagesCount: "260 pp.",
      pages: [
        {
          chapter: "Chapter I: Technical Advisory",
          title: "Unifycx Web Advisor Experience",
          summary: "Assisting customers with website migrations, SSL installations, email configurations, and hosting control panel issues in shared hosting environments.",
          highlight: "Resolved hundreds of complex server, DNS, and WordPress configuration challenges.",
        },
        {
          chapter: "Chapter II: Live Support Engineering",
          title: "Glowtouch Technologies Support",
          summary: "Provided live chat support for hosting, domain, server, DNS, and website-related issues with swift first-contact resolution.",
          highlight: "Diagnosed PHP runtime errors, MySQL database corruptions, and SSL handshake failures.",
        },
        {
          chapter: "Chapter III: Operational Excellence",
          title: "Communication & Documentation",
          summary: "Authored support documentation and streamlined troubleshooting playbooks for technical support teams.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["Technical Troubleshooting", "DNS", "SSL", "WordPress", "Server Infrastructure"],
    },
  ];

  const filteredBooks = bookshelfBooks.filter(
    (b) => shelfCategory === "all" || b.category === shelfCategory
  );

  // Real Experience from Resume
  const displayExperience = rawExperience.length > 0 ? rawExperience : [
    {
      company: "Unifycx",
      role: "Web Advisor",
      startDate: "Jun 2025",
      endDate: "Present",
      location: "Mangalore, Karnataka",
      summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
      highlights: [
        "Provided technical support for WordPress, CMS platforms, hosting, DNS, email services, and website-related issues in shared hosting environments.",
        "Collaborated with teams, documented support interactions, and resolved customer issues through effective troubleshooting and communication.",
      ],
      tech: ["WordPress", "DNS Management", "SSL Installations", "Hosting Control Panels"],
    },
    {
      company: "Freelancer",
      role: "Full Stack Web Developer & Designer",
      startDate: "Dec 2024",
      endDate: "Jun 2025",
      location: "Mangalore",
      summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
      highlights: [
        "Delivered responsive, performance-focused, and user-friendly solutions while improving applications through user feedback and continuous enhancements.",
      ],
      tech: ["React.js", "TypeScript", "Tailwind CSS", "PHP", "MySQL", "UI/UX Design"],
    },
    {
      company: "Glowtouch Technologies",
      role: "Junior Support Engineer",
      startDate: "Aug 2024",
      endDate: "Dec 2024",
      location: "Mangalore",
      summary: "Provided live chat support for hosting, domain, and website-related issues.",
      highlights: [
        "Troubleshot WordPress, PHP, MySQL, server, DNS, email, and website migration issues.",
        "Assisted customers with technical configurations and ensured smooth issue resolution.",
      ],
      tech: ["Technical Troubleshooting", "WordPress", "PHP", "MySQL", "Server Infrastructure"],
    },
    {
      company: "Vitvara Technologies",
      role: "Web Developer Intern",
      startDate: "Jan 2024",
      endDate: "May 2024",
      location: "Mangalore",
      summary: "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js.",
      highlights: [
        "Designed and implemented scalable API functionalities, meticulously optimizing code for enhanced performance, maintainability, and security.",
        "Systematically debugged and tested applications, leading to enhanced software reliability.",
      ],
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    },
  ];

  // Real Education
  const displayEducation = rawEducation.length > 0 ? rawEducation : [
    {
      institution: "Karnataka (Govt) Polytechnic, Mangalore, Karnataka",
      degree: "Diploma: Full Stack Development",
      graduationDate: "May 2024",
      location: "Mangalore, Karnataka",
    },
    {
      institution: "Milagres High School, Mangalore",
      degree: "10th High School",
      graduationDate: "May 2018",
      location: "Mangalore",
    },
  ];

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    playLibrarySound("wax-seal", isMuted);
    const subject = encodeURIComponent(`Portfolio Inquiry from The Reading Room for ${candidateName}`);
    const body = encodeURIComponent(
      letterMessage ||
        "Hello Prajwal, I inspected your interactive bookshelf portfolio and would like to connect regarding an engineering opportunity."
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#180E09] text-[#E8C07D] font-serif overflow-x-hidden selection:bg-[#E8C07D] selection:text-[#180E09]">
      {/* 1. CUSTOM DESKTOP QUILL CURSOR */}
      <div
        className="hidden md:block pointer-events-none fixed z-50 transition-transform duration-75"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: `translate(-4px, -24px) rotate(${isHoveringClickable ? "18deg" : "0deg"})`,
        }}
      >
        <Feather className="w-6 h-6 text-[#E8C07D] drop-shadow-[0_2px_8px_rgba(232,192,125,0.6)]" />
      </div>

      {/* 2. ACCESSIBILITY SKIP LINK */}
      <a
        href="#interactive-shelf"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#E8C07D] text-black font-sans font-bold text-xs rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E8C07D]"
      >
        Skip 3D experience to bookshelf
      </a>

      {/* 3. 3D-HINGED BOOK-COVER LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#120905] flex flex-col items-center justify-center p-6 text-center"
            style={{ perspective: 1200 }}
          >
            <div className="relative w-64 h-84 sm:w-72 sm:h-96 rounded-r-2xl border-4 border-[#4A2E1F] bg-[#2E1C13] shadow-[0_30px_70px_rgba(0,0,0,0.95)] p-6 flex flex-col justify-between text-left">
              <div className="border-2 border-[#E8C07D]/40 p-4 h-full rounded-r-xl flex flex-col justify-between bg-[#1F120B]">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#A8805F] uppercase tracking-widest block">EX LIBRIS · 2026</span>
                  <h2 className="text-2xl font-bold text-[#E8C07D] tracking-wide uppercase">{candidateName}</h2>
                  <p className="text-xs text-[#C9A98B] italic">The Interactive Bookshelf</p>
                </div>

                <div className="space-y-2 border-t border-[#4A2E1F] pt-4">
                  <div className="flex items-center gap-2 text-xs text-[#E8C07D]">
                    <Bookmark className="w-4 h-4 text-[#E8C07D]" />
                    <span className="font-mono text-[10px]">OPENING LIBRARY CATALOG...</span>
                  </div>
                  <button
                    onClick={() => setLoading(false)}
                    className="text-[10px] font-mono text-[#A8805F] underline hover:text-[#E8C07D] block"
                  >
                    [Press ESC or Tap to Skip]
                  </button>
                </div>
              </div>

              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -140 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 rounded-r-2xl border-4 border-[#4A2E1F] bg-[#3A2419] shadow-2xl p-6 flex flex-col justify-between backface-hidden"
              >
                <div className="border-2 border-[#E8C07D] p-4 h-full rounded-r-xl flex flex-col justify-center items-center text-center space-y-3 bg-[#24150E]">
                  <BookOpen className="w-12 h-12 text-[#E8C07D]" />
                  <h3 className="text-lg font-bold text-[#E8C07D] uppercase">{candidateName}</h3>
                  <p className="text-[10px] font-mono text-[#A8805F]">INTERACTIVE 3D BOOKSHELF</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. RIGHT-EDGE SILK RIBBON-TAB NAVIGATION */}
      <nav
        aria-label="Chapter bookmarks"
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pr-1 pointer-events-auto"
      >
        {[
          { id: "shelf", label: "Ch. I: The Bookshelf", icon: Library, href: "#interactive-shelf" },
          { id: "chronicles", label: "Ch. II: Chronicles", icon: Briefcase, href: "#chronicles" },
          { id: "academy", label: "Ch. III: Academy", icon: GraduationCap, href: "#academy" },
          { id: "letter", label: "Ch. IV: The Letter", icon: Mail, href: "#letter-desk" },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={() => {
                setActiveSection(tab.id as any);
                playLibrarySound("page-turn", isMuted);
              }}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-l-2xl border-l-2 border-y-2 transition-all shadow-xl font-mono text-xs ${
                isActive
                  ? "bg-[#6B1D1D] border-[#E8C07D] text-[#E8C07D] translate-x-0 shadow-[0_0_20px_rgba(232,192,125,0.3)]"
                  : "bg-[#3D1212] border-[#4A2E1F] text-[#C9A98B] translate-x-12 hover:translate-x-0"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 shrink-0 text-[#E8C07D]" />
              <span className="whitespace-nowrap font-bold">{tab.label}</span>
            </a>
          );
        })}
      </nav>

      {/* 5. TOP MAHOGANY & BRASS HEADER */}
      <header className="border-b border-[#3E2619] bg-[#22130C]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#E8C07D] text-[#180E09] flex items-center justify-center font-bold shadow-[0_0_20px_rgba(232,192,125,0.3)]">
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#FAF2E8] tracking-wider uppercase">{candidateName}</span>
              <span className="text-[10px] text-[#C9A98B] block font-mono -mt-0.5">INTERACTIVE BOOKSHELF · THE READING ROOM</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-[#A8805F]">
            <a href="#interactive-shelf" className="hover:text-[#E8C07D] transition">3D Bookshelf</a>
            <a href="#chronicles" className="hover:text-[#E8C07D] transition">Career Chronicles</a>
            <a href="#academy" className="hover:text-[#E8C07D] transition">Academy</a>
            <a href="#letter-desk" className="hover:text-[#E8C07D] transition">Wax Letter</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playLibrarySound("shelf-thud", !isMuted);
              }}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="h-8 w-8 rounded-full border border-[#4A2E1F] bg-[#180E09] text-[#E8C07D] flex items-center justify-center hover:bg-[#3E2619] transition"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <Button asChild size="sm" className="bg-[#E8C07D] text-[#180E09] hover:bg-[#E8C07D]/90 font-serif font-bold text-xs h-8 rounded-full px-4 shadow">
              <a href="#letter-desk">Unfold Letter</a>
            </Button>
          </div>
        </div>
      </header>

      {/* 6. DRIBBLE-STYLE INTERACTIVE 3D BOOKSHELF HERO SECTION */}
      <main id="main-content">
        <section id="interactive-shelf" className="py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
          {/* Header & Bio */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8C07D]/40 bg-[#E8C07D]/10 text-xs font-mono text-[#E8C07D]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE ARCHIVE COLLECTION · HOVER A SPINE &amp; CLICK TO OPEN</span>
            </div>

            <h1 className="text-4xl sm:text-6xl text-[#FAF2E8] font-normal leading-[1.1]">
              {candidateName} <br />
              <span className="italic text-[#E8C07D]">Interactive Library of Works</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#C9A98B] font-sans leading-relaxed max-w-2xl mx-auto">
              {bio}
            </p>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {[
                { id: "all", label: "All Volumes" },
                { id: "fullstack", label: "Full Stack & OS" },
                { id: "cloud", label: "Cloud & DNS" },
                { id: "frontend", label: "Frontend & UI" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setShelfCategory(cat.id as any);
                    playLibrarySound("page-turn", isMuted);
                  }}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono transition ${
                    shelfCategory === cat.id
                      ? "bg-[#E8C07D] text-[#180E09] font-bold shadow-[0_0_15px_rgba(232,192,125,0.3)]"
                      : "bg-[#2E1C13] text-[#C9A98B] border border-[#4A2E1F] hover:border-[#E8C07D]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* THE 3D BOOKSHELF CONTAINER */}
          <div className="relative rounded-3xl border-4 border-[#4A2E1F] bg-[#1F120B] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.98)] p-6 sm:p-10">
            {/* Background Canvas: Lamp Cone & Dust Particles */}
            <canvas ref={libraryCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80" />

            {/* Bookshelf Wooden Structure */}
            <div className="relative z-10 space-y-12">
              {/* Shelf Top Title */}
              <div className="flex justify-between items-center text-xs font-mono text-[#A8805F] border-b border-[#3E2619] pb-3">
                <span className="flex items-center gap-2">
                  <Library className="w-4 h-4 text-[#E8C07D]" />
                  <span>MAHOGANY SHELF · SECTION 01</span>
                </span>
                <span className="text-[#E8C07D]">HOVER TO PULL · CLICK TO INSPECT 3D FOLIO</span>
              </div>

              {/* THE 3D BOOKS ROW ON THE SHELF */}
              <div
                className="flex items-end justify-center gap-3 sm:gap-6 pt-10 pb-4 min-h-[360px] overflow-x-auto px-4"
                style={{ perspective: 1200 }}
              >
                {filteredBooks.map((book, idx) => {
                  const isHovered = hoveredBookId === book.id;
                  const isSelected = selectedBook?.id === book.id;

                  return (
                    <div
                      key={book.id}
                      onMouseEnter={() => {
                        setHoveredBookId(book.id);
                        playLibrarySound("book-slide", isMuted);
                      }}
                      onMouseLeave={() => setHoveredBookId(null)}
                      onClick={() => {
                        setSelectedBook(book);
                        setBookPageIndex(0);
                        playLibrarySound("page-turn", isMuted);
                      }}
                      className="relative shrink-0 cursor-pointer bookshelf-book group"
                      style={{
                        height: `${book.height}px`,
                        width: `${book.width}px`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {/* 3D BOOK SPINE */}
                      <motion.div
                        animate={{
                          y: isHovered ? -24 : 0,
                          z: isHovered ? 45 : 0,
                          rotateY: isHovered ? -12 : 0,
                          rotateZ: isHovered ? 1.5 : 0,
                        }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="w-full h-full rounded-t-sm shadow-2xl flex flex-col justify-between p-2 relative select-none border-t border-x border-[#FAF2E8]/20"
                        style={{
                          backgroundColor: book.spineColor,
                          boxShadow: isHovered
                            ? "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(232,192,125,0.4)"
                            : "0 10px 25px -5px rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {/* Gold Foil Top Band */}
                        <div className="border-t-2 border-b-2 border-[#E8C07D]/60 py-1 text-center">
                          <span className="text-[9px] font-mono font-bold text-[#E8C07D] block leading-none">
                            {book.vol}
                          </span>
                        </div>

                        {/* Vertical Title (Embossed Gilt Lettering) */}
                        <div className="flex-1 flex items-center justify-center py-2 overflow-hidden">
                          <span
                            className="font-bold text-xs sm:text-sm text-[#FAF2E8] tracking-widest uppercase whitespace-nowrap"
                            style={{
                              writingMode: "vertical-rl",
                              transform: "rotate(180deg)",
                              textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                            }}
                          >
                            {book.title}
                          </span>
                        </div>

                        {/* Bottom Metadata & Year */}
                        <div className="border-t border-[#E8C07D]/40 pt-1 text-center">
                          <span className="text-[8px] font-mono text-[#E8C07D]/80 block">
                            {book.year}
                          </span>
                        </div>

                        {/* Spine Ribbon Indicator on Hover */}
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#E8C07D] text-[#180E09] px-2 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap shadow-lg"
                          >
                            OPEN FOLIO
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Wooden Shelf Contact Shadow */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-3 bg-black/60 blur-sm rounded-full transition-all duration-300"
                        style={{
                          transform: isHovered ? "scale(1.3) translateY(12px)" : "scale(1)",
                          opacity: isHovered ? 0.3 : 0.7,
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* HEAVY SOLID WOOD SHELF PLANK */}
              <div className="relative h-6 rounded-md bg-gradient-to-r from-[#2A170E] via-[#3E2417] to-[#2A170E] border-t-2 border-[#5C3925] shadow-[0_15px_30px_rgba(0,0,0,0.9)] flex items-center justify-between px-6">
                <span className="text-[9px] font-mono text-[#8C5D3D]">SOLID WALNUT PLANK · 3.5 CM</span>
                <span className="text-[9px] font-mono text-[#8C5D3D]">LOAD CAPACITY: 20 VOLUMES</span>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CAREER CHRONICLES (CHAPTER II) */}
        <section id="chronicles" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3E2619] space-y-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C07D]">CHAPTER II · WORK HISTORY</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Professional Chronicles</h2>
          </div>

          <div className="space-y-6">
            {displayExperience.map((exp: any, idx: number) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border-2 border-[#3E2619] bg-[#22130C] hover:border-[#E8C07D] transition shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3E2619] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#FAF2E8]">
                      {exp.role} <span className="text-[#E8C07D]">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs font-mono text-[#A8805F] mt-0.5">{exp.location || "Mangalore, Karnataka"}</p>
                  </div>
                  <span className="text-xs font-mono text-[#E8C07D] px-3 py-1 rounded-full bg-[#180E09] border border-[#3E2619] self-start sm:self-auto">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#C9A98B] font-sans leading-relaxed">
                  {exp.summary}
                </p>

                {exp.highlights && (
                  <ul className="space-y-2 pt-2 font-sans text-xs text-[#C9A98B]">
                    {exp.highlights.map((h: string, hIdx: number) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E8C07D] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {exp.tech && (
                  <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-[#E8C07D]">
                    {exp.tech.map((t: string) => (
                      <span key={t} className="px-2.5 py-1 rounded bg-[#180E09] border border-[#3E2619]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. ACADEMY & CREDENTIALS (CHAPTER III) */}
        <section id="academy" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3E2619] space-y-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C07D]">CHAPTER III · ACADEMIC CREDENTIALS</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Education &amp; Qualifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayEducation.map((edu: any, idx: number) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border-2 border-[#3E2619] bg-[#22130C] hover:border-[#E8C07D] transition shadow-xl space-y-3"
              >
                <div className="flex items-center gap-3 text-[#E8C07D]">
                  <GraduationCap className="h-6 w-6" />
                  <span className="text-xs font-mono font-bold uppercase">{edu.graduationDate || "Graduated"}</span>
                </div>
                <h3 className="text-xl font-bold text-[#FAF2E8]">{edu.degree}</h3>
                <p className="text-sm text-[#C9A98B] font-sans">{edu.institution}</p>
                <p className="text-xs text-[#A8805F] font-mono">{edu.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 9. WAX-SEALED CONTACT LETTER (CHAPTER IV) */}
        <section id="letter-desk" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3E2619] text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C07D]">CHAPTER IV · CORRESPONDENCE</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8]">Wax-Sealed Parchment Letter</h2>
            <p className="text-xs sm:text-sm text-[#C9A98B] font-sans">
              Click the crimson wax seal to unfold the parchment letter and dispatch correspondence to {candidateName}.
            </p>
          </div>

          <div className="max-w-xl mx-auto rounded-3xl border-4 border-[#3E2619] bg-[#180E09] p-8 shadow-2xl space-y-6">
            {!letterUnfolded ? (
              <div className="space-y-6 py-8">
                <div
                  className="w-20 h-20 mx-auto rounded-full bg-[#6B1D1D] border-4 border-[#E8C07D] flex items-center justify-center text-[#E8C07D] shadow-[0_0_30px_rgba(232,192,125,0.4)] cursor-pointer hover:scale-105 transition"
                  onClick={() => {
                    setLetterUnfolded(true);
                    playLibrarySound("wax-seal", isMuted);
                  }}
                >
                  <Mail className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-[#FAF2E8]">Sealed Diplomatic Dispatch</h4>
                  <p className="text-xs font-mono text-[#A8805F]">CLICK TO BREAK RED WAX SEAL &amp; UNFOLD</p>
                </div>
                <Button
                  onClick={() => {
                    setLetterUnfolded(true);
                    playLibrarySound("wax-seal", isMuted);
                  }}
                  className="bg-[#E8C07D] text-[#180E09] hover:bg-white font-bold text-xs rounded-full px-6"
                >
                  Break Wax Seal
                </Button>
              </div>
            ) : (
              <motion.form
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onSubmit={handleSendLetter}
                className="text-left space-y-4 pt-2"
              >
                <div className="flex justify-between items-center text-xs font-mono text-[#A8805F] border-b border-[#3E2619] pb-3">
                  <span>UNFOLDED CORRESPONDENCE DISPATCH</span>
                  <span className="text-[#E8C07D]">TO: {candidateName}</span>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-[#E8C07D] block">Your Message / Brief:</label>
                  <textarea
                    rows={4}
                    value={letterMessage}
                    onChange={(e) => setLetterMessage(e.target.value)}
                    placeholder="Inquire regarding web advisory, full stack engineering, or hosting support..."
                    className="w-full rounded-xl border border-[#3E2619] bg-[#22130C] p-4 text-xs font-sans text-[#FAF2E8] placeholder:text-[#A8805F] focus:outline-none focus:border-[#E8C07D]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xs font-mono text-[#A8805F]">
                    <span>DIRECT INBOX: {email}</span>
                  </div>

                  <Button
                    type="submit"
                    className="bg-[#6B1D1D] text-[#E8C07D] border border-[#E8C07D] hover:bg-[#8A2424] font-serif font-bold text-xs rounded-full px-6 shadow-xl"
                  >
                    Stamp Wax Seal &amp; Dispatch
                  </Button>
                </div>
              </motion.form>
            )}
          </div>

          <div className="pt-8 border-t border-[#3E2619] text-xs font-mono text-[#A8805F] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
            <span>© {new Date().getFullYear()} {candidateName} · {location}</span>
            <div className="flex items-center gap-6">
              <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
              <a href={website} target="_blank" rel="noreferrer" className="hover:text-white transition">Website</a>
              <a href={github} target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      {/* 10. DRIBBLE-STYLE OPEN BOOK INSPECTION STAND (3D DOUBLE-PAGE SPREAD) */}
      <AnimatePresence>
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="max-w-4xl w-full rounded-3xl border-4 border-[#E8C07D] bg-[#2A170E] p-6 sm:p-10 text-[#FAF2E8] space-y-6 relative shadow-[0_0_90px_rgba(232,192,125,0.45)]"
              style={{ perspective: 1200 }}
            >
              {/* Return to Shelf Button */}
              <button
                onClick={() => {
                  setSelectedBook(null);
                  playLibrarySound("shelf-thud", isMuted);
                }}
                className="absolute top-5 right-5 h-9 w-9 rounded-full border border-[#4A2E1F] bg-[#180E09] text-[#E8C07D] flex items-center justify-center hover:bg-[#3E2619] transition"
                title="Return Volume to Shelf [ESC]"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Book Header / Volume Badge */}
              <div className="flex items-center justify-between border-b border-[#4A2E1F] pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-10 rounded-sm border border-[#E8C07D]/50 shadow-md flex items-center justify-center text-[10px] font-mono text-[#E8C07D] font-bold"
                    style={{ backgroundColor: selectedBook.spineColor }}
                  >
                    {selectedBook.vol.split(" ")[1]}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#A8805F] uppercase">
                      {selectedBook.vol} · {selectedBook.pagesCount} · {selectedBook.year}
                    </span>
                    <h2 className="text-2xl font-bold text-[#E8C07D]">{selectedBook.title}</h2>
                  </div>
                </div>

                <span className="text-xs font-mono text-[#A8805F]">
                  Spread {bookPageIndex + 1} of 3
                </span>
              </div>

              {/* 3D DOUBLE-PAGE SPREAD CONTENT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1F120B] p-6 sm:p-8 rounded-2xl border-2 border-[#4A2E1F] shadow-inner relative overflow-hidden">
                {/* Book Center Binding Crease Line */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/40 via-black/80 to-black/40 pointer-events-none" />

                {/* Left Page */}
                <div className="space-y-4 pr-0 md:pr-4">
                  <div className="border-b border-[#3E2619] pb-2">
                    <span className="text-[10px] font-mono text-[#A8805F] uppercase">
                      {selectedBook.pages[bookPageIndex]?.chapter}
                    </span>
                    <h3 className="text-lg font-bold text-[#E8C07D]">
                      {selectedBook.pages[bookPageIndex]?.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#C9A98B] font-sans leading-relaxed">
                    {selectedBook.pages[bookPageIndex]?.summary}
                  </p>
                </div>

                {/* Right Page */}
                <div className="space-y-4 pl-0 md:pl-4 flex flex-col justify-between">
                  <div className="p-4 rounded-xl bg-[#28160E] border border-[#3E2619] space-y-2">
                    <span className="text-[10px] font-mono text-[#E8C07D] font-bold block uppercase">
                      KEY ARCHITECTURAL HIGHLIGHT:
                    </span>
                    <p className="text-xs text-[#FAF2E8] font-sans italic">
                      "{selectedBook.pages[bookPageIndex]?.highlight}"
                    </p>
                  </div>

                  {/* Tech Stack or Action Links */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {selectedBook.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded bg-[#180E09] border border-[#4A2E1F] text-[10px] font-mono text-[#E8C07D]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {selectedBook.pages[bookPageIndex]?.liveUrl && (
                      <div className="pt-2 flex gap-3">
                        <Button asChild size="sm" className="bg-[#E8C07D] text-[#180E09] hover:bg-white font-bold text-xs rounded-full">
                          <a href={selectedBook.pages[bookPageIndex].liveUrl} target="_blank" rel="noreferrer">
                            Launch Project <ExternalLink className="w-3.5 h-3.5 ml-1" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Page Turn Controls & Return Shelf */}
              <div className="pt-2 border-t border-[#4A2E1F] flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={bookPageIndex === 0}
                  onClick={() => {
                    setBookPageIndex((prev) => Math.max(prev - 1, 0));
                    playLibrarySound("page-turn", isMuted);
                  }}
                  className="border-[#4A2E1F] text-[#E8C07D] hover:bg-[#1F120B] text-xs rounded-full px-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous Spread
                </Button>

                <div className="flex items-center gap-2">
                  {[0, 1, 2].map((idx) => (
                    <span
                      key={idx}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        bookPageIndex === idx ? "bg-[#E8C07D] scale-125" : "bg-[#4A2E1F]"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={bookPageIndex === 2}
                    onClick={() => {
                      setBookPageIndex((prev) => Math.min(prev + 1, 2));
                      playLibrarySound("page-turn", isMuted);
                    }}
                    className="border-[#4A2E1F] text-[#E8C07D] hover:bg-[#1F120B] text-xs rounded-full px-4"
                  >
                    Next Spread <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedBook(null);
                      playLibrarySound("shelf-thud", isMuted);
                    }}
                    className="bg-[#3E2619] hover:bg-[#4A2E1F] text-[#E8C07D] text-xs rounded-full px-4"
                  >
                    Return to Shelf
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

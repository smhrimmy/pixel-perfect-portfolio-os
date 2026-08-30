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
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";

// Synthesized Vintage Library Audio
function playLibrarySound(type: 'page-turn' | 'book-slide' | 'wax-seal' | 'lamp-click', isMuted: boolean) {
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
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'book-slide') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'wax-seal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(850, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    }
  } catch {}
}

export default function TheReadingRoom({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const links = (data as any)?.socialLinks || (data as any)?.links || {};
  const rawExperience = (data as any)?.experience || [];
  const rawSkills = (data as any)?.skills || [];
  const rawEducation = (data as any)?.education || [];
  const rawProjects = (data as any)?.projects || (data as any)?.cmsProjects || [];

  const candidateName = profile?.name || "Prajwal DL";
  const bio =
    profile?.bio ||
    (data as any)?.hero?.sub ||
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
  const [activeSection, setActiveSection] = useState<"desk" | "shelf" | "chronicles" | "academy" | "letter">("desk");
  const [hoveredRibbon, setHoveredRibbon] = useState<string | null>(null);

  // 3D Pullable Project Book Modal State
  const [openedBook, setOpenedBook] = useState<any | null>(null);
  const [bookPageIndex, setBookPageIndex] = useState(0); // 0 = Overview, 1 = Architecture, 2 = Results

  // Unfolding Letter Contact State
  const [letterUnfolded, setLetterUnfolded] = useState(false);
  const [letterMessage, setLetterMessage] = useState("");

  // Custom Quill Cursor position
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const libraryCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Loader dismiss
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  // Desktop Quill Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const isClickable = target.closest('button, a, [role="button"], input, textarea, .pullable-book');
      setIsHoveringClickable(!!isClickable);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard navigation for folio page turns and escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openedBook) {
          setOpenedBook(null);
          playLibrarySound("book-slide", isMuted);
        }
        if (loading) setLoading(false);
      } else if (openedBook) {
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
  }, [openedBook, loading, isMuted]);

  // Atmospheric Library 3D Canvas with Flickering Desk Lamp & Floating Dust Motes
  useEffect(() => {
    if (loading) return;
    const canvas = libraryCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const motes = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.7,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: Math.random() * 0.35 + 0.1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let t = 0;

    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Deep Mahogany Background (#3A2419)
      const roomGrad = ctx.createLinearGradient(0, 0, 0, height);
      roomGrad.addColorStop(0, "#1F120B");
      roomGrad.addColorStop(0.5, "#3A2419");
      roomGrad.addColorStop(1, "#180E08");
      ctx.fillStyle = roomGrad;
      ctx.fillRect(0, 0, width, height);

      // Bookshelf Wood Beams in Background Perspective
      ctx.strokeStyle = "rgba(107, 74, 52, 0.4)";
      ctx.lineWidth = 4;
      for (let y = 60; y < height; y += 90) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        // Books on shelf
        for (let x = 30; x < width - 30; x += 22) {
          const bookH = 45 + Math.sin(x * 0.1) * 15;
          ctx.fillStyle = (x % 3 === 0) ? "#6B4A34" : (x % 2 === 0) ? "#4A2E1F" : "#2E1C13";
          ctx.fillRect(x, y - bookH, 18, bookH);
          ctx.fillStyle = "rgba(232, 192, 125, 0.3)";
          ctx.fillRect(x + 2, y - bookH + 4, 14, 2);
        }
      }

      // Warm Brass Lamp Glow with Micro-Flicker (#E8C07D)
      const flicker = Math.sin(t * 8) * 0.03 + Math.cos(t * 13) * 0.02;
      const lampGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        20,
        width * 0.5,
        height * 0.7,
        width * 0.55
      );
      lampGlow.addColorStop(0, `rgba(232, 192, 125, ${0.32 + flicker})`);
      lampGlow.addColorStop(0.5, `rgba(232, 192, 125, ${0.12 + flicker * 0.5})`);
      lampGlow.addColorStop(1, "rgba(58, 36, 25, 0.0)");
      ctx.fillStyle = lampGlow;
      ctx.fillRect(0, 0, width, height);

      // Floating Illuminated Dust Motes in Lamp Beam
      motes.forEach((m) => {
        m.x += m.speedX;
        m.y -= m.speedY;
        if (m.y < 0) m.y = height;
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 192, 125, ${m.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#E8C07D";
        ctx.fill();
      });

      // Desk Surface Shadow
      const deskShadow = ctx.createLinearGradient(0, height - 80, 0, height);
      deskShadow.addColorStop(0, "rgba(0,0,0,0)");
      deskShadow.addColorStop(1, "rgba(18, 10, 6, 0.95)");
      ctx.fillStyle = deskShadow;
      ctx.fillRect(0, height - 80, width, 80);

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [loading]);

  // Real 4 Projects formatted as Library Folios
  const folios = [
    {
      id: "folio-1",
      vol: "VOL. I",
      spineColor: "#6B1D1D", // Deep Crimson Leather
      title: "Portfolio OS · 20 Tactile Themes",
      subtitle: "Personal Operating System & WebGL Engine",
      pages: [
        {
          title: "Chapter 1: The Vision & Constraints",
          content: "Traditional developer portfolios act merely as static CVs. Portfolio OS was architected as a tangible living system demonstrating deep spatial engineering with 20 real-world physical metaphors, sub-100ms LCP, and a dual draft-to-live pipeline.",
        },
        {
          title: "Chapter 2: Architecture & Spatial Systems",
          content: "Engineered with React, TypeScript, TanStack Start, Tailwind CSS, and WebGL. Decoupled 3D state from React render loops via requestAnimationFrame to ensure smooth 60fps across mobile and desktop devices.",
        },
        {
          title: "Chapter 3: Verification & Live Coordinates",
          content: "Achieved 100/100 Lighthouse Performance scores, 0 hydration warnings, full Studio Admin controls, and dynamic theme switching.",
          liveUrl: "https://praxel.space/",
          repoUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
        },
      ],
      tags: ["React", "TypeScript", "Three.js", "TanStack Start"],
    },
    {
      id: "folio-2",
      vol: "VOL. II",
      spineColor: "#1E3F20", // Forest Green Leather
      title: "Praxel Space Cloud Platform",
      subtitle: "Web Hosting, DNS & SSL Orchestration",
      pages: [
        {
          title: "Chapter 1: Infrastructure Challenge",
          content: "Managing multi-domain DNS records, SSL certifications, and shared server migrations often introduces downtime risks. Praxel Space provides an automated, unified diagnostic portal for mission-critical web services.",
        },
        {
          title: "Chapter 2: Technical Execution",
          content: "Built with PHP, MySQL, Linux shell automations, and cPanel API hooks. Enables instant DNS health propagation checks, automated Let's Encrypt certificate renewal, and streamlined WordPress database migration scripts.",
        },
        {
          title: "Chapter 3: Production Impact",
          content: "Zero-downtime website transfers, 99.9% uptime SLA monitoring, and simplified control panels for clients across shared and cloud hosting environments.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["WordPress", "DNS Management", "PHP", "MySQL", "SSL"],
    },
    {
      id: "folio-3",
      vol: "VOL. III",
      spineColor: "#1A2E40", // Midnight Navy Leather
      title: "Vitvara Scalable Web App",
      subtitle: "User-Centric Frontend Engineering",
      pages: [
        {
          title: "Chapter 1: Engineering Scope",
          content: "Developed responsive, user-centric web applications using modern React.js best practices adhering to strict performance and maintainability guidelines during internship tenure.",
        },
        {
          title: "Chapter 2: Scalable API Implementation",
          content: "Designed and implemented scalable API endpoints, meticulously optimizing payload sizes and latency. Systematically tested with automated suites to eliminate regressions.",
        },
        {
          title: "Chapter 3: Outcomes & Reliability",
          content: "Significant reduction in reported runtime bugs, verified cross-browser compatibility, and elevated user experience ratings.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    },
    {
      id: "folio-4",
      vol: "VOL. IV",
      spineColor: "#5C3A21", // Antique Tan Leather
      title: "Custom Client Web Platforms",
      subtitle: "Bespoke Web Engineering & CMS",
      pages: [
        {
          title: "Chapter 1: Freelance Client Briefs",
          content: "Architected and delivered custom websites and web applications tailored to bespoke business requirements, prioritizing fast page speeds and clean editorial aesthetics.",
        },
        {
          title: "Chapter 2: Responsive Modular Systems",
          content: "Crafted reusable component libraries with React, Node.js, and custom WordPress themes, integrating secure contact pipelines and payment gateways.",
        },
        {
          title: "Chapter 3: Client Satisfaction",
          content: "Delivered responsive, high-converting digital storefronts and portfolios with ongoing technical support and continuous enhancements.",
          liveUrl: "https://praxel.space/",
        },
      ],
      tags: ["React.js", "Node.js", "WordPress", "UI/UX Design"],
    },
  ];

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
    const body = encodeURIComponent(letterMessage || "Hello Prajwal, I reviewed your reading room portfolio and would like to connect regarding an engineering opportunity.");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#24150E] text-[#E8C07D] font-serif overflow-x-hidden selection:bg-[#E8C07D] selection:text-[#24150E]">
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
        href="#desk-book"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#E8C07D] text-black font-sans font-bold text-xs rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-[#E8C07D]"
      >
        Skip 3D experience to reading desk
      </a>

      {/* 3. 3D-HINGED BOOK-COVER LOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#160D08] flex flex-col items-center justify-center p-6 text-center"
            style={{ perspective: 1200 }}
          >
            {/* 3D Hinged Hardcover Book */}
            <div className="relative w-64 h-84 sm:w-72 sm:h-96 rounded-r-2xl border-4 border-[#543625] bg-[#3A2419] shadow-[0_30px_70px_rgba(0,0,0,0.9)] p-6 flex flex-col justify-between text-left">
              {/* Gold Foil Embossed Cover Title */}
              <div className="border-2 border-[#E8C07D]/40 p-4 h-full rounded-r-xl flex flex-col justify-between bg-[#2E1C13]">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#A8805F] uppercase tracking-widest block">EX LIBRIS · 2026</span>
                  <h2 className="text-2xl font-bold text-[#E8C07D] tracking-wide uppercase">{candidateName}</h2>
                  <p className="text-xs text-[#C9A98B] italic">The Reading Room</p>
                </div>

                <div className="space-y-2 border-t border-[#543625] pt-4">
                  <div className="flex items-center gap-2 text-xs text-[#E8C07D]">
                    <Bookmark className="w-4 h-4 text-[#E8C07D]" />
                    <span className="font-mono text-[10px]">SWINGING OPEN 3D COVER...</span>
                  </div>
                  <button
                    onClick={() => setLoading(false)}
                    className="text-[10px] font-mono text-[#A8805F] underline hover:text-[#E8C07D] block"
                  >
                    [Press ESC or Tap to Skip]
                  </button>
                </div>
              </div>

              {/* 3D Hinged Cover Swinging Open Animation */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -140 }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left center" }}
                className="absolute inset-0 rounded-r-2xl border-4 border-[#543625] bg-[#4A2E1F] shadow-2xl p-6 flex flex-col justify-between backface-hidden"
              >
                <div className="border-2 border-[#E8C07D] p-4 h-full rounded-r-xl flex flex-col justify-center items-center text-center space-y-3 bg-[#3A2419]">
                  <BookOpen className="w-12 h-12 text-[#E8C07D]" />
                  <h3 className="text-lg font-bold text-[#E8C07D] uppercase">{candidateName}</h3>
                  <p className="text-[10px] font-mono text-[#A8805F]">ARCHIVE VOLUMES &amp; CHRONICLES</p>
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
          { id: "desk", label: "Ch. I: The Desk", icon: Bookmark, href: "#desk-book" },
          { id: "shelf", label: "Ch. II: The Folios", icon: BookOpen, href: "#library-shelf" },
          { id: "chronicles", label: "Ch. III: Chronicles", icon: Briefcase, href: "#chronicles" },
          { id: "academy", label: "Ch. IV: Academy", icon: GraduationCap, href: "#academy" },
          { id: "letter", label: "Ch. V: The Letter", icon: Mail, href: "#letter-desk" },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          const isHovered = hoveredRibbon === tab.id;
          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={() => {
                setActiveSection(tab.id as any);
                playLibrarySound("page-turn", isMuted);
              }}
              onMouseEnter={() => {
                setHoveredRibbon(tab.id);
                playLibrarySound("page-turn", isMuted);
              }}
              onMouseLeave={() => setHoveredRibbon(null)}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-l-2xl border-l-2 border-y-2 transition-all shadow-xl font-mono text-xs ${
                isActive || isHovered
                  ? "bg-[#6B1D1D] border-[#E8C07D] text-[#E8C07D] translate-x-0 shadow-[0_0_20px_rgba(232,192,125,0.3)]"
                  : "bg-[#4A1515] border-[#543625] text-[#C9A98B] translate-x-12 hover:translate-x-0"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 shrink-0 text-[#E8C07D]" />
              <span className="whitespace-nowrap font-bold">{tab.label}</span>
            </a>
          );
        })}
      </nav>

      {/* 5. TOP MAHOGANY & BRASS HEADER */}
      <header className="border-b border-[#543625] bg-[#2E1C13]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#E8C07D] text-[#24150E] flex items-center justify-center font-bold shadow-[0_0_20px_rgba(232,192,125,0.3)]">
              <Feather className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#FAF2E8] tracking-wider uppercase">{candidateName}</span>
              <span className="text-[10px] text-[#C9A98B] block font-mono -mt-0.5">THE READING ROOM · PRIVATE LIBRARY</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-[#A8805F]">
            <a href="#desk-book" className="hover:text-[#E8C07D] transition">The Desk</a>
            <a href="#library-shelf" className="hover:text-[#E8C07D] transition">Library Folios</a>
            <a href="#chronicles" className="hover:text-[#E8C07D] transition">Career Chronicles</a>
            <a href="#academy" className="hover:text-[#E8C07D] transition">Academy</a>
            <a href="#letter-desk" className="hover:text-[#E8C07D] transition">Wax Letter</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playLibrarySound("lamp-click", !isMuted);
              }}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="h-8 w-8 rounded-full border border-[#543625] bg-[#24150E] text-[#E8C07D] flex items-center justify-center hover:bg-[#543625] transition"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <Button asChild size="sm" className="bg-[#E8C07D] text-[#24150E] hover:bg-[#E8C07D]/90 font-serif font-bold text-xs h-8 rounded-full px-4 shadow">
              <a href="#letter-desk">Unfold Letter</a>
            </Button>
          </div>
        </div>
      </header>

      {/* 6. HERO OPEN DESK BOOK SECTION */}
      <main id="main-content">
        <section id="desk-book" className="py-16 px-6 max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8C07D]/40 bg-[#E8C07D]/10 text-xs font-mono text-[#E8C07D]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>CHAPTER I · FULL STACK &amp; WEB ADVISORY EXPERTISE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl text-[#FAF2E8] font-normal leading-[1.1]">
              {candidateName} <br />
              <span className="italic text-[#E8C07D]">Full Stack Developer &amp; Web Advisor</span>
            </h1>

            <p className="text-sm sm:text-base text-[#C9A98B] font-sans leading-relaxed max-w-2xl mx-auto">
              {bio}
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-2 text-xs font-mono text-[#E8C07D]">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#E8C07D]" /> {location}</span>
              <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-white transition"><Phone className="h-4 w-4 text-[#E8C07D]" /> {phone}</a>
              <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-white transition"><Mail className="h-4 w-4 text-[#E8C07D]" /> {email}</a>
            </div>
          </div>

          {/* 3D Atmospheric Library Reading Desk Surface */}
          <div className="relative rounded-3xl border-4 border-[#543625] bg-[#1F120B] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
            <canvas ref={libraryCanvasRef} className="w-full h-[420px] block" />

            {/* Open Desk Folio Spread */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-center text-xs font-mono text-[#A8805F] pointer-events-auto">
                <span>READING DESK: MAHOGANY SURFACE</span>
                <span>SELECT LEATHER VOLUMES BELOW TO PULL FROM SHELF</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pointer-events-auto">
                {folios.map((folio, idx) => (
                  <button
                    key={folio.id}
                    onClick={() => {
                      setOpenedBook(folio);
                      setBookPageIndex(0);
                      playLibrarySound("book-slide", isMuted);
                    }}
                    className="p-4 rounded-2xl border border-[#543625] bg-[#2E1C13]/90 hover:bg-[#3A2419] hover:border-[#E8C07D] transition-all text-left shadow-2xl space-y-2 group pullable-book cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs text-[#E8C07D]">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1F120B] border border-[#543625]">
                        {folio.vol}
                      </span>
                      <span className="text-[10px] font-mono text-[#A8805F] group-hover:text-[#E8C07D]">[PULL]</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#FAF2E8] group-hover:text-[#E8C07D] transition truncate">
                        {folio.title}
                      </h4>
                      <p className="text-[10px] text-[#A8805F] font-mono mt-0.5 truncate">
                        {folio.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. PULLABLE 3D PROJECT SHELF (CHAPTER II) */}
        <section id="library-shelf" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#543625] space-y-10">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8C07D]">CHAPTER II · FOLIO ARCHIVE</span>
              <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Pullable Project Folios</h2>
            </div>
            <p className="text-xs text-[#A8805F] max-w-sm font-sans">
              Click any leather-bound spine to pull it forward from the library shelf and examine multi-page case studies with real 3D page turns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {folios.map((folio, idx) => (
              <div
                key={folio.id}
                onClick={() => {
                  setOpenedBook(folio);
                  setBookPageIndex(0);
                  playLibrarySound("book-slide", isMuted);
                }}
                className="p-8 rounded-3xl border-2 border-[#543625] bg-[#2E1C13] hover:border-[#E8C07D] transition shadow-2xl space-y-4 cursor-pointer group pullable-book relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-12 rounded-sm border border-[#E8C07D]/50 shadow-md flex items-center justify-center text-[9px] font-mono text-[#E8C07D] font-bold rotate-90"
                      style={{ backgroundColor: folio.spineColor }}
                    >
                      {folio.vol}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-[#A8805F]">{folio.subtitle}</span>
                      <h3 className="text-xl font-bold text-[#FAF2E8] group-hover:text-[#E8C07D] transition">
                        {folio.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#E8C07D] shrink-0">[PULL &amp; OPEN]</span>
                </div>

                <p className="text-xs text-[#C9A98B] font-sans leading-relaxed line-clamp-2">
                  {folio.pages[0].content}
                </p>

                <div className="pt-3 border-t border-[#543625] flex flex-wrap gap-2">
                  {folio.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded bg-[#1F120B] border border-[#543625] text-[10px] font-mono text-[#E8C07D]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. CAREER CHRONICLES (CHAPTER III) */}
        <section id="chronicles" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#543625] space-y-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C07D]">CHAPTER III · WORK HISTORY</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Professional Chronicles</h2>
          </div>

          <div className="space-y-6">
            {displayExperience.map((exp: any, idx: number) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border-2 border-[#543625] bg-[#2E1C13] hover:border-[#E8C07D] transition shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#543625] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#FAF2E8]">
                      {exp.role} <span className="text-[#E8C07D]">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs font-mono text-[#A8805F] mt-0.5">{exp.location || "Mangalore, Karnataka"}</p>
                  </div>
                  <span className="text-xs font-mono text-[#E8C07D] px-3 py-1 rounded-full bg-[#1F120B] border border-[#543625] self-start sm:self-auto">
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
                      <span key={t} className="px-2.5 py-1 rounded bg-[#1F120B] border border-[#543625]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 9. ACADEMY & EDUCATION (CHAPTER IV) */}
        <section id="academy" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#543625] space-y-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C07D]">CHAPTER IV · ACADEMIC CREDENTIALS</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Education &amp; Qualifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayEducation.map((edu: any, idx: number) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border-2 border-[#543625] bg-[#2E1C13] hover:border-[#E8C07D] transition shadow-xl space-y-3"
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

        {/* 10. WAX-SEALED UNFOLDING LETTER CONTACT (CHAPTER V) */}
        <section id="letter-desk" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#543625] text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8C07D]">CHAPTER V · CORRESPONDENCE</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8]">Wax-Sealed Parchment Letter</h2>
            <p className="text-xs sm:text-sm text-[#C9A98B] font-sans">
              Click the crimson wax seal to unfold the parchment letter and dispatch correspondence to {candidateName}.
            </p>
          </div>

          {/* Letter Surface on Desk */}
          <div className="max-w-xl mx-auto rounded-3xl border-4 border-[#543625] bg-[#1F120B] p-8 shadow-2xl space-y-6">
            {!letterUnfolded ? (
              <div className="space-y-6 py-8">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#6B1D1D] border-4 border-[#E8C07D] flex items-center justify-center text-[#E8C07D] shadow-[0_0_30px_rgba(232,192,125,0.4)] cursor-pointer hover:scale-105 transition"
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
                  className="bg-[#E8C07D] text-[#24150E] hover:bg-white font-bold text-xs rounded-full px-6"
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
                <div className="flex justify-between items-center text-xs font-mono text-[#A8805F] border-b border-[#543625] pb-3">
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
                    className="w-full rounded-xl border border-[#543625] bg-[#2E1C13] p-4 text-xs font-sans text-[#FAF2E8] placeholder:text-[#A8805F] focus:outline-none focus:border-[#E8C07D]"
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

          <div className="pt-8 border-t border-[#543625] text-xs font-mono text-[#A8805F] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
            <span>© {new Date().getFullYear()} {candidateName} · {location}</span>
            <div className="flex items-center gap-6">
              <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
              <a href={website} target="_blank" rel="noreferrer" className="hover:text-white transition">Website</a>
              <a href={github} target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      {/* 11. MULTI-PAGE 3D FOLIO READER MODAL WITH 3D PAGE TURNS */}
      <AnimatePresence>
        {openedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              className="max-w-2xl w-full rounded-3xl border-4 border-[#E8C07D] bg-[#2E1C13] p-8 text-[#FAF2E8] space-y-6 relative shadow-[0_0_80px_rgba(232,192,125,0.35)]"
              style={{ perspective: 1000 }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setOpenedBook(null);
                  playLibrarySound("book-slide", isMuted);
                }}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#543625] text-[#E8C07D] flex items-center justify-center hover:bg-[#1F120B]"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Folio Header */}
              <div className="flex items-center justify-between border-b border-[#543625] pb-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-[#E8C07D]" />
                  <div>
                    <span className="text-[10px] font-mono text-[#A8805F] uppercase">{openedBook.vol} · CASE STUDY</span>
                    <h2 className="text-xl font-bold text-[#E8C07D]">{openedBook.title}</h2>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#A8805F]">Page {bookPageIndex + 1} of 3</span>
              </div>

              {/* 3D Rotating Page Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={bookPageIndex}
                  initial={{ rotateY: 70, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -70, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ transformOrigin: "left center" }}
                  className="space-y-4 min-h-[160px] bg-[#24150E] p-6 rounded-2xl border border-[#543625]"
                >
                  <h3 className="text-lg font-bold text-[#E8C07D]">
                    {openedBook.pages[bookPageIndex]?.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C9A98B] font-sans leading-relaxed">
                    {openedBook.pages[bookPageIndex]?.content}
                  </p>

                  {bookPageIndex === 2 && openedBook.pages[2]?.liveUrl && (
                    <div className="pt-2">
                      <a
                        href={openedBook.pages[2].liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E8C07D] hover:underline"
                      >
                        Launch Live Project Coordinates <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Page Turn Controls */}
              <div className="pt-4 border-t border-[#543625] flex items-center justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={bookPageIndex === 0}
                  onClick={() => {
                    setBookPageIndex((prev) => Math.max(prev - 1, 0));
                    playLibrarySound("page-turn", isMuted);
                  }}
                  className="border-[#543625] text-[#E8C07D] hover:bg-[#1F120B] text-xs rounded-full px-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous Page
                </Button>

                <div className="flex gap-1">
                  {[0, 1, 2].map((idx) => (
                    <span
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        bookPageIndex === idx ? "bg-[#E8C07D]" : "bg-[#543625]"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  disabled={bookPageIndex === 2}
                  onClick={() => {
                    setBookPageIndex((prev) => Math.min(prev + 1, 2));
                    playLibrarySound("page-turn", isMuted);
                  }}
                  className="border-[#543625] text-[#E8C07D] hover:bg-[#1F120B] text-xs rounded-full px-4"
                >
                  Next Page <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

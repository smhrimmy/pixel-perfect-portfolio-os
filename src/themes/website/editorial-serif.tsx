import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  X,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Send,
  Sparkles,
  Layers,
  BookOpen,
  Info,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

// Synthesized Audio Helper (Web Audio API)
function playSound(type: 'slide' | 'open' | 'close' | 'stamp' | 'owl' | 'toggle', isMuted: boolean) {
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

    if (type === 'slide') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'open') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.18);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'close') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'stamp') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.16);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'owl') {
      // Owl hoot sound synthesis (low-high-low dual resonant tone)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.linearRampToValueAtTime(540, now + 0.15);
      osc.frequency.linearRampToValueAtTime(440, now + 0.4);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.start(now);
      osc.stop(now + 0.55);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
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

  const [isMuted, setIsMuted] = useState(true);
  const [activeBook, setActiveBook] = useState<any | null>(null);
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Contact Form & Owl Post State: 'idle' -> 'wrapping' -> 'owl_flight' -> 'delivered_popup'
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    subject: "Full Stack & Web Advisory Opportunity",
    message: "",
  });
  const [owlStage, setOwlStage] = useState<'idle' | 'wrapping' | 'owl_flight' | 'delivered_popup'>('idle');

  // ALL 8 COMPONENTS PACKED AS BOOKS ON THE SHELF
  const shelfBooks = [
    {
      id: "book-1",
      vol: "VOL. I",
      title: "Portfolio OS",
      color: "linear-gradient(160deg, #E85D26, #CF4615)", // Orange
      height: 250,
      width: 54,
      type: "project",
      category: "Spatial Operating System",
      year: "2026",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and a dual draft-to-live pipeline with Studio HQ Terminal.",
      tags: ["React 19", "TypeScript", "Three.js", "TanStack Start", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
    },
    {
      id: "book-2",
      vol: "VOL. II",
      title: "Praxel Space",
      color: "linear-gradient(160deg, #1C1B17, #0D0C0A)", // Black
      height: 270,
      width: 58,
      type: "project",
      category: "Cloud Hosting & DNS Platform",
      year: "2025",
      desc: "Cloud infrastructure portal automating SSL certificate provisioning, real-time DNS propagation health checks, and zero-downtime website migrations.",
      tags: ["WordPress Support", "DNS Management", "SSL Automation", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      pattern: "dots",
    },
    {
      id: "book-3",
      vol: "VOL. III",
      title: "Vitvara App",
      color: "linear-gradient(160deg, #EAD7BA, #D9B78A)", // Beige
      height: 210,
      width: 48,
      type: "project",
      category: "Scalable Frontend Web App",
      year: "2024",
      desc: "Engineered responsive, user-centric web applications with modern React.js best practices and scalable REST API endpoints adhering to high performance budgets.",
      tags: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "book-4",
      vol: "VOL. IV",
      title: "Client Works",
      color: "linear-gradient(160deg, #1F5E4E, #144035)", // Emerald
      height: 260,
      width: 54,
      type: "project",
      category: "Bespoke Web Engineering & CMS",
      year: "2025",
      desc: "Delivered bespoke client web applications and high-converting storefronts with custom WordPress architectures and secure contact pipelines.",
      tags: ["Full Stack", "Node.js", "WordPress", "UI/UX Design"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "book-5",
      vol: "CHRONICLES",
      title: "Work History",
      color: "linear-gradient(160deg, #4E9B5C, #2E6E3A)", // Green [02]
      height: 285,
      width: 52,
      index: "01",
      type: "experience",
      category: "Career Timeline & Roles",
      year: "2024–26",
      desc: "Verified career history at Unifycx (Web Advisor), Freelancer (Full Stack Developer), Glowtouch Technologies (Junior Support Engineer), and Vitvara Technologies (Intern).",
      tags: ["Unifycx", "Freelancer", "Glowtouch", "Vitvara"],
    },
    {
      id: "book-6",
      vol: "MATRIX",
      title: "Skills Ledger",
      color: "linear-gradient(160deg, #3A8F96, #1C4E57)", // Ocean Teal
      height: 265,
      width: 66,
      type: "skills",
      category: "Technical Proficiencies Matrix",
      year: "2026",
      desc: "Technical Troubleshooting, WordPress Support, DNS Management, Frontend Development (HTML/CSS, React.js, TypeScript), UI/UX Design, PHP, MySQL, Server Migrations.",
      tags: ["Frontend", "DNS/SSL", "WordPress", "PHP & MySQL", "Troubleshooting"],
    },
    {
      id: "book-7",
      vol: "ACADEMY",
      title: "Credentials",
      color: "linear-gradient(160deg, #E8B830, #C99B1A)", // Mustard Yellow
      height: 245,
      width: 52,
      type: "education",
      category: "Diploma & High School",
      year: "2024",
      desc: "Karnataka (Govt) Polytechnic, Mangalore (Diploma: Full Stack Development, May 2024) & Milagres High School, Mangalore (10th Standard, May 2018).",
      tags: ["Polytechnic Diploma", "Full Stack Development", "Milagres High School"],
    },
    {
      id: "book-8",
      vol: "DISPATCH",
      title: "Contact Book",
      color: "linear-gradient(160deg, #CF3226, #8F1F17)", // Crimson Red
      height: 275,
      width: 56,
      type: "contact",
      category: "Direct Inquiry Dispatch",
      year: "LIVE",
      desc: "Fill the inquiry journal page to have your correspondence wax-sealed and delivered by the Hogwarts & Mangalore Owl Post courier.",
      tags: ["Direct Inbox", "Owl Post", "pdlkpt@gmail.com"],
    },
  ];

  // Submit Contact Form & Trigger Harry Potter Owl Delivery
  const handleOwlDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name || !contactData.email) return;

    // Stage 1: Book Snaps Shut & Wraps in Twine
    setOwlStage('wrapping');
    playSound('close', isMuted);

    setTimeout(() => {
      playSound('stamp', isMuted);
    }, 600);

    // Stage 2: Owl Arrives & Takes Book in Talons
    setTimeout(() => {
      setOwlStage('owl_flight');
      playSound('owl', isMuted);
    }, 1300);

    // Stage 3: Delivery Certificate Popup
    setTimeout(() => {
      setOwlStage('delivered_popup');
      playSound('stamp', isMuted);

      // Trigger mailto fallback
      const subject = encodeURIComponent(`[Owl Post Inquiry] ${contactData.subject} - ${contactData.name}`);
      const body = encodeURIComponent(`Name: ${contactData.name}\nEmail: ${contactData.email}\n\nMessage:\n${contactData.message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 3600);
  };

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-screen bg-[#EFE6D3] text-[#1C1B17] font-sans antialiased overflow-hidden flex flex-col justify-between select-none selection:bg-[#E85D26] selection:text-[#EFE6D3]">
      {/* 1. TOP EDITORIAL BAR */}
      <header className="h-14 sm:h-16 px-4 sm:px-8 border-b border-[#1C1B17]/10 flex items-center justify-between shrink-0 bg-[#EFE6D3]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAboutModal(true)}
            className="font-serif font-black tracking-tight text-lg sm:text-2xl uppercase hover:text-[#E85D26] transition flex items-center gap-2 cursor-pointer"
          >
            <span>{candidateName}</span>
            <Info className="w-4 h-4 text-[#E85D26] opacity-80" />
          </button>
          <span className="hidden md:inline text-[11px] font-mono text-[#7A7568] border-l border-[#1C1B17]/15 pl-3">
            INTERACTIVE 3D BOOKSHELF · THE READING ROOM
          </span>
        </div>

        {/* Quick Access Spines & Sound Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              const contactBook = shelfBooks.find((b) => b.id === "book-8");
              if (contactBook) {
                setActiveBook(contactBook);
                playSound('open', isMuted);
              }
            }}
            className="bg-[#CF3226] text-white hover:bg-[#1C1B17] transition px-3.5 py-1.5 rounded-full text-xs font-bold font-mono uppercase shadow-sm cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Owl Contact</span>
            <Send className="w-3 h-3" />
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playSound('toggle', !isMuted);
            }}
            title={isMuted ? "Enable Tactile Sounds" : "Mute Sounds"}
            className="w-9 h-9 rounded-full border border-[#1C1B17] bg-[#EFE6D3] hover:bg-[#1C1B17] hover:text-[#EFE6D3] transition flex items-center justify-center cursor-pointer shadow-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E85D26]" />}
          </button>
        </div>
      </header>

      {/* 2. CENTER STAGE: MASSIVE BLEED WORD & THE 3D BOOKSHELF */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-8 relative max-w-7xl mx-auto w-full overflow-hidden">
        {/* Giant Typographic Backdrop */}
        <div className="text-center sm:text-left mb-2 sm:mb-4 pointer-events-none">
          <h1 className="font-serif font-black text-[12vw] sm:text-[9.5vw] leading-[0.82] tracking-tighter text-[#1C1B17] opacity-85 select-none uppercase">
            {candidateName.split(" ")[0]} <span className="text-[#E85D26]">{candidateName.split(" ")[1] || "DL"}</span>
          </h1>
          <p className="text-[11px] sm:text-xs text-[#5A554A] font-medium mt-1">
            Every component is a physical book on the shelf. Pull down any volume to inspect.
          </p>
        </div>

        {/* THE 3D BOOKSHELF */}
        <div className="relative w-full pt-12 pb-2">
          {/* Books Row with 3D Perspective */}
          <div
            className="flex items-end justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-0 pt-10 scrollbar-none px-2"
            style={{ perspective: 1200 }}
          >
            {shelfBooks.map((book) => {
              const isHovered = hoveredBookId === book.id;
              return (
                <div
                  key={book.id}
                  onMouseEnter={() => {
                    setHoveredBookId(book.id);
                    playSound('slide', isMuted);
                  }}
                  onMouseLeave={() => setHoveredBookId(null)}
                  onClick={() => {
                    setActiveBook(book);
                    playSound('open', isMuted);
                  }}
                  className="relative shrink-0 cursor-pointer select-none group"
                  style={{
                    height: `${book.height}px`,
                    width: `${book.width}px`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* 3D Book Spine */}
                  <motion.div
                    animate={{
                      y: isHovered ? -22 : 0,
                      rotateZ: isHovered ? (book.id === "book-8" ? -2 : 1.5) : 0,
                      scale: isHovered ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.22, ease: [0.2, 0.8, 0.3, 1.2] }}
                    className="w-full h-full rounded-t-[4px] shadow-[inset_-4px_0_8px_rgba(0,0,0,0.18)] flex flex-col justify-between items-center p-2 relative overflow-hidden"
                    style={{
                      background: book.color,
                      boxShadow: isHovered
                        ? "0 22px 35px -8px rgba(28,27,23,0.38), 0 0 15px rgba(232,93,38,0.3)"
                        : "0 6px 14px -3px rgba(28,27,23,0.16)",
                    }}
                  >
                    {/* Top Index / Badge */}
                    <div className="border-t border-b border-white/30 w-full py-0.5 text-center">
                      <span className="text-[8px] font-mono font-bold text-white/90 block leading-none">
                        {book.vol}
                      </span>
                    </div>

                    {/* Vertical Title (Embossed Gilt Lettering) */}
                    <div className="flex-1 flex items-center justify-center my-auto overflow-hidden py-1">
                      <span
                        className="font-serif font-black text-xs sm:text-sm tracking-wider uppercase text-white/95 whitespace-nowrap"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                        }}
                      >
                        {book.title}
                      </span>
                    </div>

                    {/* Year Tag */}
                    <span className="text-[7px] font-mono text-white/75 block">
                      {book.year}
                    </span>

                    {/* Hover Pill */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1C1B17] text-[#EFE6D3] px-2 py-0.5 rounded text-[8px] font-mono font-bold whitespace-nowrap shadow-lg z-20"
                      >
                        OPEN {book.vol}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Heavy Solid Wood Shelf Base */}
          <div className="w-full h-3 bg-gradient-to-r from-[#241710] via-[#3D2518] to-[#241710] rounded-sm mt-0 shadow-lg border-t border-[#5C3925]" />
        </div>
      </main>

      {/* 3. BOTTOM EDITORIAL FOOTER BAR */}
      <footer className="h-12 sm:h-14 px-4 sm:px-8 border-t border-[#1C1B17]/10 flex items-center justify-between text-xs font-mono text-[#7A7568] shrink-0 bg-[#EFE6D3]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[#1C1B17]">
            <MapPin className="w-3.5 h-3.5 text-[#E85D26]" /> {location}
          </span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{email}</span>
        </div>

        <div className="flex items-center gap-4 text-[#1C1B17] font-bold">
          <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-[#E85D26] transition">LinkedIn</a>
          <a href={github} target="_blank" rel="noreferrer" className="hover:text-[#E85D26] transition">GitHub</a>
          <a href={website} target="_blank" rel="noreferrer" className="hover:text-[#E85D26] transition">Praxel.space</a>
        </div>
      </footer>

      {/* 4. MODAL: FULL AUTHOR BIOGRAPHY */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="max-w-md w-full rounded-2xl bg-[#EFE6D3] text-[#1C1B17] p-6 sm:p-8 space-y-4 shadow-2xl border border-[#1C1B17]/20 relative"
            >
              <button
                onClick={() => setShowAboutModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#1C1B17]/30 flex items-center justify-center hover:bg-[#1C1B17] hover:text-[#EFE6D3] transition"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-[10px] font-mono font-bold tracking-widest text-[#E85D26] uppercase block">
                AUTHOR BIOGRAPHY &amp; DOSSIER
              </span>
              <h2 className="text-2xl font-serif font-bold">{candidateName}</h2>
              <p className="text-xs sm:text-sm text-[#4A463C] leading-relaxed">
                {bio}
              </p>

              <div className="pt-2 border-t border-[#1C1B17]/10 space-y-1.5 text-xs font-mono text-[#1C1B17]">
                <p>📍 {location}</p>
                <p>📞 {phone}</p>
                <p>✉️ {email}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. MODAL: 3D HARDCOVER BOOK INSPECTION FOR ALL SHELF VOLUMES */}
      <AnimatePresence>
        {activeBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.75, opacity: 0, y: 40 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.3, 1.2] }}
              className="max-w-xl w-full rounded-2xl p-6 sm:p-8 text-white space-y-5 relative shadow-[0_30px_90px_rgba(0,0,0,0.9)] border border-white/20 select-none overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{
                background: activeBook.color,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveBook(null);
                  playSound('close', isMuted);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Book Header */}
              <div className="border-b border-white/20 pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/75 block">
                  {activeBook.vol} · {activeBook.category} · {activeBook.year}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  {activeBook.title}
                </h2>
              </div>

              {/* DYNAMIC CONTENT BASED ON BOOK TYPE */}
              {/* Type A: PROJECT BOOK */}
              {activeBook.type === "project" && (
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-sans">
                    {activeBook.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeBook.tags.map((tag: string) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full border border-white/40 text-[10px] font-mono text-white/90">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {activeBook.liveUrl && (
                    <div className="pt-2 flex gap-3">
                      <a
                        href={activeBook.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white text-[#1C1B17] hover:bg-[#1C1B17] hover:text-white transition px-5 py-2 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-md"
                      >
                        <span>Launch Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Type B: EXPERIENCE CHRONICLES BOOK */}
              {activeBook.type === "experience" && (
                <div className="space-y-4 text-xs font-sans">
                  {rawExperience.map((exp: any, i: number) => (
                    <div key={i} className="p-3.5 rounded-xl bg-black/30 border border-white/15 space-y-1">
                      <div className="flex justify-between font-bold text-white">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="font-mono text-[10px] text-white/80">{exp.startDate} – {exp.endDate || "Present"}</span>
                      </div>
                      <p className="text-white/85 text-[11px]">{exp.summary}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Type C: SKILLS MATRIX BOOK */}
              {activeBook.type === "skills" && (
                <div className="space-y-3">
                  <p className="text-xs text-white/90">Core competencies and verified engineering proficiencies:</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Frontend Development",
                      "React.js",
                      "TypeScript",
                      "Tailwind CSS",
                      "Technical Troubleshooting",
                      "WordPress Support",
                      "DNS Management",
                      "SSL Provisioning",
                      "Server Migrations",
                      "PHP & MySQL",
                      "REST APIs",
                      "UI/UX Design",
                    ].map((s) => (
                      <span key={s} className="bg-white/20 border border-white/30 px-3 py-1 rounded-full text-xs font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Type D: EDUCATION CREDENTIALS BOOK */}
              {activeBook.type === "education" && (
                <div className="space-y-4 text-xs font-sans">
                  {rawEducation.map((edu: any, i: number) => (
                    <div key={i} className="p-4 rounded-xl bg-black/30 border border-white/15 space-y-1.5">
                      <div className="flex items-center gap-2 text-white font-bold text-sm">
                        <GraduationCap className="w-4 h-4" />
                        <span>{edu.degree}</span>
                      </div>
                      <p className="text-white/85">{edu.institution}</p>
                      <p className="font-mono text-[10px] text-white/70">{edu.location} · {edu.graduationDate}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Type E: CONTACT BOOK (HARRY POTTER OWL POST FORM) */}
              {activeBook.type === "contact" && (
                <div className="space-y-4">
                  {owlStage === 'idle' && (
                    <form onSubmit={handleOwlDispatch} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono uppercase text-white/80 block mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            value={contactData.name}
                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                            placeholder="Albus Dumbledore"
                            className="w-full bg-black/30 border border-white/30 text-white px-3 py-2 rounded text-xs font-sans focus:outline-none focus:border-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono uppercase text-white/80 block mb-1">Your Email</label>
                          <input
                            type="email"
                            required
                            value={contactData.email}
                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                            placeholder="albus@hogwarts.edu"
                            className="w-full bg-black/30 border border-white/30 text-white px-3 py-2 rounded text-xs font-sans focus:outline-none focus:border-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase text-white/80 block mb-1">Message Note</label>
                        <textarea
                          rows={3}
                          required
                          value={contactData.message}
                          onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                          placeholder="Write your parchment note for delivery..."
                          className="w-full bg-black/30 border border-white/30 text-white px-3 py-2 rounded text-xs font-sans focus:outline-none focus:border-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-white text-[#1C1B17] hover:bg-[#EFE6D3] transition py-3 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <span>Pack Book &amp; Summon Owl Courier</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* STAGE 1: BOOK WRAPPING IN TWINE WITH WAX STAMP */}
                  {owlStage === 'wrapping' && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center justify-center text-center space-y-4 py-4"
                    >
                      {/* Wrapped Book Parcel with Postal Twine */}
                      <motion.div
                        animate={{ scale: [0.95, 1.05, 1], rotate: [0, -3, 3, 0] }}
                        transition={{ duration: 0.8 }}
                        className="w-40 h-52 rounded-xl bg-gradient-to-br from-[#D9A066] to-[#B37840] border-4 border-[#664322] shadow-2xl relative p-3 flex flex-col justify-between select-none"
                      >
                        {/* Postal Ribbons */}
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-3 bg-[#4A2E14]" />
                        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-3 bg-[#4A2E14]" />

                        {/* Wax Seal Stamp */}
                        <motion.div
                          initial={{ scale: 2.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, type: "spring", stiffness: 350 }}
                          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#CF3226] border-2 border-white flex items-center justify-center text-white shadow-xl z-10 font-serif font-black text-xs"
                        >
                          PDL
                        </motion.div>

                        <span className="text-[8px] font-mono font-bold text-[#4A2E14]">PARCEL #PDL-2026</span>
                        <span className="text-[8px] font-mono font-bold text-[#4A2E14] self-end">TO: PRAJWAL DL</span>
                      </motion.div>

                      <div className="space-y-0.5">
                        <h4 className="font-serif text-lg font-bold text-white">Book Wrapped &amp; Wax Sealed</h4>
                        <p className="text-[11px] font-mono text-white/80">Summoning Owl Post from the tower...</p>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 2: HARRY POTTER FLYING OWL SWOOPS DOWN AND TAKES THE BOOK */}
                  {owlStage === 'owl_flight' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center text-center space-y-4 py-4 overflow-hidden relative min-h-[220px]"
                    >
                      {/* Animated Flying Owl with Flapping Wings taking Parcel */}
                      <motion.div
                        animate={{
                          x: [-120, 0, 140],
                          y: [-30, 20, -70],
                          scale: [0.8, 1.1, 0.7],
                        }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center"
                      >
                        {/* Majestic Owl Graphic */}
                        <svg viewBox="0 0 100 80" className="w-24 h-20 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                          {/* Owl Body */}
                          <ellipse cx="50" cy="45" rx="18" ry="24" fill="#D2B48C" stroke="#8B5A2B" strokeWidth="2" />
                          {/* Owl Head */}
                          <circle cx="50" cy="24" r="16" fill="#E6D7B8" stroke="#8B5A2B" strokeWidth="2" />
                          {/* Owl Eyes */}
                          <circle cx="43" cy="22" r="5" fill="#FFD700" stroke="#000" strokeWidth="1" />
                          <circle cx="43" cy="22" r="2.5" fill="#000" />
                          <circle cx="57" cy="22" r="5" fill="#FFD700" stroke="#000" strokeWidth="1" />
                          <circle cx="57" cy="22" r="2.5" fill="#000" />
                          {/* Owl Beak */}
                          <polygon points="50,26 47,32 53,32" fill="#E85D26" />
                          {/* Flapping Wings */}
                          <motion.path
                            animate={{ d: ["M 32 35 Q 5 10 10 45 Q 30 50 34 40", "M 32 35 Q 5 60 10 75 Q 30 65 34 40", "M 32 35 Q 5 10 10 45 Q 30 50 34 40"] }}
                            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                            fill="#B38B59"
                            stroke="#5C381E"
                            strokeWidth="1.5"
                          />
                          <motion.path
                            animate={{ d: ["M 68 35 Q 95 10 90 45 Q 70 50 66 40", "M 68 35 Q 95 60 90 75 Q 70 65 66 40", "M 68 35 Q 95 10 90 45 Q 70 50 66 40"] }}
                            transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                            fill="#B38B59"
                            stroke="#5C381E"
                            strokeWidth="1.5"
                          />
                          {/* Owl Talons clutching wrapped book */}
                          <rect x="42" y="62" width="16" height="14" rx="2" fill="#B37840" stroke="#4A2E14" strokeWidth="1" />
                        </svg>
                      </motion.div>

                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-[#E8B830] font-bold block">
                          🦉 HOGWARTS OWL POST IN TRANSIT
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white">
                          Owl Swooping Away With Your Parcel...
                        </h4>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 3: MAGICAL OWL DELIVERY POPUP (HARRY POTTER PARCHMENT STYLE) */}
                  {owlStage === 'delivered_popup' && (
                    <motion.div
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-xl bg-[#EFE6D3] text-[#1C1B17] p-5 space-y-3 shadow-2xl border-2 border-[#8B5A2B] text-center"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#1F6B3A] text-white flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#8B5A2B] block">
                          OFFICIAL HOGWARTS &amp; MANGALORE OWL POST RECEIPT
                        </span>
                        <h3 className="font-serif text-xl font-bold text-[#1C1B17]">
                          Book Delivered to Prajwal DL!
                        </h3>
                        <p className="text-xs text-[#4A463C] leading-relaxed">
                          Your correspondence from <span className="font-bold text-[#E85D26]">{contactData.name}</span> was delivered via Owl Post to <span className="font-mono font-bold text-[#1F6B3A]">{email}</span>.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setOwlStage('idle');
                          setContactData({ name: "", email: "", subject: "Full Stack & Web Advisory Opportunity", message: "" });
                        }}
                        className="bg-[#1C1B17] text-[#EFE6D3] hover:bg-[#E85D26] transition px-4 py-2 rounded-full text-xs font-mono font-bold uppercase cursor-pointer"
                      >
                        Dispatch Another Owl Post
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Bottom Return Button */}
              <div className="pt-2 border-t border-white/20 flex justify-between items-center">
                <button
                  onClick={() => {
                    setActiveBook(null);
                    playSound('close', isMuted);
                  }}
                  className="text-xs font-mono font-bold text-white/80 hover:text-white underline cursor-pointer"
                >
                  Return Volume to Shelf
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

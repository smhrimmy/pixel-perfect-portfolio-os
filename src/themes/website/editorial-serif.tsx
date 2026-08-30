import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  ExternalLink,
  CheckCircle2,
  Send,
  Sparkles,
  Package,
  Layers,
  Award,
  Menu,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

// Synthesized Vintage Tactile Audio (Web Audio API)
function playTactileSound(type: 'slide' | 'open' | 'close' | 'stamp' | 'courier' | 'toggle', isMuted: boolean) {
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
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.15);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'open') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'close') {
      // Deep book slam
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.22);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'stamp') {
      // Wax seal thud
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.16);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'courier') {
      // Postal bell / chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.setValueAtTime(1174.66, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.06, now);
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
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  // Active Selected Book on Shelf (3D Cover Reveal modal)
  const [activeBook, setActiveBook] = useState<any | null>(null);
  const [hoveredBookIndex, setHoveredBookIndex] = useState<number | null>(null);

  // Contact Form & Librarian Courier Packing Animation State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Full Stack & Web Advisory Inquiry",
    message: "",
  });

  // State sequence: 'idle' -> 'packing' -> 'courier_collecting' -> 'dispatched'
  const [dispatchStage, setDispatchStage] = useState<'idle' | 'packing' | 'courier_collecting' | 'dispatched'>('idle');

  // The 10 Shelf Spines exactly mirroring Olena Mizrakh's Dribbble composition
  const shelfBooks = [
    {
      id: "book-1",
      title: "Portfolio OS",
      color: "linear-gradient(160deg, #E85D26, #CF4615)", // Orange
      height: 250,
      width: 56,
      category: "Full Stack Operating System",
      year: "2026",
      desc: "Architected a multi-theme spatial operating system featuring 20 real-world physical metaphors, sub-100ms LCP, and a dual draft-to-live pipeline with Studio HQ Terminal.",
      tags: ["React 19", "TypeScript", "Three.js", "TanStack Start", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
      patternType: "solid",
    },
    {
      id: "book-2",
      title: "Praxel Space",
      color: "linear-gradient(160deg, #1C1B17, #0D0C0A)", // Black
      height: 275,
      width: 60,
      category: "Cloud Hosting & DNS Orchestrator",
      year: "2025",
      desc: "Cloud infrastructure platform orchestrating automated SSL provisioning, DNS records propagation checks, and zero-downtime website migration pipelines.",
      tags: ["WordPress", "DNS Management", "SSL Automation", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      patternType: "halftone-square",
    },
    {
      id: "book-3",
      title: "Vitvara App",
      color: "linear-gradient(160deg, #EAD7BA, #D9B78A)", // Beige diagonal
      height: 200,
      width: 46,
      category: "Scalable Frontend Web App",
      year: "2024",
      desc: "Engineered responsive, user-centric web applications with modern React.js best practices and scalable REST API endpoints adhering to high performance budgets.",
      tags: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
      liveUrl: "https://praxel.space/",
      patternType: "diagonal-stripe",
    },
    {
      id: "book-4",
      title: "Client Platforms",
      color: "linear-gradient(160deg, #1F5E4E, #144035)", // Deep Emerald Teal
      height: 255,
      width: 54,
      category: "Bespoke Web Engineering & CMS",
      year: "2025",
      desc: "Delivered custom client websites and performant web applications with bespoke WordPress architectures, secure contact pipelines, and high-converting UI layouts.",
      tags: ["Full Stack", "Node.js", "WordPress", "UI/UX Design"],
      liveUrl: "https://praxel.space/",
      patternType: "wireframe-crest",
    },
    {
      id: "book-5",
      title: "Unifycx · Advisor",
      color: "linear-gradient(160deg, #8FC98A, #6FB36A)", // Light Green [01]
      height: 290,
      width: 42,
      index: "01",
      category: "Web Advisory & Server Migration",
      year: "2025–Pres",
      desc: "Assisting customers with website migrations, SSL installations, email configurations, and hosting control panels across shared hosting environments.",
      tags: ["Web Advisory", "DNS Management", "SSL Installations", "cPanel"],
      patternType: "indexed",
    },
    {
      id: "book-6",
      title: "Freelance · Full Stack",
      color: "linear-gradient(160deg, #4E9B5C, #3B8047)", // Medium Green [02]
      height: 295,
      width: 42,
      index: "02",
      category: "Independent Full Stack Engineering",
      year: "2024–25",
      desc: "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements with continuous improvements.",
      tags: ["React.js", "TypeScript", "Tailwind CSS", "PHP", "MySQL"],
      patternType: "indexed",
    },
    {
      id: "book-7",
      title: "Glowtouch · Support",
      color: "linear-gradient(160deg, #1F6B3A, #144E29)", // Forest Green [03]
      height: 300,
      width: 42,
      index: "03",
      category: "Junior Support Engineering",
      year: "2024",
      desc: "Provided live chat support for hosting, domain, server, DNS, and WordPress issues, collaborating with engineering teams to ensure swift resolution.",
      tags: ["Technical Troubleshooting", "WordPress", "Server Infrastructure", "DNS"],
      patternType: "indexed",
    },
    {
      id: "book-8",
      title: "Vitvara · Intern",
      color: "linear-gradient(160deg, #CF3226, #A82017)", // Red with dots
      height: 235,
      width: 52,
      category: "Web Development Internship",
      year: "2024",
      desc: "Engineered responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, optimizing code for maintainability and security.",
      tags: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
      patternType: "five-dots",
    },
    {
      id: "book-9",
      title: "Polytechnic Diploma",
      color: "linear-gradient(160deg, #E8B830, #C99B1A)", // Mustard Yellow with halftone
      height: 260,
      width: 58,
      category: "Diploma: Full Stack Development",
      year: "2024",
      desc: "Karnataka (Govt) Polytechnic, Mangalore. Graduated May 2024 with specialized coursework in software engineering, algorithms, database management, and web development.",
      tags: ["Full Stack Development", "Algorithms", "Databases", "Mangalore"],
      patternType: "top-halftone",
    },
    {
      id: "book-10",
      title: "Core Competencies",
      color: "linear-gradient(160deg, #3A8F96, #1C4E57)", // Wide Ocean Teal
      height: 270,
      width: 82,
      category: "Technical Proficiency Matrix",
      year: "2026",
      desc: "Technical Troubleshooting, WordPress Support, DNS Management, HTML/CSS, JavaScript, React.js, TypeScript, UI/UX Design, PHP, MySQL, Server & Website Migrations.",
      tags: ["Frontend", "DNS", "SSL", "WordPress", "Troubleshooting", "PHP/MySQL"],
      patternType: "wide-editorial",
    },
  ];

  // Handle Form Submission with Book Packing & Librarian Collection
  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Stage 1: Packing
    setDispatchStage('packing');
    playTactileSound('close', isMuted);

    setTimeout(() => {
      playTactileSound('stamp', isMuted);
    }, 600);

    // Stage 2: Courier Librarian Arrival
    setTimeout(() => {
      setDispatchStage('courier_collecting');
      playTactileSound('courier', isMuted);
    }, 1400);

    // Stage 3: Dispatched confirmation
    setTimeout(() => {
      setDispatchStage('dispatched');
      // Construct mailto link fallback
      const subject = encodeURIComponent(`[Book Inquiry] ${formData.subject} - ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }, 3800);
  };

  return (
    <div className="min-h-screen bg-[#EFE6D3] text-[#1C1B17] font-sans antialiased selection:bg-[#E85D26] selection:text-[#EFE6D3] overflow-x-hidden">
      {/* 1. ACCESSIBILITY SKIP LINK */}
      <a
        href="#shelf-section"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#1C1B17] text-[#EFE6D3] font-bold text-xs rounded-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]"
      >
        Skip to interactive bookshelf
      </a>

      {/* 2. STICKY EDITORIAL TOP NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#EFE6D3]/95 backdrop-blur-md border-b border-[#1C1B17]/10 px-6 sm:px-10 h-20 flex items-center justify-between">
        <button
          onClick={() => setNavDrawerOpen(true)}
          aria-label="Open menu drawer"
          className="p-2 -ml-2 text-[#1C1B17] hover:text-[#E85D26] transition cursor-pointer flex flex-col gap-1.5"
        >
          <span className="w-6 h-0.5 bg-current rounded-full" />
          <span className="w-6 h-0.5 bg-current rounded-full" />
          <span className="w-4 h-0.5 bg-current rounded-full" />
        </button>

        <div className="text-center">
          <a href="#hero-top" className="font-serif font-black tracking-tight text-xl sm:text-2xl uppercase hover:text-[#E85D26] transition">
            {candidateName}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playTactileSound('toggle', !isMuted);
            }}
            title={isMuted ? "Enable Tactile Sounds" : "Mute Sounds"}
            className="w-10 h-10 rounded-full border border-[#1C1B17] bg-[#EFE6D3] hover:bg-[#1C1B17] hover:text-[#EFE6D3] transition flex items-center justify-center cursor-pointer shadow-sm"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E85D26]" />}
          </button>

          <a
            href="#contact-book"
            className="bg-[#1C1B17] text-[#EFE6D3] hover:bg-[#E85D26] hover:text-white transition px-5 py-2 rounded-full font-bold text-xs tracking-wider uppercase shadow-md inline-flex items-center gap-1.5"
          >
            <span>Get in touch</span>
          </a>
        </div>
      </header>

      {/* 3. SLIDE-OUT NAV DRAWER */}
      <AnimatePresence>
        {navDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-[#1C1B17] text-[#EFE6D3] p-8 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-[#EFE6D3]/15 pb-4">
                  <span className="font-serif font-bold tracking-widest text-sm uppercase text-[#E85D26]">LIBRARY DIRECTORY</span>
                  <button
                    onClick={() => setNavDrawerOpen(false)}
                    className="w-8 h-8 rounded-full border border-[#EFE6D3]/30 flex items-center justify-center hover:bg-[#EFE6D3] hover:text-[#1C1B17] transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 text-2xl font-serif">
                  <a href="#shelf-section" onClick={() => setNavDrawerOpen(false)} className="hover:text-[#E85D26] transition">01 · The Bookshelf</a>
                  <a href="#about-section" onClick={() => setNavDrawerOpen(false)} className="hover:text-[#E85D26] transition">02 · Biography</a>
                  <a href="#skills-section" onClick={() => setNavDrawerOpen(false)} className="hover:text-[#E85D26] transition">03 · Skills Matrix</a>
                  <a href="#contact-book" onClick={() => setNavDrawerOpen(false)} className="hover:text-[#E85D26] transition">04 · Dispatch Journal</a>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#EFE6D3]/60 border-t border-[#EFE6D3]/15 pt-6">
                <p>{location}</p>
                <p>{email}</p>
                <p>{phone}</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* 4. MAIN SINGLE-PAGE CONTAINER */}
      <main id="hero-top">
        {/* HERO HEADER WITH BLEED TYPOGRAPHY */}
        <section className="pt-8 sm:pt-14 px-6 sm:px-10 max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <h1 className="font-serif font-black text-[14vw] sm:text-[11vw] leading-[0.82] tracking-tighter text-[#1C1B17] select-none opacity-90 uppercase">
              {candidateName.split(" ")[0]} <span className="text-[#E85D26]">{candidateName.split(" ")[1] || "DL"}</span>
            </h1>
          </div>

          <p className="mt-4 sm:mt-6 text-[#4A463C] max-w-xl text-sm sm:text-base leading-relaxed font-sans font-medium">
            Full Stack Developer &amp; Web Advisor based in Mangalore. Every volume on this shelf represents an end-to-end system I architected, engineered, and shipped. Click any spine below to pull it down and read the case study.
          </p>
        </section>

        {/* 5. THE DRIBBLE-STYLE INTERACTIVE BOOKSHELF */}
        <section id="shelf-section" className="pt-10 sm:pt-16 pb-12 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="relative">
            {/* The Books Row */}
            <div
              className="flex items-end justify-start sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-0 pt-16 scrollbar-none px-4"
              style={{ perspective: 1200 }}
            >
              {shelfBooks.map((book, idx) => {
                const isHovered = hoveredBookIndex === idx;
                return (
                  <div
                    key={book.id}
                    onMouseEnter={() => {
                      setHoveredBookIndex(idx);
                      playTactileSound('slide', isMuted);
                    }}
                    onMouseLeave={() => setHoveredBookIndex(null)}
                    onClick={() => {
                      setActiveBook(book);
                      playTactileSound('open', isMuted);
                    }}
                    className="relative shrink-0 cursor-pointer select-none group"
                    style={{
                      height: `${book.height}px`,
                      width: `${book.width}px`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* The 3D Book Spine */}
                    <motion.div
                      animate={{
                        y: isHovered ? -22 : 0,
                        rotateZ: isHovered ? (idx % 2 === 0 ? -1.5 : 1.5) : 0,
                        scale: isHovered ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.24, ease: [0.2, 0.8, 0.3, 1.2] }}
                      className="w-full h-full rounded-t-[4px] shadow-[inset_-4px_0_8px_rgba(0,0,0,0.15)] flex flex-col justify-between items-center p-2 relative overflow-hidden"
                      style={{
                        background: book.color,
                        boxShadow: isHovered
                          ? "0 24px 40px -8px rgba(28,27,23,0.35), 0 0 15px rgba(232,93,38,0.25)"
                          : "0 8px 18px -4px rgba(28,27,23,0.18)",
                      }}
                    >
                      {/* Top Index Badge or Pattern */}
                      {book.index && (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 text-[#1C1B17] font-bold text-[9px] px-1.5 py-0.5 rounded-xs font-mono">
                          {book.index}
                        </div>
                      )}

                      {book.patternType === "halftone-square" && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 grid grid-cols-2 gap-1 opacity-70">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        </div>
                      )}

                      {book.patternType === "five-dots" && (
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col gap-1 opacity-80">
                          <span className="w-1 h-1 rounded-full bg-black/60" />
                          <span className="w-1 h-1 rounded-full bg-black/60" />
                          <span className="w-1 h-1 rounded-full bg-black/60" />
                          <span className="w-1 h-1 rounded-full bg-black/60" />
                          <span className="w-1 h-1 rounded-full bg-black/60" />
                        </div>
                      )}

                      {/* Vertical Spine Title */}
                      <div className="flex-1 flex items-center justify-center my-auto overflow-hidden">
                        <span
                          className="font-serif font-black text-xs sm:text-sm tracking-wider uppercase text-white/95 whitespace-nowrap"
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                          }}
                        >
                          {book.title}
                        </span>
                      </div>

                      {/* Hover Tooltip Pill */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1C1B17] text-[#EFE6D3] px-2 py-0.5 rounded text-[8px] font-mono font-bold whitespace-nowrap shadow-lg"
                        >
                          PULL BOOK
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Solid Black Wooden Shelf Base Line */}
            <div className="w-full h-2 bg-[#1C1B17] rounded-full mt-0 shadow-md" />
          </div>
        </section>

        {/* 6. ABOUT BIOGRAPHY SECTION */}
        <section id="about-section" className="py-20 px-6 sm:px-10 max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#E85D26] uppercase block">
            02 · BIOGRAPHY &amp; BACKGROUND
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1C1B17] leading-tight">
            Dedicated &amp; Adaptable Full Stack Developer &amp; Web Advisor.
          </h2>
          <p className="text-base text-[#4A463C] leading-relaxed font-sans pt-2">
            {bio}
          </p>
          <div className="flex flex-wrap gap-6 pt-4 text-xs font-mono font-bold text-[#1C1B17]">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#E85D26]" /> {location}</span>
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-[#E85D26] transition"><Phone className="w-4 h-4 text-[#E85D26]" /> {phone}</a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-[#E85D26] transition"><Mail className="w-4 h-4 text-[#E85D26]" /> {email}</a>
          </div>
        </section>

        {/* 7. SKILLS MATRIX SECTION */}
        <section id="skills-section" className="py-16 px-6 sm:px-10 max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono font-bold tracking-widest text-[#E85D26] uppercase block">
            03 · TECHNICAL PROFICIENCIES ON THE SHELF
          </span>
          <div className="flex flex-wrap gap-2.5">
            {[
              "Frontend Development",
              "React.js",
              "TypeScript",
              "Tailwind CSS",
              "Technical Troubleshooting",
              "WordPress Support",
              "DNS Management",
              "SSL Provisioning",
              "Server & Website Migrations",
              "PHP & MySQL",
              "REST APIs",
              "UI/UX Design",
              "Microsoft Excel",
              "Git & GitHub",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-[#1C1B17] text-[#EFE6D3] hover:bg-[#E85D26] transition px-4 py-2 rounded-full font-sans font-semibold text-xs shadow-sm cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* 8. SIGNATURE CONTACT JOURNAL & ANIMATED COURIER DISPATCH */}
        <section id="contact-book" className="py-20 px-6 sm:px-10 max-w-4xl mx-auto">
          <div className="bg-[#1C1B17] text-[#EFE6D3] rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="space-y-2 border-b border-[#EFE6D3]/15 pb-6">
              <span className="text-xs font-mono font-bold tracking-widest text-[#E8B830] uppercase block">
                04 · THE DISPATCH JOURNAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                Place an Inquiry into the Open Journal.
              </h2>
              <p className="text-xs sm:text-sm text-[#CFC9B8]">
                Fill out the page below. When submitted, the book physically closes, wraps with postal twine, and our vintage courier collects it for immediate delivery.
              </p>
            </div>

            {/* INQUIRY FORM OR PACKED BOOK & LIBRARIAN ANIMATION */}
            <div className="mt-8 min-h-[380px] flex items-center justify-center">
              {dispatchStage === 'idle' && (
                <form onSubmit={handleSubmitInquiry} className="w-full space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-[#EFE6D3]/80 uppercase block">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full bg-[#2A2822] border border-[#4A463C] text-[#EFE6D3] px-4 py-3 rounded-lg text-xs font-sans placeholder:text-[#8A8574] focus:outline-none focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono font-bold text-[#EFE6D3]/80 uppercase block">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ada@domain.com"
                        className="w-full bg-[#2A2822] border border-[#4A463C] text-[#EFE6D3] px-4 py-3 rounded-lg text-xs font-sans placeholder:text-[#8A8574] focus:outline-none focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#EFE6D3]/80 uppercase block">Inquiry Topic</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#2A2822] border border-[#4A463C] text-[#EFE6D3] px-4 py-3 rounded-lg text-xs font-sans focus:outline-none focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold text-[#EFE6D3]/80 uppercase block">Message / Specification</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your note into the reading room ledger..."
                      className="w-full bg-[#2A2822] border border-[#4A463C] text-[#EFE6D3] px-4 py-3 rounded-lg text-xs font-sans placeholder:text-[#8A8574] focus:outline-none focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#E85D26] text-white hover:bg-white hover:text-[#1C1B17] transition px-8 py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider shadow-xl inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Close Book &amp; Dispatch Courier</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STAGE 1: BOOK SNAPS SHUT & WRAPS IN POSTAL TWINE */}
              {dispatchStage === 'packing' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-5 py-8"
                >
                  {/* 3D Packed Book Illustration */}
                  <motion.div
                    animate={{ rotateY: [0, 360], scale: [0.95, 1.05, 1] }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="w-48 h-64 rounded-xl bg-gradient-to-br from-[#D9A066] to-[#B37840] border-4 border-[#8A5626] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative p-4 flex flex-col justify-between text-left select-none"
                  >
                    {/* Postal Twine Cross Ribbons */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-[#664322] border-y border-[#FAF2E8]/40" />
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-[#664322] border-x border-[#FAF2E8]/40" />

                    {/* Wax Stamp Seal */}
                    <motion.div
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#CF3226] border-2 border-[#FAF2E8] flex items-center justify-center text-white shadow-xl z-10"
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>

                    <span className="text-[10px] font-mono font-bold text-[#4A2E14] uppercase">PARCEL #PDL-2026</span>
                    <span className="text-[10px] font-mono font-bold text-[#4A2E14] uppercase self-end">TO: {candidateName}</span>
                  </motion.div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-[#E8B830]">Journal Packed &amp; Wax Sealed...</h3>
                    <p className="text-xs font-mono text-[#CFC9B8]">Summoning library postal courier...</p>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: LIBRARIAN / POSTAL COURIER ARRIVES TO COLLECT */}
              {dispatchStage === 'courier_collecting' && (
                <motion.div
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 py-8"
                >
                  <div className="relative">
                    {/* Animated Courier Character / Icon Animation */}
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-24 h-24 rounded-full bg-[#E85D26] border-4 border-[#EFE6D3] flex items-center justify-center text-white shadow-2xl mx-auto"
                    >
                      <Package className="w-12 h-12" />
                    </motion.div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#8FC98A] uppercase block">
                      COURIER ARRIVED AT READING ROOM
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Collecting Book Parcel from Desk...
                    </h3>
                    <p className="text-xs text-[#CFC9B8] max-w-sm">
                      The postal courier has safely secured your correspondence parcel into the vintage dispatch satchel.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: CONFIRMED DISPATCHED */}
              {dispatchStage === 'dispatched' && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center space-y-6 py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8FC98A] text-[#1C1B17] flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-bold text-white">
                      Correspondence Dispatched!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CFC9B8] max-w-md mx-auto">
                      Your message from <span className="text-[#E8B830] font-bold">{formData.name}</span> has been picked up by the courier and routed to <span className="text-[#8FC98A] font-mono">{email}</span>.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setDispatchStage('idle');
                      setFormData({ name: "", email: "", subject: "Full Stack & Web Advisory Inquiry", message: "" });
                    }}
                    className="bg-[#2A2822] text-[#EFE6D3] border border-[#4A463C] hover:bg-[#E85D26] hover:text-white transition px-6 py-2.5 rounded-full text-xs font-bold font-mono uppercase"
                  >
                    Open New Journal Page
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 9. THE 3D BOOK COVER REVEAL MODAL (FLIP MODAL FROM SHELF) */}
      <AnimatePresence>
        {activeBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1B17]/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 50 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.3, 1.2] }}
              className="max-w-md w-full rounded-2xl p-7 text-white space-y-5 relative shadow-[0_30px_90px_rgba(0,0,0,0.85)] border border-white/20 select-none overflow-hidden"
              style={{
                background: activeBook.color,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setActiveBook(null);
                  playTactileSound('close', isMuted);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
                aria-label="Close book"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Geometric Vector Book Graphic Emblem */}
              <div className="h-36 flex items-center justify-center opacity-80">
                <svg viewBox="0 0 200 200" className="w-32 h-32">
                  <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                  <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Book Details */}
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 block">
                    {activeBook.category} · {activeBook.year}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
                    {activeBook.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed">
                  {activeBook.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeBook.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full border border-white/40 text-[10px] font-mono text-white/95"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Links */}
              <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                <button
                  onClick={() => {
                    setActiveBook(null);
                    playTactileSound('close', isMuted);
                  }}
                  className="text-xs font-mono font-bold text-white/80 hover:text-white underline cursor-pointer"
                >
                  Return to Shelf
                </button>

                {activeBook.liveUrl && (
                  <a
                    href={activeBook.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-[#1C1B17] hover:bg-[#1C1B17] hover:text-white transition px-5 py-2 rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow-md"
                  >
                    <span>Launch Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. FOOTER */}
      <footer className="border-t border-[#1C1B17]/10 py-12 px-6 text-center text-xs font-mono text-[#8A8574] space-y-3">
        <p>© {new Date().getFullYear()} {candidateName}. Designed as an interactive editorial bookshelf.</p>
        <div className="flex justify-center gap-6 text-[#1C1B17]">
          <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-[#E85D26] transition">LinkedIn</a>
          <a href={website} target="_blank" rel="noreferrer" className="hover:text-[#E85D26] transition">Website</a>
          <a href={github} target="_blank" rel="noreferrer" className="hover:text-[#E85D26] transition">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

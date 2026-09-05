import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  ArrowUpRight,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Terminal,
  Volume2,
  VolumeX,
  X,
  Compass,
  Zap,
  Activity,
  CheckCircle2,
  Send,
  Cpu,
  Globe,
  Code2,
  ChevronDown,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

// 4D Sound Synthesizer (Web Audio API)
function playHyperSound(type: 'warp' | 'click' | 'pulse' | 'dispatch' | 'toggle', isMuted: boolean) {
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

    if (type === 'warp') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'pulse') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'dispatch') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.1);
      osc.frequency.setValueAtTime(1174.66, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {}
}

export default function The4DHypercubeTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const links = (data as any)?.socialLinks || (data as any)?.links || {};
  const rawExperience = (data as any)?.experience || [];
  const rawEducation = (data as any)?.education || [];
  const rawProjects = (data as any)?.projects || (data as any)?.cmsProjects || [];

  const candidateName = profile?.name || "Prajwal DL";
  const bio =
    profile?.bio ||
    "Dedicated and adaptable Full Stack Developer & Web Advisor with a proactive attitude and strong problem-solving skills. Experienced in architecting performant web systems, DNS/SSL automations, and spatial UI engines.";
  const email = profile?.email || links?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || links?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || links?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = profile?.website || links?.website || "https://praxel.space/";
  const github = profile?.github || links?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeDimension, setActiveDimension] = useState(1);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [contactStatus, setContactStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 4D Project Hyper-Nodes
  const hyperProjects = [
    {
      id: "dim-1",
      dim: "DIMENSION α",
      title: "Portfolio OS",
      subtitle: "Multi-Theme Spatial Operating System",
      tech: ["React 19", "TypeScript", "Three.js", "TanStack Start", "Tailwind CSS"],
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP performance budget, and a dual draft-to-live pipeline with Studio HQ Terminal.",
      metrics: "Sub-100ms LCP · 20 Physical Metaphors · Zero Jitter",
      accent: "#00F5D4",
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
    },
    {
      id: "dim-2",
      dim: "DIMENSION β",
      title: "Praxel Space",
      subtitle: "Cloud Infrastructure & DNS Automation Platform",
      tech: ["DNS Management", "SSL Automation", "WordPress", "PHP", "MySQL"],
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, real-time DNS propagation health checks, and zero-downtime website migration pipelines.",
      metrics: "99.99% Uptime · Automated SSL · Instant DNS Sync",
      accent: "#7B2CBF",
      liveUrl: "https://praxel.space/",
    },
    {
      id: "dim-3",
      dim: "DIMENSION γ",
      title: "Vitvara Web App",
      subtitle: "High-Throughput Scalable Frontend Architecture",
      tech: ["React.js", "JavaScript", "REST APIs", "CSS3", "HTML5"],
      desc: "Engineered responsive, user-centric web applications with modern React.js state patterns and scalable REST API endpoints adhering to high performance budgets.",
      metrics: "60 FPS Transitions · Modular State · High Performance",
      accent: "#FF007F",
      liveUrl: "https://praxel.space/",
    },
    {
      id: "dim-4",
      dim: "DIMENSION δ",
      title: "Custom Client Platforms",
      subtitle: "Bespoke Enterprise Web & CMS Engineering",
      tech: ["Full Stack", "Node.js", "WordPress Architecture", "UI/UX Design"],
      desc: "Delivered bespoke client web applications and high-converting storefronts with custom WordPress architectures and secure contact pipelines.",
      metrics: "Custom Architecture · Secure Pipelines · Bespoke UI",
      accent: "#38BDF8",
      liveUrl: "https://praxel.space/",
    },
  ];

  // 4D Hypercube Math & Procedural Canvas Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angleXW = 0;
    let angleYW = 0;
    let angleZW = 0;
    let angleXY = 0;

    // 16 Vertices of a 4D Hypercube (Tesseract) in 4D Euclidean space [-1, 1]
    const vertices: number[][] = [];
    for (let i = 0; i < 16; i++) {
      vertices.push([
        (i & 1 ? 1 : -1) * 1.3,
        (i & 2 ? 1 : -1) * 1.3,
        (i & 4 ? 1 : -1) * 1.3,
        (i & 8 ? 1 : -1) * 1.3,
      ]);
    }

    // 32 Edges connecting vertices differing in exactly one coordinate
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        for (let k = 0; k < 4; k++) {
          if (vertices[i][k] !== vertices[j][k]) diff++;
        }
        if (diff === 1) edges.push([i, j]);
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
      setScrollProgress(progress);

      if (progress < 0.25) setActiveDimension(1);
      else if (progress < 0.5) setActiveDimension(2);
      else if (progress < 0.75) setActiveDimension(3);
      else setActiveDimension(4);
    };
    window.addEventListener("scroll", handleScroll);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Scroll actively drives 4D rotation speed and dimensional angle
      angleXW += 0.006 + scrollProgress * 0.03;
      angleYW += 0.008 + scrollProgress * 0.02;
      angleZW += 0.005 + scrollProgress * 0.025;
      angleXY += 0.004;

      // Project 4D -> 3D -> 2D
      const projected: { x: number; y: number; z: number; w: number }[] = [];

      for (const v of vertices) {
        let [x, y, z, w] = v;

        // 4D Rotation in XW plane
        const cosXW = Math.cos(angleXW);
        const sinXW = Math.sin(angleXW);
        const x1 = x * cosXW - w * sinXW;
        const w1 = x * sinXW + w * cosXW;
        x = x1;
        w = w1;

        // 4D Rotation in YW plane
        const cosYW = Math.cos(angleYW);
        const sinYW = Math.sin(angleYW);
        const y1 = y * cosYW - w * sinYW;
        const w2 = y * sinYW + w * cosYW;
        y = y1;
        w = w2;

        // 4D Rotation in ZW plane
        const cosZW = Math.cos(angleZW);
        const sinZW = Math.sin(angleZW);
        const z1 = z * cosZW - w * sinZW;
        const w3 = z * sinZW + w * cosZW;
        z = z1;
        w = w3;

        // 3D Rotation in XY plane
        const cosXY = Math.cos(angleXY);
        const sinXY = Math.sin(angleXY);
        const x2 = x * cosXY - y * sinXY;
        const y2 = x * sinXY + y * cosXY;
        x = x2;
        y = y2;

        // 4D to 3D Perspective Projection (Distance from 4D camera = 3.2)
        const d4 = 3.2;
        const scale4 = d4 / (d4 - w);
        const x3D = x * scale4;
        const y3D = y * scale4;
        const z3D = z * scale4;

        // 3D to 2D Screen Projection (Distance from 3D camera = 4.0)
        const d3 = 4.0;
        const scale3 = d3 / (d3 - z3D);
        const radius = Math.min(canvas.width, canvas.height) * 0.26;

        projected.push({
          x: cx + x3D * scale3 * radius,
          y: cy + y3D * scale3 * radius,
          z: z3D,
          w: w,
        });
      }

      // Draw 4D Hypercube Edges with depth-based chromatic glow
      for (const [i, j] of edges) {
        const p1 = projected[i];
        const p2 = projected[j];

        const avgW = (p1.w + p2.w) / 2;
        const alpha = Math.max(0.15, Math.min(0.9, (avgW + 1.5) / 3));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Chromatic Color shift based on active dimension
        const color =
          activeDimension === 1
            ? "rgba(0, 245, 212, " + alpha + ")"
            : activeDimension === 2
            ? "rgba(123, 44, 191, " + alpha + ")"
            : activeDimension === 3
            ? "rgba(255, 0, 127, " + alpha + ")"
            : "rgba(56, 189, 248, " + alpha + ")";

        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(1, (avgW + 2) * 1.5);
        ctx.shadowBlur = 12;
        ctx.shadowColor = color;
        ctx.stroke();
      }

      // Draw Glowing 4D Vertices
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const nodeSize = Math.max(3, (p.w + 2) * 3);

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = activeDimension === 1 ? "#00F5D4" : activeDimension === 2 ? "#C77DFF" : activeDimension === 3 ? "#FF007F" : "#38BDF8";
        ctx.shadowBlur = 16;
        ctx.shadowColor = ctx.fillStyle;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollProgress, activeDimension]);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setContactStatus('transmitting');
    playHyperSound('warp', isMuted);

    setTimeout(() => {
      setContactStatus('sent');
      playHyperSound('dispatch', isMuted);
      const subject = encodeURIComponent("[4D Transmission] Project Inquiry from " + formData.name);
      const body = encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\nMessage:\n" + formData.message);
      window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
    }, 1200);
  };

  return (
    <div className="min-h-[400vh] bg-[#05070B] text-[#E6F1FF] font-sans antialiased selection:bg-[#00F5D4] selection:text-[#05070B] relative">
      {/* 1. FIXED BACKGROUND 4D HYPERCUBE GLSL/2D CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-85"
      />

      {/* 2. FIXED 4D HUD TELEMETRY OVERLAY */}
      <div className="fixed top-0 inset-x-0 z-30 pointer-events-none flex justify-between items-center p-6 sm:p-8 backdrop-blur-[2px]">
        {/* Identity & Coordinates */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0B1019]/90 border border-[#00F5D4]/40 flex items-center justify-center shadow-[0_0_20px_rgba(0,245,212,0.3)]">
            <Layers className="w-5 h-5 text-[#00F5D4]" />
          </div>
          <div>
            <h1 className="font-mono font-black text-sm tracking-wider uppercase text-white flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00F5D4]/10 text-[#00F5D4] border border-[#00F5D4]/30">4D SPATIAL OS</span>
            </h1>
            <p className="text-[10px] font-mono text-[#8B9BB4] flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#00F5D4]" /> {location}
            </p>
          </div>
        </div>

        {/* Real-Time 4D Vector Coordinate Monitor */}
        <div className="hidden md:flex items-center gap-4 bg-[#0B1019]/80 border border-white/10 px-4 py-2 rounded-2xl font-mono text-[11px] shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
            <span className="text-white/70">W-AXIS SCROLL:</span>
            <span className="text-[#00F5D4] font-bold">{(scrollProgress * 360).toFixed(1)}°</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-2">
            <span className="text-white/70">DIMENSION:</span>
            <span className="text-[#FF007F] font-bold">0{activeDimension} / 04</span>
          </div>
        </div>

        {/* Audio Toggle & Quick Contact Trigger */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playHyperSound('toggle', !isMuted);
            }}
            className="w-10 h-10 rounded-xl bg-[#0B1019]/90 border border-white/15 text-white/80 hover:text-white hover:border-[#00F5D4] transition flex items-center justify-center cursor-pointer shadow-lg"
            title={isMuted ? "Enable 4D Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00F5D4]" />}
          </button>

          <a
            href="#contact-dimension"
            className="bg-[#00F5D4] text-[#05070B] hover:bg-white transition px-5 py-2 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,245,212,0.4)] inline-flex items-center gap-1.5"
          >
            <span>Transmit</span>
            <Zap className="w-3.5 h-3.5 fill-current" />
          </a>
        </div>
      </div>

      {/* 3. SCROLL-TRIGGERED 4D DIMENSIONAL CHAMBERS */}

      {/* CHAMBER 1: HERO & SPATIAL GENESIS */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HYPER-DIMENSIONAL PORTFOLIO ARCHITECTURE</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-mono font-black tracking-tight text-white uppercase leading-[1.05]">
            Engineering across <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5D4] via-[#7B2CBF] to-[#FF007F]">4 Dimensions</span>
          </h1>

          <p className="text-sm sm:text-base text-[#8B9BB4] max-w-xl mx-auto leading-relaxed">
            {bio}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#projects-dimension"
              onClick={() => playHyperSound('click', isMuted)}
              className="bg-[#0B1019] border border-[#00F5D4]/50 text-[#00F5D4] hover:bg-[#00F5D4] hover:text-[#05070B] transition px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-xl inline-flex items-center gap-2"
            >
              <span>Traverse Dimensions</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-[#0B1019] border border-white/15 text-white/80 hover:text-white hover:border-white transition px-6 py-3 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              LinkedIn Profile
            </a>
          </div>
        </motion.div>
      </section>

      {/* CHAMBER 2: 4D PROJECT HYPER-NODES */}
      <section id="projects-dimension" className="min-h-screen py-24 px-6 sm:px-12 max-w-7xl mx-auto relative z-10 flex flex-col justify-center">
        <div className="space-y-3 mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00F5D4] uppercase block">
            DIMENSION 02 · HYPER-SPATIAL SYSTEMS
          </span>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold text-white uppercase">
            Architected &amp; Shipped Deliverables
          </h2>
          <p className="text-xs sm:text-sm text-[#8B9BB4] max-w-lg">
            Scroll drives rotation through the 4D manifold. Click any project node to expand its architectural telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hyperProjects.map((p, idx) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => {
                setSelectedProject(p);
                playHyperSound('pulse', isMuted);
              }}
              className="p-7 rounded-3xl bg-[#0B1019]/90 border border-white/10 hover:border-[#00F5D4]/60 transition cursor-pointer space-y-4 shadow-2xl backdrop-blur-xl group relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-[#00F5D4] uppercase px-2.5 py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30">
                  {p.dim}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover:text-[#00F5D4] group-hover:bg-[#00F5D4]/10 transition">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-mono font-bold text-white group-hover:text-[#00F5D4] transition">
                  {p.title}
                </h3>
                <p className="text-xs text-[#8B9BB4] mt-1 font-mono">{p.subtitle}</p>
              </div>

              <p className="text-xs text-[#C5D1E2] leading-relaxed line-clamp-2">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CHAMBER 3: CAREER TRAJECTORY & SKILLS HYPER-MATRIX */}
      <section className="min-h-screen py-24 px-6 sm:px-12 max-w-7xl mx-auto relative z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Work History */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#7B2CBF] uppercase block">
                DIMENSION 03 · CHRONICLES
              </span>
              <h2 className="text-3xl font-mono font-bold text-white uppercase mt-1">
                Career Trajectory
              </h2>
            </div>

            <div className="space-y-4">
              {rawExperience.map((exp: any, i: number) => (
                <div key={i} className="p-5 rounded-2xl bg-[#0B1019]/90 border border-white/10 space-y-2 backdrop-blur-xl">
                  <div className="flex justify-between items-center text-sm font-mono font-bold text-white">
                    <span>{exp.role}</span>
                    <span className="text-xs text-[#00F5D4]">{exp.startDate} – {exp.endDate || "Present"}</span>
                  </div>
                  <p className="text-xs font-mono text-[#8B9BB4]">{exp.company} · {exp.location}</p>
                  <p className="text-xs text-[#C5D1E2] leading-relaxed">{exp.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Matrix & Education */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF007F] uppercase block">
                DIMENSION 03 · CAPABILITIES
              </span>
              <h2 className="text-3xl font-mono font-bold text-white uppercase mt-1">
                Proficiency Matrix
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B1019]/90 border border-white/10 space-y-4 backdrop-blur-xl">
              <div className="flex flex-wrap gap-2">
                {[
                  "Frontend Architecture",
                  "React.js & TypeScript",
                  "Three.js / WebGL",
                  "Tailwind CSS",
                  "Technical Troubleshooting",
                  "WordPress Engineering",
                  "DNS & SSL Automation",
                  "PHP & MySQL",
                  "REST APIs",
                  "UI/UX Design",
                  "Server Migrations",
                ].map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs font-mono text-white/90">
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-[11px] font-mono text-[#8B9BB4] uppercase block">Academic Credentials</span>
                {rawEducation.map((edu: any, i: number) => (
                  <div key={i} className="text-xs font-mono space-y-0.5">
                    <p className="font-bold text-white">{edu.degree}</p>
                    <p className="text-[#8B9BB4]">{edu.institution} · {edu.graduationDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAMBER 4: QUANTUM TRANSMISSION (CONTACT FORM) */}
      <section id="contact-dimension" className="min-h-screen py-24 px-6 sm:px-12 max-w-4xl mx-auto relative z-10 flex flex-col justify-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#0B1019]/95 border border-[#00F5D4]/40 shadow-[0_0_80px_rgba(0,245,212,0.15)] space-y-8 backdrop-blur-2xl">
          <div className="space-y-2 border-b border-white/10 pb-6">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00F5D4] uppercase block">
              DIMENSION 04 · TRANSMISSION CONSOLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white uppercase">
              Initiate 4D Uplink
            </h2>
            <p className="text-xs sm:text-sm text-[#8B9BB4]">
              Transmit your opportunity or project specification directly into Prajwal DL's terminal inbox.
            </p>
          </div>

          {contactStatus !== 'sent' ? (
            <form onSubmit={handleTransmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-white/80 uppercase block">Name / Entity</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full bg-[#05070B] border border-white/15 text-white px-4 py-3 rounded-xl text-xs font-mono placeholder:text-white/30 focus:outline-none focus:border-[#00F5D4]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-white/80 uppercase block">Transmission Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@domain.com"
                    className="w-full bg-[#05070B] border border-white/15 text-white px-4 py-3 rounded-xl text-xs font-mono placeholder:text-white/30 focus:outline-none focus:border-[#00F5D4]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-white/80 uppercase block">Message Payload</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe project requirements, timeline, or advisory scope..."
                  className="w-full bg-[#05070B] border border-white/15 text-white px-4 py-3 rounded-xl text-xs font-mono placeholder:text-white/30 focus:outline-none focus:border-[#00F5D4]"
                />
              </div>

              <button
                type="submit"
                disabled={contactStatus === 'transmitting'}
                className="w-full bg-[#00F5D4] text-[#05070B] hover:bg-white transition py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {contactStatus === 'transmitting' ? (
                  <span>Transmitting across dimensions...</span>
                ) : (
                  <>
                    <span>Transmit Signal to pdlkpt@gmail.com</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center space-y-4 py-8"
            >
              <div className="w-16 h-16 rounded-full bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4] flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-mono font-bold text-white uppercase">Transmission Delivered</h3>
              <p className="text-xs font-mono text-[#8B9BB4] max-w-sm mx-auto">
                Your transmission has been confirmed and routed to <span className="text-[#00F5D4]">{email}</span>.
              </p>
              <button
                onClick={() => {
                  setContactStatus('idle');
                  setFormData({ name: "", email: "", message: "" });
                }}
                className="text-xs font-mono font-bold text-[#00F5D4] underline cursor-pointer"
              >
                Send Another Transmission
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* 4. MODAL: 4D PROJECT TELEMETRY INSPECTOR */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="max-w-2xl w-full rounded-3xl bg-[#0B1019] border border-[#00F5D4]/50 p-8 text-white space-y-6 shadow-[0_0_90px_rgba(0,245,212,0.3)] relative"
            >
              <button
                onClick={() => {
                  setSelectedProject(null);
                  playHyperSound('click', isMuted);
                }}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-[#00F5D4] font-bold">{selectedProject.dim}</span>
                <h3 className="text-3xl font-mono font-bold">{selectedProject.title}</h3>
                <p className="text-xs font-mono text-[#8B9BB4]">{selectedProject.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-[#C5D1E2] leading-relaxed">
                {selectedProject.desc}
              </p>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs font-mono">
                <span className="text-[#00F5D4] font-bold">TELEMETRY BENCHMARKS:</span>
                <p className="text-[#8B9BB4]">{selectedProject.metrics}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t: string) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-[#00F5D4]/10 text-[#00F5D4] border border-[#00F5D4]/30 text-xs font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs font-mono text-white/60 hover:text-white underline cursor-pointer"
                >
                  Close Dimension
                </button>

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#00F5D4] text-[#05070B] hover:bg-white transition px-5 py-2 rounded-xl font-mono font-bold text-xs uppercase inline-flex items-center gap-2 shadow-lg"
                  >
                    <span>Launch Live URL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-xs font-mono text-[#8B9BB4] relative z-10 space-y-3">
        <p>© {new Date().getFullYear()} {candidateName} · 4D Hyper-Spatial Architecture</p>
        <div className="flex justify-center gap-6 text-[#E6F1FF]">
          <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-[#00F5D4] transition">LinkedIn</a>
          <a href={website} target="_blank" rel="noreferrer" className="hover:text-[#00F5D4] transition">Praxel.space</a>
          <a href={github} target="_blank" rel="noreferrer" className="hover:text-[#00F5D4] transition">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

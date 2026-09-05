import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Telescope,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Globe,
  Radio,
  Clock,
  Layers
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playCelestialSound(type: 'chime' | 'pulse' | 'lens' | 'signal', isMuted: boolean) {
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

    if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.3);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.8);
    } else if (type === 'pulse') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'lens') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch {}
}

export default function TheObservatory({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Developer & Web Advisor architecting high-performance digital systems, stellar 3D spatial interfaces, and automated infrastructure.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const livePlatform = "https://praxel.space/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedConstellation, setSelectedConstellation] = useState<any | null>(null);
  const [telescopeZoom, setTelescopeZoom] = useState(1.0);
  const [formSent, setFormSent] = useState(false);
  const [azimuth, setAzimuth] = useState(142.8);
  const [altitude, setAltitude] = useState(38.4);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Celestial Heightfield & Astrolabe Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate fixed stellar objects
    const stars: { x: number; y: number; z: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      time += 0.01;
      ctx.fillStyle = '#060814';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // 1. Draw 3D Astrolabe Brass Rings
      ctx.save();
      ctx.translate(cx, cy);

      // Outer Astrolabe Ring
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 320 * telescopeZoom, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Equator Ring with tilt
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 240 * telescopeZoom, 80 * telescopeZoom, time * 0.1, 0, Math.PI * 2);
      ctx.stroke();

      // Meridian Ring
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 100 * telescopeZoom, 320 * telescopeZoom, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Topographical celestial heightfield grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 14;
      const spacing = 45 * telescopeZoom;
      for (let i = -gridSize; i <= gridSize; i++) {
        ctx.beginPath();
        for (let j = -gridSize; j <= gridSize; j++) {
          const gx = i * spacing;
          const gy = j * spacing;
          const dist = Math.sqrt(gx * gx + gy * gy);
          const height = Math.sin(dist * 0.02 - time * 2) * 15 * Math.cos(time + i * 0.2);
          const px = gx;
          const py = gy + height;
          if (j === -gridSize) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      ctx.restore();

      // 2. Draw 3D Celestial Stars & Orrery Nodes
      stars.forEach((star) => {
        star.z -= star.speed;
        if (star.z <= 10) star.z = 1000;

        const k = 400 / star.z * telescopeZoom;
        const px = cx + star.x * k;
        const py = cy + star.y * k;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.fillStyle = `rgba(240, 230, 200, ${star.alpha * (1 - star.z / 1000)})`;
          ctx.beginPath();
          ctx.arc(px, py, star.size * k * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [telescopeZoom]);

  const constellations = [
    {
      id: "const-1",
      name: "Portfolio OS System",
      coords: "RA 14h 29m / DEC -62°40'",
      category: "CORE ARCHITECTURE",
      summary: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      skills: ["React 19", "TypeScript", "Three.js", "Tailwind CSS"],
      liveUrl: livePlatform,
      githubUrl: github,
      highlight: "Award-winning WebGL visual rendering & 4D Tesseract projection",
    },
    {
      id: "const-2",
      name: "Praxel Space Cloud",
      coords: "RA 05h 35m / DEC -05°23'",
      category: "CLOUD INFRASTRUCTURE",
      summary: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud telemetry.",
      skills: ["DNS Automation", "SSL Certbot", "PHP", "MySQL", "REST API"],
      liveUrl: "https://praxel.space/",
      githubUrl: github,
      highlight: "Zero-downtime certificate renewals & automated DNS record verification",
    },
    {
      id: "const-3",
      name: "Vitvara Web Ecosystem",
      coords: "RA 18h 36m / DEC +38°47'",
      category: "ENTERPRISE APPLICATIONS",
      summary: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      skills: ["React.js", "State Management", "Modern CSS", "HTML5"],
      liveUrl: livePlatform,
      githubUrl: github,
      highlight: "High-throughput frontend with robust accessibility standards",
    },
    {
      id: "const-4",
      name: "Enterprise Client Portals",
      coords: "RA 20h 41m / DEC +45°16'",
      category: "BESPOKE DIGITAL SUITES",
      summary: "Custom WordPress & Node.js client platforms with streamlined customer engagement funnels and responsive UI/UX.",
      skills: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: livePlatform,
      githubUrl: github,
      highlight: "Delivered 100% bespoke client solutions with sub-second page loads",
    },
  ];

  const careerOrbits = [
    {
      period: "2023 — PRESENT",
      role: "Freelance Full Stack Developer & Web Advisor",
      entity: "Independent Practice · Mangalore / Remote",
      description: "Architecting bespoke web applications, 3D WebGL user interfaces, and automated cloud workflows for global clients.",
    },
    {
      period: "2022 — 2023",
      role: "Web Operations Specialist",
      entity: "GlowTouch Technologies · Mangalore, India",
      description: "Managed high-availability server infrastructure, automated DNS & SSL configurations, and optimized client website performance.",
    },
    {
      period: "2021 — 2022",
      role: "Frontend Developer",
      entity: "Vitvara Technologies",
      description: "Developed modern React interfaces, integrated RESTful microservices, and elevated UI/UX responsiveness across mobile viewports.",
    },
    {
      period: "EDUCATION",
      role: "Diploma in Computer Science & Engineering",
      entity: "Karnataka (Govt) Polytechnic, Mangalore",
      description: "Foundation in algorithms, data structures, computer networks, and full-stack software architecture.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#060814] text-[#F3E8FF] font-serif relative overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      {/* 3D Celestial Astrolabe Background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Brass Telescope Vignette */}
      <div className="fixed inset-0 pointer-events-none z-10 shadow-[inset_0_0_150px_rgba(0,0,0,0.85)]" />

      {/* HEADER: Observatory Telemetry */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0A0D20]/80 border-b border-[#D4AF37]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <Telescope className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-[#F5E6C8] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">OBSERVATORY</span>
            </h1>
            <p className="text-[10px] font-mono text-[#94A3B8]">AZ: {azimuth}° · ALT: {altitude}° · {location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#0F142D] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-xs font-mono text-[#D4AF37]">
            <span>MAG: {(telescopeZoom * 100).toFixed(0)}%</span>
            <button
              onClick={() => {
                setTelescopeZoom(z => Math.min(1.6, z + 0.2));
                setAzimuth(a => +(a + 1.2).toFixed(1));
                playCelestialSound('lens', isMuted);
              }}
              className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-black transition"
            >
              +
            </button>
            <button
              onClick={() => {
                setTelescopeZoom(z => Math.max(0.6, z - 0.2));
                setAltitude(al => +(al - 0.8).toFixed(1));
                playCelestialSound('lens', isMuted);
              }}
              className="px-1.5 py-0.5 rounded bg-[#D4AF37]/20 hover:bg-[#D4AF37] hover:text-black transition"
            >
              -
            </button>
          </div>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playCelestialSound('chime', !isMuted);
            }}
            className="w-9 h-9 rounded-full bg-[#0F142D] border border-[#D4AF37]/40 text-[#F5E6C8] flex items-center justify-center hover:border-[#D4AF37] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
          </button>
        </div>
      </header>

      {/* HERO: Refractor Chamber */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" /> CELESTIAL METAPHOR · ROYAL OBSERVATORY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-normal tracking-wide text-[#F5E6C8] drop-shadow-[0_2px_15px_rgba(212,175,55,0.3)]"
          >
            Charting Digital Constellations
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#CBD5E1] max-w-2xl mx-auto font-sans leading-relaxed"
          >
            {bio}
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="#constellations"
              onClick={() => playCelestialSound('pulse', isMuted)}
              className="px-6 py-3 rounded-full bg-[#D4AF37] text-[#060814] font-mono font-bold text-xs hover:bg-[#F5E6C8] transition shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-2"
            >
              <Compass className="w-4 h-4" /> EXPLORE CONSTELLATIONS
            </a>
            <a
              href="#contact"
              onClick={() => playCelestialSound('signal', isMuted)}
              className="px-6 py-3 rounded-full bg-[#0F142D] border border-[#D4AF37]/40 text-[#F5E6C8] font-mono text-xs hover:border-[#D4AF37] transition flex items-center gap-2"
            >
              <Radio className="w-4 h-4 text-[#D4AF37]" /> TRANSMIT TELEGRAM
            </a>
          </div>
        </section>

        {/* CONSTELLATION PROJECTS */}
        <section id="constellations" className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
            <h3 className="text-2xl font-normal text-[#F5E6C8] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#D4AF37]" /> Major Celestial Systems
            </h3>
            <span className="text-xs font-mono text-[#D4AF37]">4 SECTORS CATALOGED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {constellations.map((c, i) => (
              <motion.div
                key={c.id}
                whileHover={{ y: -4, borderColor: "rgba(212, 175, 55, 0.8)" }}
                onClick={() => {
                  setSelectedConstellation(c);
                  playCelestialSound('lens', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#0A0D20]/90 border border-[#D4AF37]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition">
                  <Compass className="w-16 h-16 text-[#D4AF37]" />
                </div>

                <div className="text-[11px] font-mono text-[#D4AF37] mb-2 flex justify-between items-center">
                  <span>{c.coords}</span>
                  <span className="px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/30">{c.category}</span>
                </div>

                <h4 className="text-xl font-bold text-[#F5E6C8] group-hover:text-[#D4AF37] transition mb-2">
                  {c.name}
                </h4>

                <p className="text-xs text-[#94A3B8] font-sans leading-relaxed mb-4">
                  {c.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {c.skills.map((s) => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#060814] text-[#E2E8F0] border border-[#334155]">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#D4AF37] group-hover:underline">
                  <span>ALIGN REFRACTOR LENS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAREER ORBITAL TRAJECTORY */}
        <section className="space-y-8">
          <div className="border-b border-[#D4AF37]/30 pb-4">
            <h3 className="text-2xl font-normal text-[#F5E6C8] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D4AF37]" /> Career Orbital Trajectory
            </h3>
          </div>

          <div className="space-y-4">
            {careerOrbits.map((orb, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#0A0D20]/70 border border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
                    {orb.period}
                  </span>
                  <h4 className="text-base font-bold text-[#F5E6C8]">{orb.role}</h4>
                  <p className="text-xs text-[#38BDF8] font-mono">{orb.entity}</p>
                  <p className="text-xs text-[#94A3B8] font-sans">{orb.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT TELEGRAM */}
        <section id="contact" className="p-8 rounded-3xl bg-[#0A0D20]/90 border border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-normal text-[#F5E6C8]">Astrolabe Telegraph Dispatch</h3>
            <p className="text-xs text-[#94A3B8] font-sans">
              Send a direct transmission across the celestial wire to Prajwal DL.
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mx-auto" />
              <p className="font-bold text-[#F5E6C8]">Transmission Dispatched to Observatory Logs</p>
              <p className="text-xs text-[#94A3B8] font-mono">Prajwal DL will decode your telegram shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playCelestialSound('chime', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto font-sans text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#D4AF37] font-mono mb-1">CALLSIGN / NAME</label>
                  <input
                    required
                    defaultValue="Fellow Navigator"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060814] border border-[#D4AF37]/30 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[#D4AF37] font-mono mb-1">TELEGRAPH FREQUENCY / EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="visitor@observatory.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060814] border border-[#D4AF37]/30 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#D4AF37] font-mono mb-1">CELESTIAL DISPATCH</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting collaboration on full-stack architecture and high-performance WebGL systems."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#060814] border border-[#D4AF37]/30 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#D4AF37] text-[#060814] font-mono font-bold hover:bg-[#F5E6C8] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <Send className="w-4 h-4" /> TRANSMIT DISPATCH ({email})
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#D4AF37]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#94A3B8]">
            <span>STATION: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline">LINKEDIN</a>
              <a href={livePlatform} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* TELESCOPE MODAL */}
      <AnimatePresence>
        {selectedConstellation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0A0D20] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(212,175,55,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedConstellation(null);
                  playCelestialSound('pulse', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                  {selectedConstellation.coords}
                </span>
                <h3 className="text-2xl font-bold text-[#F5E6C8]">{selectedConstellation.name}</h3>
                <p className="text-xs text-[#38BDF8] font-mono">{selectedConstellation.category}</p>
              </div>

              <p className="text-sm text-[#CBD5E1] font-sans leading-relaxed">
                {selectedConstellation.summary}
              </p>

              <div className="p-3.5 rounded-xl bg-[#060814] border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37]">
                ★ HIGHLIGHT: {selectedConstellation.highlight}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#94A3B8]">TECHNOLOGY STACK</span>
                <div className="flex flex-wrap gap-2">
                  {selectedConstellation.skills.map((s: string) => (
                    <span key={s} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#0F142D] text-white border border-[#334155]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedConstellation.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#D4AF37] text-black font-mono font-bold text-xs text-center hover:bg-[#F5E6C8] transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LIVE TELEMETRY
                </a>
                <a
                  href={selectedConstellation.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#060814] border border-[#D4AF37]/40 text-[#F5E6C8] font-mono text-xs text-center hover:border-[#D4AF37] transition flex items-center justify-center gap-1.5"
                >
                  SOURCE ARCHIVES
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

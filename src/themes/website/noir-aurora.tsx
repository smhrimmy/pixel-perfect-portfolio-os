import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Waves,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Anchor,
  Compass,
  CircleDot
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playSonarSound(type: 'ripple' | 'sonar' | 'stone' | 'splash', isMuted: boolean) {
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

    if (type === 'ripple') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'sonar') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.start(now);
      osc.stop(now + 1.2);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(150, now + 0.25);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  } catch {}
}

export default function TheReservoir({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Architect & Web Advisor engineering liquid-smooth digital platforms, automated infrastructure, and sub-100ms web systems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedStone, setSelectedStone] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [rippleCount, setRippleCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; alpha: number }[]>([]);

  // 3D Liquid Wave Heightfield Canvas
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

    const handlePointerMove = (e: MouseEvent) => {
      if (Math.random() < 0.2) {
        ripplesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          radius: 2,
          maxRadius: Math.random() * 80 + 40,
          alpha: 0.6,
        });
      }
    };
    window.addEventListener('mousemove', handlePointerMove);

    const render = () => {
      time += 0.015;
      ctx.fillStyle = '#05070D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw 3D Liquid Surface Wave Heightfield
      const cols = 28;
      const rows = 18;
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const gx = c * cellW;
          const gy = r * cellH;
          // Fluid harmonic equation
          const wave = Math.sin(c * 0.3 + time * 1.5) * 12 + Math.cos(r * 0.4 + time * 1.2) * 8;
          const px = gx;
          const py = gy + wave;

          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        const grad = ctx.createLinearGradient(0, r * cellH, canvas.width, r * cellH);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.03)');
        grad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
        grad.addColorStop(1, 'rgba(168, 85, 247, 0.04)');
        ctx.strokeStyle = grad;
        ctx.stroke();
      }

      // 2. Render Interactive Sonar Ripples
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += 1.8;
        rip.alpha *= 0.96;

        ctx.strokeStyle = `rgba(56, 189, 248, ${rip.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (rip.alpha < 0.01 || rip.radius > rip.maxRadius) {
          ripplesRef.current.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const stones = [
    {
      id: "stone-1",
      title: "Portfolio OS Basin",
      category: "CORE ARCHITECTURE",
      depth: "Depth: 100 Fathoms",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, interactive 3D heightfield topography, and sub-100ms LCP.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "stone-2",
      title: "Praxel Space Cloud",
      category: "AUTOMATED TELEMETRY",
      depth: "Depth: 75 Fathoms",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "stone-3",
      title: "Vitvara Web Applications",
      category: "RESPONSIVE CLIENT",
      depth: "Depth: 50 Fathoms",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "stone-4",
      title: "Enterprise Client Solutions",
      category: "BESPOKE PLATFORMS",
      depth: "Depth: 40 Fathoms",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  const triggerSonar = (e: React.MouseEvent) => {
    ripplesRef.current.push({
      x: e.clientX,
      y: e.clientY,
      radius: 4,
      maxRadius: 180,
      alpha: 0.9,
    });
    setRippleCount(c => c + 1);
    playSonarSound('sonar', isMuted);
  };

  return (
    <div
      onClick={triggerSonar}
      className="min-h-screen bg-[#05070D] text-[#E2E8F0] font-sans relative selection:bg-[#06B6D4] selection:text-black overflow-x-hidden"
    >
      {/* 3D Liquid Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Hydro Vignette */}
      <div className="fixed inset-0 pointer-events-none z-10 shadow-[inset_0_0_160px_rgba(0,0,0,0.85)]" />

      {/* HEADER: Hydro-Residue Basin */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#080C16]/80 border-b border-[#06B6D4]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#06B6D4] bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/40">THE RESERVOIR</span>
            </h1>
            <p className="text-[10px] font-mono text-[#94A3B8]">{location} · SONAR CLICKS: {rippleCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
              playSonarSound('ripple', !isMuted);
            }}
            className="w-9 h-9 rounded-full bg-[#0F172A] border border-[#06B6D4]/40 text-[#E2E8F0] flex items-center justify-center hover:border-[#06B6D4] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#06B6D4]" />}
          </button>
        </div>
      </header>

      {/* MAIN RESERVOIR STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/40 text-[#06B6D4] text-xs font-mono"
          >
            <Droplets className="w-3.5 h-3.5" /> LIQUID HEIGHTFIELD · MOONLIT BASIN
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_20px_rgba(6,182,212,0.4)]"
          >
            Fluid Architecture & Scalable Systems
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* SUBMERGED MONOLITHS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#06B6D4]/30 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CircleDot className="w-5 h-5 text-[#06B6D4]" /> Submerged Monoliths & Case Studies
            </h3>
            <span className="text-xs font-mono text-[#06B6D4]">CLICK SURFACE TO CAST SONAR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stones.map((st) => (
              <motion.div
                key={st.id}
                whileHover={{ y: -4, borderColor: "rgba(6, 182, 212, 0.8)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStone(st);
                  playSonarSound('stone', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#080C16]/90 border border-[#06B6D4]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[11px] font-mono text-[#06B6D4] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#06B6D4]/10 border border-[#06B6D4]/30">{st.category}</span>
                  <span>{st.depth}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-[#06B6D4] transition mb-2">
                  {st.title}
                </h4>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                  {st.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {st.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0F172A] text-[#E2E8F0] border border-[#334155]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#06B6D4] group-hover:underline">
                  <span>INSPECT SUBMERGED MONOLITH</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BASIN CONTACT DISPATCH */}
        <section
          onClick={(e) => e.stopPropagation()}
          className="p-8 rounded-3xl bg-[#080C16]/90 border border-[#06B6D4]/40 shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6"
        >
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Cast a Message into the Reservoir</h3>
            <p className="text-xs text-[#94A3B8]">
              Transmit direct correspondence to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#06B6D4] mx-auto" />
              <p className="font-bold text-white">Transmission Rippled Through the Water Basin</p>
              <p className="text-xs text-[#94A3B8] font-mono">Prajwal DL will respond shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playSonarSound('splash', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#06B6D4] font-mono mb-1">CALLER IDENTIFIER</label>
                  <input
                    required
                    defaultValue="Exploration Team"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-[#06B6D4]/30 text-white focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>
                <div>
                  <label className="block text-[#06B6D4] font-mono mb-1">RETURN EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="collaborator@reservoir.space"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-[#06B6D4]/30 text-white focus:outline-none focus:border-[#06B6D4]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#06B6D4] font-mono mb-1">DISPATCH INQUIRY</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Inquiring regarding high-performance React 19 architecture and 3D WebGL user interfaces."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#05070D] border border-[#06B6D4]/30 text-white focus:outline-none focus:border-[#06B6D4]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#06B6D4] text-black font-mono font-bold hover:bg-[#38BDF8] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                <Send className="w-4 h-4" /> DISPATCH SONAR TRANSMISSION
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#06B6D4]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#94A3B8]">
            <span>STATION: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#06B6D4] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#06B6D4] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#06B6D4] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* STONE INSPECT MODAL */}
      <AnimatePresence>
        {selectedStone && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#080C16] border-2 border-[#06B6D4] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(6,182,212,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedStone(null);
                  playSonarSound('ripple', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] hover:bg-[#06B6D4] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06B6D4]/20 text-[#06B6D4] border border-[#06B6D4]/40">
                  {selectedStone.category} · {selectedStone.depth}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedStone.title}</h3>
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {selectedStone.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#06B6D4]">CORE TECHNOLOGIES</span>
                <div className="flex flex-wrap gap-2">
                  {selectedStone.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#0F172A] text-white border border-[#334155]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedStone.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#06B6D4] text-black font-mono font-bold text-xs text-center hover:bg-[#38BDF8] transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LIVE REPOSITORY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

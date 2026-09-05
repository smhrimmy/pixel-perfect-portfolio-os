import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Play,
  RotateCw,
  Layers
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playProjectionSound(type: 'reel' | 'shutter' | 'beam' | 'clatter', isMuted: boolean) {
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

    if (type === 'reel') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(24, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'shutter') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(48, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {}
}

export default function TheProjectionRoom({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Chief Projectionist projecting 35mm cinematic digital experiences, volumetric WebGL light beams, and sub-100ms ultra-smooth motion systems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [fps, setFps] = useState(24);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Volumetric Light Beam & Spinning Film Reel Canvas
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

    const render = () => {
      time += 0.03;
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.35;

      // 1. Draw Volumetric Light Beam Cone from Projector Lens
      const beamGrad = ctx.createLinearGradient(cx, 0, cx, canvas.height * 0.7);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
      beamGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      beamGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 30, 0);
      ctx.lineTo(cx + 30, 0);
      ctx.lineTo(cx + 350, canvas.height * 0.7);
      ctx.lineTo(cx - 350, canvas.height * 0.7);
      ctx.closePath();
      ctx.fill();

      // 2. Spinning Film Reel Circles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx - 100, cy - 80, 50, 0, Math.PI * 2);
      ctx.arc(cx + 100, cy - 80, 50, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const reels = [
    {
      id: "reel-1",
      reelNum: "REEL 01 / 35MM NITRATE",
      title: "Portfolio OS Feature",
      aspectRatio: "2.39:1 ANAMORPHIC",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "reel-2",
      reelNum: "REEL 02 / 70MM IMAX",
      title: "Praxel Space Cloud Cinema",
      aspectRatio: "1.43:1 IMAX",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "reel-3",
      reelNum: "REEL 03 / TECHNICOLOR",
      title: "Vitvara Application Sequence",
      aspectRatio: "1.85:1 VISTAVISION",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "reel-4",
      reelNum: "REEL 04 / DIRECTOR'S CUT",
      title: "Enterprise Client Premiere",
      aspectRatio: "2.35:1 CINEMASCOPE",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3F4F6] font-sans relative selection:bg-white selection:text-black overflow-x-hidden">
      {/* 3D Volumetric Projection Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Celluloid Film Flicker Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 shadow-[inset_0_0_180px_rgba(0,0,0,0.95)]" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0A0A0A]/90 border-b border-white/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 text-white flex items-center justify-center">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white border border-white/30">PROJECTION ROOM</span>
            </h1>
            <p className="text-[10px] font-mono text-zinc-400">{location} · {fps} FPS SHUTTER</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playProjectionSound('reel', !isMuted);
            }}
            className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-white/30 text-white flex items-center justify-center hover:border-white transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-white" />}
          </button>
        </div>
      </header>

      {/* MAIN PROJECTION STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/30 text-white text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" /> 35MM CINEMATIC METAPHOR · PROJECTION BOOTH
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_25px_rgba(255,255,255,0.3)] uppercase"
          >
            Projecting High-Impact Digital Visions
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* FILM REELS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-white/20 pb-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Play className="w-5 h-5 text-white" /> 35mm Celluloid Reels
            </h3>
            <span className="text-xs font-mono text-zinc-400">CLICK REEL TO PROJECT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reels.map((r) => (
              <motion.div
                key={r.id}
                whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.8)" }}
                onClick={() => {
                  setSelectedFilm(r);
                  playProjectionSound('shutter', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#0F0F0F]/90 border border-white/20 backdrop-blur-md cursor-pointer transition shadow-[0_4px_25px_rgba(0,0,0,0.8)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400 mb-3">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">{r.reelNum}</span>
                  <span>{r.aspectRatio}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-zinc-200 transition mb-2">
                  {r.title}
                </h4>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {r.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {r.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black text-zinc-200 border border-zinc-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-white group-hover:underline">
                  <span>PROJECT FEATURE FILM</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PROJECTION ROOM CONTACT */}
        <section className="p-8 rounded-3xl bg-[#0F0F0F]/90 border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.1)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Projector Booth Transmission</h3>
            <p className="text-xs text-zinc-400">
              Send screening inquiries directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-white/10 border border-white text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-white mx-auto" />
              <p className="font-bold text-white">Transmission Screened on Main Projection Board</p>
              <p className="text-xs text-zinc-400 font-mono">Prajwal DL will project your response soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playProjectionSound('beam', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">CINEMA PRODUCER</label>
                  <input
                    required
                    defaultValue="Film Producer"
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 font-mono mb-1">STUDIO EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="producer@studio.film"
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 font-mono mb-1">SCREENING INQUIRY</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design and high-performance WebGL cinematic systems."
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white focus:outline-none focus:border-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-black font-mono font-bold text-xs hover:bg-zinc-200 transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.4)]"
              >
                <Send className="w-4 h-4" /> TRANSMIT SCREENING REQUISITION
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-white/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-zinc-400">
            <span>BOOTH: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-white hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-white hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-white hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* REEL MODAL */}
      <AnimatePresence>
        {selectedFilm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F0F0F] border-2 border-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(255,255,255,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedFilm(null);
                  playProjectionSound('shutter', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white border border-white/30">
                  {selectedFilm.reelNum} · {selectedFilm.aspectRatio}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedFilm.title}</h3>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {selectedFilm.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-white">CINEMATOGRAPHY TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedFilm.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black text-white border border-zinc-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedFilm.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white text-black font-mono font-bold text-xs text-center hover:bg-zinc-200 transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> SCREEN LIVE REEL
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film, Clapperboard, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Play, Tv
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playCinemaAudio(type: 'projector' | 'ticket' | 'reel', isMuted: boolean) {
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

    if (type === 'projector') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(24, now); // 24 FPS ticker
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'ticket') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function CinematicDarkTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Celluloid Systems Cinematographer & Projection Booth Engineer spinning 35mm film reels at 24 FPS, casting carbon-arc light beams, and delivering sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedReel, setSelectedReel] = useState<any | null>(null);
  const [fpsRate, setFpsRate] = useState<number>(24);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 35mm Film Grain & Projector Light Beam Canvas
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
      time += 0.02;
      ctx.fillStyle = '#08080C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Carbon Arc Projector Beam
      const grad = ctx.createRadialGradient(
        canvas.width / 2, 0, 30,
        canvas.width / 2, canvas.height * 0.7, canvas.width * 0.6
      );
      grad.addColorStop(0, 'rgba(244, 63, 94, 0.15)');
      grad.addColorStop(1, 'rgba(8, 8, 12, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 35mm Sprocket Holes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.fillRect(15, y, 12, 20);
        ctx.fillRect(canvas.width - 27, y, 12, 20);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [fpsRate]);

  const celluloidReels = [
    {
      id: "reel-1",
      reelNo: "REEL 01 · 35MM MASTER",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      runtime: "FEATURE LENGTH · 24 FPS"
    },
    {
      id: "reel-2",
      reelNo: "REEL 02 · CLOUD FEATURE",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      runtime: "CLOUD DOC · 100% UPTIME"
    },
    {
      id: "reel-3",
      reelNo: "REEL 03 · FRONTEND SHORT",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      runtime: "SUB-100MS HIGH SPEED"
    },
    {
      id: "reel-4",
      reelNo: "REEL 04 · BESPOKE CHRONICLE",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      runtime: "ENTERPRISE RUN"
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080C] text-[#FFE4E6] font-mono relative selection:bg-[#F43F5E] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,12,0.85)_80%)]" />

      {/* TOP BOOTH HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#17121C]/90 border-b border-[#F43F5E]/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F43F5E]/20 border border-[#F43F5E] text-[#FB7185] flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-widest text-[#FFE4E6] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#F43F5E]/20 text-[#FB7185] border border-[#F43F5E]/40">
                PROJECTION BOOTH
              </span>
            </h1>
            <p className="text-[10px] text-rose-300/70">
              HASH: <span className="text-[#F43F5E]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · SPEED: <span className="text-rose-200">{fpsRate} FPS</span>
            </p>
          </div>
        </div>

        {/* PROJECTOR SPEED & REEL */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setFpsRate((prev) => (prev >= 48 ? 24 : prev + 12));
              playCinemaAudio('projector', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#281320] border border-[#F43F5E]/40 text-[#FB7185] text-xs font-mono hover:bg-[#F43F5E] hover:text-black transition flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>PROJECTOR {fpsRate} FPS</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playCinemaAudio('ticket', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#281320] border border-[#F43F5E]/30 text-[#FB7185] flex items-center justify-center hover:bg-[#F43F5E] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CINEMA STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F43F5E]/15 border border-[#F43F5E]/40 text-[#FB7185] text-xs font-bold"
          >
            <Clapperboard className="w-3.5 h-3.5" /> 35MM CELLULOID PROJECTION BOOTH · 24 FPS SHUTTER
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-[#FFE4E6] drop-shadow-[0_2px_35px_rgba(244,63,94,0.5)] uppercase"
          >
            The Projection <span className="text-[#F43F5E] underline decoration-[#BE123C]">Booth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-rose-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* CELLULOID REELS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#F43F5E]/40 pb-4">
            <h3 className="text-xl font-bold text-[#FFE4E6] flex items-center gap-2">
              <Film className="w-5 h-5 text-[#F43F5E]" /> 35mm Celluloid Reels
            </h3>
            <span className="text-xs text-[#FB7185]">ROLL REEL TO SCREEN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {celluloidReels.map((reel) => (
              <motion.div
                key={reel.id}
                whileHover={{ y: -4, borderColor: "#F43F5E" }}
                onClick={() => {
                  setSelectedReel(reel);
                  playCinemaAudio('projector', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#17121C]/90 border border-[#F43F5E]/30 backdrop-blur-xl cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#FB7185] font-bold mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#F43F5E]/20 border border-[#F43F5E]/40">{reel.reelNo}</span>
                  <span className="text-rose-300/80">{reel.runtime}</span>
                </div>

                <h4 className="text-2xl font-black text-[#FFE4E6] group-hover:text-[#F43F5E] transition mb-2">
                  {reel.title}
                </h4>

                <p className="text-xs text-rose-200/70 leading-relaxed mb-4">
                  {reel.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {reel.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded bg-[#08080C] text-[#FB7185] border border-[#F43F5E]/30">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#F43F5E] font-bold group-hover:underline">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>PROJECT REEL ON SCREEN</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BOX OFFICE DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#17121C]/90 border border-[#F43F5E]/50 shadow-[0_0_50px_rgba(244,63,94,0.25)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-[#FFE4E6]">Reserve VIP Box Office Pass</h3>
            <p className="text-xs text-rose-200/80">
              Send screening request to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#F43F5E]/20 border border-[#F43F5E] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#F43F5E] mx-auto" />
              <p className="font-black text-[#FFE4E6]">VIP TICKET STUB PRINTED & ADMIT ONE</p>
              <p className="text-xs text-rose-300">Prajwal DL will queue your screening.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playCinemaAudio('ticket', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FB7185] font-bold mb-1">PRODUCER CALLSIGN</label>
                  <input required defaultValue="Executive Producer" className="w-full px-4 py-2.5 rounded-xl bg-[#08080C] border border-[#F43F5E]/40 text-[#FFE4E6] focus:outline-none focus:border-[#F43F5E]" />
                </div>
                <div>
                  <label className="block text-[#FB7185] font-bold mb-1">PRODUCER EMAIL</label>
                  <input required type="email" defaultValue="producer@cinema.space" className="w-full px-4 py-2.5 rounded-xl bg-[#08080C] border border-[#F43F5E]/40 text-[#FFE4E6] focus:outline-none focus:border-[#F43F5E]" />
                </div>
              </div>
              <div>
                <label className="block text-[#FB7185] font-bold mb-1">SCREENPLAY BRIEF</label>
                <textarea rows={3} required defaultValue="Requesting 35mm cinematic full-stack architecture with high contrast and sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#08080C] border border-[#F43F5E]/40 text-[#FFE4E6] focus:outline-none focus:border-[#F43F5E]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#F43F5E] text-black font-black text-xs hover:bg-[#FB7185] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT CINEMATIC BRIEF
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#F43F5E]/30 flex flex-wrap justify-between items-center text-[11px] text-rose-300 font-mono">
            <span>BOOTH: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#FB7185] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#FB7185] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#FB7185] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* REEL MODAL */}
      <AnimatePresence>
        {selectedReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#17121C] border-2 border-[#F43F5E] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(244,63,94,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedReel(null); playCinemaAudio('ticket', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F43F5E]/20 text-[#FB7185] hover:bg-[#F43F5E] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded bg-[#F43F5E]/20 text-[#FB7185] border border-[#F43F5E]/40">{selectedReel.reelNo}</span>
                <h3 className="text-2xl font-black text-[#FFE4E6]">{selectedReel.title}</h3>
              </div>
              <p className="text-sm text-rose-200/80 leading-relaxed">{selectedReel.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#08080C] border border-[#F43F5E]/40 text-xs text-[#FB7185]">★ HIGHLIGHT: {selectedReel.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-rose-300">CELLULOID TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedReel.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-[#281320] text-[#FFE4E6] border border-[#F43F5E]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedReel.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#F43F5E] text-black font-black text-xs text-center hover:bg-[#FB7185] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> SCREEN CELLULOID
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2, Coins, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Zap, Trophy, Play
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playArcadeAudio(type: 'coin' | 'joystick' | 'laser', isMuted: boolean) {
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

    if (type === 'coin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'laser') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function CyberMagentaTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Cybernetic Systems Architect & Arcade Engineer designing high-combustion CRT raster pipelines, pixel-perfect 60FPS input mechanics, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedCartridge, setSelectedCartridge] = useState<any | null>(null);
  const [credits, setCredits] = useState<number>(2);
  const [score, setScore] = useState<number>(999420);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // CRT Scanlines & Cyber Neon Grid Canvas
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
      ctx.fillStyle = '#0F0214';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Neon horizon grid
      const horizon = canvas.height * 0.65;
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.15)';
      ctx.lineWidth = 1.5;

      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, horizon);
        ctx.lineTo((x - canvas.width / 2) * 4 + canvas.width / 2, canvas.height);
        ctx.stroke();
      }

      for (let y = horizon; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // CRT Scanline flickers
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1.5);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const arcadeGames = [
    {
      id: "game-1",
      level: "STAGE 1 · FLAGSHIP BOSS",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      highScore: "9,999,990 PTS"
    },
    {
      id: "game-2",
      level: "STAGE 2 · CLOUD RUNNER",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      highScore: "8,450,120 PTS"
    },
    {
      id: "game-3",
      level: "STAGE 3 · NEON CIRCUIT",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      highScore: "7,120,400 PTS"
    },
    {
      id: "game-4",
      level: "STAGE 4 · CO-OP ENTERPRISE",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      highScore: "6,980,000 PTS"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0214] text-[#FDF2F8] font-mono relative selection:bg-[#EC4899] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,2,20,0.85)_80%)]" />

      {/* TOP ARCADE MARQUEE HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#1F0429]/90 border-b-2 border-[#EC4899]/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EC4899]/20 border-2 border-[#EC4899] text-[#F472B6] flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-widest text-[#FDF2F8] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#EC4899]/20 text-[#F472B6] border border-[#EC4899]/50 animate-pulse">
                INSERT COIN
              </span>
            </h1>
            <p className="text-[10px] text-pink-300/70">
              HASH: <span className="text-[#EC4899]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · SCORE: <span className="text-yellow-300">{score.toLocaleString()}</span>
            </p>
          </div>
        </div>

        {/* COIN INSERT & JOYSTICK */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCredits((prev) => prev + 1);
              setScore((prev) => prev + 5000);
              playArcadeAudio('coin', isMuted);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#EC4899] text-black text-xs font-black hover:bg-[#F472B6] transition flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.6)]"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>INSERT 25¢ ({credits})</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playArcadeAudio('laser', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#2A0638] border border-[#EC4899]/40 text-[#F472B6] flex items-center justify-center hover:bg-[#EC4899] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN ARCADE STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/50 text-[#F472B6] text-xs font-bold"
          >
            <Zap className="w-3.5 h-3.5" /> 1990s NEO-GEO CRT CABINET · 60 FPS COMBO ENGINE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-[#FDF2F8] drop-shadow-[0_2px_35px_rgba(236,72,153,0.6)] uppercase"
          >
            The Cyber <span className="text-[#EC4899] underline decoration-[#F472B6]">Arcade</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-pink-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* ARCADE CARTRIDGES (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#EC4899]/40 pb-4">
            <h3 className="text-xl font-bold text-[#FDF2F8] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#EC4899]" /> Select Game Cartridge
            </h3>
            <span className="text-xs text-[#F472B6]">PRESS START TO LAUNCH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {arcadeGames.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ y: -4, borderColor: "#EC4899" }}
                onClick={() => {
                  setSelectedCartridge(game);
                  playArcadeAudio('laser', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#1F0429]/90 border-2 border-[#EC4899]/30 backdrop-blur-xl cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#F472B6] font-bold mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#EC4899]/20 border border-[#EC4899]/40">{game.level}</span>
                  <span className="text-yellow-300">{game.highScore}</span>
                </div>

                <h4 className="text-2xl font-black text-[#FDF2F8] group-hover:text-[#EC4899] transition mb-2">
                  {game.title}
                </h4>

                <p className="text-xs text-pink-200/70 leading-relaxed mb-4">
                  {game.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {game.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded bg-[#0F0214] text-[#F472B6] border border-[#EC4899]/30">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#EC4899] font-bold group-hover:underline">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>START MISSION CO-OP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HIGH SCORE DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#1F0429]/90 border-2 border-[#EC4899]/50 shadow-[0_0_50px_rgba(236,72,153,0.3)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-[#FDF2F8]">Enter Arcade High Score</h3>
            <p className="text-xs text-pink-200/80">
              Transmit challenge directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#EC4899]/20 border-2 border-[#EC4899] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#F472B6] mx-auto" />
              <p className="font-black text-[#FDF2F8]">HIGH SCORE RECORDED IN ROM</p>
              <p className="text-xs text-yellow-300">Prajwal DL will accept your battle challenge.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playArcadeAudio('coin', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F472B6] font-bold mb-1">PLAYER 1 CALLSIGN (AAA)</label>
                  <input required defaultValue="PRJ" maxLength={3} className="w-full px-4 py-2.5 rounded-xl bg-[#0F0214] border border-[#EC4899]/40 text-[#FDF2F8] uppercase text-center font-black tracking-widest focus:outline-none focus:border-[#EC4899]" />
                </div>
                <div>
                  <label className="block text-[#F472B6] font-bold mb-1">CONTACT TRANSMITTER</label>
                  <input required type="email" defaultValue="challenger@arcade.space" className="w-full px-4 py-2.5 rounded-xl bg-[#0F0214] border border-[#EC4899]/40 text-[#FDF2F8] focus:outline-none focus:border-[#EC4899]" />
                </div>
              </div>
              <div>
                <label className="block text-[#F472B6] font-bold mb-1">CHALLENGE SPECS</label>
                <textarea rows={3} required defaultValue="Requesting ultra-fast cyber arcade interface with 60FPS input response and resilient backend." className="w-full px-4 py-2.5 rounded-xl bg-[#0F0214] border border-[#EC4899]/40 text-[#FDF2F8] focus:outline-none focus:border-[#EC4899]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#EC4899] text-black font-black text-xs hover:bg-[#F472B6] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                <Send className="w-4 h-4" /> SUBMIT 1P HIGH SCORE
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EC4899]/30 flex flex-wrap justify-between items-center text-[11px] text-pink-300 font-mono">
            <span>CABINET: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#F472B6] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#F472B6] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#F472B6] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* CARTRIDGE MODAL */}
      <AnimatePresence>
        {selectedCartridge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#1F0429] border-2 border-[#EC4899] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(236,72,153,0.6)] relative space-y-6">
              <button onClick={() => { setSelectedCartridge(null); playArcadeAudio('joystick', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EC4899]/20 text-[#F472B6] hover:bg-[#EC4899] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded bg-[#EC4899]/20 text-[#F472B6] border border-[#EC4899]/40">{selectedCartridge.level}</span>
                <h3 className="text-2xl font-black text-[#FDF2F8]">{selectedCartridge.title}</h3>
              </div>
              <p className="text-sm text-pink-200/80 leading-relaxed">{selectedCartridge.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#0F0214] border border-[#EC4899]/40 text-xs text-[#F472B6]">★ HIGHLIGHT: {selectedCartridge.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-pink-300">CARTRIDGE ROM TECH</span>
                <div className="flex flex-wrap gap-2">
                  {selectedCartridge.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-[#2A0638] text-[#FDF2F8] border border-[#EC4899]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedCartridge.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#EC4899] text-black font-black text-xs text-center hover:bg-[#F472B6] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> RUN EMULATOR LIVE
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

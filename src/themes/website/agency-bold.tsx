import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Crown,
  Medal
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playTrophySound(type: 'gong' | 'pedestal' | 'chime' | 'cheer', isMuted: boolean) {
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

    if (type === 'gong') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(261.63, now);
      osc.frequency.exponentialRampToValueAtTime(130.81, now + 0.6);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
      osc.start(now);
      osc.stop(now + 1.0);
    } else if (type === 'pedestal') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch {}
}

export default function TheTrophyRoom({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Award-winning Full Stack Architect showcasing spotlit museum pedestals, precision WebGL glass vitrines, and sub-100ms enterprise systems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedTrophy, setSelectedTrophy] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Spotlit Museum Pedestal Canvas
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
      time += 0.015;
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;

      // Draw Volumetric Spotlight Beam from top center
      const spotGrad = ctx.createRadialGradient(cx, 0, 10, cx, 300, 450);
      spotGrad.addColorStop(0, 'rgba(234, 179, 8, 0.18)');
      spotGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.06)');
      spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 50, 0);
      ctx.lineTo(cx + 50, 0);
      ctx.lineTo(cx + 380, canvas.height * 0.7);
      ctx.lineTo(cx - 380, canvas.height * 0.7);
      ctx.closePath();
      ctx.fill();

      // Pedestal Ring
      ctx.strokeStyle = 'rgba(234, 179, 8, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(cx, canvas.height * 0.45, 240, 60, 0, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const trophies = [
    {
      id: "trophy-1",
      award: "GOLD MEDAL / FLAGSHIP 2026",
      title: "Portfolio OS Grand Prix",
      hall: "HALL OF SPATIAL ARCHITECTURE",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "trophy-2",
      award: "EXCELLENCE IN CLOUD AUTOMATION",
      title: "Praxel Space Cup",
      hall: "HALL OF INFRASTRUCTURE",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "trophy-3",
      award: "HIGH VELOCITY REACT SUITE",
      title: "Vitvara Performance Trophy",
      hall: "HALL OF ENTERPRISE UI",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "trophy-4",
      award: "BESPOKE CLIENT MASTERY",
      title: "Enterprise Solutions Shield",
      hall: "HALL OF CLIENT DELIVERIES",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FEF08A] font-sans relative selection:bg-[#EAB308] selection:text-black overflow-x-hidden">
      {/* 3D Spotlight Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#141414]/90 border-b border-[#EAB308]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAB308] text-black font-black flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/40">TROPHY ROOM</span>
            </h1>
            <p className="text-[10px] font-mono text-[#CA8A04]">{location} · SPOTLIT GALLERY</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playTrophySound('gong', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#1C1917] border border-[#EAB308]/40 text-[#FEF08A] flex items-center justify-center hover:border-[#EAB308] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-600" /> : <Volume2 className="w-4 h-4 text-[#EAB308]" />}
          </button>
        </div>
      </header>

      {/* MAIN TROPHY STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/40 text-[#EAB308] text-xs font-mono"
          >
            <Trophy className="w-3.5 h-3.5" /> SPOTLIT VITRINE METAPHOR · EXECUTIVE TROPHY ROOM
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_25px_rgba(234,179,8,0.4)] uppercase"
          >
            Engineering Champion Systems
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* TROPHY VITRINES */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#EAB308]/30 pb-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Medal className="w-5 h-5 text-[#EAB308]" /> Spotlit Award Pedestals
            </h3>
            <span className="text-xs font-mono text-[#EAB308]">CLICK VITRINE TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trophies.map((tr) => (
              <motion.div
                key={tr.id}
                whileHover={{ y: -4, borderColor: "#EAB308" }}
                onClick={() => {
                  setSelectedTrophy(tr);
                  playTrophySound('pedestal', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#141414]/90 border border-[#EAB308]/30 backdrop-blur-md cursor-pointer transition shadow-[0_4px_25px_rgba(0,0,0,0.7)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#EAB308] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#EAB308]/10 border border-[#EAB308]/30">{tr.award}</span>
                  <span className="text-stone-400">{tr.hall}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-[#EAB308] transition mb-2">
                  {tr.title}
                </h4>

                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  {tr.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tr.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0A0A0A] text-[#FEF08A] border border-stone-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#EAB308] group-hover:underline">
                  <span>VIEW VITRINE DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TROPHY ROOM GUESTBOOK */}
        <section className="p-8 rounded-3xl bg-[#141414]/90 border border-[#EAB308]/40 shadow-[0_0_40px_rgba(234,179,8,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Sign Gallery Guestbook</h3>
            <p className="text-xs text-stone-400">
              Submit your congratulations or project inquiry directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#EAB308]/10 border border-[#EAB308] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#EAB308] mx-auto" />
              <p className="font-bold text-white">Guestbook Entry Inscribed on Golden Plaque</p>
              <p className="text-xs text-stone-400 font-mono">Prajwal DL will read your entry in the hall.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playTrophySound('gong', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#EAB308] font-mono mb-1">GUEST NAME</label>
                  <input
                    required
                    defaultValue="Distinguished Guest"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#EAB308]/30 text-white focus:outline-none focus:border-[#EAB308]"
                  />
                </div>
                <div>
                  <label className="block text-[#EAB308] font-mono mb-1">GUEST EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="guest@trophyhall.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#EAB308]/30 text-white focus:outline-none focus:border-[#EAB308]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#EAB308] font-mono mb-1">INSCRIPTION MESSAGE</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design with high-performance WebGL systems."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0A0A0A] border border-[#EAB308]/30 text-white focus:outline-none focus:border-[#EAB308]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#EAB308] text-black font-mono font-bold text-xs hover:bg-[#FACC15] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.4)]"
              >
                <Send className="w-4 h-4" /> INSCRIBE GUESTBOOK ENTRY
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EAB308]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#CA8A04]">
            <span>GALLERY: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#EAB308] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#EAB308] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#EAB308] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* TROPHY MODAL */}
      <AnimatePresence>
        {selectedTrophy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#141414] border-2 border-[#EAB308] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(234,179,8,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedTrophy(null);
                  playTrophySound('pedestal', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAB308]/10 text-[#EAB308] hover:bg-[#EAB308] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAB308]/20 text-[#EAB308] border border-[#EAB308]/40">
                  {selectedTrophy.award} · {selectedTrophy.hall}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedTrophy.title}</h3>
              </div>

              <p className="text-sm text-stone-300 leading-relaxed">
                {selectedTrophy.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#EAB308]">ARCHITECTURAL HIGHLIGHTS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTrophy.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#0A0A0A] text-white border border-stone-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedTrophy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#EAB308] text-black font-mono font-bold text-xs text-center hover:bg-[#FACC15] transition flex items-center justify-center gap-1.5"
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

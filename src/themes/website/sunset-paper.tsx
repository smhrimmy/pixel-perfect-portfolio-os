import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Sun,
  Flame,
  RotateCw,
  Layers
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playPotterySound(type: 'wheel' | 'clay' | 'glaze' | 'chime', isMuted: boolean) {
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

    if (type === 'wheel') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(320, now + 0.3);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'glaze') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(783.99, now);
      osc.frequency.exponentialRampToValueAtTime(1567.98, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch {}
}

export default function ThePottersStudio({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Artisan shaping elegant, high-durability digital vessels, automated DNS workflows, and sub-100ms web systems with golden-hour warmth.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedVessel, setSelectedVessel] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [rpm, setRpm] = useState(120);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Rotational Clay Lathe Heightfield Canvas
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
      time += 0.02 * (rpm / 100);
      ctx.fillStyle = '#1A120B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.4;

      // Draw 3D Cylindrical Clay Lathe Heightfield
      ctx.strokeStyle = 'rgba(234, 88, 12, 0.15)';
      ctx.lineWidth = 1.5;

      const layers = 16;
      for (let i = 0; i < layers; i++) {
        const y = cy + (i - layers / 2) * 18;
        // Vase silhouette radius function
        const profileK = Math.sin(i / layers * Math.PI) * 120 + 60;
        const wobble = Math.sin(time * 3 + i * 0.3) * 6;
        const rx = profileK + wobble;
        const ry = rx * 0.3;

        ctx.beginPath();
        ctx.ellipse(cx, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [rpm]);

  const vessels = [
    {
      id: "vessel-1",
      name: "Portfolio OS Vessel",
      glaze: "TERRACOTTA & OBSIDIAN",
      firing: "1200°C HIGH-FIRE",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "vessel-2",
      name: "Praxel Space Cloud Urn",
      glaze: "COBALT & COPPER",
      firing: "1280°C REDUCTION",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "vessel-3",
      name: "Vitvara Application Pot",
      glaze: "CELADON CRACKLE",
      firing: "1180°C OXIDATION",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "vessel-4",
      name: "Client Enterprise Amphora",
      glaze: "IRON ASH STONEWARE",
      firing: "1300°C WOOD-FIRE",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A120B] text-[#FDE047] font-serif relative selection:bg-[#EA580C] selection:text-white overflow-x-hidden">
      {/* 3D Clay Lathe Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#26190E]/90 border-b border-[#EA580C]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#EA580C]/20 border border-[#EA580C] text-[#EA580C] flex items-center justify-center shadow-[0_0_15px_rgba(234,88,12,0.4)]">
            <RotateCw className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-[#FED7AA] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EA580C]/20 text-[#EA580C] border border-[#EA580C]">POTTER'S STUDIO</span>
            </h1>
            <p className="text-[10px] font-mono text-[#D97706]">{location} · WHEEL SPEED: {rpm} RPM</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setRpm(r => r === 120 ? 240 : 120);
              playPotterySound('wheel', isMuted);
            }}
            className="px-3 py-1.5 rounded-full bg-[#EA580C] text-white font-mono font-bold text-xs hover:bg-[#F97316] transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <RotateCw className="w-3.5 h-3.5" /> WHEEL SPEED ({rpm} RPM)
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playPotterySound('glaze', !isMuted);
            }}
            className="w-9 h-9 rounded-full bg-[#3B2513] border border-[#EA580C]/40 text-[#FED7AA] flex items-center justify-center hover:border-[#EA580C] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-amber-800" /> : <Volume2 className="w-4 h-4 text-[#EA580C]" />}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/40 text-[#EA580C] text-xs font-mono"
          >
            <Sun className="w-3.5 h-3.5" /> GOLDEN-HOUR METAPHOR · HAND-THROWN CERAMICS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-normal tracking-wide text-[#FED7AA] drop-shadow-[0_2px_20px_rgba(234,88,12,0.3)]"
          >
            Molding Digital Vessels with Precision
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#E2E8F0] font-sans max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* CERAMIC VESSELS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#EA580C]/30 pb-3">
            <h3 className="text-xl font-normal text-[#FED7AA] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#EA580C]" /> Kiln-Fired Glazed Vessels
            </h3>
            <span className="text-xs font-mono text-[#EA580C]">4 PIECES IN GALLERY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vessels.map((v) => (
              <motion.div
                key={v.id}
                whileHover={{ y: -4, borderColor: "#EA580C" }}
                onClick={() => {
                  setSelectedVessel(v);
                  playPotterySound('glaze', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#26190E]/90 border border-[#EA580C]/30 backdrop-blur-md cursor-pointer transition shadow-[0_4px_25px_rgba(0,0,0,0.5)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#EA580C] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#EA580C]/10 border border-[#EA580C]/30">{v.firing}</span>
                  <span className="text-[#FED7AA]">{v.glaze}</span>
                </div>

                <h4 className="text-xl font-bold text-[#FED7AA] group-hover:text-[#EA580C] transition mb-2">
                  {v.name}
                </h4>

                <p className="text-xs text-[#CBD5E1] font-sans leading-relaxed mb-4">
                  {v.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {v.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A120B] text-[#FED7AA] border border-[#EA580C]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#EA580C] group-hover:underline">
                  <span>EXAMINE GLAZED DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* POTTER'S STUDIO CONTACT */}
        <section className="p-8 rounded-3xl bg-[#26190E]/90 border border-[#EA580C]/40 shadow-[0_0_40px_rgba(234,88,12,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-normal text-[#FED7AA]">Commission a Ceramic Vessel</h3>
            <p className="text-xs text-[#CBD5E1] font-sans">
              Send commission request directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#EA580C]/10 border border-[#EA580C] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#EA580C] mx-auto" />
              <p className="font-bold text-[#FED7AA]">Commission Slip Placed on the Studio Bench</p>
              <p className="text-xs text-[#CBD5E1] font-mono">Prajwal DL will throw your vessel soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playPotterySound('wheel', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#EA580C] font-mono mb-1">PATRON NAME</label>
                  <input
                    required
                    defaultValue="Artisan Patron"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#EA580C]/30 text-white focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
                <div>
                  <label className="block text-[#EA580C] font-mono mb-1">PATRON EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="patron@pottery.studio"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#EA580C]/30 text-white focus:outline-none focus:border-[#EA580C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#EA580C] font-mono mb-1">COMMISSION SPECIFICATIONS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design and high-performance web systems."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A120B] border border-[#EA580C]/30 text-white focus:outline-none focus:border-[#EA580C]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#EA580C] text-white font-mono font-bold text-xs hover:bg-[#F97316] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(234,88,12,0.4)]"
              >
                <Send className="w-4 h-4" /> SUBMIT COMMISSION REQUEST
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EA580C]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#D97706]">
            <span>KILN: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#EA580C] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#EA580C] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#EA580C] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* VESSEL MODAL */}
      <AnimatePresence>
        {selectedVessel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#26190E] border-2 border-[#EA580C] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(234,88,12,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedVessel(null);
                  playPotterySound('chime', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EA580C]/10 text-[#EA580C] hover:bg-[#EA580C] hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EA580C]/20 text-[#EA580C] border border-[#EA580C]/40">
                  {selectedVessel.firing} · {selectedVessel.glaze}
                </span>
                <h3 className="text-2xl font-bold text-[#FED7AA]">{selectedVessel.name}</h3>
              </div>

              <p className="text-sm text-[#CBD5E1] font-sans leading-relaxed">
                {selectedVessel.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#EA580C]">GLAZE & STRUCTURAL TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedVessel.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#1A120B] text-[#FED7AA] border border-[#EA580C]/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedVessel.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#EA580C] text-white font-mono font-bold text-xs text-center hover:bg-[#F97316] transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> VIEW LIVE REPOSITORY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Stamp,
  Layers,
  Zap
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playPrintSound(type: 'press' | 'ink' | 'roller' | 'stamp', isMuted: boolean) {
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

    if (type === 'press') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(40, now + 0.3);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'stamp') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {}
}

export default function ThePrintShop({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Developer & Master Printer stamping high-impact brutalist digital interfaces, heavy-duty backend architectures, and sub-100ms web systems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedPlate, setSelectedPlate] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [impressionsCount, setImpressionsCount] = useState(1402);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Letterpress Ink Viscosity & Roller Press Canvas
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
      ctx.fillStyle = '#0D0D0D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3D Cylinder Press Shimmer & Ink Heightmap
      const cols = 20;
      const rows = 14;
      const cw = canvas.width / cols;
      const ch = canvas.height / rows;

      ctx.lineWidth = 1.5;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = c * cw;
          const y = r * ch;
          const inkWave = Math.sin(c * 0.4 + time * 2) * 8 + Math.cos(r * 0.3 + time) * 6;
          const px = x;
          const py = y + inkWave;

          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = r % 2 === 0 ? 'rgba(255, 230, 0, 0.08)' : 'rgba(255, 0, 128, 0.06)';
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const plates = [
    {
      id: "plate-1",
      edition: "EDITION 01/2026",
      title: "Portfolio OS Letterpress",
      ink: "PANTONE NEON YELLOW",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "plate-2",
      edition: "EDITION 02/2025",
      title: "Praxel Space Cloud Press",
      ink: "PANTONE MAGENTA 806",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "plate-3",
      edition: "EDITION 03/2024",
      title: "Vitvara Web Imprint",
      ink: "PANTONE CYAN 300",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "plate-4",
      edition: "EDITION 04/2023",
      title: "Bespoke Enterprise Editions",
      ink: "PANTONE REFLEX BLACK",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  const pullLever = () => {
    setImpressionsCount(c => c + 1);
    playPrintSound('press', isMuted);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#FFE600] font-mono relative selection:bg-[#FFE600] selection:text-black overflow-x-hidden">
      {/* 3D Letterpress Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#141414]/90 border-b-2 border-[#FFE600] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFE600] text-black font-black flex items-center justify-center text-lg">
            <Printer className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#FFE600] text-black font-bold">PRINT SHOP</span>
            </h1>
            <p className="text-[10px] text-zinc-400">{location} · IMPRESSIONS: {impressionsCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={pullLever}
            className="px-3.5 py-1.5 bg-[#FFE600] text-black font-black text-xs hover:bg-white transition flex items-center gap-1.5 cursor-pointer shadow-[3px_3px_0px_#fff]"
          >
            <Stamp className="w-3.5 h-3.5" /> PULL PRESS LEVER
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playPrintSound('stamp', !isMuted);
            }}
            className="w-9 h-9 bg-black border border-[#FFE600] text-[#FFE600] flex items-center justify-center hover:bg-[#FFE600] hover:text-black transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-[#FFE600]" />}
          </button>
        </div>
      </header>

      {/* MAIN STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="p-8 bg-[#141414] border-3 border-[#FFE600] shadow-[8px_8px_0px_#FFE600] space-y-4">
          <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-zinc-800 pb-3">
            <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-[#FFE600]" /> HEAVY LETTERPRESS WORKSHOP</span>
            <span className="text-[#FFE600] font-black">HIGH-PRESSURE INK RELIEF</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            STAMPING RAW <span className="text-[#FFE600]">PERFORMANCE</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
            {bio}
          </p>
        </section>

        {/* PRINTED PLATES */}
        <section className="space-y-6">
          <div className="flex justify-between items-center text-xs font-black text-zinc-400 border-b-2 border-zinc-800 pb-3">
            <span>EMBOSSED RELIEF PLATES</span>
            <span>PRESS TO INSPECT PROOF</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plates.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setSelectedPlate(p);
                  playPrintSound('stamp', isMuted);
                }}
                className="p-6 bg-[#141414] border-2 border-[#FFE600] shadow-[5px_5px_0px_#FFE600] cursor-pointer transition group"
              >
                <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-3">
                  <span className="font-black text-[#FFE600]">{p.edition}</span>
                  <span className="px-2 py-0.5 bg-black border border-zinc-700 text-white">{p.ink}</span>
                </div>

                <h4 className="text-xl font-black text-white group-hover:text-[#FFE600] transition mb-2">
                  {p.title}
                </h4>

                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-black text-[#FFE600] border border-zinc-800">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-[#FFE600] group-hover:underline">
                  <span>INSPECT PROOF PRINT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* PRINT SHOP CONTACT */}
        <section className="p-8 bg-[#141414] border-3 border-[#FFE600] shadow-[8px_8px_0px_#FFE600] space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase">ORDER BESPOKE PRESS RUN</h3>
            <p className="text-xs text-zinc-400">
              Submit proofing request directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-4 bg-black border-2 border-[#FFE600] text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-[#FFE600]" />
              <p className="font-black text-xs text-white">PROOF RUN QUEUED FOR IMPRESSION</p>
              <p className="text-[10px] text-zinc-400">Prajwal DL will inspect your proof request.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playPrintSound('press', isMuted);
              }}
              className="space-y-4 text-xs font-bold"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">CLIENT NAME</label>
                  <input
                    required
                    defaultValue="Print Collector"
                    className="w-full px-3 py-2 bg-black border-2 border-zinc-700 text-white focus:outline-none focus:border-[#FFE600]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">CLIENT EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="client@printshop.art"
                    className="w-full px-3 py-2 bg-black border-2 border-zinc-700 text-white focus:outline-none focus:border-[#FFE600]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-[10px] mb-1">PRINT SPECIFICATIONS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design with bold brutalist typography and high-speed delivery."
                  className="w-full px-3 py-2 bg-black border-2 border-zinc-700 text-white focus:outline-none focus:border-[#FFE600]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#FFE600] text-black font-black text-xs hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#fff]"
              >
                <Send className="w-3.5 h-3.5" /> STAMP PROOF ORDER
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-zinc-800 flex flex-wrap justify-between items-center text-[10px] text-zinc-400">
            <span>PRESS SHOP: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#FFE600] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#FFE600] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#FFE600] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* PLATE MODAL */}
      <AnimatePresence>
        {selectedPlate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#141414] border-3 border-[#FFE600] p-6 sm:p-8 max-w-lg w-full shadow-[10px_10px_0px_#FFE600] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedPlate(null);
                  playPrintSound('stamp', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 bg-black text-[#FFE600] border border-[#FFE600] hover:bg-[#FFE600] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black px-2 py-0.5 bg-[#FFE600] text-black">
                  {selectedPlate.edition} · {selectedPlate.ink}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedPlate.title}</h3>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedPlate.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs text-[#FFE600]">TYPOGRAPHIC SPECIFICATIONS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedPlate.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-black text-[#FFE600] border border-zinc-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedPlate.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-[#FFE600] text-black font-black text-xs text-center hover:bg-white transition flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#fff]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> VIEW LIVE EDITION
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gem,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Sliders,
  Layers,
  Eye
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playGemSound(type: 'prism' | 'facet' | 'chime' | 'laser', isMuted: boolean) {
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

    if (type === 'prism') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.5, now);
      osc.frequency.exponentialRampToValueAtTime(2637.0, now + 0.2);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'facet') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch {}
}

export default function TheGemCuttersTable({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Master Lapidary & Full Stack Architect faceting prismatic digital gems, chromatic dispersion WebGL shaders, and flawless sub-100ms web systems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedGem, setSelectedGem] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [dispersionIndex, setDispersionIndex] = useState(2.417);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Faceted Chromatic Dispersion Gemstone Canvas
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
      ctx.fillStyle = '#070514';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.42;

      // Draw 3D Faceted Prismatic Gemstone Wireframe
      ctx.lineWidth = 1.5;

      const facets = 8;
      const outerR = 140;
      const innerR = 70;

      for (let i = 0; i < facets; i++) {
        const a1 = (i / facets) * Math.PI * 2 + time * 0.5;
        const a2 = ((i + 1) / facets) * Math.PI * 2 + time * 0.5;

        const x1 = cx + Math.cos(a1) * outerR;
        const y1 = cy + Math.sin(a1) * (outerR * 0.6);
        const x2 = cx + Math.cos(a2) * outerR;
        const y2 = cy + Math.sin(a2) * (outerR * 0.6);

        const ix1 = cx + Math.cos(a1) * innerR;
        const iy1 = cy + Math.sin(a1) * (innerR * 0.6) - 40;
        const ix2 = cx + Math.cos(a2) * innerR;
        const iy2 = cy + Math.sin(a2) * (innerR * 0.6) - 40;

        // Facet lines with iridescent chromatic dispersion
        ctx.strokeStyle = `hsla(${(i * 45 + time * 50) % 360}, 100%, 75%, 0.4)`;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(ix2, iy2);
        ctx.lineTo(ix1, iy1);
        ctx.closePath();
        ctx.stroke();

        // Culet bottom point
        const bottomY = cy + 90;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(cx, bottomY);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [dispersionIndex]);

  const gems = [
    {
      id: "gem-1",
      cut: "BRILLIANT ROUND / 58 FACETS",
      name: "Portfolio OS Diamond",
      clarity: "FLAWLESS (FL)",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "gem-2",
      cut: "EMERALD STEP / 48 FACETS",
      name: "Praxel Space Sapphire",
      clarity: "VVS1 CLARITY",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "gem-3",
      cut: "OVAL PRISM / 56 FACETS",
      name: "Vitvara Ruby Core",
      clarity: "INTERNALLY FLAWLESS",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "gem-4",
      cut: "BAGUETTE CUT / 32 FACETS",
      name: "Client Enterprise Opal",
      clarity: "FIRE REFRACTION",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070514] text-[#E0E7FF] font-sans relative selection:bg-[#EC4899] selection:text-white overflow-x-hidden">
      {/* 3D Faceted Gem Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0D0A26]/90 border-b border-[#EC4899]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EC4899]/20 border border-[#EC4899] text-[#EC4899] flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.4)]">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/40">GEM CUTTER</span>
            </h1>
            <p className="text-[10px] font-mono text-[#F472B6]">{location} · REFRACTIVE INDEX: {dispersionIndex}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playGemSound('prism', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#17123D] border border-[#EC4899]/40 text-[#E0E7FF] flex items-center justify-center hover:border-[#EC4899] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#EC4899]" />}
          </button>
        </div>
      </header>

      {/* MAIN GEM STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EC4899]/10 border border-[#EC4899]/40 text-[#EC4899] text-xs font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" /> CHROMATIC DISPERSION METAPHOR · GEM CUTTER'S TABLE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_25px_rgba(236,72,153,0.4)]"
          >
            Faceting Flawless Digital Systems
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#C7D2FE] max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* FACETED GEMS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#EC4899]/30 pb-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#EC4899]" /> Appraised Gemstone Folios
            </h3>
            <span className="text-xs font-mono text-[#EC4899]">CLICK TO APPRAISE FACETS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gems.map((g) => (
              <motion.div
                key={g.id}
                whileHover={{ y: -4, borderColor: "#EC4899" }}
                onClick={() => {
                  setSelectedGem(g);
                  playGemSound('facet', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#0D0A26]/90 border border-[#EC4899]/30 backdrop-blur-md cursor-pointer transition shadow-[0_4px_25px_rgba(0,0,0,0.6)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#EC4899] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#EC4899]/10 border border-[#EC4899]/30">{g.cut}</span>
                  <span className="text-indigo-200">{g.clarity}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-[#EC4899] transition mb-2">
                  {g.name}
                </h4>

                <p className="text-xs text-[#C7D2FE] leading-relaxed mb-4">
                  {g.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {g.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070514] text-[#E0E7FF] border border-[#3730A3]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#EC4899] group-hover:underline">
                  <span>INSPECT UNDER JEWELER'S LOUPE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GEM CUTTER CONTACT */}
        <section className="p-8 rounded-3xl bg-[#0D0A26]/90 border border-[#EC4899]/40 shadow-[0_0_40px_rgba(236,72,153,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Commission Gem Faceting</h3>
            <p className="text-xs text-[#C7D2FE]">
              Request high-refraction web architectures from Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#EC4899]/10 border border-[#EC4899] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#EC4899] mx-auto" />
              <p className="font-bold text-white">Gem Appraisal Certificate Dispatched</p>
              <p className="text-xs text-[#C7D2FE] font-mono">Prajwal DL will inspect your technical clarity request.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playGemSound('prism', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#EC4899] font-mono mb-1">COLLECTOR NAME</label>
                  <input
                    required
                    defaultValue="Diamond Collector"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070514] border border-[#EC4899]/30 text-white focus:outline-none focus:border-[#EC4899]"
                  />
                </div>
                <div>
                  <label className="block text-[#EC4899] font-mono mb-1">APPRAISAL EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="collector@gemcutter.io"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#070514] border border-[#EC4899]/30 text-white focus:outline-none focus:border-[#EC4899]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#EC4899] font-mono mb-1">FACETING SPECIFICATIONS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design with chromatic WebGL shaders and sub-100ms response targets."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#070514] border border-[#EC4899]/30 text-white focus:outline-none focus:border-[#EC4899]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#EC4899] text-white font-mono font-bold text-xs hover:bg-[#F472B6] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.4)]"
              >
                <Send className="w-4 h-4" /> SUBMIT APPRAISAL REQUEST
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EC4899]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#F472B6]">
            <span>VAULT: MANGALORE, INDIA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#EC4899] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#EC4899] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#EC4899] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* GEM MODAL */}
      <AnimatePresence>
        {selectedGem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0D0A26] border-2 border-[#EC4899] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(236,72,153,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedGem(null);
                  playGemSound('facet', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EC4899]/10 text-[#EC4899] hover:bg-[#EC4899] hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/40">
                  {selectedGem.cut} · {selectedGem.clarity}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedGem.name}</h3>
              </div>

              <p className="text-sm text-[#C7D2FE] leading-relaxed">
                {selectedGem.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#EC4899]">FACETED COMPONENT TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedGem.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#070514] text-white border border-[#3730A3]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedGem.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#EC4899] text-white font-mono font-bold text-xs text-center hover:bg-[#F472B6] transition flex items-center justify-center gap-1.5"
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

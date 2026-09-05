import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Flower2,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  ZoomIn,
  Layers,
  Compass
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playHerbariumSound(type: 'glass' | 'leaf' | 'chime' | 'loupe', isMuted: boolean) {
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

    if (type === 'glass') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'leaf') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  } catch {}
}

export default function TheHerbarium({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Botanist curating pressed digital specimens, organic WebGL architectures, and sub-100ms resilient ecosystems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedSpecimen, setSelectedSpecimen] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [loupeZoom, setLoupeZoom] = useState(1.0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Specimen Glass Refraction Heightfield Canvas
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
      ctx.fillStyle = '#06130E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3D Glass Specimen Slide & Botanical Spore Heightfield
      const cols = 22;
      const rows = 14;
      const cw = canvas.width / cols;
      const ch = canvas.height / rows;

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = c * cw;
          const y = r * ch;
          const sporeWave = Math.sin(c * 0.35 + time) * 10 + Math.cos(r * 0.4 + time * 1.5) * 8;
          const px = x;
          const py = y + sporeWave;

          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.08)';
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

  const specimens = [
    {
      id: "specimen-1",
      taxon: "SPECIMEN A / FOLIO 2026",
      name: "Portfolio OS Flora",
      family: "SPATIAL ARCHITECTURE",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "specimen-2",
      taxon: "SPECIMEN B / FOLIO 2025",
      name: "Praxel Space Rhizome",
      family: "CLOUD BOTANY",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "specimen-3",
      taxon: "SPECIMEN C / FOLIO 2024",
      name: "Vitvara Application Spore",
      family: "REACT INTERFACES",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "specimen-4",
      taxon: "SPECIMEN D / FOLIO 2023",
      name: "Client Enterprise Vine",
      family: "BESPOKE SYSTEMS",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06130E] text-[#A7F3D0] font-serif relative selection:bg-[#10B981] selection:text-black overflow-x-hidden">
      {/* 3D Glass Heightfield Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0A1F17]/90 border-b border-[#10B981]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#10B981]/15 border border-[#10B981] text-[#10B981] flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-[#D1FAE5] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">THE HERBARIUM</span>
            </h1>
            <p className="text-[10px] font-mono text-[#6EE7B7]">{location} · BOTANICAL FOLIO</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playHerbariumSound('chime', !isMuted);
            }}
            className="w-9 h-9 rounded-full bg-[#0E2A1F] border border-[#10B981]/40 text-[#A7F3D0] flex items-center justify-center hover:border-[#10B981] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-emerald-800" /> : <Volume2 className="w-4 h-4 text-[#10B981]" />}
          </button>
        </div>
      </header>

      {/* MAIN HERBARIUM STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/40 text-[#10B981] text-xs font-mono"
          >
            <Flower2 className="w-3.5 h-3.5" /> BOTANICAL SPECIMEN METAPHOR · PRESSED FLORA
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-normal tracking-wide text-[#D1FAE5] drop-shadow-[0_2px_20px_rgba(16,185,129,0.3)]"
          >
            Preserving Resilient Digital Species
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#94A3B8] font-sans max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* SPECIMEN GLASS PLATES */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#10B981]/30 pb-3">
            <h3 className="text-xl font-normal text-[#D1FAE5] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#10B981]" /> Pressed Botanical Specimens
            </h3>
            <span className="text-xs font-mono text-[#10B981]">CLICK GLASS SLIDE TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specimens.map((sp) => (
              <motion.div
                key={sp.id}
                whileHover={{ y: -4, borderColor: "#10B981" }}
                onClick={() => {
                  setSelectedSpecimen(sp);
                  playHerbariumSound('glass', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#0A1F17]/90 border border-[#10B981]/30 backdrop-blur-md cursor-pointer transition shadow-[0_4px_25px_rgba(0,0,0,0.5)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#10B981] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/30">{sp.taxon}</span>
                  <span className="text-[#D1FAE5]">{sp.family}</span>
                </div>

                <h4 className="text-xl font-bold text-[#D1FAE5] group-hover:text-[#10B981] transition mb-2">
                  {sp.name}
                </h4>

                <p className="text-xs text-[#94A3B8] font-sans leading-relaxed mb-4">
                  {sp.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {sp.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#06130E] text-[#A7F3D0] border border-[#10B981]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#10B981] group-hover:underline">
                  <span>EXAMINE UNDER LOUPE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HERBARIUM CONTACT */}
        <section className="p-8 rounded-3xl bg-[#0A1F17]/90 border border-[#10B981]/40 shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-normal text-[#D1FAE5]">Botanical Specimen Inquiry</h3>
            <p className="text-xs text-[#94A3B8] font-sans">
              Dispatch specimen collaboration requests to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#10B981]/10 border border-[#10B981] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#10B981] mx-auto" />
              <p className="font-bold text-[#D1FAE5]">Specimen Requisition Label Placed in Folio</p>
              <p className="text-xs text-[#94A3B8] font-mono">Prajwal DL will inspect your herbarium request.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playHerbariumSound('leaf', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#10B981] font-mono mb-1">BOTANIST NAME</label>
                  <input
                    required
                    defaultValue="Flora Collector"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#06130E] border border-[#10B981]/30 text-white focus:outline-none focus:border-[#10B981]"
                  />
                </div>
                <div>
                  <label className="block text-[#10B981] font-mono mb-1">HERBARIUM EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="collector@herbarium.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#06130E] border border-[#10B981]/30 text-white focus:outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#10B981] font-mono mb-1">SPECIMEN REQUEST DETAILS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design and high-performance WebGL systems."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#06130E] border border-[#10B981]/30 text-white focus:outline-none focus:border-[#10B981]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#10B981] text-black font-mono font-bold text-xs hover:bg-[#34D399] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <Send className="w-4 h-4" /> DISPATCH HERBARIUM SLIP
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#10B981]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#6EE7B7]">
            <span>FOLIO ORIGIN: MANGALORE, INDIA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#10B981] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#10B981] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#10B981] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* SPECIMEN MODAL */}
      <AnimatePresence>
        {selectedSpecimen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0A1F17] border-2 border-[#10B981] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(16,185,129,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedSpecimen(null);
                  playHerbariumSound('glass', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40">
                  {selectedSpecimen.taxon} · {selectedSpecimen.family}
                </span>
                <h3 className="text-2xl font-bold text-[#D1FAE5]">{selectedSpecimen.name}</h3>
              </div>

              <p className="text-sm text-[#94A3B8] font-sans leading-relaxed">
                {selectedSpecimen.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#10B981]">CELLULAR TOKEN ARCHITECTURE</span>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecimen.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#06130E] text-[#D1FAE5] border border-[#10B981]/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedSpecimen.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#10B981] text-black font-mono font-bold text-xs text-center hover:bg-[#34D399] transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LIVE BOTANICAL SPECIMEN
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

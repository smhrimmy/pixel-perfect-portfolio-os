import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ruler,
  Compass,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Layers,
  Square
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playDraftingSound(type: 'pencil' | 'ruler' | 'unroll' | 'click', isMuted: boolean) {
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

    if (type === 'pencil') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'unroll') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(440, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {}
}

export default function TheDraftingTable({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Architectural Software Engineer & Web Advisor drafting precision blueprints, automated DNS infrastructure, and sub-100ms structural web systems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedBlueprint, setSelectedBlueprint] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [scaleRatio, setScaleRatio] = useState("1:50");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Blueprint Heightfield & Contour Grid Canvas
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
      ctx.fillStyle = '#0B2046';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3D Blueprint Grid Lines
      const step = 35;
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3D Isometric Elevation Contour Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      const cols = 18;
      const rows = 12;
      const cw = canvas.width / cols;
      const ch = canvas.height / rows;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const x = c * cw;
          const y = r * ch;
          const elev = Math.sin(c * 0.4 + time) * 12 + Math.cos(r * 0.3 + time * 1.2) * 8;
          const px = x;
          const py = y + elev;

          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
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

  const blueprints = [
    {
      id: "blueprint-1",
      sheet: "SHEET A-101 / 2026",
      title: "Portfolio OS Schematic",
      scale: "SCALE 1:100",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "blueprint-2",
      sheet: "SHEET A-102 / 2025",
      title: "Praxel Space Cloud Blueprints",
      scale: "SCALE 1:50",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "blueprint-3",
      sheet: "SHEET A-103 / 2024",
      title: "Vitvara Structural System",
      scale: "SCALE 1:25",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "blueprint-4",
      sheet: "SHEET A-104 / 2023",
      title: "Enterprise Client Elevation",
      scale: "SCALE 1:10",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B2046] text-[#93C5FD] font-mono relative selection:bg-[#60A5FA] selection:text-black overflow-x-hidden">
      {/* 3D Blueprint Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0F2B5C]/90 border-b-2 border-[#60A5FA] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#60A5FA] text-black font-black flex items-center justify-center">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#60A5FA] text-black font-bold">DRAFTING TABLE</span>
            </h1>
            <p className="text-[10px] text-blue-200">{location} · DRAWING SCALE: {scaleRatio}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playDraftingSound('pencil', !isMuted);
            }}
            className="w-9 h-9 border border-[#60A5FA] text-[#93C5FD] flex items-center justify-center hover:bg-[#60A5FA] hover:text-black transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-blue-400" /> : <Volume2 className="w-4 h-4 text-[#60A5FA]" />}
          </button>
        </div>
      </header>

      {/* MAIN DRAFTING STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="p-8 bg-[#0F2B5C]/90 border-2 border-[#60A5FA] shadow-[8px_8px_0px_#60A5FA] space-y-4">
          <div className="flex justify-between items-center text-xs text-blue-200 border-b border-blue-400/40 pb-3">
            <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-[#60A5FA]" /> ARCHITECTURAL DRAFTING BOARD</span>
            <span className="text-[#60A5FA] font-bold">STAMPED FOR CONSTRUCTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wide uppercase">
            STRUCTURAL CODE & <span className="text-[#60A5FA]">ARCHITECTURES</span>
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-2xl">
            {bio}
          </p>
        </section>

        {/* BLUEPRINT SHEETS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-blue-200 border-b-2 border-blue-400/40 pb-3">
            <span>ARCHITECTURAL DRAWING SHEETS</span>
            <span>CLICK SHEET TO EXPAND BLUEPRINT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blueprints.map((bp) => (
              <motion.div
                key={bp.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setSelectedBlueprint(bp);
                  playDraftingSound('unroll', isMuted);
                }}
                className="p-6 bg-[#0F2B5C] border-2 border-[#60A5FA] shadow-[5px_5px_0px_#60A5FA] cursor-pointer transition group"
              >
                <div className="flex justify-between items-center text-[10px] text-blue-200 mb-3">
                  <span className="font-bold text-white">{bp.sheet}</span>
                  <span className="px-2 py-0.5 bg-[#0B2046] border border-blue-400 text-[#93C5FD]">{bp.scale}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-[#60A5FA] transition mb-2">
                  {bp.title}
                </h4>

                <p className="text-xs text-blue-100 leading-relaxed mb-4">
                  {bp.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bp.tech.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-[#0B2046] text-[#93C5FD] border border-blue-500">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#60A5FA] group-hover:underline">
                  <span>UNROLL ARCHITECTURAL DRAWING</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DRAFTING TABLE CONTACT */}
        <section className="p-8 bg-[#0F2B5C]/90 border-2 border-[#60A5FA] shadow-[8px_8px_0px_#60A5FA] space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white uppercase">SUBMIT ARCHITECTURAL REQUISITION</h3>
            <p className="text-xs text-blue-200">
              Submit architectural plan request directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-4 bg-[#0B2046] border-2 border-[#60A5FA] text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-[#60A5FA]" />
              <p className="font-bold text-xs text-white">BLUEPRINT REQUISITION STAMPED & APPROVED</p>
              <p className="text-[10px] text-blue-200">Prajwal DL will review the structural specifications.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playDraftingSound('pencil', isMuted);
              }}
              className="space-y-4 text-xs font-bold"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-blue-200 text-[10px] mb-1">CONTRACTOR NAME</label>
                  <input
                    required
                    defaultValue="Master Architect"
                    className="w-full px-3 py-2 bg-[#0B2046] border-2 border-blue-400 text-white focus:outline-none focus:border-[#60A5FA]"
                  />
                </div>
                <div>
                  <label className="block text-blue-200 text-[10px] mb-1">OFFICIAL EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="contractor@drafting.org"
                    className="w-full px-3 py-2 bg-[#0B2046] border-2 border-blue-400 text-white focus:outline-none focus:border-[#60A5FA]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-blue-200 text-[10px] mb-1">SPECIFICATION DETAILS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design with robust type-safety and sub-100ms response targets."
                  className="w-full px-3 py-2 bg-[#0B2046] border-2 border-blue-400 text-white focus:outline-none focus:border-[#60A5FA]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#60A5FA] text-black font-black text-xs hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#fff]"
              >
                <Send className="w-3.5 h-3.5" /> STAMP STRUCTURAL APPROVAL
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-blue-400/30 flex flex-wrap justify-between items-center text-[10px] text-blue-200">
            <span>STUDIO: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-white hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-white hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-white hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* BLUEPRINT MODAL */}
      <AnimatePresence>
        {selectedBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0F2B5C] border-2 border-[#60A5FA] p-6 sm:p-8 max-w-lg w-full shadow-[10px_10px_0px_#60A5FA] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedBlueprint(null);
                  playDraftingSound('click', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 bg-[#0B2046] text-[#60A5FA] border border-[#60A5FA] hover:bg-[#60A5FA] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#60A5FA] text-black">
                  {selectedBlueprint.sheet} · {selectedBlueprint.scale}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedBlueprint.title}</h3>
              </div>

              <p className="text-xs text-blue-100 leading-relaxed">
                {selectedBlueprint.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs text-[#60A5FA]">STRUCTURAL COMPONENT STACK</span>
                <div className="flex flex-wrap gap-2">
                  {selectedBlueprint.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-[#0B2046] text-white border border-blue-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedBlueprint.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-[#60A5FA] text-black font-bold text-xs text-center hover:bg-white transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> INSPECT LIVE STRUCTURE
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

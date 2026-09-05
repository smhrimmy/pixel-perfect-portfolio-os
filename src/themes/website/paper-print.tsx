import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ruler, Compass, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, PenTool, Stamp
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playDraftingAudio(type: 'pencil' | 'ruler' | 'stamp', isMuted: boolean) {
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

    if (type === 'stamp') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'ruler') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function PaperPrintTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Architectural Systems Drafter & Structural Full Stack Engineer drafting cyanotype blueprints, T-square alignments, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedBlueprint, setSelectedBlueprint] = useState<any | null>(null);
  const [tSquareAngle, setTSquareAngle] = useState<number>(0);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cyanotype Grid & CAD Line Overlay Canvas
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
      time += 0.01;
      ctx.fillStyle = '#08172E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Blueprint cyan grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.lineWidth = 1;
      const step = 20;
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

      // Major grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.16)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < canvas.width; x += step * 5) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step * 5) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
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

  const draftingBlueprints = [
    {
      id: "draft-1",
      sheet: "SHEET A-101 · SPATIAL MATRIX",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      scale: "SCALE: 1:1 MASTER"
    },
    {
      id: "draft-2",
      sheet: "SHEET E-204 · CLOUD TOPOLOGY",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      scale: "SCALE: 1:50 CLOUD"
    },
    {
      id: "draft-3",
      sheet: "SHEET M-302 · FRONTEND ELEVATION",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      scale: "SCALE: 1:20 DETAIL"
    },
    {
      id: "draft-4",
      sheet: "SHEET S-401 · STRUCTURAL BASIN",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      scale: "SCALE: 1:100 SITE"
    },
  ];

  return (
    <div className="min-h-screen bg-[#08172E] text-[#E0F2FE] font-mono relative selection:bg-[#38BDF8] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,23,46,0.85)_80%)]" />

      {/* TOP DRAFTING HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0D2344]/90 border-b border-[#38BDF8]/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#38BDF8]/20 border border-[#38BDF8] text-[#38BDF8] flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-widest text-[#E0F2FE] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
                DRAFTING TABLE
              </span>
            </h1>
            <p className="text-[10px] text-sky-300/70">
              HASH: <span className="text-[#38BDF8]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · ANGLE: <span className="text-sky-200">{tSquareAngle}°</span>
            </p>
          </div>
        </div>

        {/* T-SQUARE ANGLE & CAD RULER */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setTSquareAngle((prev) => (prev >= 90 ? 0 : prev + 30));
              playDraftingAudio('ruler', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#13325F] border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-mono hover:bg-[#38BDF8] hover:text-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>T-SQUARE {tSquareAngle}°</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playDraftingAudio('pencil', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#13325F] border border-[#38BDF8]/30 text-[#38BDF8] flex items-center justify-center hover:bg-[#38BDF8] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN DRAFTING STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-bold"
          >
            <PenTool className="w-3.5 h-3.5" /> 45° TILTED DRAFTING TABLE · CYANOTYPE BLUEPRINTS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-[#E0F2FE] drop-shadow-[0_2px_35px_rgba(56,189,248,0.4)] uppercase"
          >
            The Drafting <span className="text-[#38BDF8] underline decoration-[#0284C7]">Table</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-sky-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* BLUEPRINTS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#38BDF8]/40 pb-4">
            <h3 className="text-xl font-bold text-[#E0F2FE] flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#38BDF8]" /> Unrolled Cyanotype Sheets
            </h3>
            <span className="text-xs text-[#38BDF8]">CLICK TO INSPECT ELEVATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {draftingBlueprints.map((bp) => (
              <motion.div
                key={bp.id}
                whileHover={{ y: -4, borderColor: "#38BDF8" }}
                onClick={() => {
                  setSelectedBlueprint(bp);
                  playDraftingAudio('stamp', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#0D2344]/90 border border-[#38BDF8]/30 backdrop-blur-xl cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#38BDF8] font-bold mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#38BDF8]/20 border border-[#38BDF8]/40">{bp.sheet}</span>
                  <span className="text-sky-300/80">{bp.scale}</span>
                </div>

                <h4 className="text-2xl font-black text-[#E0F2FE] group-hover:text-[#38BDF8] transition mb-2">
                  {bp.title}
                </h4>

                <p className="text-xs text-sky-200/70 leading-relaxed mb-4">
                  {bp.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bp.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded bg-[#08172E] text-[#38BDF8] border border-[#38BDF8]/30">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#38BDF8] font-bold group-hover:underline">
                  <Stamp className="w-3.5 h-3.5" />
                  <span>VIEW BLUEPRINT SPEC SHEET</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* BLUEPRINT DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#0D2344]/90 border border-[#38BDF8]/50 shadow-[0_0_50px_rgba(56,189,248,0.25)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-[#E0F2FE]">Commission Architectural Plan</h3>
            <p className="text-xs text-sky-200/80">
              Submit RFP directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#38BDF8]/20 border border-[#38BDF8] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#38BDF8] mx-auto" />
              <p className="font-black text-[#E0F2FE]">BLUEPRINT DRAWING QUEUED & PE STAMPED</p>
              <p className="text-xs text-sky-300 font-mono">Prajwal DL will inspect your design brief.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playDraftingAudio('stamp', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#38BDF8] font-bold mb-1">CLIENT PRINCIPAL</label>
                  <input required defaultValue="General Contractor" className="w-full px-4 py-2.5 rounded-xl bg-[#08172E] border border-[#38BDF8]/40 text-[#E0F2FE] focus:outline-none focus:border-[#38BDF8]" />
                </div>
                <div>
                  <label className="block text-[#38BDF8] font-bold mb-1">CONTACT EMAIL</label>
                  <input required type="email" defaultValue="contractor@drafting.space" className="w-full px-4 py-2.5 rounded-xl bg-[#08172E] border border-[#38BDF8]/40 text-[#E0F2FE] focus:outline-none focus:border-[#38BDF8]" />
                </div>
              </div>
              <div>
                <label className="block text-[#38BDF8] font-bold mb-1">STRUCTURAL SCOPE OF WORK</label>
                <textarea rows={3} required defaultValue="Requesting high-rigor blueprint architecture with precision grid alignment and sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#08172E] border border-[#38BDF8]/40 text-[#E0F2FE] focus:outline-none focus:border-[#38BDF8]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#38BDF8] text-black font-black text-xs hover:bg-[#7DD3FC] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT CAD SUBMITTAL
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#38BDF8]/30 flex flex-wrap justify-between items-center text-[11px] text-sky-300 font-mono">
            <span>OFFICE: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* BLUEPRINT MODAL */}
      <AnimatePresence>
        {selectedBlueprint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0D2344] border-2 border-[#38BDF8] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(56,189,248,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedBlueprint(null); playDraftingAudio('pencil', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">{selectedBlueprint.sheet}</span>
                <h3 className="text-2xl font-black text-[#E0F2FE]">{selectedBlueprint.title}</h3>
              </div>
              <p className="text-sm text-sky-200/80 leading-relaxed">{selectedBlueprint.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#08172E] border border-[#38BDF8]/40 text-xs text-[#38BDF8]">★ HIGHLIGHT: {selectedBlueprint.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-sky-300">CAD SPECS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedBlueprint.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-[#13325F] text-[#E0F2FE] border border-[#38BDF8]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedBlueprint.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#38BDF8] text-black font-black text-xs text-center hover:bg-[#7DD3FC] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> ACCESS SHEET
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

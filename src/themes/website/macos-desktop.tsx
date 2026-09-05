import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox, Folder, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Lamp, Key
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playDeskAudio(type: 'drawer' | 'lamp' | 'key', isMuted: boolean) {
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

    if (type === 'lamp') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'drawer') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(240, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function MacOSDesktopTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Architectural Cabinetmaker & Rolltop Desk Engineer crafting solid oak pigeonhole pigeonholes, banker's pull-chain lamps, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedDrawer, setSelectedDrawer] = useState<any | null>(null);
  const [isRolltopOpen, setIsRolltopOpen] = useState<boolean>(true);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Oak Wood Grain & Banker's Lamp Warm Beam Canvas
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
      ctx.fillStyle = '#140D07';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Banker's Green / Amber Lamp Glow
      const grad = ctx.createRadialGradient(
        canvas.width / 2, 80, 20,
        canvas.width / 2, canvas.height * 0.5, canvas.width * 0.55
      );
      grad.addColorStop(0, 'rgba(34, 197, 94, 0.12)');
      grad.addColorStop(0.5, 'rgba(217, 119, 6, 0.08)');
      grad.addColorStop(1, 'rgba(20, 13, 7, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const deskDrawers = [
    {
      id: "drawer-1",
      pigeonhole: "PIGEONHOLE I · TOP DRAWER",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      tag: "Dossier Inscribed"
    },
    {
      id: "drawer-2",
      pigeonhole: "PIGEONHOLE II · CLOUD VAULT",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      tag: "Sealed Envelope"
    },
    {
      id: "drawer-3",
      pigeonhole: "PIGEONHOLE III · BLUEPRINT COMPARTMENT",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      tag: "Rolled Parchment"
    },
    {
      id: "drawer-4",
      pigeonhole: "PIGEONHOLE IV · COMMERCIAL DRAWER",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      tag: "Ledger Folio"
    },
  ];

  return (
    <div className="min-h-screen bg-[#140D07] text-[#FEF3C7] font-serif relative selection:bg-[#D97706] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,13,7,0.85)_80%)]" />

      {/* TOP DESK HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#23170C]/90 border-b border-[#D97706]/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#D97706]/20 border border-[#D97706] text-[#FBBF24] flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.3)]">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#FEF3C7] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D97706]/20 text-[#FBBF24] border border-[#D97706]/40 font-mono">
                ROLLTOP DESK
              </span>
            </h1>
            <p className="text-[10px] text-amber-300/70 font-mono">
              HASH: <span className="text-[#D97706]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · STATUS: <span className="text-amber-200">{isRolltopOpen ? "TAMBOUR OPEN" : "LOCKED"}</span>
            </p>
          </div>
        </div>

        {/* ROLLTOP TAMBOUR TOGGLE */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsRolltopOpen(!isRolltopOpen);
              playDeskAudio('drawer', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#352313] border border-[#D97706]/40 text-[#FBBF24] text-xs font-mono hover:bg-[#D97706] hover:text-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{isRolltopOpen ? "LOCK DESK" : "UNLOCK TAMBOUR"}</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playDeskAudio('lamp', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#352313] border border-[#D97706]/30 text-[#FBBF24] flex items-center justify-center hover:bg-[#D97706] hover:text-black transition cursor-pointer"
          >
            <Lamp className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN DESK STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 text-[#FBBF24] text-xs font-mono"
          >
            <Inbox className="w-3.5 h-3.5" /> SOLID OAK ROLLTOP DESK · BRASS PIGEONHOLES
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight text-[#FEF3C7] drop-shadow-[0_2px_35px_rgba(217,119,6,0.35)]"
          >
            The Architect&apos;s <span className="text-[#FBBF24] italic">Study</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-amber-200/80 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            {bio}
          </motion.p>
        </section>

        {/* PIGEONHOLE DRAWERS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#D97706]/30 pb-4">
            <h3 className="text-xl font-bold text-[#FEF3C7] flex items-center gap-2">
              <Folder className="w-5 h-5 text-[#FBBF24]" /> Oak Pigeonhole Drawers
            </h3>
            <span className="text-xs text-[#FBBF24] font-mono">PULL DRAWER DOSSIER</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deskDrawers.map((drawer) => (
              <motion.div
                key={drawer.id}
                whileHover={{ y: -4, borderColor: "#D97706" }}
                onClick={() => {
                  setSelectedDrawer(drawer);
                  playDeskAudio('drawer', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#23170C]/90 border border-[#D97706]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.7)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#FBBF24] font-mono mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#D97706]/20 border border-[#D97706]/40">{drawer.pigeonhole}</span>
                  <span className="text-amber-300/80">{drawer.tag}</span>
                </div>

                <h4 className="text-xl font-bold text-[#FEF3C7] group-hover:text-[#FBBF24] transition mb-2">
                  {drawer.title}
                </h4>

                <p className="text-xs text-amber-200/70 font-sans leading-relaxed mb-4">
                  {drawer.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {drawer.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#140D07] text-[#FBBF24] border border-[#D97706]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#FBBF24] font-mono group-hover:underline">
                  <span>UNROLL ARCHIVE DOSSIER</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOUNTAIN PEN DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#23170C]/90 border border-[#D97706]/40 shadow-[0_0_40px_rgba(217,119,6,0.2)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#FEF3C7]">Inscribe Fountain Pen Letter</h3>
            <p className="text-xs text-amber-200/80 font-sans">
              Send stationery directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#D97706]/20 border border-[#D97706] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#FBBF24] mx-auto" />
              <p className="font-bold text-[#FEF3C7]">Letter Sealed & Stored in Pigeonhole</p>
              <p className="text-xs text-amber-300 font-mono">Prajwal DL will open your correspondence.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playDeskAudio('drawer', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FBBF24] font-mono mb-1">CORRESPONDENT</label>
                  <input required defaultValue="Senior Architect" className="w-full px-4 py-2.5 rounded-xl bg-[#140D07] border border-[#D97706]/30 text-[#FEF3C7] focus:outline-none focus:border-[#D97706]" />
                </div>
                <div>
                  <label className="block text-[#FBBF24] font-mono mb-1">RETURN ADDRESS</label>
                  <input required type="email" defaultValue="architect@study.space" className="w-full px-4 py-2.5 rounded-xl bg-[#140D07] border border-[#D97706]/30 text-[#FEF3C7] focus:outline-none focus:border-[#D97706]" />
                </div>
              </div>
              <div>
                <label className="block text-[#FBBF24] font-mono mb-1">MANUSCRIPT CONTENT</label>
                <textarea rows={3} required defaultValue="Requesting executive rolltop full-stack architecture with solid oak warmth and sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#140D07] border border-[#D97706]/30 text-[#FEF3C7] focus:outline-none focus:border-[#D97706]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#D97706] text-black font-mono font-bold text-xs hover:bg-[#FBBF24] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(217,119,6,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT PARCHMENT
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#D97706]/30 flex flex-wrap justify-between items-center text-[11px] text-amber-300/70 font-mono">
            <span>STUDY: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#FBBF24] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#FBBF24] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#FBBF24] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* DRAWER MODAL */}
      <AnimatePresence>
        {selectedDrawer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#23170C] border-2 border-[#D97706] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(217,119,6,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedDrawer(null); playDeskAudio('key', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#D97706]/20 text-[#FBBF24] hover:bg-[#D97706] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#D97706]/20 text-[#FBBF24] border border-[#D97706]/40">{selectedDrawer.pigeonhole}</span>
                <h3 className="text-2xl font-bold text-[#FEF3C7] font-serif">{selectedDrawer.title}</h3>
              </div>
              <p className="text-sm text-amber-200/80 font-sans leading-relaxed">{selectedDrawer.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#140D07] border border-[#D97706]/30 text-xs text-[#FBBF24] font-mono">★ HIGHLIGHT: {selectedDrawer.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-amber-300/70">ARCHIVE TECH TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedDrawer.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#352313] text-[#FEF3C7] border border-[#D97706]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedDrawer.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#D97706] text-black font-bold font-mono text-xs text-center hover:bg-[#FBBF24] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> OPEN DOSSIER
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gem, Sparkles, X, ArrowUpRight, CheckCircle2, Send,
  Sliders, ShieldCheck, Sun
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playGemAudio(type: 'facet' | 'prism' | 'loupe', isMuted: boolean) {
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
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.setValueAtTime(880, now + 0.08);
      osc.frequency.setValueAtTime(1174.66, now + 0.16);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'facet') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.50, now);
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

export default function HolographicTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Lapidary Systems Gemologist & Holographic Web Architect facet-cutting 57-plane brilliant gems, engineering prismatic dispersion shaders, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedGem, setSelectedGem] = useState<any | null>(null);
  const [dispersion, setDispersion] = useState<number>(57);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Prismatic Rainbow Dispersion & Facet Lines Canvas
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
      ctx.fillStyle = '#0F091F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.45;

      // Facet polygon rotation
      const numFacets = 8;
      ctx.lineWidth = 1.5;

      for (let i = 0; i < numFacets; i++) {
        const angle1 = (i / numFacets) * Math.PI * 2 + time;
        const angle2 = ((i + 1) / numFacets) * Math.PI * 2 + time;
        const r = 180 + Math.sin(time * 2 + i) * 20;

        ctx.strokeStyle = `hsla(${(i * 45 + time * 50) % 360}, 90%, 70%, 0.25)`;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle1) * r, cy + Math.sin(angle1) * r);
        ctx.lineTo(cx + Math.cos(angle2) * r, cy + Math.sin(angle2) * r);
        ctx.closePath();
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [dispersion]);

  const facetedGems = [
    {
      id: "gem-1",
      cut: "CUT 01 · 57-FACET BRILLIANT",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      clarity: "Flawless · 10.0 Mohs"
    },
    {
      id: "gem-2",
      cut: "CUT 02 · PRISMATIC SAPPHIRE",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      clarity: "VVS1 · 9.0 Mohs"
    },
    {
      id: "gem-3",
      cut: "CUT 03 · EMERALD OCTAGON",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      clarity: "VVS2 · 8.5 Mohs"
    },
    {
      id: "gem-4",
      cut: "CUT 04 · AMETHYST CABOCHON",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      clarity: "IF · 8.0 Mohs"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F091F] text-[#F3E8FF] font-sans relative selection:bg-[#C084FC] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,9,31,0.85)_80%)]" />

      {/* TOP GEM CUTTER HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#1A1035]/90 border-b border-[#C084FC]/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#C084FC]/20 border border-[#C084FC] text-[#E9D5FF] flex items-center justify-center shadow-[0_0_20px_rgba(192,132,252,0.3)]">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#F3E8FF] uppercase flex items-center gap-2">
              <span>17 THE GEM CUTTER'S TABLE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C084FC]/20 text-[#E9D5FF] border border-[#C084FC]/40 font-mono">
                Precision & Detail Showcase
              </span>
            </h1>
            <p className="text-[10px] text-purple-300/70 font-mono">
              HASH: <span className="text-[#C084FC]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · DISPERSION: <span className="text-purple-200">{dispersion} FACETS</span>
            </p>
          </div>
        </div>

        {/* PRISMATIC DISPERSION SLIDER */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setDispersion((prev) => (prev >= 96 ? 32 : prev + 16));
              playGemAudio('prism', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#2A1B4E] border border-[#C084FC]/40 text-[#E9D5FF] text-xs font-mono hover:bg-[#C084FC] hover:text-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PRISM {dispersion}°</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playGemAudio('facet', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#2A1B4E] border border-[#C084FC]/30 text-[#E9D5FF] flex items-center justify-center hover:bg-[#C084FC] hover:text-black transition cursor-pointer"
          >
            <Sun className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN GEM STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C084FC]/15 border border-[#C084FC]/40 text-[#E9D5FF] text-xs font-mono"
          >
            <Gem className="w-3.5 h-3.5" /> JEWELER&apos;S LAPIDARY RIG · PRISMATIC DISPERSION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight text-[#F3E8FF] drop-shadow-[0_2px_35px_rgba(192,132,252,0.4)]"
          >
            The Gem Cutter&apos;s <span className="text-[#C084FC] italic">Rig</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-purple-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* FACETED GEMS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#C084FC]/30 pb-4">
            <h3 className="text-xl font-bold text-[#F3E8FF] flex items-center gap-2">
              <Gem className="w-5 h-5 text-[#C084FC]" /> Cut Gemstone Showcase
            </h3>
            <span className="text-xs text-[#E9D5FF] font-mono">INSPECT FACET REFRACTION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facetedGems.map((gem) => (
              <motion.div
                key={gem.id}
                whileHover={{ y: -4, borderColor: "#C084FC" }}
                onClick={() => {
                  setSelectedGem(gem);
                  playGemAudio('facet', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#1A1035]/80 border border-[#C084FC]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.7)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#E9D5FF] font-mono mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#C084FC]/20 border border-[#C084FC]/40">{gem.cut}</span>
                  <span className="text-purple-300/80">{gem.clarity}</span>
                </div>

                <h4 className="text-xl font-bold text-[#F3E8FF] group-hover:text-[#C084FC] transition mb-2">
                  {gem.title}
                </h4>

                <p className="text-xs text-purple-200/70 leading-relaxed mb-4">
                  {gem.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {gem.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#0F091F] text-[#E9D5FF] border border-[#C084FC]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#C084FC] font-mono group-hover:underline">
                  <span>EXAMINE PRISMATIC SPECTRUM</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GEM DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#1A1035]/90 border border-[#C084FC]/40 shadow-[0_0_40px_rgba(192,132,252,0.2)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#F3E8FF]">Commission Custom Gem Cut</h3>
            <p className="text-xs text-purple-200/80">
              Send appraisal directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#C084FC]/20 border border-[#C084FC] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#C084FC] mx-auto" />
              <p className="font-bold text-[#F3E8FF]">Rough Diamond Mounted & Facet Cutting Queued</p>
              <p className="text-xs text-purple-300 font-mono">Prajwal DL will inspect your appraisal request.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playGemAudio('prism', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E9D5FF] font-mono mb-1">APPRAISER CALLSIGN</label>
                  <input required defaultValue="Master Jeweler" className="w-full px-4 py-2.5 rounded-xl bg-[#0F091F] border border-[#C084FC]/30 text-[#F3E8FF] focus:outline-none focus:border-[#C084FC]" />
                </div>
                <div>
                  <label className="block text-[#E9D5FF] font-mono mb-1">APPRAISAL EMAIL</label>
                  <input required type="email" defaultValue="jeweler@lapidary.space" className="w-full px-4 py-2.5 rounded-xl bg-[#0F091F] border border-[#C084FC]/30 text-[#F3E8FF] focus:outline-none focus:border-[#C084FC]" />
                </div>
              </div>
              <div>
                <label className="block text-[#E9D5FF] font-mono mb-1">FACET SPECIFICATIONS</label>
                <textarea rows={3} required defaultValue="Requesting brilliant prismatic full-stack architecture with holographic refractions and sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#0F091F] border border-[#C084FC]/30 text-[#F3E8FF] focus:outline-none focus:border-[#C084FC]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#C084FC] text-black font-mono font-bold text-xs hover:bg-[#D8B4FE] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT GEM COMMISSION
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#C084FC]/30 flex flex-wrap justify-between items-center text-[11px] text-purple-300/70 font-mono">
            <span>ATELIER: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* GEM MODAL */}
      <AnimatePresence>
        {selectedGem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#1A1035] border-2 border-[#C084FC] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(192,132,252,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedGem(null); playGemAudio('loupe', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#C084FC]/20 text-[#E9D5FF] hover:bg-[#C084FC] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#C084FC]/20 text-[#E9D5FF] border border-[#C084FC]/40">{selectedGem.cut}</span>
                <h3 className="text-2xl font-bold text-[#F3E8FF]">{selectedGem.title}</h3>
              </div>
              <p className="text-sm text-purple-200/80 leading-relaxed">{selectedGem.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#0F091F] border border-[#C084FC]/30 text-xs text-[#E9D5FF] font-mono">★ HIGHLIGHT: {selectedGem.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-purple-300/70">REFRACTIVE TECH TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedGem.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#2A1B4E] text-[#F3E8FF] border border-[#C084FC]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedGem.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#C084FC] text-black font-bold font-mono text-xs text-center hover:bg-[#D8B4FE] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> GEM TELEMETRY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf, Search, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Bookmark, Glasses
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playHerbariumAudio(type: 'press' | 'loupe' | 'leaf', isMuted: boolean) {
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

    if (type === 'loupe') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'press') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function AuroraMintTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Naturalist Systems Botanist & Herbarium Curator pressing rare code specimens under glass, cataloging cellular venation, and engineering sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedSpecimen, setSelectedSpecimen] = useState<any | null>(null);
  const [loupeZoom, setLoupeZoom] = useState<number>(4);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Mint Leaf Venation & Cell Grid Canvas
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
      ctx.fillStyle = '#051A14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle venation fractal branching
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.08)';
      ctx.lineWidth = 1.2;

      for (let i = 0; i < 8; i++) {
        const startX = (i / 8) * canvas.width;
        ctx.beginPath();
        ctx.moveTo(startX, 0);
        ctx.bezierCurveTo(
          startX + Math.sin(time + i) * 60, canvas.height * 0.5,
          startX - Math.cos(time + i) * 60, canvas.height * 0.8,
          startX + 20, canvas.height
        );
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

  const herbariumSpecimens = [
    {
      id: "spec-1",
      catalog: "HERBARIUM FOLIO #01",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      genus: "Genus: Architectura Universalis"
    },
    {
      id: "spec-2",
      catalog: "HERBARIUM FOLIO #02",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      genus: "Genus: Nebula Automata"
    },
    {
      id: "spec-3",
      catalog: "HERBARIUM FOLIO #03",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      genus: "Genus: Resilientia Scalaris"
    },
    {
      id: "spec-4",
      catalog: "HERBARIUM FOLIO #04",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      genus: "Genus: Commercium Flexibilis"
    },
  ];

  return (
    <div className="min-h-screen bg-[#051A14] text-[#CCFBF1] font-sans relative selection:bg-[#2DD4BF] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,26,20,0.85)_80%)]" />

      {/* TOP HERBARIUM HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#08291F]/90 border-b border-[#2DD4BF]/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2DD4BF]/20 border border-[#2DD4BF] text-[#2DD4BF] flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.3)]">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#CCFBF1] uppercase flex items-center gap-2">
              <span>15 THE HERBARIUM</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#2DD4BF]/20 text-[#2DD4BF] border border-[#2DD4BF]/40 font-mono">
                Botanical Knowledge Archive
              </span>
            </h1>
            <p className="text-[10px] text-teal-300/70 font-mono">
              HASH: <span className="text-[#2DD4BF]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · LOUPE: <span className="text-teal-200">{loupeZoom}× MAG</span>
            </p>
          </div>
        </div>

        {/* LOUPE MAGNIFIER & PRESERVATION */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setLoupeZoom((prev) => (prev >= 10 ? 4 : prev + 2));
              playHerbariumAudio('loupe', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#0D382B] border border-[#2DD4BF]/40 text-[#2DD4BF] text-xs font-mono hover:bg-[#2DD4BF] hover:text-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <Glasses className="w-3.5 h-3.5" />
            <span>LOUPE {loupeZoom}×</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playHerbariumAudio('leaf', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#0D382B] border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center hover:bg-[#2DD4BF] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN HERBARIUM STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2DD4BF]/15 border border-[#2DD4BF]/40 text-[#2DD4BF] text-xs font-mono"
          >
            <Bookmark className="w-3.5 h-3.5" /> BOTANICAL SPECIMEN FOLIO · PRESSED CELLULAR VENATION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight text-[#CCFBF1] drop-shadow-[0_2px_30px_rgba(45,212,191,0.35)]"
          >
            Explore · Learn · <span className="text-[#2DD4BF] italic">Preserve</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-teal-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* PRESSED SPECIMENS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#2DD4BF]/30 pb-4">
            <h3 className="text-xl font-bold text-[#CCFBF1] flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#2DD4BF]" /> Pressed Botanical Folios
            </h3>
            <span className="text-xs text-[#2DD4BF] font-mono">EXAMINE TAXONOMY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {herbariumSpecimens.map((spec) => (
              <motion.div
                key={spec.id}
                whileHover={{ y: -4, borderColor: "#2DD4BF" }}
                onClick={() => {
                  setSelectedSpecimen(spec);
                  playHerbariumAudio('press', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#08291F]/80 border border-[#2DD4BF]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.7)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#2DD4BF] font-mono mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#2DD4BF]/20 border border-[#2DD4BF]/40">{spec.catalog}</span>
                  <span className="text-teal-300/80">{spec.genus}</span>
                </div>

                <h4 className="text-xl font-bold text-[#CCFBF1] group-hover:text-[#2DD4BF] transition mb-2">
                  {spec.title}
                </h4>

                <p className="text-xs text-teal-200/70 leading-relaxed mb-4">
                  {spec.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {spec.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#051A14] text-[#2DD4BF] border border-[#2DD4BF]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#2DD4BF] font-mono group-hover:underline">
                  <span>VIEW TAXONOMIC DETAILS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HERBARIUM DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#08291F]/90 border border-[#2DD4BF]/40 shadow-[0_0_40px_rgba(45,212,191,0.2)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#CCFBF1]">Request Botanical Specimen Catalog</h3>
            <p className="text-xs text-teal-200/80">
              Send dispatch directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#2DD4BF]/20 border border-[#2DD4BF] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#2DD4BF] mx-auto" />
              <p className="font-bold text-[#CCFBF1]">Specimen Tagged & Preserved in Herbarium</p>
              <p className="text-xs text-teal-300 font-mono">Prajwal DL will inspect your accession request.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playHerbariumAudio('press', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#2DD4BF] font-mono mb-1">CURATOR NAME</label>
                  <input required defaultValue="Naturalist Scholar" className="w-full px-4 py-2.5 rounded-xl bg-[#051A14] border border-[#2DD4BF]/30 text-[#CCFBF1] focus:outline-none focus:border-[#2DD4BF]" />
                </div>
                <div>
                  <label className="block text-[#2DD4BF] font-mono mb-1">ACCESSION EMAIL</label>
                  <input required type="email" defaultValue="curator@herbarium.space" className="w-full px-4 py-2.5 rounded-xl bg-[#051A14] border border-[#2DD4BF]/30 text-[#CCFBF1] focus:outline-none focus:border-[#2DD4BF]" />
                </div>
              </div>
              <div>
                <label className="block text-[#2DD4BF] font-mono mb-1">BOTANICAL PROPOSAL</label>
                <textarea rows={3} required defaultValue="Requesting organic mint/teal full-stack architecture with taxonomy precision and sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#051A14] border border-[#2DD4BF]/30 text-[#CCFBF1] focus:outline-none focus:border-[#2DD4BF]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#2DD4BF] text-black font-mono font-bold text-xs hover:bg-[#5EEAD4] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(45,212,191,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT BOTANICAL ACCESSION
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#2DD4BF]/30 flex flex-wrap justify-between items-center text-[11px] text-teal-300/70 font-mono">
            <span>HERBARIUM: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#2DD4BF] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#2DD4BF] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#2DD4BF] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* SPECIMEN MODAL */}
      <AnimatePresence>
        {selectedSpecimen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#08291F] border-2 border-[#2DD4BF] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(45,212,191,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedSpecimen(null); playHerbariumAudio('leaf', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#2DD4BF]/20 text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#2DD4BF]/20 text-[#2DD4BF] border border-[#2DD4BF]/40">{selectedSpecimen.catalog}</span>
                <h3 className="text-2xl font-bold text-[#CCFBF1]">{selectedSpecimen.title}</h3>
              </div>
              <p className="text-sm text-teal-200/80 leading-relaxed">{selectedSpecimen.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#051A14] border border-[#2DD4BF]/30 text-xs text-[#2DD4BF] font-mono">★ HIGHLIGHT: {selectedSpecimen.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-teal-300/70">CELLULAR TECH TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecimen.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#0D382B] text-[#CCFBF1] border border-[#2DD4BF]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedSpecimen.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#2DD4BF] text-black font-bold font-mono text-xs text-center hover:bg-[#5EEAD4] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> ACCESS SPECIMEN
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy, Award, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Lightbulb, Shield
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playMuseumAudio(type: 'spotlight' | 'pedestal' | 'plaque', isMuted: boolean) {
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

    if (type === 'spotlight') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'pedestal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
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

export default function AgencyBoldTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Executive Museum Architect & Creative Director exhibiting high-pedestal glass vitrines, gold-leaf engraved plaques, and sub-100ms resilient enterprise platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedVitrine, setSelectedVitrine] = useState<any | null>(null);
  const [spotlightPower, setSpotlightPower] = useState<number>(100);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Museum Gallery Spotlights & Velvet Dust Canvas
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
      ctx.fillStyle = '#08080A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Overhead Spotlights
      const intensity = spotlightPower / 100;
      const grad = ctx.createRadialGradient(
        canvas.width / 2, 0, 50,
        canvas.width / 2, canvas.height * 0.6, canvas.width * 0.5
      );
      grad.addColorStop(0, `rgba(250, 204, 21, ${0.18 * intensity})`);
      grad.addColorStop(1, 'rgba(8, 8, 10, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [spotlightPower]);

  const museumVitrines = [
    {
      id: "vitrine-1",
      plaque: "VITRINE I · GRAND TROPHY",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      award: "Gold Medal of Spatial Design"
    },
    {
      id: "vitrine-2",
      plaque: "VITRINE II · CLOUD PEDESTAL",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      award: "Enterprise Cloud Excellence"
    },
    {
      id: "vitrine-3",
      plaque: "VITRINE III · FRONTEND RELIC",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      award: "High-Throughput Architecture"
    },
    {
      id: "vitrine-4",
      plaque: "VITRINE IV · BESPOKE CITATION",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      award: "Commercial Precision Honor"
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080A] text-[#FEF08A] font-sans relative selection:bg-[#EAB308] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,10,0.85)_80%)]" />

      {/* TOP MUSEUM HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#141419]/90 border-b border-[#EAB308]/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308] text-[#FACC15] flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#FEF08A] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EAB308]/20 text-[#FACC15] border border-[#EAB308]/40 font-mono">
                GRAND VITRINE
              </span>
            </h1>
            <p className="text-[10px] text-yellow-300/70 font-mono">
              HASH: <span className="text-[#FACC15]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · SPOTLIGHT: <span className="text-yellow-200">{spotlightPower}%</span>
            </p>
          </div>
        </div>

        {/* SPOTLIGHT POWER */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSpotlightPower((prev) => (prev >= 100 ? 50 : prev + 25));
              playMuseumAudio('spotlight', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#23232C] border border-[#EAB308]/40 text-[#FACC15] text-xs font-mono hover:bg-[#EAB308] hover:text-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>LIGHTS {spotlightPower}%</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playMuseumAudio('plaque', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#23232C] border border-[#EAB308]/30 text-[#FACC15] flex items-center justify-center hover:bg-[#EAB308] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN MUSEUM STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAB308]/15 border border-[#EAB308]/40 text-[#FACC15] text-xs font-mono"
          >
            <Award className="w-3.5 h-3.5" /> SPOTLIT MUSEUM EXHIBITION HALL · GOLD VITRINE PEDESTALS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight text-[#FEF08A] drop-shadow-[0_2px_35px_rgba(234,179,8,0.4)]"
          >
            The Grand <span className="text-[#FACC15] italic">Vitrine</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-yellow-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* EXHIBIT VITRINES (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAB308]/30 pb-4">
            <h3 className="text-xl font-bold text-[#FEF08A] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FACC15]" /> Museum Glass Vitrines
            </h3>
            <span className="text-xs text-[#FACC15] font-mono">INSPECT PEDESTAL RELIC</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {museumVitrines.map((v) => (
              <motion.div
                key={v.id}
                whileHover={{ y: -4, borderColor: "#EAB308" }}
                onClick={() => {
                  setSelectedVitrine(v);
                  playMuseumAudio('pedestal', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#141419]/90 border border-[#EAB308]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#FACC15] font-mono mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#EAB308]/20 border border-[#EAB308]/40">{v.plaque}</span>
                  <span className="text-yellow-300/80">{v.award}</span>
                </div>

                <h4 className="text-xl font-bold text-[#FEF08A] group-hover:text-[#FACC15] transition mb-2">
                  {v.title}
                </h4>

                <p className="text-xs text-yellow-200/70 leading-relaxed mb-4">
                  {v.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {v.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#08080A] text-[#FACC15] border border-[#EAB308]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#FACC15] font-mono group-hover:underline">
                  <span>EXAMINE BRASS CITATION</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GUESTBOOK DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#141419]/90 border border-[#EAB308]/40 shadow-[0_0_40px_rgba(234,179,8,0.2)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#FEF08A]">Sign the Gallery Guestbook</h3>
            <p className="text-xs text-yellow-200/80">
              Send congratulatory dispatch to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#EAB308]/20 border border-[#EAB308] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#FACC15] mx-auto" />
              <p className="font-bold text-[#FEF08A]">Guestbook Signed & Citation Recorded</p>
              <p className="text-xs text-yellow-300 font-mono">Prajwal DL will read your entry.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playMuseumAudio('spotlight', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FACC15] font-mono mb-1">GUEST NAME</label>
                  <input required defaultValue="Museum Curator" className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-[#EAB308]/30 text-[#FEF08A] focus:outline-none focus:border-[#EAB308]" />
                </div>
                <div>
                  <label className="block text-[#FACC15] font-mono mb-1">GUEST EMAIL</label>
                  <input required type="email" defaultValue="curator@gallery.space" className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-[#EAB308]/30 text-[#FEF08A] focus:outline-none focus:border-[#EAB308]" />
                </div>
              </div>
              <div>
                <label className="block text-[#FACC15] font-mono mb-1">GALLERY NOTE</label>
                <textarea rows={3} required defaultValue="Requesting gold-standard museum-grade full-stack architecture with sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#08080A] border border-[#EAB308]/30 text-[#FEF08A] focus:outline-none focus:border-[#EAB308]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#EAB308] text-black font-mono font-bold text-xs hover:bg-[#FACC15] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                <Send className="w-4 h-4" /> SIGN GALLERY FOLIO
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EAB308]/30 flex flex-wrap justify-between items-center text-[11px] text-yellow-300/70 font-mono">
            <span>GALLERY: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#FACC15] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#FACC15] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#FACC15] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* VITRINE MODAL */}
      <AnimatePresence>
        {selectedVitrine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#141419] border-2 border-[#EAB308] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(234,179,8,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedVitrine(null); playMuseumAudio('plaque', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAB308]/20 text-[#FACC15] hover:bg-[#EAB308] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#EAB308]/20 text-[#FACC15] border border-[#EAB308]/40">{selectedVitrine.plaque}</span>
                <h3 className="text-2xl font-bold text-[#FEF08A]">{selectedVitrine.title}</h3>
              </div>
              <p className="text-sm text-yellow-200/80 leading-relaxed">{selectedVitrine.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#08080A] border border-[#EAB308]/30 text-xs text-[#FACC15] font-mono">★ CITATION: {selectedVitrine.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-yellow-300/70">ARCHITECTURAL PEDESTAL TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedVitrine.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#23232C] text-[#FEF08A] border border-[#EAB308]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedVitrine.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#EAB308] text-black font-bold font-mono text-xs text-center hover:bg-[#FACC15] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> ACCESS EXHIBIT
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

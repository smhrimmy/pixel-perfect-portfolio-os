import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame, Sparkles, X, ArrowUpRight, CheckCircle2, Send,
  RotateCw, Disc3, ShieldCheck
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playPotteryAudio(type: 'lathe' | 'kiln' | 'clay', isMuted: boolean) {
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

    if (type === 'lathe') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(520, now + 0.3);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'kiln') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {}
}

export default function SunsetPaperTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Ceramic Systems Architect & Artisan Potter shaping hand-thrown terracotta vessels, cone-10 reduction glazes, and sub-100ms resilient web architectures.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedVessel, setSelectedVessel] = useState<any | null>(null);
  const [wheelSpeed, setWheelSpeed] = useState<number>(45);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Spinning Clay Lathe 3D Contour Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      angle += (wheelSpeed * 0.001);
      ctx.fillStyle = '#1A0C08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Warm Sunset Glow Radial
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.4, 50,
        canvas.width / 2, canvas.height * 0.4, canvas.width * 0.6
      );
      grad.addColorStop(0, 'rgba(234, 88, 12, 0.15)');
      grad.addColorStop(1, 'rgba(26, 12, 8, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Clay lathe rings
      ctx.strokeStyle = 'rgba(251, 146, 60, 0.15)';
      ctx.lineWidth = 1.5;
      for (let r = 30; r < 280; r += 30) {
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, canvas.height * 0.45, r, r * 0.35, angle, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [wheelSpeed]);

  const ceramicVessels = [
    {
      id: "vessel-1",
      glaze: "VESSEL 01 · CELADON SPHERE",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      coneTemp: "Cone 10 Reduction @ 1280°C"
    },
    {
      id: "vessel-2",
      glaze: "VESSEL 02 · TERRACOTTA CLOUD",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      coneTemp: "High-Fire Stoneware @ 1220°C"
    },
    {
      id: "vessel-3",
      glaze: "VESSEL 03 · OCHRE BASIN",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      coneTemp: "Porcelain Slip @ 1260°C"
    },
    {
      id: "vessel-4",
      glaze: "VESSEL 04 · GLAZED AMPHORA",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      coneTemp: "Raku Flash Fired @ 1050°C"
    },
  ];

  return (
    <div className="min-h-screen bg-[#1A0C08] text-[#FFEDD5] font-sans relative selection:bg-[#EA580C] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(26,12,8,0.85)_80%)]" />

      {/* TOP POTTER HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#27120D]/90 border-b border-[#EA580C]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EA580C]/20 border border-[#EA580C] text-[#FB923C] flex items-center justify-center shadow-[0_0_20px_rgba(234,88,12,0.3)]">
            <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: `${Math.max(1, 100 / wheelSpeed)}s` }} />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#FFEDD5] uppercase flex items-center gap-2">
              <span>13 THE POTTER'S STUDIO</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EA580C]/20 text-[#FB923C] border border-[#EA580C]/40 font-mono">
                Creative Clay Workshop
              </span>
            </h1>
            <p className="text-[10px] text-orange-300/70 font-mono">
              HASH: <span className="text-[#FB923C]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · KILN: <span className="text-orange-200">1280°C</span>
            </p>
          </div>
        </div>

        {/* CLAY LATHE WHEEL RPM */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setWheelSpeed((prev) => (prev >= 90 ? 30 : prev + 20));
              playPotteryAudio('lathe', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#381B13] border border-[#EA580C]/40 text-[#FB923C] text-xs font-mono hover:bg-[#EA580C] hover:text-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>LATHE {wheelSpeed} RPM</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playPotteryAudio('clay', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#381B13] border border-[#EA580C]/30 text-[#FB923C] flex items-center justify-center hover:bg-[#EA580C] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN ATELIER STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EA580C]/15 border border-[#EA580C]/40 text-[#FB923C] text-xs font-mono"
          >
            <Flame className="w-3.5 h-3.5" /> GOLDEN-HOUR POTTERY STUDIO · HAND-THROWN CERAMICS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight text-[#FFEDD5] drop-shadow-[0_2px_30px_rgba(234,88,12,0.35)]"
          >
            The Potter&apos;s <span className="text-[#FB923C] italic">Studio</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-orange-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* CERAMIC VESSELS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#EA580C]/30 pb-4">
            <h3 className="text-xl font-bold text-[#FFEDD5] flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#FB923C]" /> Kiln-Fired Glazed Vessels
            </h3>
            <span className="text-xs text-[#FB923C] font-mono">INSPECT GLAZE PROFILE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ceramicVessels.map((vessel) => (
              <motion.div
                key={vessel.id}
                whileHover={{ y: -4, borderColor: "#EA580C" }}
                onClick={() => {
                  setSelectedVessel(vessel);
                  playPotteryAudio('kiln', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#27120D]/80 border border-[#EA580C]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.7)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#FB923C] font-mono mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#EA580C]/20 border border-[#EA580C]/40">{vessel.glaze}</span>
                  <span className="text-orange-300/80">{vessel.coneTemp}</span>
                </div>

                <h4 className="text-xl font-bold text-[#FFEDD5] group-hover:text-[#FB923C] transition mb-2">
                  {vessel.title}
                </h4>

                <p className="text-xs text-orange-200/70 leading-relaxed mb-4">
                  {vessel.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {vessel.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#1A0C08] text-[#FB923C] border border-[#EA580C]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#FB923C] font-mono group-hover:underline">
                  <span>EXAMINE GLAZED PROFILE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* POTTER DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#27120D]/90 border border-[#EA580C]/40 shadow-[0_0_40px_rgba(234,88,12,0.2)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#FFEDD5]">Throw a Custom Vessel</h3>
            <p className="text-xs text-orange-200/80">
              Send commission directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#EA580C]/20 border border-[#EA580C] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#FB923C] mx-auto" />
              <p className="font-bold text-[#FFEDD5]">Clay Centered on Wheel & Firing Queued</p>
              <p className="text-xs text-orange-300 font-mono">Prajwal DL will inspect the commission.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playPotteryAudio('lathe', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#FB923C] font-mono mb-1">PATRON NAME</label>
                  <input required defaultValue="Artisan Collector" className="w-full px-4 py-2.5 rounded-xl bg-[#1A0C08] border border-[#EA580C]/30 text-[#FFEDD5] focus:outline-none focus:border-[#EA580C]" />
                </div>
                <div>
                  <label className="block text-[#FB923C] font-mono mb-1">COMMISSION EMAIL</label>
                  <input required type="email" defaultValue="collector@atelier.space" className="w-full px-4 py-2.5 rounded-xl bg-[#1A0C08] border border-[#EA580C]/30 text-[#FFEDD5] focus:outline-none focus:border-[#EA580C]" />
                </div>
              </div>
              <div>
                <label className="block text-[#FB923C] font-mono mb-1">VESSEL SPECIFICATIONS</label>
                <textarea rows={3} required defaultValue="Requesting organic hand-thrown full-stack architecture with earth-toned aesthetics." className="w-full px-4 py-2.5 rounded-xl bg-[#1A0C08] border border-[#EA580C]/30 text-[#FFEDD5] focus:outline-none focus:border-[#EA580C]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#EA580C] text-black font-mono font-bold text-xs hover:bg-[#FB923C] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT CERAMIC ORDER
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EA580C]/30 flex flex-wrap justify-between items-center text-[11px] text-orange-300/70 font-mono">
            <span>ATELIER: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#FB923C] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#FB923C] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#FB923C] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* VESSEL MODAL */}
      <AnimatePresence>
        {selectedVessel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#27120D] border-2 border-[#EA580C] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(234,88,12,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedVessel(null); playPotteryAudio('clay', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EA580C]/20 text-[#FB923C] hover:bg-[#EA580C] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#EA580C]/20 text-[#FB923C] border border-[#EA580C]/40">{selectedVessel.glaze}</span>
                <h3 className="text-2xl font-bold text-[#FFEDD5]">{selectedVessel.title}</h3>
              </div>
              <p className="text-sm text-orange-200/80 leading-relaxed">{selectedVessel.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#1A0C08] border border-[#EA580C]/30 text-xs text-[#FB923C] font-mono">★ HIGHLIGHT: {selectedVessel.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-orange-300/70">GLAZE MINERAL TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedVessel.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#381B13] text-[#FFEDD5] border border-[#EA580C]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedVessel.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#EA580C] text-black font-bold font-mono text-xs text-center hover:bg-[#FB923C] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> VESSEL TELEMETRY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

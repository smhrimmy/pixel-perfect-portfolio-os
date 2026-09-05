import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, Compass, Anchor, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Navigation, MapPin
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playGlobeAudio(type: 'spin' | 'pin' | 'morse', isMuted: boolean) {
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

    if (type === 'morse') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'spin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {}
}

export default function GalaxyGlobeTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Cartographic Systems Navigator & Maritime Web Architect tracing global trade route geodesics, brass gimbal compasses, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedWaypoint, setSelectedWaypoint] = useState<any | null>(null);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Antique Globe Latitude / Longitude Gimbal Canvas
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
      angle += 0.008 * rotationSpeed;
      ctx.fillStyle = '#06101E';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.45;
      const radius = Math.min(canvas.width, canvas.height) * 0.35;

      // Globe sphere rim
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Longitude lines
      for (let i = 0; i < 6; i++) {
        const offset = (angle + (i * Math.PI) / 6) % Math.PI;
        const xRadius = Math.sin(offset) * radius;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xRadius), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Latitude lines
      for (let j = -3; j <= 3; j++) {
        const yOffset = (j / 4) * radius;
        const widthAtY = Math.sqrt(Math.max(0, radius * radius - yOffset * yOffset));
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
        ctx.beginPath();
        ctx.ellipse(cx, cy + yOffset, widthAtY, widthAtY * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [rotationSpeed]);

  const tradeWaypoints = [
    {
      id: "waypoint-1",
      coord: "PORT 01 · 12°54'N 74°51'E",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      cargo: "Primary Core Navigation Engine"
    },
    {
      id: "waypoint-2",
      coord: "PORT 02 · 37°46'N 122°25'W",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      cargo: "Encrypted Global DNS Router"
    },
    {
      id: "waypoint-3",
      coord: "PORT 03 · 51°30'N 0°07'W",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      cargo: "Resilient Microservice Armada"
    },
    {
      id: "waypoint-4",
      coord: "PORT 04 · 35°41'N 139°41'E",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      cargo: "Enterprise Merchant Fleets"
    },
  ];

  return (
    <div className="min-h-screen bg-[#06101E] text-[#E0F2FE] font-mono relative selection:bg-[#0284C7] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,16,30,0.85)_80%)]" />

      {/* TOP GLOBE HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0A1A30]/90 border-b border-[#0284C7]/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0284C7]/20 border border-[#0284C7] text-[#38BDF8] flex items-center justify-center shadow-[0_0_20px_rgba(2,132,199,0.3)]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-widest text-[#E0F2FE] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/40">
                TRADE ROUTE
              </span>
            </h1>
            <p className="text-[10px] text-sky-300/70">
              HASH: <span className="text-[#38BDF8]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · HEADING: <span className="text-sky-200">045° NNE</span>
            </p>
          </div>
        </div>

        {/* SPIN SPEED & COMPASS */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setRotationSpeed((prev) => (prev >= 3 ? 1 : prev + 1));
              playGlobeAudio('spin', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#0F294D] border border-[#0284C7]/40 text-[#38BDF8] text-xs font-mono hover:bg-[#0284C7] hover:text-black transition flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>GIMBAL ×{rotationSpeed}</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playGlobeAudio('morse', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#0F294D] border border-[#0284C7]/30 text-[#38BDF8] flex items-center justify-center hover:bg-[#0284C7] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN GLOBE STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/50 text-[#38BDF8] text-xs font-bold"
          >
            <Anchor className="w-3.5 h-3.5" /> 18TH CENTURY DESK GLOBE · MARITIME TRADE GEODESICS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-[#E0F2FE] drop-shadow-[0_2px_35px_rgba(2,132,199,0.5)] uppercase"
          >
            The Trade Route <span className="text-[#38BDF8] underline decoration-[#0284C7]">Globe</span>
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

        {/* TRADE WAYPOINTS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#0284C7]/40 pb-4">
            <h3 className="text-xl font-bold text-[#E0F2FE] flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#38BDF8]" /> Charted Port Waypoints
            </h3>
            <span className="text-xs text-[#38BDF8]">CLICK PIN TO CHART LOG</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tradeWaypoints.map((wp) => (
              <motion.div
                key={wp.id}
                whileHover={{ y: -4, borderColor: "#0284C7" }}
                onClick={() => {
                  setSelectedWaypoint(wp);
                  playGlobeAudio('pin', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#0A1A30]/90 border border-[#0284C7]/30 backdrop-blur-xl cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#38BDF8] font-bold mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#0284C7]/20 border border-[#0284C7]/40">{wp.coord}</span>
                  <span className="text-sky-300/80">{wp.cargo}</span>
                </div>

                <h4 className="text-2xl font-black text-[#E0F2FE] group-hover:text-[#38BDF8] transition mb-2">
                  {wp.title}
                </h4>

                <p className="text-xs text-sky-200/70 leading-relaxed mb-4">
                  {wp.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {wp.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded bg-[#06101E] text-[#38BDF8] border border-[#0284C7]/30">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#38BDF8] font-bold group-hover:underline">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>INSPECT MARITIME CARGO</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TELEGRAM DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#0A1A30]/90 border border-[#0284C7]/50 shadow-[0_0_50px_rgba(2,132,199,0.25)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-[#E0F2FE]">Transmit Morse Code Telegram</h3>
            <p className="text-xs text-sky-200/80">
              Transmit telegram directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#0284C7]/20 border border-[#0284C7] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#38BDF8] mx-auto" />
              <p className="font-black text-[#E0F2FE]">TELEGRAM DISPATCH TRANSMITTED VIA SHORTWAVE</p>
              <p className="text-xs text-sky-300 font-mono">Prajwal DL will decode the dispatch.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playGlobeAudio('morse', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#38BDF8] font-bold mb-1">CALLSIGN / VESSEL</label>
                  <input required defaultValue="S.S. Navigator" className="w-full px-4 py-2.5 rounded-xl bg-[#06101E] border border-[#0284C7]/40 text-[#E0F2FE] focus:outline-none focus:border-[#0284C7]" />
                </div>
                <div>
                  <label className="block text-[#38BDF8] font-bold mb-1">RADIO TELEGRAPH FREQ</label>
                  <input required type="email" defaultValue="navigator@globe.space" className="w-full px-4 py-2.5 rounded-xl bg-[#06101E] border border-[#0284C7]/40 text-[#E0F2FE] focus:outline-none focus:border-[#0284C7]" />
                </div>
              </div>
              <div>
                <label className="block text-[#38BDF8] font-bold mb-1">TELEGRAM CONTENT</label>
                <textarea rows={3} required defaultValue="Requesting global full-stack cloud navigation architecture with sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#06101E] border border-[#0284C7]/40 text-[#E0F2FE] focus:outline-none focus:border-[#0284C7]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#0284C7] text-black font-black text-xs hover:bg-[#38BDF8] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(2,132,199,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT SHORTWAVE TELEGRAM
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#0284C7]/30 flex flex-wrap justify-between items-center text-[11px] text-sky-300 font-mono">
            <span>PORT: MANGALORE, INDIA · 12°54'N 74°51'E</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* WAYPOINT MODAL */}
      <AnimatePresence>
        {selectedWaypoint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0A1A30] border-2 border-[#0284C7] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(2,132,199,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedWaypoint(null); playGlobeAudio('morse', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#0284C7]/20 text-[#38BDF8] hover:bg-[#0284C7] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded bg-[#0284C7]/20 text-[#38BDF8] border border-[#0284C7]/40">{selectedWaypoint.coord}</span>
                <h3 className="text-2xl font-black text-[#E0F2FE]">{selectedWaypoint.title}</h3>
              </div>
              <p className="text-sm text-sky-200/80 leading-relaxed">{selectedWaypoint.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#06101E] border border-[#0284C7]/40 text-xs text-[#38BDF8]">★ HIGHLIGHT: {selectedWaypoint.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-sky-300">CARGO MANIFEST</span>
                <div className="flex flex-wrap gap-2">
                  {selectedWaypoint.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-[#0F294D] text-[#E0F2FE] border border-[#0284C7]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedWaypoint.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#0284C7] text-black font-black text-xs text-center hover:bg-[#38BDF8] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> ACCESS WAYPOINT
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

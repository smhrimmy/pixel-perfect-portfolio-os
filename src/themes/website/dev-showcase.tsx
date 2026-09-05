import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench, Gauge, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Flame, Zap
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playEngineAudio(type: 'rev' | 'lift' | 'ratchet', isMuted: boolean) {
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

    if (type === 'rev') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.3);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.6);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'lift') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(450, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch {}
}

export default function DevShowcaseTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Performance Systems Mechanic & High-Torque Full Stack Engineer tuning twin-turbo telemetry engines, hydraulic vehicle lifts, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedBay, setSelectedBay] = useState<any | null>(null);
  const [rpm, setRpm] = useState<number>(3200);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Tachometer Dial & Engine Gauge Canvas
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
      ctx.fillStyle = '#0D0E12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Industrial diamond plate grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.06)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
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

  const serviceBays = [
    {
      id: "bay-1",
      liftNo: "BAY 01 · TWIN-TURBO V8",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      psi: "28.5 PSI BOOST"
    },
    {
      id: "bay-2",
      liftNo: "BAY 02 · CLOUD MANIFOLD",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      psi: "ZERO DOWNTIME"
    },
    {
      id: "bay-3",
      liftNo: "BAY 03 · FRONTEND CHASSIS",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      psi: "SUB-100MS LCP"
    },
    {
      id: "bay-4",
      liftNo: "BAY 04 · BESPOKE DRIVETRAIN",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      psi: "100% RELIABILITY"
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0E12] text-[#FEE2E2] font-mono relative selection:bg-[#EF4444] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,14,18,0.85)_80%)]" />

      {/* TOP GARAGE HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#181920]/90 border-b-2 border-[#EF4444]/40 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EF4444]/20 border border-[#EF4444] text-[#F87171] flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-widest text-[#FEE2E2] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40">
                SERVICE BAY
              </span>
            </h1>
            <p className="text-[10px] text-red-300/70">
              HASH: <span className="text-[#EF4444]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · TACH: <span className="text-red-200">{rpm} RPM</span>
            </p>
          </div>
        </div>

        {/* ENGINE REV & TACH */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setRpm((prev) => (prev >= 8000 ? 2500 : prev + 1500));
              playEngineAudio('rev', isMuted);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-[#281318] border border-[#EF4444]/40 text-[#F87171] text-xs font-black hover:bg-[#EF4444] hover:text-black transition flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>REV THROTTLE</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playEngineAudio('ratchet', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#281318] border border-[#EF4444]/30 text-[#F87171] flex items-center justify-center hover:bg-[#EF4444] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN GARAGE STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#F87171] text-xs font-bold"
          >
            <Gauge className="w-3.5 h-3.5" /> TWIN-TURBO SERVICE BAY · HYDRAULIC VEHICLE LIFTS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-[#FEE2E2] drop-shadow-[0_2px_35px_rgba(239,68,68,0.5)] uppercase"
          >
            The Mechanic&apos;s <span className="text-[#EF4444] underline decoration-[#B91C1C]">Garage</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-red-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* SERVICE BAYS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#EF4444]/40 pb-4">
            <h3 className="text-xl font-bold text-[#FEE2E2] flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#EF4444]" /> Active Hydraulic Lifts
            </h3>
            <span className="text-xs text-[#F87171]">INSPECT ENGINE TELEMETRY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceBays.map((bay) => (
              <motion.div
                key={bay.id}
                whileHover={{ y: -4, borderColor: "#EF4444" }}
                onClick={() => {
                  setSelectedBay(bay);
                  playEngineAudio('lift', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#181920]/90 border-2 border-[#EF4444]/30 backdrop-blur-xl cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#F87171] font-bold mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#EF4444]/20 border border-[#EF4444]/40">{bay.liftNo}</span>
                  <span className="text-yellow-400">{bay.psi}</span>
                </div>

                <h4 className="text-2xl font-black text-[#FEE2E2] group-hover:text-[#EF4444] transition mb-2">
                  {bay.title}
                </h4>

                <p className="text-xs text-red-200/70 leading-relaxed mb-4">
                  {bay.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bay.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded bg-[#0D0E12] text-[#F87171] border border-[#EF4444]/30">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#EF4444] font-bold group-hover:underline">
                  <Zap className="w-3.5 h-3.5" />
                  <span>DIAGNOSE ENGINE ECU</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WORK ORDER DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#181920]/90 border-2 border-[#EF4444]/50 shadow-[0_0_50px_rgba(239,68,68,0.25)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-[#FEE2E2]">Submit Service Work Order</h3>
            <p className="text-xs text-red-200/80">
              Transmit work order directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#EF4444]/20 border-2 border-[#EF4444] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#EF4444] mx-auto" />
              <p className="font-black text-[#FEE2E2]">WORK ORDER LOGGED & HYDRAULIC LIFT ASSIGNED</p>
              <p className="text-xs text-red-300">Prajwal DL will inspect your vehicle telemetry.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playEngineAudio('rev', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F87171] font-bold mb-1">DRIVER / FLEET CALLSIGN</label>
                  <input required defaultValue="Pit Boss" className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-[#EF4444]/40 text-[#FEE2E2] focus:outline-none focus:border-[#EF4444]" />
                </div>
                <div>
                  <label className="block text-[#F87171] font-bold mb-1">TELEMETRY EMAIL</label>
                  <input required type="email" defaultValue="fleet@garage.space" className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-[#EF4444]/40 text-[#FEE2E2] focus:outline-none focus:border-[#EF4444]" />
                </div>
              </div>
              <div>
                <label className="block text-[#F87171] font-bold mb-1">SERVICE REQUIREMENTS</label>
                <textarea rows={3} required defaultValue="Requesting maximum-torque twin-turbo full-stack architecture with sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#0D0E12] border border-[#EF4444]/40 text-[#FEE2E2] focus:outline-none focus:border-[#EF4444]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#EF4444] text-black font-black text-xs hover:bg-[#F87171] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT WORK ORDER
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#EF4444]/30 flex flex-wrap justify-between items-center text-[11px] text-red-300 font-mono">
            <span>GARAGE: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#F87171] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#F87171] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#F87171] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* BAY MODAL */}
      <AnimatePresence>
        {selectedBay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#181920] border-2 border-[#EF4444] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(239,68,68,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedBay(null); playEngineAudio('ratchet', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EF4444]/20 text-[#F87171] hover:bg-[#EF4444] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded bg-[#EF4444]/20 text-[#F87171] border border-[#EF4444]/40">{selectedBay.liftNo}</span>
                <h3 className="text-2xl font-black text-[#FEE2E2]">{selectedBay.title}</h3>
              </div>
              <p className="text-sm text-red-200/80 leading-relaxed">{selectedBay.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#0D0E12] border border-[#EF4444]/40 text-xs text-[#F87171]">★ HIGHLIGHT: {selectedBay.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-red-300">ENGINE TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedBay.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-[#281318] text-[#FEE2E2] border border-[#EF4444]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedBay.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#EF4444] text-black font-black text-xs text-center hover:bg-[#F87171] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> LIVE TELEMETRY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

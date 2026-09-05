import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Gauge,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Cpu,
  Zap,
  Activity
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playGarageSound(type: 'turbo' | 'ratchet' | 'rev' | 'ignite', isMuted: boolean) {
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

    if (type === 'turbo') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'ratchet') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(300, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch {}
}

export default function TheMechanicsGarage({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Master Diagnostic Mechanic tuning high-horsepower digital engines, automated DNS turbochargers, and sub-100ms web systems.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedEngine, setSelectedEngine] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [rpmGauge, setRpmGauge] = useState(7200);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Engine Block Wireframe & Tachometer Canvas
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
      time += 0.03;
      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.42;

      // 3D Crankshaft & Cylinder Oscillations
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.25)';
      ctx.lineWidth = 2;

      const cylinders = 6;
      const w = 60;
      for (let i = 0; i < cylinders; i++) {
        const x = cx + (i - (cylinders - 1) / 2) * (w + 16);
        const stroke = Math.sin(time * 3 + i * (Math.PI / 3)) * 30;

        // Cylinder Sleeve
        ctx.strokeRect(x - w / 2, cy - 50, w, 100);

        // Piston Head
        ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.fillRect(x - w / 2 + 4, cy - 40 + stroke, w - 8, 20);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const engines = [
    {
      id: "eng-1",
      bay: "SERVICE BAY 01 / V12 TWIN-TURBO",
      title: "Portfolio OS Engine",
      boost: "24.5 PSI BOOST",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "eng-2",
      bay: "SERVICE BAY 02 / TURBO INTERCOOLER",
      title: "Praxel Space Cloud Dyno",
      boost: "32.0 PSI BOOST",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "eng-3",
      bay: "SERVICE BAY 03 / DIRECT INJECTION",
      title: "Vitvara High-RPM Module",
      boost: "18.2 PSI BOOST",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "eng-4",
      bay: "SERVICE BAY 04 / CUSTOM RACE-SPEC",
      title: "Enterprise Client Powertrain",
      boost: "28.0 PSI BOOST",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#FCA5A5] font-mono relative selection:bg-[#EF4444] selection:text-white overflow-x-hidden">
      {/* 3D Engine Dyno Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#121212]/90 border-b border-[#EF4444]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#EF4444] text-black font-black flex items-center justify-center">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#EF4444] text-black font-bold">GARAGE DYNO</span>
            </h1>
            <p className="text-[10px] text-red-300">{location} · RPM: {rpmGauge} · REDLINE READY</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setRpmGauge(r => r === 7200 ? 9000 : 7200);
              playGarageSound('turbo', isMuted);
            }}
            className="px-3 py-1.5 bg-[#EF4444] text-black font-black text-xs hover:bg-white transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" /> SPOOL TURBO
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playGarageSound('ratchet', !isMuted);
            }}
            className="w-9 h-9 border border-[#EF4444]/50 text-[#FCA5A5] flex items-center justify-center hover:bg-[#EF4444] hover:text-black transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-900" /> : <Volume2 className="w-4 h-4 text-[#EF4444]" />}
          </button>
        </div>
      </header>

      {/* MAIN GARAGE STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="p-8 bg-[#121212] border-2 border-[#EF4444] shadow-[8px_8px_0px_#EF4444] space-y-4">
          <div className="flex justify-between items-center text-xs text-red-300 border-b border-red-900/50 pb-3">
            <span className="flex items-center gap-1.5"><Wrench className="w-4 h-4 text-[#EF4444]" /> HIGH-PERFORMANCE DIAGNOSTIC BAY</span>
            <span className="text-[#EF4444] font-black">0-100% SUB-100MS LCP</span>
          </div>

          <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tighter uppercase">
            CALIBRATING HIGH-HORSEPOWER <span className="text-[#EF4444]">SYSTEMS</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
            {bio}
          </p>
        </section>

        {/* ENGINE BAYS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center text-xs font-black text-red-300 border-b-2 border-red-900/50 pb-3">
            <span>DYNO-TESTED POWERTRAINS</span>
            <span>CLICK BAY TO RUN OBD-II DIAGNOSTICS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {engines.map((eng) => (
              <motion.div
                key={eng.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setSelectedEngine(eng);
                  playGarageSound('ratchet', isMuted);
                }}
                className="p-6 bg-[#121212] border-2 border-[#EF4444] shadow-[5px_5px_0px_#EF4444] cursor-pointer transition group"
              >
                <div className="flex justify-between items-center text-[10px] text-zinc-400 mb-3">
                  <span className="font-black text-[#EF4444]">{eng.bay}</span>
                  <span className="px-2 py-0.5 bg-black border border-red-900 text-white">{eng.boost}</span>
                </div>

                <h4 className="text-xl font-black text-white group-hover:text-[#EF4444] transition mb-2">
                  {eng.title}
                </h4>

                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {eng.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {eng.tech.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 bg-black text-[#FCA5A5] border border-red-900/40">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-[#EF4444] group-hover:underline">
                  <span>RUN TELEMETRY DIAGNOSTICS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GARAGE SERVICE REQUISITION */}
        <section className="p-8 bg-[#121212] border-2 border-[#EF4444] shadow-[8px_8px_0px_#EF4444] space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-white uppercase">BOOK DIAGNOSTIC SERVICE CALL</h3>
            <p className="text-xs text-zinc-400">
              Submit tune-up request directly to chief mechanic Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-4 bg-black border-2 border-[#EF4444] text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-[#EF4444]" />
              <p className="font-black text-xs text-white">SERVICE APPOINTMENT LOGGED ON DYNO</p>
              <p className="text-[10px] text-zinc-400">Prajwal DL will inspect your powertrain specs.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playGarageSound('turbo', isMuted);
              }}
              className="space-y-4 text-xs font-bold"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">DRIVER / CLIENT NAME</label>
                  <input
                    required
                    defaultValue="Race Pilot"
                    className="w-full px-3 py-2 bg-black border-2 border-zinc-700 text-white focus:outline-none focus:border-[#EF4444]"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-[10px] mb-1">CONTACT EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="pilot@garage.speed"
                    className="w-full px-3 py-2 bg-black border-2 border-zinc-700 text-white focus:outline-none focus:border-[#EF4444]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-[10px] mb-1">ENGINE REQUIREMENTS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting high-horsepower full-stack web architecture with sub-100ms response targets."
                  className="w-full px-3 py-2 bg-black border-2 border-zinc-700 text-white focus:outline-none focus:border-[#EF4444]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#EF4444] text-black font-black text-xs hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#fff]"
              >
                <Send className="w-3.5 h-3.5" /> DISPATCH SERVICE ORDER
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-zinc-800 flex flex-wrap justify-between items-center text-[10px] text-zinc-400">
            <span>SERVICE BAY: MANGALORE, KARNATAKA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#EF4444] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#EF4444] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#EF4444] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* ENGINE MODAL */}
      <AnimatePresence>
        {selectedEngine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#121212] border-2 border-[#EF4444] p-6 sm:p-8 max-w-lg w-full shadow-[10px_10px_0px_#EF4444] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedEngine(null);
                  playGarageSound('ratchet', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 bg-black text-[#EF4444] border border-[#EF4444] hover:bg-[#EF4444] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black px-2 py-0.5 bg-[#EF4444] text-black">
                  {selectedEngine.bay} · {selectedEngine.boost}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedEngine.title}</h3>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedEngine.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs text-[#EF4444]">POWERTRAIN TECHNOLOGIES</span>
                <div className="flex flex-wrap gap-2">
                  {selectedEngine.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 bg-black text-white border border-red-900">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedEngine.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-[#EF4444] text-black font-black text-xs text-center hover:bg-white transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LIVE REPOSITORY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

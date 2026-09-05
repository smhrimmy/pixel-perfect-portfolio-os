import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout, Droplet, Sun, Wind, Sparkles, X, ArrowUpRight,
  CheckCircle2, Send, Flower2, Thermometer, CloudRain
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playFloraAudio(type: 'mist' | 'bloom' | 'drop', isMuted: boolean) {
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

    if (type === 'mist') {
      // White noise style hiss
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.4);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'bloom') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {}
}

export default function GlassMorphTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Ecosystem Systems Architect & Greenhouse Engineer cultivating organic, high-yield frontend plants, crystalline glass interfaces, and sub-100ms resilient web organisms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedPlant, setSelectedPlant] = useState<any | null>(null);
  const [humidity, setHumidity] = useState<number>(82);
  const [isMisting, setIsMisting] = useState<boolean>(false);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Greenhouse Glass Condensation & Water Droplets Canvas
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

    // Condensation droplets
    const droplets = Array.from({ length: 45 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 3 + 1.5,
      speed: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.4 + 0.2
    }));

    const render = () => {
      time += 0.01;
      ctx.fillStyle = '#06130D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Glass ribs
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.05)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 160) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Render drifting droplets
      droplets.forEach((d) => {
        d.y += d.speed;
        if (d.y > canvas.height) {
          d.y = -10;
          d.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 243, 208, ${d.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const greenhousePlants = [
    {
      id: "plant-1",
      specimen: "SPECIMEN α · ORCHID CORE",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      stage: "Full Blossom · 99.8% Yield"
    },
    {
      id: "plant-2",
      specimen: "SPECIMEN β · CLOUD FERN",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      stage: "Active Canopy · 100% Uptime"
    },
    {
      id: "plant-3",
      specimen: "SPECIMEN γ · VINE ARCHITECTURE",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      stage: "Rooted System · Sub-100ms"
    },
    {
      id: "plant-4",
      specimen: "SPECIMEN δ · GLASSHOUSE HYBRID",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      stage: "Cultivated & Deployed"
    },
  ];

  return (
    <div className="min-h-screen bg-[#06130D] text-[#ECFDF5] font-sans relative selection:bg-[#10B981] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,19,13,0.85)_80%)]" />

      {/* TOP GREENHOUSE HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0A1F16]/80 border-b border-[#10B981]/30 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/50 text-[#34D399] flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#A7F3D0] uppercase flex items-center gap-2">
              <span>11 THE GREENHOUSE</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 font-mono">
                Living Portfolio Ecosystem
              </span>
            </h1>
            <p className="text-[10px] text-emerald-300/70 font-mono">
              HASH: <span className="text-[#34D399]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · CLUSTER: <span className="text-emerald-200">{HIGGSFIELD_CLUSTER_UUID.slice(0, 8)}...</span>
            </p>
          </div>
        </div>

        {/* MIST CONTROLS & HUMIDITY */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#06130D]/90 border border-[#10B981]/30 text-xs font-mono text-[#34D399]">
            <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
            <span>24.5°C · {humidity}% RH</span>
          </div>

          <button
            onClick={() => {
              setIsMisting(true);
              setHumidity((prev) => Math.min(99, prev + 3));
              playFloraAudio('mist', isMuted);
              setTimeout(() => setIsMisting(false), 800);
            }}
            className={`px-3 py-1.5 rounded-xl border border-[#10B981]/40 text-xs font-mono transition flex items-center gap-1.5 cursor-pointer ${
              isMisting ? 'bg-[#10B981] text-black shadow-[0_0_15px_rgba(16,185,129,0.6)]' : 'bg-[#0A1F16] text-[#34D399] hover:bg-[#10B981]/20'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>TRIGGER MIST</span>
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playFloraAudio('drop', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#0A1F16] border border-[#10B981]/30 text-[#34D399] flex items-center justify-center hover:bg-[#10B981]/20 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CONSERVATORY STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#34D399] text-xs font-mono"
          >
            <Flower2 className="w-3.5 h-3.5" /> MISTED GLASS CONSERVATORY · VIBRANT BOTANICAL ECOSYSTEM
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-[#A7F3D0] drop-shadow-[0_2px_30px_rgba(16,185,129,0.3)]"
          >
            Grow · Explore · <span className="text-[#34D399] italic">Collaborate</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-emerald-200/80 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* POTTED SPECIMENS (PROJECTS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#10B981]/30 pb-4">
            <h3 className="text-xl font-bold text-[#A7F3D0] flex items-center gap-2">
              <Sprout className="w-5 h-5 text-[#34D399]" /> Potted Botanical Specimens
            </h3>
            <span className="text-xs text-[#34D399] font-mono">CLICK TO INSPECT ROOT SYSTEM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {greenhousePlants.map((plant) => (
              <motion.div
                key={plant.id}
                whileHover={{ y: -4, borderColor: "#10B981" }}
                onClick={() => {
                  setSelectedPlant(plant);
                  playFloraAudio('bloom', isMuted);
                }}
                className="p-6 rounded-3xl bg-[#0A1F16]/70 border border-[#10B981]/30 backdrop-blur-xl cursor-pointer transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.6)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#34D399] font-mono mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40">{plant.specimen}</span>
                  <span className="text-emerald-300/80">{plant.stage}</span>
                </div>

                <h4 className="text-xl font-bold text-[#ECFDF5] group-hover:text-[#34D399] transition mb-2">
                  {plant.title}
                </h4>

                <p className="text-xs text-emerald-200/70 leading-relaxed mb-4">
                  {plant.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {plant.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-lg bg-[#06130D] text-[#34D399] border border-[#10B981]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#34D399] font-mono group-hover:underline">
                  <span>EXAMINE FLORA CHROMOSOME</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WATERING CAN DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#0A1F16]/80 border border-[#10B981]/40 shadow-[0_0_40px_rgba(16,185,129,0.2)] backdrop-blur-xl space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#A7F3D0]">Pollinate a New Project</h3>
            <p className="text-xs text-emerald-200/80">
              Send dispatch directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#10B981]/20 border border-[#10B981] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#34D399] mx-auto" />
              <p className="font-bold text-[#ECFDF5]">Seed Planted & Mist Cycle Started</p>
              <p className="text-xs text-emerald-300 font-mono">Prajwal DL will inspect the seedling.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playFloraAudio('bloom', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#34D399] font-mono mb-1">BOTANIST NAME</label>
                  <input required defaultValue="Conservator" className="w-full px-4 py-2.5 rounded-xl bg-[#06130D] border border-[#10B981]/30 text-[#ECFDF5] focus:outline-none focus:border-[#10B981]" />
                </div>
                <div>
                  <label className="block text-[#34D399] font-mono mb-1">EMAIL ADDRESS</label>
                  <input required type="email" defaultValue="client@greenhouse.space" className="w-full px-4 py-2.5 rounded-xl bg-[#06130D] border border-[#10B981]/30 text-[#ECFDF5] focus:outline-none focus:border-[#10B981]" />
                </div>
              </div>
              <div>
                <label className="block text-[#34D399] font-mono mb-1">GROWTH REQUISITION</label>
                <textarea rows={3} required defaultValue="Requesting resilient full-stack architecture with lush glassmorphic UI and sub-100ms response." className="w-full px-4 py-2.5 rounded-xl bg-[#06130D] border border-[#10B981]/30 text-[#ECFDF5] focus:outline-none focus:border-[#10B981]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#10B981] text-black font-mono font-bold text-xs hover:bg-[#34D399] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT BOTANICAL DISPATCH
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#10B981]/30 flex flex-wrap justify-between items-center text-[11px] text-emerald-300/70 font-mono">
            <span>CONSERVATORY: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#34D399] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#34D399] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#34D399] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* PLANT MODAL */}
      <AnimatePresence>
        {selectedPlant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0A1F16] border-2 border-[#10B981] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(16,185,129,0.4)] relative space-y-6">
              <button onClick={() => { setSelectedPlant(null); playFloraAudio('drop', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#10B981]/20 text-[#34D399] hover:bg-[#10B981] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40">{selectedPlant.specimen}</span>
                <h3 className="text-2xl font-bold text-[#A7F3D0]">{selectedPlant.title}</h3>
              </div>
              <p className="text-sm text-emerald-200/80 leading-relaxed">{selectedPlant.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#06130D] border border-[#10B981]/30 text-xs text-[#34D399] font-mono">★ HIGHLIGHT: {selectedPlant.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-emerald-300/70">CHLOROPHYLL TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedPlant.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#06130D] text-[#A7F3D0] border border-[#10B981]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedPlant.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#10B981] text-black font-bold font-mono text-xs text-center hover:bg-[#34D399] transition flex items-center justify-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> LIVE ORGANISM
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

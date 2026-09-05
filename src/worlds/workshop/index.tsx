import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Watch, Scroll, Sparkles, Music, Wrench, Compass, Search, Hammer, RotateCw,
  Layers, ArrowUpRight, CheckCircle2, Send, Lightbulb, X, Activity, Scissors
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playAudio(type: 'gear' | 'ticking' | 'flute' | 'wood', isMuted: boolean) {
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

    if (type === 'gear') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(240, now + 0.06);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'flute') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.setValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function TheWorkshop({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Master Craftsman Developer carving tangible physical 3D WebGL interfaces, DNS automation architectures, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [activeArtifact, setActiveArtifact] = useState<any | null>(null);
  const [activeTool, setActiveTool] = useState<any | null>(null);
  const [springTension, setSpringTension] = useState<number>(75);
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Craftsman Woodgrain Canvas with Live Floating Shavings
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
      ctx.fillStyle = '#140D08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Procedural Walnut Grain Lines
      for (let y = 0; y < canvas.height; y += 18) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 25) {
          const grain = Math.sin(x * 0.005 + y * 0.01 + time * 0.2) * 8 + Math.cos(x * 0.02) * 3;
          if (x === 0) ctx.moveTo(x, y + grain);
          else ctx.lineTo(x, y + grain);
        }
        ctx.strokeStyle = 'rgba(217, 119, 6, 0.07)';
        ctx.lineWidth = 1.5;
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

  const deskArtifacts = [
    {
      id: "art-1",
      metaphor: "18-Jewel Escapement Pocket Watch",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system featuring 20 real-world tactile physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
      icon: Watch,
      tensionCost: "-15% Tension",
    },
    {
      id: "art-2",
      metaphor: "Architectural Drafting Blueprint",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
      icon: Scroll,
      tensionCost: "-20% Tension",
    },
    {
      id: "art-3",
      metaphor: "Bioluminescent Firefly Vessel",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
      icon: Lightbulb,
      tensionCost: "-10% Tension",
    },
    {
      id: "art-4",
      metaphor: "Hand-Cranked Music Box",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
      icon: Music,
      tensionCost: "-15% Tension",
    },
  ];

  const pegboardTools = [
    { name: "Full Stack Precision", tool: "Carving Chisel", level: "Expert", icon: Hammer },
    { name: "DNS Telemetry", tool: "Brass Caliper", level: "Senior", icon: Compass },
    { name: "3D Spatial WebGL", tool: "Smoothing Plane", level: "Advanced", icon: Wrench },
    { name: "Server Migrations", tool: "Gear Wrench", level: "Production", icon: RotateCw },
    { name: "UI/UX Tactility", tool: "Etching Awl", level: "Lead", icon: Scissors },
    { name: "API Microservices", tool: "Joinery Square", level: "Architect", icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#140D08] text-[#FEF3C7] font-serif relative selection:bg-[#F59E0B] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,13,8,0.85)_80%)]" />

      {/* TOP CRAFTSMAN BENCH HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#1F130B]/90 border-b border-[#D97706]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D97706]/20 border border-[#F59E0B] text-[#F59E0B] flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            <Hammer className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#FFFBEB] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#D97706]/20 text-[#F59E0B] border border-[#D97706]/50 font-mono">
                HIGGSFIELD AI MCF
              </span>
            </h1>
            <p className="text-[10px] text-amber-300/70 font-mono">
              HASH: <span className="text-[#F59E0B]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · CLUSTER: <span className="text-amber-200">{HIGGSFIELD_CLUSTER_UUID.slice(0, 8)}...</span>
            </p>
          </div>
        </div>

        {/* SPRING TENSION GAUGER */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#2E1A0E] border border-[#D97706]/35 px-3 py-1.5 rounded-xl text-xs text-[#F59E0B] font-mono">
            <RotateCw className="w-3.5 h-3.5" />
            <span>SPRING TENSION: {springTension}%</span>
            <button
              onClick={() => {
                setSpringTension(t => Math.min(100, t + 10));
                playAudio('gear', isMuted);
              }}
              className="px-1.5 py-0.5 rounded bg-[#D97706]/20 hover:bg-[#F59E0B] hover:text-black transition"
            >
              WIND +
            </button>
          </div>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playAudio('flute', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#2E1A0E] border border-[#D97706]/40 text-[#F59E0B] flex items-center justify-center hover:bg-[#F59E0B] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN WORKBENCH */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        {/* HERO */}
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D97706]/15 border border-[#F59E0B]/40 text-[#F59E0B] text-xs font-mono"
          >
            <Hammer className="w-3.5 h-3.5" /> ARTISAN BENCH · HIGGSFIELD TACTILE GEOMETRY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight text-[#FFFBEB] drop-shadow-[0_2px_30px_rgba(245,158,11,0.35)]"
          >
            The Artisan <span className="text-[#F59E0B] italic">Workbench</span>
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

        {/* 4 PHYSICAL DESK ARTIFACTS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#D97706]/40 pb-4">
            <h3 className="text-xl font-bold text-[#FFFBEB] flex items-center gap-2">
              <Watch className="w-5 h-5 text-[#F59E0B]" /> Physical Desk Artifacts (Touch to Examine)
            </h3>
            <span className="text-xs text-[#F59E0B] font-mono">TANGIBLE ESOTERIC MECHANICS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deskArtifacts.map((art) => {
              const Icon = art.icon;
              return (
                <motion.div
                  key={art.id}
                  whileHover={{ y: -4, borderColor: "#F59E0B" }}
                  onClick={() => {
                    setActiveArtifact(art);
                    setSpringTension(t => Math.max(10, t - 10));
                    playAudio('gear', isMuted);
                  }}
                  className="p-6 rounded-2xl bg-[#1F130B]/90 border border-[#D97706]/35 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] group relative overflow-hidden"
                >
                  <div className="flex justify-between items-center text-[10px] text-[#F59E0B] font-mono mb-3">
                    <span className="px-2 py-0.5 rounded bg-[#D97706]/15 border border-[#D97706]/40 flex items-center gap-1">
                      <Icon className="w-3 h-3" /> {art.metaphor}
                    </span>
                    <span className="text-amber-300/70">{art.tensionCost}</span>
                  </div>

                  <h4 className="text-xl font-bold text-[#FFFBEB] group-hover:text-[#F59E0B] transition mb-2">
                    {art.title}
                  </h4>

                  <p className="text-xs text-amber-200/80 font-sans leading-relaxed mb-4">
                    {art.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4 font-mono">
                    {art.tech.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#140D08] text-[#F59E0B] border border-[#D97706]/30">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#F59E0B] font-mono group-hover:underline">
                    <span>EXAMINE ARTIFACT BLUEPRINT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ARTISAN TOOL PEGBOARD */}
        <section className="space-y-6">
          <div className="border-b border-[#D97706]/40 pb-4">
            <h3 className="text-xl font-bold text-[#FFFBEB] flex items-center gap-2">
              <Wrench className="w-5 h-5 text-[#F59E0B]" /> Artisan Pegboard & Hanging Hand Tools
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {pegboardTools.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveTool(t);
                    playAudio('wood', isMuted);
                  }}
                  className="p-4 rounded-xl bg-[#1F130B]/80 border border-[#D97706]/30 flex flex-col items-center text-center gap-2 cursor-pointer hover:border-[#F59E0B] transition"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#D97706]/15 text-[#F59E0B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h5 className="text-xs font-bold text-[#FFFBEB]">{t.name}</h5>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#140D08] text-amber-300/80 font-mono border border-[#D97706]/20">
                    {t.tool}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* WORKSHOP DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#1F130B]/90 border border-[#D97706]/50 shadow-[0_0_40px_rgba(245,158,11,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#FFFBEB]">Commission Hand-Forged Platform</h3>
            <p className="text-xs text-amber-200/80 font-sans">
              Send dispatch directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#D97706]/15 border border-[#F59E0B] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#F59E0B] mx-auto" />
              <p className="font-bold text-[#FFFBEB]">Commission Order Inscribed in Guild Ledger</p>
              <p className="text-xs text-amber-300 font-mono">Prajwal DL will prepare your estimate.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playAudio('flute', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#F59E0B] font-mono mb-1">CLIENT CALLSIGN</label>
                  <input required defaultValue="Master Builder" className="w-full px-4 py-2.5 rounded-xl bg-[#140D08] border border-[#D97706]/40 text-[#FFFBEB] focus:outline-none focus:border-[#F59E0B]" />
                </div>
                <div>
                  <label className="block text-[#F59E0B] font-mono mb-1">TELEGRAM EMAIL</label>
                  <input required type="email" defaultValue="client@guild.space" className="w-full px-4 py-2.5 rounded-xl bg-[#140D08] border border-[#D97706]/40 text-[#FFFBEB] focus:outline-none focus:border-[#F59E0B]" />
                </div>
              </div>
              <div>
                <label className="block text-[#F59E0B] font-mono mb-1">WORKSHOP COMMISSION INQUIRY</label>
                <textarea rows={3} required defaultValue="Requesting bespoke craftsman full-stack architecture with 3D tactile WebGL shaders." className="w-full px-4 py-2.5 rounded-xl bg-[#140D08] border border-[#D97706]/40 text-[#FFFBEB] focus:outline-none focus:border-[#F59E0B]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#F59E0B] text-black font-mono font-bold text-xs hover:bg-[#FBBF24] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT COMMISSION ORDER
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#D97706]/30 flex flex-wrap justify-between items-center text-[11px] text-amber-300/70 font-mono">
            <span>STATION: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#F59E0B] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#F59E0B] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#F59E0B] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* ARTIFACT MODAL */}
      <AnimatePresence>
        {activeArtifact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#1F130B] border-2 border-[#F59E0B] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(245,158,11,0.5)] relative space-y-6">
              <button onClick={() => { setActiveArtifact(null); playAudio('wood', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#D97706]/20 text-[#F59E0B] hover:bg-[#F59E0B] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D97706]/20 text-[#F59E0B] border border-[#D97706]/40">{activeArtifact.metaphor}</span>
                <h3 className="text-2xl font-bold text-[#FFFBEB] font-serif">{activeArtifact.title}</h3>
              </div>
              <p className="text-sm text-amber-200/80 font-sans leading-relaxed">{activeArtifact.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#140D08] border border-[#D97706]/40 text-xs text-[#F59E0B] font-mono">★ HIGHLIGHT: {activeArtifact.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-amber-300/70">CRAFTSMAN TECH TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {activeArtifact.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#2E1A0E] text-[#FFFBEB] border border-[#D97706]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={activeArtifact.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#F59E0B] text-black font-bold font-mono text-xs text-center hover:bg-[#FBBF24] transition flex items-center justify-center gap-1.5">
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

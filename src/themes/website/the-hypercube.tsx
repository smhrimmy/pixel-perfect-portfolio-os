import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes, Rotate3d, Globe, Cpu, Terminal, Sparkles, X, ArrowUpRight, CheckCircle2, Send, Sliders, Layers, Compass, Activity, Radio
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import {
  HIGGSFIELD_MCF_HASH,
  HIGGSFIELD_CLUSTER_UUID,
  HIGGSFIELD_MOTION_PRESETS,
  type HiggsfieldMotionPreset
} from "@/integrations/higgsfield";

function playAudio(type: 'radar' | 'chime' | 'pulse' | 'click' | 'warp', isMuted: boolean) {
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

    if (type === 'radar') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(980, now);
      osc.frequency.exponentialRampToValueAtTime(1960, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.50, now + 0.24);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'pulse') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(60, now + 0.25);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch {}
}

export default function TheHypercubeTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Navigating 4D spatial tesseract dimensions, sub-atomic WebGL geometries, and resilient cloud architectures with zero latency.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Procedural Heightfield Canvas Engine for The 4D Hypercube
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

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    window.addEventListener('mousemove', handlePointerMove);

    const render = () => {
      time += 0.015;
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.46;
      const cols = 32;
      const rows = 20;
      const spacingX = Math.min(canvas.width / cols * 1.4, 38);
      const spacingY = spacingX * 0.55;

      const mouseNormX = (cursorPos.x - cx) / canvas.width;
      const mouseNormY = (cursorPos.y - cy) / canvas.height;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const offsetX = (c - cols / 2) * spacingX;
          const offsetY = (r - rows / 2) * spacingY;
          const distToMouse = Math.sqrt(
            Math.pow(offsetX - mouseNormX * 280, 2) + Math.pow(offsetY - mouseNormY * 180, 2)
          );

          const wave1 = Math.sin(c * 0.3 + time * 1.5) * 18;
          const wave2 = Math.cos(r * 0.35 - time * 1.2) * 14;
          const ripple = Math.sin(Math.sqrt(offsetX * offsetX + offsetY * offsetY) * 0.035 - time * 2) * 10;
          const mouseWarp = Math.exp(-distToMouse / 95) * 40;
          const elevation = (wave1 + wave2 + ripple + mouseWarp) * 1.4;

          const isoX = cx + (offsetX - offsetY * 0.75);
          const isoY = cy + (offsetX * 0.3 + offsetY * 0.6) - elevation;

          if (c === 0) ctx.moveTo(isoX, isoY);
          else ctx.lineTo(isoX, isoY);
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [cursorPos]);

  // Projects Matrix
  const projects = [
    {
      id: "proj-1",
      badge: "FLAGSHIP 3D",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
    },
    {
      id: "proj-2",
      badge: "CLOUD PROBES",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
    },
    {
      id: "proj-3",
      badge: "WEB PLATFORM",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      highlight: "High-throughput frontend with clean microservice integration",
    },
    {
      id: "proj-4",
      badge: "ENTERPRISE",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      highlight: "Custom client portals tailored for high-conversion performance",
    },
  ];

  // Career Timeline
  const careerTimeline = [
    {
      period: "2025 — PRESENT",
      role: "Web Advisor & Technical Operations",
      company: "Unifycx · Mangalore, Karnataka",
      desc: "Assisting global clients with website migrations, SSL installations, DNS troubleshooting, and hosting control panel architectures.",
    },
    {
      period: "2024 — 2025",
      role: "Full Stack Web Developer & Designer",
      company: "Freelance Practice · Remote / Mangalore",
      desc: "Designed and developed custom web applications using modern React, TypeScript, and PHP/MySQL pipelines based on client specifications.",
    },
    {
      period: "2024",
      role: "Junior Support Engineer",
      company: "GlowTouch Technologies · Mangalore",
      desc: "Provided live chat support for hosting, domain, and server migrations. Troubleshot WordPress, MySQL, PHP, and DNS infrastructure.",
    },
    {
      period: "2023 — 2024",
      role: "Web Developer Intern",
      company: "Vitvara Technologies",
      desc: "Developed modern responsive React interfaces and integrated RESTful endpoints across diverse client web applications.",
    },
    {
      period: "2021 — 2024",
      role: "Diploma in Full Stack Development",
      company: "Karnataka (Govt) Polytechnic, Mangalore",
      desc: "Comprehensive foundation in computer science, software architecture, data structures, and full-stack engineering.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-[#F3E8FF] font-mono relative overflow-x-hidden selection:bg-[#A855F7] selection:text-black">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,0,20,0.85)_80%)]" />

      {/* TOP HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0A0520]/90 border-b border-[#A855F7]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#A855F7]/15 border border-[#A855F7] text-[#C084FC] flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center gap-2 text-[#FAF5FF]">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#A855F7]/15 text-[#C084FC] border border-[#A855F7]/40 font-mono">
                HIGGSFIELD AI MCF
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-mono">
              HASH: <span className="text-[#C084FC]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · CLUSTER: <span className="text-purple-300">{HIGGSFIELD_CLUSTER_UUID.slice(0, 8)}...</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setIsMuted(!isMuted);
            playAudio('chime', !isMuted);
          }}
          className="w-9 h-9 rounded-xl bg-[#120A30] border border-[#A855F7]/30 text-[#C084FC] flex items-center justify-center hover:bg-[#A855F7] hover:text-black transition cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </header>

      {/* MAIN STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        {/* HERO */}
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A855F7]/15 border border-[#A855F7]/40 text-[#C084FC] text-xs font-mono"
          >
            <Boxes className="w-3.5 h-3.5" /> 4D QUANTUM TESSERACT · HIGGSFIELD AI MCF
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-bold tracking-tight uppercase text-[#FAF5FF] drop-shadow-[0_2px_30px_rgba(168,85,247,0.4)]"
          >
            Spatial 4D <span class="text-[#C084FC]">Dimension</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-purple-200/80 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            {bio}
          </motion.p>
        </section>

        {/* PROJECTS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#A855F7]/30 pb-4">
            <h3 className="text-xl font-bold text-[#FAF5FF] flex items-center gap-2">
              <Boxes className="w-5 h-5 text-[#C084FC]" /> Featured Projects & Systems
            </h3>
            <span className="text-xs text-[#C084FC] font-mono">CLICK TO INSPECT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, borderColor: "#A855F7" }}
                onClick={() => {
                  setSelectedNode(item);
                  playAudio('radar', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#0A0520]/90 border border-[#A855F7]/25 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#C084FC] font-mono mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#A855F7]/15 border border-[#A855F7]/40">{item.badge}</span>
                </div>

                <h4 className="text-xl font-bold text-[#FAF5FF] group-hover:text-[#C084FC] transition mb-2">
                  {item.title}
                </h4>

                <p className="text-xs text-purple-200/70 font-sans leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 font-mono">
                  {item.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#030014] text-[#C084FC] border border-[#A855F7]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#C084FC] font-mono group-hover:underline">
                  <span>SURVEY SYSTEM NODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="space-y-6">
          <div className="border-b border-[#A855F7]/30 pb-4">
            <h3 className="text-xl font-bold text-[#FAF5FF] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C084FC]" /> Career Journey & Telemetry
            </h3>
          </div>

          <div className="space-y-4">
            {careerTimeline.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0A0520]/90 border border-[#A855F7]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm">
                <div className="space-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#A855F7]/15 text-[#C084FC] font-mono border border-[#A855F7]/40">
                    {item.period}
                  </span>
                  <h4 className="text-base font-bold text-[#FAF5FF]">{item.role}</h4>
                  <p className="text-xs text-purple-300 font-sans">{item.company}</p>
                  <p className="text-xs text-purple-200/70 font-sans">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#0A0520]/90 border border-[#A855F7]/40 shadow-[0_0_40px_rgba(168,85,247,0.4)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#FAF5FF]">Transmit Encrypted Dispatch</h3>
            <p className="text-xs text-purple-200/70 font-sans">
              Send dispatch directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#A855F7]/15 border border-[#A855F7]/40 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#C084FC] mx-auto" />
              <p className="font-bold text-[#FAF5FF]">Dispatch Inscribed in System Grid</p>
              <p className="text-xs text-[#C084FC] font-mono">Prajwal DL will respond promptly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playAudio('chime', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C084FC] font-mono mb-1">OPERATOR CALLSIGN</label>
                  <input required defaultValue="System Engineer" className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-[#A855F7]/30 text-[#FAF5FF] focus:outline-none focus:border-[#A855F7]" />
                </div>
                <div>
                  <label className="block text-[#C084FC] font-mono mb-1">CORRESPONDENCE EMAIL</label>
                  <input required type="email" defaultValue="operator@telemetry.space" className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-[#A855F7]/30 text-[#FAF5FF] focus:outline-none focus:border-[#A855F7]" />
                </div>
              </div>
              <div>
                <label className="block text-[#C084FC] font-mono mb-1">DISPATCH INQUIRY</label>
                <textarea rows={3} required defaultValue="Requesting full-stack architecture design with real-time 3D WebGL interfaces." className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-[#A855F7]/30 text-[#FAF5FF] focus:outline-none focus:border-[#A855F7]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#A855F7] text-black font-mono font-bold text-xs hover:bg-[#C084FC] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT DISPATCH
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#A855F7]/30 flex flex-wrap justify-between items-center text-[11px] text-slate-400 font-mono">
            <span>LOCATION: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* NODE MODAL */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0A0520] border-2 border-[#A855F7] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(168,85,247,0.4)] relative space-y-6">
              <button onClick={() => { setSelectedNode(null); playAudio('click', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#A855F7]/15 text-[#C084FC] hover:bg-[#A855F7] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#A855F7]/15 text-[#C084FC] border border-[#A855F7]/40">{selectedNode.badge}</span>
                <h3 className="text-2xl font-bold text-[#FAF5FF] font-serif">{selectedNode.title}</h3>
              </div>
              <p className="text-sm text-purple-200/70 font-sans leading-relaxed">{selectedNode.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#030014] border border-[#A855F7]/20 text-xs text-[#C084FC] font-mono">★ HIGHLIGHT: {selectedNode.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-slate-400">TECH TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#030014] text-[#FAF5FF] border border-[#A855F7]/20">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedNode.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#A855F7] text-black font-bold font-mono text-xs text-center hover:bg-[#C084FC] transition flex items-center justify-center gap-1.5">
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

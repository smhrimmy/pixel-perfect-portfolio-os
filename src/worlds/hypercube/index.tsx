import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes, Sparkles, X, ArrowUpRight, CheckCircle2, Send, Rotate3d,
  Cpu, Terminal, Radio, Activity, Compass, Layers, Shield
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { HIGGSFIELD_MCF_HASH, HIGGSFIELD_CLUSTER_UUID } from "@/integrations/higgsfield";

function playHyperAudio(type: 'warp' | 'pulse' | 'quantum', isMuted: boolean) {
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

    if (type === 'warp') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.35);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'quantum') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.50, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function TheHypercubeTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "4D Quantum Dimensional Engineer structuring Euclidean hypercube manifolds, sub-atomic WebGL shaders, and high-density telemetry pipelines.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = "https://praxel.space/";
  const github = profile?.github || "https://github.com/smhrimmy";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedDimension, setSelectedDimension] = useState<any | null>(null);
  const [wSliceDepth, setWSliceDepth] = useState<number>(1.0);
  const [rotationPlane, setRotationPlane] = useState<'XW' | 'YW' | 'ZW'>('XW');
  const [formSent, setFormSent] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 4D Tesseract Geometry Engine (16 Vertices, 32 Edges projected to 2D)
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

    // 16 vertices of a 4D hypercube in 4-space (±1, ±1, ±1, ±1)
    const baseVertices4D: number[][] = [];
    for (let i = 0; i < 16; i++) {
      baseVertices4D.push([
        (i & 1 ? 1 : -1) * 120,
        (i & 2 ? 1 : -1) * 120,
        (i & 4 ? 1 : -1) * 120,
        (i & 8 ? 1 : -1) * 120 * wSliceDepth,
      ]);
    }

    // 32 edges connecting vertices that differ by exactly 1 bit
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
          edges.push([i, j]);
        }
      }
    }

    const render = () => {
      angle += 0.015;
      ctx.fillStyle = '#030014'; // Quantum Void
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.44;

      // Rotate in selected 4D plane (e.g. XW, YW, ZW)
      const projected2D: { x: number; y: number; w: number }[] = [];

      for (let i = 0; i < 16; i++) {
        let [x, y, z, w] = baseVertices4D[i];

        // 4D Rotation matrix
        if (rotationPlane === 'XW') {
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const nx = x * cos - w * sin;
          const nw = x * sin + w * cos;
          x = nx;
          w = nw;
        } else if (rotationPlane === 'YW') {
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const ny = y * cos - w * sin;
          const nw = y * sin + w * cos;
          y = ny;
          w = nw;
        } else {
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const nz = z * cos - w * sin;
          const nw = z * sin + w * cos;
          z = nz;
          w = nw;
        }

        // Standard 3D rotation in XY
        const rotY = y * Math.cos(angle * 0.7) - z * Math.sin(angle * 0.7);
        const rotZ = y * Math.sin(angle * 0.7) + z * Math.cos(angle * 0.7);

        // 4D to 3D perspective projection
        const distance4D = 280;
        const wFactor = 1 / (distance4D - w * 0.5);
        const projX = cx + x * wFactor * 320;
        const projY = cy + rotY * wFactor * 320;

        projected2D.push({ x: projX, y: projY, w });
      }

      // Draw 32 4D Tesseract Edges
      edges.forEach(([i, j]) => {
        const p1 = projected2D[i];
        const p2 = projected2D[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        const avgW = (p1.w + p2.w) / 2;
        const alpha = Math.max(0.15, Math.min(0.9, (avgW + 150) / 300));
        ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
        ctx.lineWidth = alpha > 0.6 ? 2 : 1;
        ctx.stroke();
      });

      // Draw 16 4D Vertices
      projected2D.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#C084FC';
        ctx.shadowColor = '#C084FC';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [wSliceDepth, rotationPlane]);

  // 4D Dimensional Hyper-Nodes (Projects)
  const hyperNodes = [
    {
      id: "hyper-1",
      sector: "4D MANIFOLD A · TESSERACT ALPHA",
      title: "Portfolio OS Spatial Matrix",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP benchmark.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: website,
      quantumCoordinate: "⟨1, 0, 1, 1⟩ 4-Vector",
      highlight: "Higgsfield AI MCF & 4D Tesseract Dimension with zero latency",
    },
    {
      id: "hyper-2",
      sector: "4D MANIFOLD B · CLOUD TENSOR",
      title: "Praxel Space Cloud Platform",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      quantumCoordinate: "⟨0, 1, 1, 0⟩ 4-Vector",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
    },
    {
      id: "hyper-3",
      sector: "4D MANIFOLD C · EUCLIDEAN RIDGE",
      title: "Vitvara Application Ridge",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: website,
      quantumCoordinate: "⟨1, 1, 0, 1⟩ 4-Vector",
      highlight: "High-throughput frontend with clean microservice integration",
    },
    {
      id: "hyper-4",
      sector: "4D MANIFOLD D · QUANTUM BASIN",
      title: "Bespoke Enterprise Basins",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: website,
      quantumCoordinate: "⟨0, 0, 1, 1⟩ 4-Vector",
      highlight: "Custom client portals tailored for high-conversion performance",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-[#F3E8FF] font-mono relative selection:bg-[#A855F7] selection:text-black overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,0,20,0.85)_80%)]" />

      {/* TOP 4D HUD */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0A0520]/90 border-b border-[#A855F7]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#A855F7]/15 border border-[#A855F7] text-[#C084FC] flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Boxes className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-[#FAF5FF] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#A855F7]/15 text-[#C084FC] border border-[#A855F7]/40 font-mono">
                HIGGSFIELD 4D TESSERACT
              </span>
            </h1>
            <p className="text-[10px] text-purple-300/70 font-mono">
              HASH: <span className="text-[#C084FC]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · CLUSTER: <span className="text-purple-200">{HIGGSFIELD_CLUSTER_UUID.slice(0, 8)}...</span>
            </p>
          </div>
        </div>

        {/* 4D PLANE SWITCHER & DEPTH SLICER */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-[#120A30] border border-[#A855F7]/30 px-3 py-1.5 rounded-xl text-xs text-[#C084FC]">
            <Rotate3d className="w-3.5 h-3.5" />
            <span>PLANE:</span>
            {(['XW', 'YW', 'ZW'] as const).map((p) => (
              <button
                key={p}
                onClick={() => {
                  setRotationPlane(p);
                  playHyperAudio('warp', isMuted);
                }}
                className={`px-2 py-0.5 rounded transition ${
                  rotationPlane === p ? 'bg-[#A855F7] text-black font-bold' : 'hover:bg-[#A855F7]/20 text-purple-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playHyperAudio('quantum', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#120A30] border border-[#A855F7]/30 text-[#C084FC] flex items-center justify-center hover:bg-[#A855F7] hover:text-black transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A855F7]/15 border border-[#A855F7]/40 text-[#C084FC] text-xs font-mono"
          >
            <Boxes className="w-3.5 h-3.5" /> 4D EUCLIDEAN MANIFOLD · 16-VERTEX TESSERACT PROJECTION
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight uppercase text-[#FAF5FF] drop-shadow-[0_2px_30px_rgba(168,85,247,0.4)]"
          >
            Spatial 4D <span className="text-[#C084FC]">Dimension</span>
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

        {/* HYPER-NODES (PROJECTS) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#A855F7]/30 pb-4">
            <h3 className="text-xl font-bold text-[#FAF5FF] flex items-center gap-2">
              <Boxes className="w-5 h-5 text-[#C084FC]" /> 4D Dimensional Tensor Manifolds
            </h3>
            <span className="text-xs text-[#C084FC] font-mono">PROJECT 4-VECTOR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hyperNodes.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, borderColor: "#A855F7" }}
                onClick={() => {
                  setSelectedDimension(item);
                  playHyperAudio('warp', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#0A0520]/90 border border-[#A855F7]/25 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#C084FC] font-mono mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#A855F7]/15 border border-[#A855F7]/30">{item.sector}</span>
                  <span className="text-purple-300/70">{item.quantumCoordinate}</span>
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
                  <span>EXPAND 4D HYPER-VECTOR</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4D QUANTUM DISPATCH */}
        <section className="p-8 rounded-3xl bg-[#0A0520]/90 border border-[#A855F7]/40 shadow-[0_0_40px_rgba(168,85,247,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#FAF5FF]">Transmit Quantum 4D Uplink</h3>
            <p className="text-xs text-purple-200/80 font-sans">
              Send encrypted quantum packet directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#A855F7]/15 border border-[#A855F7] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#C084FC] mx-auto" />
              <p className="font-bold text-[#FAF5FF]">Quantum 4-Vector Entangled in Tesseract Buffer</p>
              <p className="text-xs text-purple-300 font-mono">Prajwal DL will decode your dimensional coordinates.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playHyperAudio('quantum', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C084FC] font-mono mb-1">OPERATOR 4-VECTOR</label>
                  <input required defaultValue="Hyper-Architect" className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-[#A855F7]/30 text-[#FAF5FF] focus:outline-none focus:border-[#A855F7]" />
                </div>
                <div>
                  <label className="block text-[#C084FC] font-mono mb-1">QUANTUM FREQUENCY</label>
                  <input required type="email" defaultValue="operator@tesseract.space" className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-[#A855F7]/30 text-[#FAF5FF] focus:outline-none focus:border-[#A855F7]" />
                </div>
              </div>
              <div>
                <label className="block text-[#C084FC] font-mono mb-1">4D TRANSMISSION PAYLOAD</label>
                <textarea rows={3} required defaultValue="Requesting full-stack architecture design with real-time 4D WebGL tesseract geometries." className="w-full px-4 py-2.5 rounded-xl bg-[#030014] border border-[#A855F7]/30 text-[#FAF5FF] focus:outline-none focus:border-[#A855F7]" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#A855F7] text-black font-mono font-bold text-xs hover:bg-[#C084FC] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <Send className="w-4 h-4" /> TRANSMIT 4D UPLINK
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#A855F7]/30 flex flex-wrap justify-between items-center text-[11px] text-purple-300/70 font-mono">
            <span>DIMENSION: 12.91°N, 74.85°E · MANGALORE, INDIA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">LINKEDIN</a>
              <a href={website} target="_blank" rel="noreferrer" className="text-[#C084FC] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* DIMENSION MODAL */}
      <AnimatePresence>
        {selectedDimension && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0A0520] border-2 border-[#A855F7] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(168,85,247,0.5)] relative space-y-6">
              <button onClick={() => { setSelectedDimension(null); playHyperAudio('pulse', isMuted); }} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#A855F7]/15 text-[#C084FC] hover:bg-[#A855F7] hover:text-black flex items-center justify-center transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-1 font-mono">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#A855F7]/15 text-[#C084FC] border border-[#A855F7]/30">{selectedDimension.sector}</span>
                <h3 className="text-2xl font-bold text-[#FAF5FF] font-serif">{selectedDimension.title}</h3>
              </div>
              <p className="text-sm text-purple-200/70 font-sans leading-relaxed">{selectedDimension.desc}</p>
              <div className="p-3.5 rounded-xl bg-[#030014] border border-[#A855F7]/30 text-xs text-[#C084FC] font-mono">★ HIGHLIGHT: {selectedDimension.highlight}</div>
              <div className="space-y-2 font-mono">
                <span className="text-xs text-purple-300/70">4D TENSOR TECH TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedDimension.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#120A30] text-[#FAF5FF] border border-[#A855F7]/30">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <a href={selectedDimension.liveUrl} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-[#A855F7] text-black font-bold font-mono text-xs text-center hover:bg-[#C084FC] transition flex items-center justify-center gap-1.5">
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

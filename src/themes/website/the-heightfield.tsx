import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mountain,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Activity,
  Layers,
  Sliders,
  Video,
  Play,
  Pause,
  Compass,
  Zap,
  Camera,
  RotateCw,
  Eye,
  Film,
  User,
  Radio,
  Cpu,
  RefreshCw,
  Maximize2
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import {
  HIGGSFIELD_MCF_HASH,
  HIGGSFIELD_CLUSTER_UUID,
  HIGGSFIELD_MOTION_PRESETS,
  HIGGSFIELD_STYLE_PRESETS,
  HIGGSFIELD_CHARACTERS,
  higgsfieldClient,
  type HiggsfieldMotionPreset,
  type HiggsfieldJobStatus
} from "@/integrations/higgsfield";

// Synthesized Web Audio Sound Engine
function playHeightfieldAudio(type: 'radar' | 'chime' | 'pulse' | 'laser' | 'shutter' | 'warp', isMuted: boolean) {
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
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'shutter') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'warp') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'chime') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.50, now + 0.24);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'pulse') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(55, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {}
}

export default function TheHeightfieldTheme({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Developer & Systems Architect shaping high-density 3D WebGL heightfields, automated cloud telemetry, and sub-100ms resilient platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const liveUrl = "https://praxel.space/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [elevationAmplitude, setElevationAmplitude] = useState<number>(1.2);
  const [meshDensity, setMeshDensity] = useState<number>(36);
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);
  const [formSent, setFormSent] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Higgsfield AI MCP State
  const [selectedMotion, setSelectedMotion] = useState<HiggsfieldMotionPreset>(HIGGSFIELD_MOTION_PRESETS[0]);
  const [isDoPActive, setIsDoPActive] = useState<boolean>(true);
  const [promptText, setPromptText] = useState<string>("Cinematic 3D topographical terrain of Mangalore tech hub with teal neon contour isolines");
  const [generationJob, setGenerationJob] = useState<HiggsfieldJobStatus | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showDoPStudio, setShowDoPStudio] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Procedural Heightfield & DoP Camera Motion Engine
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
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    window.addEventListener('mousemove', handlePointerMove);

    const render = () => {
      time += 0.015;
      ctx.fillStyle = '#030712'; // Obsidian Void
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Camera center with DoP motion offset
      let dopOffsetX = 0;
      let dopOffsetY = 0;
      let dopTilt = 0;

      if (isDoPActive && selectedMotion) {
        const speed = selectedMotion.motionStrength;
        if (selectedMotion.name.includes("Orbital")) {
          dopOffsetX = Math.sin(time * speed) * 80;
          dopOffsetY = Math.cos(time * speed) * 35;
          dopTilt = Math.sin(time * speed * 0.5) * 8;
        } else if (selectedMotion.name.includes("Flythrough")) {
          dopOffsetY = (Math.sin(time * speed * 2) * 40);
          dopTilt = Math.cos(time * speed) * 12;
        } else if (selectedMotion.name.includes("Dolly")) {
          dopOffsetX = Math.sin(time * speed * 1.5) * 20;
          dopOffsetY = Math.cos(time * speed * 1.5) * 20;
        } else if (selectedMotion.name.includes("Scanner")) {
          dopOffsetX = ((time * 60 * speed) % canvas.width) - canvas.width / 2;
        } else if (selectedMotion.name.includes("Shockwave")) {
          dopTilt = Math.sin(time * 6) * 14;
        }
      }

      const cx = (canvas.width / 2) + dopOffsetX;
      const cy = (canvas.height * 0.46) + dopOffsetY;

      const cols = meshDensity;
      const rows = Math.floor(meshDensity * 0.7);
      const spacingX = Math.min(canvas.width / cols * 1.5, 38);
      const spacingY = spacingX * 0.55;

      const mouseNormX = (cursorPos.x - cx) / canvas.width;
      const mouseNormY = (cursorPos.y - cy) / canvas.height;

      // 3D Heightfield Isometric Projection Grid
      const gridPoints: { x: number; y: number; z: number; elev: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        gridPoints[r] = [];
        for (let c = 0; c < cols; c++) {
          const offsetX = (c - cols / 2) * spacingX;
          const offsetY = (r - rows / 2) * spacingY;

          const distToCenter = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
          const distToMouse = Math.sqrt(
            Math.pow(offsetX - mouseNormX * 300, 2) +
            Math.pow(offsetY - mouseNormY * 200, 2)
          );

          const wave1 = Math.sin(c * 0.28 + time * 1.8) * 22;
          const wave2 = Math.cos(r * 0.35 - time * 1.4) * 18;
          const ripple = Math.sin(distToCenter * 0.03 - time * 2.5) * 14;
          const mouseWarp = Math.exp(-distToMouse / 90) * 45;

          const elevation = (wave1 + wave2 + ripple + mouseWarp) * elevationAmplitude;

          // 3D Isometric Projection Tilt with DoP Dynamic Angle
          const isoX = cx + (offsetX - offsetY * 0.8) + (dopTilt * 2);
          const isoY = cy + (offsetX * 0.3 + offsetY * 0.6) - elevation + dopTilt;

          gridPoints[r][c] = { x: isoX, y: isoY, z: elevation, elev: elevation };
        }
      }

      // Render 3D Heightfield Polygons & Contour Lines
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = gridPoints[r][c];
          const p2 = gridPoints[r][c + 1];
          const p3 = gridPoints[r + 1][c + 1];
          const p4 = gridPoints[r + 1][c];

          const avgElev = (p1.elev + p2.elev + p3.elev + p4.elev) / 4;
          const normalizedElev = Math.max(0, Math.min(1, (avgElev + 30) / 70));

          if (!wireframeOnly) {
            // Topographical Elevation Gradient Fill
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();

            const hue = 160 + normalizedElev * 80; // Emerald (#00F5D4) to Cyan & Indigo
            ctx.fillStyle = `hsla(${hue}, 90%, ${15 + normalizedElev * 30}%, ${0.15 + normalizedElev * 0.35})`;
            ctx.fill();
          }

          // Wireframe & Contour Stroke
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();

          ctx.strokeStyle = `hsla(170, 100%, 65%, ${0.12 + normalizedElev * 0.45})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [elevationAmplitude, meshDensity, wireframeOnly, cursorPos, isDoPActive, selectedMotion]);

  // Elevation Peak Nodes (Projects)
  const elevationNodes = [
    {
      id: "topo-1",
      sector: "SECTOR A / PEAK 2840M",
      title: "Portfolio OS Spatial Matrix",
      elevation: "+2840m Elevation",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, real-time 3D heightfield vertex deformation, and sub-100ms LCP.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: liveUrl,
      highlight: "4D Tesseract & Dynamic Heightfield Terrain with zero latency",
    },
    {
      id: "topo-2",
      sector: "SECTOR B / PEAK 2410M",
      title: "Praxel Space Cloud Probes",
      elevation: "+2410m Elevation",
      desc: "Automated DNS management platform with real-time SSL provisioning, domain health probes, and cloud infrastructure telemetry.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
      highlight: "Automated zero-downtime certificate renewal and DNS diagnostics",
    },
    {
      id: "topo-3",
      sector: "SECTOR C / PEAK 1950M",
      title: "Vitvara Application Ridge",
      elevation: "+1950m Elevation",
      desc: "Engineered scalable, user-centric web applications with modern state architecture, robust accessibility, and secure API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: liveUrl,
      highlight: "High-throughput frontend with clean microservice integration",
    },
    {
      id: "topo-4",
      sector: "SECTOR D / PEAK 1620M",
      title: "Bespoke Enterprise Basins",
      elevation: "+1620m Elevation",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: liveUrl,
      highlight: "Custom client portals tailored for high-conversion performance",
    },
  ];

  // Geological Stratigraphy (Career Timeline)
  const geologicalLayers = [
    {
      strata: "STRATA IV · 2025 — PRESENT",
      role: "Web Advisor & Technical Operations",
      entity: "Unifycx · Mangalore, Karnataka",
      desc: "Assisting global clients with website migrations, SSL installations, DNS troubleshooting, and hosting control panel architectures.",
    },
    {
      strata: "STRATA III · 2024 — 2025",
      role: "Full Stack Web Developer & Designer",
      entity: "Freelance Practice · Remote / Mangalore",
      desc: "Designed and developed custom web applications using modern React, TypeScript, and PHP/MySQL pipelines based on client specifications.",
    },
    {
      strata: "STRATA II · 2024",
      role: "Junior Support Engineer",
      entity: "GlowTouch Technologies · Mangalore",
      desc: "Provided live chat support for hosting, domain, and server migrations. Troubleshot WordPress, MySQL, PHP, and DNS infrastructure.",
    },
    {
      strata: "STRATA I · 2023 — 2024",
      role: "Web Developer Intern",
      entity: "Vitvara Technologies",
      desc: "Developed modern responsive React interfaces and integrated RESTful endpoints across diverse client web applications.",
    },
    {
      strata: "BEDROCK · 2021 — 2024",
      role: "Diploma in Full Stack Development",
      entity: "Karnataka (Govt) Polytechnic, Mangalore",
      desc: "Comprehensive foundation in computer science, software architecture, data structures, and full-stack engineering.",
    },
  ];

  // Trigger Higgsfield AI Generation Simulation
  const handleGenerate = async () => {
    setIsGenerating(true);
    playHeightfieldAudio('shutter', isMuted);
    try {
      const result = await higgsfieldClient.generateSimulation({
        prompt: promptText,
        motionPresetId: selectedMotion.id,
        quality: 'standard',
      });
      setGenerationJob(result);
      playHeightfieldAudio('chime', isMuted);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F3F4F6] font-mono relative selection:bg-[#00F5D4] selection:text-black overflow-x-hidden">
      {/* 3D Heightfield Topographical Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Topographical Grid Isolines Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.7)_80%)]" />

      {/* TOP HUD: Heightfield MCF & Higgsfield AI Telemetry Header */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#080E1E]/90 border-b border-[#00F5D4]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F5D4]/15 border border-[#00F5D4] text-[#00F5D4] flex items-center justify-center shadow-[0_0_15px_rgba(0,245,212,0.4)]">
            <Mountain className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/40 font-mono">
                HIGGSFIELD AI MCF
              </span>
            </h1>
            <p className="text-[10px] text-slate-400">
              HASH: <span className="text-[#00F5D4]">{HIGGSFIELD_MCF_HASH.slice(0, 10)}...</span> · CLUSTER: <span className="text-cyan-300">{HIGGSFIELD_CLUSTER_UUID.slice(0, 8)}...</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* DoP Motion Mode Button */}
          <button
            onClick={() => {
              setShowDoPStudio(!showDoPStudio);
              playHeightfieldAudio('radar', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#00F5D4]/20 border border-[#00F5D4] text-[#00F5D4] text-xs hover:bg-[#00F5D4] hover:text-black transition flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(0,245,212,0.3)]"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DoP MOTION STUDIO</span>
          </button>

          {/* Heightfield Amplitude Controls */}
          <div className="hidden lg:flex items-center gap-2 bg-[#0C152B] border border-[#00F5D4]/30 px-3 py-1.5 rounded-xl text-xs text-[#00F5D4]">
            <Sliders className="w-3.5 h-3.5" />
            <span>AMP: {elevationAmplitude.toFixed(1)}x</span>
            <button
              onClick={() => {
                setElevationAmplitude(a => +(Math.min(2.5, a + 0.3)).toFixed(1));
                playHeightfieldAudio('radar', isMuted);
              }}
              className="px-1.5 py-0.5 rounded bg-[#00F5D4]/20 hover:bg-[#00F5D4] hover:text-black transition"
            >
              +
            </button>
            <button
              onClick={() => {
                setElevationAmplitude(a => +(Math.max(0.4, a - 0.3)).toFixed(1));
                playHeightfieldAudio('radar', isMuted);
              }}
              className="px-1.5 py-0.5 rounded bg-[#00F5D4]/20 hover:bg-[#00F5D4] hover:text-black transition"
            >
              -
            </button>
          </div>

          <button
            onClick={() => {
              setWireframeOnly(!wireframeOnly);
              playHeightfieldAudio('laser', isMuted);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#0C152B] border border-[#00F5D4]/30 text-[#00F5D4] text-xs hover:border-[#00F5D4] transition flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" /> {wireframeOnly ? "SOLID" : "WIREFRAME"}
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playHeightfieldAudio('chime', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#0C152B] border border-[#00F5D4]/40 text-[#00F5D4] flex items-center justify-center hover:bg-[#00F5D4] hover:text-black transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#00F5D4]" />}
          </button>
        </div>
      </header>

      {/* HIGGSFIELD AI DoP MOTION STUDIO DRAWER */}
      <AnimatePresence>
        {showDoPStudio && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 inset-x-4 sm:inset-x-8 z-35 max-w-4xl mx-auto bg-[#080E1E]/95 border-2 border-[#00F5D4] rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,245,212,0.35)] backdrop-blur-xl space-y-6"
          >
            <div className="flex justify-between items-center border-b border-[#00F5D4]/30 pb-3">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-[#00F5D4]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Higgsfield AI Director of Photography (DoP) Studio
                </h3>
              </div>
              <button
                onClick={() => setShowDoPStudio(false)}
                className="w-7 h-7 rounded-full bg-[#00F5D4]/10 text-[#00F5D4] flex items-center justify-center hover:bg-[#00F5D4] hover:text-black transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Motion Presets Grid */}
            <div className="space-y-2">
              <label className="text-[11px] text-[#00F5D4] font-bold">CINEMATIC MOTION PRESETS (HIGGSFIELD MCP)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {HIGGSFIELD_MOTION_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedMotion(preset);
                      playHeightfieldAudio('warp', isMuted);
                    }}
                    className={`p-3 rounded-xl border text-left transition text-xs space-y-1 ${
                      selectedMotion.id === preset.id
                        ? 'bg-[#00F5D4]/15 border-[#00F5D4] text-white shadow-[0_0_12px_rgba(0,245,212,0.4)]'
                        : 'bg-[#030712] border-[#00F5D4]/20 text-slate-400 hover:border-[#00F5D4]/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#00F5D4]">{preset.name}</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#080E1E] text-slate-300">
                        {preset.durationSeconds}s
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-sans leading-tight line-clamp-2">
                      {preset.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Prompt Simulation Input */}
            <div className="space-y-2">
              <label className="text-[11px] text-[#00F5D4] font-bold">PROMPT SIMULATION (SOUL IMAGE + DoP VIDEO)</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#030712] border border-[#00F5D4]/30 text-white text-xs focus:outline-none focus:border-[#00F5D4]"
                  placeholder="Describe your scene or camera movement..."
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-5 py-2.5 rounded-xl bg-[#00F5D4] text-black font-bold text-xs hover:bg-[#5EEAD4] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,245,212,0.4)] disabled:opacity-50"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>{isGenerating ? "GENERATING..." : "SYNTHESIZE"}</span>
                </button>
              </div>
            </div>

            {/* Telemetry Output */}
            {generationJob && (
              <div className="p-3.5 rounded-2xl bg-[#030712] border border-[#00F5D4]/30 text-xs flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F5D4]" />
                  <span className="text-white font-bold">JOB {generationJob.jobId}</span>
                  <span className="text-slate-400">· STATUS: {generationJob.status.toUpperCase()}</span>
                </div>
                <span className="text-[10px] text-cyan-300">MCF HASH: {generationJob.mcfHash.slice(0, 16)}...</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN HEIGHTFIELD STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-20">
        {/* HERO SECTION */}
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/40 text-[#00F5D4] text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" /> HIGGSFIELD AI MCP · 3D PROCEDURAL HEIGHTFIELD MATRIX
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,245,212,0.45)] uppercase"
          >
            Topographical <span className="text-[#00F5D4]">Precision</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            {bio}
          </motion.p>

          {/* TELEMETRY CHIP BAR */}
          <div className="flex flex-wrap justify-center gap-3 pt-2 text-[11px]">
            <div className="px-3 py-1.5 rounded-xl bg-[#080E1E] border border-[#00F5D4]/30 text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#00F5D4]" /> 12.91°N, 74.85°E (MANGALORE)
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#080E1E] border border-[#00F5D4]/30 text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> SUB-100MS LCP BENCHMARK
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#080E1E] border border-[#00F5D4]/30 text-slate-300 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-cyan-400" /> ACTIVE DoP: {selectedMotion.name.toUpperCase()}
            </div>
          </div>
        </section>

        {/* ELEVATION NODES (PROJECTS) */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-[#00F5D4]/30 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Mountain className="w-5 h-5 text-[#00F5D4]" /> Elevation Peaks & System Nodes
            </h3>
            <span className="text-xs text-[#00F5D4]">CLICK PEAK TO SURVEY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {elevationNodes.map((node) => (
              <motion.div
                key={node.id}
                whileHover={{ y: -4, borderColor: "#00F5D4" }}
                onClick={() => {
                  setSelectedNode(node);
                  playHeightfieldAudio('radar', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#080E1E]/90 border border-[#00F5D4]/30 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.7)] group relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-[10px] text-[#00F5D4] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#00F5D4]/10 border border-[#00F5D4]/30">{node.sector}</span>
                  <span className="text-slate-400">{node.elevation}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-[#00F5D4] transition mb-2">
                  {node.title}
                </h4>

                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                  {node.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {node.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#030712] text-[#00F5D4] border border-[#00F5D4]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#00F5D4] group-hover:underline">
                  <span>SURVEY TOPOGRAPHICAL NODE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* GEOLOGICAL STRATIGRAPHY (CAREER TIMELINE) */}
        <section className="space-y-8">
          <div className="border-b border-[#00F5D4]/30 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#00F5D4]" /> Geological Stratigraphy & Career Strata
            </h3>
          </div>

          <div className="space-y-4">
            {geologicalLayers.map((layer, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#080E1E]/80 border border-[#00F5D4]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-sm"
              >
                <div className="space-y-1">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#00F5D4]/10 text-[#00F5D4] border border-[#00F5D4]/30">
                    {layer.strata}
                  </span>
                  <h4 className="text-base font-bold text-white">{layer.role}</h4>
                  <p className="text-xs text-cyan-300 font-sans">{layer.entity}</p>
                  <p className="text-xs text-slate-400 font-sans">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TOPOGRAPHICAL TELEMETRY DISPATCH (CONTACT) */}
        <section className="p-8 rounded-3xl bg-[#080E1E]/90 border border-[#00F5D4]/40 shadow-[0_0_40px_rgba(0,245,212,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Transmit Topographical Dispatch</h3>
            <p className="text-xs text-slate-300 font-sans">
              Send encrypted telemetry message directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#00F5D4]/10 border border-[#00F5D4] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#00F5D4] mx-auto" />
              <p className="font-bold text-white">Telemetry Packet Inscribed into Heightfield Grid</p>
              <p className="text-xs text-slate-400 font-mono">Prajwal DL will decode your dispatch coordinates.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playHeightfieldAudio('chime', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#00F5D4] font-mono mb-1">OPERATOR CALLSIGN</label>
                  <input
                    required
                    defaultValue="Survey Engineer"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-[#00F5D4]/30 text-white focus:outline-none focus:border-[#00F5D4]"
                  />
                </div>
                <div>
                  <label className="block text-[#00F5D4] font-mono mb-1">TELEMETRY EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="survey@heightfield.space"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-[#00F5D4]/30 text-white focus:outline-none focus:border-[#00F5D4]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#00F5D4] font-mono mb-1">DISPATCH INQUIRY</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design with real-time 3D WebGL heightfield terrain."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-[#00F5D4]/30 text-white focus:outline-none focus:border-[#00F5D4]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00F5D4] text-black font-mono font-bold text-xs hover:bg-[#5EEAD4] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,245,212,0.4)]"
              >
                <Send className="w-4 h-4" /> TRANSMIT TOPOGRAPHICAL DISPATCH
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#00F5D4]/20 flex flex-wrap justify-between items-center text-[11px] text-slate-400 font-mono">
            <span>STATION: MANGALORE, INDIA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#00F5D4] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#00F5D4] hover:underline">LINKEDIN</a>
              <a href={liveUrl} target="_blank" rel="noreferrer" className="text-[#00F5D4] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* NODE MODAL */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#080E1E] border-2 border-[#00F5D4] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(0,245,212,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedNode(null);
                  playHeightfieldAudio('pulse', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#00F5D4]/10 text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#00F5D4]/20 text-[#00F5D4] border border-[#00F5D4]/40">
                  {selectedNode.sector} · {selectedNode.elevation}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedNode.title}</h3>
              </div>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {selectedNode.desc}
              </p>

              <div className="p-3.5 rounded-xl bg-[#030712] border border-[#00F5D4]/30 text-xs text-[#00F5D4]">
                ★ HIGHLIGHT: {selectedNode.highlight}
              </div>

              <div className="space-y-2">
                <span className="text-xs text-slate-400">STRUCTURAL TOKENS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-[#0C152B] text-white border border-[#00F5D4]/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedNode.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#00F5D4] text-black font-bold text-xs text-center hover:bg-[#5EEAD4] transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LIVE TELEMETRY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

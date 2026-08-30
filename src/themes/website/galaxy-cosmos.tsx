import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Eye,
  Crosshair,
  Sparkles,
  ArrowUpRight,
  Send,
  Mail,
  Github,
  Linkedin,
  Twitter,
  X,
  Layers,
  RotateCw,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";

export default function TheObservatory({ data }: ThemeRendererProps) {
  const { profile, projects, experience: rawExperience, socialLinks } = data;
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Charting digital celestial spheres through engineering, WebGL spatial physics, and autonomous systems.";
  const email = profile?.email || "prajwal@praxel.space";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [telescopeTarget, setTelescopeTarget] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dragAngle, setDragAngle] = useState(0);

  // 1800s Brass Geared Orrery Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 480);
    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Concentric Brass Measurement Rings & Engravings
      for (let r of [70, 120, 170, 220]) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 2. Central Polished Brass Sun Gear
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fillStyle = "#D4AF37";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(212, 175, 55, 0.6)";
      ctx.fill();

      // Teeth of central gear
      for (let i = 0; i < 16; i++) {
        const ga = (i / 16) * Math.PI * 2 + t * 0.5 + dragAngle;
        const gx = cx + Math.cos(ga) * 30;
        const gy = cy + Math.sin(ga) * 30;
        ctx.fillStyle = "#AA8010";
        ctx.fillRect(gx - 2, gy - 2, 4, 4);
      }

      // 3. Geared Brass Planetary Arms
      const planets = [
        { r: 70, speed: 1.2, size: 8, color: "#8E7238", label: "RESEARCH" },
        { r: 120, speed: 0.8, size: 12, color: "#CD7F32", label: "WEBGL" },
        { r: 170, speed: 0.5, size: 15, color: "#B8860B", label: "SYSTEMS" },
        { r: 220, speed: 0.3, size: 10, color: "#996515", label: "AI_AGENTS" },
      ];

      planets.forEach((p, idx) => {
        const angle = t * p.speed + dragAngle + idx * 1.5;
        const px = cx + Math.cos(angle) * p.r;
        const py = cy + Math.sin(angle) * p.r;

        // Brass Arm
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Mechanical Pivot Joint
        ctx.beginPath();
        ctx.arc(px, py, p.size + 4, 0, Math.PI * 2);
        ctx.strokeStyle = "#D4AF37";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Planet Sphere
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Latin Engraved Label
        ctx.font = "9px serif";
        ctx.fillStyle = "#E6C687";
        ctx.fillText(p.label, px + p.size + 6, py + 3);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dragAngle]);

  const defaultProjects = [
    {
      id: "1",
      title: "CELESTIAL ORRERY ENGINE",
      category: "Kinetic Simulation",
      tags: ["Three.js", "Brass Shaders", "Physics"],
      desc: "Simulating antique mechanical planetary motion with authentic gear ratios and optical lens refractions.",
    },
    {
      id: "2",
      title: "DEEP SPACE SPECTROMETER",
      category: "Autonomous Systems",
      tags: ["TypeScript", "Distributed Cloud", "Telemetry"],
      desc: "Real-time astronomical data streaming with sub-second spectral frequency analysis.",
    },
    {
      id: "3",
      title: "BRASS & GLASS OPTICAL RUNTIME",
      category: "Spatial Computing",
      tags: ["WebGL", "Raytracing", "Optics"],
      desc: "Authentic chromatic aberration and glass dispersion for heritage scientific instruments.",
    },
  ];

  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <div className="min-h-screen bg-[#070B14] text-[#E8DCC4] font-serif overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">
      {/* 1. VINTAGE OBSERVATORY BANNER */}
      <header className="border-b border-[#D4AF37]/30 bg-[#0A101D]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-[#D4AF37]/10">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-widest text-[#D4AF37] uppercase">THE OBSERVATORY</span>
              <span className="text-[10px] text-[#A69372] block font-mono -mt-0.5">EST. MDCCCXCVI · {candidateName}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-[#A69372]">
            <a href="#orrery" className="hover:text-[#D4AF37] transition">The Orrery</a>
            <a href="#telescope" className="hover:text-[#D4AF37] transition">Telescope View</a>
            <a href="#catalog" className="hover:text-[#D4AF37] transition">Star Catalog</a>
            <a href="#contact" className="hover:text-[#D4AF37] transition">Dispatch</a>
          </div>

          <a href="#contact" className="px-4 py-1.5 rounded-full border border-[#D4AF37] text-xs text-[#D4AF37] hover:bg-[#D4AF37]/10 uppercase font-mono tracking-wider transition">
            Dispatch Telegram
          </a>
        </div>
      </header>

      {/* 2. MAIN OBSERVATORY CHAMBER */}
      <section id="orrery" className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#D4AF37]/40 bg-[#D4AF37]/5 text-xs text-[#D4AF37] font-mono">
            <Crosshair className="h-3.5 w-3.5" />
            <span>BRASS GEARED ORRERY RUNTIME</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal tracking-wide text-[#F3E5C8] leading-tight">
            MAPPING THE CELESTIAL <br />
            <span className="italic text-[#D4AF37]">SYSTEM ARCHITECTURES</span>
          </h1>

          <p className="text-sm sm:text-base text-[#B8A78A] leading-relaxed">
            {bio}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              onClick={() => setDragAngle((a) => a + 0.5)}
              className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 font-serif font-bold text-xs h-11 px-6 shadow-xl"
            >
              <RotateCw className="h-4 w-4 mr-2" /> Rotate Brass Gears
            </Button>
            <a
              href="#telescope"
              className="inline-flex items-center px-6 h-11 rounded border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs uppercase tracking-widest font-mono transition"
            >
              Look Through Lens ↓
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="rounded-full border-4 border-[#D4AF37]/40 p-3 bg-gradient-to-b from-[#0D1527] to-[#050810] shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <canvas ref={canvasRef} className="rounded-full cursor-grab active:cursor-grabbing" />
          </div>
        </div>
      </section>

      {/* 3. WORKING TELESCOPE VIEWPORT */}
      <section id="telescope" className="py-24 px-6 border-t border-[#D4AF37]/20 bg-[#050811]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">HERITAGE INSTRUMENT</span>
            <h2 className="text-3xl sm:text-4xl text-[#F3E5C8]">The Refractor Telescope</h2>
            <p className="text-xs text-[#A69372]">Select a star cluster below to focus the brass telescope and examine the technical dossier.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProjects.map((p: any) => (
              <div
                key={p.id}
                onClick={() => setTelescopeTarget(p)}
                className="p-6 rounded-2xl border border-[#D4AF37]/30 bg-[#0A101E] hover:border-[#D4AF37] transition cursor-pointer space-y-4 group shadow-xl"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                  <span>MAGNITUDE: VII</span>
                  <Eye className="h-4 w-4 group-hover:scale-125 transition-transform" />
                </div>
                <h3 className="text-lg text-[#F3E5C8] font-bold group-hover:text-[#D4AF37] transition">{p.title}</h3>
                <p className="text-xs text-[#A69372] leading-relaxed">{p.desc}</p>
                <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px] text-[#D4AF37]">
                  {(p.tags || ["Optics", "Systems"]).map((t: string) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER DISPATCH */}
      <footer id="contact" className="py-16 px-6 border-t border-[#D4AF37]/20 bg-[#070B14] text-center space-y-6">
        <h3 className="text-2xl text-[#F3E5C8]">Dispatch an Astronomical Inquiry</h3>
        <p className="text-xs text-[#A69372]">Send telegraphic correspondence for software architecture and spatial WebGL consulting.</p>
        <Button asChild className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 font-serif font-bold text-xs h-10 px-8">
          <a href={`mailto:${email}`}>
            <Mail className="h-4 w-4 mr-2" /> Send Dispatch
          </a>
        </Button>
        <div className="text-[10px] font-mono text-[#A69372] pt-8">
          © MDCCCXCVI {candidateName} · THE OBSERVATORY SPECIFICATION
        </div>
      </footer>

      {/* Telescope Magnifier Modal */}
      <AnimatePresence>
        {telescopeTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="max-w-xl w-full rounded-3xl border-2 border-[#D4AF37] bg-[#0A101E] p-8 text-[#E8DCC4] space-y-6 relative shadow-[0_0_60px_rgba(212,175,55,0.3)]">
              <button
                onClick={() => setTelescopeTarget(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center hover:bg-[#D4AF37]/20"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
                <Crosshair className="h-4 w-4" />
                <span>TELESCOPIC FOCAL PLANE · 120X MAGNIFICATION</span>
              </div>

              <h2 className="text-2xl text-[#F3E5C8] font-bold">{telescopeTarget.title}</h2>
              <p className="text-sm text-[#B8A78A] leading-relaxed">{telescopeTarget.desc}</p>

              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#050811] font-mono text-xs text-[#D4AF37] space-y-1">
                <div>SPECTRAL CLASS: TYPE-A ARCHITECTURE</div>
                <div>COORDINATES: RA 18h 36m 56s / DEC +38° 47′ 01″</div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <Button size="sm" onClick={() => setTelescopeTarget(null)} className="bg-[#D4AF37] text-black font-bold text-xs">
                  Retract Telescope Lens
                </Button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

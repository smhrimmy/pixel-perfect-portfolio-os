import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Watch,
  Scroll,
  Sparkles,
  Music,
  Wrench,
  Compass,
  Search,
  Hammer,
  RotateCw,
  Mail,
  Github,
  Linkedin,
  Twitter,
  X,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";

export default function TheWorkshop({ data }: ThemeRendererProps) {
  const { profile, projects, skills: rawSkills, experience: rawExperience, socialLinks } = data;
  const candidateName = profile?.name || "Prajwal DL";
  const bio =
    profile?.bio ||
    "Master craftsman of autonomous systems, real-time spatial runtimes, and distributed cloud engines.";
  const email = profile?.email || "prajwal@praxel.space";

  const deskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeObject, setActiveObject] = useState<"watch" | "blueprint" | "jar" | "musicbox" | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [cameraAngle, setCameraAngle] = useState(0);

  // Pegboard Hanging Tools (Skills)
  const pegboardTools = [
    { id: "tool-caliper", name: "Brass Vernier Caliper", skill: "Precision Architecture", icon: Compass, spec: "0.01mm Tolerance" },
    { id: "tool-wrench", name: "Forged Steel Spanner", skill: "Full Stack & PostgreSQL", icon: Wrench, spec: "Heavy Load Torque" },
    { id: "tool-loupe", name: "Jeweler's 10X Loupe", skill: "WebGL & Spatial Shaders", icon: Search, spec: "Optical Refraction" },
    { id: "tool-chisel", name: "Beveled Wood Chisel", skill: "Autonomous AI Agents", icon: Hammer, spec: "Razor Edge Logic" },
    { id: "tool-lamp", name: "Tungsten Work Lamp", skill: "Distributed Cloud Systems", icon: Lightbulb, spec: "Sub-100ms Latency" },
  ];

  // Physical Desk Projects
  const defaultProjects = [
    {
      id: "watch",
      type: "watch",
      title: "POCKET WATCH · TIME CHRONOMETER",
      metaphor: "18-Jewel Escapement Movement",
      desc: "Precision mechanical gear train executing sub-millisecond autonomous consensus and state synchronization.",
      tags: ["TypeScript", "Multi-Agent", "Consensus"],
    },
    {
      id: "blueprint",
      type: "blueprint",
      title: "ROLLED BLUEPRINT · SPATIAL RUNTIME",
      metaphor: "Architectural Drafting Parchment",
      desc: "Orthographic technical blueprint detailing real-time WebGL spatial raymarching and procedural volumetrics.",
      tags: ["Three.js", "GLSL Shaders", "120 FPS"],
    },
    {
      id: "jar",
      type: "jar",
      title: "FIREFLY JAR · BIOLUMINESCENT STREAM",
      metaphor: "Apothecary Glass with Glowing Firefly",
      desc: "Bio-luminescent glowing particle stream powering continuous edge telemetry and live data ingestion.",
      tags: ["TanStack Start", "Postgres", "Serverless"],
    },
    {
      id: "musicbox",
      type: "musicbox",
      title: "MUSIC BOX · MECHANICAL AUTOMATION",
      metaphor: "Swiss Cylinder Comb Chimes",
      desc: "Self-winding mechanical cylinder playing algorithmic melodies with automated audit trails and Telegram triggers.",
      tags: ["Automation", "Telegram Bot", "Cloud Sync"],
    },
  ];

  // 1. DIMLY-LIT 3D WORKSHOP DESK CANVAS (Tungsten Key + Dust Motes)
  useEffect(() => {
    const canvas = deskCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    // Floating Dust Motes in Tungsten Light Shaft
    const motes = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Dark Walnut Desk Surface Background
      const deskGrad = ctx.createLinearGradient(0, 0, 0, height);
      deskGrad.addColorStop(0, "#120B07");
      deskGrad.addColorStop(0.4, "#24160E");
      deskGrad.addColorStop(1, "#0A0604");
      ctx.fillStyle = deskGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Warm Tungsten Light Cone (#E8A765)
      const lightCone = ctx.createRadialGradient(width * 0.5, 0, 20, width * 0.5, height * 0.6, width * 0.6);
      lightCone.addColorStop(0, "rgba(232, 167, 101, 0.35)");
      lightCone.addColorStop(0.5, "rgba(232, 167, 101, 0.12)");
      lightCone.addColorStop(1, "rgba(74, 107, 138, 0.0)");
      ctx.fillStyle = lightCone;
      ctx.fillRect(0, 0, width, height);

      // 3. Subtle Wood Grain Planks
      ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
      ctx.lineWidth = 2;
      for (let y = 100; y < height; y += 75) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.sin(y) * 4);
        ctx.stroke();
      }

      // 4. Floating Dust Motes
      motes.forEach((m) => {
        m.x += m.speedX;
        m.y -= m.speedY;
        if (m.y < 0) m.y = height;
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 167, 101, ${m.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#E8A765";
        ctx.fill();
      });

      // 5. Desk Shadow Gradients
      const shadowGrad = ctx.createLinearGradient(0, height - 60, 0, height);
      shadowGrad.addColorStop(0, "rgba(0,0,0,0)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(0, height - 60, width, 60);

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0A07] text-[#EFE5D9] font-serif overflow-x-hidden selection:bg-[#E8A765] selection:text-black">
      {/* 1. TOP WARM TUNGSTEN WORKSHOP HEADER */}
      <header className="border-b border-[#3D2619] bg-[#140D09]/95 sticky top-0 z-50 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#E8A765] text-black flex items-center justify-center font-bold shadow-[0_0_20px_rgba(232,167,101,0.4)]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#F5EBE1] tracking-wider uppercase">THE WORKSHOP</span>
              <span className="text-[10px] text-[#C29267] block font-mono -mt-0.5">BENCH NO. 07 · {candidateName}</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-[#A8805F]">
            <a href="#bench" className="hover:text-[#E8A765] transition">The Workbench</a>
            <a href="#pegboard" className="hover:text-[#E8A765] transition">Pegboard Tools</a>
            <a href="#specimens" className="hover:text-[#E8A765] transition">Tangible Projects</a>
            <a href="#contact" className="hover:text-[#E8A765] transition">Workbench Inquiries</a>
          </div>

          <Button asChild size="sm" className="bg-[#E8A765] text-black hover:bg-[#E8A765]/90 font-serif font-bold text-xs h-8 rounded-full px-4 shadow-lg">
            <a href="#contact">Contact Artisan</a>
          </Button>
        </div>
      </header>

      {/* 2. HERO WORKBENCH DESK SCENE */}
      <section id="bench" className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8A765]/40 bg-[#E8A765]/10 text-xs font-mono text-[#E8A765]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>TANGIBLE CRAFTSMAN BENCH · TUNGSTEN ILLUMINATED</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-[#FAF2E8] leading-[1.1]">
            HAND-CRAFTED SYSTEMS <br />
            <span className="italic text-[#E8A765]">FORGED ON THE WORKBENCH</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C2AA94] leading-relaxed font-sans max-w-2xl mx-auto">
            {bio}
          </p>
        </div>

        {/* 3D Workbench Surface with Tangible Artifacts */}
        <div className="relative rounded-3xl border-4 border-[#3D2619] bg-[#120B07] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
          <canvas ref={deskCanvasRef} className="w-full h-[420px] block" />

          {/* Interactive Objects Resting on the Desk Surface */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-center text-xs font-mono text-[#C29267] pointer-events-auto">
              <span>WORKBENCH SURFACE: DARK WALNUT</span>
              <span>CLICK AN ARTIFACT TO EXAMINE</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pointer-events-auto">
              {defaultProjects.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setActiveObject(obj.id as any)}
                  className="p-4 rounded-2xl border border-[#543625] bg-[#24160E]/90 hover:bg-[#3D2619] hover:border-[#E8A765] transition-all text-left shadow-2xl space-y-3 group"
                >
                  <div className="flex items-center justify-between text-xs text-[#E8A765]">
                    {obj.type === "watch" && <Watch className="h-5 w-5 group-hover:scale-110 transition-transform" />}
                    {obj.type === "blueprint" && <Scroll className="h-5 w-5 group-hover:scale-110 transition-transform" />}
                    {obj.type === "jar" && <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />}
                    {obj.type === "musicbox" && <Music className="h-5 w-5 group-hover:scale-110 transition-transform" />}
                    <span className="text-[10px] font-mono">[OPEN]</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#FAF2E8] leading-tight group-hover:text-[#E8A765] transition">
                      {obj.title.split(" · ")[0]}
                    </h4>
                    <p className="text-[10px] text-[#A8805F] font-mono mt-1 truncate">{obj.metaphor}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PEGBOARD TOOLS (SKILLS) */}
      <section id="pegboard" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3D2619] space-y-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8A765]">PEGBOARD TOOL RACK</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Hanging Artisan Tools</h2>
          </div>
          <p className="text-xs text-[#A8805F] max-w-sm font-sans">
            Each specialized tool hanging on the workshop pegboard embodies core architectural proficiencies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pegboardTools.map((tool) => {
            const Icon = tool.icon;
            const isHovered = hoveredTool === tool.id;
            return (
              <div
                key={tool.id}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 shadow-xl ${
                  isHovered
                    ? "border-[#E8A765] bg-[#2E1A10] shadow-[0_0_25px_rgba(232,167,101,0.25)]"
                    : "border-[#3D2619] bg-[#1A100B] hover:border-[#8C5D38]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-[#24160E] border border-[#543625] flex items-center justify-center text-[#E8A765]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#A8805F]">{tool.spec}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#FAF2E8]">{tool.name}</h4>
                  <p className="text-xs text-[#E8A765] font-sans font-medium mt-0.5">{tool.skill}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. TANGIBLE PROJECTS LISTING */}
      <section id="specimens" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3D2619] space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8A765]">CRAFTED COMMISSIONS</span>
          <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Physical Project Dossiers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defaultProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setActiveObject(p.id as any)}
              className="p-8 rounded-3xl border-2 border-[#3D2619] bg-[#1A100B] hover:border-[#E8A765] transition cursor-pointer space-y-4 shadow-xl group"
            >
              <div className="flex justify-between items-center text-xs font-mono text-[#E8A765]">
                <span>{p.metaphor.toUpperCase()}</span>
                <ArrowUpRight className="h-4 w-4 group-hover:scale-125 transition-transform" />
              </div>

              <h3 className="text-2xl text-[#FAF2E8] font-bold group-hover:text-[#E8A765] transition">{p.title}</h3>
              <p className="text-xs text-[#C2AA94] font-sans leading-relaxed">{p.desc}</p>

              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-[#E8A765]">
                {p.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded bg-[#2E1A10] border border-[#543625]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER INQUIRY */}
      <footer id="contact" className="py-16 px-6 border-t border-[#3D2619] bg-[#140D09] text-center space-y-6">
        <h3 className="text-2xl sm:text-3xl text-[#FAF2E8]">Commission a Masterpiece for Your Fleet</h3>
        <p className="text-xs sm:text-sm text-[#C2AA94] max-w-md mx-auto font-sans">
          Available for bespoke software engineering, spatial 3D WebGL interfaces, and high-reliability systems.
        </p>

        <Button asChild className="bg-[#E8A765] text-black hover:bg-[#E8A765]/90 font-serif font-bold text-xs h-11 px-8 rounded-full shadow-2xl">
          <a href={`mailto:${email}`}>
            <Mail className="h-4 w-4 mr-2" /> Dispatch Commission Letter
          </a>
        </Button>

        <div className="pt-8 border-t border-[#3D2619] text-xs font-mono text-[#A8805F] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <span>© {new Date().getFullYear()} {candidateName} · THE WORKSHOP THEME ARCHITECTURE</span>
          <div className="flex items-center gap-4">
            <a href={socialLinks?.github || "#"} className="hover:text-white transition">GitHub</a>
            <a href={socialLinks?.linkedin || "#"} className="hover:text-white transition">LinkedIn</a>
            <a href={socialLinks?.twitter || "#"} className="hover:text-white transition">Twitter / X</a>
          </div>
        </div>
      </footer>

      {/* Physical Open Modal Sequence */}
      <AnimatePresence>
        {activeObject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="max-w-xl w-full rounded-3xl border-2 border-[#E8A765] bg-[#1A100B] p-8 text-[#EFE5D9] space-y-6 relative shadow-[0_0_60px_rgba(232,167,101,0.25)]"
            >
              <button
                onClick={() => setActiveObject(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#543625] text-[#E8A765] flex items-center justify-center hover:bg-[#2E1A10]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#E8A765]">
                <Sparkles className="h-4 w-4" />
                <span>PHYSICAL OBJECT INSPECTOR · ACTIVE ARTIFACT</span>
              </div>

              {defaultProjects
                .filter((p) => p.id === activeObject)
                .map((p) => (
                  <div key={p.id} className="space-y-4">
                    <h2 className="text-2xl text-[#FAF2E8] font-bold">{p.title}</h2>
                    <p className="text-xs font-mono text-[#E8A765]">{p.metaphor}</p>
                    <p className="text-sm text-[#C2AA94] font-sans leading-relaxed">{p.desc}</p>

                    <div className="p-4 rounded-2xl border border-[#543625] bg-[#120B07] text-xs font-mono space-y-1 text-[#E8A765]">
                      <div>BENCH STATUS: EXAMINED &amp; POLISHED</div>
                      <div>CRAFT: Bespoke Artisanal Code</div>
                    </div>
                  </div>
                ))}

              <Button
                size="sm"
                onClick={() => setActiveObject(null)}
                className="bg-[#E8A765] text-black font-serif font-bold text-xs w-full h-10 rounded-full"
              >
                Return Artifact to Workbench
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

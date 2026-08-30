import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Sliders, Sparkles } from "lucide-react";

export function InteractiveShaderCanvas({
  title = "Perlin Wave & Dynamic Particle Field",
}: {
  title?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [density, setDensity] = useState(60);
  const [colorMode, setColorMode] = useState<"cyan" | "violet" | "emerald">("cyan");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
      });
    }

    const render = () => {
      if (isPlaying) {
        time += 0.02 * speed;
      }

      ctx.fillStyle = "#070710";
      ctx.fillRect(0, 0, width, height);

      // Render flowing sine wave ribbons
      const ribbonCount = 4;
      for (let r = 0; r < ribbonCount; r++) {
        ctx.beginPath();
        const baseHue = colorMode === "cyan" ? 190 : colorMode === "violet" ? 270 : 150;
        ctx.strokeStyle = `hsla(${baseHue + r * 15}, 85%, 60%, ${0.15 + r * 0.08})`;
        ctx.lineWidth = 2;

        for (let x = 0; x < width; x += 6) {
          const y =
            height / 2 +
            Math.sin(x * 0.008 + time + r * 0.8) * 45 * Math.sin(time * 0.5 + r) +
            Math.cos(x * 0.015 - time * 0.8) * 25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Render dynamic particle lattice
      particles.forEach((p, idx) => {
        if (isPlaying) {
          p.x += p.vx * speed;
          p.y += p.vy * speed;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }

        const baseColor = colorMode === "cyan" ? "rgba(34, 211, 238," : colorMode === "violet" ? "rgba(192, 132, 252," : "rgba(52, 211, 153,";
        ctx.fillStyle = `${baseColor} 0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect near neighbors
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.strokeStyle = `${baseColor} ${(1 - dist / 85) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, speed, density, colorMode]);

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#070710] overflow-hidden shadow-2xl">
      {/* Sandbox Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-white/[0.02] px-5 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="font-mono text-xs font-semibold text-white/80">{title}</span>
        </div>

        {/* Real-time Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span>{isPlaying ? "Pause" : "Resume"}</span>
          </button>

          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5">
            {(["cyan", "violet", "emerald"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setColorMode(m)}
                className={`rounded px-2 py-0.5 capitalize text-[10px] transition ${
                  colorMode === m ? "bg-white/20 text-white font-bold" : "text-white/50 hover:text-white"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas view */}
      <div className="relative w-full h-[420px] bg-[#070710]">
        <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />
      </div>

      {/* Parameter HUD footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/[0.08] bg-white/[0.01] px-5 py-3 text-xs font-mono text-white/60">
        <div>
          <span className="text-white/40 block text-[10px] uppercase">Engine</span>
          <span className="text-white font-semibold">HTML5 Canvas2D / GPU</span>
        </div>
        <div>
          <span className="text-white/40 block text-[10px] uppercase">FPS Target</span>
          <span className="text-emerald-400 font-semibold">60.0 FPS</span>
        </div>
        <div>
          <span className="text-white/40 block text-[10px] uppercase">Speed Scale</span>
          <div className="flex items-center gap-2 mt-0.5">
            <input
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-16 accent-cyan-400"
            />
            <span className="text-white font-semibold">{speed.toFixed(1)}x</span>
          </div>
        </div>
        <div>
          <span className="text-white/40 block text-[10px] uppercase">Particle Density</span>
          <span className="text-white font-semibold">{density} nodes</span>
        </div>
      </div>
    </div>
  );
}

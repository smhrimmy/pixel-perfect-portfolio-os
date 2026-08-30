import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, X } from "lucide-react";

export type LoaderStyle = "auto" | "gyroscope" | "hypercube" | "vortex" | "playful" | "glass" | "monolith";

export interface ThemeAware3DLoaderProps {
  themeId?: string;
  forceShow?: boolean;
  onComplete?: () => void;
  styleOverride?: LoaderStyle;
  durationMs?: number;
  showSkip?: boolean;
}

export function ThemeAware3DLoader({
  themeId = "prajwal-premium",
  forceShow = false,
  onComplete,
  styleOverride = "auto",
  durationMs = 2000,
  showSkip = true,
}: ThemeAware3DLoaderProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Determine effective animation mode based on themeId
  const effectiveStyle: LoaderStyle = styleOverride !== "auto" ? styleOverride : (() => {
    if (themeId.includes("cyber") || themeId.includes("brutalist") || themeId.includes("terminal")) return "hypercube";
    if (themeId.includes("galaxy") || themeId.includes("sunset")) return "vortex";
    if (themeId.includes("playful") || themeId.includes("showcase")) return "playful";
    if (themeId.includes("glass") || themeId.includes("macos")) return "glass";
    if (themeId.includes("mono") || themeId.includes("editorial")) return "monolith";
    return "gyroscope"; // default for prajwal-premium & noir-aurora
  })();

  // Progress ticker
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / durationMs) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [durationMs, onComplete]);

  // 3D Canvas Procedural Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 340);
    let height = (canvas.height = 340);
    let t = 0;

    const render = () => {
      t += 0.035;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      if (effectiveStyle === "gyroscope") {
        // --- 3D Concentric Kinetic Gyroscope Rings ---
        const ringCount = 3;
        for (let i = 0; i < ringCount; i++) {
          const radius = 60 + i * 28;
          const rotX = t * (0.8 + i * 0.4);
          const rotY = t * (0.6 - i * 0.3);

          ctx.save();
          ctx.translate(cx, cy);
          ctx.beginPath();

          const points = 40;
          for (let p = 0; p <= points; p++) {
            const angle = (p / points) * Math.PI * 2;
            let x = Math.cos(angle) * radius;
            let y = Math.sin(angle) * radius;
            let z = 0;

            // 3D Rotation
            const y1 = y * Math.cos(rotX) - z * Math.sin(rotX);
            const z1 = y * Math.sin(rotX) + z * Math.cos(rotX);
            const x2 = x * Math.cos(rotY) + z1 * Math.sin(rotY);

            const scale = 300 / (300 + z1);
            const px = x2 * scale;
            const py = y1 * scale;

            if (p === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }

          ctx.strokeStyle = i === 0 ? "#00E6C3" : i === 1 ? "#06b6d4" : "rgba(230, 241, 255, 0.4)";
          ctx.lineWidth = i === 0 ? 2.5 : 1.5;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#00E6C3";
          ctx.stroke();
          ctx.restore();
        }

        // Center glowing photon core
        ctx.save();
        ctx.translate(cx, cy);
        const pulse = 8 + Math.sin(t * 4) * 3;
        ctx.beginPath();
        ctx.arc(0, 0, pulse, 0, Math.PI * 2);
        ctx.fillStyle = "#00E6C3";
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#00E6C3";
        ctx.fill();
        ctx.restore();

      } else if (effectiveStyle === "hypercube") {
        // --- 3D Rotating Wireframe Cyber Hypercube ---
        const size = 55;
        const vertices = [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        const edges = [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        ctx.save();
        ctx.translate(cx, cy);

        const rotX = t * 1.1;
        const rotY = t * 1.4;
        const rotZ = t * 0.7;

        const proj = vertices.map(([x, y, z]) => {
          let nx = x * size, ny = y * size, nz = z * size;
          // Rotate X
          let y1 = ny * Math.cos(rotX) - nz * Math.sin(rotX);
          let z1 = ny * Math.sin(rotX) + nz * Math.cos(rotX);
          // Rotate Y
          let x2 = nx * Math.cos(rotY) + z1 * Math.sin(rotY);
          let z2 = -nx * Math.sin(rotY) + z1 * Math.cos(rotY);
          // Rotate Z
          let x3 = x2 * Math.cos(rotZ) - y1 * Math.sin(rotZ);
          let y3 = x2 * Math.sin(rotZ) + y1 * Math.cos(rotZ);

          const scale = 250 / (250 + z2);
          return [x3 * scale, y3 * scale];
        });

        // Draw edges
        ctx.strokeStyle = "#ff007f";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#ff007f";
        ctx.lineWidth = 2;

        edges.forEach(([i, j]) => {
          ctx.beginPath();
          ctx.moveTo(proj[i][0], proj[i][1]);
          ctx.lineTo(proj[j][0], proj[j][1]);
          ctx.stroke();
        });

        // Draw vertices sparks
        proj.forEach(([px, py]) => {
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#00ffcc";
          ctx.fill();
        });

        ctx.restore();

      } else if (effectiveStyle === "vortex") {
        // --- 3D Particle Accretion Stellar Vortex ---
        ctx.save();
        ctx.translate(cx, cy);
        const count = 75;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2 + t * (1.2 + (i % 3) * 0.2);
          const dist = 20 + ((i * 3 + t * 40) % 110);
          const z = Math.sin(angle * 2 + t) * 30;
          const scale = 200 / (200 + z);

          const px = Math.cos(angle) * dist * scale;
          const py = Math.sin(angle) * (dist * 0.45) * scale;

          ctx.beginPath();
          ctx.arc(px, py, (dist / 35) * scale, 0, Math.PI * 2);
          ctx.fillStyle = i % 2 === 0 ? "rgba(168, 85, 247, 0.9)" : "rgba(6, 182, 212, 0.9)";
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#a855f7";
          ctx.fill();
        }
        ctx.restore();

      } else {
        // --- 3D Floating Geometry Torus / Glass Polyhedron ---
        ctx.save();
        ctx.translate(cx, cy);
        const steps = 24;
        const R = 65;
        const r = 24;

        for (let i = 0; i < steps; i++) {
          const u = (i / steps) * Math.PI * 2 + t * 0.8;
          ctx.beginPath();
          for (let j = 0; j <= steps; j++) {
            const v = (j / steps) * Math.PI * 2 + t * 1.5;
            let x = (R + r * Math.cos(v)) * Math.cos(u);
            let y = (R + r * Math.cos(v)) * Math.sin(u);
            let z = r * Math.sin(v);

            const scale = 220 / (220 + z);
            const px = x * scale;
            const py = y * scale;
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = "rgba(0, 230, 195, 0.5)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [effectiveStyle]);

  if (!mounted || (!visible && !forceShow)) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07090D] text-[#E6F1FF] select-none"
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-[#00E6C3]/10 blur-[120px]" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        </div>

        {/* Top skip button */}
        {showSkip && (
          <button
            onClick={() => {
              setVisible(false);
              onComplete?.();
            }}
            className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-[#9AA6B2] hover:text-white transition-all backdrop-blur-md"
          >
            <span>Skip Intro</span>
            <X className="h-3 w-3" />
          </button>
        )}

        {/* 3D Canvas */}
        <div className="relative flex items-center justify-center">
          <canvas ref={canvasRef} className="h-[280px] w-[280px] sm:h-[340px] sm:w-[340px]" />
        </div>

        {/* Progress & Telemetry */}
        <div className="mt-4 flex flex-col items-center gap-3 text-center z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00E6C3] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00E6C3] font-semibold">
              Booting {themeId.replace(/-/g, " ").toUpperCase()}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-56 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00E6C3] via-[#06b6d4] to-purple-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-56 text-[10px] font-mono text-[#9AA6B2]">
            <span>INITIALIZING 3D ENGINE</span>
            <span className="text-white font-semibold tabular-nums">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

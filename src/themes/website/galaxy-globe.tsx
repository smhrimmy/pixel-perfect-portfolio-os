import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Navigation,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  MapPin,
  Compass
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playGlobeSound(type: 'spin' | 'pin' | 'nautical' | 'dispatch', isMuted: boolean) {
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

    if (type === 'pin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'nautical') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {}
}

export default function TheTradeRouteGlobe({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Navigator connecting global digital trade routes, automated DNS pipelines, and sub-100ms web systems from Mangalore, India.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [globeRotation, setGlobeRotation] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Geodesic Trade Globe Canvas
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

    const render = () => {
      angle += 0.008;
      ctx.fillStyle = '#080C14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height * 0.42;
      const R = Math.min(canvas.width, canvas.height) * 0.26;

      // 1. Draw 3D Geodesic Latitude Rings
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.lineWidth = 1;

      for (let lat = -60; lat <= 60; lat += 20) {
        const radLat = (lat * Math.PI) / 180;
        const rLat = R * Math.cos(radLat);
        const yLat = cy + R * Math.sin(radLat);

        ctx.beginPath();
        ctx.ellipse(cx, yLat, rLat, rLat * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Draw 3D Rotating Longitude Ribs
      for (let lon = 0; lon < 360; lon += 30) {
        const radLon = ((lon + angle * 40) * Math.PI) / 180;
        const xOffset = Math.sin(radLon) * R;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xOffset), R, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Draw Globe Outer Atmosphere Rim
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // 4. Draw Trade Route Arc connecting Mangalore (12.91°N, 74.85°E) to Global Ports
      ctx.strokeStyle = '#38BDF8';
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy + 20);
      ctx.quadraticCurveTo(cx, cy - R * 0.8, cx + 80, cy - 40);
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const routes = [
    {
      id: "route-1",
      port: "PORT MANGALORE -> GLOBAL WEB",
      title: "Portfolio OS Route",
      distance: "ZERO-LATENCY CDN",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "route-2",
      port: "PORT DNS -> CLOUD SPHERE",
      title: "Praxel Space Trade Route",
      distance: "AUTOMATED PROBES",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "route-3",
      port: "PORT CLIENT -> REACT MATRIX",
      title: "Vitvara Application Conduit",
      distance: "99.9% UPTIME",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "route-4",
      port: "PORT ENTERPRISE -> BESPOKE",
      title: "Enterprise Trade Network",
      distance: "MULTI-REGION PIPELINES",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080C14] text-[#38BDF8] font-sans relative selection:bg-[#38BDF8] selection:text-black overflow-x-hidden">
      {/* 3D Geodesic Globe Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#0B111E]/90 border-b border-[#38BDF8]/30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8] text-[#38BDF8] flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">TRADE GLOBE</span>
            </h1>
            <p className="text-[10px] font-mono text-[#94A3B8]">{location} · 12.91°N, 74.85°E</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playGlobeSound('nautical', !isMuted);
            }}
            className="w-9 h-9 rounded-full bg-[#0F172A] border border-[#38BDF8]/40 text-[#38BDF8] flex items-center justify-center hover:border-[#38BDF8] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-[#38BDF8]" />}
          </button>
        </div>
      </header>

      {/* MAIN GLOBE STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/40 text-[#38BDF8] text-xs font-mono"
          >
            <Compass className="w-3.5 h-3.5" /> 3D GEODESIC METAPHOR · IMPERIAL TRADE GLOBE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_2px_20px_rgba(56,189,248,0.4)]"
          >
            Navigating Global Digital Architecture
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* TRADE ROUTES */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#38BDF8]/30 pb-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#38BDF8]" /> Active Trade Routes & Dispatches
            </h3>
            <span className="text-xs font-mono text-[#38BDF8]">4 SEA-LANES OPEN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((r) => (
              <motion.div
                key={r.id}
                whileHover={{ y: -4, borderColor: "#38BDF8" }}
                onClick={() => {
                  setSelectedRoute(r);
                  playGlobeSound('pin', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#0B111E]/90 border border-[#38BDF8]/30 backdrop-blur-md cursor-pointer transition shadow-[0_4px_25px_rgba(0,0,0,0.6)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#38BDF8] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#38BDF8]/10 border border-[#38BDF8]/30">{r.port}</span>
                  <span className="text-slate-400">{r.distance}</span>
                </div>

                <h4 className="text-xl font-bold text-white group-hover:text-[#38BDF8] transition mb-2">
                  {r.title}
                </h4>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                  {r.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {r.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080C14] text-[#E2E8F0] border border-[#1E293B]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#38BDF8] group-hover:underline">
                  <span>INSPECT TRADE DISPATCH</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TRADE TELEGRAM CONTACT */}
        <section className="p-8 rounded-3xl bg-[#0B111E]/90 border border-[#38BDF8]/40 shadow-[0_0_40px_rgba(56,189,248,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white">Transmit Harbor Telegram</h3>
            <p className="text-xs text-[#94A3B8]">
              Dispatch cargo and project inquiries to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#38BDF8]/10 border border-[#38BDF8] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#38BDF8] mx-auto" />
              <p className="font-bold text-white">Harbor Telegram Dispatched to Port Authorities</p>
              <p className="text-xs text-[#94A3B8] font-mono">Prajwal DL will decode your coordinates shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playGlobeSound('dispatch', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#38BDF8] font-mono mb-1">CALLING PORT / NAME</label>
                  <input
                    required
                    defaultValue="Trade Envoy"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080C14] border border-[#38BDF8]/30 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="block text-[#38BDF8] font-mono mb-1">HARBOR FREQUENCY / EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="envoy@tradeglobe.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080C14] border border-[#38BDF8]/30 text-white focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#38BDF8] font-mono mb-1">CARGO MANIFEST / DETAILS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting high-throughput full-stack architecture design with international CDN deployment."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080C14] border border-[#38BDF8]/30 text-white focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#38BDF8] text-black font-mono font-bold text-xs hover:bg-white transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                <Send className="w-4 h-4" /> TRANSMIT TRADE TELEGRAM
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#38BDF8]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#94A3B8]">
            <span>PORT OF ORIGIN: MANGALORE, INDIA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#38BDF8] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* ROUTE MODAL */}
      <AnimatePresence>
        {selectedRoute && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0B111E] border-2 border-[#38BDF8] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(56,189,248,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedRoute(null);
                  playGlobeSound('nautical', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] hover:bg-[#38BDF8] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
                  {selectedRoute.port} · {selectedRoute.distance}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedRoute.title}</h3>
              </div>

              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {selectedRoute.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#38BDF8]">SEA-LANE PROTOCOLS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedRoute.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#080C14] text-white border border-[#1E293B]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedRoute.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#38BDF8] text-black font-mono font-bold text-xs text-center hover:bg-white transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> EMBARK ROUTE
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

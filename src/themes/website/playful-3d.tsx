import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Boxes,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Smile,
  Zap,
  Package,
  Heart
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playToySound(type: 'bounce' | 'pop' | 'bell' | 'windup', isMuted: boolean) {
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

    if (type === 'bounce') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'pop') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'bell') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now);
      osc.frequency.setValueAtTime(1318.5, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(400, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {}
}

export default function TheToyChest({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Developer & Web Advisor building joyful 3D interactive physics boxes, high-velocity web apps, and automated DNS infrastructure.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedToy, setSelectedToy] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [windupTurns, setWindupTurns] = useState(3);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Isometric Physics Toy Blocks Canvas
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

    // Blocks
    const blocks: { x: number; y: number; size: number; color: string; speed: number; rot: number; rotSpeed: number }[] = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF8E53', '#A8E6CF', '#DEDBA7'];
    for (let i = 0; i < 24; i++) {
      blocks.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 30 + 25,
        color: colors[i % colors.length],
        speed: Math.random() * 0.6 + 0.3,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const render = () => {
      time += 0.02;
      ctx.fillStyle = '#FFFDF5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw playful 3D isometric floating toy blocks
      blocks.forEach((b) => {
        b.y -= b.speed;
        b.rot += b.rotSpeed;
        if (b.y < -60) {
          b.y = canvas.height + 60;
          b.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);

        // 3D Isometric Box Rendering
        const s = b.size;
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.beginPath();
        ctx.ellipse(0, s * 0.8, s * 0.9, s * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Top Face
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.lineTo(s * 0.8, -s * 0.1);
        ctx.lineTo(0, s * 0.3);
        ctx.lineTo(-s * 0.8, -s * 0.1);
        ctx.closePath();
        ctx.fill();

        // Left Face
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.moveTo(-s * 0.8, -s * 0.1);
        ctx.lineTo(0, s * 0.3);
        ctx.lineTo(0, s * 0.9);
        ctx.lineTo(-s * 0.8, s * 0.5);
        ctx.closePath();
        ctx.fill();

        // Right Face
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.lineTo(s * 0.8, -s * 0.1);
        ctx.lineTo(s * 0.8, s * 0.5);
        ctx.lineTo(0, s * 0.9);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const toyBoxes = [
    {
      id: "toy-1",
      title: "Portfolio OS 3D Chest",
      color: "bg-[#FF6B6B]",
      accent: "border-[#FF6B6B]",
      tag: "FLAGSHIP TOY",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and interactive 3D physics.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "toy-2",
      title: "Praxel Space Cloud Sandbox",
      color: "bg-[#4ECDC4]",
      accent: "border-[#4ECDC4]",
      tag: "CLOUD BOX",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "toy-3",
      title: "Vitvara Web Playground",
      color: "bg-[#FFE66D]",
      accent: "border-[#FFE66D]",
      tag: "REACT BOX",
      desc: "Engineered scalable, user-centric web applications with modern state management, high test coverage, and fast API microservices.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "toy-4",
      title: "Client Enterprise Diorama",
      color: "bg-[#FF8E53]",
      accent: "border-[#FF8E53]",
      tag: "CUSTOM SUITE",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  const handleWindup = () => {
    setWindupTurns(w => w + 1);
    playToySound('windup', isMuted);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#2D3748] font-sans relative selection:bg-[#FF6B6B] selection:text-white overflow-x-hidden">
      {/* 3D Toy Physics Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-white/85 border-b-2 border-slate-200 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF6B6B] text-white flex items-center justify-center shadow-md">
            <Boxes className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-wide text-slate-800 uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FF6B6B]/15 text-[#FF6B6B]">TOY CHEST</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500">{location} · WIND-UPS: {windupTurns}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleWindup}
            className="px-3.5 py-1.5 rounded-xl bg-[#4ECDC4] text-slate-900 font-bold text-xs hover:bg-[#38b2ac] transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" /> WIND UP SPRING ({windupTurns})
          </button>

          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playToySound('bell', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#FF6B6B]" />}
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE66D] border border-amber-300 text-slate-800 text-xs font-bold shadow-sm"
          >
            <Smile className="w-4 h-4 text-amber-600" /> 3D PLAYFUL METAPHOR · HAND-CRAFTED DIORAMAS
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight"
          >
            Building Playful, High-Velocity Digital Worlds
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* 3D DIORAMA BOXES */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#FF6B6B]" /> Interactive Toy Dioramas
            </h3>
            <span className="text-xs font-bold text-slate-500">4 DIORAMAS LOADED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {toyBoxes.map((toy) => (
              <motion.div
                key={toy.id}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedToy(toy);
                  playToySound('bounce', isMuted);
                }}
                className="p-6 rounded-3xl bg-white border-3 border-slate-800 shadow-[6px_6px_0px_#1E293B] cursor-pointer transition-all duration-200 group relative"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
                    {toy.tag}
                  </span>
                  <div className={`w-4 h-4 rounded-full ${toy.color} border border-slate-800`} />
                </div>

                <h4 className="text-xl font-black text-slate-900 group-hover:text-[#FF6B6B] transition mb-2">
                  {toy.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {toy.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {toy.tech.map((t) => (
                    <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 group-hover:text-[#FF6B6B]">
                  <span>OPEN TOY DIORAMA</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TOY CHEST CONTACT FORM */}
        <section className="p-8 rounded-3xl bg-white border-3 border-slate-800 shadow-[8px_8px_0px_#1E293B] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Drop a Note in the Toy Chest</h3>
            <p className="text-xs text-slate-600">
              Send a joyful message to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#4ECDC4]/20 border-2 border-[#4ECDC4] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#4ECDC4] mx-auto" />
              <p className="font-black text-slate-900">Toy Box Message Successfully Delivered!</p>
              <p className="text-xs text-slate-600">Prajwal DL will open your note soon.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playToySound('pop', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-bold"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">YOUR NAME</label>
                  <input
                    required
                    defaultValue="Toy Maker Friend"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-slate-800 focus:outline-none focus:border-[#FF6B6B]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">YOUR EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="friend@toychest.io"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-slate-800 focus:outline-none focus:border-[#FF6B6B]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-700 mb-1">YOUR NOTE</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Excited to build delightful, high-performance web products together!"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-slate-800 focus:outline-none focus:border-[#FF6B6B]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#FF6B6B] text-white font-black text-xs hover:bg-[#ff5252] transition flex items-center justify-center gap-2 cursor-pointer shadow-[4px_4px_0px_#1E293B]"
              >
                <Send className="w-4 h-4" /> SEND TOY CHEST MESSAGE
              </button>
            </form>
          )}

          <div className="pt-4 border-t-2 border-slate-200 flex flex-wrap justify-between items-center text-[11px] font-bold text-slate-500">
            <span>MANGALORE, KARNATAKA · 575001</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#FF6B6B] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#4ECDC4] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#FF8E53] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* TOY MODAL */}
      <AnimatePresence>
        {selectedToy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white border-3 border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[10px_10px_0px_#1E293B] relative space-y-5"
            >
              <button
                onClick={() => {
                  setSelectedToy(null);
                  playToySound('pop', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-300">
                  {selectedToy.tag}
                </span>
                <h3 className="text-2xl font-black text-slate-900">{selectedToy.title}</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedToy.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500">PLAYGROUND TECH</span>
                <div className="flex flex-wrap gap-2">
                  {selectedToy.tech.map((t: string) => (
                    <span key={t} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedToy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#FF6B6B] text-white font-black text-xs text-center hover:bg-[#ff5252] transition flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#1E293B]"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LAUNCH TOY
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

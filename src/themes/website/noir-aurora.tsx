import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Droplets,
  Moon,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";


function playSoundEffect(type: 'click' | 'gear' | 'water' | 'lever' | 'relay' | 'typewriter' | 'boop', isMuted: boolean) {
  if (isMuted || typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;

    if (type === 'click' || type === 'relay') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'boop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'water') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'typewriter') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {}
}


export default function TheReservoir({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const links = (data as any)?.socialLinks || (data as any)?.links || {};
  const rawExperience = (data as any)?.experience || [];
  const rawProjects = (data as any)?.projects || (data as any)?.cmsProjects || [];

  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly.";
  const email = profile?.email || links?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || links?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || links?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = profile?.website || links?.website || "https://praxel.space/";
  const github = profile?.github || links?.github || "https://github.com/smhrimmy";

  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeStone, setActiveStone] = useState<any | null>(null);

  const waterCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  // Water Ripple Canvas
  useEffect(() => {
    if (loading) return;
    const canvas = waterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 400);

    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Deep Water Gradient (#0A0D10)
      const grad = ctx.createRadialGradient(width * 0.5, height * 0.5, 20, width * 0.5, height * 0.5, width * 0.7);
      grad.addColorStop(0, "#131C24");
      grad.addColorStop(1, "#0A0D10");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Concentric Moonlight Ripples
      for (let r = 30; r < 200; r += 40) {
        const rad = (r + t * 25) % 220;
        const alpha = Math.max(0, 1 - rad / 220) * 0.35;
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.5, rad, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201, 214, 227, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [loading]);

  const displayProjects = rawProjects.length > 0 ? rawProjects : [
    { title: "Portfolio OS · 20 Tactile Themes", category: "Full Stack", desc: "Full-stack personal operating system with 20 real-world tactile 3D themes, Studio HQ Terminal, and content automation engine." },
    { title: "Praxel Space Cloud Platform", category: "Infrastructure", desc: "High-performance web hosting, domain DNS manager, and automated SSL orchestration portal." },
    { title: "Vitvara Scalable Web App", category: "Frontend", desc: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs." },
    { title: "Custom Client Platforms", category: "Full Stack", desc: "Delivered bespoke performant web applications and custom CMS solutions." },
  ];

  const displayExperience = rawExperience.length > 0 ? rawExperience : [
    { company: "Unifycx", role: "Web Advisor", startDate: "Jun 2025", endDate: "Present", summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panels." },
    { company: "Freelancer", role: "Full Stack Developer", startDate: "Dec 2024", endDate: "Jun 2025", summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies." },
    { company: "Glowtouch Technologies", role: "Junior Support Engineer", startDate: "Aug 2024", endDate: "Dec 2024", summary: "Provided live chat support for hosting, domain, server, DNS, and WordPress issues." },
    { company: "Vitvara Technologies", role: "Web Developer Intern", startDate: "Jan 2024", endDate: "May 2024", summary: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0D10] text-[#C9D6E3] font-serif overflow-x-hidden selection:bg-[#C9D6E3] selection:text-black">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#C9D6E3] text-black font-sans font-bold text-xs rounded">
        Skip 3D experience
      </a>

      {/* LOADER: Single Stone Water Drop */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#050709] flex flex-col items-center justify-center p-6 text-center text-[#C9D6E3]"
          >
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-12 h-12 rounded-full border border-[#C9D6E3]/40 flex items-center justify-center"
            >
              <Droplets className="w-6 h-6 text-[#C9D6E3]" />
            </motion.div>
            <h3 className="mt-4 text-lg font-mono">Disturbing Water Surface...</h3>
            <button onClick={() => setLoading(false)} className="mt-3 text-[10px] font-mono underline">[Skip]</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <header className="border-b border-[#1C2630] bg-[#0A0D10]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="h-5 w-5 text-[#C9D6E3]" />
            <span className="font-bold text-sm tracking-widest uppercase">{candidateName}</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-[#7D91A6]">
            <a href="#basin" onClick={() => playSoundEffect("water", isMuted)} className="hover:text-white transition">Basin</a>
            <a href="#stones" onClick={() => playSoundEffect("water", isMuted)} className="hover:text-white transition">Stones</a>
            <a href="#reflections" onClick={() => playSoundEffect("water", isMuted)} className="hover:text-white transition">Reflections</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect("water", !isMuted);
              }}
              className="h-8 w-8 rounded-full border border-[#1C2630] text-[#C9D6E3] flex items-center justify-center hover:bg-[#1C2630]"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <Button asChild size="sm" className="bg-[#C9D6E3] text-black hover:bg-white text-xs rounded-full px-4 font-sans font-bold">
              <a href="#contact">Contact</a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO BASIN */}
      <main id="main-content">
        <section id="basin" className="py-16 px-6 max-w-6xl mx-auto space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1C2630] text-xs font-mono text-[#7D91A6]">
            <Droplets className="w-3.5 h-3.5" /> MOONLIT WATER RESERVOIR
          </div>

          <h1 className="text-4xl sm:text-6xl text-[#E8ECF0] font-light leading-tight">{candidateName}</h1>
          <p className="text-sm text-[#7D91A6] font-sans max-w-xl mx-auto leading-relaxed">{bio}</p>

          <div className="relative rounded-3xl border border-[#1C2630] bg-[#07090C] overflow-hidden shadow-2xl">
            <canvas ref={waterCanvasRef} className="w-full h-[350px] block" />
            <div className="absolute bottom-4 left-6 text-xs font-mono text-[#7D91A6]">
              [CLICK TO DROP WATER STONES]
            </div>
          </div>
        </section>

        {/* STONES PROJECT SHOWCASE */}
        <section id="stones" className="py-16 px-6 max-w-6xl mx-auto border-t border-[#1C2630] space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D91A6]">WATER STONES</span>
            <h2 className="text-3xl text-[#E8ECF0] font-light mt-1">Project Ripples</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((proj: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveStone(proj);
                  playSoundEffect("water", isMuted);
                }}
                className="p-7 rounded-3xl border border-[#1C2630] bg-[#0E1318] hover:border-[#C9D6E3] transition shadow-lg space-y-3 cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#7D91A6]">
                  <span>Stone #{idx + 1}</span>
                  <span className="text-[#C9D6E3]">[DROP STONE]</span>
                </div>
                <h3 className="text-xl font-medium text-[#E8ECF0]">{proj.title}</h3>
                <p className="text-xs text-[#7D91A6] font-sans leading-relaxed">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* REFLECTIONS CAREER */}
        <section id="reflections" className="py-16 px-6 max-w-6xl mx-auto border-t border-[#1C2630] space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D91A6]">CAREER REFLECTIONS</span>
            <h2 className="text-3xl text-[#E8ECF0] font-light mt-1">Experience Stream</h2>
          </div>

          <div className="space-y-4">
            {displayExperience.map((exp: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl border border-[#1C2630] bg-[#0E1318] space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <h3 className="font-bold text-[#E8ECF0]">{exp.role} @ {exp.company}</h3>
                  <span className="text-xs font-mono text-[#7D91A6]">{exp.startDate} – {exp.endDate || "Present"}</span>
                </div>
                <p className="text-xs text-[#7D91A6] font-sans">{exp.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="py-16 px-6 border-t border-[#1C2630] text-center space-y-6">
          <h3 className="text-2xl text-[#E8ECF0]">Connect with {candidateName}</h3>
          <p className="text-xs text-[#7D91A6] font-sans max-w-md mx-auto">{email} · {phone}</p>
          <Button asChild size="sm" className="bg-[#C9D6E3] text-black hover:bg-white text-xs rounded-full px-6 font-sans font-bold">
            <a href={`mailto:${email}`}>Transmit Inquiry</a>
          </Button>
        </footer>
      </main>

      {/* STONE MODAL */}
      <AnimatePresence>
        {activeStone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-md w-full rounded-3xl border border-[#C9D6E3] bg-[#0E1318] p-6 space-y-4 relative">
              <button onClick={() => setActiveStone(null)} className="absolute top-4 right-4 text-[#7D91A6] hover:text-white">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-xl font-light text-[#E8ECF0]">{activeStone.title}</h3>
              <p className="text-xs text-[#7D91A6] font-sans leading-relaxed">{activeStone.desc}</p>
              <Button size="sm" onClick={() => setActiveStone(null)} className="bg-[#C9D6E3] text-black font-sans font-bold text-xs rounded-full w-full">
                Close Ripple
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

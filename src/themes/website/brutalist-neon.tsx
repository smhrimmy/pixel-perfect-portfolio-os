import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, Printer, ArrowUpRight } from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";


function playSoundEffect(type: 'click' | 'stamp' | 'page' | 'water' | 'coin' | 'clay', isMuted: boolean) {
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

    if (type === 'stamp') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'page') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'coin') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now);
      osc.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'water') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch {}
}


export default function ThePrintShop({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const links = (data as any)?.socialLinks || (data as any)?.links || {};
  const rawExperience = (data as any)?.experience || [];
  const rawProjects = (data as any)?.projects || (data as any)?.cmsProjects || [];

  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly.";
  const email = profile?.email || links?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || links?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const website = profile?.website || links?.website || "https://praxel.space/";

  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activePrint, setActivePrint] = useState<any | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

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
    <div className="min-h-screen bg-[#8F8B85] text-[#111111] font-sans selection:bg-[#C8321F] selection:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#C8321F] text-white font-bold text-xs">
        Skip 3D experience
      </a>

      {/* LOADER: Press Stamp */}
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#8F8B85] flex flex-col items-center justify-center p-6 text-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="p-4 bg-[#111111] text-[#FAF7F0] rounded shadow-[6px_6px_0px_#C8321F]">
              <Printer className="w-10 h-10" />
            </motion.div>
            <h3 className="mt-4 font-black uppercase text-xl tracking-tighter">STAMPING FRESH LETTERPRESS...</h3>
            <button onClick={() => setLoading(false)} className="mt-3 text-xs underline font-mono">[SKIP STAMP]</button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="border-b-4 border-[#111111] bg-[#FAF7F0] sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <span className="font-black text-lg tracking-tighter uppercase">{candidateName} // PRINT WORKSHOP</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect("stamp", !isMuted);
              }}
              className="h-8 w-8 border-2 border-[#111111] bg-[#FAF7F0] flex items-center justify-center shadow-[2px_2px_0px_#111111]"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <Button asChild size="sm" className="bg-[#C8321F] text-white font-black text-xs uppercase border-2 border-[#111111] shadow-[3px_3px_0px_#111111]">
              <a href="#contact">Press Ink Stamp</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 border-4 border-[#111111] bg-[#FAF7F0] shadow-[8px_8px_0px_#111111] space-y-4">
          <div className="text-xs font-black text-[#C8321F] uppercase tracking-widest">[LETTERPRESS PROOF · NO NEON]</div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight">{candidateName}</h1>
          <p className="text-sm font-medium leading-relaxed max-w-2xl">{bio}</p>
        </section>

        {/* PROJECTS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-tight">PULLED PRINTS // CASE STUDIES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((proj: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setActivePrint(proj);
                  playSoundEffect("stamp", isMuted);
                }}
                className="p-6 border-4 border-[#111111] bg-[#FAF7F0] shadow-[6px_6px_0px_#111111] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all cursor-pointer space-y-3"
              >
                <div className="flex justify-between font-black text-xs text-[#C8321F]">
                  <span>PRINT #{idx + 1}</span>
                  <span>[PULL LEVER]</span>
                </div>
                <h3 className="text-xl font-black uppercase">{proj.title}</h3>
                <p className="text-xs leading-relaxed">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-tight">WORKSHOP LOGS // CAREER</h2>
          <div className="space-y-4">
            {displayExperience.map((exp: any, idx: number) => (
              <div key={idx} className="p-5 border-4 border-[#111111] bg-[#FAF7F0] shadow-[4px_4px_0px_#111111] flex flex-col sm:flex-row justify-between text-xs font-medium">
                <div>
                  <span className="font-black uppercase text-sm">{exp.role}</span> @ {exp.company}
                  <p className="mt-1">{exp.summary}</p>
                </div>
                <span className="font-black text-[#C8321F] shrink-0 mt-2 sm:mt-0">{exp.startDate} – {exp.endDate || "Present"}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="p-8 border-4 border-[#111111] bg-[#FAF7F0] shadow-[8px_8px_0px_#111111] text-center space-y-4">
          <h2 className="text-3xl font-black uppercase">RUBBER STAMP TRANSMISSION</h2>
          <p className="text-xs font-bold">{email} · {phone}</p>
          <a href={`mailto:${email}`} className="inline-block px-8 py-3 bg-[#C8321F] text-white font-black text-sm uppercase border-2 border-[#111111] shadow-[4px_4px_0px_#111111]">
            STAMP &amp; SUBMIT &gt;&gt;
          </a>
        </section>
      </main>

      <AnimatePresence>
        {activePrint && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <div className="max-w-md w-full border-4 border-[#111111] bg-[#FAF7F0] p-6 space-y-4 shadow-[8px_8px_0px_#C8321F] relative">
              <button onClick={() => setActivePrint(null)} className="absolute top-4 right-4 font-black">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-black uppercase">{activePrint.title}</h3>
              <p className="text-xs leading-relaxed font-medium">{activePrint.desc}</p>
              <Button size="sm" onClick={() => setActivePrint(null)} className="bg-[#111111] text-white font-black text-xs uppercase w-full">
                Close Print
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

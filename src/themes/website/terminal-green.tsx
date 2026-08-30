import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  Radio,
  Zap,
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


export default function TheSwitchboard({ data }: ThemeRendererProps) {
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
  const [activeJack, setActiveJack] = useState<any | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const displayProjects = rawProjects.length > 0 ? rawProjects : [
    { jack: "JACK-01", title: "Portfolio OS · 20 Tactile Themes", category: "Full Stack", desc: "Full-stack personal operating system with 20 real-world tactile 3D themes, Studio HQ Terminal, and content automation engine." },
    { jack: "JACK-02", title: "Praxel Space Cloud Platform", category: "Infrastructure", desc: "High-performance web hosting, domain DNS manager, and automated SSL orchestration portal." },
    { jack: "JACK-03", title: "Vitvara Scalable Web App", category: "Frontend", desc: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs." },
    { jack: "JACK-04", title: "Custom Client Platforms", category: "Full Stack", desc: "Delivered bespoke performant web applications and custom CMS solutions." },
  ];

  const displayExperience = rawExperience.length > 0 ? rawExperience : [
    { company: "Unifycx", role: "Web Advisor", startDate: "Jun 2025", endDate: "Present", summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panels." },
    { company: "Freelancer", role: "Full Stack Developer", startDate: "Dec 2024", endDate: "Jun 2025", summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies." },
    { company: "Glowtouch Technologies", role: "Junior Support Engineer", startDate: "Aug 2024", endDate: "Dec 2024", summary: "Provided live chat support for hosting, domain, server, DNS, and WordPress issues." },
    { company: "Vitvara Technologies", role: "Web Developer Intern", startDate: "Jan 2024", endDate: "May 2024", summary: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs." },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-[#39FF6A] font-mono selection:bg-[#39FF6A] selection:text-black">
      {/* LOADER: Indicator Lamps Flicker */}
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
            <Radio className="w-12 h-12 text-[#39FF6A] animate-pulse" />
            <h3 className="mt-4 text-sm uppercase tracking-widest text-[#39FF6A]">POWERING TELEPHONE SWITCHBOARD...</h3>
            <button onClick={() => setLoading(false)} className="mt-3 text-[10px] underline text-[#A8823C]">[SKIP]</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER: Patch Jacks */}
      <header className="border-b border-[#2A2A2A] bg-[#141414] sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#39FF6A] animate-ping" />
            <span className="font-bold text-xs uppercase text-[#FAF2E8]">{candidateName} // SWITCHBOARD</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect("relay", !isMuted);
              }}
              className="h-8 w-8 rounded border border-[#39FF6A]/40 text-[#39FF6A] flex items-center justify-center hover:bg-[#39FF6A] hover:text-black"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <Button asChild size="sm" className="bg-[#39FF6A] text-black font-bold text-xs rounded hover:bg-[#2ECC71]">
              <a href="#operator">Plug into Operator</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* HERO */}
        <section className="p-8 border border-[#2A2A2A] bg-[#1A1A1A] space-y-4 shadow-2xl">
          <div className="text-xs text-[#A8823C]">SYSTEM ONLINE // BAKELITE PATCH PANEL</div>
          <h1 className="text-3xl sm:text-4xl text-[#FAF2E8] font-bold">{candidateName}</h1>
          <p className="text-xs text-[#8E8E8E] leading-relaxed max-w-2xl">{bio}</p>
        </section>

        {/* NUMBERED JACKS PROJECTS */}
        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-[#A8823C]">&gt; PATCH JACKS // SELECT TO ROUTE CALL</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((proj: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveJack(proj);
                  playSoundEffect("relay", isMuted);
                }}
                className="p-6 border border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#39FF6A] cursor-pointer space-y-3 transition"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#A8823C]">{proj.jack || `JACK-0${idx+1}`}</span>
                  <span className="text-[#39FF6A]">[PLUG IN CABLE]</span>
                </div>
                <h3 className="text-lg font-bold text-[#FAF2E8]">{proj.title}</h3>
                <p className="text-xs text-[#8E8E8E]">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CALL LOGS (EXPERIENCE) */}
        <section className="space-y-6 border-t border-[#2A2A2A] pt-8">
          <h2 className="text-sm uppercase tracking-wider text-[#A8823C]">&gt; OPERATOR CALL LOGS // WORK HISTORY</h2>
          <div className="space-y-4">
            {displayExperience.map((exp: any, idx: number) => (
              <div key={idx} className="p-4 border border-[#2A2A2A] bg-[#1A1A1A] flex flex-col sm:flex-row justify-between text-xs gap-2">
                <div>
                  <span className="text-[#FAF2E8] font-bold">{exp.role}</span> @ {exp.company}
                  <p className="text-[#8E8E8E] mt-1">{exp.summary}</p>
                </div>
                <span className="text-[#A8823C]">{exp.startDate} – {exp.endDate || "Present"}</span>
              </div>
            ))}
          </div>
        </section>

        {/* OPERATOR JACK CONTACT */}
        <section id="operator" className="p-8 border border-[#39FF6A] bg-[#1A1A1A] space-y-4 text-center">
          <h3 className="text-xl font-bold text-[#FAF2E8]">PLUG INTO OPERATOR // DIRECT LINE</h3>
          <p className="text-xs text-[#8E8E8E]">{email} · {phone}</p>
          <Button asChild size="sm" className="bg-[#39FF6A] text-black font-bold text-xs rounded px-6">
            <a href={`mailto:${email}`}>Connect Transmission</a>
          </Button>
        </section>
      </main>

      {/* CRT READOUT MODAL */}
      <AnimatePresence>
        {activeJack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="max-w-md w-full border-2 border-[#39FF6A] bg-[#0A0A0A] p-6 space-y-4 relative">
              <button onClick={() => setActiveJack(null)} className="absolute top-4 right-4 text-[#39FF6A]">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold text-[#FAF2E8]">{activeJack.title}</h3>
              <p className="text-xs text-[#39FF6A] leading-relaxed">{activeJack.desc}</p>
              <Button size="sm" onClick={() => setActiveJack(null)} className="bg-[#39FF6A] text-black font-bold text-xs rounded w-full">
                Disconnect Cable
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, Wrench, Gauge } from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";


function playSoundEffect(type: 'trophy' | 'engine' | 'desk' | 'film', isMuted: boolean) {
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

    if (type === 'trophy') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'engine') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'film') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch {}
}


export default function TheMechanicsGarage({ data }: ThemeRendererProps) {
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
  const [activePart, setActivePart] = useState<any | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
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
    <div className="min-h-screen bg-[#14181C] text-[#E0E6ED] font-mono selection:bg-[#E85D35] selection:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#E85D35] text-white font-bold text-xs rounded">
        Skip 3D experience
      </a>

      {/* LOADER: Hydraulic Lift */}
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#0C1014] flex flex-col items-center justify-center p-6 text-center text-[#E0E6ED]">
            <Gauge className="w-12 h-12 text-[#E85D35] animate-spin" />
            <h3 className="mt-4 text-xl font-bold uppercase">Raising Hydraulic Service Bay Lift...</h3>
            <button onClick={() => setLoading(false)} className="mt-3 text-xs underline text-[#7B8B9B]">[Skip]</button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="border-b border-[#2A3440] bg-[#182026]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xs uppercase tracking-widest text-[#E85D35]">{candidateName} // SERVICE GARAGE</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect("engine", !isMuted);
              }}
              className="h-8 w-8 rounded border border-[#2A3440] text-[#E0E6ED] flex items-center justify-center hover:bg-[#2A3440]"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <Button asChild size="sm" className="bg-[#E85D35] text-white font-bold text-xs rounded hover:bg-[#D44A22]">
              <a href="#clipboard">Service Clipboard</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 border-2 border-[#2A3440] bg-[#1A2229] shadow-2xl space-y-4">
          <span className="text-xs text-[#E85D35] uppercase tracking-widest">OPEN-HOOD ENGINE DIAGNOSTICS</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{candidateName}</h1>
          <p className="text-xs text-[#9AAEC2] leading-relaxed max-w-2xl">{bio}</p>
        </section>

        {/* ENGINE COMPONENTS */}
        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-[#E85D35]">&gt; ENGINE COMPONENTS // PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((proj: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setActivePart(proj);
                  playSoundEffect("engine", isMuted);
                }}
                className="p-6 border-2 border-[#2A3440] bg-[#1A2229] hover:border-[#E85D35] transition shadow-xl space-y-3 cursor-pointer"
              >
                <div className="flex justify-between text-xs text-[#E85D35]">
                  <span>PART ST-0{idx + 1}</span>
                  <span>[INSPECT COMPONENT]</span>
                </div>
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-[#9AAEC2]">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LOGS */}
        <section className="space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-[#E85D35]">&gt; SERVICE LOGS // EXPERIENCE</h2>
          <div className="space-y-4">
            {displayExperience.map((exp: any, idx: number) => (
              <div key={idx} className="p-5 border border-[#2A3440] bg-[#1A2229] flex flex-col sm:flex-row justify-between text-xs">
                <div>
                  <span className="text-white font-bold">{exp.role}</span> @ {exp.company}
                  <p className="text-[#9AAEC2] mt-1">{exp.summary}</p>
                </div>
                <span className="text-[#E85D35] shrink-0">{exp.startDate} – {exp.endDate || "Present"}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="clipboard" className="p-8 border-2 border-[#E85D35] bg-[#1A2229] text-center space-y-4 shadow-2xl">
          <h2 className="text-lg font-bold text-white uppercase">MECHANIC SERVICE CLIPBOARD</h2>
          <p className="text-xs text-[#9AAEC2]">{email} · {phone}</p>
          <Button asChild size="sm" className="bg-[#E85D35] text-white font-bold text-xs rounded px-6">
            <a href={`mailto:${email}`}>Submit Service Ticket</a>
          </Button>
        </section>
      </main>

      <AnimatePresence>
        {activePart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <div className="max-w-md w-full border-2 border-[#E85D35] bg-[#1A2229] p-6 space-y-4 relative shadow-2xl text-[#E0E6ED]">
              <button onClick={() => setActivePart(null)} className="absolute top-4 right-4 text-[#E85D35]">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold text-white">{activePart.title}</h3>
              <p className="text-xs text-[#9AAEC2] leading-relaxed">{activePart.desc}</p>
              <Button size="sm" onClick={() => setActivePart(null)} className="bg-[#E85D35] text-white font-bold text-xs rounded w-full">
                Close Inspection
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

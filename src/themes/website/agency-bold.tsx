import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, X, Trophy, Award } from "lucide-react";
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


export default function TheTrophyRoom({ data }: ThemeRendererProps) {
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
  const [activeTrophy, setActiveTrophy] = useState<any | null>(null);

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
    <div className="min-h-screen bg-[#110E09] text-[#F0E6D2] font-sans selection:bg-[#E5B869] selection:text-black">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#E5B869] text-black font-bold text-xs rounded">
        Skip 3D experience
      </a>

      {/* LOADER: Unhook Velvet Rope */}
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#080604] flex flex-col items-center justify-center p-6 text-center text-[#F0E6D2]">
            <Trophy className="w-12 h-12 text-[#E5B869] animate-pulse" />
            <h3 className="mt-4 text-xl font-serif">Unhooking Velvet Gallery Ropes...</h3>
            <button onClick={() => setLoading(false)} className="mt-3 text-xs underline font-mono text-[#A8805F]">[Skip]</button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="border-b border-[#2C2216] bg-[#1A140D]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-wider uppercase text-sm text-[#E5B869]">{candidateName} // TROPHY ROOM</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect("trophy", !isMuted);
              }}
              className="h-8 w-8 rounded-full border border-[#2C2216] text-[#F0E6D2] flex items-center justify-center hover:bg-[#2C2216]"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <Button asChild size="sm" className="bg-[#E5B869] text-black font-bold text-xs rounded-full px-4 hover:bg-[#D4A34F]">
              <a href="#guestbook">Sign Guestbook</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        <section className="p-8 rounded-3xl border border-[#2C2216] bg-[#1A140D] shadow-2xl space-y-4">
          <span className="text-xs font-mono text-[#A8805F] uppercase tracking-widest">SPOTLIT EXHIBITION HALL</span>
          <h1 className="text-4xl sm:text-5xl font-serif leading-tight">{candidateName}</h1>
          <p className="text-sm text-[#C9BBA5] leading-relaxed max-w-2xl">{bio}</p>
        </section>

        {/* VITRINES */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif">Glass Vitrine Showcases // Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((proj: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveTrophy(proj);
                  playSoundEffect("trophy", isMuted);
                }}
                className="p-7 rounded-3xl border border-[#2C2216] bg-[#1A140D] hover:border-[#E5B869] transition shadow-xl space-y-3 cursor-pointer"
              >
                <div className="flex justify-between text-xs font-mono text-[#A8805F]">
                  <span>Vitrine #{idx + 1}</span>
                  <span className="text-[#E5B869]">[EXAMINE PEDESTAL]</span>
                </div>
                <h3 className="text-xl font-bold font-serif">{proj.title}</h3>
                <p className="text-xs text-[#C9BBA5] leading-relaxed">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="space-y-6">
          <h2 className="text-2xl font-serif">Honors &amp; Career Timeline</h2>
          <div className="space-y-4">
            {displayExperience.map((exp: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl border border-[#2C2216] bg-[#1A140D] space-y-2">
                <div className="flex justify-between text-sm">
                  <h3 className="font-bold">{exp.role} @ {exp.company}</h3>
                  <span className="text-xs font-mono text-[#A8805F]">{exp.startDate} – {exp.endDate || "Present"}</span>
                </div>
                <p className="text-xs text-[#C9BBA5]">{exp.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="guestbook" className="p-8 rounded-3xl border border-[#2C2216] bg-[#1A140D] text-center space-y-4 shadow-2xl">
          <h2 className="text-2xl font-serif">Exhibition Guestbook</h2>
          <p className="text-xs text-[#C9BBA5]">{email} · {phone}</p>
          <Button asChild size="sm" className="bg-[#E5B869] text-black font-bold text-xs rounded-full px-6">
            <a href={`mailto:${email}`}>Sign Guestbook &amp; Connect</a>
          </Button>
        </section>
      </main>

      <AnimatePresence>
        {activeTrophy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="max-w-md w-full rounded-3xl border-2 border-[#E5B869] bg-[#1A140D] p-6 space-y-4 relative shadow-2xl text-[#F0E6D2]">
              <button onClick={() => setActiveTrophy(null)} className="absolute top-4 right-4 text-[#A8805F]">
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-xl font-bold font-serif">{activeTrophy.title}</h3>
              <p className="text-xs text-[#C9BBA5] leading-relaxed">{activeTrophy.desc}</p>
              <Button size="sm" onClick={() => setActiveTrophy(null)} className="bg-[#E5B869] text-black font-bold text-xs rounded-full w-full">
                Close Vitrine
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

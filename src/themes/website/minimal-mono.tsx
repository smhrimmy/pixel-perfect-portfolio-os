import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Folder,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";


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


export default function TheLedger({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const links = (data as any)?.socialLinks || (data as any)?.links || {};
  const rawExperience = (data as any)?.experience || [];
  const rawSkills = (data as any)?.skills || [];
  const rawProjects = (data as any)?.projects || (data as any)?.cmsProjects || [];

  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly.";
  const email = profile?.email || links?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || links?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const website = profile?.website || links?.website || "https://praxel.space/";

  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(t);
  }, []);

  const displayExperience = rawExperience.length > 0 ? rawExperience : [
    { company: "Unifycx", role: "Web Advisor", startDate: "Jun 2025", endDate: "Present", summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panels." },
    { company: "Freelancer", role: "Full Stack Developer", startDate: "Dec 2024", endDate: "Jun 2025", summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies." },
    { company: "Glowtouch Technologies", role: "Junior Support Engineer", startDate: "Aug 2024", endDate: "Dec 2024", summary: "Provided live chat support for hosting, domain, server, DNS, and WordPress issues." },
    { company: "Vitvara Technologies", role: "Web Developer Intern", startDate: "Jan 2024", endDate: "May 2024", summary: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs." },
  ];

  const displayProjects = rawProjects.length > 0 ? rawProjects : [
    { id: "p1", title: "Portfolio OS · 20 Tactile Themes", category: "Full Stack", desc: "Full-stack personal operating system with 20 real-world tactile 3D themes, Studio HQ Terminal, and content automation engine." },
    { id: "p2", title: "Praxel Space Cloud Platform", category: "Infrastructure", desc: "High-performance web hosting, domain DNS manager, and automated SSL orchestration portal." },
    { id: "p3", title: "Vitvara Scalable Web App", category: "Frontend", desc: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs." },
    { id: "p4", title: "Custom Client Platforms", category: "Full Stack", desc: "Delivered bespoke performant web applications and custom CMS solutions." },
  ];

  return (
    <div className="min-h-screen bg-[#F0ECE1] text-[#161616] font-mono selection:bg-[#B23B2E] selection:text-white">
      {/* LOADER: Sub-400ms Typed Indexing */}
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-[#F0ECE1] flex items-center justify-center p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B23B2E] animate-pulse">
              &gt; indexing physical ledger records...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER: Index Strip */}
      <header className="border-b-2 border-[#161616] bg-[#F0ECE1] sticky top-0 z-40">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-[#161616] text-[#F0ECE1] font-bold text-xs">CATALOG</span>
            <span className="font-bold text-xs tracking-wider uppercase">{candidateName}</span>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-xs font-bold">
            <a href="#cards" onClick={() => playSoundEffect("typewriter", isMuted)} className="hover:underline">[1] INDEX CARDS</a>
            <a href="#records" onClick={() => playSoundEffect("typewriter", isMuted)} className="hover:underline">[2] CAREER RECORDS</a>
            <a href="#file-slip" onClick={() => playSoundEffect("typewriter", isMuted)} className="hover:underline">[3] FILE SLIP</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect("typewriter", !isMuted);
              }}
              className="h-7 w-7 border border-[#161616] flex items-center justify-center text-xs hover:bg-[#161616] hover:text-[#F0ECE1]"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* HERO: Typed Ledger Intro */}
        <section className="border-2 border-[#161616] p-8 bg-[#FAF7F0] space-y-4 shadow-[4px_4px_0px_#161616]">
          <div className="flex justify-between items-center text-xs text-[#B23B2E] font-bold">
            <span>INDEX CODE: PDL-2026-ENG</span>
            <span>STATUS: ACTIVE / VERIFIED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase">{candidateName} — LEDGER RECORD</h1>
          <p className="text-xs leading-relaxed max-w-2xl">{bio}</p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs border-t border-[#161616]/20">
            <span>LOC: {location}</span>
            <span>TEL: {phone}</span>
            <span>EMAIL: {email}</span>
          </div>
        </section>

        {/* INDEX CARDS FLIPPING SECTION */}
        <section id="cards" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold uppercase tracking-wider">&gt; PROJECT INDEX CARDS (FLIP FOR DETAILS)</h2>
            <span className="text-[10px] text-[#B23B2E]">[CLICK CARD TO FLIP 180°]</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((proj: any) => {
              const isFlipped = flippedCard === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => {
                    setFlippedCard(isFlipped ? null : proj.id);
                    playSoundEffect("typewriter", isMuted);
                  }}
                  className="border-2 border-[#161616] bg-[#FAF7F0] p-6 min-h-[160px] cursor-pointer hover:bg-white transition relative shadow-[4px_4px_0px_#161616]"
                >
                  {!isFlipped ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-[#B23B2E]">
                        <span>[FRONT SIDE]</span>
                        <span>{proj.category}</span>
                      </div>
                      <h3 className="font-bold text-sm">{proj.title}</h3>
                      <p className="text-xs text-[#555] line-clamp-2">{proj.desc}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-[#B23B2E]">
                        <span>[BACK SIDE - VIEWED]</span>
                        <span>VERIFIED</span>
                      </div>
                      <p className="text-xs leading-relaxed">{proj.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CAREER RECORDS */}
        <section id="records" className="space-y-6 border-t-2 border-[#161616] pt-8">
          <h2 className="text-sm font-bold uppercase tracking-wider">&gt; EMPLOYMENT HISTORY LEDGER</h2>
          <div className="border-2 border-[#161616] divide-y-2 divide-[#161616] bg-[#FAF7F0]">
            {displayExperience.map((exp: any, idx: number) => (
              <div key={idx} className="p-4 flex flex-col sm:flex-row justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold">{exp.role}</span> @ {exp.company}
                  <p className="text-[#555] mt-1">{exp.summary}</p>
                </div>
                <span className="text-[#B23B2E] shrink-0">{exp.startDate} – {exp.endDate || "Present"}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FILE SLIP CONTACT */}
        <section id="file-slip" className="border-2 border-[#161616] p-8 bg-[#FAF7F0] space-y-4 shadow-[4px_4px_0px_#161616]">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#B23B2E]">&gt; FILE INQUIRY REQUEST SLIP</h2>
          <p className="text-xs">Direct communications channel with {candidateName}.</p>
          <a
            href={`mailto:${email}`}
            className="inline-block px-6 py-2 bg-[#161616] text-[#F0ECE1] text-xs font-bold hover:bg-[#B23B2E] transition uppercase"
          >
            FILE REQUEST &gt;&gt;
          </a>
        </section>
      </main>
    </div>
  );
}

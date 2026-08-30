import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  MapPin,
  Mail,
  Phone,
  Package,
  Layers,
  Heart,
  Music,
  Smile,
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


export default function TheToyChest({ data }: ThemeRendererProps) {
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
  const linkedin = profile?.linkedin || links?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = profile?.website || links?.website || "https://praxel.space/";
  const github = profile?.github || links?.github || "https://github.com/smhrimmy";

  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeDiorama, setActiveDiorama] = useState<any | null>(null);
  const [musicBoxWound, setMusicBoxWound] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const displayExperience = rawExperience.length > 0 ? rawExperience : [
    { company: "Unifycx", role: "Web Advisor", startDate: "Jun 2025", endDate: "Present", summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panels.", tech: ["WordPress Support", "DNS Management", "SSL"] },
    { company: "Freelancer", role: "Full Stack Developer", startDate: "Dec 2024", endDate: "Jun 2025", summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies.", tech: ["React.js", "TypeScript", "UI/UX Design", "PHP & MySQL"] },
    { company: "Glowtouch Technologies", role: "Junior Support Engineer", startDate: "Aug 2024", endDate: "Dec 2024", summary: "Provided live chat support for hosting, domain, server, DNS, and WordPress issues.", tech: ["Technical Troubleshooting", "WordPress", "DNS"] },
    { company: "Vitvara Technologies", role: "Web Developer Intern", startDate: "Jan 2024", endDate: "May 2024", summary: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs.", tech: ["React.js", "JavaScript", "REST APIs"] },
  ];

  const displayProjects = rawProjects.length > 0 ? rawProjects : [
    { title: "Portfolio OS · 20 Tactile Themes", category: "Full Stack", desc: "Full-stack personal operating system with 20 real-world tactile 3D themes, Studio HQ Terminal, and content automation engine.", tags: ["React", "TypeScript", "Three.js"] },
    { title: "Praxel Space Cloud Platform", category: "Infrastructure", desc: "High-performance web hosting, domain DNS manager, and automated SSL orchestration portal.", tags: ["WordPress", "DNS", "PHP", "SSL"] },
    { title: "Vitvara Scalable Web App", category: "Frontend", desc: "Engineered responsive, user-centric web applications with React.js and scalable REST APIs.", tags: ["React", "JavaScript", "HTML/CSS"] },
    { title: "Custom Client Platforms", category: "Full Stack", desc: "Delivered bespoke performant web applications and custom CMS solutions.", tags: ["React", "Node.js", "PHP"] },
  ];

  return (
    <div className="min-h-screen bg-[#F4EAD9] text-[#4A321E] font-sans overflow-x-hidden selection:bg-[#E87A5D] selection:text-white">
      <a href="#main-content" className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 px-4 py-2 bg-[#8A5A35] text-white font-bold text-xs rounded shadow-lg">
        Skip 3D experience
      </a>

      {/* LOADER: Wooden Chest Lid Opening */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-[#8A5A35] flex flex-col items-center justify-center p-6 text-center text-[#F4EAD9]"
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-[#A66F43] border-4 border-[#F4EAD9] flex items-center justify-center shadow-2xl"
            >
              <Package className="w-10 h-10 text-[#F4EAD9]" />
            </motion.div>
            <h3 className="mt-6 text-xl font-bold font-serif">Opening The Toy Chest...</h3>
            <p className="text-xs text-[#F4EAD9]/80 font-mono mt-1">Lifting handcrafted diorama box lids</p>
            <button onClick={() => setLoading(false)} className="mt-4 text-[10px] underline font-mono">[Skip Loader]</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER: Building Blocks */}
      <header className="border-b-2 border-[#D4C3A3] bg-[#EADCC7]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#8A5A35] text-[#F4EAD9] flex items-center justify-center font-bold shadow-md">
              <Smile className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#4A321E] tracking-wide">{candidateName}</span>
              <span className="text-[10px] text-[#8A5A35] block font-mono">THE TOY CHEST · WOODEN DIORAMAS</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4 text-xs font-bold text-[#8A5A35]">
            <a href="#dioramas" onClick={() => playSoundEffect("boop", isMuted)} className="px-3 py-1 rounded-lg bg-[#F4EAD9] hover:bg-[#8A5A35] hover:text-white transition">
              [■] Dioramas
            </a>
            <a href="#experience" onClick={() => playSoundEffect("boop", isMuted)} className="px-3 py-1 rounded-lg bg-[#F4EAD9] hover:bg-[#8A5A35] hover:text-white transition">
              [▲] Career Blocks
            </a>
            <a href="#musicbox" onClick={() => playSoundEffect("boop", isMuted)} className="px-3 py-1 rounded-lg bg-[#F4EAD9] hover:bg-[#8A5A35] hover:text-white transition">
              [●] Music Box
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                playSoundEffect("boop", !isMuted);
              }}
              className="h-8 w-8 rounded-full border border-[#8A5A35]/30 bg-[#F4EAD9] text-[#8A5A35] flex items-center justify-center hover:bg-[#8A5A35] hover:text-white transition"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            <Button asChild size="sm" className="bg-[#8A5A35] text-white hover:bg-[#724827] font-bold text-xs rounded-full px-4 shadow">
              <a href="#musicbox">Wind Up Contact</a>
            </Button>
          </div>
        </div>
      </header>

      {/* HERO: Hanging Toy Name Tag */}
      <main id="main-content">
        <section className="py-16 px-6 max-w-6xl mx-auto text-center space-y-6">
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block p-6 rounded-3xl border-4 border-[#8A5A35] bg-[#FFF8EE] shadow-xl max-w-lg mx-auto"
          >
            <span className="text-xs font-mono font-bold text-[#E87A5D] uppercase tracking-widest">★ HANDCRAFTED PORTFOLIO CHEST ★</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#4A321E] mt-2 font-serif">{candidateName}</h1>
            <p className="text-sm text-[#8A5A35] font-medium mt-1">Full Stack Developer &amp; Web Advisor</p>
          </motion.div>

          <p className="text-sm sm:text-base text-[#6B4B32] max-w-2xl mx-auto leading-relaxed">
            {bio}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#8A5A35]">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#E87A5D]" /> {location}</span>
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-black"><Phone className="h-4 w-4 text-[#E87A5D]" /> {phone}</a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-black"><Mail className="h-4 w-4 text-[#E87A5D]" /> {email}</a>
          </div>
        </section>

        {/* DIORAMAS PROJECT SHOWCASE */}
        <section id="dioramas" className="py-16 px-6 max-w-6xl mx-auto border-t-2 border-[#D4C3A3] space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E87A5D]">SHOEBOX DIORAMA THEATERS</span>
            <h2 className="text-3xl font-bold text-[#4A321E] font-serif mt-1">Hand-Built Project Showcases</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayProjects.map((proj: any, idx: number) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-7 rounded-3xl border-4 border-[#8A5A35] bg-[#FFF8EE] shadow-lg space-y-4 cursor-pointer"
                onClick={() => {
                  setActiveDiorama(proj);
                  playSoundEffect("boop", isMuted);
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#EADCC7] text-xs font-bold text-[#8A5A35]">
                    Diorama #{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-[#E87A5D] font-bold">[LIFT LID]</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#4A321E] font-serif">{proj.title}</h3>
                  <p className="text-xs text-[#6B4B32] mt-2 leading-relaxed">{proj.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.tags && proj.tags.map((t: string) => (
                    <span key={t} className="px-2.5 py-1 rounded-lg bg-[#EADCC7] text-[10px] font-bold text-[#8A5A35]">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CAREER BLOCKS */}
        <section id="experience" className="py-16 px-6 max-w-6xl mx-auto border-t-2 border-[#D4C3A3] space-y-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E87A5D]">CAREER BLOCKS</span>
            <h2 className="text-3xl font-bold text-[#4A321E] font-serif mt-1">Work History</h2>
          </div>

          <div className="space-y-4">
            {displayExperience.map((exp: any, idx: number) => (
              <div key={idx} className="p-6 rounded-2xl border-2 border-[#C4B292] bg-[#FFF8EE] shadow space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-lg font-bold text-[#4A321E]">
                    {exp.role} <span className="text-[#8A5A35]">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs font-bold text-[#E87A5D]">{exp.startDate} – {exp.endDate || "Present"}</span>
                </div>
                <p className="text-xs text-[#6B4B32] leading-relaxed">{exp.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WIND-UP MUSIC BOX CONTACT */}
        <section id="musicbox" className="py-16 px-6 max-w-6xl mx-auto border-t-2 border-[#D4C3A3] text-center space-y-6">
          <div className="max-w-md mx-auto p-8 rounded-3xl border-4 border-[#8A5A35] bg-[#FFF8EE] shadow-2xl space-y-6">
            <Music className="w-12 h-12 text-[#E87A5D] mx-auto" />
            <h3 className="text-2xl font-bold font-serif text-[#4A321E]">Wind-Up Music Box</h3>
            <p className="text-xs text-[#6B4B32]">
              Turn the wind-up key to unlock direct contact with {candidateName}.
            </p>

            <button
              onClick={() => {
                setMusicBoxWound(w => w + 1);
                playSoundEffect("boop", isMuted);
              }}
              className="px-6 py-2.5 rounded-full bg-[#E87A5D] text-white font-bold text-xs hover:bg-[#D46547] shadow"
            >
              Wind Up Key ({musicBoxWound}/3)
            </button>

            {musicBoxWound >= 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-3 pt-4 border-t-2 border-[#D4C3A3]">
                <p className="text-xs font-bold text-[#8A5A35]">🎵 Music Box Unlocked! Email: {email}</p>
                <Button asChild size="sm" className="bg-[#8A5A35] text-white font-bold text-xs rounded-full w-full">
                  <a href={`mailto:${email}`}>Send Message Now</a>
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* DIORAMA MODAL */}
      <AnimatePresence>
        {activeDiorama && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-lg w-full rounded-3xl border-4 border-[#8A5A35] bg-[#FFF8EE] p-6 text-[#4A321E] space-y-4 relative shadow-2xl"
            >
              <button onClick={() => setActiveDiorama(null)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#EADCC7]">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-2xl font-bold font-serif">{activeDiorama.title}</h3>
              <p className="text-xs text-[#6B4B32] leading-relaxed">{activeDiorama.desc}</p>
              <div className="pt-4 border-t border-[#D4C3A3] flex justify-end">
                <Button size="sm" onClick={() => setActiveDiorama(null)} className="bg-[#8A5A35] text-white rounded-full text-xs">
                  Close Diorama
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

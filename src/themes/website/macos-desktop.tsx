import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  BookOpen,
  Feather,
  PenTool
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playDeskSound(type: 'slide' | 'click' | 'pen' | 'drawer', isMuted: boolean) {
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

    if (type === 'slide') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(350, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'pen') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch {}
}

export default function TheArchitectsStudy({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Principal Architect presiding over handcrafted walnut rolltop desks, precision TypeScript architectures, and sub-100ms resilient digital platforms.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedDrawer, setSelectedDrawer] = useState<any | null>(null);
  const [formSent, setFormSent] = useState(false);

  const drawers = [
    {
      id: "dr-1",
      drawerNum: "DRAWER I / CORE SYSTEMS",
      title: "Portfolio OS Dossier",
      label: "SPATIAL ARCHITECTURE",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "dr-2",
      drawerNum: "DRAWER II / INFRASTRUCTURE",
      title: "Praxel Space Cloud Ledger",
      label: "AUTOMATED DNS",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "dr-3",
      drawerNum: "DRAWER III / APPLICATION SUITE",
      title: "Vitvara Enterprise Folio",
      label: "REACT PLATFORMS",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "dr-4",
      drawerNum: "DRAWER IV / BESPOKE CLIENTS",
      title: "Client Architecture Archives",
      label: "CUSTOM CONTRACTS",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E1610] text-[#EAD8C7] font-serif relative selection:bg-[#B4845C] selection:text-black overflow-x-hidden">
      {/* Woodgrain Leather Vignette */}
      <div className="fixed inset-0 pointer-events-none z-10 shadow-[inset_0_0_150px_rgba(0,0,0,0.85)]" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#2A1E17]/90 border-b border-[#B4845C]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#B4845C]/20 border border-[#B4845C] text-[#B4845C] flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest text-[#F5EDE4] uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B4845C]/20 text-[#B4845C] border border-[#B4845C]/40">ROLLTOP DESK</span>
            </h1>
            <p className="text-[10px] font-mono text-[#D4B499]">{location} · WALNUT STUDY</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playDeskSound('pen', !isMuted);
            }}
            className="w-9 h-9 rounded-xl bg-[#3D2C22] border border-[#B4845C]/40 text-[#EAD8C7] flex items-center justify-center hover:border-[#B4845C] transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-[#B4845C]" />}
          </button>
        </div>
      </header>

      {/* MAIN STUDY STAGE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="text-center space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B4845C]/15 border border-[#B4845C]/40 text-[#B4845C] text-xs font-mono"
          >
            <Feather className="w-3.5 h-3.5" /> SOLID WALNUT METAPHOR · ARCHITECT'S STUDY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-normal tracking-wide text-[#F5EDE4] drop-shadow-[0_2px_20px_rgba(180,132,92,0.3)]"
          >
            The Architect's Rolltop Desk
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#D4B499] font-sans max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>
        </section>

        {/* ROLLTOP DRAWERS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center border-b border-[#B4845C]/30 pb-3">
            <h3 className="text-xl font-normal text-[#F5EDE4] flex items-center gap-2">
              <Folder className="w-5 h-5 text-[#B4845C]" /> Pull-Out Mahogany Drawers
            </h3>
            <span className="text-xs font-mono text-[#B4845C]">CLICK DRAWER TO SLIDE OPEN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {drawers.map((dr) => (
              <motion.div
                key={dr.id}
                whileHover={{ y: -4, borderColor: "#B4845C" }}
                onClick={() => {
                  setSelectedDrawer(dr);
                  playDeskSound('slide', isMuted);
                }}
                className="p-6 rounded-2xl bg-[#2A1E17]/90 border border-[#B4845C]/30 backdrop-blur-md cursor-pointer transition shadow-[0_4px_25px_rgba(0,0,0,0.6)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-[#B4845C] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#B4845C]/10 border border-[#B4845C]/30">{dr.drawerNum}</span>
                  <span className="text-[#F5EDE4]">{dr.label}</span>
                </div>

                <h4 className="text-xl font-bold text-[#F5EDE4] group-hover:text-[#B4845C] transition mb-2">
                  {dr.title}
                </h4>

                <p className="text-xs text-[#D4B499] font-sans leading-relaxed mb-4">
                  {dr.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {dr.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E1610] text-[#EAD8C7] border border-[#B4845C]/20">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-[#B4845C] group-hover:underline">
                  <span>SLIDE OPEN DOSSIER</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DESK STATIONERY CONTACT */}
        <section className="p-8 rounded-3xl bg-[#2A1E17]/90 border border-[#B4845C]/40 shadow-[0_0_40px_rgba(180,132,92,0.15)] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-normal text-[#F5EDE4]">Fountain Pen Letter Stationery</h3>
            <p className="text-xs text-[#D4B499] font-sans">
              Write a personalized dispatch to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-[#B4845C]/10 border border-[#B4845C] text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#B4845C] mx-auto" />
              <p className="font-bold text-[#F5EDE4]">Stationery Sealed and Placed in Walnut Outbox</p>
              <p className="text-xs text-[#D4B499] font-mono">Prajwal DL will review your letter shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playDeskSound('pen', isMuted);
              }}
              className="space-y-4 max-w-xl mx-auto text-xs font-sans"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#B4845C] font-mono mb-1">CORRESPONDENT NAME</label>
                  <input
                    required
                    defaultValue="Distinguished Architect"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1E1610] border border-[#B4845C]/30 text-white focus:outline-none focus:border-[#B4845C]"
                  />
                </div>
                <div>
                  <label className="block text-[#B4845C] font-mono mb-1">RETURN ADDRESS / EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="correspondent@study.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#1E1610] border border-[#B4845C]/30 text-white focus:outline-none focus:border-[#B4845C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#B4845C] font-mono mb-1">LETTER CONTENT</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design with high-performance web systems."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1E1610] border border-[#B4845C]/30 text-white focus:outline-none focus:border-[#B4845C]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#B4845C] text-black font-mono font-bold text-xs hover:bg-[#D4B499] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(180,132,92,0.4)]"
              >
                <Send className="w-4 h-4" /> SEAL & DISPATCH LETTER
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#B4845C]/20 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#D4B499]">
            <span>STUDY: MANGALORE, INDIA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#B4845C] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#B4845C] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#B4845C] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* DRAWER MODAL */}
      <AnimatePresence>
        {selectedDrawer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#2A1E17] border-2 border-[#B4845C] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_50px_rgba(180,132,92,0.5)] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedDrawer(null);
                  playDeskSound('slide', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#B4845C]/10 text-[#B4845C] hover:bg-[#B4845C] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#B4845C]/20 text-[#B4845C] border border-[#B4845C]/40">
                  {selectedDrawer.drawerNum} · {selectedDrawer.label}
                </span>
                <h3 className="text-2xl font-bold text-[#F5EDE4]">{selectedDrawer.title}</h3>
              </div>

              <p className="text-sm text-[#D4B499] font-sans leading-relaxed">
                {selectedDrawer.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#B4845C]">DOSSIER PROTOCOLS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedDrawer.tech.map((t: string) => (
                    <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#1E1610] text-[#EAD8C7] border border-[#B4845C]/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedDrawer.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#B4845C] text-black font-mono font-bold text-xs text-center hover:bg-[#D4B499] transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> VIEW LIVE DOSSIER
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

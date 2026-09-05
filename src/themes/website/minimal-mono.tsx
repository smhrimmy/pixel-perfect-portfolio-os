import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  FolderOpen,
  Hash,
  Archive,
  RotateCw
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playLedgerSound(type: 'flip' | 'stamp' | 'card' | 'typewriter', isMuted: boolean) {
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

    if (type === 'flip') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'stamp') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(900, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    }
  } catch {}
}

export default function TheLedger({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Developer & Web Advisor architecting minimal-footprint, high-reliability software systems, DNS pipelines, and clean digital ledgers.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);

  const cards = [
    {
      id: "card-1",
      catalogNum: "CAT-001/2026",
      title: "Portfolio OS Index",
      classification: "SPATIAL ARCHITECTURE",
      sideA: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      sideB: "Stack: React 19, TypeScript, Three.js, Tailwind CSS. Benchmarked under 50KB core payload with 100/100 Lighthouse performance.",
      liveUrl: "https://praxel.space/",
    },
    {
      id: "card-2",
      catalogNum: "CAT-002/2025",
      title: "Praxel Space Cloud Ledger",
      classification: "DNS AUTOMATION",
      sideA: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      sideB: "Stack: DNS Automation, SSL Certbot, PHP, MySQL. Zero-downtime automated certificate renewal and real-time DNS telemetry.",
      liveUrl: "https://praxel.space/",
    },
    {
      id: "card-3",
      catalogNum: "CAT-003/2024",
      title: "Vitvara Web Records",
      classification: "REACT ENTERPRISE",
      sideA: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      sideB: "Stack: React.js, RESTful microservices, HTML5, CSS3. Modular design tokens with strict type-safety and 99.9% uptime.",
      liveUrl: "https://praxel.space/",
    },
    {
      id: "card-4",
      catalogNum: "CAT-004/2023",
      title: "Enterprise Client Dossiers",
      classification: "BESPOKE ARCHIVES",
      sideA: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      sideB: "Stack: WordPress Custom Themes, Node.js, UI/UX Design. Full end-to-end client satisfaction with multi-regional deployment.",
      liveUrl: "https://praxel.space/",
    },
  ];

  const toggleFlip = (id: string) => {
    setFlippedCardId(flippedCardId === id ? null : id);
    playLedgerSound('flip', isMuted);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#111111] font-mono relative selection:bg-black selection:text-white">
      {/* HEADER: Archival Ledger Bar */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-white/90 border-b border-black backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-black bg-black text-white flex items-center justify-center font-bold text-xs">
            <Archive className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-wider uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-black text-white">LEDGER OS</span>
            </h1>
            <p className="text-[10px] text-zinc-500">{location} · INDEX REGISTER 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playLedgerSound('typewriter', !isMuted);
            }}
            className="w-8 h-8 rounded border border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </header>

      {/* MAIN LEDGER REPOSITORY */}
      <main className="relative z-20 pt-28 pb-20 px-6 max-w-4xl mx-auto space-y-16">
        <section className="space-y-4 pt-4 border-b border-black pb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-600">
            <Hash className="w-3.5 h-3.5" /> ARCHIVAL LEDGER · 180° CARD CATALOG
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black uppercase">
            The Master Index
          </h2>

          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed max-w-2xl">
            {bio}
          </p>
        </section>

        {/* 180° FLIPPABLE 3D CATALOG CARDS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-600">
            <span>INDEXED CARD CATALOG</span>
            <span>CLICK CARD TO ROTATE 180°</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((c) => {
              const isFlipped = flippedCardId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => toggleFlip(c.id)}
                  className="h-64 cursor-pointer perspective-[1000px] select-none"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full relative preserve-3d"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* SIDE A */}
                    <div
                      className="absolute inset-0 bg-white border border-black p-6 rounded-lg flex flex-col justify-between shadow-[4px_4px_0px_#000] backface-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] text-zinc-500 border-b border-zinc-200 pb-2 mb-3">
                          <span className="font-bold text-black">{c.catalogNum}</span>
                          <span>{c.classification}</span>
                        </div>
                        <h4 className="text-base font-bold text-black mb-2">{c.title}</h4>
                        <p className="text-xs text-zinc-600 leading-relaxed">{c.sideA}</p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-bold text-black pt-2 border-t border-zinc-200">
                        <span className="flex items-center gap-1"><RotateCw className="w-3 h-3" /> FLIP FOR TECHNICAL DOSSIER</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>

                    {/* SIDE B */}
                    <div
                      className="absolute inset-0 bg-black text-white border border-black p-6 rounded-lg flex flex-col justify-between shadow-[4px_4px_0px_#888] backface-hidden"
                      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                    >
                      <div>
                        <div className="flex justify-between items-center text-[10px] text-zinc-400 border-b border-zinc-800 pb-2 mb-3">
                          <span className="font-bold text-white">{c.catalogNum}</span>
                          <span>TECHNICAL SPECIFICATION</span>
                        </div>
                        <h4 className="text-base font-bold text-white mb-2">{c.title}</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed">{c.sideB}</p>
                      </div>

                      <div className="flex justify-between items-center text-[10px] font-bold text-white pt-2 border-t border-zinc-800">
                        <a
                          href={c.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> OPEN LIVE RECORD
                        </a>
                        <span>FLIP BACK</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>

        {/* LEDGER FILE REQUEST FORM */}
        <section className="p-8 rounded-lg bg-white border border-black shadow-[6px_6px_0px_#000] space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-black">FILE REQUEST REQUISITION</h3>
            <p className="text-xs text-zinc-600">
              Submit an archival request slip directly to Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-4 bg-zinc-100 border border-black text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-black" />
              <p className="font-bold text-xs">REQUISITION SLIP ARCHIVED</p>
              <p className="text-[10px] text-zinc-500">Prajwal DL will process your requisition slip.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playLedgerSound('stamp', isMuted);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-600 text-[10px] mb-1 font-bold">REQUISITIONER NAME</label>
                  <input
                    required
                    defaultValue="Inspector General"
                    className="w-full px-3 py-2 bg-zinc-50 border border-black text-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 text-[10px] mb-1 font-bold">CONTACT EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="inspector@ledger.gov"
                    className="w-full px-3 py-2 bg-zinc-50 border border-black text-black focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-600 text-[10px] mb-1 font-bold">REQUISITION DETAILS</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting full-stack architecture design and high-performance web optimization."
                  className="w-full px-3 py-2 bg-zinc-50 border border-black text-black focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-black text-white font-bold text-xs hover:bg-zinc-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#555]"
              >
                <Send className="w-3.5 h-3.5" /> SUBMIT REQUISITION SLIP
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-zinc-200 flex flex-wrap justify-between items-center text-[10px] text-zinc-500">
            <span>INDEX REPOSITORY: MANGALORE, INDIA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-black font-bold hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-black font-bold hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-black font-bold hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

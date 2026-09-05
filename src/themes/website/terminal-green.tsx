import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Activity,
  Volume2,
  VolumeX,
  X,
  ArrowUpRight,
  ExternalLink,
  Send,
  CheckCircle2,
  Radio,
  Sliders,
  Cpu,
  Power
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

function playSwitchboardSound(type: 'patch' | 'click' | 'hum' | 'relay', isMuted: boolean) {
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

    if (type === 'patch') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'click') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch {}
}

export default function TheSwitchboard({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Full Stack Developer & Telemetry Operator routing high-voltage digital circuits, automated DNS pipelines, and zero-latency web architectures.";
  const email = profile?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || "+91 8105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const github = profile?.github || "https://github.com/smhrimmy";
  const linkedin = profile?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";

  const [isMuted, setIsMuted] = useState(true);
  const [selectedJack, setSelectedJack] = useState<any | null>(null);
  const [activeCircuit, setActiveCircuit] = useState<string>("CIRCUIT-1");
  const [formSent, setFormSent] = useState(false);
  const [carrierFreq, setCarrierFreq] = useState(14.285);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Phosphor CRT Oscilloscope Waveform Canvas
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

    const render = () => {
      time += 0.03;
      ctx.fillStyle = 'rgba(5, 15, 8, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // CRT Grid Lines
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.06)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3D Phosphor Oscilloscope Waves (Heightfield trace)
      ctx.strokeStyle = '#22C55E';
      ctx.shadowColor = '#22C55E';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 2;

      const cy = canvas.height * 0.45;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 3) {
        const norm = x / canvas.width;
        const wave1 = Math.sin(norm * 18 + time * 3) * 35;
        const wave2 = Math.cos(norm * 32 - time * 2) * 20;
        const noise = (Math.random() - 0.5) * 4;
        const y = cy + wave1 + wave2 + noise;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const jacks = [
    {
      id: "jack-1",
      code: "JACK-01/ALPHA",
      title: "Portfolio OS Telemetry",
      circuit: "CIRCUIT-1",
      voltage: "+12.0 VDC",
      desc: "Full-stack personal operating system with 20 real-world physical metaphors, sub-100ms LCP, and real-time audio synthesis.",
      tech: ["React 19", "Three.js", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "jack-2",
      code: "JACK-02/BETA",
      title: "Praxel Space DNS Switch",
      circuit: "CIRCUIT-2",
      voltage: "+24.0 VDC",
      desc: "Cloud infrastructure platform orchestrating automated SSL certificate provisioning, DNS health diagnostics, and server pipelines.",
      tech: ["DNS Automation", "SSL Certbot", "PHP", "MySQL"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "jack-3",
      code: "JACK-03/GAMMA",
      title: "Vitvara Relay Core",
      circuit: "CIRCUIT-3",
      voltage: "+5.0 VDC",
      desc: "Engineered scalable, user-centric web applications with optimized React state architecture and secure API pipelines.",
      tech: ["React.js", "REST APIs", "Modern CSS", "HTML5"],
      liveUrl: "https://praxel.space/",
    },
    {
      id: "jack-4",
      code: "JACK-04/DELTA",
      title: "Enterprise Client Matrix",
      circuit: "CIRCUIT-4",
      voltage: "+48.0 VDC",
      desc: "Delivered bespoke client web platforms with custom WordPress architectures, secure contact pipelines, and responsive design.",
      tech: ["WordPress", "Node.js", "UI/UX", "Payment Gateways"],
      liveUrl: "https://praxel.space/",
    },
  ];

  const connectJack = (j: any) => {
    setSelectedJack(j);
    setActiveCircuit(j.circuit);
    setCarrierFreq(f => +(f + 0.125).toFixed(3));
    playSwitchboardSound('patch', isMuted);
  };

  return (
    <div className="min-h-screen bg-[#050F08] text-[#22C55E] font-mono relative selection:bg-[#22C55E] selection:text-black overflow-x-hidden">
      {/* CRT Oscilloscope Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px]" />
      <div className="fixed inset-0 pointer-events-none z-10 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)]" />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-40 flex justify-between items-center px-6 py-4 bg-[#08170D]/90 border-b border-[#22C55E]/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#22C55E]/10 border border-[#22C55E] flex items-center justify-center text-[#22C55E] shadow-[0_0_10px_#22C55E]">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
              <span>{candidateName}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]">SWITCHBOARD</span>
            </h1>
            <p className="text-[10px] text-[#86EFAC]">{location} · FREQ: {carrierFreq} MHz · ACTIVE: {activeCircuit}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playSwitchboardSound('click', !isMuted);
            }}
            className="w-9 h-9 rounded bg-[#0A2012] border border-[#22C55E]/50 text-[#22C55E] flex items-center justify-center hover:bg-[#22C55E] hover:text-black transition cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-emerald-800" /> : <Volume2 className="w-4 h-4 text-[#22C55E]" />}
          </button>
        </div>
      </header>

      {/* MAIN OPERATOR CONSOLE */}
      <main className="relative z-20 pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
        <section className="p-8 rounded-2xl bg-[#08170D]/90 border-2 border-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.2)] space-y-4">
          <div className="flex justify-between items-center text-xs text-[#86EFAC] border-b border-[#22C55E]/30 pb-3">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-[#22C55E]" /> ANALOG SWITCHBOARD CONSOLE</span>
            <span className="text-[#22C55E] font-bold">CARRIER ONLINE · 24/7 DUPLEX</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-wider uppercase drop-shadow-[0_0_10px_#22C55E]">
            ROUTING HIGH-VOLTAGE <span className="text-[#86EFAC]">SYSTEMS</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#86EFAC] leading-relaxed max-w-2xl">
            {bio}
          </p>
        </section>

        {/* PATCH JACK MATRIX */}
        <section className="space-y-6">
          <div className="flex justify-between items-center text-xs text-[#86EFAC] border-b border-[#22C55E]/30 pb-3">
            <span className="flex items-center gap-2"><Sliders className="w-4 h-4" /> PATCH CABLE TERMINATION JACKS</span>
            <span>PLUG IN TO ROUTE SIGNAL</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jacks.map((j) => (
              <motion.div
                key={j.id}
                whileHover={{ scale: 1.02, borderColor: "#22C55E" }}
                onClick={() => connectJack(j)}
                className="p-6 rounded-xl bg-[#08170D] border border-[#22C55E]/40 cursor-pointer transition shadow-[0_4px_20px_rgba(0,0,0,0.6)] group relative"
              >
                <div className="flex justify-between items-center text-[10px] text-[#86EFAC] mb-3">
                  <span className="px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30">{j.code}</span>
                  <span className="text-white font-bold">{j.voltage}</span>
                </div>

                <h4 className="text-lg font-bold text-white group-hover:text-[#22C55E] transition mb-2">
                  {j.title}
                </h4>

                <p className="text-xs text-[#86EFAC] leading-relaxed mb-4">
                  {j.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {j.tech.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-[#050F08] text-[#22C55E] border border-[#22C55E]/30">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#22C55E] group-hover:underline">
                  <span>PATCH INTO CIRCUIT ({j.circuit})</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SWITCHBOARD DISPATCH FORM */}
        <section className="p-8 rounded-2xl bg-[#08170D]/90 border-2 border-[#22C55E] shadow-[0_0_30px_rgba(34,197,94,0.2)] space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white uppercase">DIRECT CARRIER PATCH REQUEST</h3>
            <p className="text-xs text-[#86EFAC]">
              Transmit immediate priority signal to operator Prajwal DL ({email}).
            </p>
          </div>

          {formSent ? (
            <div className="p-4 bg-[#22C55E]/10 border border-[#22C55E] text-center space-y-1 rounded-xl">
              <CheckCircle2 className="w-6 h-6 mx-auto text-[#22C55E]" />
              <p className="font-bold text-xs text-white">PATCH REQUEST ROUTED TO SWITCHBOARD</p>
              <p className="text-[10px] text-[#86EFAC]">Prajwal DL will accept the carrier connection.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSent(true);
                playSwitchboardSound('relay', isMuted);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#86EFAC] text-[10px] mb-1 font-bold">CALLER CALLSIGN</label>
                  <input
                    required
                    defaultValue="External Trunk Operator"
                    className="w-full px-3 py-2 bg-[#050F08] border border-[#22C55E]/40 text-white focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
                <div>
                  <label className="block text-[#86EFAC] text-[10px] mb-1 font-bold">RETURN FREQUENCY / EMAIL</label>
                  <input
                    required
                    type="email"
                    defaultValue="operator@telecom.org"
                    className="w-full px-3 py-2 bg-[#050F08] border border-[#22C55E]/40 text-white focus:outline-none focus:border-[#22C55E]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#86EFAC] text-[10px] mb-1 font-bold">TRANSMISSION MESSAGE</label>
                <textarea
                  rows={3}
                  required
                  defaultValue="Requesting direct consultation on full-stack architecture and high-reliability systems."
                  className="w-full px-3 py-2 bg-[#050F08] border border-[#22C55E]/40 text-white focus:outline-none focus:border-[#22C55E]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-[#22C55E] text-black font-bold text-xs hover:bg-[#86EFAC] transition flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_#22C55E]"
              >
                <Send className="w-3.5 h-3.5" /> DISPATCH CARRIER PACKET
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[#22C55E]/30 flex flex-wrap justify-between items-center text-[10px] text-[#86EFAC]">
            <span>EXCHANGE: MANGALORE, INDIA</span>
            <div className="flex gap-4">
              <a href={github} target="_blank" rel="noreferrer" className="text-[#22C55E] hover:underline">GITHUB</a>
              <a href={linkedin} target="_blank" rel="noreferrer" className="text-[#22C55E] hover:underline">LINKEDIN</a>
              <a href="https://praxel.space/" target="_blank" rel="noreferrer" className="text-[#22C55E] hover:underline">PRAXEL.SPACE</a>
            </div>
          </div>
        </section>
      </main>

      {/* JACK MODAL */}
      <AnimatePresence>
        {selectedJack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#08170D] border-2 border-[#22C55E] rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-[0_0_40px_#22C55E] relative space-y-6"
            >
              <button
                onClick={() => {
                  setSelectedJack(null);
                  playSwitchboardSound('click', isMuted);
                }}
                className="absolute top-5 right-5 w-8 h-8 rounded bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E] hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]">
                  {selectedJack.code} · {selectedJack.voltage}
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedJack.title}</h3>
              </div>

              <p className="text-xs text-[#86EFAC] leading-relaxed">
                {selectedJack.desc}
              </p>

              <div className="space-y-2">
                <span className="text-xs text-[#22C55E]">CIRCUIT PROTOCOLS</span>
                <div className="flex flex-wrap gap-2">
                  {selectedJack.tech.map((t: string) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded bg-[#050F08] text-[#22C55E] border border-[#22C55E]/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={selectedJack.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-lg bg-[#22C55E] text-black font-bold text-xs text-center hover:bg-[#86EFAC] transition flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> OPEN LIVE TRUNK
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

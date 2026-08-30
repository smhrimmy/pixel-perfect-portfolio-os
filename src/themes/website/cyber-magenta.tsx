import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Gamepad2, Play, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheArcadeCabinet({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const games = (projects && projects.length > 0 ? projects : [
    { title: "CYBER ATTACK 2077 · STAGE 1", score: "999,990 PTS", desc: "Defend distributed microservice clusters from rogue token payloads." },
    { title: "RASTER RUNNER · STAGE 2", score: "840,200 PTS", desc: "High-speed WebGL fragment shader evasion course running at 120 FPS." },
    { title: "POSTGRES INVADERS · STAGE 3", score: "720,150 PTS", desc: "Execute zero-latency query transactions before the buffer pool overflows." },
  ]);

  const [activeGame, setActiveGame] = useState(0);

  return (
    <div className="min-h-screen bg-[#0D021A] text-[#F3E8FF] font-mono p-6 sm:p-12 flex flex-col justify-between selection:bg-[#FF007F] selection:text-black">
      <header className="border-b-2 border-[#FF007F]/40 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Gamepad2 className="h-6 w-6 text-[#00F0FF]" />
          <div>
            <h1 className="text-base font-black text-[#F3E8FF] tracking-widest">THE RETRO ARCADE CABINET</h1>
            <p className="text-[10px] text-[#FF007F]">INSERT 1 COIN TO PLAY · PLAYER 1: {candidateName}</p>
          </div>
        </div>
        <div className="text-xs font-bold text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1 rounded border border-[#00F0FF]/40">
          CREDITS: 99
        </div>
      </header>

      <main className="my-12 max-w-3xl mx-auto w-full space-y-8">
        <div className="text-center space-y-1">
          <span className="text-xs text-[#00F0FF] tracking-widest">★ 3D CRT CHASSIS ENCLOSURE ★</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FF007F] tracking-tight">HIGH SCORE VAULT</h2>
        </div>

        {/* Physical Curved CRT Screen Box */}
        <div className="p-8 sm:p-12 rounded-3xl border-4 border-[#00F0FF] bg-[#05000A] shadow-[0_0_50px_rgba(255,0,127,0.3)] space-y-6 relative overflow-hidden">
          <div className="flex justify-between items-center text-xs border-b border-[#FF007F]/30 pb-3 text-[#00F0FF]">
            <span>{games[activeGame].score}</span>
            <span className="text-[#FF007F]">HI-SCORE: 1,000,000</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-[#F3E8FF] uppercase">{games[activeGame].title}</h3>
          <p className="text-xs sm:text-sm text-[#D8B4FE] leading-relaxed">{games[activeGame].desc || games[activeGame].description}</p>

          <div className="pt-6 border-t border-[#FF007F]/30 flex justify-between items-center text-xs text-[#00F0FF]">
            <span>JOYSTICK: 8-WAY DIGITAL</span>
            <span className="font-bold text-[#FF007F]">READY PLAYER ONE</span>
          </div>
        </div>

        {/* Joystick & Button Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setActiveGame((g) => (g + 1) % games.length)}
            className="bg-[#FF007F] text-black hover:bg-[#FF007F]/90 font-black text-xs h-12 px-8 rounded-full shadow-[0_0_20px_rgba(255,0,127,0.5)]"
          >
            Press Button A: Next Stage →
          </Button>
        </div>
      </main>

      <footer className="border-t-2 border-[#FF007F]/40 pt-4 text-center text-xs text-[#D8B4FE]">
        <span>ARCADE TIME: 1984 · ALL SCORES SAVED TO EEPROM</span>
      </footer>
    </div>
  );
}

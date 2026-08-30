import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Flame, Sparkles, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThePottersStudio({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const vessels = (projects && projects.length > 0 ? projects : [
    { title: "TERRACOTTA AMPHORA · DISTRIBUTED CORE", glaze: "Iron Oxide Wash", desc: "Coiled and wheel-thrown clay vessel designed to hold continuous streaming data." },
    { title: "CELADON PORCELAIN VASE · SHADER RUNTIME", glaze: "Crackled Celadon", desc: "High-fired porcelain fired at 1300°C in an authentic wood-fired kiln." },
    { title: "STONEWARE BOWL · AUTONOMOUS AGENTS", glaze: "Matte Ash Glaze", desc: "Hand-pinched organic stoneware built for extreme resilience." },
  ]);

  const [activeVessel, setActiveVessel] = useState(0);

  return (
    <div className="min-h-screen bg-[#2E1810] text-[#F3E5D8] font-serif p-6 sm:p-12 flex flex-col justify-between selection:bg-[#C85A32] selection:text-white">
      <header className="border-b border-[#6E3B27] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Flame className="h-6 w-6 text-[#C85A32]" />
          <div>
            <h1 className="text-base font-bold text-[#F3E5D8] uppercase tracking-wider">THE POTTER'S WHEEL &amp; KILN</h1>
            <p className="text-[11px] text-[#A66E53]">TERRACOTTA · WOOD KILN 1300°C · {candidateName}</p>
          </div>
        </div>
        <div className="text-xs font-mono text-[#C85A32]">
          KILN TEMPERATURE: 1280°C
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#C85A32] uppercase tracking-widest font-mono">WHEEL-THROWN CERAMICS</span>
          <h2 className="text-3xl sm:text-5xl text-[#F3E5D8] italic">Molding Raw Earth Into Code</h2>
        </div>

        {/* Physical Glazed Clay Vessel Card */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-[#6E3B27] bg-[#432317] shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#A66E53] border-b border-[#6E3B27] pb-3">
            <span>GLAZE: {vessels[activeVessel].glaze}</span>
            <span className="text-[#C85A32]">WOOD-FIRED CERAMIC</span>
          </div>

          <h3 className="text-2xl sm:text-4xl text-[#F3E5D8] font-bold">{vessels[activeVessel].title}</h3>
          <p className="text-sm text-[#D4B89B] leading-relaxed italic">{vessels[activeVessel].desc || vessels[activeVessel].description}</p>

          <div className="pt-6 border-t border-[#6E3B27] flex justify-between items-center text-xs font-mono">
            <span>MASTER POTTER: {candidateName.toUpperCase()}</span>
            <span className="text-[#C85A32]">FIRED &amp; WATERPROOF</span>
          </div>
        </div>

        {/* Spin Pottery Wheel Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveVessel((v) => (v + 1) % vessels.length)}
            className="bg-[#C85A32] text-[#2E1810] hover:bg-[#C85A32]/90 font-bold text-xs h-11 px-8 rounded-full shadow-xl"
          >
            <RotateCw className="h-4 w-4 mr-2" /> Spin Wheel: Throw Next Clay Form →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#6E3B27] pt-4 text-center text-xs text-[#A66E53]">
        <span>THE EARTHEN STUDIO · NATURAL ASH &amp; SLIP CERAMICS</span>
      </footer>
    </div>
  );
}

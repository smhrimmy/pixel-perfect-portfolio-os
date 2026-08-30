import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Gem, Eye, Sparkles, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheGemCuttersTable({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const gems = (projects && projects.length > 0 ? projects : [
    { title: "BRILLIANT CUT DIAMOND · DISTRIBUTED ENGINE", cut: "57 Facet Brilliant", desc: "Precision optical symmetry achieving 100% internal light reflection across microservice nodes." },
    { title: "EMERALD STEP CUT · 3D WEBGL SHADERS", cut: "Octagonal Step Cut", desc: "Vivid deep green crystal matrix exhibiting zero optical dispersion distortion." },
    { title: "BURMESE RUBY CABOCHON · AUTONOMOUS CLUSTERS", cut: "Smooth Cabochon", desc: "Asterism star effect radiating across multi-agent consensus networks." },
  ]);

  const [activeGem, setActiveGem] = useState(0);

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F0F0F5] font-sans p-6 sm:p-12 flex flex-col justify-between selection:bg-[#E0E0FF] selection:text-black">
      <header className="border-b border-[#2A2A33] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Gem className="h-6 w-6 text-[#A0A0FF]" />
          <div>
            <h1 className="text-base font-bold text-[#F0F0F5] uppercase tracking-wider">THE GEM CUTTER'S TABLE</h1>
            <p className="text-[11px] text-[#808099]">BLACK VELVET TRAY · 10X JEWELER'S LOUPE · {candidateName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#A0A0FF]">
          <ZoomIn className="h-4 w-4" />
          <span>LOUPE DISPERSION: 10X</span>
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#A0A0FF] uppercase tracking-widest font-mono">FACETED GEMSTONE TRAY</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#F0F0F5]">Optical Light Refractions</h2>
        </div>

        {/* Physical Black Velvet Gem Card */}
        <div className="p-8 sm:p-12 rounded-3xl border border-[#3A3A4A] bg-[#121217] shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#808099] border-b border-[#2A2A33] pb-3">
            <span>CUT: {gems[activeGem].cut}</span>
            <span className="text-[#A0A0FF]">FLAWLESS CLARITY</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-[#F0F0F5]">{gems[activeGem].title}</h3>
          <p className="text-sm text-[#B0B0C5] leading-relaxed">{gems[activeGem].desc || gems[activeGem].description}</p>

          <div className="pt-6 border-t border-[#2A2A33] flex justify-between items-center text-xs font-mono">
            <span>LAPIDARY: {candidateName.toUpperCase()}</span>
            <span className="text-[#A0A0FF]">GIA CERTIFIED</span>
          </div>
        </div>

        {/* Examine Next Gem */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveGem((g) => (g + 1) % gems.length)}
            className="bg-[#E0E0FF] text-black hover:bg-[#C0C0FF] font-bold text-xs h-11 px-8 rounded-full shadow-lg"
          >
            Adjust Loupe: Inspect Next Gemstone →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#2A2A33] pt-4 text-center text-xs text-[#808099]">
        <span>ROYAL LAPIDARY GUILD · ALL GEMSTONES ETHICALLY POLISHED</span>
      </footer>
    </div>
  );
}

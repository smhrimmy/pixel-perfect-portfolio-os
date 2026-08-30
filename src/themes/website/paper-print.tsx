import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { PenTool, Ruler, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheDraftingTable({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const blueprints = (projects && projects.length > 0 ? projects : [
    { title: "SHEET A-101 · STRUCTURAL ELEVATIONS", scale: "1/4\" = 1'-0\"", desc: "Schematic structural blueprint for high-concurrency microservices and load balancers." },
    { title: "SHEET A-102 · SPATIAL 3D SECTION VIEW", scale: "1/2\" = 1'-0\"", desc: "Orthographic cross-section revealing GPU buffer allocation and vertex transformation pipelines." },
    { title: "SHEET A-103 · FOUNDATION & POSTGRES FOOTINGS", scale: "1\" = 1'-0\"", desc: "Reinforced database footings with point-in-time recovery shear walls." },
  ]);

  const [activeSheet, setActiveSheet] = useState(0);

  return (
    <div className="min-h-screen bg-[#0E2841] text-[#EAF2F8] font-mono p-6 sm:p-12 flex flex-col justify-between selection:bg-[#FFFFFF] selection:text-[#0E2841]">
      <header className="border-b-2 border-white/20 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Ruler className="h-6 w-6 text-cyan-300" />
          <div>
            <h1 className="text-base font-bold text-[#EAF2F8] uppercase tracking-wider">THE ARCHITECT'S DRAFTING TABLE</h1>
            <p className="text-[11px] text-cyan-300">CYANOTYPE BLUEPRINT · T-SQUARE ALIGNED · {candidateName}</p>
          </div>
        </div>
        <span className="text-xs text-cyan-300 border border-cyan-300/40 px-2 py-0.5 rounded">
          T-SQUARE: LOCKED 90°
        </span>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-cyan-300 uppercase tracking-widest">[WHITE INK ON BLUEPRINT SHEET]</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#EAF2F8]">STRUCTURAL BLUEPRINTS</h2>
        </div>

        {/* Physical Blueprint Sheet Card */}
        <div className="p-8 sm:p-12 rounded-none border-2 border-white bg-[#0A1F33] shadow-[10px_10px_0px_#05121E] space-y-6 relative">
          {/* Blueprint Grid Lines Background */}
          <div className="flex justify-between items-center text-xs text-cyan-300 border-b border-white/20 pb-3">
            <span>SCALE: {blueprints[activeSheet].scale}</span>
            <span>REVISION: DELTA-4</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-bold text-[#EAF2F8]">{blueprints[activeSheet].title}</h3>
          <p className="text-sm text-[#BBD5EB] leading-relaxed">{blueprints[activeSheet].desc || blueprints[activeSheet].description}</p>

          <div className="pt-6 border-t border-white/20 flex justify-between items-center text-xs text-cyan-300">
            <span>LEAD ARCHITECT: {candidateName.toUpperCase()}</span>
            <span className="text-white font-bold">STAMPED &amp; SEALED</span>
          </div>
        </div>

        {/* Blueprint Sheet Switcher */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveSheet((s) => (s + 1) % blueprints.length)}
            className="bg-white text-[#0E2841] hover:bg-cyan-100 font-bold text-xs h-11 px-8 rounded-none border-2 border-white shadow-[4px_4px_0px_#05121E]"
          >
            Slide T-Square: Next Blueprint Sheet →
          </Button>
        </div>
      </main>

      <footer className="border-t-2 border-white/20 pt-4 text-center text-xs text-cyan-300">
        <span>BUREAU OF ARCHITECTURAL &amp; SYSTEM PLANNING · DRAWING APPROVED</span>
      </footer>
    </div>
  );
}

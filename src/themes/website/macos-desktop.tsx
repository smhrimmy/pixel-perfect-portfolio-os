import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Folder, Inbox, Compass, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheArchitectsStudy({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const drawers = (projects && projects.length > 0 ? projects : [
    { title: "DRAWER 01: SPATIAL COMPUTING SCHEMATICS", tag: "Oak Slide A", desc: "Original blueprints detailing real-time WebGL polygon clipping and viewport transformations." },
    { title: "DRAWER 02: AUTONOMOUS AGENT PROTOCOLS", tag: "Oak Slide B", desc: "Rolodex filing cards coordinating consensus contracts across multi-model microservices." },
    { title: "DRAWER 03: CLOUD PERSISTENCE VAULT", tag: "Oak Slide C", desc: "Brass-keyed drawer containing disaster recovery blueprints and transaction write-ahead logs." },
  ]);

  const [activeDrawer, setActiveDrawer] = useState(0);

  return (
    <div className="min-h-screen bg-[#241710] text-[#EADBCE] font-serif p-6 sm:p-12 flex flex-col justify-between selection:bg-[#8B5A2B] selection:text-white">
      <header className="border-b border-[#543625] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Folder className="h-6 w-6 text-[#C29267]" />
          <div>
            <h1 className="text-base font-bold text-[#F5EBE1] uppercase tracking-wider">THE ARCHITECT'S ROLLTOP DESK</h1>
            <p className="text-[11px] text-[#A8805F]">SOLID OAK DESK · SLIDING DRAWERS · ROLODEX DOCK · {candidateName}</p>
          </div>
        </div>
        <span className="text-xs font-mono text-[#C29267]">DESK COMPARTMENT {activeDrawer + 1} OF {drawers.length}</span>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#C29267] uppercase tracking-widest font-mono">ROLLTOP DRAWERS</span>
          <h2 className="text-3xl sm:text-5xl text-[#F5EBE1] italic">Filed Architectural Papers</h2>
        </div>

        {/* Physical Oak Rolltop Drawer Card */}
        <div className="p-8 sm:p-12 rounded-2xl border-2 border-[#543625] bg-[#362217] shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#A8805F] border-b border-[#543625] pb-3">
            <span>SLIDE: {drawers[activeDrawer].tag}</span>
            <span className="text-[#C29267]">BRASS HARDWARE LOCKED</span>
          </div>

          <h3 className="text-2xl sm:text-4xl text-[#F5EBE1] font-bold">{drawers[activeDrawer].title}</h3>
          <p className="text-sm text-[#D4C0AD] leading-relaxed italic">{drawers[activeDrawer].desc || drawers[activeDrawer].description}</p>

          <div className="pt-6 border-t border-[#543625] flex justify-between items-center text-xs font-mono text-[#A8805F]">
            <span>PRINCIPAL ARCHITECT: {candidateName.toUpperCase()}</span>
            <span className="text-[#C29267]">DRAWINGS SECURED</span>
          </div>
        </div>

        {/* Slide Open Next Drawer */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveDrawer((d) => (d + 1) % drawers.length)}
            className="bg-[#C29267] text-[#241710] hover:bg-[#C29267]/90 font-bold text-xs h-11 px-8 rounded-full shadow-lg"
          >
            Slide Open Next Oak Drawer →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#543625] pt-4 text-center text-xs text-[#A8805F]">
        <span>THE PRIVATE STUDY OF ARCHITECTURE · CRAFTED IN SOLID OAK</span>
      </footer>
    </div>
  );
}

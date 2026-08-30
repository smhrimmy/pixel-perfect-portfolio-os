import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Leaf, Bookmark, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheHerbarium({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const specimens = (projects && projects.length > 0 ? projects : [
    { title: "FOLIUM ALGORITHMICA · TAXONOMY 01", latin: "Rosa systematica Linnaeus", desc: "Pressed wild flora specimen catalogued for computational resiliency and fault tolerance." },
    { title: "RADIX DISTRIBUTA · TAXONOMY 02", latin: "Filix webglica Mirbel", desc: "Botanical roots harvested from deep mathematical shader forests." },
    { title: "FLOS INTELLIGENTIA · TAXONOMY 03", latin: "Orchis automatica Smith", desc: "Rare perennial blossom blooming in autonomous multi-agent environments." },
  ]);

  const [activeSpecimen, setActiveSpecimen] = useState(0);

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#2D312E] font-serif p-6 sm:p-12 flex flex-col justify-between selection:bg-[#588157] selection:text-white">
      <header className="border-b border-[#CCD5AE] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Leaf className="h-6 w-6 text-[#588157]" />
          <div>
            <h1 className="text-base font-bold text-[#2D312E] uppercase tracking-wider">THE PRESSED HERBARIUM</h1>
            <p className="text-[11px] text-[#588157]">BOTANICAL SPECIMEN FOLIO · {candidateName}</p>
          </div>
        </div>
        <span className="text-xs font-mono text-[#588157]">SPECIMEN {activeSpecimen + 1} OF {specimens.length}</span>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#588157] uppercase tracking-widest font-mono">HERBARIUM CLASSIFICATION</span>
          <h2 className="text-3xl sm:text-5xl text-[#2D312E] italic">Preserved Botanical Folios</h2>
        </div>

        {/* Physical Specimen Mounting Card */}
        <div className="p-8 sm:p-12 rounded-2xl border border-[#CCD5AE] bg-[#FCFAF5] shadow-[8px_8px_0px_#CCD5AE] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#588157] border-b border-[#CCD5AE] pb-3">
            <span className="italic">{specimens[activeSpecimen].latin}</span>
            <span>HERBARIUM REGISTERED</span>
          </div>

          <h3 className="text-2xl sm:text-3xl text-[#2D312E] font-bold">{specimens[activeSpecimen].title}</h3>
          <p className="text-sm text-[#4F5D53] leading-relaxed italic">{specimens[activeSpecimen].desc || specimens[activeSpecimen].description}</p>

          <div className="pt-6 border-t border-[#CCD5AE] flex justify-between items-center text-xs font-mono text-[#588157]">
            <span>COLLECTED BY: {candidateName.toUpperCase()}</span>
            <span>DRIED UNDER GLASS</span>
          </div>
        </div>

        {/* Turn Botanical Page */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveSpecimen((s) => (s + 1) % specimens.length)}
            className="bg-[#588157] text-[#FCFAF5] hover:bg-[#588157]/90 font-bold text-xs h-11 px-8 rounded-full shadow-md"
          >
            Turn Herbarium Page: Next Specimen →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#CCD5AE] pt-4 text-center text-xs text-[#588157]">
        <span>DEPARTMENT OF BOTANY &amp; SYSTEMS ARCHITECTURE · PRESERVED IN PERPETUITY</span>
      </footer>
    </div>
  );
}

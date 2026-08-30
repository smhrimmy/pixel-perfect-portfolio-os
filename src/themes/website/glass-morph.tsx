import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Flower2, Sun, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheGreenhouse({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const plants = (projects && projects.length > 0 ? projects : [
    { title: "ORCHID SPECIMEN · AUTONOMOUS CLUSTER", bloom: "In Full Bloom", desc: "A rare generative system nourished by real-time telemetry inputs." },
    { title: "FERN SPECIMEN · 3D PROCEDURAL SHADER", bloom: "Sprouting Vigorously", desc: "Mathematical fractal foliage rendered with real-time chlorophyll dispersion." },
    { title: "BOTANICAL SPECIMEN · EDGE CACHE ENGINE", bloom: "Perennial Growth", desc: "Deep-rooted PostgreSQL replication resistant to cold-start droughts." },
  ]);

  const [activePlant, setActivePlant] = useState(0);

  return (
    <div className="min-h-screen bg-[#0C1A14] text-[#E2F0D9] font-sans p-6 sm:p-12 flex flex-col justify-between selection:bg-[#2D6A4F] selection:text-white">
      <header className="border-b border-[#1B4332] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Flower2 className="h-6 w-6 text-[#52B788]" />
          <div>
            <h1 className="text-base font-bold text-[#E2F0D9] uppercase tracking-wider">THE BOTANICAL GREENHOUSE</h1>
            <p className="text-[11px] text-[#74C69D]">GLASSHOUSE CONSERVATORY · HUMIDITY 88% · {candidateName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#52B788]">
          <Droplets className="h-4 w-4" />
          <span>CONDENSATION SHADER ACTIVE</span>
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#52B788] uppercase tracking-widest font-mono">CONSERVATORY SPECIMENS</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#E2F0D9]">Living Digital Flora</h2>
        </div>

        {/* Real Glass Greenhouse Pane Card */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-[#2D6A4F] bg-[#11271E]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#74C69D] border-b border-[#1B4332] pb-3">
            <span>{plants[activePlant].bloom}</span>
            <span className="text-[#52B788]">PHOTOSYNTHESIS ACTIVE</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-[#E2F0D9]">{plants[activePlant].title}</h3>
          <p className="text-sm text-[#B7E4C7] leading-relaxed">{plants[activePlant].desc || plants[activePlant].description}</p>

          <div className="pt-6 border-t border-[#1B4332] flex justify-between items-center text-xs font-mono">
            <span>BOTANIST: {candidateName.toUpperCase()}</span>
            <span className="text-[#52B788]">HARDY PERENNIAL</span>
          </div>
        </div>

        {/* Plant Switcher */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => setActivePlant((p) => (p + 1) % plants.length)}
            className="bg-[#52B788] text-[#081C15] hover:bg-[#52B788]/90 font-bold text-xs h-11 px-8 rounded-full shadow-lg"
          >
            Inspect Next Living Specimen →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#1B4332] pt-4 text-center text-xs text-[#74C69D]">
        <span>THE ROYAL BOTANIC CONSERVATORY · ALL SPECIMENS FLOURISHING</span>
      </footer>
    </div>
  );
}

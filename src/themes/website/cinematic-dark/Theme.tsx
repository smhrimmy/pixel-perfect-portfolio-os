import { useState } from "react";
import type { ThemeRendererProps } from "../../types";
import { Film, Clapperboard, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheProjectionRoom({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const reels = (projects && projects.length > 0 ? projects : [
    { title: "35MM REEL 01: THE SPATIAL 3D CINEMA", format: "35mm Nitrate Film", desc: "Archival motion picture print projected through an authentic carbon-arc lamp at 24 frames per second." },
    { title: "70MM REEL 02: AUTONOMOUS AGENT ODYSSEY", format: "70mm Todd-AO Widescreen", desc: "High-fidelity widescreen film stock capturing multi-agent orchestration choreography." },
    { title: "16MM REEL 03: CLOUD ENGINE CHRONICLES", format: "16mm Reversal Stock", desc: "Tactile optical film grain revealing distributed microservice infrastructure." },
  ]);

  const [activeReel, setActiveReel] = useState(0);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#EFEBE4] font-serif p-6 sm:p-12 flex flex-col justify-between selection:bg-[#E5A93C] selection:text-black">
      <header className="border-b border-[#25252E] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Film className="h-6 w-6 text-[#E5A93C]" />
          <div>
            <h1 className="text-base font-bold text-[#EFEBE4] uppercase tracking-wider">THE 35MM PROJECTION BOOTH</h1>
            <p className="text-[11px] text-[#8C8A99]">CARBON-ARC LAMP · DUST IN BEAM · {candidateName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C]">
          <Video className="h-4 w-4" />
          <span>PROJECTOR SPEED: 24 FPS</span>
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#E5A93C] uppercase tracking-widest font-mono">LIGHTBOX FILMSTRIP</span>
          <h2 className="text-3xl sm:text-5xl text-[#EFEBE4] italic">Optical Nitrate Projections</h2>
        </div>

        {/* Physical Lightbox Film Reel Card */}
        <div className="p-8 sm:p-12 rounded-2xl border-2 border-[#E5A93C]/40 bg-[#141418] shadow-[0_20px_50px_rgba(229,169,60,0.15)] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#8C8A99] border-b border-[#25252E] pb-3">
            <span className="text-[#E5A93C]">FORMAT: {reels[activeReel].format}</span>
            <span>CARBON-ARC ILLUMINATED</span>
          </div>

          <h3 className="text-2xl sm:text-4xl text-[#EFEBE4] font-bold">{reels[activeReel].title}</h3>
          <p className="text-sm text-[#B8B5AD] leading-relaxed italic">{reels[activeReel].desc || reels[activeReel].description}</p>

          <div className="pt-6 border-t border-[#25252E] flex justify-between items-center text-xs font-mono text-[#8C8A99]">
            <span>PROJECTIONIST: {candidateName.toUpperCase()}</span>
            <span className="text-[#E5A93C]">SOUNDTRACK SYNCHRONIZED</span>
          </div>
        </div>

        {/* Thread Next Film Reel */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveReel((r) => (r + 1) % reels.length)}
            className="bg-[#E5A93C] text-black hover:bg-[#E5A93C]/90 font-bold text-xs h-11 px-8 rounded-full shadow-lg"
          >
            Thread Next 35mm Film Reel →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#25252E] pt-4 text-center text-xs text-[#8C8A99]">
        <span>NATIONAL CINEMATHEQUE PROJECTION BOOTH · NITRATE SAFETY CERTIFIED</span>
      </footer>
    </div>
  );
}

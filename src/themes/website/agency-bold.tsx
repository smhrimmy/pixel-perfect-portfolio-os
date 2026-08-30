import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Trophy, Award, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheTrophyRoom({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const trophies = (projects && projects.length > 0 ? projects : [
    { title: "GRAND PRIX · 2026 BEST CLOUD ARCHITECTURE", award: "Solid Gold Cup", desc: "Awarded for exceptional sub-100ms distributed system orchestration across global edge datacenters." },
    { title: "MEDAL OF DISTINCTION · 3D WEBGL INNOVATION", award: "Engraved Brass Plaque", desc: "Recognized for pioneering spatial raymarching algorithms in consumer browser environments." },
    { title: "EXCELLENCE IN RELIABILITY · ZERO DOWNTIME", award: "Crystal Obelisk", desc: "Commemorating 365 consecutive days of 99.999% uptime on enterprise transaction streams." },
  ]);

  const [activeTrophy, setActiveTrophy] = useState(0);

  return (
    <div className="min-h-screen bg-[#111116] text-[#FAF8F5] font-sans p-6 sm:p-12 flex flex-col justify-between selection:bg-[#D4AF37] selection:text-black">
      <header className="border-b border-[#2C2C38] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-[#D4AF37]" />
          <div>
            <h1 className="text-base font-black text-[#FAF8F5] uppercase tracking-wider">THE TROPHY ROOM &amp; HALL OF HONORS</h1>
            <p className="text-[11px] text-[#A68A56]">SPOTLIT DISPLAY CASES · ENGRAVED BRASS · {candidateName}</p>
          </div>
        </div>
        <div className="text-xs font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded border border-[#D4AF37]/30">
          AWARDS: {trophies.length} RECOGNITIONS
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">SPOTLIT PEDESTALS</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FAF8F5]">Distinguished Case Studies</h2>
        </div>

        {/* Physical Museum Display Case Card */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-[#D4AF37]/40 bg-[#1A1A22] shadow-[0_20px_50px_rgba(212,175,55,0.15)] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#D4AF37] border-b border-[#2C2C38] pb-3">
            <span>AWARD: {trophies[activeTrophy].award}</span>
            <span>UNANIMOUS JURY VERDICT</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-[#FAF8F5]">{trophies[activeTrophy].title}</h3>
          <p className="text-sm text-[#C4C0B8] leading-relaxed">{trophies[activeTrophy].desc || trophies[activeTrophy].description}</p>

          <div className="pt-6 border-t border-[#2C2C38] flex justify-between items-center text-xs font-mono text-[#D4AF37]">
            <span>RECIPIENT: {candidateName.toUpperCase()}</span>
            <span>PERMANENT EXHIBIT</span>
          </div>
        </div>

        {/* Step to Next Case */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveTrophy((t) => (t + 1) % trophies.length)}
            className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90 font-bold text-xs h-11 px-8 rounded-full shadow-lg"
          >
            Walk to Next Display Case →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#2C2C38] pt-4 text-center text-xs text-[#A68A56]">
        <span>NATIONAL ACADEMY OF SOFTWARE CRAFTSMANSHIP · PERMANENT COLLECTION</span>
      </footer>
    </div>
  );
}

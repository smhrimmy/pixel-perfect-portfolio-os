import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Wrench, Gauge, ClipboardCheck, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheMechanicsGarage({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const components = (projects && projects.length > 0 ? projects : [
    { title: "TWIN-TURBO CHARGER · 3D WEBGL SHADERS", part: "High-Boost Manifold", desc: "Dual GPU compression turbines providing 120 FPS frame delivery with zero thermal lag." },
    { title: "ELECTRONIC FUEL INJECTION · AUTONOMOUS AGENTS", part: "Multi-Port Injector", desc: "Precision code synthesis injecting automated bug fixes directly into runtime cylinders." },
    { title: "REINFORCED CRANKSHAFT · POSTGRES ENGINE", part: "Forged Steel Billet", desc: "Heavy-duty transaction crankshaft handling 50,000 queries per second without vibration." },
  ]);

  const [activeComponent, setActiveComponent] = useState(0);

  return (
    <div className="min-h-screen bg-[#141416] text-[#E0E0E0] font-mono p-6 sm:p-12 flex flex-col justify-between selection:bg-[#E65100] selection:text-white">
      <header className="border-b-2 border-[#333338] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Wrench className="h-6 w-6 text-[#E65100]" />
          <div>
            <h1 className="text-base font-black text-[#FFFFFF] uppercase tracking-wider">THE MECHANIC'S GARAGE &amp; PIT LANE</h1>
            <p className="text-[11px] text-[#888890]">OPEN-HOOD ENGINE BAY · GREASE-STAINED CLIPBOARD · {candidateName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#E65100]">
          <Gauge className="h-4 w-4" />
          <span>OIL PRESSURE: 65 PSI</span>
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#E65100] uppercase tracking-widest">[MAINTENANCE LOG ENTRY]</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#FFFFFF]">ENGINE BAY TEARDOWN</h2>
        </div>

        {/* Physical Engine Bay Component Card */}
        <div className="p-8 sm:p-12 rounded-xl border-2 border-[#E65100] bg-[#1C1C20] shadow-[8px_8px_0px_#E65100] space-y-6">
          <div className="flex justify-between items-center text-xs text-[#888890] border-b border-[#333338] pb-3">
            <span className="text-[#E65100] font-bold">COMPONENT: {components[activeComponent].part}</span>
            <span>SPEC: RACING TOLERANCE</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-[#FFFFFF]">{components[activeComponent].title}</h3>
          <p className="text-sm text-[#B0B0B8] leading-relaxed">{components[activeComponent].desc || components[activeComponent].description}</p>

          <div className="pt-6 border-t border-[#333338] flex justify-between items-center text-xs">
            <span>CHIEF MECHANIC: {candidateName.toUpperCase()}</span>
            <span className="text-[#E65100] font-bold">TORQUED TO SPEC ✓</span>
          </div>
        </div>

        {/* Inspect Next Part */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveComponent((c) => (c + 1) % components.length)}
            className="bg-[#E65100] text-white hover:bg-[#E65100]/90 font-bold text-xs h-11 px-8 rounded-none border-2 border-[#E65100] shadow-md"
          >
            Pull Next Engine Component From Bay →
          </Button>
        </div>
      </main>

      <footer className="border-t-2 border-[#333338] pt-4 text-center text-xs text-[#888890]">
        <span>PRECISION MOTORSPORTS WORKSHOP · ALL ENGINES DYNO TESTED</span>
      </footer>
    </div>
  );
}

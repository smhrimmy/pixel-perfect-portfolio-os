import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Globe2, Navigation, Compass, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheTradeRouteGlobe({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const routes = (projects && projects.length > 0 ? projects : [
    { title: "THE SILK ROAD · DISTRIBUTED CONSENSUS", waypoint: "Samarkand to Venice", desc: "Transmitting encrypted merchant ledgers across high-latency desert caravan nodes." },
    { title: "THE SPICE ROUTE · REAL-TIME STREAMING", waypoint: "Malacca to Lisbon", desc: "Maritime navigational routes synchronized against celestial trade winds." },
    { title: "THE TRANSATLANTIC CABLE · CLOUD ARCHITECTURE", waypoint: "London to New York", desc: "Sub-sea telegraphic lines carrying high-frequency financial transmissions." },
  ]);

  const [activeRoute, setActiveRoute] = useState(0);

  return (
    <div className="min-h-screen bg-[#1F1710] text-[#EAD8C3] font-serif p-6 sm:p-12 flex flex-col justify-between selection:bg-[#B37D4E] selection:text-black">
      <header className="border-b border-[#4A3828] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Globe2 className="h-6 w-6 text-[#B37D4E]" />
          <div>
            <h1 className="text-base font-bold text-[#EAD8C3] tracking-widest uppercase">THE TRADE ROUTE GLOBE</h1>
            <p className="text-[10px] text-[#8C7055]">ANTIQUE MAHOGANY GLOBE · BRASS PINS · {candidateName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#B37D4E]">
          <Compass className="h-4 w-4" />
          <span>TRUE NORTH: CALIBRATED</span>
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#B37D4E] uppercase tracking-widest font-mono">CARTOGRAPHIC LOGS</span>
          <h2 className="text-3xl sm:text-5xl text-[#EAD8C3] italic">Traced Trade Expeditions</h2>
        </div>

        {/* Physical Antique Desk Globe Card */}
        <div className="p-8 sm:p-12 rounded-3xl border-2 border-[#4A3828] bg-[#2E2218] shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#8C7055] border-b border-[#4A3828] pb-3">
            <span>WAYPOINT: {routes[activeRoute].waypoint}</span>
            <span className="text-[#B37D4E]">BRASS PIN SECURED</span>
          </div>

          <h3 className="text-2xl sm:text-4xl text-[#EAD8C3] font-bold">{routes[activeRoute].title}</h3>
          <p className="text-sm text-[#CDB296] leading-relaxed italic">{routes[activeRoute].desc || routes[activeRoute].description}</p>

          <div className="pt-6 border-t border-[#4A3828] flex justify-between items-center text-xs font-mono">
            <span>NAVIGATOR: {candidateName.toUpperCase()}</span>
            <span className="text-[#B37D4E]">CHARTER VERIFIED</span>
          </div>
        </div>

        {/* Rotate Globe Control */}
        <div className="flex justify-center">
          <Button
            onClick={() => setActiveRoute((r) => (r + 1) % routes.length)}
            className="bg-[#B37D4E] text-[#1F1710] hover:bg-[#B37D4E]/90 font-bold text-xs h-11 px-8 rounded-full shadow-lg"
          >
            <Navigation className="h-4 w-4 mr-2" /> Rotate Antique Globe: Next Port →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#4A3828] pt-4 text-center text-xs text-[#8C7055]">
        <span>ROYAL GEOGRAPHIC EXPEDITION · ALL SEA LANES CHARTED</span>
      </footer>
    </div>
  );
}

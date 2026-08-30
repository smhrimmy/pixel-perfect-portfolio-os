import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { PhoneCall, Radio, Plug, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheSwitchboard({ data }: ThemeRendererProps) {
  const { profile, projects, socialLinks } = data;
  const candidateName = profile?.name || "Prajwal DL";
  const email = profile?.email || "prajwal@praxel.space";

  const jacks = [
    { id: "jack-1", label: "LINE 1: FRONTEND", status: "CONNECTED", project: "Dynamic 3D WebGL Canvas" },
    { id: "jack-2", label: "LINE 2: CLUSTER", status: "LIVE", project: "Autonomous Coding Swarm" },
    { id: "jack-3", label: "LINE 3: TELEGRAM", status: "ON AIR", project: "Automated Content Gate" },
    { id: "jack-4", label: "LINE 4: DATABASE", status: "STANDBY", project: "Postgres Connection Pool" },
  ];

  const [activeJack, setActiveJack] = useState("jack-1");

  return (
    <div className="min-h-screen bg-[#141210] text-[#D8C7B0] font-mono p-4 sm:p-8 flex flex-col justify-between selection:bg-[#C97A3E] selection:text-black">
      {/* 1. BAKELITE OPERATOR HEADER */}
      <header className="border-2 border-[#382F26] bg-[#1E1A16] p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#C97A3E] text-black flex items-center justify-center font-bold">
            <Radio className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-black text-base text-[#F4E8D8] tracking-widest">THE VINTAGE SWITCHBOARD</h1>
            <p className="text-[10px] text-[#A8947D]">OPERATOR: {candidateName} · BAKELITE ROUTING PANEL</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 font-bold">ALL TRUNK LINES ACTIVE</span>
        </div>
      </header>

      {/* 2. BRASS JACKS & PATCH CABLES */}
      <main className="my-10 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-[#F4E8D8]">Patch Cable Operator Desk</h2>
          <p className="text-xs text-[#A8947D]">Click any brass jack below to patch a cable and establish connection with a project line.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {jacks.map((j) => (
            <div
              key={j.id}
              onClick={() => setActiveJack(j.id)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-4 shadow-xl ${
                activeJack === j.id
                  ? "border-[#C97A3E] bg-[#2E241C] shadow-[0_0_20px_rgba(201,122,62,0.3)]"
                  : "border-[#382F26] bg-[#1A1612] hover:border-[#A8947D]"
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#C97A3E]">{j.status}</span>
                <div className={`h-4 w-4 rounded-full border-2 ${activeJack === j.id ? "bg-[#C97A3E] border-white" : "border-[#382F26]"}`} />
              </div>

              {/* Physical Brass Jack Socket */}
              <div className="h-12 w-12 mx-auto rounded-full border-4 border-[#C97A3E] bg-black flex items-center justify-center shadow-inner">
                <div className="h-4 w-4 rounded-full bg-[#1A1612] border border-[#C97A3E]" />
              </div>

              <div className="text-center">
                <div className="text-xs font-bold text-[#F4E8D8]">{j.label}</div>
                <div className="text-[11px] text-[#A8947D] mt-1 truncate">{j.project}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call Connection Terminal Readout */}
        <div className="p-6 rounded-2xl border-2 border-[#382F26] bg-[#1A1612] text-xs space-y-2 font-mono text-[#A8947D]">
          <div className="text-[#C97A3E] font-bold">ACTIVE PATCH CONNECTION: {activeJack.toUpperCase()}</div>
          <p className="text-[#F4E8D8]">
            Line established with routing terminal. Audio feedback verified at 600 Ohms impedance. Ready for two-way transmission.
          </p>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="border-t-2 border-[#382F26] pt-4 text-center text-xs text-[#A8947D]">
        <span>CENTRAL TELEPHONE EXCHANGE · {candidateName} · EST. 1910</span>
      </footer>
    </div>
  );
}

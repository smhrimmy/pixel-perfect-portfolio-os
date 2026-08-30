import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { Printer, ArrowDown, RotateCcw, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThePrintShop({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const prints = (projects && projects.length > 0 ? projects : [
    { title: "WOODBLOCK EDITION 01 · SYSTEM ARCHITECTURE", type: "Heavy Letterpress", desc: "Hand-set lead type on 300gsm cotton rag paper." },
    { title: "SERIGRAPH EDITION 02 · REALTIME WEBGL", type: "Two-Color Screenprint", desc: "Layered oil-based vermilion ink on industrial chipboard." },
    { title: "MONOTYPE EDITION 03 · DISTRIBUTED POSTGRES", type: "Relief Print", desc: "Single impression pulled on an antique Heidelberg cylinder press." },
  ]);

  const [pulledIndex, setPulledIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#E5E0D8] text-[#1A1816] font-mono p-6 sm:p-12 flex flex-col justify-between selection:bg-[#B22222] selection:text-white">
      <header className="border-b-4 border-[#1A1816] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="font-black text-xl tracking-tight text-[#1A1816] uppercase">THE LETTERPRESS PRINT SHOP</h1>
          <p className="text-xs text-[#5C554D]">MANUAL CYLINDER PRESS · LEAD TYPE · {candidateName.toUpperCase()}</p>
        </div>
        <div className="text-xs font-bold px-3 py-1 bg-[#B22222] text-white">
          PROOF NO. {pulledIndex + 1}
        </div>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#B22222] tracking-widest">[MANUAL PRESS LEVER]</span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#1A1816]">PULL A FRESH PROOF</h2>
          <p className="text-xs text-[#5C554D]">Pull the manual press lever to press ink into heavy cotton rag paper.</p>
        </div>

        {/* Physical Print Sheet */}
        <div className="p-8 sm:p-12 rounded-none border-4 border-[#1A1816] bg-[#FAF8F5] shadow-[12px_12px_0px_#1A1816] space-y-6">
          <div className="flex justify-between items-center text-xs font-bold border-b-2 border-[#1A1816] pb-3">
            <span className="text-[#B22222]">{prints[pulledIndex].type}</span>
            <span>PRESS: HEIDELBERG 1952</span>
          </div>

          <h3 className="text-2xl sm:text-4xl font-black text-[#1A1816]">{prints[pulledIndex].title}</h3>
          <p className="text-sm text-[#33302C] leading-relaxed">{prints[pulledIndex].desc || prints[pulledIndex].description}</p>

          <div className="pt-6 border-t-2 border-[#1A1816] flex justify-between items-center text-xs">
            <span>INK: PIGMENT CARBON BLACK &amp; VERMILION</span>
            <span className="font-bold text-[#B22222]">APPROVED FOR PRINT</span>
          </div>
        </div>

        {/* Lever Pull Control */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => setPulledIndex((i) => (i + 1) % prints.length)}
            className="bg-[#1A1816] text-[#FAF8F5] hover:bg-[#B22222] font-black text-sm h-12 px-8 rounded-none border-2 border-[#1A1816] shadow-[6px_6px_0px_#B22222] transition-all"
          >
            Pull Next Print Lever →
          </Button>
        </div>
      </main>

      <footer className="border-t-4 border-[#1A1816] pt-4 text-center text-xs text-[#5C554D]">
        <span>WORKSHOP LOCATION: HEAVY INK &amp; PAPER STUDIO · EST. 1928</span>
      </footer>
    </div>
  );
}

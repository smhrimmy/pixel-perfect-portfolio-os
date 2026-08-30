import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { BookOpen, Lamp, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TheReadingRoom({ data }: ThemeRendererProps) {
  const { profile, projects } = data;
  const candidateName = profile?.name || "Prajwal DL";

  const books = (projects && projects.length > 0 ? projects : [
    { title: "TOME I: THE FOUNDATIONS OF DISTRIBUTED COMPUTE", pages: "Pages 1–142", desc: "A deep architectural treatise on multi-agent consensus and deterministic software loops." },
    { title: "TOME II: THE OPTICAL SHADER DISQUISITION", pages: "Pages 143–288", desc: "Principles of raymarching, photon scattering, and physical WebGL material synthesis." },
    { title: "TOME III: THE EDGE PERSISTENCE CHRONICLES", pages: "Pages 289–410", desc: "Scalable Postgres replication, transaction isolation levels, and low-latency failover." },
  ]);

  const [activeBook, setActiveBook] = useState(0);

  return (
    <div className="min-h-screen bg-[#1A120B] text-[#E5D9C5] font-serif p-6 sm:p-12 flex flex-col justify-between selection:bg-[#8B5A2B] selection:text-[#FFF]">
      <header className="border-b border-[#4A3525] pb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Lamp className="h-5 w-5 text-[#D4AF37]" />
          <div>
            <h1 className="text-lg font-bold text-[#F5EBE1]">THE PRIVATE READING ROOM</h1>
            <p className="text-xs text-[#A68A68]">MAHOGANY SHELVES · ARCHIVAL VELLUM · {candidateName}</p>
          </div>
        </div>
        <span className="text-xs text-[#D4AF37] font-mono">[WARM DESK LAMP: ON]</span>
      </header>

      <main className="my-12 max-w-4xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-mono">FOLIO VOLUMES</span>
          <h2 className="text-3xl sm:text-5xl text-[#F5EBE1] italic">Selected Writings &amp; Treatises</h2>
        </div>

        {/* Physical Leather Book Spread */}
        <div className="p-8 sm:p-12 rounded-xl border border-[#4A3525] bg-[#241A10] shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6 relative">
          <div className="flex justify-between items-center text-xs text-[#A68A68] border-b border-[#4A3525] pb-3 font-mono">
            <span>{books[activeBook].pages}</span>
            <span className="text-[#D4AF37]">LEATHER BOUND FOLIO</span>
          </div>

          <h3 className="text-2xl sm:text-3xl text-[#F5EBE1] font-bold leading-snug">{books[activeBook].title}</h3>
          <p className="text-base text-[#D4C5B0] leading-relaxed italic">{books[activeBook].desc || books[activeBook].description}</p>

          <div className="pt-6 border-t border-[#4A3525] flex justify-between items-center text-xs text-[#A68A68]">
            <span>AUTHOR: {candidateName.toUpperCase()}</span>
            <span className="text-[#D4AF37]">CHAPTER APPROVED</span>
          </div>
        </div>

        {/* Book Shelf Switcher */}
        <div className="flex justify-between items-center">
          <Button
            onClick={() => setActiveBook((b) => (b > 0 ? b - 1 : books.length - 1))}
            variant="outline"
            className="border-[#4A3525] bg-[#241A10] text-[#E5D9C5] hover:bg-[#4A3525] text-xs h-10 px-6 font-serif"
          >
            ← Previous Volume
          </Button>

          <span className="text-xs text-[#A68A68] font-mono">VOLUME {activeBook + 1} OF {books.length}</span>

          <Button
            onClick={() => setActiveBook((b) => (b < books.length - 1 ? b + 1 : 0))}
            variant="outline"
            className="border-[#4A3525] bg-[#241A10] text-[#E5D9C5] hover:bg-[#4A3525] text-xs h-10 px-6 font-serif"
          >
            Next Volume →
          </Button>
        </div>
      </main>

      <footer className="border-t border-[#4A3525] pt-4 text-center text-xs text-[#A68A68]">
        <span>CURATED AT THE ATHENAEUM · ALL VOLUMES PRESERVED</span>
      </footer>
    </div>
  );
}

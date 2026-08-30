import { useState } from "react";
import type { ThemeRendererProps } from "../types";
import { ChevronLeft, ChevronRight, FileText, Check } from "lucide-react";

export default function TheLedger({ data }: ThemeRendererProps) {
  const { profile, projects, experience, skills } = data;
  const candidateName = profile?.name || "Prajwal DL";
  const bio = profile?.bio || "Accounting of software systems, distributed ledger transactions, and low-latency infrastructure.";

  const cards = (projects && projects.length > 0 ? projects : [
    { title: "FOLIO #101 · DISTRIBUTED ENGINE", category: "CREDIT: 120ms Latency", desc: "Audit of high-throughput transactional pipelines." },
    { title: "FOLIO #102 · ZERO-KNOWLEDGE LEDGER", category: "DEBIT: 0 Token Cost", desc: "Client-side verifiable proofs and cryptographic verification." },
    { title: "FOLIO #103 · DATABASE CONNECTION POOL", category: "BALANCE: 99.99% Uptime", desc: "PostgreSQL pgBouncer connection multiplexer." },
  ]);

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-[#2C2925] font-mono p-4 sm:p-8 flex flex-col justify-between selection:bg-[#2C2925] selection:text-[#F7F4EB]">
      {/* 1. TOP INDEX STAMP */}
      <div className="border-b-2 border-dashed border-[#2C2925]/40 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <span className="font-bold text-sm uppercase tracking-wider text-[#2C2925]">THE LEDGER · CARD CATALOG DRAWER</span>
          <span className="text-[10px] text-[#7A7365] block">DRAWER NO. 42 · SPECIFICATION SUB-50KB</span>
        </div>
        <div className="text-[11px] bg-[#2C2925] text-[#F7F4EB] px-2.5 py-1 rounded font-bold">
          {candidateName.toUpperCase()}
        </div>
      </div>

      {/* 2. CARD CATALOG BOX */}
      <div className="my-10 max-w-3xl mx-auto w-full space-y-6">
        <div className="flex justify-between items-center text-xs text-[#7A7365]">
          <span>INDEX CARD {activeCardIndex + 1} OF {cards.length}</span>
          <span>FLIP VIA BUTTONS OR KEYS</span>
        </div>

        {/* Physical Cream Index Card */}
        <div className="p-8 rounded-lg border-2 border-[#2C2925] bg-[#FFFDF8] shadow-[6px_6px_0px_#2C2925] space-y-4">
          <div className="flex justify-between items-center border-b border-[#2C2925]/20 pb-3">
            <span className="text-xs font-bold text-[#8B0000]">[OFFICIAL STAMPED RECORD]</span>
            <span className="text-xs text-[#7A7365]">{cards[activeCardIndex].category || "ENTRY APPROVED"}</span>
          </div>

          <h2 className="text-2xl font-black text-[#2C2925]">{cards[activeCardIndex].title}</h2>
          <p className="text-xs text-[#4A453C] leading-relaxed">{cards[activeCardIndex].desc || cards[activeCardIndex].description}</p>

          <div className="pt-4 border-t border-[#2C2925]/20 flex justify-between items-center text-xs">
            <span>VERIFIED: PRAJWAL DL</span>
            <span className="text-[10px] font-bold text-[#2C2925]">PASSED AUDIT ✓</span>
          </div>
        </div>

        {/* Card Drawer Flipper Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveCardIndex((i) => (i > 0 ? i - 1 : cards.length - 1))}
            className="px-4 py-2 border-2 border-[#2C2925] bg-[#FFFDF8] font-bold text-xs hover:bg-[#2C2925] hover:text-[#F7F4EB] transition shadow-[3px_3px_0px_#2C2925]"
          >
            ← PREVIOUS CARD
          </button>
          <button
            onClick={() => setActiveCardIndex((i) => (i < cards.length - 1 ? i + 1 : 0))}
            className="px-4 py-2 border-2 border-[#2C2925] bg-[#FFFDF8] font-bold text-xs hover:bg-[#2C2925] hover:text-[#F7F4EB] transition shadow-[3px_3px_0px_#2C2925]"
          >
            NEXT CARD →
          </button>
        </div>
      </div>

      {/* 3. FOOTER */}
      <div className="border-t-2 border-dashed border-[#2C2925]/40 pt-4 flex flex-col sm:flex-row justify-between text-xs text-[#7A7365]">
        <span>ALL ACCOUNTS BALANCED &amp; VERIFIED</span>
        <span>CARD-CATALOG SUB-50KB ENGINE</span>
      </div>
    </div>
  );
}

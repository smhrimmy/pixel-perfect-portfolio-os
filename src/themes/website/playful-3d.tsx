import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Sparkles,
  Eye,
  ArrowUpRight,
  Mail,
  ChevronRight,
  X,
  Package,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";

export default function TheToyChest({ data }: ThemeRendererProps) {
  const { profile, projects, experience: rawExperience } = data;
  const candidateName = profile?.name || "Jack";
  const bio = profile?.bio || "Crafting hand-made miniature dioramas, mechanical puppet physics, and playful spatial interactions.";
  const email = profile?.email || "jack@toychest.craft";

  const [chestOpen, setChestOpen] = useState(false);
  const [selectedDiorama, setSelectedDiorama] = useState<any | null>(null);

  const dioramas = (projects && projects.length > 0 ? projects : [
    {
      id: "1",
      title: "THE WOODEN AIRSHIP CRUISE",
      desc: "Stop-motion animated balsa wood zeppelin floating over miniature cardboard clouds with mechanical gear propellers.",
      material: "Carved Pine & Brass Wire",
      year: "1924 Model",
    },
    {
      id: "2",
      title: "MECHANICAL CLOCKWORK CASTLE",
      desc: "Intricate shoebox diorama with turning wooden cogs, lowering drawbridges, and paper-cutout knights.",
      material: "Birch Plywood & String",
      year: "Limited Edition",
    },
    {
      id: "3",
      title: "THE AUTOMATON CAROUSEL",
      desc: "Hand-painted porcelain carousel horses dancing on stop-motion wooden pistons with music box tunes.",
      material: "Hand-Painted Ceramic",
      year: "Masterpiece",
    },
  ]);

  return (
    <div className="min-h-screen bg-[#2A1810] text-[#F3E5D8] font-sans overflow-x-hidden selection:bg-[#D97706] selection:text-white">
      {/* 1. CEDAR WOOD HEADER */}
      <header className="border-b border-[#5C3A21] bg-[#1F110B]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-[#8B4513] border border-[#D97706]/40 flex items-center justify-center text-[#F3E5D8]">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <span className="font-black text-sm tracking-wider text-[#F3E5D8] uppercase">THE TOY CHEST</span>
              <span className="text-[10px] text-[#D97706] block font-mono -mt-0.5">HAND-CRAFTED DIORAMAS · {candidateName}</span>
            </div>
          </div>

          <Button
            onClick={() => setChestOpen((o) => !o)}
            size="sm"
            className="bg-[#D97706] text-black hover:bg-[#D97706]/90 font-bold text-xs h-8 rounded-full"
          >
            {chestOpen ? "Close Toy Chest Lid" : "Open Toy Chest Lid"}
          </Button>
        </div>
      </header>

      {/* 2. HERO SHOEBOX THEATER ENTRY */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="p-8 sm:p-12 rounded-3xl border-4 border-[#8B4513] bg-gradient-to-b from-[#3D2314] to-[#1F110B] shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B4513]/40 border border-[#D97706]/40 text-xs font-mono text-[#D97706]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>STOP-MOTION SHOEBOX DIORAMA ENGINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase text-[#F3E5D8] tracking-tight">
            HAND-CRAFTED <br />
            <span className="text-[#D97706]">MINIATURE REALITIES</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D4B89B] max-w-xl mx-auto">
            {bio}
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <Button
              onClick={() => setChestOpen(true)}
              className="bg-[#D97706] text-black hover:bg-[#D97706]/90 font-bold text-xs h-11 px-8 rounded-full shadow-lg"
            >
              Peer Into The Dioramas →
            </Button>
          </div>
        </motion.div>
      </section>

      {/* 3. DIORAMA CARDS GRID */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-[#5C3A21] pb-4">
          <h2 className="text-2xl font-black text-[#F3E5D8]">Peep-Show Dioramas ({dioramas.length})</h2>
          <span className="text-xs text-[#D97706] font-mono">Warm Wood &amp; Stage Lighting</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dioramas.map((d: any, idx: number) => (
            <motion.div
              key={d.id || idx}
              whileHover={{ y: -6, rotateZ: idx % 2 === 0 ? 1 : -1 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedDiorama(d)}
              className="p-6 rounded-2xl border-2 border-[#8B4513] bg-[#3D2314] cursor-pointer space-y-4 hover:border-[#D97706] shadow-xl group"
            >
              <div className="h-44 w-full rounded-xl bg-[#1F110B] border border-[#5C3A21] flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)] transition">
                <Box className="h-12 w-12 text-[#D97706] group-hover:scale-110 transition-transform" />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono text-[#D97706]">DIORAMA NO. {idx + 1}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#D97706] font-bold uppercase">{d.material || "CARVED WOOD"}</span>
                <h3 className="text-lg font-bold text-[#F3E5D8] mt-0.5">{d.title}</h3>
                <p className="text-xs text-[#D4B89B] mt-2 line-clamp-2">{d.desc || d.description}</p>
              </div>

              <div className="pt-2 flex justify-between items-center text-xs font-mono text-[#D97706]">
                <span>Inspect Diorama</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="py-12 px-6 border-t border-[#5C3A21] bg-[#1F110B] text-center space-y-4">
        <h4 className="text-lg font-bold text-[#F3E5D8]">Commission a Handcrafted Toy Chest Build</h4>
        <p className="text-xs text-[#D4B89B]">Available for spatial toy physics, stop-motion animations, and bespoke web dioramas.</p>
        <Button asChild className="bg-[#D97706] text-black hover:bg-[#D97706]/90 font-bold text-xs h-9 rounded-full px-6">
          <a href={`mailto:${email}`}>
            <Mail className="h-4 w-4 mr-1.5" /> Send Workshop Letter
          </a>
        </Button>
      </footer>

      {/* Diorama Modal */}
      <AnimatePresence>
        {selectedDiorama && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <div className="max-w-lg w-full rounded-3xl border-4 border-[#8B4513] bg-[#2A1810] p-8 text-[#F3E5D8] space-y-6 relative shadow-2xl">
              <button
                onClick={() => setSelectedDiorama(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#8B4513] text-[#D97706] flex items-center justify-center hover:bg-[#8B4513]"
              >
                <X className="h-4 w-4" />
              </button>

              <h2 className="text-2xl font-black text-[#F3E5D8]">{selectedDiorama.title}</h2>
              <p className="text-xs text-[#D4B89B] leading-relaxed">{selectedDiorama.desc || selectedDiorama.description}</p>

              <div className="p-4 rounded-xl border border-[#5C3A21] bg-[#1F110B] text-xs font-mono space-y-1 text-[#D97706]">
                <div>CRAFT: {selectedDiorama.material || "Hand-Carved Balsa & Wire"}</div>
                <div>SCALE: 1:24 Miniature Stage</div>
              </div>

              <Button size="sm" onClick={() => setSelectedDiorama(null)} className="bg-[#D97706] text-black font-bold text-xs w-full">
                Close Diorama Case
              </Button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

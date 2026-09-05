import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, X, ArrowUpRight, Grid, Check, Compass, Layers
} from "lucide-react";
import { websiteThemes, THEME_ALIAS_MAP } from "@/themes/website/registry";

export interface WorldCardData {
  num: string;
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  subquote?: string;
  themeColor: string;
  borderColor: string;
  bgGradient: string;
  tags: string[];
  visualType: string;
}

export const WORLD_MATRIX_ITEMS: WorldCardData[] = [
  {
    num: "01",
    id: "the-heightfield",
    name: "THE HEIGHTFIELD MATRIX",
    subtitle: "Topographic 3D Terrain Portfolio",
    tagline: "Scaling Ideas\nBuilding Real Impact",
    themeColor: "#10B981",
    borderColor: "rgba(16, 185, 129, 0.4)",
    bgGradient: "from-[#03150D] via-[#062417] to-[#020D08]",
    tags: ["Explore", "Projects", "Skills", "Experience", "Contact"],
    visualType: "heightfield"
  },
  {
    num: "02",
    id: "the-hypercube",
    name: "THE 4D HYPERCUBE",
    subtitle: "Dimensional Portfolio Experience",
    tagline: "EXPLORE\nBEYOND\nDIMENSIONS",
    themeColor: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.4)",
    bgGradient: "from-[#040E24] via-[#081B44] to-[#020712]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "tesseract"
  },
  {
    num: "03",
    id: "the-workshop",
    name: "THE WORKSHOP",
    subtitle: "Interactive Craftsman Workbench",
    tagline: "Build\nCreate\nIterate",
    subquote: "Good ideas are always in progress.",
    themeColor: "#F59E0B",
    borderColor: "rgba(245, 158, 11, 0.4)",
    bgGradient: "from-[#1C1108] via-[#2A1B0D] to-[#0F0804]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "workbench"
  },
  {
    num: "04",
    id: "the-observatory",
    name: "THE OBSERVATORY",
    subtitle: "Celestial Portfolio Journey",
    tagline: "Explore\nDiscover\nBuild",
    subquote: "The universe rewards builders.",
    themeColor: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.4)",
    bgGradient: "from-[#051126] via-[#0A1F45] to-[#020710]",
    tags: ["Star Map", "Projects", "Skills", "Experience", "Contact"],
    visualType: "telescope"
  },
  {
    num: "05",
    id: "the-toy-chest",
    name: "THE TOY CHEST",
    subtitle: "Playful 3D Voxel Universe",
    tagline: "Play\nBuild\nImagine",
    themeColor: "#C084FC",
    borderColor: "rgba(192, 132, 252, 0.4)",
    bgGradient: "from-[#1C0A33] via-[#2C124D] to-[#0D041A]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "voxel"
  },
  {
    num: "06",
    id: "the-reservoir",
    name: "THE RESERVOIR",
    subtitle: "Fluid Interactive Landscape",
    tagline: "Ideas\nFlow\nFurther",
    subquote: "Drop a message into the water...",
    themeColor: "#2DD4BF",
    borderColor: "rgba(45, 212, 191, 0.4)",
    bgGradient: "from-[#04161C] via-[#08242E] to-[#020B0E]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "fluid"
  },
  {
    num: "07",
    id: "the-ledger",
    name: "THE LEDGER",
    subtitle: "Archival Filing System",
    tagline: "Organize\nDocument\nBuild",
    subquote: "Knowledge for what's next.",
    themeColor: "#E4E4E7",
    borderColor: "rgba(228, 228, 231, 0.3)",
    bgGradient: "from-[#14100C] via-[#221B14] to-[#0A0806]",
    tags: ["01 Projects", "02 Skills", "03 Experience", "04 Contact"],
    visualType: "cardfile"
  },
  {
    num: "08",
    id: "the-switchboard",
    name: "THE SWITCHBOARD",
    subtitle: "Network Connection Interface",
    tagline: "Connect\nRoute\nCollaborate",
    subquote: "Signal 01 Connected",
    themeColor: "#22C55E",
    borderColor: "rgba(34, 197, 94, 0.4)",
    bgGradient: "from-[#05140A] via-[#0B2614] to-[#020A05]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "patchboard"
  },
  {
    num: "09",
    id: "the-print-shop",
    name: "THE PRINT SHOP",
    subtitle: "Mechanical Publishing Experience",
    tagline: "Ink\nIdeas\nInto\nReality",
    subquote: "GOOD IDEAS DESERVE A HIGHER PRINT.",
    themeColor: "#FACC15",
    borderColor: "rgba(250, 204, 21, 0.4)",
    bgGradient: "from-[#171704] via-[#262607] to-[#0B0B02]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "letterpress"
  },
  {
    num: "10",
    id: "the-reading-room",
    name: "THE READING ROOM",
    subtitle: "Immersive Library Experience",
    tagline: "Stories\nShape\nTomorrow",
    subquote: "Turn the page to explore.",
    themeColor: "#FB923C",
    borderColor: "rgba(251, 146, 60, 0.4)",
    bgGradient: "from-[#190D08] via-[#2A160E] to-[#0C0604]",
    tags: ["Books", "Projects", "Skills", "Experience", "Contact"],
    visualType: "library"
  },
  {
    num: "11",
    id: "the-greenhouse",
    name: "THE GREENHOUSE",
    subtitle: "Living Portfolio Ecosystem",
    tagline: "Grow\nExplore\nCollaborate",
    subquote: "Nurturing ideas for a brighter future.",
    themeColor: "#34D399",
    borderColor: "rgba(52, 211, 153, 0.4)",
    bgGradient: "from-[#041710] via-[#092B1E] to-[#020B08]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "greenhouse"
  },
  {
    num: "12",
    id: "the-arcade-cabinet",
    name: "THE ARCADE",
    subtitle: "Retro Gaming Portfolio",
    tagline: "Good Developers Never Stop Playing.",
    subquote: "PRESS START · CREDITS 01",
    themeColor: "#EC4899",
    borderColor: "rgba(236, 72, 153, 0.4)",
    bgGradient: "from-[#1E0426] via-[#330842] to-[#0E0212]",
    tags: ["1 Projects", "2 Skills", "3 Experience", "4 Contact"],
    visualType: "arcade"
  },
  {
    num: "13",
    id: "the-potters-studio",
    name: "THE POTTER'S STUDIO",
    subtitle: "Creative Clay Workshop",
    tagline: "Shape\nDesign\nCreate",
    subquote: "From Ideas to Impact.",
    themeColor: "#EA580C",
    borderColor: "rgba(234, 88, 12, 0.4)",
    bgGradient: "from-[#1A0B06] via-[#2D140B] to-[#0C0503]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "pottery"
  },
  {
    num: "14",
    id: "the-trade-route-globe",
    name: "THE TRADE ROUTE GLOBE",
    subtitle: "Global Exploration Interface",
    tagline: "Explore\nConnect\nBuild",
    subquote: "Ideas know no borders.",
    themeColor: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.4)",
    bgGradient: "from-[#051224] via-[#0B2142] to-[#020810]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "globe"
  },
  {
    num: "15",
    id: "the-herbarium",
    name: "THE HERBARIUM",
    subtitle: "Botanical Knowledge Archive",
    tagline: "Explore\nLearn\nPreserve",
    subquote: "Ideas grow like plants.",
    themeColor: "#2DD4BF",
    borderColor: "rgba(45, 212, 191, 0.4)",
    bgGradient: "from-[#051C15] via-[#0A3025] to-[#020D0A]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "herbarium"
  },
  {
    num: "16",
    id: "the-drafting-table",
    name: "THE DRAFTING TABLE",
    subtitle: "Architectural Blueprint Interface",
    tagline: "Plan\nDesign\nConstruct",
    subquote: "Precision drives progress.",
    themeColor: "#38BDF8",
    borderColor: "rgba(56, 189, 248, 0.4)",
    bgGradient: "from-[#061730] via-[#0D2954] to-[#030A14]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "drafting"
  },
  {
    num: "17",
    id: "the-gem-cutters-table",
    name: "THE GEM CUTTER'S TABLE",
    subtitle: "Precision & Detail Showcase",
    tagline: "Refine\nPolish\nReveal",
    subquote: "True value is in the details.",
    themeColor: "#C084FC",
    borderColor: "rgba(192, 132, 252, 0.4)",
    bgGradient: "from-[#15092B] via-[#241047] to-[#0A0414]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "gem"
  },
  {
    num: "18",
    id: "the-trophy-room",
    name: "THE TROPHY ROOM",
    subtitle: "Achievement Gallery",
    tagline: "Celebrate\nLearn\nMove Forward",
    themeColor: "#EAB308",
    borderColor: "rgba(234, 179, 8, 0.4)",
    bgGradient: "from-[#141208] via-[#24200E] to-[#0A0904]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "trophy"
  },
  {
    num: "19",
    id: "the-mechanics-garage",
    name: "THE MECHANIC'S GARAGE",
    subtitle: "Engineering Deep Dive",
    tagline: "Diagnose\nBuild\nOptimize",
    subquote: "Performance is a mindset.",
    themeColor: "#EF4444",
    borderColor: "rgba(239, 68, 68, 0.4)",
    bgGradient: "from-[#1C080B] via-[#2E0E13] to-[#0E0405]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "garage"
  },
  {
    num: "20",
    id: "the-architects-study",
    name: "THE ARCHITECT'S STUDY",
    subtitle: "Strategic Thinking Space",
    tagline: "Think\nPlan\nExecute",
    themeColor: "#D97706",
    borderColor: "rgba(217, 119, 6, 0.4)",
    bgGradient: "from-[#190F08] via-[#2B1A0E] to-[#0D0804]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "study"
  },
  {
    num: "21",
    id: "the-projection-room",
    name: "THE PROJECTION ROOM",
    subtitle: "Cinematic Storytelling Interface",
    tagline: "Play\nProject\nInspire",
    subquote: "Every project has a story.",
    themeColor: "#F43F5E",
    borderColor: "rgba(244, 63, 94, 0.4)",
    bgGradient: "from-[#1A0810] via-[#2E0F1D] to-[#0D0408]",
    tags: ["Projects", "Skills", "Experience", "Contact"],
    visualType: "cinema"
  },
  {
    num: "22",
    id: "prajwal-premium",
    name: "PRAJWAL PREMIUM",
    subtitle: "Minimal Developer OS",
    tagline: "Build\nShip\nScale",
    subquote: "Minimal. Powerful. Yours.",
    themeColor: "#818CF8",
    borderColor: "rgba(129, 140, 248, 0.4)",
    bgGradient: "from-[#060A1F] via-[#0C143D] to-[#030510]",
    tags: ["Developer", "Systems Architect", "Creative Technologist"],
    visualType: "premium"
  }
];

export function WorldMatrixModal({
  isOpen,
  onClose,
  currentThemeId,
  onSelectTheme,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex flex-col bg-[#05060A]/95 text-white backdrop-blur-3xl overflow-y-auto selection:bg-[#E8A765] selection:text-black font-sans">
        {/* TOP BAR */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#070912]/80 border-b border-white/[0.08] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8A765]/20 border border-[#E8A765]/50 text-[#E8A765]">
              <Grid className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-widest text-white uppercase flex items-center gap-2">
                <span>22 UNIQUE WORLDS MATRIX</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E8A765]/20 text-[#E8A765] border border-[#E8A765]/40 font-mono">
                  ONE PORTFOLIO
                </span>
              </h2>
              <p className="text-[11px] text-white/50 font-mono">
                Click any world card to teleport instantly into its physical architecture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-white/80 hover:bg-white/[0.15] hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>CLOSE MATRIX</span>
          </button>
        </header>

        {/* 22 WORLDS GRID CONTAINER (Exact match to Reference Art Sheet) */}
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {WORLD_MATRIX_ITEMS.map((item) => {
              const resolvedCurId = THEME_ALIAS_MAP[currentThemeId] || currentThemeId;
              const resolvedItemId = THEME_ALIAS_MAP[item.id] || item.id;
              const isSelected = resolvedCurId === resolvedItemId || currentThemeId === item.id;

              return (
                <motion.div
                  key={item.num}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => {
                    onSelectTheme(item.id);
                    onClose();
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-300 border flex flex-col justify-between min-h-[170px] sm:min-h-[190px] overflow-hidden bg-gradient-to-br ${item.bgGradient} ${
                    isSelected
                      ? "ring-2 ring-[#E8A765] shadow-[0_0_25px_rgba(232,167,101,0.4)] border-[#E8A765]"
                      : "border-white/[0.08] hover:border-white/30 shadow-lg"
                  }`}
                  style={{
                    boxShadow: hoveredId === item.id ? `0 0 30px ${item.borderColor}` : undefined,
                    borderColor: hoveredId === item.id ? item.themeColor : undefined
                  }}
                >
                  {/* Subtle Glow Overlay */}
                  <div
                    className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: item.themeColor }}
                  />

                  {/* CARD HEADER */}
                  <div className="relative z-10 flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="text-xs font-bold" style={{ color: item.themeColor }}>
                          {item.num}
                        </span>
                        <h3 className="text-xs font-black tracking-wide text-white uppercase truncate max-w-[130px]">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-[10px] text-white/50 tracking-tight line-clamp-1 mt-0.5 font-sans">
                        {item.subtitle}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E8A765] text-black">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* HERO TAGLINE & QUOTE */}
                  <div className="relative z-10 my-2">
                    <p className="text-xs sm:text-sm font-bold leading-tight text-white/90 whitespace-pre-line font-display">
                      {item.tagline}
                    </p>
                    {item.subquote && (
                      <p className="text-[10px] text-white/40 italic mt-1 font-serif line-clamp-1">
                        &quot;{item.subquote}&quot;
                      </p>
                    )}
                  </div>

                  {/* PILL TAGS */}
                  <div className="relative z-10 flex flex-wrap gap-1 pt-2 border-t border-white/[0.06]">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-black/40 border border-white/[0.08] text-white/60 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* 23RD SUMMARY BANNER CARD (Exact match to Reference Art Sheet) */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 rounded-2xl p-6 border border-[#E8A765]/30 bg-gradient-to-r from-[#0C0F1D] via-[#151324] to-[#0A0714] flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full bg-[#E8A765]/20 text-[#E8A765] border border-[#E8A765]/40 font-bold uppercase">
                  MASTER SUITE · COMPLETE 22 WORLDS
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase mt-2">
                  22 UNIQUE WORLDS
                </h3>
                <p className="text-xs sm:text-sm text-white/60 tracking-widest font-mono uppercase">
                  ONE PORTFOLIO. ENDLESS POSSIBILITIES.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 relative z-10">
                <div>
                  <h4 className="text-xl sm:text-2xl font-serif italic font-bold text-[#E8A765]">
                    Prajwal DL
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/50 tracking-wider font-mono uppercase">
                    FULL STACK DEVELOPER · CREATIVE ENGINEER · SYSTEMS ARCHITECT
                  </p>
                </div>

                <a
                  href="https://praxel.space/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#E8A765] text-black font-bold font-mono text-xs hover:bg-[#FDE68A] transition flex items-center gap-1.5 shadow-[0_0_20px_rgba(232,167,101,0.4)]"
                >
                  <span>VISIT PRAXEL.SPACE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AnimatePresence>
  );
}

import { useState, useEffect, useMemo } from "react";
import { websiteThemes } from "@/themes/website/registry";
import { Palette, Check, Sparkles, X, ChevronUp, Grid } from "lucide-react";
import { toast } from "sonner";
import { WorldMatrixModal } from "./WorldMatrixModal";

export function FloatingThemeSwitcher({
  currentTheme,
  onThemeChange,
}: {
  currentTheme: string;
  onThemeChange?: (themeId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);
  const [active, setActive] = useState(currentTheme);
  const [allowedThemes, setAllowedThemes] = useState<string[] | null>(null);

  useEffect(() => {
    setActive(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("portfolio_visitor_allowed_themes");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAllowedThemes(parsed);
          }
        } catch {}
      }
    }
  }, []);

  const handleSelect = (themeId: string) => {
    setActive(themeId);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_os_theme", themeId);
    }
    if (onThemeChange) {
      onThemeChange(themeId);
    }
    const themeName = websiteThemes.find(t => t.id === themeId)?.name || themeId;
    toast.success(`Teleported into ${themeName}`);
  };

  const visibleThemes = useMemo(() => {
    const seen = new Set<string>();
    const all = websiteThemes.filter((t) => {
      if (seen.has(t.name)) return false;
      seen.add(t.name);
      return true;
    });

    if (!allowedThemes) return all;
    return all.filter((t) => allowedThemes.includes(t.id));
  }, [allowedThemes]);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 font-sans flex items-center gap-2">
        {/* 22 WORLDS MATRIX LAUNCHER BUTTON */}
        <button
          onClick={() => setIsMatrixOpen(true)}
          className="group flex items-center gap-2 rounded-full border border-[#E8A765]/50 bg-[#070710]/95 px-4 py-2.5 text-xs font-bold text-[#E8A765] shadow-2xl backdrop-blur-xl hover:bg-[#E8A765] hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(232,167,101,0.25)]"
        >
          <Grid className="h-4 w-4" />
          <span>22 WORLDS MATRIX</span>
        </button>

        {/* Popover Card */}
        {isOpen && (
          <div className="absolute bottom-14 left-0 mb-3 w-80 sm:w-96 rounded-3xl border border-white/[0.12] bg-[#070710]/95 p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E8A765]/20 text-[#E8A765]">
                  <Palette className="h-3.5 w-3.5" />
                </span>
                <span className="font-display text-sm font-bold text-white">Theme Engine Registry</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-xs text-white/50">
              Choose from the admin-approved physical design architectures below:
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {visibleThemes.map((t) => {
                const isSelected = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(t.id)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition cursor-pointer ${
                      isSelected
                        ? "border border-[#E8A765]/50 bg-[#E8A765]/15 text-[#E8A765] font-bold shadow-sm"
                        : "border border-white/[0.06] bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    <span className="truncate">{t.name}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-[#E8A765] ml-1" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsMatrixOpen(true);
                }}
                className="text-[#E8A765] hover:underline flex items-center gap-1 font-bold"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Open 22 Worlds Grid</span>
              </button>
              <span>{visibleThemes.length} Approved Themes</span>
            </div>
          </div>
        )}

        {/* Floating Quick Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-2 rounded-full border border-white/[0.15] bg-[#070710]/90 px-3.5 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl hover:border-[#E8A765] hover:bg-[#E8A765]/10 hover:text-[#E8A765] transition-all duration-200 cursor-pointer"
        >
          <Palette className="h-3.5 w-3.5 text-[#E8A765]" />
          <ChevronUp className={`h-3 w-3 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* FULLSCREEN 22 WORLDS MATRIX MODAL */}
      <WorldMatrixModal
        isOpen={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
        currentThemeId={active}
        onSelectTheme={handleSelect}
      />
    </>
  );
}

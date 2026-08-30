import { useState, useEffect, useMemo } from "react";
import { websiteThemes } from "@/themes/website/registry";
import { Palette, Check, Sparkles, X, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export function FloatingThemeSwitcher({
  currentTheme,
  onThemeChange,
}: {
  currentTheme: string;
  onThemeChange?: (themeId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(currentTheme);
  const [allowedThemes, setAllowedThemes] = useState<string[] | null>(null);

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
    toast.success(`Previewing ${websiteThemes[themeId]?.name || themeId}`);
  };

  // Filter unique theme objects that are allowed by admin
  const visibleThemes = useMemo(() => {
    const seen = new Set<string>();
    const all = Object.values(websiteThemes).filter((t) => {
      if (seen.has(t.name)) return false;
      seen.add(t.name);
      return true;
    });

    if (!allowedThemes) return all;
    return all.filter((t) => allowedThemes.includes(t.id));
  }, [allowedThemes]);

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl border border-white/[0.12] bg-[#070710]/95 p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E8A765]/20 text-[#E8A765]">
                <Palette className="h-3.5 w-3.5" />
              </span>
              <span className="font-display text-sm font-bold text-white">Theme Engine Registry</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition"
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
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition ${
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
            <span>Portfolio OS Engine</span>
            <span>{visibleThemes.length} Approved Themes</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 rounded-full border border-white/[0.15] bg-[#070710]/90 px-4 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl hover:border-[#E8A765] hover:bg-[#E8A765]/10 hover:text-[#E8A765] transition-all duration-200"
      >
        <span className="flex h-2 w-2 rounded-full bg-[#E8A765] animate-pulse" />
        <Palette className="h-3.5 w-3.5 text-[#E8A765]" />
        <span className="max-w-[120px] truncate">
          {websiteThemes[active]?.name || "Theme Switcher"}
        </span>
        <ChevronUp className={`h-3 w-3 text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}

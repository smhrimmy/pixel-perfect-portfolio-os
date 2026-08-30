import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Sparkles, ArrowLeft, Globe, Eye } from "lucide-react";

export function MobileTopBar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const getTitle = () => {
    if (pathname === "/studio") return "Dashboard";
    if (pathname.includes("/studio/projects")) return "Projects";
    if (pathname.includes("/studio/articles")) return "Articles";
    if (pathname.includes("/studio/skills")) return "Skills Matrix";
    if (pathname.includes("/studio/experience")) return "Experience";
    if (pathname.includes("/studio/media")) return "Media Library";
    if (pathname.includes("/studio/seo")) return "SEO Doctor";
    if (pathname.includes("/studio/insights")) return "AI Insights";
    if (pathname.includes("/studio/analytics")) return "Analytics";
    if (pathname.includes("/studio/developer")) return "Developer Sync";
    if (pathname.includes("/studio/ai")) return "AI Workspace";
    if (pathname.includes("/studio/hq-terminal")) return "HQ Terminal";
    if (pathname.includes("/studio/settings")) return "Settings";
    if (pathname.includes("/studio/content")) return "Site Editor";
    return "Studio";
  };

  const isRoot = pathname === "/studio";

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#1E2630] bg-[#0B0F14]/95 px-4 backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-2.5">
        {!isRoot ? (
          <Link
            to="/studio"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1E2630] bg-[#11161D] text-[#E6F1FF] hover:text-[#00E6C3]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#00E6C3]/30 bg-[#00E6C3]/10 font-mono text-xs font-bold text-[#00E6C3]">
            P
          </div>
        )}
        <div>
          <h1 className="text-sm font-bold tracking-tight text-[#E6F1FF] font-display">
            {getTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/"
          target="_blank"
          className="flex h-8 items-center gap-1 rounded-full border border-[#1E2630] bg-[#11161D] px-2.5 text-[11px] font-medium text-[#9AA6B2] hover:text-[#00E6C3]"
          title="Open live site"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Live</span>
        </Link>
      </div>
    </header>
  );
}

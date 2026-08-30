import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Layers,
  Palette,
  Wrench,
  Settings,
  FolderKanban,
  Newspaper,
  Sparkles,
  Briefcase,
  Images,
  Search,
  BarChart3,
  Github,
  Bot,
  Activity,
  Terminal,
  X,
  ChevronRight,
  UserRound,
  FileCode,
  ShieldCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Destination = "home" | "content" | "design" | "tools" | "settings";

export function MobileBottomNav() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [activeDrawer, setActiveDrawer] = useState<Destination | null>(null);

  const getActiveTab = (): Destination => {
    if (pathname === "/studio") return "home";
    if (
      pathname.includes("/studio/projects") ||
      pathname.includes("/studio/articles") ||
      pathname.includes("/studio/skills") ||
      pathname.includes("/studio/experience")
    ) return "content";
    if (
      pathname.includes("/studio/hq-terminal") ||
      pathname.includes("/studio/content")
    ) return "design";
    if (
      pathname.includes("/studio/media") ||
      pathname.includes("/studio/seo") ||
      pathname.includes("/studio/insights") ||
      pathname.includes("/studio/analytics") ||
      pathname.includes("/studio/developer") ||
      pathname.includes("/studio/ai")
    ) return "tools";
    if (pathname.includes("/studio/settings")) return "settings";
    return "home";
  };

  const currentTab = getActiveTab();

  const contentItems = [
    { label: "Projects", href: "/studio/projects", icon: FolderKanban, desc: "Case studies & portfolio works" },
    { label: "Articles", href: "/studio/articles", icon: Newspaper, desc: "Technical blogs & publications" },
    { label: "Skills Matrix", href: "/studio/skills", icon: Sparkles, desc: "Tech stacks & proficiencies" },
    { label: "Experience", href: "/studio/experience", icon: Briefcase, desc: "Career timeline & positions" },
    { label: "Profile & Identity", href: "/studio/settings", icon: UserRound, desc: "Bio, socials, and contact info" },
  ];

  const designItems = [
    { label: "Theme Manager", href: "/studio/hq-terminal", icon: Terminal, desc: "Switch from 19 visual architectures" },
    { label: "Site Editor", href: "/studio/content", icon: FileCode, desc: "Visual structure & block layouts" },
    { label: "Tokens & Styles", href: "/studio/settings", icon: Palette, desc: "Colors, typography & radius" },
  ];

  const toolItems = [
    { label: "Media Library", href: "/studio/media", icon: Images, desc: "Asset uploads & gallery storage" },
    { label: "SEO Doctor", href: "/studio/seo", icon: Search, desc: "Metadata & search preview" },
    { label: "AI Insights", href: "/studio/insights", icon: Activity, desc: "Coded content diagnostics" },
    { label: "Analytics", href: "/studio/analytics", icon: BarChart3, desc: "Traffic & visitor telemetry" },
    { label: "Developer & GitHub", href: "/studio/developer", icon: Github, desc: "Repository sync & status" },
    { label: "AI Workspace", href: "/studio/ai", icon: Bot, desc: "Grounded assistant workflows" },
    { label: "Recruiter ATS View", href: "/recruiter", icon: UserRound, desc: "Print-ready resume format" },
  ];

  return (
    <>
      {/* Bottom Sheet Drawer for Sub-destinations */}
      {activeDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setActiveDrawer(null)}
        >
          <div
            className="fixed bottom-0 left-0 right-0 max-h-[75vh] rounded-t-3xl border-t border-[#1E2630] bg-[#11161D] p-5 shadow-2xl overflow-y-auto animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-[#1E2630] pb-3 mb-4">
              <div>
                <h3 className="text-base font-bold capitalize text-[#E6F1FF] font-display">
                  {activeDrawer} Modules
                </h3>
                <p className="text-xs text-[#9AA6B2]">Select a destination</p>
              </div>
              <button
                onClick={() => setActiveDrawer(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2630] text-[#9AA6B2] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sub-item Links */}
            <div className="space-y-2">
              {(activeDrawer === "content" ? contentItems : activeDrawer === "design" ? designItems : toolItems).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setActiveDrawer(null)}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[#1E2630] bg-[#0B0F14]/60 hover:border-[#00E6C3]/40 hover:bg-[#00E6C3]/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E2630] bg-[#11161D] text-[#00E6C3]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#E6F1FF]">{item.label}</div>
                      <div className="text-[11px] text-[#9AA6B2]">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-[#9AA6B2]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[#1E2630] bg-[#0B0F14]/95 backdrop-blur-xl px-2 md:hidden">
        {/* 1. Home */}
        <Link
          to="/studio"
          className={`flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-colors ${
            currentTab === "home" ? "text-[#00E6C3]" : "text-[#9AA6B2] hover:text-white"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight">Home</span>
        </Link>

        {/* 2. Content */}
        <button
          onClick={() => setActiveDrawer(activeDrawer === "content" ? null : "content")}
          className={`flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-colors ${
            currentTab === "content" ? "text-[#00E6C3]" : "text-[#9AA6B2] hover:text-white"
          }`}
        >
          <Layers className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight">Content</span>
        </button>

        {/* 3. Design */}
        <button
          onClick={() => setActiveDrawer(activeDrawer === "design" ? null : "design")}
          className={`flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-colors ${
            currentTab === "design" ? "text-[#00E6C3]" : "text-[#9AA6B2] hover:text-white"
          }`}
        >
          <Palette className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight">Design</span>
        </button>

        {/* 4. Tools */}
        <button
          onClick={() => setActiveDrawer(activeDrawer === "tools" ? null : "tools")}
          className={`flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-colors ${
            currentTab === "tools" ? "text-[#00E6C3]" : "text-[#9AA6B2] hover:text-white"
          }`}
        >
          <Wrench className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight">Tools</span>
        </button>

        {/* 5. Settings */}
        <Link
          to="/studio/settings"
          className={`flex flex-col items-center justify-center gap-1 w-14 py-1 rounded-xl transition-colors ${
            currentTab === "settings" ? "text-[#00E6C3]" : "text-[#9AA6B2] hover:text-white"
          }`}
        >
          <Settings className="h-5 w-5" />
          <span className="text-[10px] font-medium tracking-tight">Settings</span>
        </Link>
      </nav>
    </>
  );
}

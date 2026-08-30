import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderSync,
  FolderKanban,
  Sparkles,
  Briefcase,
  Newspaper,
  Search,
  Settings,
  Images,
  BarChart3,
  Github,
  Bot,
  UserRound,
  Terminal,
  Activity,
  GraduationCap,
  Award,
  User,
  Palette,
  Layout,
  Boxes,
  Sliders,
  Compass,
  Cog,
  Command,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

interface NavEntry {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  badge?: string;
}

const contentItems: NavEntry[] = [
  { title: "Dashboard", url: "/studio", icon: LayoutDashboard, exact: true },
  { title: "Projects", url: "/studio/projects", icon: FolderKanban },
  { title: "Articles", url: "/studio/articles", icon: Newspaper },
  { title: "Experience", url: "/studio/experience", icon: Briefcase },
  { title: "Skills", url: "/studio/skills", icon: Sparkles },
  { title: "Education", url: "/studio/experience", icon: GraduationCap },
  { title: "Certifications", url: "/studio/skills", icon: Award },
  { title: "Profile", url: "/studio/settings", icon: User },
];

const designItems: NavEntry[] = [
  { title: "Themes", url: "/studio/hq-terminal", icon: Palette },
  { title: "Site Editor", url: "/studio/content", icon: Layout },
  { title: "Components", url: "/studio/content", icon: Boxes },
  { title: "Styles", url: "/studio/settings", icon: Sliders },
  { title: "Navigation", url: "/studio/content", icon: Compass },
];

const toolItems: NavEntry[] = [
  { title: "Automations", url: "/studio/automations", icon: FolderSync, badge: "Engine" },
  { title: "Media", url: "/studio/media", icon: Images },
  { title: "SEO", url: "/studio/seo", icon: Search },
  { title: "Analytics", url: "/studio/analytics", icon: BarChart3 },
  { title: "AI / Intelligence", url: "/studio/ai", icon: Bot },
  { title: "Developer", url: "/studio/developer", icon: Github },
  { title: "Settings", url: "/studio/settings", icon: Settings },
];

export function StudioSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string, exact = false) =>
    exact ? pathname === url : pathname === url || (url !== "/studio" && pathname.startsWith(url));

  const renderGroup = (label: string, items: NavEntry[]) => (
    <SidebarGroup className="py-1">
      <SidebarGroupLabel className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#9AA6B2] px-3 py-1">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-0.5">
          {items.map((item) => {
            const active = isActive(item.url, item.exact ?? false);
            return (
              <SidebarMenuItem key={item.title + item.url}>
                <SidebarMenuButton asChild isActive={active} className="px-3 py-2 rounded-xl text-xs">
                  <Link
                    to={item.url}
                    className={`flex items-center justify-between gap-2.5 transition-all ${
                      active
                        ? "text-[#00E6C3] font-semibold bg-[#00E6C3]/10"
                        : "text-[#9AA6B2] hover:text-[#E6F1FF] hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <item.icon className={`h-4 w-4 shrink-0 ${active ? "text-[#00E6C3]" : "text-[#9AA6B2]"}`} />
                      <span className="truncate">{item.title}</span>
                    </div>
                    {item.badge && (
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-[#00E6C3]/30 text-[#00E6C3]">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-[#1E2630] bg-[#07090D]">
      {/* Brand Header */}
      <SidebarHeader className="p-4 border-b border-[#1E2630]/60 flex items-center justify-between">
        <Link to="/studio" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#00E6C3] to-teal-600 text-black font-black text-xs shadow-lg shadow-[#00E6C3]/20">
            PDL
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xs tracking-wider text-white">PORTFOLIO OS</span>
              <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-white/10 text-[#00E6C3] font-bold">OS</span>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2 overflow-y-auto space-y-1">
        {renderGroup("Content", contentItems)}
        {renderGroup("Design", designItems)}
        {renderGroup("Tools", toolItems)}
      </SidebarContent>

      {/* User Profile Footer Card */}
      <SidebarFooter className="p-3 border-t border-[#1E2630]/60 bg-[#0B0F14]/80">
        <Link
          to="/studio/settings"
          className="flex items-center justify-between p-2 rounded-xl border border-[#1E2630] bg-[#11161D] hover:border-white/20 transition-all group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white font-bold text-xs shrink-0">
              P
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate">Prajwal DL</span>
              <span className="text-[10px] text-[#9AA6B2] truncate">Full Stack Developer</span>
            </div>
          </div>
          <Cog className="h-3.5 w-3.5 text-[#9AA6B2] group-hover:text-white group-hover:rotate-90 transition-all shrink-0 ml-2" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
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
} from "@/components/ui/sidebar";

const items: Array<{ title: string; url: string; icon: typeof LayoutDashboard; exact?: boolean }> = [
  { title: "Dashboard", url: "/studio", icon: LayoutDashboard, exact: true },
  { title: "Projects", url: "/studio/projects", icon: FolderKanban },
  { title: "Skills", url: "/studio/skills", icon: Sparkles },
  { title: "Experience", url: "/studio/experience", icon: Briefcase },
  { title: "Articles", url: "/studio/articles", icon: Newspaper },
  { title: "Media", url: "/studio/media", icon: Images },
  { title: "SEO", url: "/studio/seo", icon: Search },
  { title: "Analytics", url: "/studio/analytics", icon: BarChart3 },
  { title: "Developer", url: "/studio/developer", icon: Github },
  { title: "AI Workspace", url: "/studio/ai", icon: Bot },
  { title: "Recruiter view", url: "/recruiter", icon: UserRound },
  { title: "HQ Terminal", url: "/studio/hq-terminal", icon: Terminal },
  { title: "Settings", url: "/studio/settings", icon: Settings },
];

export function StudioSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (url: string, exact = false) =>
    exact ? pathname === url : pathname === url || pathname.startsWith(url + "/");

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>CMS Studio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url, item.exact ?? false)}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

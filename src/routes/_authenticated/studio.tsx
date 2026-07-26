import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudioSidebar } from "@/components/studio/studio-sidebar";
import { CommandPalette } from "@/components/studio/command-palette";

export const Route = createFileRoute("/_authenticated/studio")({
  component: StudioLayout,
});

function StudioLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <StudioSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-12 items-center justify-between border-b px-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm font-medium">Portfolio OS · CMS Studio</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <kbd className="rounded border px-1.5 py-0.5">⌘K</kbd>
              <Link to="/recruiter" className="hover:text-foreground">
                Recruiter view
              </Link>
              <Link to="/" className="hover:text-foreground">
                View site →
              </Link>
            </div>
          </header>
          <main className="flex-1 min-h-0">
            <Outlet />
          </main>
        </div>
      </div>
      <CommandPalette />
      <Toaster richColors position="bottom-right" />
    </SidebarProvider>
  );
}

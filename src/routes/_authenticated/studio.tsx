import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { StudioSidebar } from "@/components/studio/studio-sidebar";
import { CommandPalette } from "@/components/studio/command-palette";
import { PdlIntelligenceModal } from "@/components/studio/PdlIntelligenceModal";
import { MobileBottomNav } from "@/components/studio/mobile/MobileBottomNav";
import { MobileTopBar } from "@/components/studio/mobile/MobileTopBar";

export const Route = createFileRoute("/_authenticated/studio")({
  component: StudioLayout,
});

function StudioLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full max-w-full overflow-x-hidden bg-[#0B0F14] text-[#E6F1FF]">
        {/* Desktop Sidebar (hidden on mobile) */}
        <div className="hidden md:block shrink-0">
          <StudioSidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col max-w-full overflow-x-hidden">
          {/* Mobile Top Bar */}
          <MobileTopBar />

          {/* Desktop Top Header (hidden on mobile) */}
          <header className="hidden md:flex h-12 items-center justify-between border-b border-[#1E2630] bg-[#11161D]/70 px-4 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-xs font-semibold text-[#E6F1FF] truncate">Portfolio OS · CMS Studio</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#9AA6B2] shrink-0">
              <kbd className="rounded border border-[#1E2630] bg-[#0B0F14] px-1.5 py-0.5 text-[10px]">⌘K Search</kbd>
              <kbd className="rounded border border-[#00E6C3]/40 bg-[#00E6C3]/10 px-1.5 py-0.5 text-[10px] text-[#00E6C3]">⌘J AI</kbd>
              <Link to="/recruiter" className="hover:text-white transition-colors">
                Recruiter view
              </Link>
              <Link to="/" className="hover:text-white transition-colors">
                View site →
              </Link>
            </div>
          </header>

          {/* Main content area with padding for bottom nav on mobile */}
          <main className="flex-1 min-w-0 min-h-0 pb-24 md:pb-8 p-3 sm:p-5 lg:p-7 max-w-full overflow-y-auto overflow-x-hidden">
            <div className="w-full max-w-7xl mx-auto min-w-0">
              <Outlet />
            </div>
          </main>

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav />
        </div>
      </div>
      <CommandPalette />
      <PdlIntelligenceModal />
      <Toaster richColors position="bottom-right" />
    </SidebarProvider>
  );
}

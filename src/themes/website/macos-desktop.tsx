import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Apple,
  Wifi,
  Battery,
  BatteryMedium,
  Search,
  User,
  Briefcase,
  Code,
  Layers,
  Wrench,
  Mail,
  Signal,
  Bot,
  ChevronLeft,
  Home,
  X,
  Minus,
  Maximize2
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { IosControlCenter } from "../../components/ui/ios-control-center";
import { IosSpotlight } from "../../components/ui/ios-spotlight";
import { IosAiSheet } from "../../components/ui/ios-ai-sheet";
import { ClockWidget, SkillsWidget, ExperienceWidget, ProjectsWidget } from "../../components/ui/ios-widgets";

type AppData = {
  id: string;
  title: string;
  icon: React.ElementType;
  bgGradient: string;
  renderContent: (c: any) => React.ReactNode;
};

// Sleek iOS/macOS glossy gradients for icons
const APPS: AppData[] = [
  {
    id: "about",
    title: "About Me",
    icon: User,
    bgGradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    renderContent: (c) => (
      <div className="p-6 space-y-4 text-sm text-foreground">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-2xl font-bold">
            {c.identity?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{c.identity?.name || "Portfolio"}</h2>
            <p className="text-muted-foreground">{c.identity?.role || "Professional"}</p>
          </div>
        </div>
        <p className="text-lg font-medium leading-relaxed">{c.hero?.sub}</p>
        {(c.hero?.industries?.length > 0) && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Industries</h3>
            <div className="flex flex-wrap gap-2">
              {c.hero.industries.map((ind: string) => (
                <span key={ind} className="px-2 py-1 bg-secondary rounded-md text-xs">{ind}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
  },
  {
    id: "experience",
    title: "Experience",
    icon: Briefcase,
    bgGradient: "bg-gradient-to-br from-orange-400 to-orange-600",
    renderContent: (c) => (
      <div className="p-6 space-y-6 text-sm text-foreground">
        {(!c.experience || c.experience.length === 0) && <p className="text-muted-foreground">No experience listed.</p>}
        {c.experience?.map((exp: any) => (
          <div key={exp.id} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{exp.role}</h3>
                <p className="text-orange-500 font-medium">{exp.company}</p>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                {exp.startDate} - {exp.endDate || "Present"}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">{exp.summary}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "skills",
    title: "Skills",
    icon: Wrench,
    bgGradient: "bg-gradient-to-br from-green-400 to-green-600",
    renderContent: (c) => (
      <div className="p-6 text-sm text-foreground">
        {(!c.skills || c.skills.length === 0) && <p className="text-muted-foreground">No skills listed.</p>}
        <div className="flex flex-wrap gap-3">
          {c.skills?.map((skill: any) => (
            <div key={skill.id} className="px-4 py-2 bg-secondary rounded-lg font-medium shadow-sm border border-border/50">
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "projects",
    title: "Projects",
    icon: Code,
    bgGradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    renderContent: (c) => (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
        {(!c.projects || c.projects.length === 0) && <p className="text-muted-foreground">No projects listed.</p>}
        {c.projects?.map((p: any) => (
          <div key={p.title} className="p-4 rounded-xl border border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="text-xs uppercase tracking-wider text-purple-500 font-semibold mb-2">{p.tag}</div>
            <h3 className="font-bold text-lg mb-2">{p.title}</h3>
            <p className="text-muted-foreground line-clamp-3">{p.outcome}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "services",
    title: "Services",
    icon: Layers,
    bgGradient: "bg-gradient-to-br from-pink-400 to-pink-600",
    renderContent: (c) => (
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
        {(!c.services || c.services.length === 0) && <p className="text-muted-foreground">No services listed.</p>}
        {c.services?.map((s: any) => (
          <div key={s.title} className="p-4 rounded-xl border border-border/50 bg-card shadow-sm">
            <h3 className="font-bold text-lg mb-2">{s.title}</h3>
            <p className="text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    icon: Mail,
    bgGradient: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    renderContent: (c) => (
      <div className="p-6 flex flex-col items-center justify-center h-full text-center space-y-6 text-foreground min-h-[300px]">
        <div className="w-20 h-20 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
          <Mail className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{c.contact?.headingLead}</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">{c.contact?.sub}</p>
        </div>
        <div className="flex gap-4">
          <a href={c.links?.email} className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium shadow-md">
            Send Email
          </a>
          <a href={c.links?.book} className="px-6 py-2 bg-secondary text-secondary-foreground rounded-full font-medium shadow-md border border-border">
            Book Call
          </a>
        </div>
      </div>
    ),
  },
];

// --- Subcomponents for authentic macOS Dock Magnification ---
function DockIcon({ 
  app, 
  mouseX, 
  isOpen, 
  onClick 
}: { 
  app: AppData; 
  mouseX: any; 
  isOpen: boolean; 
  onClick: () => void 
}) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Calculate distance from mouse to this icon's center
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale based on distance (closer = bigger)
  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.4, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative group flex flex-col items-center">
      {/* Tooltip */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none z-50">
        {app.title}
      </div>
      <motion.button
        ref={ref}
        style={{ scale }}
        onClick={onClick}
        className={`w-12 h-12 rounded-[22%] shadow-lg flex items-center justify-center text-white relative overflow-hidden ${app.bgGradient}`}
      >
        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
        <app.icon className="w-6 h-6 relative z-10" strokeWidth={2} />
      </motion.button>
      {/* Active Indicator */}
      {isOpen && (
        <div className="w-1 h-1 rounded-full bg-white/80 absolute -bottom-2" />
      )}
    </div>
  );
}


// --- Main Component ---
type WindowState = {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};

export default function MacOsDesktop({ data }: ThemeRendererProps) {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [highestZ, setHighestZ] = useState(10);
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  
  // iOS Overlays State
  const [isControlCenterOpen, setControlCenterOpen] = useState(false);
  const [isSpotlightOpen, setSpotlightOpen] = useState(false);
  const [isAiSheetOpen, setAiSheetOpen] = useState(false);
  
  // App Switcher & Edit Mode State
  const [isAppSwitcherOpen, setAppSwitcherOpen] = useState(false);
  const [isJiggling, setIsJiggling] = useState(false);
  
  // Widget visibility state
  const [visibleWidgets, setVisibleWidgets] = useState({
    clock: true,
    experience: true,
    skills: false,
    projects: false
  });
  
  const triggerAi = () => {
    triggerHaptic('medium');
    setAiSheetOpen(true);
  };
  
  // Haptic feedback utility
  const triggerHaptic = (style: 'light' | 'medium' | 'heavy' | 'success' = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (style === 'light') navigator.vibrate(15);
      if (style === 'medium') navigator.vibrate(30);
      if (style === 'heavy') navigator.vibrate(50);
      if (style === 'success') navigator.vibrate([20, 30, 20]);
    }
  };
  
  // Mouse position for dock magnification
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = (id: string) => {
    triggerHaptic('light');
    setHighestZ((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        id,
        isOpen: true,
        isMinimized: false,
        isMaximized: prev[id]?.isMaximized || false, // Mobile uses full screen via CSS anyway
        zIndex: highestZ + 1,
      },
    }));
  };

  const focusApp = (id: string) => {
    if (windows[id]?.zIndex === highestZ) return;
    setHighestZ((prev) => prev + 1);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: false,
        zIndex: highestZ + 1,
      },
    }));
  };

  const closeApp = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    triggerHaptic('medium');
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false },
    }));
  };

  const minimizeApp = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  };

  const maximizeApp = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    focusApp(id);
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  };

  const activeAppId = Object.values(windows)
    .filter((w) => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0]?.id;
  const activeAppName = activeAppId ? APPS.find((a) => a.id === activeAppId)?.title : "Finder";

  const openApps = Object.keys(windows).filter(id => windows[id].isOpen);

  // macOS Sonoma inspired wallpaper (abstract shapes/gradients)
  const macOSWallpaper = "radial-gradient(circle at 50% -20%, #4facfe 0%, #00f2fe 40%, #0250c5 100%)";
  // iOS 17 inspired wallpaper (blurry colorful mesh)
  const iOSWallpaper = "radial-gradient(circle at top right, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)";

  const handlePanEnd = (e: any, info: any) => {
      // Swipe down threshold
      if (info.offset.y > 50 && info.velocity.y > 200) {
        // If it originated from the right side of the screen
        if (info.point.x > window.innerWidth - 100) {
          setControlCenterOpen(true);
        } else {
          setSpotlightOpen(true);
        }
      }
    };
    
    // Long Press Timer for Jiggle Mode
    let longPressTimer: NodeJS.Timeout;
    const handleTouchStart = () => {
      if (isJiggling) return; // already jiggling
      longPressTimer = setTimeout(() => {
        if (!isAppSwitcherOpen && Object.values(windows).every(w => !w.isOpen || w.isMinimized)) {
          setIsJiggling(true);
          triggerHaptic('success');
        }
      }, 600); // 600ms hold
    };
    const handleTouchEnd = () => {
      clearTimeout(longPressTimer);
    };

    return (
      <>
        {/* 📱 MOBILE VIEW (Hidden on md and up) */}
        <motion.div 
          className="block md:hidden h-[100dvh] w-full overflow-hidden text-black relative flex flex-col"
          style={{ background: iOSWallpaper }}
          onPanEnd={handlePanEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => {
            if (isJiggling) setIsJiggling(false);
          }}
        >
          {/* Hide global floating AI button for this mobile view */}
        <style>{`
          @media (max-width: 767px) {
            #global-ai-chatbot-trigger {
              display: none !important;
            }
          }
        `}</style>
        
        {/* Dynamic Island Status Bar */}
        <div className="h-12 w-full flex items-center justify-between px-6 pt-2 z-[900] text-black font-semibold text-sm pointer-events-none">
          <span suppressHydrationWarning>{mounted ? time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ""}</span>
          
          {/* Functional Dynamic Island */}
          <button 
            onClick={triggerAi}
            className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-2 w-[120px] h-8 bg-black rounded-full flex items-center justify-between px-3 hover:scale-105 transition-transform"
          >
            <Bot className="w-4 h-4 text-white opacity-80" />
            <div className="flex gap-1 items-center">
               <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
               <div className="w-1 h-1 rounded-full bg-orange-500" />
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <BatteryMedium className="w-5 h-5" />
          </div>
        </div>

        {/* Top-Right Control Center Hitbox */}
        <div 
          className="absolute top-0 right-0 w-32 h-16 z-[950]" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent jiggle dismiss
            setControlCenterOpen(true);
          }}
        />

        {/* Home Screen Content Wrapper (Strictly single screen, no scroll) */}
        <div className="flex-1 pt-safe-top w-full px-5 pb-6 flex flex-col">
          
          {/* iOS Widget Grid (Top Section) */}
          <div className="grid grid-cols-4 gap-4 mt-2">
            {visibleWidgets.clock && (
              <ClockWidget isJiggling={isJiggling} onRemove={() => setVisibleWidgets(p => ({ ...p, clock: false }))} />
            )}
            {visibleWidgets.experience && (
              <ExperienceWidget isJiggling={isJiggling} content={content} onRemove={() => setVisibleWidgets(p => ({ ...p, experience: false }))} />
            )}
            {visibleWidgets.projects && (
              <ProjectsWidget isJiggling={isJiggling} content={content} onRemove={() => setVisibleWidgets(p => ({ ...p, projects: false }))} />
            )}
            {visibleWidgets.skills && (
              <SkillsWidget isJiggling={isJiggling} content={content} onRemove={() => setVisibleWidgets(p => ({ ...p, skills: false }))} />
            )}
          </div>

          {/* App Grid */}
          <div className="grid grid-cols-4 gap-x-4 gap-y-6 mt-8">
            {APPS.map((app) => (
              <motion.button
                key={app.id}
                animate={isJiggling ? {
                  rotate: [ -1, 1, -1.5, 1.5, -1 ],
                  transition: {
                    repeat: Infinity,
                    duration: 0.3 + Math.random() * 0.1,
                    ease: "linear"
                  }
                } : {
                  rotate: 0,
                  transition: { duration: 0.2 }
                }}
                onClick={(e) => {
                  if (isJiggling) {
                    e.stopPropagation();
                    return; // Disabled launching apps while jiggling
                  }
                  openApp(app.id);
                }}
                className="flex flex-col items-center gap-1 outline-none relative"
              >
                {/* Optional minus button on apps too */}
                <AnimatePresence>
                  {isJiggling && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-1 -left-1 z-50 w-6 h-6 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-black/10 text-black pointer-events-none"
                    >
                      <Minus className="w-3 h-3" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className={`w-[60px] h-[60px] rounded-[1.25rem] shadow-sm flex items-center justify-center text-white relative overflow-hidden ${app.bgGradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
                  <app.icon className="w-7 h-7 relative z-10" strokeWidth={1.5} />
                </div>
                <span className="text-black/80 text-xs font-medium drop-shadow-md truncate w-full text-center">
                  {app.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom Fixed Dock */}
        <div className="mb-safe-bottom mb-4 mx-4 h-[84px] rounded-[2rem] bg-white/30 backdrop-blur-xl border border-white/20 p-3 flex items-center justify-around shrink-0 z-50">
           {/* Show first 4 apps in dock for iOS */}
           {APPS.slice(0, 4).map((app) => (
            <button
              key={`dock-${app.id}`}
              onClick={() => openApp(app.id)}
              className={`w-[56px] h-[56px] rounded-[1.15rem] shadow-sm flex items-center justify-center text-white relative overflow-hidden ${app.bgGradient}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
              <app.icon className="w-7 h-7 relative z-10" strokeWidth={1.5} />
            </button>
          ))}
        </div>

      {/* Render Opened Apps */}
      <AnimatePresence>
        {openApps.map((appId) => {
          const app = APPS.find((a) => a.id === appId);
          if (!app) return null;
          return (
            <motion.div 
              key={app.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={isAppSwitcherOpen ? { opacity: 1, scale: 0.75, y: -50, borderRadius: 32 } : { opacity: 1, scale: 1, y: 0, borderRadius: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }}
              className={`absolute inset-0 bg-background z-[100] flex flex-col overflow-hidden shadow-2xl ${isAppSwitcherOpen ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (isAppSwitcherOpen) {
                  triggerHaptic('light');
                  setAppSwitcherOpen(false);
                }
              }}
              drag={isAppSwitcherOpen ? "y" : false}
              dragConstraints={{ top: -200, bottom: 200 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (isAppSwitcherOpen && info.offset.y < -100) {
                  closeApp(app.id);
                  setAppSwitcherOpen(false);
                }
              }}
            >
              {/* iOS App Header */}
              {!isAppSwitcherOpen && (
                <div className="h-12 w-full flex items-center justify-between px-4 pt-safe-top bg-background/80 backdrop-blur-md border-b border-border z-10 shrink-0">
                  <button onClick={() => { triggerHaptic('medium'); setAppSwitcherOpen(true); }} className="flex items-center text-primary font-medium text-[15px] active:opacity-50">
                    <ChevronLeft className="w-5 h-5 mr-1 -ml-1" />
                    Home
                  </button>
                  <span className="font-semibold text-[15px]">{app.title}</span>
                  <button onClick={() => { triggerHaptic('light'); closeApp(app.id); }} className="w-7 h-7 bg-muted rounded-full flex items-center justify-center active:opacity-50">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <div className="flex-1 overflow-y-auto w-full relative">
                {/* Disable interactions when switcher is open */}
                {isAppSwitcherOpen && <div className="absolute inset-0 z-50" />}
                <app.renderContent content={content} />
              </div>

              {/* Home Indicator (Swipe up to switcher) */}
              {!isAppSwitcherOpen && (
                <div 
                  className="absolute bottom-safe-bottom bottom-4 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-foreground/30 rounded-full cursor-pointer hover:bg-foreground/50 transition-colors z-50 active:bg-foreground/70"
                  onClick={() => { triggerHaptic('medium'); setAppSwitcherOpen(true); }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* App Switcher Background Overlay */}
      <AnimatePresence>
        {isAppSwitcherOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md z-[90]"
            onClick={() => setAppSwitcherOpen(false)}
          >
            <div className="absolute bottom-12 w-full text-center text-white/50 text-sm font-medium animate-pulse">
              Swipe up on app to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Overlays */}
        <IosControlCenter 
          isOpen={isControlCenterOpen} 
          onClose={() => setControlCenterOpen(false)}
          onTriggerAI={triggerAi}
        />
        <IosSpotlight
          isOpen={isSpotlightOpen}
          onClose={() => setSpotlightOpen(false)}
          content={content}
          onOpenApp={openApp}
        />
        <IosAiSheet
          isOpen={isAiSheetOpen}
          onClose={() => setAiSheetOpen(false)}
          content={content}
        />
      </motion.div>

      {/* 💻 DESKTOP VIEW (Hidden on sm and down) */}
      <div 
        className="hidden md:block h-screen w-full overflow-hidden text-foreground selection:bg-blue-500/30 relative"
        style={{ background: macOSWallpaper }}
      >
        {/* Menu Bar */}
        <div className="absolute top-0 inset-x-0 h-7 bg-black/20 backdrop-blur-md border-b border-white/10 z-[9999] flex items-center justify-between px-4 text-xs font-medium text-white shadow-sm">
          <div className="flex items-center gap-4">
          <Apple className="w-4 h-4" fill="currentColor" />
          <span className="font-bold">{activeAppName}</span>
          <span className="cursor-default">File</span>
          <span className="cursor-default">Edit</span>
          <span className="cursor-default">View</span>
          <span className="cursor-default">Go</span>
          <span className="cursor-default">Window</span>
          <span className="cursor-default">Help</span>
        </div>
        <div className="flex items-center gap-4">
          <Wifi className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <Search className="w-4 h-4" />
          <span suppressHydrationWarning>{mounted ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric' }) : ""}</span>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-12 right-6 flex flex-col gap-6 items-end w-24">
        {APPS.map((app) => (
          <button
            key={app.id}
            onDoubleClick={() => openApp(app.id)}
            onClick={() => openApp(app.id)} 
            className="flex flex-col items-center gap-1.5 group w-full outline-none"
          >
            <div className={`w-16 h-16 rounded-[22%] shadow-lg flex items-center justify-center text-white relative overflow-hidden ${app.bgGradient} ring-2 ring-transparent group-focus:ring-white/50 transition-all`}>
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-50" />
              <app.icon className="w-8 h-8 relative z-10" strokeWidth={1.5} />
            </div>
            <span className="text-white text-xs font-medium px-2 py-0.5 rounded group-focus:bg-blue-500/80 text-center drop-shadow-md line-clamp-2">
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {/* Windows */}
      {APPS.map((app) => {
        const win = windows[app.id];
        if (!win || !win.isOpen) return null;

        return (
          <AnimatePresence key={app.id}>
            {!win.isMinimized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: win.isMaximized ? 28 : 0, 
                  width: win.isMaximized ? "100vw" : "auto",
                  height: win.isMaximized ? "calc(100vh - 28px - 80px)" : "auto", 
                  x: win.isMaximized ? 0 : undefined,
                }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                drag={!win.isMaximized}
                dragMomentum={false}
                dragElastic={0}
                onPointerDown={() => focusApp(app.id)}
                style={{ zIndex: win.zIndex }}
                className={`absolute top-24 left-24 min-w-[500px] max-w-2xl bg-background/90 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl rounded-xl overflow-hidden flex flex-col ${win.isMaximized ? 'rounded-none border-0 top-0 left-0' : ''}`}
              >
                {/* Window Header */}
                <div className="h-12 bg-white/10 dark:bg-black/10 border-b border-border/50 flex items-center px-4 relative select-none">
                  <div className="flex gap-2 z-10">
                    <button 
                      onClick={(e) => closeApp(app.id, e)}
                      className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-600 border border-red-600/50 flex items-center justify-center group/btn"
                    >
                      <X className="w-2.5 h-2.5 text-red-900 opacity-0 group-hover/btn:opacity-100" />
                    </button>
                    <button 
                      onClick={(e) => minimizeApp(app.id, e)}
                      className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-600 border border-yellow-600/50 flex items-center justify-center group/btn"
                    >
                      <Minus className="w-2.5 h-2.5 text-yellow-900 opacity-0 group-hover/btn:opacity-100" />
                    </button>
                    <button 
                      onClick={(e) => maximizeApp(app.id, e)}
                      className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-600 border border-green-600/50 flex items-center justify-center group/btn"
                    >
                      <Maximize2 className="w-2.5 h-2.5 text-green-900 opacity-0 group-hover/btn:opacity-100" />
                    </button>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-semibold text-sm text-foreground/80">{app.title}</span>
                  </div>
                </div>
                
                {/* Window Content */}
                <div className="flex-1 overflow-y-auto max-h-[60vh] p-0 bg-background/50">
                  {app.renderContent(content)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {/* Dock */}
      <div className="absolute bottom-2 inset-x-0 flex justify-center z-[9998] pointer-events-none">
        <motion.div 
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-2 bg-white/20 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 px-3 pb-2 pt-2 rounded-2xl shadow-2xl pointer-events-auto"
        >
          {APPS.map((app) => (
            <DockIcon 
              key={app.id}
              app={app}
              mouseX={mouseX}
              isOpen={!!windows[app.id]?.isOpen}
              onClick={() => {
                if (windows[app.id]?.isMinimized) {
                  focusApp(app.id);
                } else if (windows[app.id]?.isOpen) {
                  focusApp(app.id);
                } else {
                  openApp(app.id);
                }
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
    </>
  );
}

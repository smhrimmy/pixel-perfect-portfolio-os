import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Minus, Briefcase, Code, Terminal, Star } from "lucide-react";

type WidgetProps = {
  isJiggling: boolean;
  onRemove?: () => void;
  className?: string;
};

// Reusable Widget Container
export function WidgetContainer({ isJiggling, onRemove, className = "", children }: WidgetProps & { children: React.ReactNode }) {
  // Randomize jiggle slightly so they don't move exactly in sync
  const jiggleAnimation = isJiggling ? {
    rotate: [ -1, 1, -1.5, 1.5, -1 ],
    transition: {
      repeat: Infinity,
      duration: 0.3 + Math.random() * 0.1,
      ease: "linear"
    }
  } : {
    rotate: 0,
    transition: { duration: 0.2 }
  };

  return (
    <motion.div 
      animate={jiggleAnimation}
      className={`relative rounded-[1.75rem] bg-white/30 backdrop-blur-xl border border-white/20 shadow-md overflow-hidden ${className}`}
    >
      {/* Jiggle Edit Minus Button */}
      <AnimatePresence>
        {isJiggling && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="absolute top-2 left-2 z-50 w-7 h-7 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-black/10 active:scale-90 transition-transform"
          >
            <Minus className="w-4 h-4 text-black" />
          </motion.button>
        )}
      </AnimatePresence>

      {children}
    </motion.div>
  );
}

// 2x2 Small Widget: Clock & Date
export function ClockWidget({ isJiggling, onRemove }: WidgetProps) {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <WidgetContainer isJiggling={isJiggling} onRemove={onRemove} className="aspect-square p-4 flex flex-col justify-between col-span-2">
      <div className="flex justify-between items-start">
        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-sm">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Time</span>
      </div>
      
      <div suppressHydrationWarning>
        <div className="text-3xl font-light tracking-tighter text-black/90">
          {mounted ? time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : "--:--"}
        </div>
        <div className="text-sm font-semibold text-black/60">
          {mounted ? time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }) : "---"}
        </div>
      </div>
    </WidgetContainer>
  );
}

// 4x2 Medium Widget: Skills/Tech Stack
export function SkillsWidget({ isJiggling, onRemove, content }: WidgetProps & { content: any }) {
  const skills = content?.skills?.slice(0, 6) || [];
  
  return (
    <WidgetContainer isJiggling={isJiggling} onRemove={onRemove} className="col-span-4 p-4 flex flex-col justify-between min-h-[140px]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest flex items-center gap-1">
          <Terminal className="w-3 h-3" /> Tech Stack
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {skills.map((skill: any, i: number) => (
          <div key={i} className="px-3 py-1.5 bg-black/5 rounded-lg text-xs font-semibold text-black/70 border border-black/5">
            {skill.name}
          </div>
        ))}
        {skills.length === 0 && <div className="text-sm text-black/40">No skills added</div>}
      </div>
    </WidgetContainer>
  );
}

// 2x2 Small Widget: Quick Stats / Experience
export function ExperienceWidget({ isJiggling, onRemove, content }: WidgetProps & { content: any }) {
  const years = content?.experience?.length || 0;
  
  return (
    <WidgetContainer isJiggling={isJiggling} onRemove={onRemove} className="aspect-square p-4 flex flex-col justify-between col-span-2">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
        <Briefcase className="w-4 h-4 text-white" />
      </div>
      
      <div>
        <div className="text-4xl font-light tracking-tighter text-black/90 mb-1">{years}</div>
        <div className="text-sm font-semibold text-black/60 leading-tight">Roles<br/>Completed</div>
      </div>
    </WidgetContainer>
  );
}

// 4x2 Medium Widget: Projects Spotlight
export function ProjectsWidget({ isJiggling, onRemove, content }: WidgetProps & { content: any }) {
  const recentProject = content?.projects?.[0];

  return (
    <WidgetContainer isJiggling={isJiggling} onRemove={onRemove} className="col-span-4 p-4 flex flex-col justify-between bg-gradient-to-br from-purple-500/80 to-indigo-600/80 text-white min-h-[140px] border-none">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-1">
          <Code className="w-3 h-3" /> Latest Project
        </span>
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <Star className="w-3 h-3 text-white" />
        </div>
      </div>
      
      <div className="mt-2">
        <div className="text-lg font-bold leading-tight line-clamp-1">{recentProject?.title || "No Projects"}</div>
        <div className="text-sm font-medium text-white/70 line-clamp-2 mt-1">
          {recentProject?.outcome || "Add projects to see them here."}
        </div>
      </div>
    </WidgetContainer>
  );
}

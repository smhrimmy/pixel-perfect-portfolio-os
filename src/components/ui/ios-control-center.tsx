import { motion, AnimatePresence } from "framer-motion";
import { 
  Wifi, 
  Bluetooth, 
  Moon, 
  Sun, 
  Terminal, 
  Bot, 
  Download, 
  Share, 
  Monitor,
  User,
  Zap
} from "lucide-react";

export function IosControlCenter({ 
  isOpen, 
  onClose,
  onTriggerAI
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onTriggerAI: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[1000] bg-black/20 backdrop-blur-md"
          />
          
          {/* Control Center Panel */}
          <motion.div
            initial={{ y: "-100%", opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "-100%", opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 inset-x-0 z-[1001] p-6 pt-16 flex flex-col gap-4 max-w-sm mx-auto"
          >
            {/* Top Row: Connectivity & Audio */}
            <div className="grid grid-cols-2 gap-4">
              {/* Connectivity Module */}
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl p-4 grid grid-cols-2 gap-4 aspect-square shadow-sm border border-white/20">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                    <Wifi className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md">
                    <Bluetooth className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-white/10 text-foreground flex items-center justify-center">
                    <Monitor className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/20 dark:bg-white/10 text-foreground flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Media Module */}
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl p-4 flex flex-col justify-between shadow-sm border border-white/20">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-foreground/80" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-foreground leading-tight">Portfolio AI</p>
                    <p className="text-[10px] text-foreground/60">Not Playing</p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">◁</div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">▷</div>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">▷</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-4">
              <button 
                onClick={() => {
                  onClose();
                  onTriggerAI();
                }}
                className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm border border-white/20 hover:bg-white/40 transition"
              >
                <Bot className="w-6 h-6 text-primary" />
                <span className="text-[10px] font-medium">Ask AI</span>
              </button>
              
              <button className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm border border-white/20 hover:bg-white/40 transition">
                <Moon className="w-6 h-6 text-indigo-500" />
                <span className="text-[10px] font-medium">Dark</span>
              </button>
              
              <button className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm border border-white/20 hover:bg-white/40 transition">
                <Terminal className="w-6 h-6 text-foreground" />
                <span className="text-[10px] font-medium">Terminal</span>
              </button>

              <button className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl aspect-square flex flex-col items-center justify-center gap-1 shadow-sm border border-white/20 hover:bg-white/40 transition">
                <User className="w-6 h-6 text-green-500" />
                <span className="text-[10px] font-medium">Visitor</span>
              </button>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl h-32 p-4 relative shadow-sm border border-white/20 overflow-hidden flex flex-col justify-end">
                <div className="absolute inset-x-0 bottom-0 top-1/3 bg-white/50 dark:bg-white/20" />
                <Sun className="w-6 h-6 text-foreground/80 relative z-10 mb-2" />
              </div>
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl h-32 p-4 relative shadow-sm border border-white/20 overflow-hidden flex flex-col justify-end">
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-white/50 dark:bg-white/20" />
                <div className="w-6 h-6 text-foreground/80 relative z-10 mb-2 font-bold text-center flex items-center justify-center">)</div>
              </div>
            </div>

             {/* Bottom Actions */}
             <div className="grid grid-cols-2 gap-4">
              <button className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl py-3 flex items-center justify-center gap-2 shadow-sm border border-white/20 hover:bg-white/40 transition">
                <Download className="w-5 h-5 text-foreground" />
                <span className="text-xs font-semibold">Resume</span>
              </button>
              <button className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl py-3 flex items-center justify-center gap-2 shadow-sm border border-white/20 hover:bg-white/40 transition">
                <Share className="w-5 h-5 text-foreground" />
                <span className="text-xs font-semibold">Share</span>
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, AppWindow, Code, Wrench, Briefcase, Bot } from "lucide-react";

export function IosSpotlight({ 
  isOpen, 
  onClose,
  content,
  onOpenApp
}: { 
  isOpen: boolean; 
  onClose: () => void;
  content: any;
  onOpenApp: (appId: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query) return [];
    const q = query.toLowerCase();
    const results = [];
    
    // Commands
    if ("terminal".includes(q)) results.push({ type: "app", title: "Terminal", subtitle: undefined, id: "terminal", icon: Code });
    if ("ai assistant".includes(q)) results.push({ type: "app", title: "AI Assistant", subtitle: undefined, id: "ai", icon: Bot });
    
    // Content search
    if (content?.projects) {
      content.projects.forEach((p: any) => {
        if (p.title.toLowerCase().includes(q) || p.summary?.toLowerCase().includes(q)) {
          results.push({ type: "project", title: p.title, subtitle: p.tag, id: "projects", icon: AppWindow });
        }
      });
    }
    
    if (content?.skills) {
      content.skills.forEach((s: any) => {
        if (s.name.toLowerCase().includes(q)) {
          results.push({ type: "skill", title: s.name, subtitle: "Skill", id: "skills", icon: Wrench });
        }
      });
    }

    if (content?.experience) {
      content.experience.forEach((e: any) => {
        if (e.role.toLowerCase().includes(q) || e.company.toLowerCase().includes(q)) {
          results.push({ type: "experience", title: e.role, subtitle: e.company, id: "experience", icon: Briefcase });
        }
      });
    }
    
    return results.slice(0, 8);
  };

  const results = handleSearch();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[1000] bg-black/40 text-foreground pt-safe-top"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="p-6 pt-12 flex flex-col items-center w-full max-w-md mx-auto h-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="w-full relative flex items-center mb-6">
              <Search className="absolute left-4 w-5 h-5 text-foreground/50" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-2xl py-3 pl-12 pr-10 text-foreground placeholder:text-foreground/50 outline-none border border-white/20 shadow-sm text-lg"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 text-foreground/50 hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Results */}
            <div className="w-full flex-1 overflow-y-auto pb-safe-bottom">
              {query && results.length === 0 && (
                <p className="text-center text-foreground/60 mt-8">No results found</p>
              )}
              
              {results.length > 0 && (
                <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-sm">
                  {results.map((result, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        onOpenApp(result.id);
                        onClose();
                      }}
                      className="w-full text-left px-4 py-3 flex items-center gap-4 border-b border-white/10 last:border-0 hover:bg-white/20 dark:hover:bg-black/20 transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                        <result.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{result.title}</p>
                        {result.subtitle && <p className="text-xs text-foreground/60">{result.subtitle}</p>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

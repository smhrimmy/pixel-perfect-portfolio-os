import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

export function IosAiSheet({ isOpen, onClose, content }: { isOpen: boolean; onClose: () => void; content: any }) {
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I'm your AI assistant. How can I help you navigate the portfolio?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Haptic feedback utility
  const triggerHaptic = (style: 'light' | 'medium' | 'heavy' = 'light') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      if (style === 'light') navigator.vibrate(15);
      if (style === 'medium') navigator.vibrate(30);
      if (style === 'heavy') navigator.vibrate(50);
    }
  };

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen, isTyping]);

  const handleQuery = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setMessages((prev) => [...prev, { role: "user", text: raw }]);
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";

      if (cmd === "clear") {
        setMessages([{ role: "ai", text: "Chat cleared. How can I help you?" }]);
        setIsTyping(false);
        return;
      }
      
      const { experience, skills, projects, identity, contact, links, articles: cmsArticles, education, certifications } = content || {};
      const allProjects = projects || [];
      const allArticles = cmsArticles || [];
      const allExp = experience || [];
      const allEdu = education || [];
      const allCerts = certifications || [];
      
      const isGreeting = /^(hi|hello|hey|yo)/.test(cmd);
      const asksWhen = cmd.includes("when") || cmd.includes("year") || cmd.includes("date") || cmd.includes("time") || cmd.includes("duration");
      const asksWhere = cmd.includes("where") || cmd.includes("location") || cmd.includes("place") || cmd.includes("city") || cmd.includes("country");
      const asksContact = cmd.includes("contact") || cmd.includes("email") || cmd.includes("hire") || cmd.includes("phone");
      
      const stopWords = ["what", "when", "where", "how", "who", "why", "this", "that", "your", "have", "are", "you", "did", "was", "the", "and", "for", "with", "is", "about", "tell", "me", "completed", "complete", "study", "work", "build"];
      const keywords = cmd.split(" ").filter((w: string) => w.length > 2 && !stopWords.includes(w));

      if (isGreeting) {
        aiResponse = `Hello! I'm an AI assistant trained on ${identity?.name || "Prajwal"}'s portfolio. How can I help you today?`;
      } else if (asksContact) {
        aiResponse = `You can contact him via Email at ${links?.email || "pdlkpt@gmail.com"} or by Phone at +918105561638. LinkedIn is also available at ${links?.linkedin || "his profile"}.`;
      } else {
        let bestMatch: any = null;
        let bestScore = 0;
        let matchType = "";

        const searchList = (list: any[], type: string) => {
          for (const item of list) {
            const itemStr = JSON.stringify(item).toLowerCase();
            let score = 0;
            for (const k of keywords) {
              const stemLen = Math.max(4, Math.floor(k.length * 0.75));
              const stem = k.length > 4 ? k.substring(0, stemLen) : k;
              if (itemStr.includes(stem)) score++;
            }
            if (score > bestScore) {
              bestScore = score;
              bestMatch = item;
              matchType = type;
            }
          }
        };

        if (keywords.length > 0) {
          searchList(allEdu, "education");
          searchList(allExp, "experience");
          searchList(allProjects, "project");
          searchList(allArticles, "blog");
          searchList(allCerts, "certification");
        }

        if (bestScore > 0 && bestMatch) {
          if (matchType === "education") {
            if (asksWhen) aiResponse = `The ${bestMatch.title} was completed in ${bestMatch.date.split("·")[0].trim()}.`;
            else if (asksWhere) aiResponse = `The studies for ${bestMatch.title} took place at ${bestMatch.org}.`;
            else aiResponse = `Here are the details: ${bestMatch.title} at ${bestMatch.org} (${bestMatch.date}).`;
          } else if (matchType === "experience") {
            if (asksWhen) aiResponse = `The role of ${bestMatch.role} at ${bestMatch.company} was from ${bestMatch.period || bestMatch.startDate}.`;
            else if (asksWhere) aiResponse = `The role at ${bestMatch.company} was located in ${bestMatch.location}.`;
            else aiResponse = `Here are the details: ${bestMatch.role} at ${bestMatch.company}.\nSummary: ${(bestMatch.bullets || []).join(" ")}`;
          } else if (matchType === "project") {
            aiResponse = `Are you asking about the project "${bestMatch.title}"? \n\nSummary: ${bestMatch.desc || bestMatch.summary || bestMatch.description}\n\nTechnologies: ${(bestMatch.tags || []).join(", ")}`;
          } else if (matchType === "blog") {
            aiResponse = `Are you asking about the article "${bestMatch.title}"? \n\nCategory: ${bestMatch.category}\nRead time: ${bestMatch.readMin} mins.\n\nSummary: ${bestMatch.desc || "No summary provided."}`;
          } else if (matchType === "certification") {
             aiResponse = `The ${bestMatch.title} certification was achieved from ${bestMatch.org} in ${bestMatch.year}.`;
          }
        } else {
          const asksEdu = cmd.includes("study") || cmd.includes("education") || cmd.includes("school") || cmd.includes("degree") || cmd.includes("college") || cmd.includes("university") || cmd.includes("learn") || cmd.includes("diploma");
          const asksExp = cmd.includes("experience") || cmd.includes("work") || cmd.includes("job") || cmd.includes("history");
          const asksSkills = cmd.includes("skill") || cmd.includes("tech") || cmd.includes("stack") || cmd.includes("know");
          const asksProjects = cmd.includes("project") || cmd.includes("build") || cmd.includes("made") || cmd.includes("portfolio");
          const asksBlogs = cmd.includes("blog") || cmd.includes("article") || cmd.includes("post") || cmd.includes("write");

          if (asksEdu) {
             const eduList = allEdu.map((e: any) => `- ${e.title} at ${e.org} (${e.date})`);
             aiResponse = "Here is the general educational background:\n\n" + (eduList.length ? eduList.join("\n\n") : "Not available.");
          } else if (asksExp) {
             const expList = allExp.slice(0, 3).map((e: any) => `- ${e.role} at ${e.company} (${e.period || e.startDate})`);
             aiResponse = "Here is some recent experience:\n\n" + (expList.length ? expList.join("\n") + "\n\nYou can ask me about a specific role for more details!" : "Not available.");
          } else if (asksSkills) {
             const skillNames = (skills || []).map((s: any) => s.name).slice(0, 15).join(", ");
             aiResponse = "Here are some of the technologies used: " + (skillNames || "React, Next.js, TypeScript") + "... Scroll to the Skills section to see them all!";
          } else if (asksProjects) {
             const projList = allProjects.slice(0, 3).map((p: any) => `- ${p.title}`);
             aiResponse = "Here are a few notable projects:\n" + (projList.length ? projList.join("\n") + "\n\nYou can ask me for a summary of a specific project!" : "Not available.");
          } else if (asksBlogs) {
             const blogList = allArticles.slice(0, 3).map((a: any) => `- ${a.title}`);
             aiResponse = "Here are some recent articles:\n" + (blogList.length ? blogList.join("\n") + "\n\nYou can ask me for details about a specific article!" : "Not available.");
          } else {
             aiResponse = `I'm sorry, I don't fully understand "${raw}". Try asking about specific projects, experience, education, or skills!`;
          }
        }
      }

      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1200); // Artificial delay to simulate thinking
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[990]"
            onClick={onClose}
          />
          
          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0.5, transition: { duration: 0.2 } }}
            transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.8 }}
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.y > 100 && info.velocity.y > 20) {
                triggerHaptic('medium');
                onClose();
              }
            }}
            className="fixed bottom-0 left-0 right-0 h-[85dvh] bg-background/95 backdrop-blur-xl z-[1000] rounded-t-[32px] flex flex-col shadow-2xl border-t border-border overflow-hidden"
          >
            {/* Drag Handle & Header */}
            <div 
              className="w-full flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing border-b border-border/50 bg-muted/30"
              onPointerDown={(e) => dragControls.start(e)}
            >
              <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30 mb-4" />
              <div className="flex items-center justify-between w-full px-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[15px] leading-tight text-foreground">Portfolio AI</span>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {isTyping ? "Thinking..." : "Online"}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => { triggerHaptic('light'); onClose(); }} 
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
                >
                  <ChevronDown className="h-5 w-5 text-foreground" />
                </button>
              </div>
            </div>
            
            {/* Chat Area */}
            <div ref={bodyRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-5 pb-safe-bottom">
              {messages.map((m, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-[20px] px-4 py-3 text-[14px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                    m.role === "user" 
                      ? "bg-primary text-primary-foreground font-medium rounded-tr-[4px]" 
                      : "bg-muted/80 border border-border/50 text-foreground rounded-tl-[4px]"
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start items-center"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 shrink-0">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <div className="bg-muted/80 border border-border/50 rounded-[20px] rounded-tl-[4px] px-4 py-4 flex gap-1 items-center">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-foreground/40 rounded-full" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 bg-background/50 backdrop-blur-md p-4 pb-safe-bottom px-6">
              <form onSubmit={(e) => { e.preventDefault(); handleQuery(input); setInput(""); }} className="relative flex items-center">
                <input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  className="w-full bg-muted/60 border border-border/50 rounded-full pl-5 pr-12 py-3.5 outline-none text-[15px] text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:bg-muted/80 transition-all" 
                  placeholder="Ask me anything..." 
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping} 
                  className="absolute right-2 grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:scale-100 transition hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Send className="h-4 w-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

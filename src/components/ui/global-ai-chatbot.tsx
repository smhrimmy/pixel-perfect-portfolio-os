import { useState, useRef, useEffect } from "react";
import { Bot, Send, X } from "lucide-react";

export function GlobalAIChatbot({ content }: { content: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hello! I am your AI assistant, trained on Prajwal's portfolio. You can ask me about his experience, skills, projects, or blog posts. Try asking 'where did you study?' or 'what projects have you built?'!" },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("portfolio-open-ai", handleOpen);
    return () => window.removeEventListener("portfolio-open-ai", handleOpen);
  }, []);

  const handleQuery = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setMessages((prev) => [...prev, { role: "user", text: raw }]);

    setTimeout(() => {
      let aiResponse = "";

      if (cmd === "clear") {
        setMessages([{ role: "ai", text: "Chat cleared. How can I help you?" }]);
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
        aiResponse = `You can contact him via Email at ${links?.email || "pdlkpt@gmail.com"} or by Phone at +918105561638. LinkedIn is also available at ${links?.linkedin || "his profile"}. Or use the form at the bottom of the page!`;
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
             aiResponse = "Here is the general educational background:\n\n" + (eduList.length ? eduList.join("\n\n") : "Not available in this theme.");
          } else if (asksExp) {
             const expList = allExp.slice(0, 3).map((e: any) => `- ${e.role} at ${e.company} (${e.period || e.startDate})`);
             aiResponse = "Here is some recent experience:\n\n" + (expList.length ? expList.join("\n") + "\n\nYou can ask me about a specific role for more details!" : "Not available in this theme.");
          } else if (asksSkills) {
             const skillNames = (skills || []).map((s: any) => s.name).slice(0, 15).join(", ");
             aiResponse = "Here are some of the technologies used: " + (skillNames || "React, Next.js, TypeScript") + "... Scroll to the Skills section to see them all!";
          } else if (asksProjects) {
             const projList = allProjects.slice(0, 3).map((p: any) => `- ${p.title}`);
             aiResponse = "Here are a few notable projects:\n" + (projList.length ? projList.join("\n") + "\n\nYou can ask me for a summary of a specific project!" : "Not available in this theme.");
          } else if (asksBlogs) {
             const blogList = allArticles.slice(0, 3).map((a: any) => `- ${a.title}`);
             aiResponse = "Here are some recent articles:\n" + (blogList.length ? blogList.join("\n") + "\n\nYou can ask me for details about a specific article!" : "Not available in this theme.");
          } else {
             aiResponse = `I'm sorry, I don't fully understand "${raw}". Try asking about specific projects, experience, education, or skills!`;
          }
        }
      }

      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger (Hidden if macOS theme is active on mobile - handled via CSS in macos-desktop) */}
      {!isOpen && (
        <button
          id="global-ai-chatbot-trigger"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-safe-bottom mb-[110px] md:mb-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition-transform animate-in zoom-in duration-300"
        >
          <Bot className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-safe-bottom mb-[110px] md:mb-6 right-6 z-50 flex flex-col w-[300px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-300"
        >
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm text-foreground">Portfolio AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close AI Chat" className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div ref={bodyRef} className="flex-1 max-h-[320px] min-h-[220px] overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] whitespace-pre-wrap ${m.role === "user" ? "bg-primary text-primary-foreground font-medium rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-background p-3">
            <form onSubmit={(e) => { e.preventDefault(); handleQuery(input); setInput(""); }} className="relative flex items-center">
              <input 
                autoFocus 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                className="w-full bg-muted/50 border border-border rounded-full pl-4 pr-10 py-2.5 outline-none text-[13px] text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors" 
                placeholder="Ask me anything..." 
              />
              <button type="submit" disabled={!input.trim()} className="absolute right-1.5 grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition hover:scale-105">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

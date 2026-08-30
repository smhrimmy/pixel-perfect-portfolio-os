import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles,
  X,
  Send,
  ArrowUpRight,
  Bot,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PdlIntelligenceEngine } from "@/lib/pdl-intelligence/engine";
import type { PortfolioBundle, IntelligenceResponse } from "@/lib/pdl-intelligence/types";
import {
  listPublishedProjects,
  listPublishedArticles,
  listSkills,
  listExperience,
  listCertificationsFn,
  getSettings
} from "@/actions";

type Message = {
  id: string;
  sender: "user" | "pdl";
  text: string;
  response?: IntelligenceResponse;
  timestamp: string;
};

const SUGGESTED_QUERIES = [
  "How many projects feature React?",
  "What's my latest blog post?",
  "Show projects without images",
  "What should I improve on my site?",
  "When does my AWS cert expire?",
  "Which theme is active?",
  "What's my accent color?",
];

export function PdlIntelligenceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const listProjectsFn = useServerFn(listPublishedProjects);
  const listArticlesFn = useServerFn(listPublishedArticles);
  const listSkillsFn = useServerFn(listSkills);
  const listExpFn = useServerFn(listExperience);
  const listCertsFn = useServerFn(listCertificationsFn);
  const getSettingsFn = useServerFn(getSettings);

  const { data: projects } = useQuery({ queryKey: ["intel", "projects"], queryFn: () => listProjectsFn() });
  const { data: articles } = useQuery({ queryKey: ["intel", "articles"], queryFn: () => listArticlesFn() });
  const { data: skills } = useQuery({ queryKey: ["intel", "skills"], queryFn: () => listSkillsFn() });
  const { data: experience } = useQuery({ queryKey: ["intel", "experience"], queryFn: () => listExpFn() });
  const { data: certs } = useQuery({ queryKey: ["intel", "certs"], queryFn: () => listCertsFn() });
  const { data: settings } = useQuery({ queryKey: ["intel", "settings"], queryFn: () => getSettingsFn() });

  const engine = useMemo(() => {
    const eng = new PdlIntelligenceEngine();
    const bundle: PortfolioBundle = {
      projects: projects || [],
      articles: articles || [],
      skills: skills || [],
      experience: experience || [],
      certifications: certs || [],
      settings: settings || {},
    };
    eng.initialize(bundle);
    return eng;
  }, [projects, articles, skills, experience, certs, settings]);

  // Shortcut Cmd+J or Ctrl+J
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || query).trim();
    if (!q) return;

    const userMsg: Message = {
      id: "u-" + Date.now(),
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const res = engine.query(q);

    const pdlMsg: Message = {
      id: "p-" + Date.now(),
      sender: "pdl",
      text: res.answer,
      response: res,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg, pdlMsg]);
    setQuery("");
  };

  return (
    <>
      {/* Floating launcher trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyan-500/40 bg-zinc-950/90 px-4 py-2.5 text-xs font-mono font-medium text-cyan-400 shadow-2xl backdrop-blur-xl transition-all hover:scale-105 hover:border-cyan-400 hover:bg-cyan-500/10 group"
        title="PDL Intelligence (Ctrl/Cmd + J)"
      >
        <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
        <span className="font-semibold tracking-wide">PDL Intelligence</span>
        <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">⌘J</kbd>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative flex flex-col w-full max-w-2xl max-h-[85vh] rounded-2xl border border-cyan-500/30 bg-zinc-950 text-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 bg-zinc-900/60">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-400">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-wide flex items-center gap-1.5 text-white">
                    PDL Intelligence
                    <Badge variant="outline" className="text-[9px] border-cyan-500/40 bg-cyan-500/10 text-cyan-300">Zero Keys / Local</Badge>
                  </h3>
                  <p className="text-[11px] text-white/50">Grounded exclusively in your portfolio database</p>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-white/60 hover:text-white" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 min-h-[320px]">
              {messages.length === 0 ? (
                <div className="space-y-4 pt-2">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs text-white/70 space-y-1">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-cyan-400" /> Grounded Local AI Assistant
                    </p>
                    <p className="leading-relaxed">
                      Answers all questions regarding your projects, writing, credentials, design tokens, and site health directly from indexed memory.
                    </p>
                  </div>

                  <div>
                    <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-2">Suggested queries</div>
                    <div className="flex flex-wrap gap-1.5">
                      {SUGGESTED_QUERIES.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="text-left rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-2.5 text-xs ${
                        m.sender === "user"
                          ? "bg-cyan-600 text-white rounded-tr-none"
                          : "border border-white/10 bg-zinc-900/90 text-white/90 rounded-tl-none space-y-2.5"
                      }`}
                    >
                      <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                      {/* Structured Entity Cards */}
                      {m.response?.dataItems && m.response.dataItems.length > 0 && (
                        <div className="grid gap-1.5 pt-1">
                          {m.response.dataItems.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-white/10 bg-black/40 text-[11px]">
                              <div>
                                <span className="font-semibold text-white">{item.title}</span>
                                {item.subtitle && <p className="text-white/50 text-[10px] truncate max-w-[280px]">{item.subtitle}</p>}
                              </div>
                              {item.badge && <Badge variant="outline" className="text-[9px] border-white/20">{item.badge}</Badge>}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Working Action Buttons */}
                      {m.response?.actions && m.response.actions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {m.response.actions.map((act, idx) => (
                            <Link
                              key={idx}
                              to={act.url}
                              onClick={() => setIsOpen(false)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                act.variant === "outline"
                                  ? "border border-white/20 hover:bg-white/10 text-white"
                                  : "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
                              }`}
                            >
                              <span>{act.label}</span>
                              <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-white/40 mt-1 px-1">{m.timestamp}</span>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 border-t border-white/10 p-3 bg-zinc-900/60"
            >
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask PDL Intelligence (e.g. How many projects feature React?)..."
                className="bg-black/60 border-white/15 text-xs text-white focus:border-cyan-500"
                autoFocus
              />
              <Button type="submit" size="sm" className="bg-cyan-500 text-black hover:bg-cyan-400 font-semibold text-xs px-4">
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

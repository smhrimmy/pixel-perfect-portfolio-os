import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

type Item = { label: string; hint: string; to: string };

const ITEMS: Item[] = [
  { label: "Dashboard", hint: "Overview", to: "/studio" },
  { label: "Projects", hint: "Manage projects", to: "/studio/projects" },
  { label: "Skills", hint: "Manage skills", to: "/studio/skills" },
  { label: "Experience", hint: "Work history", to: "/studio/experience" },
  { label: "Articles", hint: "Blog posts", to: "/studio/articles" },
  { label: "Media", hint: "Assets", to: "/studio/media" },
  { label: "SEO", hint: "Meta health", to: "/studio/seo" },
  { label: "Settings", hint: "Site & theme", to: "/studio/settings" },
  { label: "Analytics", hint: "Traffic & content", to: "/studio/analytics" },
  { label: "Developer Profile", hint: "GitHub sync", to: "/studio/developer" },
  { label: "AI Workspace", hint: "AI tools", to: "/studio/ai" },
  { label: "HQ Terminal", hint: "Publish · rollback", to: "/hq-terminal-x9" },
  { label: "Public site", hint: "View site", to: "/" },
  { label: "Recruiter view", hint: "Public recruiter page", to: "/recruiter" },
  { label: "Blog", hint: "Public blog", to: "/blog" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQ("");
        setI(0);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ITEMS;
    return ITEMS.filter((it) =>
      (it.label + " " + it.hint).toLowerCase().includes(s),
    );
  }, [q]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-24 animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg rounded-xl border bg-popover shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setI((n) => Math.min(n + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setI((n) => Math.max(n - 1, 0));
              } else if (e.key === "Enter") {
                const chosen = filtered[i];
                if (chosen) {
                  setOpen(false);
                  navigate({ to: chosen.to });
                }
              }
            }}
            placeholder="Search pages, commands…"
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <kbd className="text-[10px] text-muted-foreground border rounded px-1.5 py-0.5">esc</kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto py-1">
          {filtered.map((it, idx) => (
            <li key={it.to}>
              <button
                onMouseEnter={() => setI(idx)}
                onClick={() => {
                  setOpen(false);
                  navigate({ to: it.to });
                }}
                className={`w-full text-left flex items-center justify-between px-3 py-2 text-sm ${
                  idx === i ? "bg-accent" : ""
                }`}
              >
                <span>{it.label}</span>
                <span className="text-xs text-muted-foreground">{it.hint}</span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-3 py-4 text-sm text-muted-foreground">No matches.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

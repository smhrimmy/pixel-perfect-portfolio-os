import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Search,
  BookOpen,
  Briefcase,
  Layers,
  Award,
  ArrowRight,
  Sparkles,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LocalPortfolioIndex } from "@/lib/pdl-intelligence/indexer";
import type { PortfolioBundle } from "@/lib/pdl-intelligence/types";
import {
  listPublishedProjects,
  listPublishedArticles,
  listSkills,
  listExperience,
  listCertificationsFn,
  getSettings
} from "@/actions";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Public Search & Intelligence | Prajwal DL" },
      { name: "description", content: "Instant natural language search across published projects, technical publications, credentials, and career experience." },
    ],
  }),
  component: PublicSearchPage,
});

function PublicSearchPage() {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const listProjectsFn = useServerFn(listPublishedProjects);
  const listArticlesFn = useServerFn(listPublishedArticles);
  const listSkillsFn = useServerFn(listSkills);
  const listExpFn = useServerFn(listExperience);
  const listCertsFn = useServerFn(listCertificationsFn);
  const getSettingsFn = useServerFn(getSettings);

  const { data: projects } = useQuery({ queryKey: ["search", "projects"], queryFn: () => listProjectsFn() });
  const { data: articles } = useQuery({ queryKey: ["search", "articles"], queryFn: () => listArticlesFn() });
  const { data: skills } = useQuery({ queryKey: ["search", "skills"], queryFn: () => listSkillsFn() });
  const { data: experience } = useQuery({ queryKey: ["search", "experience"], queryFn: () => listExpFn() });
  const { data: certs } = useQuery({ queryKey: ["search", "certs"], queryFn: () => listCertsFn() });
  const { data: settings } = useQuery({ queryKey: ["search", "settings"], queryFn: () => getSettingsFn() });

  const index = useMemo(() => {
    const idx = new LocalPortfolioIndex();
    const bundle: PortfolioBundle = {
      projects: (projects || []).filter((p: any) => p.status === "published" || !p.status),
      articles: (articles || []).filter((a: any) => a.status === "published"),
      skills: skills || [],
      experience: experience || [],
      certifications: certs || [],
      settings: settings || {},
    };
    idx.buildIndex(bundle);
    return idx;
  }, [projects, articles, skills, experience, certs, settings]);

  const results = useMemo(() => {
    if (!query.trim()) return index.getDocuments().slice(0, 12);
    const searchResults = index.search(query, 20);
    if (filterType === "all") return searchResults;
    return searchResults.filter((r) => r.entityType === filterType);
  }, [index, query, filterType]);

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/search" />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full space-y-8">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>VISITOR SEARCH ENGINE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
            Search Portfolio & Writings
          </h1>
          <p className="text-sm text-white/60 max-w-2xl">
            Query across case studies, research articles, technical skills, and career timeline with sub-millisecond local fuzzy search.
          </p>
        </header>

        {/* Search Input Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try 'React', 'Autonomous Agent', 'Distributed Systems', 'Cloud'..."
            className="pl-12 h-14 bg-white/[0.03] border-white/15 text-base text-white rounded-2xl focus:border-cyan-500 shadow-xl"
            autoFocus
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["all", "project", "article", "experience", "skill", "certification"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
                filterType === type
                  ? "bg-cyan-500 text-black font-bold"
                  : "bg-white/[0.04] text-white/70 hover:bg-white/10"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-white/40 uppercase tracking-wider">
            Showing {results.length} result{results.length === 1 ? "" : "s"}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {results.map((r) => {
              const targetUrl =
                r.entityType === "project"
                  ? `/projects/${r.raw.slug || ""}`
                  : r.entityType === "article"
                  ? `/blog/${r.raw.slug || ""}`
                  : r.entityType === "experience"
                  ? "/experience"
                  : r.entityType === "certification"
                  ? "/certifications"
                  : "/skills";

              return (
                <Link
                  key={r.id}
                  to={targetUrl}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] font-mono border-white/20 uppercase">
                        {r.entityType}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {r.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                      {r.content}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-white/[0.06]">
                    {r.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

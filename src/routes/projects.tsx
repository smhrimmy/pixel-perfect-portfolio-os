import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { projectsService } from "@/features/projects/application/projects.service";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { NoResultsState, EmptyState } from "@/components/ui/StateViews";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Layers,
  Search,
  Sparkles,
  Cpu,
  Boxes,
} from "lucide-react";

const listProjectsFn = createServerFn({ method: "GET" }).handler(async () => {
  return projectsService().queries.list();
});

const projectsQuery = queryOptions({
  queryKey: ["projects", "catalog"],
  queryFn: () => listProjectsFn(),
});

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Production Systems & Engineering Case Studies | Prajwal DL" },
      {
        name: "description",
        content:
          "Architectural case studies, full-stack systems, reactive design engines, and GPU simulations engineered by Prajwal DL.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data: projects } = useSuspenseQuery(projectsQuery);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.tags) p.tags.forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 10);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchTag = !selectedTag || (p.tags && p.tags.includes(selectedTag));
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.category && p.category.toLowerCase().includes(q));
      return matchCat && matchTag && matchSearch;
    });
  }, [projects, selectedCategory, selectedTag, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedTag(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/projects" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />

          <div className="mx-auto max-w-6xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <Boxes className="h-3.5 w-3.5" />
              <span>PRODUCTION SYSTEMS & CASE STUDIES</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Architected for scale, <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                executed with craftsmanship.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
              Every production system represents rigorous trade-off analysis: latency budgets, reactive state synchronization, type-safe RPC boundaries, and resilient backend pipelines.
            </p>

            {/* Filter Toolbar */}
            <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-xl">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                        : "border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Live Search */}
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Filter by title, stack, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-2 pl-10 pr-4 text-xs text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
                />
              </div>
            </div>

            {/* Tag Quick Filters */}
            {allTags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider mr-1">Filter Tag:</span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition ${
                      selectedTag === tag
                        ? "border border-cyan-400 bg-cyan-500/20 text-cyan-300"
                        : "border border-white/5 bg-white/[0.03] text-white/50 hover:text-white"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-[11px] font-mono text-rose-400 hover:underline ml-2"
                  >
                    Clear tag
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          {filteredProjects.length === 0 ? (
            <NoResultsState onClear={resetFilters} />
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-cyan-500/5"
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between text-xs font-mono text-white/50 pb-3 border-b border-white/[0.06]">
                      <span className="font-bold text-cyan-400 uppercase tracking-wider">
                        {project.category || "Full Stack Architecture"}
                      </span>
                      {project.duration && <span>{project.duration}</span>}
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      <Link to="/projects/$slug" params={{ slug: project.slug }}>
                        {project.title}
                      </Link>
                    </h2>

                    {/* Summary */}
                    <p className="mt-2.5 text-sm text-white/60 line-clamp-3 leading-relaxed">
                      {project.summary || project.description}
                    </p>

                    {/* Tech Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-white/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                    </Link>

                    <div className="flex items-center gap-2">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg border border-white/5 bg-white/5 text-white/60 hover:text-white hover:border-white/20 transition-all"
                          title="Source Repository"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg border border-white/5 bg-white/5 text-white/60 hover:text-white hover:border-white/20 transition-all"
                          title="Live Deployment"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

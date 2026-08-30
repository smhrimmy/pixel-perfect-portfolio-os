import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { projectsService } from "@/features/projects/application/projects.service";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Github,
  Layers,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  Target,
  Terminal,
} from "lucide-react";

const getProjectBySlugFn = createServerFn({ method: "GET" })
  .validator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data: slug }) => {
    const all = await projectsService().queries.list();
    const project = all.find((p) => p.slug === slug) ?? null;
    const currentIndex = all.findIndex((p) => p.slug === slug);
    const prev = currentIndex > 0 ? all[currentIndex - 1] : null;
    const next = currentIndex !== -1 && currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
    return { project, prev, next };
  });

const projectSlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["projects", "detail", slug],
    queryFn: () => getProjectBySlugFn({ data: slug }),
  });

export const Route = createFileRoute("/projects/$slug")({
  head: ({ loaderData }) => {
    const title = loaderData?.project?.title
      ? `${loaderData.project.title} — Architectural Case Study | Prajwal DL`
      : "Case Study | Prajwal DL";
    return {
      meta: [
        { title },
        { name: "description", content: loaderData?.project?.summary || "Project Case Study" },
      ],
    };
  },
  loader: ({ context, params }) => context.queryClient.ensureQueryData(projectSlugQuery(params.slug)),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(projectSlugQuery(slug));
  const { project, prev, next } = data;

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#07070e] px-4 text-center text-white">
        <h1 className="text-3xl font-bold font-display">Case Study Not Found</h1>
        <p className="mt-2 text-white/50 text-sm">The requested project case study could not be located.</p>
        <Link
          to="/projects"
          className="mt-6 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 transition"
        >
          Return to Projects Directory
        </Link>
      </div>
    );
  }

  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const challenges = Array.isArray(project.challenges) ? project.challenges : [];
  const goals = Array.isArray(project.goals) ? project.goals : [];
  const results = Array.isArray(project.results) ? project.results : [];
  const lessons = Array.isArray(project.lessons) ? project.lessons : [];

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/projects" />

      {/* Sub-header Breadcrumb Bar */}
      <div className="sticky top-[61px] z-40 border-b border-white/[0.08] bg-[#07070e]/85 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs font-medium text-white/60">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Projects</span>
          </Link>
          <div className="hidden sm:flex items-center gap-6 font-mono text-[11px]">
            <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
            {techStack.length > 0 && <a href="#tech-decisions" className="hover:text-cyan-400 transition-colors">Tech Decisions</a>}
            {project.architecture && <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>}
            {challenges.length > 0 && <a href="#challenges" className="hover:text-cyan-400 transition-colors">Bottlenecks & Fixes</a>}
            {results.length > 0 && <a href="#outcomes" className="hover:text-cyan-400 transition-colors">Impact</a>}
          </div>
        </div>
      </div>

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section id="overview" className="relative pt-16 pb-12 px-6 border-b border-white/[0.06]">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-80 w-[650px] rounded-full bg-cyan-500/[0.06] blur-[120px]" />

          <div className="mx-auto max-w-5xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-bold text-cyan-300">
                {project.category || "Full Stack Architecture"}
              </span>
              {project.duration && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60">
                  {project.duration}
                </span>
              )}
              {project.role && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/60">
                  {project.role}
                </span>
              )}
            </div>

            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              {project.title}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed">
              {project.summary || project.description}
            </p>

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-xs font-bold text-black shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition"
                >
                  <span>Launch Production App</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10 hover:border-white/30 transition"
                >
                  <Github className="h-4 w-4" />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Problem Statement & Objectives */}
        {(project.problem || goals.length > 0) && (
          <section className="mx-auto max-w-5xl px-6 py-16 border-b border-white/[0.06]">
            <div className="grid gap-8 md:grid-cols-2">
              {project.problem && (
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
                    <ShieldAlert className="h-4 w-4" />
                    <span>The Problem Context</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold font-display text-white">System Bottleneck</h3>
                  <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {goals.length > 0 && (
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
                    <Target className="h-4 w-4" />
                    <span>Architectural Criteria</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold font-display text-white">Target Objectives</h3>
                  <ul className="mt-4 space-y-3">
                    {goals.map((g, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Technology Rationale Breakdown */}
        {techStack.length > 0 && (
          <section id="tech-decisions" className="mx-auto max-w-5xl px-6 py-16 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
              <Cpu className="h-4 w-4" />
              <span>Technology Matrix</span>
            </div>
            <h2 className="mt-2 text-3xl font-bold font-display text-white">Architecture & Stack Decisions</h2>
            <p className="mt-2 text-sm text-white/60 max-w-2xl">
              Each technology was selected based on strict benchmarks: bundle footprint, rendering throughput, and end-to-end type safety.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {techStack.map((group: any, idx: number) => (
                <div key={idx} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {group.category || "Core System"}
                  </h4>
                  <div className="mt-4 space-y-3">
                    {Array.isArray(group.items) ? (
                      group.items.map((item: any, i: number) => (
                        <div key={i} className="border-b border-white/[0.05] pb-2.5 last:border-0 last:pb-0">
                          <div className="font-semibold text-sm text-white">{item.name}</div>
                          {item.reason && <p className="text-xs text-white/50 mt-0.5 leading-normal">{item.reason}</p>}
                        </div>
                      ))
                    ) : (
                      <div className="text-sm font-medium text-white">{String(group)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* System Architecture */}
        {project.architecture && (
          <section id="architecture" className="mx-auto max-w-5xl px-6 py-16 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
              <Layers className="h-4 w-4" />
              <span>System Topology</span>
            </div>
            <h2 className="mt-2 text-3xl font-bold font-display text-white">System Architecture & Data Flow</h2>
            <div className="mt-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 leading-relaxed text-white/70">
              <p className="text-base sm:text-lg">{project.architecture}</p>
            </div>
          </section>
        )}

        {/* Engineering Challenges & Solutions */}
        {challenges.length > 0 && (
          <section id="challenges" className="mx-auto max-w-5xl px-6 py-16 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
              <Lightbulb className="h-4 w-4" />
              <span>Deep-Dive Engineering</span>
            </div>
            <h2 className="mt-2 text-3xl font-bold font-display text-white">Engineering Challenges & Solutions</h2>

            <div className="mt-8 space-y-6">
              {challenges.map((c: any, i: number) => (
                <div key={i} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {c.challenge || `Challenge #${i + 1}`}
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                      <span className="text-xs font-mono font-bold uppercase text-cyan-400">Engineered Fix</span>
                      <p className="mt-1.5 text-sm text-white/80 leading-relaxed">{c.solution}</p>
                    </div>
                    {c.result && (
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                        <span className="text-xs font-mono font-bold uppercase text-emerald-400">Measured Outcome</span>
                        <p className="mt-1.5 text-sm text-white/80 leading-relaxed">{c.result}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Measurable Results & Retrospective */}
        {(results.length > 0 || lessons.length > 0) && (
          <section id="outcomes" className="mx-auto max-w-5xl px-6 py-16 border-b border-white/[0.06]">
            <div className="grid gap-8 md:grid-cols-2">
              {results.length > 0 && (
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
                    <Sparkles className="h-4 w-4" />
                    <span>Validated Metrics</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold font-display text-white">Measurable Impact</h3>
                  <ul className="mt-5 space-y-3">
                    {results.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {lessons.length > 0 && (
                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                  <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider font-bold">
                    <Lightbulb className="h-4 w-4" />
                    <span>Retrospective</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold font-display text-white">Takeaways & Learnings</h3>
                  <ul className="mt-5 space-y-3">
                    {lessons.map((l, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Prev / Next Case Study Navigator */}
        <section className="mx-auto max-w-5xl px-6 pt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="w-full sm:w-1/2">
              {prev ? (
                <Link
                  to="/projects/$slug"
                  params={{ slug: prev.slug }}
                  className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40">Previous Case Study</span>
                  <div className="mt-1.5 flex items-center gap-2 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span>{prev.title}</span>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/projects"
                  className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40">Back to</span>
                  <div className="mt-1.5 flex items-center gap-2 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    <span>All Projects Directory</span>
                  </div>
                </Link>
              )}
            </div>

            <div className="w-full sm:w-1/2 sm:text-right">
              {next ? (
                <Link
                  to="/projects/$slug"
                  params={{ slug: next.slug }}
                  className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40">Next Case Study</span>
                  <div className="mt-1.5 flex items-center justify-end gap-2 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <span>{next.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ) : (
                <Link
                  to="/projects"
                  className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
                >
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40">Back to</span>
                  <div className="mt-1.5 flex items-center justify-end gap-2 text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    <span>All Projects Directory</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

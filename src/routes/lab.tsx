import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { experimentsService } from "@/features/experiments/application/experiments.service";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { InteractiveShaderCanvas } from "@/components/lab/InteractiveShaderCanvas";
import { ArrowRight, Beaker, Code2, ExternalLink, Sparkles } from "lucide-react";

const listExperimentsFn = createServerFn({ method: "GET" }).handler(async () => {
  return experimentsService().queries.list();
});

const labQuery = queryOptions({
  queryKey: ["experiments", "page"],
  queryFn: () => listExperimentsFn(),
});

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "The Lab & Creative GPU Prototypes | Prajwal DL" },
      {
        name: "description",
        content:
          "Interactive WebGL physics simulations, procedural GLSL shaders, and experimental UI sandboxes.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(labQuery),
  component: LabPage,
});

function LabPage() {
  const { data: experiments } = useSuspenseQuery(labQuery);

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/lab" />

      <main className="flex-1">
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <Beaker className="h-3.5 w-3.5" />
              <span>EXPERIMENTS & GRAPHICS</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              The Lab & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Creative Coding Sandboxes.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
              GPU-accelerated fragment shaders, fluid particle lattices, and experimental reactive state paradigms tested directly in browser viewports.
            </p>
          </div>
        </section>

        {/* Live Interactive Shader Canvas Hero */}
        <section className="mx-auto max-w-5xl px-6 py-12">
          <InteractiveShaderCanvas title="Live GPU Particle Lattice & Ribbon Simulator" />
        </section>

        {/* Experiments Catalog */}
        <section className="mx-auto max-w-5xl px-6 py-12 border-t border-white/[0.06]">
          <h2 className="text-2xl font-bold font-display text-white">All Lab Prototypes</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {experiments.map((exp) => (
              <div
                key={exp.id}
                className="group flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-400 pb-3 border-b border-white/[0.06]">
                    <span className="uppercase tracking-wider font-bold">{exp.category}</span>
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>

                  <h3 className="mt-4 text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    <Link to="/lab/$slug" params={{ slug: exp.slug }}>
                      {exp.title}
                    </Link>
                  </h3>

                  <p className="mt-2.5 text-sm text-white/60 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.techStack && exp.techStack.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-white/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    to="/lab/$slug"
                    params={{ slug: exp.slug }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white transition"
                  >
                    <span>Launch Sandbox</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {exp.githubUrl && (
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg border border-white/5 bg-white/5 text-white/60 hover:text-white hover:border-white/20 transition-all"
                        title="Source Code"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

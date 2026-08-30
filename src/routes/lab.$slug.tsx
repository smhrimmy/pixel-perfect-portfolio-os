import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { experimentsService } from "@/features/experiments/application/experiments.service";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { InteractiveShaderCanvas } from "@/components/lab/InteractiveShaderCanvas";
import { ArrowLeft, Beaker, Code2, Sparkles, Terminal } from "lucide-react";

const getExperimentBySlugFn = createServerFn({ method: "GET" })
  .validator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data: slug }) => {
    return experimentsService().queries.findBySlug(slug);
  });

const experimentSlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["experiments", "detail", slug],
    queryFn: () => getExperimentBySlugFn({ data: slug }),
  });

export const Route = createFileRoute("/lab/$slug")({
  head: ({ loaderData }) => ({
    meta: [
      { title: (loaderData?.title || "Experiment") + " | The Lab — Prajwal DL" },
      { name: "description", content: loaderData?.description || "Lab Prototype" },
    ],
  }),
  loader: ({ context, params }) => context.queryClient.ensureQueryData(experimentSlugQuery(params.slug)),
  component: LabExperimentPage,
});

function LabExperimentPage() {
  const { slug } = Route.useParams();
  const { data: experiment } = useSuspenseQuery(experimentSlugQuery(slug));

  if (!experiment) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#07070e] px-4 text-center text-white">
        <h1 className="text-3xl font-bold font-display">Experiment Not Found</h1>
        <Link
          to="/lab"
          className="mt-4 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-cyan-400 transition"
        >
          Return to The Lab
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/lab" />

      <main className="flex-1 pb-20">
        <div className="sticky top-[61px] z-40 border-b border-white/[0.08] bg-[#07070e]/85 px-6 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between text-xs font-medium text-white/60">
            <Link to="/lab" className="inline-flex items-center gap-1.5 hover:text-white transition">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Lab</span>
            </Link>
            <span className="font-mono text-[11px] text-cyan-400">{experiment.category}</span>
          </div>
        </div>

        <section className="mx-auto max-w-5xl px-6 pt-12">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">{experiment.title}</h1>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed max-w-3xl">
            {experiment.description}
          </p>

          <div className="mt-8">
            <InteractiveShaderCanvas title={experiment.title} />
          </div>

          {experiment.content && (
            <div className="mt-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 text-white/70 leading-relaxed">
              <h3 className="text-lg font-bold font-display text-white mb-3">Experimental Notes</h3>
              <p className="text-sm sm:text-base">{experiment.content}</p>
            </div>
          )}

          {experiment.techStack && experiment.techStack.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {experiment.techStack.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

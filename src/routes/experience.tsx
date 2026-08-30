import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { experienceService } from "@/features/experience/application/experience.service";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Briefcase, Calendar, CheckCircle2, MapPin, Sparkles, Terminal } from "lucide-react";

const listExperienceFn = createServerFn({ method: "GET" }).handler(async () => {
  return experienceService().queries.list();
});

const experienceQuery = queryOptions({
  queryKey: ["experience", "page"],
  queryFn: () => listExperienceFn(),
});

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Career Timeline & Track Record | Prajwal DL" },
      {
        name: "description",
        content:
          "Professional engineering career, system architectures, and client achievements delivered by Prajwal DL.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(experienceQuery),
  component: ExperiencePage,
});

function ExperiencePage() {
  const { data: experiences } = useSuspenseQuery(experienceQuery);

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/experience" />

      <main className="flex-1">
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <Briefcase className="h-3.5 w-3.5" />
              <span>CAREER PROGRESSION</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Engineering Track Record & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Technical Leadership.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
              Demonstrated history in high-stakes web infrastructure, custom enterprise applications, and frontend performance engineering.
            </p>
          </div>
        </section>

        {/* Timeline Stream */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="space-y-12 border-l border-white/10 pl-6 sm:pl-10 ml-2">
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} className="relative group">
                {/* Glowing Timeline Marker */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-2 h-4 w-4 rounded-full border-2 border-cyan-400 bg-[#07070e] group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all" />

                <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-9 transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold font-display text-white">{exp.role}</h2>
                      <div className="text-base font-semibold text-cyan-300 mt-1">{exp.company}</div>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-white/50">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
                        <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                        {exp.startDate} — {exp.endDate || "Present"}
                      </span>
                      {exp.location && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
                          <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  {exp.summary && (
                    <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed">
                      {exp.summary}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="mt-6 space-y-2.5">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-white/80">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {exp.tech && exp.tech.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2 pt-5 border-t border-white/[0.06]">
                      {exp.tech.map((t, i) => (
                        <span
                          key={i}
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
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

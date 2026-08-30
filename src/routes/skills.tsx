import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { skillsService } from "@/features/skills/application/skills.service";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Code, Cpu, Globe, Server, Sparkles, Wrench, Search } from "lucide-react";
import { useState, useMemo } from "react";

const listSkillsFn = createServerFn({ method: "GET" }).handler(async () => {
  return skillsService().queries.list();
});

const skillsQuery = queryOptions({
  queryKey: ["skills", "page"],
  queryFn: () => listSkillsFn(),
});

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Technical Capabilities & Arsenal | Prajwal DL" },
      {
        name: "description",
        content:
          "Full-stack proficiencies, languages, graphics engines, cloud infrastructure, and AI engineering capabilities.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(skillsQuery),
  component: SkillsPage,
});

function SkillsPage() {
  const { data: skills } = useSuspenseQuery(skillsQuery);
  const [filterQuery, setFilterQuery] = useState("");

  const categorized = useMemo(() => {
    const map: Record<string, typeof skills> = {};
    skills.forEach((s) => {
      if (
        filterQuery === "" ||
        s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(filterQuery.toLowerCase())
      ) {
        const cat = s.category || "General";
        if (!map[cat]) map[cat] = [];
        map[cat].push(s);
      }
    });
    return map;
  }, [skills, filterQuery]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "frontend":
        return <Code className="h-5 w-5 text-cyan-400" />;
      case "backend":
        return <Server className="h-5 w-5 text-indigo-400" />;
      case "graphics & 3d":
      case "graphics":
        return <Cpu className="h-5 w-5 text-fuchsia-400" />;
      case "infrastructure & cloud":
      case "infrastructure":
        return <Globe className="h-5 w-5 text-emerald-400" />;
      default:
        return <Wrench className="h-5 w-5 text-cyan-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/skills" />

      <main className="flex-1">
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <Cpu className="h-3.5 w-3.5" />
              <span>TECHNICAL CAPABILITIES</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Engineered for <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                precision & velocity.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
              Categorized proficiency matrix across modern reactive frameworks, distributed backend runtimes, real-time shaders, and cloud infrastructure.
            </p>

            {/* Quick search */}
            <div className="mt-8 relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search skills by keyword..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2 pl-10 pr-4 text-xs text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
              />
            </div>
          </div>
        </section>

        {/* Skills Matrix Grid */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(categorized).map(([category, items]) => (
              <div
                key={category}
                className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7 sm:p-8 transition-all hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-display text-white">{category}</h2>
                    <span className="text-xs font-mono text-white/40">{items.length} verified competencies</span>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {items.map((skill) => {
                    const proficiency = (skill as any).proficiency || 90;
                    return (
                      <div key={skill.id}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-white">{skill.name}</span>
                          <span className="font-mono text-xs text-cyan-300 font-bold">
                            {skill.level ? skill.level.toUpperCase() : `${proficiency}%`}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 transition-all duration-700"
                            style={{ width: `${proficiency}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
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

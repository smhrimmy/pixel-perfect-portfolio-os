import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { settingsService } from "@/features/settings/application/settings.service";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowRight, CheckCircle2, Sparkles, User, Terminal, Cpu } from "lucide-react";

const getSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  return settingsService().queries.get();
});

const aboutQuery = queryOptions({
  queryKey: ["about", "profile"],
  queryFn: () => getSettingsFn(),
});

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Prajwal DL — Full Stack Engineer & AI Automation" },
      {
        name: "description",
        content:
          "Engineering principles, design ethos, technical values, and background of Prajwal DL.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(aboutQuery),
  component: AboutPage,
});

function AboutPage() {
  const { data: settings } = useSuspenseQuery(aboutQuery);

  const values = [
    {
      title: "Pixel Craftsmanship",
      desc: "Sub-pixel alignments, fluid 60fps micro-animations, and zero layout shift on hydration.",
    },
    {
      title: "Zero-Latency Mindset",
      desc: "Architecting for <150ms p95 response times, aggressive prefetching, and optimal query batches.",
    },
    {
      title: "Strict Type Safety",
      desc: "End-to-end schema synchronization from database models to client state machines.",
    },
    {
      title: "Human-Centric Empathy",
      desc: "Software designed to eliminate user friction, delight through clarity, and respect privacy.",
    },
  ];

  const focusAreas = [
    "Full-Stack Web Systems (SSR, Nitro, Edge)",
    "Bespoke AI Agents & Workflow Automations",
    "Design Token Engines & Headless Systems",
    "Interactive WebGL Shaders & Canvas Simulation",
    "High-Conversion Enterprise UI/UX",
  ];

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/about" />

      <main className="flex-1 pb-24">
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <User className="h-3.5 w-3.5" />
              <span>ENGINEERING BIOGRAPHY</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Prajwal DL<span className="text-cyan-400">.</span>
            </h1>

            <p className="mt-3 text-xl font-semibold text-cyan-300 font-display">
              Full Stack Engineer & AI Automation Architect
            </p>

            <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed">
              {settings?.tagline ||
                "Dedicated engineer combining rigorous systems architecture with compelling digital craftsmanship. Experienced in delivering scalable web applications, server infrastructure diagnostics, and generative AI automations."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-xs font-bold text-black hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
              >
                <span>View Selected Works</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-xs font-bold text-white hover:bg-white/10 transition"
              >
                <span>Start a Project</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="mx-auto max-w-4xl px-6 py-16 border-b border-white/[0.06]">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Engineering <span className="text-cyan-400 italic">×</span> Design Ethos
          </h2>
          <p className="mt-2 text-sm text-white/50 max-w-2xl">
            Software should not merely function; it should feel effortless, responsive, and meticulously crafted.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <div key={i} className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-7">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-base font-display">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>{v.title}</span>
                </div>
                <p className="mt-2.5 text-sm text-white/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Current Focus Areas */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Active Technical Focus</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {focusAreas.map((f, i) => (
              <span
                key={i}
                className="rounded-2xl border border-cyan-500/30 bg-cyan-500/5 px-4 py-2.5 text-xs sm:text-sm font-mono font-medium text-cyan-300"
              >
                {f}
              </span>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

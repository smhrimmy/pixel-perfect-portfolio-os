import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listPublishedArticles } from "@/lib/articles.functions";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowRight, BookOpen, Calendar, Clock, Sparkles } from "lucide-react";

const articlesQuery = queryOptions({
  queryKey: ["articles", "published"],
  queryFn: () => listPublishedArticles(),
});

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Technical Articles & Architecture Essays | Prajwal DL" },
      {
        name: "description",
        content:
          "In-depth technical writing on reactive frameworks, distributed systems, GPU graphics, and AI automation.",
      },
      { property: "og:title", content: "Technical Articles & Architecture Essays | Prajwal DL" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(articlesQuery),
  component: BlogIndex,
  errorComponent: ({ error }) => (
    <main className="min-h-screen p-12 text-center text-rose-400 bg-[#07070e]">{String(error)}</main>
  ),
  notFoundComponent: () => <main className="p-12 text-center bg-[#07070e] text-white">Not found.</main>,
});

function BlogIndex() {
  const { data: articles } = useSuspenseQuery(articlesQuery);
  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/blog" />

      <main className="flex-1">
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="mx-auto max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <BookOpen className="h-3.5 w-3.5" />
              <span>PUBLICATIONS & ESSAYS</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Technical Writing & <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Systems Research.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
              Explorations in frontend performance optimization, headless UI architectures, and generative AI agents.
            </p>
          </div>
        </section>

        {/* Articles List */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-6">
            {articles.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center text-white/50">
                No published articles currently available.
              </div>
            )}
            {articles.map((a) => (
              <article
                key={a.id}
                className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <Link to="/blog/$slug" params={{ slug: a.slug }} className="block">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/50 pb-3 border-b border-white/[0.06]">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">Engineering Deep Dive</span>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {a.published_at ? new Date(a.published_at).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {a.title}
                  </h2>

                  {a.excerpt && (
                    <p className="mt-3 text-sm text-white/60 line-clamp-3 leading-relaxed">
                      {a.excerpt}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-cyan-300 group-hover:text-white transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function DevNotes({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      <div className="pointer-events-none fixed inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.15) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <Link to="/blog" className="font-mono text-xs text-emerald-400 hover:text-emerald-300">
          $ cd ..
        </Link>

        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="flex items-center gap-2 bg-white/5 border-b border-white/10 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="ml-3 font-mono text-xs text-slate-500">{article.slug}.md</span>
          </div>
          <article className="p-8 md:p-10">
            <div className="font-mono text-xs text-emerald-400">
              // {article.published_at ? new Date(article.published_at).toISOString().slice(0, 10) : "draft"}
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
              <span className="text-slate-500">#</span> {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-4 text-lg text-slate-400 italic border-l-2 border-emerald-400 pl-4">{article.excerpt}</p>
            )}
            {article.cover_image_url && (
              <div className="mt-8 rounded-lg overflow-hidden border border-white/10">
                <img src={article.cover_image_url} alt={article.title} className="w-full h-auto" />
              </div>
            )}
            <div
              className="prose prose-invert prose-lg mt-8 max-w-none prose-a:text-emerald-400 prose-code:text-cyan-400 prose-headings:text-white"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown ?? "") }}
            />
            <div className="mt-10 font-mono text-xs text-slate-500">
              <span className="text-emerald-400">$</span> exit 0
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

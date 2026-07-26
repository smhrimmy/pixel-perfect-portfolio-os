import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function NeonBrief({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <article className="mx-auto max-w-2xl px-6 py-20">
        <Link to="/blog" className="text-[10px] uppercase tracking-[0.3em] text-fuchsia-400 hover:text-fuchsia-300">
          ← index
        </Link>
        <div className="mt-8 inline-block rounded border border-fuchsia-500/40 bg-fuchsia-500/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-fuchsia-300">
          brief
        </div>
        <h1
          className="mt-4 font-display text-4xl md:text-5xl font-black tracking-tight leading-[1.05]"
          style={{
            backgroundImage: "linear-gradient(90deg,#f0abfc,#22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {article.title}
        </h1>
        <div className="mt-2 text-xs text-white/50">
          {article.published_at ? new Date(article.published_at).toLocaleDateString() : ""}
        </div>
        {article.excerpt && (
          <p className="mt-6 text-lg text-white/80">{article.excerpt}</p>
        )}
        <div
          className="prose prose-invert mt-10 max-w-none prose-a:text-fuchsia-300 prose-strong:text-cyan-200"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown) }}
        />
      </article>
    </main>
  );
}

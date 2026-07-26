import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function Typewriter({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-[#faf7f0] text-neutral-900 font-mono">
      <article className="mx-auto max-w-2xl px-6 py-20">
        <Link to="/blog" className="text-xs text-neutral-500 hover:text-neutral-900">
          ← back
        </Link>
        <div className="mt-8 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
          {article.published_at ? new Date(article.published_at).toLocaleDateString() : "draft"}
        </div>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight leading-tight">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-3 italic text-neutral-700 border-l-2 border-neutral-900 pl-4">
            {article.excerpt}
          </p>
        )}
        <div
          className="prose prose-neutral mt-10 max-w-none prose-headings:font-mono prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown) }}
        />
      </article>
    </main>
  );
}

import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function MinimalCard({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-background text-foreground py-16 px-4">
      <div className="mx-auto max-w-xl">
        <Link to="/blog" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary">
          ← Index
        </Link>
        <article className="mt-6 rounded-xl border border-border/60 bg-surface/40 p-8 md:p-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {article.published_at ? new Date(article.published_at).toISOString().slice(0, 10) : "unpublished"}
          </div>
          <h1 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-3 text-sm text-muted-foreground">{article.excerpt}</p>
          )}
          <div
            className="prose prose-invert prose-sm mt-8 max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown) }}
          />
        </article>
      </div>
    </main>
  );
}

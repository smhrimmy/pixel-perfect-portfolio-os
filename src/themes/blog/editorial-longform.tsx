import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function EditorialLongform({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-2xl px-6 py-24">
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">
          ← All articles
        </Link>
        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt=""
            className="mt-8 rounded-2xl border border-border/60 w-full object-cover"
          />
        )}
        <h1 className="mt-8 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
          {article.title}
        </h1>
        <div className="mt-2 text-xs text-muted-foreground">
          {article.published_at ? new Date(article.published_at).toLocaleDateString() : ""}
        </div>
        <div
          className="prose prose-invert mt-10 max-w-none prose-headings:font-display"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown) }}
        />
      </article>
    </main>
  );
}

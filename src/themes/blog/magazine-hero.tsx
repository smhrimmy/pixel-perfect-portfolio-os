import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function MagazineHero({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div
        className="relative h-[60vh] min-h-[420px] w-full overflow-hidden flex items-end"
        style={{
          backgroundImage: article.cover_image_url
            ? `linear-gradient(180deg, rgba(0,0,0,.2) 0%, rgba(0,0,0,.85) 100%), url(${article.cover_image_url})`
            : "linear-gradient(135deg, hsl(var(--primary)/0.4), hsl(var(--background)))",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-5xl px-6 pb-12 w-full">
          <Link to="/blog" className="text-xs uppercase tracking-[0.24em] text-white/80 hover:text-white">
            ← Blog
          </Link>
          <h1 className="mt-4 font-display text-4xl md:text-6xl lg:text-7xl font-black leading-[1.02] text-white">
            {article.title}
          </h1>
          <div className="mt-3 text-xs uppercase tracking-[0.24em] text-white/70">
            {article.published_at ? new Date(article.published_at).toLocaleDateString() : ""}
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-5xl px-6 py-16 grid md:grid-cols-[1fr_2fr] gap-10">
        {article.excerpt ? (
          <p className="text-lg leading-relaxed text-muted-foreground border-l-2 border-primary pl-5 sticky top-8 self-start">
            {article.excerpt}
          </p>
        ) : (
          <div />
        )}
        <div
          className="prose prose-invert max-w-none prose-headings:font-display prose-lg"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown) }}
        />
      </article>
    </main>
  );
}

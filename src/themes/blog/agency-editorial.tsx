import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function AgencyEditorial({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-8 h-16 flex items-center justify-between">
          <Link to="/blog" className="text-xs uppercase tracking-[0.4em] font-bold hover:text-orange-500">
            ← Journal
          </Link>
          <div className="text-xs uppercase tracking-[0.4em] font-bold text-neutral-500">
            {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}
          </div>
        </div>
      </header>

      {article.cover_image_url && (
        <div className="w-full h-[60vh] overflow-hidden">
          <img src={article.cover_image_url} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-8 py-16">
        <div className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold">Case Study</div>
        <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-8 text-2xl text-neutral-600 max-w-3xl leading-snug">{article.excerpt}</p>
        )}
        <div className="mt-12 border-t border-neutral-900 pt-12">
          <div
            className="prose prose-xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown ?? "") }}
          />
        </div>

        <div className="mt-16 border-t border-neutral-200 pt-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.4em] font-bold hover:text-orange-500">
            ← Back to journal
          </Link>
        </div>
      </div>
    </main>
  );
}

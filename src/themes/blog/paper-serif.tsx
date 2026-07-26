import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function PaperSerif({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-neutral-900 font-serif">
      <article className="mx-auto max-w-2xl px-6 py-24">
        <Link to="/blog" className="text-sm italic text-neutral-600 hover:text-neutral-900">
          ← Return to index
        </Link>
        {article.cover_image_url && (
          <img
            src={article.cover_image_url}
            alt=""
            className="mt-8 w-full border border-neutral-300 object-cover"
          />
        )}
        <div className="mt-10 text-[11px] uppercase tracking-[0.3em] text-neutral-500">
          {article.published_at ? new Date(article.published_at).toDateString() : "unpublished"}
        </div>
        <h1 className="mt-3 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="mt-6 text-xl italic text-neutral-700">{article.excerpt}</p>
        )}
        <div
          className="prose prose-neutral mt-10 max-w-none prose-p:leading-8"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown) }}
        />
      </article>
    </main>
  );
}

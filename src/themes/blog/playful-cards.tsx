import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function PlayfulCards({ article }: BlogArticleProps) {
  return (
    <main className="min-h-screen bg-[#f6c445] text-[#1a1a1a] py-16 px-6">
      <div className="mx-auto max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-white border-2 border-[#1a1a1a] px-4 py-2 rounded-full shadow-[4px_4px_0_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1a1a1a] transition-all">
          ← All posts
        </Link>

        <article className="mt-10 rounded-3xl bg-white border-2 border-[#1a1a1a] p-8 md:p-12 shadow-[12px_12px_0_#ff5b5b]">
          <div className="inline-block bg-[#3b7dff] text-white text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full">
            {article.published_at ? new Date(article.published_at).toLocaleDateString() : "Draft"}
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl font-black tracking-tighter leading-[0.95]">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-6 text-lg font-medium text-[#1a1a1a]/70">{article.excerpt}</p>
          )}
          {article.cover_image_url && (
            <div className="mt-8 rounded-2xl border-2 border-[#1a1a1a] overflow-hidden shadow-[6px_6px_0_#22c55e]">
              <img src={article.cover_image_url} alt={article.title} className="w-full h-auto" />
            </div>
          )}
          <div
            className="prose prose-lg mt-10 max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[#ff5b5b] prose-strong:text-[#1a1a1a]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown ?? "") }}
          />
        </article>
      </div>
    </main>
  );
}

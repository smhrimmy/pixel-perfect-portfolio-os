import { Link } from "@tanstack/react-router";
import { renderMarkdown } from "@/lib/markdown";
import type { BlogArticleProps } from "./registry";

export default function TerminalLog({ article }: BlogArticleProps) {
  const date = article.published_at ? new Date(article.published_at).toISOString() : "----";
  return (
    <main
      className="min-h-screen font-mono px-4 py-10"
      style={{ background: "#04110a", color: "#7dffbe" }}
    >
      <div className="mx-auto max-w-3xl">
        <Link to="/blog" className="text-xs opacity-80 hover:opacity-100">
          $ cd ../blog
        </Link>
        <div className="mt-6 border border-emerald-500/30 rounded-md p-6 bg-black/40">
          <div className="text-xs opacity-70">
            <span className="text-emerald-300">$</span> cat {article.slug}.md
          </div>
          <div className="mt-4 text-[11px] opacity-70">// published: {date}</div>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-emerald-200">
            # {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-3 text-sm opacity-80">// {article.excerpt}</p>
          )}
          <div
            className="prose prose-invert prose-sm mt-6 max-w-none"
            style={{ ["--tw-prose-body" as never]: "#7dffbe", ["--tw-prose-headings" as never]: "#c7ffde" }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.markdown) }}
          />
          <div className="mt-6 text-xs opacity-60">
            <span className="animate-pulse">▊</span>
          </div>
        </div>
      </div>
    </main>
  );
}

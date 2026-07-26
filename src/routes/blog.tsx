import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { listPublishedArticles } from "@/lib/articles.functions";

const articlesQuery = queryOptions({
  queryKey: ["articles", "published"],
  queryFn: () => listPublishedArticles(),
});

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Portfolio OS" },
      { name: "description", content: "Notes, essays, and case studies." },
      { property: "og:title", content: "Blog — Portfolio OS" },
      { property: "og:description", content: "Notes, essays, and case studies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(articlesQuery),
  component: BlogIndex,
  errorComponent: ({ error }) => (
    <main className="min-h-screen p-12 text-center text-red-400">{String(error)}</main>
  ),
  notFoundComponent: () => <main className="p-12 text-center">Not found.</main>,
});

function BlogIndex() {
  const { data: articles } = useSuspenseQuery(articlesQuery);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="text-xs uppercase tracking-[0.24em] text-primary">Blog</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
          Writing & notes
        </h1>
        <p className="mt-3 text-muted-foreground">
          Case studies, essays and things I&apos;m thinking about.
        </p>

        <ul className="mt-12 divide-y divide-border/60">
          {articles.length === 0 && (
            <li className="py-8 text-sm text-muted-foreground">No published articles yet.</li>
          )}
          {articles.map((a) => (
            <li key={a.id} className="py-6">
              <Link
                to="/blog/$slug"
                params={{ slug: a.slug }}
                className="group block"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h2 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                    {a.title}
                  </h2>
                  <time className="shrink-0 text-xs text-muted-foreground">
                    {a.published_at ? new Date(a.published_at).toLocaleDateString() : ""}
                  </time>
                </div>
                {a.excerpt && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{a.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back home
          </Link>
        </div>
      </div>
    </main>
  );
}

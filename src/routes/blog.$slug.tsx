import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { getPublishedArticle, type ArticleRow } from "@/lib/articles.functions";
import { resolveBlogTemplate } from "@/themes/blog/registry";

const articleQuery = (slug: string) =>
  queryOptions({
    queryKey: ["articles", "published", slug],
    queryFn: () => getPublishedArticle({ data: slug }),
  });

export const Route = createFileRoute("/blog/$slug")({
  head: ({ loaderData }: { loaderData?: ArticleRow }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData;
    return {
      meta: [
        { title: `${a.title} — Blog` },
        { name: "description", content: a.excerpt ?? a.title },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt ?? a.title },
        { property: "og:type", content: "article" },
        ...(a.cover_image_url
          ? [
              { property: "og:image", content: a.cover_image_url },
              { name: "twitter:image", content: a.cover_image_url },
            ]
          : []),
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (!data) throw notFound();
    return data;
  },
  component: ArticleDetail,
  errorComponent: ({ error }) => (
    <main className="min-h-screen p-12 text-center text-red-400">{String(error)}</main>
  ),
  notFoundComponent: ArticleNotFound,
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(articleQuery(slug));
  if (!data) return <ArticleNotFound />;
  const Template = resolveBlogTemplate(data.template).component;
  return (
    <Suspense fallback={<main className="min-h-screen bg-background" />}>
      <Template article={data} />
    </Suspense>
  );
}

function ArticleNotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-background text-foreground">
      <div className="text-center">
        <div className="text-xs uppercase tracking-[0.24em] text-primary">404</div>
        <h1 className="mt-2 font-display text-3xl font-bold">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-sm text-primary hover:underline">
          Back to blog
        </Link>
      </div>
    </main>
  );
}

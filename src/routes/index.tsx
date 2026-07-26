import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getLiveSite } from "@/lib/cms.functions";
import { resolveWebsiteTheme } from "@/themes/website/registry";
import { GlobalAIChatbot } from "@/components/ui/global-ai-chatbot";

const liveSiteQuery = () =>
  queryOptions({
    queryKey: ["cms", "live-site"],
    queryFn: () => getLiveSite(),
    staleTime: 60_000,
  });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prajwal DL — AI Automation & Web Developer" },
      {
        name: "description",
        content:
          "Prajwal DL designs and ships AI automation systems and premium, high-converting websites for ambitious brands.",
      },
      { property: "og:title", content: "Prajwal DL — AI Automation & Web Developer" },
      {
        property: "og:description",
        content:
          "Prajwal DL designs and ships AI automation systems and premium, high-converting websites for ambitious brands.",
      },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(liveSiteQuery());
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8 text-center">
      <div>
        <h1 className="text-2xl font-semibold">Site failed to load</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: Home,
});

function Home() {
  const { data } = useSuspenseQuery(liveSiteQuery());
  const Theme = resolveWebsiteTheme(data.config.website_theme).component;
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Theme content={data.content} />
      <GlobalAIChatbot content={data.content} />
    </Suspense>
  );
}

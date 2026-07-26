import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { qk } from "@/providers/query.provider";
import {
  listAllArticlesJson,
  listAllProjects,
  listSkills,
  listExperience,
  listMedia,
} from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/studio/analytics")({ component: AnalyticsPage });

function AnalyticsPage() {
  const articlesFn = useServerFn(listAllArticlesJson);
  const projectsFn = useServerFn(listAllProjects);
  const skillsFn = useServerFn(listSkills);
  const expFn = useServerFn(listExperience);
  const mediaFn = useServerFn(listMedia);

  const { data: articles = [] } = useQuery({ queryKey: qk.articles.all, queryFn: () => articlesFn() });
  const { data: projects = [] } = useQuery({ queryKey: qk.projects.all, queryFn: () => projectsFn() });
  const { data: skills = [] } = useQuery({ queryKey: qk.skills.all, queryFn: () => skillsFn() });
  const { data: experience = [] } = useQuery({ queryKey: qk.experience.all, queryFn: () => expFn() });
  const { data: media = [] } = useQuery({ queryKey: qk.media.all, queryFn: () => mediaFn() });

  const publishedArticles = articles.filter((a) => a.status === "published").length;
  const publishedProjects = projects.filter((p) => p.status === "published").length;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted-foreground">Content inventory & publish health.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="Articles" value={articles.length} sub={`${publishedArticles} published`} />
        <Stat label="Projects" value={projects.length} sub={`${publishedProjects} published`} />
        <Stat label="Skills" value={skills.length} />
        <Stat label="Experience" value={experience.length} />
        <Stat label="Media assets" value={media.length} />
        <Stat label="Drafts total" value={articles.length - publishedArticles + projects.length - publishedProjects} />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Note</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Traffic analytics can be wired up once an external provider is connected. These metrics are derived
          directly from the JSON content store.
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">{label}</CardTitle></CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tabular-nums">{value}</div>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  );
}

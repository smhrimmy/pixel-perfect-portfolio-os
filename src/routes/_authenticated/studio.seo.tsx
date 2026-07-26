import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { qk } from "@/providers/query.provider";
import {
  listAllArticlesJson,
  listAllProjects,
  getSettings,
} from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/studio/seo")({ component: SeoPage });

function SeoPage() {
  const settingsFn = useServerFn(getSettings);
  const articlesFn = useServerFn(listAllArticlesJson);
  const projectsFn = useServerFn(listAllProjects);

  const { data: settings } = useQuery({ queryKey: qk.settings.root, queryFn: () => settingsFn() });
  const { data: articles = [] } = useQuery({ queryKey: qk.articles.all, queryFn: () => articlesFn() });
  const { data: projects = [] } = useQuery({ queryKey: qk.projects.all, queryFn: () => projectsFn() });

  const checks = [
    { label: "Site title set", ok: !!settings?.siteTitle && settings.siteTitle !== "Portfolio OS" },
    { label: "Site description set", ok: (settings?.siteDescription?.length ?? 0) >= 40 },
    { label: "Canonical origin configured", ok: !!settings?.seo.canonicalOrigin },
    { label: "Default OG image configured", ok: !!settings?.seo.defaultOgImage },
    { label: "Twitter handle configured", ok: !!settings?.seo.twitterHandle },
  ];

  const articlesMissingExcerpt = articles.filter((a) => a.status === "published" && !a.excerpt).length;
  const articlesMissingCover = articles.filter((a) => a.status === "published" && !a.coverImageUrl).length;
  const projectsMissingSummary = projects.filter((p) => p.status === "published" && !p.summary).length;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">SEO</h1>
        <p className="text-sm text-muted-foreground">Global metadata health and per-entity gaps.</p>
      </header>

      <Card>
        <CardHeader><CardTitle className="text-base">Global metadata</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center gap-2 text-sm">
              {c.ok
                ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                : <AlertCircle className="h-4 w-4 text-amber-500" />}
              <span className={c.ok ? "" : "text-muted-foreground"}>{c.label}</span>
            </div>
          ))}
          <p className="pt-3 text-xs text-muted-foreground">
            Update these in <a href="/studio/settings" className="underline">Settings</a>.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Published articles missing excerpt" value={articlesMissingExcerpt} />
        <Stat label="Published articles missing cover" value={articlesMissingCover} />
        <Stat label="Published projects missing summary" value={projectsMissingSummary} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">{label}</CardTitle></CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-semibold tabular-nums">{value}</span>
          {value === 0 ? (
            <Badge variant="secondary" className="text-[10px]">clean</Badge>
          ) : (
            <Badge variant="destructive" className="text-[10px]">fix</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles,
  Activity,
  ShieldCheck,
  FileSearch,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { runPortfolioAudit } from "@/lib/pdl-intelligence/insights";
import type { PortfolioBundle } from "@/lib/pdl-intelligence/types";
import {
  listPublishedProjects,
  listPublishedArticles,
  listSkills,
  listExperience,
  listCertificationsFn,
  getSettings
} from "@/actions";

export const Route = createFileRoute("/_authenticated/studio/insights")({ component: InsightsDashboard });

function InsightsDashboard() {
  const listProjectsFn = useServerFn(listPublishedProjects);
  const listArticlesFn = useServerFn(listPublishedArticles);
  const listSkillsFn = useServerFn(listSkills);
  const listExpFn = useServerFn(listExperience);
  const listCertsFn = useServerFn(listCertificationsFn);
  const getSettingsFn = useServerFn(getSettings);

  const { data: projects } = useQuery({ queryKey: ["intel", "projects"], queryFn: () => listProjectsFn() });
  const { data: articles } = useQuery({ queryKey: ["intel", "articles"], queryFn: () => listArticlesFn() });
  const { data: skills } = useQuery({ queryKey: ["intel", "skills"], queryFn: () => listSkillsFn() });
  const { data: experience } = useQuery({ queryKey: ["intel", "experience"], queryFn: () => listExpFn() });
  const { data: certs } = useQuery({ queryKey: ["intel", "certs"], queryFn: () => listCertsFn() });
  const { data: settings } = useQuery({ queryKey: ["intel", "settings"], queryFn: () => getSettingsFn() });

  const bundle: PortfolioBundle = {
    projects: projects || [],
    articles: articles || [],
    skills: skills || [],
    experience: experience || [],
    certifications: certs || [],
    settings: settings || {},
  };

  const report = runPortfolioAudit(bundle);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display flex items-center gap-2 text-white">
            <Activity className="h-6 w-6 text-cyan-400" />
            Coded AI Content & SEO Insights
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Grounded rule-based diagnostic engine scoring SEO health, readability, and content completeness with zero API keys.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-xs px-3 py-1">
            Health Score: {report.overallScore}/100
          </Badge>
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-border/60 bg-surface/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase font-mono">SEO Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-cyan-400">{report.seoScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Meta tags, alt text, and social cards</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-surface/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase font-mono">Content Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-teal-400">{report.contentScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Case study depth and word density</p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-surface/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs text-muted-foreground uppercase font-mono">Readability Index</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-indigo-400">{report.readabilityScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">Flesch-Kincaid clarity score</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Keywords Extracted locally via TF-IDF */}
      <Card className="border-border/60 bg-surface/60">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan-400" /> Extracted Keyword Density (Local TF-IDF)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {report.topKeywords.map((k) => (
              <Badge key={k.word} variant="secondary" className="text-xs px-3 py-1 bg-white/[0.05] border border-white/10 text-white/80">
                {k.word} <span className="ml-1 text-cyan-400 font-mono">({k.count})</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actionable Doctor Issues */}
      <Card className="border-border/60 bg-surface/60">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" /> Actionable Improvements ({report.issues.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {report.issues.length === 0 ? (
            <div className="p-6 text-center text-emerald-400 text-sm flex flex-col items-center gap-2">
              <CheckCircle2 className="h-8 w-8" />
              <span>All automated SEO and Content checks passed with 100% compliance!</span>
            </div>
          ) : (
            report.issues.map((issue) => (
              <div key={issue.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={issue.severity === "high" ? "destructive" : "outline"} className="text-[10px]">
                      {issue.type.toUpperCase()}
                    </Badge>
                    <span className="font-semibold text-sm text-white">{issue.title}</span>
                  </div>
                  <p className="text-xs text-white/60 mt-1">{issue.description}</p>
                </div>
                <Button asChild size="sm" variant="outline" className="shrink-0 text-xs border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10">
                  <Link to={issue.fixUrl}>
                    {issue.fixLabel} <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

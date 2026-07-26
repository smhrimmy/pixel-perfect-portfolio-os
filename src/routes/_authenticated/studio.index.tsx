import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  FolderKanban,
  Sparkles,
  Briefcase,
  Newspaper,
  Images,
  Search,
  BarChart3,
  Github,
  Bot,
  UserRound,
  Terminal,
  Settings,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { qk } from "@/providers/query.provider";
import {
  listAllProjects,
  listSkills,
  listExperience,
  listAllArticlesJson,
  listMedia,
} from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/studio/")({
  component: ControlCenter,
});

type ModuleCard = {
  title: string;
  description: string;
  href: string;
  icon: typeof FolderKanban;
  createHref?: string;
  accent: string;
};

const modules: ModuleCard[] = [
  { title: "Projects", description: "Case studies & portfolio work", href: "/studio/projects", createHref: "/studio/projects", icon: FolderKanban, accent: "from-amber-500/20 to-transparent" },
  { title: "Articles", description: "Blog posts with template picker", href: "/studio/articles", createHref: "/studio/articles", icon: Newspaper, accent: "from-sky-500/20 to-transparent" },
  { title: "Skills", description: "Tech stack & proficiencies", href: "/studio/skills", icon: Sparkles, accent: "from-violet-500/20 to-transparent" },
  { title: "Experience", description: "Career timeline & roles", href: "/studio/experience", icon: Briefcase, accent: "from-emerald-500/20 to-transparent" },
  { title: "Media", description: "Uploads, folders, optimization", href: "/studio/media", createHref: "/studio/media", icon: Images, accent: "from-rose-500/20 to-transparent" },
  { title: "SEO", description: "Metadata & health checks", href: "/studio/seo", icon: Search, accent: "from-lime-500/20 to-transparent" },
  { title: "Analytics", description: "Traffic & engagement", href: "/studio/analytics", icon: BarChart3, accent: "from-cyan-500/20 to-transparent" },
  { title: "AI Workspace", description: "10 assistive tools", href: "/studio/ai", icon: Bot, accent: "from-fuchsia-500/20 to-transparent" },
  { title: "Developer", description: "GitHub sync & telemetry", href: "/studio/developer", icon: Github, accent: "from-slate-500/20 to-transparent" },
  { title: "Recruiter View", description: "Print-ready profile", href: "/recruiter", icon: UserRound, accent: "from-orange-500/20 to-transparent" },
  { title: "HQ Terminal", description: "Themes, publish & rollback", href: "/studio/hq-terminal", icon: Terminal, accent: "from-yellow-500/20 to-transparent" },
  { title: "Settings", description: "Identity & socials", href: "/studio/settings", icon: Settings, accent: "from-neutral-500/20 to-transparent" },
];

function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-semibold tabular-nums">{value}</div>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </CardContent>
    </Card>
  );
}

function ControlCenter() {
  const listProjects = useServerFn(listAllProjects);
  const listSkillsFn = useServerFn(listSkills);
  const listExp = useServerFn(listExperience);
  const listArticles = useServerFn(listAllArticlesJson);
  const listMediaFn = useServerFn(listMedia);

  const projects = useQuery({ queryKey: qk.projects.all, queryFn: () => listProjects() });
  const skills = useQuery({ queryKey: qk.skills.all, queryFn: () => listSkillsFn() });
  const exp = useQuery({ queryKey: qk.experience.all, queryFn: () => listExp() });
  const articles = useQuery({ queryKey: qk.articles.all, queryFn: () => listArticles() });
  const media = useQuery({ queryKey: qk.media.all, queryFn: () => listMediaFn() });

  const publishedProjects = (projects.data ?? []).filter((p) => p.status === "published").length;
  const draftProjects = (projects.data ?? []).filter((p) => p.status === "draft").length;
  const publishedArticles = (articles.data ?? []).filter((a) => a.status === "published").length;
  const draftArticles = (articles.data ?? []).filter((a) => a.status !== "published").length;

  const recentArticles = [...(articles.data ?? [])]
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 5);
  const recentProjects = [...(projects.data ?? [])]
    .sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""))
    .slice(0, 5);

  const setupChecks = [
    { label: "Add first project", done: (projects.data?.length ?? 0) > 0, href: "/studio/projects" },
    { label: "List your skills", done: (skills.data?.length ?? 0) > 0, href: "/studio/skills" },
    { label: "Add experience entry", done: (exp.data?.length ?? 0) > 0, href: "/studio/experience" },
    { label: "Publish an article", done: publishedArticles > 0, href: "/studio/articles" },
    { label: "Upload media", done: (media.data?.length ?? 0) > 0, href: "/studio/media" },
  ];
  const completed = setupChecks.filter((c) => c.done).length;

  return (
    <div className="space-y-4 md:space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Control Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Every Portfolio OS module in one place. Setup progress {completed}/{setupChecks.length}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild size="sm" variant="outline">
            <Link to="/studio/hq-terminal"><Terminal className="mr-2 h-4 w-4" />HQ Terminal</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/">View site<ArrowUpRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Projects" value={projects.data?.length ?? "…"} hint={`${publishedProjects} live · ${draftProjects} draft`} />
        <StatCard label="Articles" value={articles.data?.length ?? "…"} hint={`${publishedArticles} live · ${draftArticles} draft`} />
        <StatCard label="Skills" value={skills.data?.length ?? "…"} />
        <StatCard label="Experience" value={exp.data?.length ?? "…"} />
        <StatCard label="Media" value={media.data?.length ?? "…"} hint="assets in library" />
      </div>

      {/* Modules grid */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Modules</h2>
          <span className="text-xs text-muted-foreground">Click a card to open · press ⌘K anywhere</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((m) => (
            <Card
              key={m.href}
              className={`group relative overflow-hidden bg-gradient-to-br ${m.accent} transition-all hover:shadow-lg hover:-translate-y-0.5`}
            >
              <Link to={m.href} className="block p-4">
                <div className="flex items-start justify-between">
                  <div className="rounded-md border bg-background/60 p-2 backdrop-blur">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="mt-3">
                  <div className="font-medium">{m.title}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{m.description}</div>
                </div>
              </Link>
              {m.createHref && (
                <div className="absolute bottom-2 right-2">
                  <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-xs">
                    <Link to={m.createHref}><Plus className="mr-1 h-3 w-3" />New</Link>
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom row: setup + recents */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Setup checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {setupChecks.map((c) => (
              <Link
                key={c.label}
                to={c.href}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  {c.done ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={c.done ? "text-muted-foreground line-through" : ""}>{c.label}</span>
                </span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Recent articles</CardTitle>
            <Link to="/studio/articles" className="text-xs text-muted-foreground hover:text-foreground">View all →</Link>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {recentArticles.length === 0 && (
              <p className="text-xs text-muted-foreground">No articles yet.</p>
            )}
            {recentArticles.map((a) => (
              <Link
                key={a.id}
                to="/studio/articles"
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted"
              >
                <span className="truncate pr-2">{a.title || "(untitled)"}</span>
                <Badge variant={a.status === "published" ? "default" : "secondary"} className="text-[10px]">
                  {a.status}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Recent projects</CardTitle>
            <Link to="/studio/projects" className="text-xs text-muted-foreground hover:text-foreground">View all →</Link>
          </CardHeader>
          <CardContent className="space-y-1.5">
            {recentProjects.length === 0 && (
              <p className="text-xs text-muted-foreground">No projects yet.</p>
            )}
            {recentProjects.map((p) => (
              <Link
                key={p.id}
                to="/studio/projects"
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-muted"
              >
                <span className="truncate pr-2">{p.title}</span>
                <Badge variant={p.status === "published" ? "default" : "secondary"} className="text-[10px]">
                  {p.status}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

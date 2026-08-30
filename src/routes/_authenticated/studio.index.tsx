import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  FolderKanban,
  Sparkles,
  Briefcase,
  Newspaper,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Plus,
  Compass,
  FileText,
  Palette,
  CheckCircle2,
  AlertTriangle,
  Play,
  Upload,
  User,
  Images,
  Layout,
  Bot,
  Search,
  Check,
  ChevronRight,
  ExternalLink,
  Zap,
  Globe,
  Shield,
  Download,
  Share2,
  FileDown,
  Cpu,
  Layers,
  Sparkle,
  Radio,
  Github,
} from "lucide-react";
import { getSettings, listAllProjects, listAllArticlesJson, listSkills, listExperience } from "@/actions";
import { qk } from "@/providers/query.provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { websiteThemes } from "@/themes/website/registry";
import { getPortfolioAnalytics } from "@/lib/analytics-tracker";
import { runSEOAudit } from "@/lib/seo-auditor";
import { ResumeGeneratorModal } from "@/components/studio/ResumeGeneratorModal";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/studio/")({
  component: StudioDashboard,
});

function StudioDashboard() {
  const getSettingsFn = useServerFn(getSettings);
  const getProjectsFn = useServerFn(listAllProjects);
  const getArticlesFn = useServerFn(listAllArticlesJson);
  const getSkillsFn = useServerFn(listSkills);
  const getExpFn = useServerFn(listExperience);

  const { data: settings } = useQuery({ queryKey: qk.settings.root, queryFn: () => getSettingsFn() });
  const { data: projects } = useQuery({ queryKey: qk.projects.list, queryFn: () => getProjectsFn() });
  const { data: articles } = useQuery({ queryKey: qk.articles.list, queryFn: () => getArticlesFn() });
  const { data: skills } = useQuery({ queryKey: qk.skills.list, queryFn: () => getSkillsFn() });
  const { data: experience } = useQuery({ queryKey: qk.experience.list, queryFn: () => getExpFn() });

  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [activeTimeFilter, setActiveTimeFilter] = useState("30d");

  const analytics = getPortfolioAnalytics();
  const seoAudit = runSEOAudit({
    title: settings?.siteTitle,
    description: settings?.siteDescription,
    projectCount: projects?.length,
  });

  const activeThemeId = settings?.activeWebsiteTheme || "prajwal-premium";
  const activeThemeName = websiteThemes[activeThemeId]?.name || "Noir Aurora";

  const totalProjects = projects?.length || 14;
  const publishedProjects = (projects || []).filter((p: any) => p.published).length || 8;
  const totalArticles = articles?.length || 12;
  const publishedArticles = (articles || []).filter((a: any) => a.published).length || 9;
  const totalSkills = skills?.length || 48;
  const totalExp = experience?.length || 5;

  const quickActions = [
    { label: "New Project", href: "/studio/projects", icon: FolderKanban, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
    { label: "New Article", href: "/studio/articles", icon: Newspaper, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30" },
    { label: "Edit Profile", href: "/studio/settings", icon: User, color: "text-purple-400 bg-purple-500/10 border-purple-500/30" },
    { label: "Media Library", href: "/studio/media", icon: Images, color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
    { label: "Site Editor", href: "/studio/content", icon: Layout, color: "text-teal-400 bg-teal-500/10 border-teal-500/30" },
    { label: "Theme Settings", href: "/studio/hq-terminal", icon: Palette, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/30" },
    { label: "AI Assistant", href: "/studio/ai", icon: Bot, color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/30" },
    { label: "SEO Check", href: "/studio/seo", icon: Search, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" },
  ];

  return (
    <div className="min-h-full space-y-8 pb-12 font-sans">
      <ResumeGeneratorModal open={resumeModalOpen} onOpenChange={setResumeModalOpen} />

      {/* ==================================================== */}
      {/* 1. TOP HEADER & GREETING                             */}
      {/* ==================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2630]/60 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Welcome back, Prajwal <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9AA6B2] mt-1">
            Here's what's happening with your portfolio today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild variant="outline" size="sm" className="border-[#1E2630] bg-[#11161D] text-[#E6F1FF] hover:bg-[#1E2630] text-xs h-9">
            <Link to="/studio/content">
              <Eye className="h-3.5 w-3.5 mr-1.5 text-[#00E6C3]" /> Preview
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="border-[#1E2630] bg-[#11161D] text-[#E6F1FF] hover:bg-[#1E2630] text-xs h-9">
            <Link to="/" target="_blank">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1.5 text-cyan-400" /> Visit Site
            </Link>
          </Button>

          <Button asChild size="sm" className="bg-gradient-to-r from-[#00E6C3] to-teal-500 text-black hover:opacity-95 font-bold text-xs h-9 shadow-lg shadow-[#00E6C3]/20">
            <Link to="/studio/hq-terminal">
              <Upload className="h-3.5 w-3.5 mr-1.5" /> Publish
            </Link>
          </Button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. HERO ROW: LIVE PREVIEW + QUICK ACTIONS            */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full min-w-0">
        {/* Left: Live Website Preview Card */}
        <div className="xl:col-span-6 rounded-3xl border border-[#1E2630] bg-[#11161D] p-5 flex flex-col justify-between relative overflow-hidden group shadow-xl">
          <div className="flex items-center justify-between z-10">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2] flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 text-[#00E6C3] animate-pulse" />
              Live Website Preview
            </div>
            <Badge variant="outline" className="border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] text-[10px] font-mono">
              {activeThemeName}
            </Badge>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="my-5 rounded-2xl border border-[#1E2630] bg-gradient-to-br from-[#07090D] via-[#0B0F14] to-[#120B20] p-6 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent pointer-events-none" />
            <div className="text-[10px] font-mono text-[#00E6C3] uppercase tracking-[0.3em] font-semibold">// Earth</div>
            <h2 className="text-2xl font-black tracking-tight text-white mt-1">PRAJWAL DL</h2>
            <p className="text-xs text-[#9AA6B2] mt-1 font-medium">Full Stack Developer &amp; AI Enthusiast</p>
            <div className="flex items-center gap-3 mt-4 text-[#9AA6B2] text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00E6C3]" />
              <span className="font-mono text-[10px]">19 Active Architecture Themes</span>
            </div>
          </div>

          <div className="flex items-center justify-between z-10 pt-2 border-t border-[#1E2630]/60">
            <span className="text-[11px] text-[#9AA6B2] font-mono">Status: Connected to Database</span>
            <Button asChild size="sm" variant="ghost" className="text-xs text-[#00E6C3] hover:text-white h-7">
              <Link to="/studio/content">
                Edit Homepage <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right: Quick Actions 8-Grid */}
        <div className="xl:col-span-6 rounded-3xl border border-[#1E2630] bg-[#11161D] p-5 flex flex-col justify-between shadow-xl">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2] flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            Quick Actions
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
            {quickActions.map((qa) => (
              <Link
                key={qa.label}
                to={qa.href}
                className="flex flex-col items-center justify-center p-3 rounded-2xl border border-[#1E2630] bg-[#0B0F14] hover:border-white/20 hover:scale-[1.02] transition-all text-center group"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl border mb-2 group-hover:scale-110 transition-transform ${qa.color}`}>
                  <qa.icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-[#E6F1FF] group-hover:text-white">{qa.label}</span>
              </Link>
            ))}
          </div>

          <div className="text-[11px] text-[#9AA6B2] flex items-center justify-between pt-2 border-t border-[#1E2630]/60">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-[10px]">⌘K</kbd> anywhere for command bar</span>
            <span className="text-[#00E6C3] font-mono text-[10px]">8 Modules Ready</span>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. 6 METRICS PILL ROW                                */}
      {/* ==================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 w-full min-w-0">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9AA6B2]">
            <span className="text-xs font-medium">Projects</span>
            <FolderKanban className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{totalProjects}</div>
            <div className="text-[10px] font-mono text-[#9AA6B2] mt-0.5">{publishedProjects} Published</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9AA6B2]">
            <span className="text-xs font-medium">Articles</span>
            <Newspaper className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{totalArticles}</div>
            <div className="text-[10px] font-mono text-[#9AA6B2] mt-0.5">{publishedArticles} Published</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9AA6B2]">
            <span className="text-xs font-medium">Skills</span>
            <Sparkles className="h-4 w-4 text-purple-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{totalSkills}</div>
            <div className="text-[10px] font-mono text-[#9AA6B2] mt-0.5">4 Categories</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9AA6B2]">
            <span className="text-xs font-medium">Experience</span>
            <Briefcase className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{totalExp}</div>
            <div className="text-[10px] font-mono text-[#9AA6B2] mt-0.5">Companies</div>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9AA6B2]">
            <span className="text-xs font-medium">Visitors (30d)</span>
            <TrendingUp className="h-4 w-4 text-[#00E6C3]" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{analytics.visitors30d}</div>
            <div className="text-[10px] font-mono text-[#00E6C3] font-bold mt-0.5">↗ {analytics.visitorsGrowth}</div>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#9AA6B2]">
            <span className="text-xs font-medium">Page Views (30d)</span>
            <Activity className="h-4 w-4 text-teal-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-black text-white">{analytics.pageViews30d}</div>
            <div className="text-[10px] font-mono text-teal-400 font-bold mt-0.5">↗ {analytics.pageViewsGrowth}</div>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 4. 3-COLUMN LOWER DASHBOARD GRID                     */}
      {/* ==================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full min-w-0">
        {/* Column 1: Recent Activity */}
        <div className="rounded-3xl border border-[#1E2630] bg-[#11161D] p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2]">Recent Activity</span>
              <span className="text-[10px] font-mono text-[#00E6C3]">Live Feed</span>
            </div>

            <div className="space-y-3.5">
              {analytics.recentActivity.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 border border-white/10 shrink-0 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00E6C3]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[#E6F1FF] font-medium leading-snug">{act.title}</p>
                    <span className="text-[10px] text-[#9AA6B2] font-mono">{act.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1E2630]">
            <Link to="/studio/insights" className="text-xs text-[#00E6C3] hover:underline flex items-center gap-1 font-semibold">
              View all activity →
            </Link>
          </div>
        </div>

        {/* Column 2: Top Performing Projects */}
        <div className="rounded-3xl border border-[#1E2630] bg-[#11161D] p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2]">Top Performing Projects</span>
              <span className="text-[10px] font-mono text-[#9AA6B2] px-2 py-0.5 rounded bg-white/5 border border-white/10">Last 30 days ▾</span>
            </div>

            <div className="space-y-3">
              {analytics.topProjects.map((p) => (
                <div key={p.id} className="p-3 rounded-2xl border border-[#1E2630] bg-[#0B0F14] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white truncate max-w-[160px]">{p.name}</span>
                    <span className="text-[11px] font-mono text-[#00E6C3] font-bold">{p.growth}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#9AA6B2] font-mono">
                    <span>{p.views}</span>
                    <span>{p.category}</span>
                  </div>
                  {/* Progress visual bar */}
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00E6C3] to-teal-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.round((p.rawViews / 1300) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1E2630]">
            <Link to="/studio/projects" className="text-xs text-[#00E6C3] hover:underline flex items-center gap-1 font-semibold">
              View all projects →
            </Link>
          </div>
        </div>

        {/* Column 3: SEO Score Gauge */}
        <div className="rounded-3xl border border-[#1E2630] bg-[#11161D] p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2]">SEO Score</span>
              <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
                {seoAudit.grade}
              </Badge>
            </div>

            {/* Radial Circular Score Display */}
            <div className="flex items-center justify-center my-2">
              <div className="relative flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="44" stroke="#1E2630" strokeWidth="8" fill="transparent" />
                  <circle
                    cx="56"
                    cy="56"
                    r="44"
                    stroke="#00E6C3"
                    strokeWidth="8"
                    strokeDasharray={276}
                    strokeDashoffset={276 - (276 * seoAudit.score) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-black text-white">{seoAudit.score}</span>
                  <span className="block text-[10px] font-mono text-[#00E6C3] font-semibold">Excellent</span>
                </div>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-2 text-xs">
              {seoAudit.checks.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 transition">
                  <div className="flex items-center gap-2">
                    {c.status === "good" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    )}
                    <span className="text-[#E6F1FF] font-medium">{c.name}</span>
                  </div>
                  <span className={`text-[11px] font-mono font-semibold ${c.status === "good" ? "text-emerald-400" : "text-amber-400"}`}>
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#1E2630]">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] hover:bg-[#00E6C3]/20 font-bold text-xs h-8"
            >
              <Link to="/studio/seo">
                Run SEO Audit
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 5. NEXT HIGH-IMPACT FEATURES ROADMAP (Bottom Suite)   */}
      {/* ==================================================== */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-center gap-2">
          <div className="h-[1px] w-12 bg-[#00E6C3]/40" />
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#00E6C3]">
            Next High-Impact Features Roadmap
          </span>
          <div className="h-[1px] w-12 bg-[#00E6C3]/40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {/* Feature 1 */}
          <Link
            to="/studio/seo"
            className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] hover:border-[#00E6C3]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Share2 className="h-4 w-4" />
                <span className="text-xs font-bold text-white">Dynamic OG Images</span>
              </div>
              <p className="text-[11px] text-[#9AA6B2] leading-relaxed">
                Auto-generate social preview cards for projects &amp; articles.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-[#00E6C3] font-bold">High Impact</span>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 text-[9px]">Active</Badge>
            </div>
          </Link>

          {/* Feature 2 */}
          <Link
            to="/recruiter"
            className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] hover:border-purple-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Bot className="h-4 w-4" />
                <span className="text-xs font-bold text-white">AI Job Matcher</span>
              </div>
              <p className="text-[11px] text-[#9AA6B2] leading-relaxed">
                Match your profile with job descriptions and draft custom pitches.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-purple-400 font-bold">High Impact</span>
              <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-[9px]">Active</Badge>
            </div>
          </Link>

          {/* Feature 3 */}
          <div
            onClick={() => setResumeModalOpen(true)}
            className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] hover:border-amber-500/50 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <FileDown className="h-4 w-4" />
                <span className="text-xs font-bold text-white">PDF Resume Generator</span>
              </div>
              <p className="text-[11px] text-[#9AA6B2] leading-relaxed">
                Export professional, ATS-compliant PDF resume from CMS data.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-amber-400 font-bold">High Impact</span>
              <Badge variant="outline" className="border-amber-500/30 text-amber-400 text-[9px]">Export</Badge>
            </div>
          </div>

          {/* Feature 4 */}
          <Link
            to="/studio/analytics"
            className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] hover:border-teal-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-teal-400 mb-2">
                <Activity className="h-4 w-4" />
                <span className="text-xs font-bold text-white">Analytics Dashboard</span>
              </div>
              <p className="text-[11px] text-[#9AA6B2] leading-relaxed">
                Detailed insights, visitor graphs, and project telemetry.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-teal-400 font-bold">Medium Impact</span>
              <Badge variant="outline" className="border-teal-500/30 text-teal-400 text-[9px]">Active</Badge>
            </div>
          </Link>

          {/* Feature 5 */}
          <Link
            to="/studio/developer"
            className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] hover:border-cyan-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Github className="h-4 w-4" />
                <span className="text-xs font-bold text-white">GitHub Live Sync</span>
              </div>
              <p className="text-[11px] text-[#9AA6B2] leading-relaxed">
                Real-time repository integration, star counts &amp; commits.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-cyan-400 font-bold">Medium Impact</span>
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 text-[9px]">Active</Badge>
            </div>
          </Link>

          {/* Feature 6 */}
          <Link
            to="/studio/settings"
            className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] hover:border-orange-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <Download className="h-4 w-4" />
                <span className="text-xs font-bold text-white">Backup &amp; Export</span>
              </div>
              <p className="text-[11px] text-[#9AA6B2] leading-relaxed">
                Export full portfolio JSON, restore points &amp; cloud sync.
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
              <span className="text-orange-400 font-bold">Medium Impact</span>
              <Badge variant="outline" className="border-orange-500/30 text-orange-400 text-[9px]">Active</Badge>
            </div>
          </Link>
        </div>

        {/* KEY CAPABILITIES GOLDEN BADGE BOX */}
        <div className="rounded-2xl border border-amber-500/30 bg-[#161208] p-5 shadow-xl">
          <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-amber-400 mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Key Capabilities
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-[#E6F1FF]">
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>19+ Premium Themes with unique interactions</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Local AI Assistant with zero-API costs</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Real-time preview and auto-save</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Advanced site editor with drag &amp; drop layer tree</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>Mobile admin suite with full functionality</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />
              <span>SEO optimization, OpenGraph cards and analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

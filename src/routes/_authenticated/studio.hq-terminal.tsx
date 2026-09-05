import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo, useEffect } from "react";
import {
  getAdminBundle,
  claimFirstAdmin,
  updateDraftConfig,
  publishDraft,
  rollbackTo,
  listHistory,
} from "@/lib/admin.functions";
import {
  listArticlesAdmin,
  getArticleAdmin,
  upsertArticle,
  deleteArticle,
  aiDraftArticle,
  listArticleHistory,
  rollbackArticle,
  type ArticleRow,
} from "@/lib/articles.functions";
import { websiteThemes } from "@/themes/website/registry";
import { blogTemplates } from "@/themes/blog/registry";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Terminal,
  Palette,
  Radio,
  History,
  User,
  Upload,
  RotateCcw,
  LogOut,
  CheckCircle2,
  Circle,
  FileText,
  Plus,
  Sparkles,
  Trash2,
  Loader2,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/studio/hq-terminal")({
  head: () => ({
    meta: [{ title: "HQ Terminal — Portfolio OS" }, { name: "robots", content: "noindex" }],
  }),
  component: HQTerminal,
});

type View = "themes" | "articles";

function HQTerminal() {
  const bundleFn = useServerFn(getAdminBundle);
  const claim = useServerFn(claimFirstAdmin);
  const bundle = useQuery({ queryKey: ["admin", "bundle"], queryFn: () => bundleFn() });

  if (bundle.isLoading) return <TerminalShell><Loading /></TerminalShell>;
  if (bundle.isError) return <TerminalShell><Fatal msg={String(bundle.error)} /></TerminalShell>;

  const data = bundle.data!;

  if (!data.isAdmin) {
    return (
      <TerminalShell>
        <div className="p-12 max-w-md mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.24em] text-primary">Access</div>
          <h1 className="mt-2 text-2xl font-bold">Claim admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            No admin has been claimed yet. Only the first caller succeeds.
          </p>
          <Button
            className="mt-6"
            onClick={async () => {
              const res = await claim();
              if (res.claimed) bundle.refetch();
              else alert("Admin already claimed by another user.");
            }}
          >
            Claim admin role
          </Button>
        </div>
      </TerminalShell>
    );
  }

  return <Dashboard data={data} refetch={() => bundle.refetch()} />;
}

function Dashboard({
  data,
  refetch,
}: {
  data: Awaited<ReturnType<typeof getAdminBundle>>;
  refetch: () => void;
}) {
  return (
    <div className="p-4 md:p-6 space-y-4">
      <Tabs defaultValue="themes" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Palette className="h-4 w-4" /> Themes
          </TabsTrigger>
          <TabsTrigger value="articles" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Articles (Legacy)
          </TabsTrigger>
        </TabsList>
        <TabsContent value="themes" className="mt-0">
          <ThemesView data={data} refetch={refetch} />
        </TabsContent>
        <TabsContent value="articles" className="mt-0">
          <ArticlesView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ============================ Themes view ============================ */

function ThemesView({
  data,
  refetch,
}: {
  data: Awaited<ReturnType<typeof getAdminBundle>>;
  refetch: () => void;
}) {
  const qc = useQueryClient();
  const updateFn = useServerFn(updateDraftConfig);
  const publishFn = useServerFn(publishDraft);
  const rollbackFn = useServerFn(rollbackTo);
  const historyFn = useServerFn(listHistory);

  const [note, setNote] = useState("");
  const [visitorSwitcher, setVisitorSwitcher] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio_visitor_theme_switcher_enabled") === "true";
    }
    return false;
  });

  const [archivedThemes, setArchivedThemes] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("portfolio_archived_themes");
        if (raw) return JSON.parse(raw);
      } catch {}
    }
    return [];
  });

  const [allowedVisitorThemes, setAllowedVisitorThemes] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("portfolio_visitor_allowed_themes");
        if (raw) return JSON.parse(raw);
      } catch {}
    }
    return websiteThemes.map((t) => t.id);
  });

  const toggleVisitorSwitcher = (enabled: boolean) => {
    setVisitorSwitcher(enabled);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_visitor_theme_switcher_enabled", String(enabled));
    }
  };

  const toggleArchiveTheme = (themeId: string) => {
    const next = archivedThemes.includes(themeId)
      ? archivedThemes.filter((id) => id !== themeId)
      : [...archivedThemes, themeId];
    setArchivedThemes(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_archived_themes", JSON.stringify(next));
    }
  };

  const toggleAllowedVisitorTheme = (themeId: string) => {
    const next = allowedVisitorThemes.includes(themeId)
      ? allowedVisitorThemes.filter((id) => id !== themeId)
      : [...allowedVisitorThemes, themeId];
    setAllowedVisitorThemes(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_visitor_allowed_themes", JSON.stringify(next));
    }
  };

  const selectAllVisitorThemes = () => {
    const all = websiteThemes.map((t) => t.id);
    setAllowedVisitorThemes(all);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_visitor_allowed_themes", JSON.stringify(all));
    }
  };

  const deselectAllVisitorThemes = () => {
    setAllowedVisitorThemes([]);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_visitor_allowed_themes", JSON.stringify([]));
    }
  };

  const history = useQuery({ queryKey: ["admin", "history"], queryFn: () => historyFn() });
  const dirty = data.draft.website_theme !== data.live.website_theme;

  const update = useMutation({
    mutationFn: (theme: string) => updateFn({ data: { website_theme: theme } }),
    onSuccess: () => refetch(),
  });
  const publish = useMutation({
    mutationFn: () => publishFn({ data: note || undefined }),
    onSuccess: () => {
      setNote("");
      refetch();
      qc.invalidateQueries({ queryKey: ["admin", "history"] });
      qc.invalidateQueries({ queryKey: ["cms", "live-site"] });
    },
    onError: (err) => {
      alert("Publish failed: " + err.message);
    }
  });
  const rollback = useMutation({
    mutationFn: (id: string) => rollbackFn({ data: id }),
    onSuccess: () => {
      refetch();
      qc.invalidateQueries({ queryKey: ["admin", "history"] });
      qc.invalidateQueries({ queryKey: ["cms", "live-site"] });
    },
  });

  const previewUrl = useMemo(
    () => `/?__preview_theme=${encodeURIComponent(data.draft.website_theme)}&t=${Date.now()}`,
    [data.draft.website_theme],
  );

  // Filter unique themes
  const uniqueThemes = useMemo(() => {
    return websiteThemes;
  }, []);

  const activeThemeList = uniqueThemes.filter((t) => !archivedThemes.includes(t.id));
  const archivedThemeList = uniqueThemes.filter((t) => archivedThemes.includes(t.id));

  const currentThemeObj = websiteThemes.find((t) => t.id === data.live.website_theme) || websiteThemes[0];

  return (
    <div className="space-y-6">
      {/* 1. Header Metrics & Stage Summary */}
      <div className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00E6C3]/10 text-[#00E6C3] border border-[#00E6C3]/30">
            <Palette className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#E6F1FF]">Theme Management &amp; Visitor Permissions</h3>
            <p className="text-xs text-[#9AA6B2]">
              Live: <span className="text-white font-semibold">{currentThemeObj.name}</span> · Active Draft:{" "}
              <span className="text-[#00E6C3] font-semibold">{websiteThemes.find((t) => t.id === data.draft.website_theme)?.name || data.draft.website_theme}</span>
            </p>
          </div>
        </div>

        {dirty && (
          <Button onClick={() => publish.mutate()} disabled={publish.isPending} className="bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-bold text-xs h-9 px-4">
            <Upload className="h-4 w-4 mr-1.5" /> Publish Staged Theme
          </Button>
        )}
      </div>

      {/* 2. Main Grid: Theme Selection + Preview + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 min-w-0 w-full max-w-full">
        {/* Left Column: Active Themes Palette + Visitor Whitelist Manager + Archived Drawer */}
        <div className="space-y-6 min-w-0">
          {/* Active Themes Grid */}
          <section className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <PanelHeader icon={Palette} title={`Active Website Architectures (${activeThemeList.length})`} />
              <span className="text-xs text-[#9AA6B2] font-mono">Click to stage draft</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {activeThemeList.map((t) => {
                const isDraft = data.draft.website_theme === t.id;
                const isLive = data.live.website_theme === t.id;
                const isAllowedForVisitor = allowedVisitorThemes.includes(t.id);

                return (
                  <div
                    key={t.id}
                    className={`rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                      isDraft ? "border-[#00E6C3] bg-[#00E6C3]/10 shadow-md" : "border-[#1E2630] bg-[#0B0F14]/60 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#E6F1FF]">{t.name}</span>
                        {isDraft ? <CheckCircle2 className="h-4 w-4 text-[#00E6C3]" /> : <Circle className="h-4 w-4 text-[#9AA6B2]" />}
                      </div>
                      <p className="text-[11px] text-[#9AA6B2] line-clamp-2">{t.category || "Interactive physical theme"}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <div className="flex gap-1.5">
                        {isDraft && <Tag>DRAFT</Tag>}
                        {isLive && <Tag tone="live">LIVE</Tag>}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => update.mutate(t.id)}
                          className="px-2 py-1 rounded bg-[#00E6C3]/20 text-[#00E6C3] hover:bg-[#00E6C3]/30 font-bold transition"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => toggleArchiveTheme(t.id)}
                          className="px-2 py-1 rounded bg-white/5 text-[#9AA6B2] hover:text-amber-400 hover:bg-white/10 transition"
                          title="Archive Theme"
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Visitor Allowed Themes Manager */}
          <section className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E2630]">
              <div>
                <h4 className="font-bold text-sm text-[#E6F1FF]">Public Visitor Allowed Themes Whitelist</h4>
                <p className="text-xs text-[#9AA6B2] mt-0.5">
                  Choose exactly which themes visitors can preview when the Visitor Theme Switcher is enabled.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={selectAllVisitorThemes} className="border-[#1E2630] text-[11px] h-7 px-2.5">
                  Select All
                </Button>
                <Button size="sm" variant="outline" onClick={deselectAllVisitorThemes} className="border-[#1E2630] text-[11px] h-7 px-2.5">
                  Clear All
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2">
              {uniqueThemes.map((t) => {
                const isChecked = allowedVisitorThemes.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggleAllowedVisitorTheme(t.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs flex items-center justify-between transition ${
                      isChecked
                        ? "border-[#00E6C3]/50 bg-[#00E6C3]/10 text-[#00E6C3] font-semibold"
                        : "border-[#1E2630] bg-[#0B0F14]/40 text-[#9AA6B2] hover:border-white/20"
                    }`}
                  >
                    <span className="truncate">{t.name}</span>
                    <div className={`h-4 w-4 rounded border flex items-center justify-center ${
                      isChecked ? "border-[#00E6C3] bg-[#00E6C3] text-black" : "border-white/20"
                    }`}>
                      {isChecked && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Archived Themes Section */}
          {archivedThemeList.length > 0 && (
            <section className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-3">
              <h4 className="font-bold text-sm text-amber-300">Archived Themes ({archivedThemeList.length})</h4>
              <p className="text-xs text-[#9AA6B2]">
                These themes are hidden from the active selection palette. You can restore them to active status anytime.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {archivedThemeList.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl border border-amber-500/20 bg-[#11161D] flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-xs text-white">{t.name}</span>
                      <span className="text-[10px] text-[#9AA6B2] block">{t.category}</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => toggleArchiveTheme(t.id)}
                      className="bg-amber-400 text-black hover:bg-amber-400/90 text-xs h-7 px-3 font-semibold"
                    >
                      Restore
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Live Preview Iframe */}
          <section className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5">
            <PanelHeader
              icon={Radio}
              title="Interactive Workbench Live Sandbox"
              right={
                <span className="text-xs text-[#9AA6B2]">
                  Draft: <span className="text-[#00E6C3] font-mono font-semibold">{data.draft.website_theme}</span>
                </span>
              }
            />
            <div className="mt-4 rounded-xl border border-[#1E2630] overflow-hidden bg-black shadow-2xl">
              <iframe key={previewUrl} src={previewUrl} title="preview" className="w-full h-[540px]" />
            </div>
          </section>
        </div>

        {/* Right Sidebar Controls */}
        <aside className="space-y-4">
          <section className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-[#00E6C3]" />
                <span className="text-xs font-bold text-white">Visitor Theme Switcher</span>
              </div>
              <Switch checked={visitorSwitcher} onCheckedChange={toggleVisitorSwitcher} />
            </div>
            <p className="text-[11px] text-[#9AA6B2] leading-relaxed">
              {visitorSwitcher
                ? `Enabled. Visitors can switch between your ${allowedVisitorThemes.length} whitelisted themes.`
                : "Disabled. Visitors will only see your live published theme without any floating switcher."}
            </p>
          </section>

          <section className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5">
            <PanelHeader icon={Terminal} title="Deploy Release" />
            <dl className="mt-4 space-y-2 text-xs">
              <Row k="Live Theme" v={data.live.website_theme} tone="live" />
              <Row k="Draft Staged" v={data.draft.website_theme} tone="draft" />
              <Row k="Status" v={dirty ? "Unpublished changes" : "In sync"} tone={dirty ? "warn" : "ok"} />
            </dl>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Release notes (e.g. Switch to The Workshop 3D theme)..."
              rows={2}
              className="mt-3 w-full rounded-xl bg-[#0B0F14] border border-[#1E2630] p-2.5 text-xs text-white outline-none focus:border-[#00E6C3]"
            />
            <Button
              disabled={!dirty || publish.isPending}
              onClick={() => publish.mutate()}
              className="mt-3 w-full bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-semibold text-xs h-9"
            >
              <Upload className="h-4 w-4 mr-1" />
              Publish Live Release
            </Button>
          </section>

          {/* Audit History */}
          <section className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5">
            <PanelHeader icon={History} title="Release History" />
            <div className="mt-4 space-y-2 max-h-60 overflow-y-auto text-xs">
              {(history.data || []).slice(0, 5).map((h) => (
                <div key={h.id} className="p-2.5 rounded-xl border border-white/5 bg-[#0B0F14] flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[11px] text-white font-bold">{h.website_theme}</span>
                    <span className="text-[10px] text-[#9AA6B2] block">{new Date(h.created_at).toLocaleDateString()}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => rollback.mutate(h.id)}
                    className="text-[#00E6C3] text-[10px] h-6 px-2 hover:bg-[#00E6C3]/10"
                  >
                    Rollback
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

/* ============================ Articles view ============================ */

const EMPTY_DRAFT: ArticleFormState = {
  id: undefined,
  title: "",
  slug: "",
  excerpt: "",
  markdown: "",
  cover_image_url: "",
  status: "draft",
  template: "editorial-longform",
};

type ArticleFormState = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  markdown: string;
  cover_image_url: string;
  status: "draft" | "published";
  template: string;
};

function ArticlesView() {
  const qc = useQueryClient();
  const listFn = useServerFn(listArticlesAdmin);
  const getFn = useServerFn(getArticleAdmin);
  const upsertFn = useServerFn(upsertArticle);
  const deleteFn = useServerFn(deleteArticle);
  const aiFn = useServerFn(aiDraftArticle);
  const historyFn = useServerFn(listArticleHistory);
  const rollbackFn = useServerFn(rollbackArticle);

  const list = useQuery({ queryKey: ["admin", "articles"], queryFn: () => listFn() });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<ArticleFormState>(EMPTY_DRAFT);
  const [aiNotes, setAiNotes] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const history = useQuery({
    queryKey: ["admin", "articles", selectedId, "history"],
    queryFn: () => historyFn({ data: selectedId! }),
    enabled: !!selectedId,
  });

  const rollback = useMutation({
    mutationFn: (snapshotId: string) => rollbackFn({ data: snapshotId }),
    onSuccess: () => {
      setMsg("Reverted to snapshot.");
      qc.invalidateQueries({ queryKey: ["admin", "articles"] });
      qc.invalidateQueries({ queryKey: ["admin", "articles", selectedId] });
      qc.invalidateQueries({ queryKey: ["admin", "articles", selectedId, "history"] });
      qc.invalidateQueries({ queryKey: ["articles", "published"] });
      setTimeout(() => setMsg(null), 2000);
    },
    onError: (e) => setMsg(String(e)),
  });

  const selected = useQuery({
    queryKey: ["admin", "articles", selectedId],
    queryFn: () => getFn({ data: selectedId! }),
    enabled: !!selectedId,
  });

  useEffect(() => {
    if (selected.data) {
      const a = selected.data;
      setForm({
        id: a.id,
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt ?? "",
        markdown: a.markdown ?? "",
        cover_image_url: a.cover_image_url ?? "",
        status: (a.status as "draft" | "published") ?? "draft",
        template: a.template ?? "editorial-longform",
      });
    }
  }, [selected.data]);

  const save = useMutation({
    mutationFn: () =>
      upsertFn({
        data: {
          id: form.id,
          title: form.title,
          slug: form.slug || slugify(form.title),
          excerpt: form.excerpt || undefined,
          markdown: form.markdown,
          cover_image_url: form.cover_image_url || undefined,
          status: form.status,
          template: form.template,
        },
      }),
    onSuccess: (row) => {
      setMsg("Saved.");
      setSelectedId(row.id);
      setForm((f) => ({ ...f, id: row.id }));
      qc.invalidateQueries({ queryKey: ["admin", "articles"] });
      qc.invalidateQueries({ queryKey: ["admin", "articles", row.id, "history"] });
      qc.invalidateQueries({ queryKey: ["articles", "published"] });
      setTimeout(() => setMsg(null), 2000);
    },
    onError: (e) => setMsg(String(e)),
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteFn({ data: id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "articles"] });
      qc.invalidateQueries({ queryKey: ["articles", "published"] });
      newDraft();
    },
  });

  function newDraft() {
    setSelectedId(null);
    setForm(EMPTY_DRAFT);
    setAiNotes("");
    setMsg(null);
  }

  async function runAi() {
    if (!form.title.trim()) {
      setMsg("Add a title first.");
      return;
    }
    setAiBusy(true);
    setMsg("Drafting with AI…");
    try {
      const res = await aiFn({ data: { title: form.title, notes: aiNotes || undefined } });
      setForm((f) => ({
        ...f,
        slug: f.slug || res.slug,
        excerpt: f.excerpt || res.excerpt,
        markdown: res.markdown,
      }));
      setMsg("AI draft inserted. Review before saving.");
    } catch (e) {
      setMsg(String(e));
    } finally {
      setAiBusy(false);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4 min-w-0">
      {/* Article list */}
      <aside className="rounded-lg border border-border/60 bg-surface/60 p-3 min-w-0">
        <div className="flex items-center justify-between px-1">
          <div className="text-sm font-semibold flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" /> Articles
          </div>
          <button
            onClick={newDraft}
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </div>
        <div className="mt-3 space-y-1 max-h-[70vh] overflow-y-auto">
          {list.isLoading && <div className="text-xs text-muted-foreground px-2">Loading…</div>}
          {(list.data ?? []).length === 0 && !list.isLoading && (
            <div className="text-xs text-muted-foreground px-2">No articles yet.</div>
          )}
          {(list.data ?? []).map((a) => (
            <button
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              className={`w-full text-left rounded-md px-2 py-2 border ${
                selectedId === a.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:border-border/60"
              }`}
            >
              <div className="text-sm font-medium truncate">{a.title || "(untitled)"}</div>
              <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-wider">
                <Tag tone={a.status === "published" ? "live" : "draft"}>{a.status}</Tag>
                <span className="text-muted-foreground normal-case tracking-normal">
                  {new Date(a.updated_at).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Editor */}
      <section className="rounded-lg border border-border/60 bg-surface/60 p-4 min-w-0">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <PanelHeader icon={FileText} title={form.id ? "Edit article" : "New article"} />
          <div className="flex items-center gap-2">
            {form.id && (
              <button
                onClick={() => {
                  if (confirm("Delete this article?")) del.mutate(form.id!);
                }}
                className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            )}
            <Button
              size="sm"
              disabled={save.isPending || !form.title}
              onClick={() => save.mutate()}
            >
              {save.isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>

        {msg && (
          <div className="mt-3 rounded-md border border-border/60 bg-background/60 px-3 py-2 text-xs text-muted-foreground">
            {msg}
          </div>
        )}

        {/* AI helper */}
        <div className="mt-4 rounded-md border border-primary/30 bg-primary/5 p-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-primary" /> AI draft
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Give AI your title (and optional notes / outline). It fills the excerpt and full markdown body.
          </p>
          <textarea
            value={aiNotes}
            onChange={(e) => setAiNotes(e.target.value)}
            placeholder="Optional notes, tone, key points, target audience…"
            rows={2}
            className="mt-2 w-full rounded-md bg-background border border-border/60 p-2 text-xs outline-none focus:border-primary"
          />
          <Button
            size="sm"
            variant="outline"
            disabled={aiBusy || !form.title}
            onClick={runAi}
            className="mt-2"
          >
            {aiBusy ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <Sparkles className="h-3.5 w-3.5 mr-1" />}
            {aiBusy ? "Drafting…" : "Draft with AI"}
          </Button>
        </div>

        {/* Fields */}
        <div className="mt-4 grid gap-3">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-md bg-background border border-border/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                onBlur={() => !form.slug && setForm({ ...form, slug: slugify(form.title) })}
                placeholder={slugify(form.title) || "auto-from-title"}
                className="w-full rounded-md bg-background border border-border/60 px-3 py-2 text-sm outline-none focus:border-primary font-mono"
              />
            </Field>
            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                className="w-full rounded-md bg-background border border-border/60 px-3 py-2 text-sm outline-none focus:border-primary"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </div>
          <Field label={`Template — ${blogTemplates[form.template]?.description ?? "layout for this article"}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Object.values(blogTemplates).map((t) => {
                const active = form.template === t.id;
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setForm({ ...form, template: t.id })}
                    className={`text-left rounded-md border px-3 py-2 text-xs transition-colors ${
                      active ? "border-primary bg-primary/5 text-primary" : "border-border/60 hover:border-border"
                    }`}
                  >
                    <div className="font-semibold">{t.name}</div>
                    <div className="mt-1 text-[10px] text-muted-foreground normal-case leading-snug">
                      {t.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Cover image URL">
            <input
              value={form.cover_image_url}
              onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
              placeholder="https://…"
              className="w-full rounded-md bg-background border border-border/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Excerpt">
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              rows={2}
              className="w-full rounded-md bg-background border border-border/60 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Markdown">
            <textarea
              value={form.markdown}
              onChange={(e) => setForm({ ...form, markdown: e.target.value })}
              rows={18}
              className="w-full rounded-md bg-background border border-border/60 px-3 py-2 text-sm outline-none focus:border-primary font-mono"
            />
          </Field>
        </div>

        {/* History / rollback */}
        {form.id && (
          <div className="mt-6 rounded-md border border-border/60 bg-background/40 p-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <History className="h-4 w-4 text-primary" /> Version history
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground ml-1">
                snapshots on every change
              </span>
            </div>
            <div className="mt-3 space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {history.isLoading && <div className="text-xs text-muted-foreground">Loading…</div>}
              {(history.data ?? []).length === 0 && !history.isLoading && (
                <div className="text-xs text-muted-foreground">No snapshots yet.</div>
              )}
              {(history.data ?? []).map((h) => {
                const snap = h.snapshot as {
                  title?: string;
                  status?: string;
                  template?: string;
                };
                return (
                  <div
                    key={h.id}
                    className="rounded-md border border-border/40 p-2 text-xs flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {new Date(h.created_at).toLocaleString()}
                        </span>
                        <Tag tone={h.kind === "rollback" ? "warn" : h.kind === "create" ? "live" : "draft"}>
                          {h.kind}
                        </Tag>
                        {snap.status && (
                          <Tag tone={snap.status === "published" ? "live" : "draft"}>{snap.status}</Tag>
                        )}
                      </div>
                      <div className="mt-1 truncate text-foreground/90">{snap.title ?? "(untitled)"}</div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">
                        template: <span className="font-mono">{snap.template ?? "?"}</span>
                        {h.note && <span className="italic"> — {h.note}</span>}
                      </div>
                    </div>
                    <button
                      className="shrink-0 inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-primary hover:border-primary hover:bg-primary/5"
                      disabled={rollback.isPending}
                      onClick={() => {
                        if (confirm("Revert this article to that snapshot?")) rollback.mutate(h.id);
                      }}
                    >
                      <RotateCcw className="h-3 w-3" /> Rollback
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{label}</div>
      {children}
    </label>
  );
}

/* --- primitives --- */

function TerminalShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function PanelHeader({ icon: Icon, title, right }: { icon: React.ElementType; title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-primary" /> {title}
      </div>
      {right}
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
        active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
      }`}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

function Tag({ children, tone = "draft" }: { children: React.ReactNode; tone?: "draft" | "live" | "warn" }) {
  const cls =
    tone === "live"
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
      : tone === "warn"
        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
        : "bg-primary/15 text-primary border-primary/30";
  return <span className={`inline-flex items-center rounded border px-1.5 py-0.5 ${cls}`}>{children}</span>;
}

function Row({ k, v, tone }: { k: string; v: string; tone?: "live" | "draft" | "warn" | "ok" }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="flex items-center gap-2">
        <span className="font-mono">{v}</span>
        {tone === "live" && <Tag tone="live">live</Tag>}
        {tone === "draft" && <Tag>draft</Tag>}
        {tone === "warn" && <Tag tone="warn">changes</Tag>}
        {tone === "ok" && <Tag tone="live">synced</Tag>}
      </dd>
    </div>
  );
}

function Loading() {
  return <div className="p-12 text-center text-muted-foreground text-sm">Booting terminal…</div>;
}
function Fatal({ msg }: { msg: string }) {
  return <div className="p-12 text-center text-red-400 text-sm">{msg}</div>;
}

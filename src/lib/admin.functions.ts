import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { CmsConfig, SiteContent } from "./site-content";

type DraftBundle = {
  content: SiteContent;
  draft: CmsConfig;
  live: CmsConfig;
  isAdmin: boolean;
};

export const getAdminBundle = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<DraftBundle> => {
    const { supabase, userId } = context;
    const [{ data: roles }, { data: content }, { data: configs }] = await Promise.all([
      supabase.from("user_roles").select("role").eq("user_id", userId),
      supabase.from("site_content").select("content").eq("id", "global").maybeSingle(),
      supabase.from("cms_config").select("*"),
    ]);
    const isAdmin = (roles ?? []).some((r) => r.role === "admin");
    const live = (configs ?? []).find((c) => c.state === "live");
    const draft = (configs ?? []).find((c) => c.state === "draft") ?? live;
    if (!content || !live) throw new Error("CMS not initialized");
    const baseContent = (content.content || {}) as any;

    return {
      content: {
        ...baseContent,
        identity: baseContent.identity || { name: "Prajwal DL", brandDot: ".", role: "Developer" },
        hero: baseContent.hero || { badge: "Available for projects", headingLead: "I build", headingAccent: "premium", headingTail: "websites", sub: "Delivering high-quality digital experiences.", industries: ["Tech"] },
        services: baseContent.services || [],
        stats: baseContent.stats || [],
        projects: baseContent.projects || [],
        why: baseContent.why || [],
        contact: baseContent.contact || { badge: "Contact", headingLead: "Let's", headingAccent: "connect", sub: "Reach out to me." },
        links: baseContent.links || { book: "#", email: "#", twitter: "#", linkedin: "#", github: "#" },
        seo: baseContent.seo || { title: "Prajwal DL", description: "Portfolio" },
      } as SiteContent,
      draft: {
        website_theme: draft!.website_theme,
        blog_theme: draft!.blog_theme,
        feature_flags: draft!.feature_flags as CmsConfig["feature_flags"],
      },
      live: {
        website_theme: live.website_theme,
        blog_theme: live.blog_theme,
        feature_flags: live.feature_flags as CmsConfig["feature_flags"],
      },
      isAdmin,
    };
  });

export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: countErr } = await supabaseAdmin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");
    if (countErr) throw countErr;
    if ((count ?? 0) > 0) return { claimed: false };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error && !`${error.message}`.includes("duplicate")) throw error;
    return { claimed: true };
  });

const updateDraftInput = z.object({
  website_theme: z.string().min(1).optional(),
  blog_theme: z.string().min(1).optional(),
});

export const updateDraftConfig = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => updateDraftInput.parse(input))
  .handler(async ({ context, data }) => {
    const patch: { website_theme?: string; blog_theme?: string } = {};
    if (data.website_theme) patch.website_theme = data.website_theme;
    if (data.blog_theme) patch.blog_theme = data.blog_theme;
    if (Object.keys(patch).length === 0) return { ok: true };
    const { error } = await context.supabase
      .from("cms_config")
      .update(patch)
      .eq("state", "draft");
    if (error) throw error;
    return { ok: true };
  });

async function assertAdmin(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string,
) {
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw error;
  if (!data) throw new Error("Forbidden: admin role required");
}

export const publishDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.string().optional().parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: configs, error: cfgErr } = await supabaseAdmin.from("cms_config").select("*");
    if (cfgErr) throw cfgErr;
    const draft = (configs ?? []).find((c) => c.state === "draft");
    const live = (configs ?? []).find((c) => c.state === "live");
    if (!draft) throw new Error("no draft config");
    const { data: snap, error: snapErr } = await supabaseAdmin
      .from("theme_history")
      .insert({
        snapshot: {
          previous_live: live ?? null,
          new_live: draft,
          kind: "publish",
        },
        note: data ?? null,
        created_by: context.userId,
      })
      .select("id")
      .single();
    if (snapErr) throw snapErr;
    const { error: updErr } = await supabaseAdmin
      .from("cms_config")
      .update({
        website_theme: draft.website_theme,
        blog_theme: draft.blog_theme,
        feature_flags: draft.feature_flags,
        updated_at: new Date().toISOString(),
      })
      .eq("state", "live");
    if (updErr) throw updErr;
    return { snapshot_id: snap.id as string };
  });

export const rollbackTo = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((snapshotId: string) => z.string().uuid().parse(snapshotId))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: snap, error: snapErr } = await supabaseAdmin
      .from("theme_history")
      .select("snapshot")
      .eq("id", data)
      .maybeSingle();
    if (snapErr) throw snapErr;
    if (!snap) throw new Error("snapshot not found");
    const snapshot = snap.snapshot as Record<string, any>;
    const target = (snapshot.previous_live ?? snapshot.new_live) as Record<string, any> | null;
    if (!target) throw new Error("snapshot has no state");
    const { data: liveBefore } = await supabaseAdmin
      .from("cms_config")
      .select("*")
      .eq("state", "live")
      .maybeSingle();
    const { data: newSnap, error: newSnapErr } = await supabaseAdmin
      .from("theme_history")
      .insert({
        snapshot: {
          previous_live: liveBefore ?? null,
          new_live: target,
          kind: "rollback",
          source_snapshot: data,
        },
        note: "rollback",
        created_by: context.userId,
      })
      .select("id")
      .single();
    if (newSnapErr) throw newSnapErr;
    const patch = {
      website_theme: target.website_theme,
      blog_theme: target.blog_theme,
      feature_flags: target.feature_flags,
      updated_at: new Date().toISOString(),
    };
    const { error: updErr } = await supabaseAdmin
      .from("cms_config")
      .update(patch)
      .in("state", ["live", "draft"]);
    if (updErr) throw updErr;
    return { snapshot_id: newSnap.id as string };
  });

export const listHistory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("theme_history")
      .select("id, note, snapshot, created_at, created_by")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;
    return data ?? [];
  });

export const updateSiteContent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => input as SiteContent)
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_content")
      .update({ content: data as any })
      .eq("id", "global");
    if (error) throw error;
    return { ok: true };
  });

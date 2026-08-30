import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

import { articlesService } from "@/features/articles/application/articles.service";

function serverPublic() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    return createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });
  } catch {
    return null;
  }
}

export type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  markdown: string;
  cover_image_url: string | null;
  status: string;
  template: string;
  published_at: string | null;
  updated_at: string;
  created_at: string;
  author_id: string | null;
};

/* -------- Public reads -------- */

export const listPublishedArticles = createServerFn({ method: "GET" }).handler(
  async (): Promise<ArticleRow[]> => {
    const supabase = serverPublic();
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("status", "published")
          .order("published_at", { ascending: false, nullsFirst: false });
        if (!error && data) return data as ArticleRow[];
      } catch (err) {
        console.warn("[listPublishedArticles] Supabase query failed:", err);
      }
    }
    try {
      const local = await articlesService().queries.listPublished();
      return (local ?? []) as unknown as ArticleRow[];
    } catch {
      return [];
    }
  },
);

export const getPublishedArticle = createServerFn({ method: "GET" })
  .validator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data }): Promise<ArticleRow | null> => {
    const supabase = serverPublic();
    if (supabase) {
      try {
        const { data: row, error } = await supabase
          .from("articles")
          .select("*")
          .eq("slug", data)
          .eq("status", "published")
          .maybeSingle();
        if (!error && row) return row as ArticleRow;
      } catch (err) {
        console.warn("[getPublishedArticle] Supabase query failed:", err);
      }
    }
    try {
      const local = await articlesService().queries.findBySlug(data);
      return (local ?? null) as unknown as ArticleRow | null;
    } catch {
      return null;
    }
  });

/* -------- Admin CRUD -------- */

const upsertInput = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "lowercase letters, digits and dashes only"),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().nullable(),
  markdown: z.string().default(""),
  cover_image_url: z.string().url().optional().nullable(),
  status: z.enum(["draft", "published"]).default("draft"),
  template: z.string().min(1).max(60).default("editorial-longform"),
});

export const listArticlesAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ArticleRow[]> => {
    const { data, error } = await context.supabase
      .from("articles")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as ArticleRow[];
  });

export const getArticleAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((id: string) => z.string().uuid().parse(id))
  .handler(async ({ context, data }): Promise<ArticleRow | null> => {
    const { data: row, error } = await context.supabase
      .from("articles")
      .select("*")
      .eq("id", data)
      .maybeSingle();
    if (error) throw error;
    return (row as ArticleRow) ?? null;
  });

export const upsertArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => upsertInput.parse(input))
  .handler(async ({ context, data }): Promise<ArticleRow> => {
    const now = new Date().toISOString();
    const publishedAt = data.status === "published" ? now : null;

    if (data.id) {
      const { data: row, error } = await context.supabase
        .from("articles")
        .update({
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt ?? null,
          markdown: data.markdown,
          cover_image_url: data.cover_image_url ?? null,
          status: data.status,
          template: data.template,
          published_at: data.status === "published" ? publishedAt : null,
        })
        .eq("id", data.id)
        .select("*")
        .single();
      if (error) throw error;
      return row as ArticleRow;
    }

    const { data: row, error } = await context.supabase
      .from("articles")
      .insert({
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt ?? null,
        markdown: data.markdown,
        cover_image_url: data.cover_image_url ?? null,
        status: data.status,
        template: data.template,
        published_at: publishedAt,
        author_id: context.userId,
      })
      .select("*")
      .single();
    if (error) throw error;
    return row as ArticleRow;
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((id: string) => z.string().uuid().parse(id))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("articles").delete().eq("id", data);
    if (error) throw error;
    return { ok: true };
  });

/* -------- AI draft (AI Gateway) -------- */

const aiInput = z.object({
  title: z.string().min(1).max(200),
  notes: z.string().max(2000).optional(),
});

export const aiDraftArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => aiInput.parse(input))
  .handler(async ({ data }): Promise<{ slug: string; excerpt: string; markdown: string }> => {
    const key = process.env.AI_API_KEY || process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing AI_API_KEY");

    const system =
      "You are a senior technical writer. Given a title and optional notes, write a polished blog article in Markdown. Return JSON with keys: slug (lowercase kebab, <=60 chars, safe), excerpt (<=200 chars plain text), markdown (full article, 500-900 words, starts with an H1 matching the title). Include H2 sections, at least one bulleted list, and a short closing paragraph. Do not wrap the JSON in code fences.";

    const user = `Title: ${data.title}\nNotes: ${data.notes ?? "(none)"}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429) throw new Error("AI rate limit — please retry in a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted — add credits in workspace settings.");
    if (!res.ok) throw new Error(`AI error ${res.status}: ${await res.text()}`);

    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let parsed: { slug?: string; excerpt?: string; markdown?: string };
    try {
      parsed = JSON.parse(content);
    } catch {
      // Fallback: treat entire response as markdown, generate slug locally.
      parsed = { markdown: content };
    }

    const slug =
      parsed.slug?.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60);

    return {
      slug,
      excerpt: parsed.excerpt ?? "",
      markdown: parsed.markdown ?? `# ${data.title}\n\n(No content generated.)`,
    };
  });

/* -------- Article history / rollback -------- */

export type ArticleHistoryRow = {
  id: string;
  article_id: string;
  snapshot: any;
  kind: string;
  note: string | null;
  created_at: string;
  created_by: string | null;
};

export const listArticleHistory = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((id: string) => z.string().uuid().parse(id))
  .handler(async ({ context, data }): Promise<ArticleHistoryRow[]> => {
    const { data: rows, error } = await (context.supabase as any)
      .from("article_history")
      .select("*")
      .eq("article_id", data)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return (rows ?? []) as ArticleHistoryRow[];
  });

export const rollbackArticle = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((snapshotId: string) => z.string().uuid().parse(snapshotId))
  .handler(async ({ context, data }) => {
    // Verify caller is admin (has_role runs as invoker; user can read own roles).
    const { data: isAdmin, error: roleErr } = await (context.supabase as any).rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleErr) throw roleErr;
    if (!isAdmin) throw new Error("Forbidden: admin role required");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: snap, error: snapErr } = await (supabaseAdmin as any)
      .from("article_history")
      .select("snapshot, article_id")
      .eq("id", data)
      .maybeSingle();
    if (snapErr) throw snapErr;
    if (!snap) throw new Error("snapshot not found");
    const s = snap.snapshot as Record<string, any>;
    const aid = snap.article_id as string;
    const status = (s.status as string) ?? "draft";
    const patch = {
      title: s.title,
      slug: s.slug,
      excerpt: s.excerpt ?? null,
      markdown: s.markdown ?? "",
      cover_image_url: s.cover_image_url ?? null,
      status,
      template: s.template ?? "editorial-longform",
      published_at:
        status === "published"
          ? (s.published_at as string | null) ?? new Date().toISOString()
          : null,
      updated_at: new Date().toISOString(),
    };
    const { error: updErr } = await (supabaseAdmin as any)
      .from("articles")
      .update(patch)
      .eq("id", aid);
    if (updErr) throw updErr;
    const { error: histErr } = await (supabaseAdmin as any)
      .from("article_history")
      .insert({
        article_id: aid,
        snapshot: s,
        kind: "rollback",
        note: `rollback to ${data}`,
        created_by: context.userId,
      });
    if (histErr) throw histErr;
    return { article_id: aid };
  });



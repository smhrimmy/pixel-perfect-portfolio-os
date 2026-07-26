import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import type { z } from "zod";

import { qk } from "@/providers/query.provider";
import {
  listAllArticlesJson,
  createArticleJson,
  updateArticleJson,
  deleteArticleJson,
} from "@/actions";
import { articleCreateSchema } from "@/features/articles/schemas/article.schema";
import { Slug } from "@/domain/shared/value-objects";

import { EntityWorkbench } from "@/components/studio/entity-workbench";
import { EditorShell } from "@/components/studio/editor-shell";
import { parseCommaList } from "@/components/studio/form-utils";
import { renderMarkdown } from "@/lib/markdown";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/studio/articles")({ component: ArticlesPage });

type FormValues = z.input<typeof articleCreateSchema>;

const TEMPLATES = [
  "editorial-longform",
  "magazine-hero",
  "minimal-card",
  "terminal-log",
  "typewriter",
  "neon-brief",
  "paper-serif",
];

const defaults = (): FormValues => ({
  slug: "",
  title: "",
  excerpt: "",
  markdown: "",
  coverImageUrl: null,
  status: "draft",
  template: "editorial-longform",
  tags: [],
  authorId: null,
});

function ArticlesPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listAllArticlesJson);
  const createFn = useServerFn(createArticleJson);
  const updateFn = useServerFn(updateArticleJson);
  const deleteFn = useServerFn(deleteArticleJson);

  const { data, isLoading } = useQuery({ queryKey: qk.articles.all, queryFn: () => listFn() });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState("");
  const selected = useMemo(() => data?.find((a) => a.id === selectedId) ?? null, [data, selectedId]);
  const isNew = selectedId === "__new__";

  const form = useForm<FormValues>({
    resolver: zodResolver(articleCreateSchema),
    defaultValues: defaults(),
    mode: "onChange",
  });

  useEffect(() => {
    if (isNew) { form.reset(defaults()); setTagsText(""); }
    else if (selected) {
      form.reset({
        slug: selected.slug,
        title: selected.title,
        excerpt: selected.excerpt,
        markdown: selected.markdown,
        coverImageUrl: selected.coverImageUrl,
        status: selected.status,
        template: selected.template,
        tags: selected.tags,
        authorId: selected.authorId,
      });
      setTagsText(selected.tags.join(", "));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const title = form.watch("title");
  useEffect(() => {
    if (isNew && title && !form.getValues("slug")) {
      try { form.setValue("slug", Slug.fromTitle(title).toString(), { shouldDirty: false }); } catch { /* ignore */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, isNew]);

  const save = async (values: FormValues, publish = false) => {
    const payload = { ...values, status: publish ? ("published" as const) : values.status };
    if (isNew) {
      const created = await createFn({ data: payload });
      setSelectedId(created.id);
    } else if (selected) {
      await updateFn({ data: { id: selected.id, ...payload } });
    }
    await qc.invalidateQueries({ queryKey: qk.articles.all });
  };

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: id }),
    onSuccess: async () => {
      toast.success("Deleted");
      setSelectedId(null);
      await qc.invalidateQueries({ queryKey: qk.articles.all });
    },
  });

  const items = (data ?? []).map((a) => ({
    id: a.id,
    label: a.title || "Untitled",
    meta: `/${a.slug}`,
    status: a.status,
  }));

  const editor = selectedId ? (
    <EditorShell<FormValues>
      title={form.watch("title") || (isNew ? "New article" : "Untitled")}
      subtitle={form.watch("slug") ? `/blog/${form.watch("slug")}` : undefined}
      form={form}
      isPublished={form.watch("status") === "published"}
      onSave={(v) => save(v, false)}
      onPublish={(v) => save(v, true)}
      actionsSlot={
        !isNew && selected ? (
          <Button size="sm" variant="ghost" onClick={() => confirm(`Delete "${selected.title}"?`) && deleteMut.mutate(selected.id)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        ) : null
      }
      renderForm={() => (
        <div className="space-y-4">
          <F label="Title" err={form.formState.errors.title?.message}><Input {...form.register("title")} /></F>
          <F label="Slug" err={form.formState.errors.slug?.message}><Input {...form.register("slug")} /></F>
          <F label="Excerpt"><Textarea rows={2} {...form.register("excerpt")} /></F>
          <F label="Cover image URL" err={form.formState.errors.coverImageUrl?.message}>
            <Input type="url" {...form.register("coverImageUrl", { setValueAs: (v) => v || null })} />
          </F>
          <div className="grid grid-cols-2 gap-4">
            <F label="Status">
              <Select value={form.watch("status")} onValueChange={(v) => form.setValue("status", v as FormValues["status"], { shouldDirty: true })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </F>
            <F label="Template">
              <Select value={form.watch("template")} onValueChange={(v) => form.setValue("template", v, { shouldDirty: true })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TEMPLATES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </F>
          </div>
          <F label="Tags (comma-separated)">
            <Input
              value={tagsText}
              onChange={(e) => {
                setTagsText(e.target.value);
                form.setValue("tags", parseCommaList(e.target.value), { shouldDirty: true });
              }}
            />
          </F>
          <F label="Markdown">
            <Textarea rows={16} className="font-mono text-sm" {...form.register("markdown")} />
          </F>
        </div>
      )}
      renderPreview={(v) => (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{v.title || "Untitled"}</CardTitle>
              <Badge variant="outline" className="text-[10px]">{v.template}</Badge>
            </div>
            {v.excerpt && <p className="text-sm text-muted-foreground">{v.excerpt}</p>}
          </CardHeader>
          <CardContent className="space-y-3">
            {v.coverImageUrl && (
              <img src={v.coverImageUrl} alt="" className="aspect-video w-full rounded-md object-cover" loading="lazy" />
            )}
            <article
              className="prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(v.markdown ?? "") }}
            />
          </CardContent>
        </Card>
      )}
    />
  ) : null;

  return (
    <EntityWorkbench
      title="Articles"
      items={items}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onCreate={() => setSelectedId("__new__")}
      createLabel="New article"
      editor={editor}
      isLoading={isLoading}
    />
  );
}

function F({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}

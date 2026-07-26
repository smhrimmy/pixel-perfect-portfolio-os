import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { qk } from "@/providers/query.provider";
import {
  listAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/actions";
import {
  projectCreateSchema,
} from "@/features/projects/schemas/project.schema";
import type { z } from "zod";
type ProjectFormValues = z.input<typeof projectCreateSchema>;
type ProjectSubmitValues = z.output<typeof projectCreateSchema>;
import type { ProjectDto } from "@/features/projects/dto/project.dto";

import { EntityWorkbench } from "@/components/studio/entity-workbench";
import { EditorShell } from "@/components/studio/editor-shell";
import { parseCommaList } from "@/components/studio/form-utils";
import { Slug } from "@/domain/shared/value-objects";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/studio/projects")({
  component: ProjectsPage,
});

function defaultValues(): ProjectFormValues {
  return {
    slug: "",
    title: "",
    summary: "",
    description: "",
    tags: [],
    coverImageUrl: null,
    liveUrl: null,
    repoUrl: null,
    status: "draft",
    featured: false,
    order: 0,
  };
}

function ProjectsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listAllProjects);
  const createFn = useServerFn(createProject);
  const updateFn = useServerFn(updateProject);
  const deleteFn = useServerFn(deleteProject);

  const { data, isLoading } = useQuery({ queryKey: qk.projects.all, queryFn: () => listFn() });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState("");

  const selected = useMemo(() => data?.find((p) => p.id === selectedId) ?? null, [data, selectedId]);
  const isNew = selectedId === "__new__";

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: defaultValues(),
    mode: "onChange",
  });

  useEffect(() => {
    if (isNew) {
      form.reset(defaultValues());
      setTagsText("");
    } else if (selected) {
      form.reset({
        slug: selected.slug,
        title: selected.title,
        summary: selected.summary,
        description: selected.description,
        tags: selected.tags,
        coverImageUrl: selected.coverImageUrl,
        liveUrl: selected.liveUrl,
        repoUrl: selected.repoUrl,
        status: selected.status,
        featured: selected.featured,
        order: selected.order,
      });
      setTagsText(selected.tags.join(", "));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const save = async (values: ProjectFormValues, publish = false) => {
    const payload = { ...values, status: publish ? ("published" as const) : values.status };
    if (isNew) {
      const created = await createFn({ data: payload });
      setSelectedId(created.id);
      await qc.invalidateQueries({ queryKey: qk.projects.all });
    } else if (selected) {
      await updateFn({ data: { id: selected.id, ...payload } });
      await qc.invalidateQueries({ queryKey: qk.projects.all });
    }
  };

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: id }),
    onSuccess: async () => {
      toast.success("Deleted");
      setSelectedId(null);
      await qc.invalidateQueries({ queryKey: qk.projects.all });
    },
  });

  const items = (data ?? []).map((p) => ({
    id: p.id,
    label: p.title || "Untitled",
    meta: p.slug,
    status: p.status,
  }));

  const currentTitle = form.watch("title");
  useEffect(() => {
    if (isNew && currentTitle && !form.getValues("slug")) {
      try {
        form.setValue("slug", Slug.fromTitle(currentTitle).toString(), { shouldDirty: false });
      } catch { /* ignore */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTitle, isNew]);

  const editor = selectedId ? (
    <EditorShell
      title={form.watch("title") || (isNew ? "New project" : "Untitled")}
      subtitle={form.watch("slug") ? `/${form.watch("slug")}` : undefined}
      form={form}
      isPublished={form.watch("status") === "published"}
      onSave={(v) => save(v, false)}
      onPublish={(v) => save(v, true)}
      actionsSlot={
        !isNew && selected ? (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (confirm(`Delete "${selected.title}"?`)) deleteMut.mutate(selected.id);
            }}
          >
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        ) : null
      }
      renderForm={() => (
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input {...form.register("title")} />
            <FormError msg={form.formState.errors.title?.message} />
          </div>
          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input {...form.register("slug")} />
            <FormError msg={form.formState.errors.slug?.message} />
          </div>
          <div className="grid gap-2">
            <Label>Summary</Label>
            <Textarea rows={2} {...form.register("summary")} />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea rows={8} {...form.register("description")} />
          </div>
          <div className="grid gap-2">
            <Label>Tags (comma-separated)</Label>
            <Input
              value={tagsText}
              onChange={(e) => {
                setTagsText(e.target.value);
                form.setValue("tags", parseCommaList(e.target.value), { shouldDirty: true });
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div>
              <Label>Cover URL</Label>
              <Input
                type="url"
                {...form.register("coverImageUrl", { setValueAs: (v) => v || null })}
              />
              <FormError msg={form.formState.errors.coverImageUrl?.message} />
            </div>
            <div>
              <Label>Live URL</Label>
              <Input type="url" {...form.register("liveUrl", { setValueAs: (v) => v || null })} />
              <FormError msg={form.formState.errors.liveUrl?.message} />
            </div>
            <div>
              <Label>Repo URL</Label>
              <Input type="url" {...form.register("repoUrl", { setValueAs: (v) => v || null })} />
              <FormError msg={form.formState.errors.repoUrl?.message} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.watch("status")}
                onValueChange={(v: "draft" | "published" | "archived") =>
                  form.setValue("status", v, { shouldDirty: true })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Order</Label>
              <Input
                type="number"
                {...form.register("order", { valueAsNumber: true })}
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                id="featured"
                checked={form.watch("featured")}
                onCheckedChange={(v) => form.setValue("featured", v, { shouldDirty: true })}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
          </div>
        </div>
      )}
      renderPreview={(v) => (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base">{v.title || "Untitled project"}</CardTitle>
              {v.featured && <Badge variant="secondary">Featured</Badge>}
            </div>
            {v.summary && <p className="text-sm text-muted-foreground">{v.summary}</p>}
          </CardHeader>
          <CardContent className="space-y-3">
            {v.coverImageUrl && (
              <img
                src={v.coverImageUrl}
                alt=""
                className="aspect-video w-full rounded-md object-cover"
                loading="lazy"
              />
            )}
            {v.description && (
              <p className="whitespace-pre-wrap text-sm text-foreground/90">{v.description}</p>
            )}
            {(v.tags ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {(v.tags ?? []).map((t: string) => (
                  <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            )}
            <div className="flex gap-3 text-xs text-muted-foreground">
              {v.liveUrl && <a href={v.liveUrl} target="_blank" rel="noreferrer" className="underline">Live</a>}
              {v.repoUrl && <a href={v.repoUrl} target="_blank" rel="noreferrer" className="underline">Repo</a>}
            </div>
          </CardContent>
        </Card>
      )}
    />
  ) : null;

  return (
    <EntityWorkbench
      title="Projects"
      items={items}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onCreate={() => setSelectedId("__new__")}
      createLabel="New project"
      editor={editor}
      isLoading={isLoading}
    />
  );
}

function FormError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-destructive">{msg}</p>;
}

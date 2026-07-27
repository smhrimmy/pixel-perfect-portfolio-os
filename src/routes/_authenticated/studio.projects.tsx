import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { useUniversalStore } from "@/store/useUniversalStore";
import { EntityWorkbench } from "@/components/studio/entity-workbench";
import { EditorShell } from "@/components/studio/editor-shell";
import { parseCommaList } from "@/components/studio/form-utils";

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

function defaultValues() {
  return {
    id: "",
    title: "",
    slug: "",
    description: "",
    thumbnail_url: null,
    images: [],
    technologies: [],
    github_url: null,
    live_demo_url: null,
    featured: false,
    status: "published",
    sort_order: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

function ProjectsPage() {
  const { projects, setProjects, saveToSupabase } = useUniversalStore();
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState("");

  const selected = useMemo(() => projects?.find((p) => p.id === selectedId) ?? null, [projects, selectedId]);
  const isNew = selectedId === "__new__";

  const form = useForm({
    defaultValues: defaultValues(),
    mode: "onChange",
  });

  useEffect(() => {
    if (isNew) {
      form.reset(defaultValues());
      setTagsText("");
    } else if (selected) {
      form.reset({
        id: selected.id,
        title: selected.title,
        slug: selected.slug,
        description: selected.description,
        thumbnail_url: selected.thumbnail_url,
        technologies: selected.technologies,
        github_url: selected.github_url,
        live_demo_url: selected.live_demo_url,
        featured: selected.featured,
        status: selected.status,
        sort_order: selected.sort_order,
      });
      setTagsText(Array.isArray(selected.technologies) ? selected.technologies.join(", ") : "");
    }
  }, [selectedId, selected, isNew, form]);

  const save = async (values: any, publish = false) => {
    try {
      const payload = { ...values, status: publish ? "published" : values.status };
      let newProjects = [...(projects || [])];
      
      if (isNew) {
        payload.id = uuidv4();
        newProjects.push(payload);
        setSelectedId(payload.id);
      } else {
        newProjects = newProjects.map(p => p.id === payload.id ? { ...p, ...payload } : p);
      }
      
      setProjects(newProjects as any);
      await saveToSupabase();
      toast.success(isNew ? "Project created" : "Project updated");
    } catch (error) {
      toast.error("Failed to save project");
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const newProjects = (projects || []).filter(p => p.id !== id);
      setProjects(newProjects as any);
      await saveToSupabase();
      setSelectedId(null);
      toast.success("Deleted");
    } catch (error) {
      toast.error("Failed to delete project");
    }
  };

  const items = (projects ?? []).map((p) => ({
    id: p.id,
    label: p.title || "Untitled",
    meta: p.slug,
    status: p.status,
  }));

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
              if (confirm(`Delete "${selected.title}"?`)) deleteProject(selected.id);
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
          </div>
          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input {...form.register("slug")} />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea rows={8} {...form.register("description")} />
          </div>
          <div className="grid gap-2">
            <Label>Technologies (comma-separated)</Label>
            <Input
              value={tagsText}
              onChange={(e) => {
                setTagsText(e.target.value);
                form.setValue("technologies", parseCommaList(e.target.value) as any, { shouldDirty: true });
              }}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div>
              <Label>Cover URL</Label>
              <Input
                type="url"
                {...form.register("thumbnail_url", { setValueAs: (v) => v || null })}
              />
            </div>
            <div>
              <Label>Live URL</Label>
              <Input type="url" {...form.register("live_demo_url", { setValueAs: (v) => v || null })} />
            </div>
            <div>
              <Label>Repo URL</Label>
              <Input type="url" {...form.register("github_url", { setValueAs: (v) => v || null })} />
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
                {...form.register("sort_order", { valueAsNumber: true })}
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
          </CardHeader>
          <CardContent className="space-y-3">
            {v.thumbnail_url && (
              <img
                src={v.thumbnail_url}
                alt=""
                className="aspect-video w-full rounded-md object-cover"
                loading="lazy"
              />
            )}
            {v.description && (
              <p className="whitespace-pre-wrap text-sm text-foreground/90">{v.description}</p>
            )}
            {(v.technologies ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {(v.technologies ?? []).map((t: string) => (
                  <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                ))}
              </div>
            )}
            <div className="flex gap-3 text-xs text-muted-foreground">
              {v.live_demo_url && <a href={v.live_demo_url} target="_blank" rel="noreferrer" className="underline">Live</a>}
              {v.github_url && <a href={v.github_url} target="_blank" rel="noreferrer" className="underline">Repo</a>}
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
      isLoading={false}
    />
  );
}

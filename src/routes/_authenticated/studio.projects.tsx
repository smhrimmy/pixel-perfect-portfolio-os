import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Trash2, Image as ImageIcon, Link as LinkIcon, Sparkles, Settings as SettingsIcon, Plus } from "lucide-react";

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
  const [formTab, setFormTab] = useState<"content" | "gallery" | "seo" | "settings">("content");

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
        payload.id = crypto.randomUUID();
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
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 text-xs h-8"
            onClick={() => {
              if (confirm(`Delete "${selected.title}"?`)) deleteProject(selected.id);
            }}
          >
            <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
          </Button>
        ) : null
      }
      renderForm={() => (
        <div className="space-y-4">
          {/* Segmented Form Tabs matching Reference Mockup */}
          <div className="flex rounded-xl border border-[#1E2630] bg-[#11161D] p-1 gap-1">
            <button
              type="button"
              onClick={() => setFormTab("content")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                formTab === "content"
                  ? "bg-[#00E6C3] text-black font-semibold shadow-sm"
                  : "text-[#9AA6B2] hover:text-white"
              }`}
            >
              Content
            </button>
            <button
              type="button"
              onClick={() => setFormTab("gallery")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                formTab === "gallery"
                  ? "bg-[#00E6C3] text-black font-semibold shadow-sm"
                  : "text-[#9AA6B2] hover:text-white"
              }`}
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => setFormTab("seo")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                formTab === "seo"
                  ? "bg-[#00E6C3] text-black font-semibold shadow-sm"
                  : "text-[#9AA6B2] hover:text-white"
              }`}
            >
              SEO
            </button>
            <button
              type="button"
              onClick={() => setFormTab("settings")}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                formTab === "settings"
                  ? "bg-[#00E6C3] text-black font-semibold shadow-sm"
                  : "text-[#9AA6B2] hover:text-white"
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab 1: Content */}
          {formTab === "content" && (
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">Project Title</Label>
                <Input {...form.register("title")} placeholder="e.g. Portfolio OS" className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]" />
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">Description / Case Study</Label>
                <Textarea rows={6} {...form.register("description")} placeholder="Describe the engineering highlights, challenges, and architecture..." className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]" />
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">Technologies (comma-separated)</Label>
                <Input
                  value={tagsText}
                  onChange={(e) => {
                    setTagsText(e.target.value);
                    form.setValue("technologies", parseCommaList(e.target.value) as any, { shouldDirty: true });
                  }}
                  placeholder="React, TypeScript, Tailwind CSS, Three.js"
                  className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]"
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {(form.watch("technologies") || []).map((t: string) => (
                    <Badge key={t} variant="outline" className="text-[10px] border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3]">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Gallery & Media */}
          {formTab === "gallery" && (
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">Hero Media / Thumbnail URL</Label>
                <Input
                  type="url"
                  {...form.register("thumbnail_url", { setValueAs: (v) => v || null })}
                  placeholder="https://images.unsplash.com/..."
                  className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]"
                />
              </div>

              {form.watch("thumbnail_url") ? (
                <div className="rounded-2xl border border-[#1E2630] overflow-hidden bg-black/40">
                  <img src={form.watch("thumbnail_url")} alt="Preview" className="w-full aspect-video object-cover" />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#1E2630] p-8 text-center text-xs text-[#9AA6B2]">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-40 text-[#00E6C3]" />
                  No hero media configured. Paste a URL above.
                </div>
              )}
            </div>
          )}

          {/* Tab 3: SEO */}
          {formTab === "seo" && (
            <div className="space-y-4">
              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">URL Slug</Label>
                <Input {...form.register("slug")} placeholder="autonomous-orchestration-engine" className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]" />
              </div>
              <div className="rounded-xl border border-[#1E2630] bg-[#11161D] p-3 text-xs text-[#9AA6B2] space-y-1">
                <div className="text-[#00E6C3] font-mono text-[11px]">https://yoursite.dev/projects/{form.watch("slug") || "slug"}</div>
                <div className="font-semibold text-white">{form.watch("title") || "Untitled Project"}</div>
                <div className="line-clamp-2">{form.watch("description") || "Project description on search engines..."}</div>
              </div>
            </div>
          )}

          {/* Tab 4: Settings & Links */}
          {formTab === "settings" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label className="text-xs text-[#9AA6B2]">Live Demo URL</Label>
                  <Input type="url" {...form.register("live_demo_url", { setValueAs: (v) => v || null })} placeholder="https://..." className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]" />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-[#9AA6B2]">GitHub Repository URL</Label>
                  <Input type="url" {...form.register("github_url", { setValueAs: (v) => v || null })} placeholder="https://github.com/..." className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="grid gap-1.5">
                  <Label className="text-xs text-[#9AA6B2]">Status</Label>
                  <Select
                    value={form.watch("status")}
                    onValueChange={(v: "draft" | "published" | "archived") =>
                      form.setValue("status", v, { shouldDirty: true })
                    }
                  >
                    <SelectTrigger className="bg-[#11161D] border-[#1E2630]"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-[#11161D] border-[#1E2630]">
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xs text-[#9AA6B2]">Sort Order</Label>
                  <Input
                    type="number"
                    {...form.register("sort_order", { valueAsNumber: true })}
                    className="bg-[#11161D] border-[#1E2630] text-[#E6F1FF]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-[#1E2630] bg-[#11161D]">
                <div>
                  <div className="text-xs font-semibold text-[#E6F1FF]">Featured Project</div>
                  <div className="text-[11px] text-[#9AA6B2]">Display on homepage hero and top bento blocks</div>
                </div>
                <Switch
                  id="featured"
                  checked={form.watch("featured")}
                  onCheckedChange={(v) => form.setValue("featured", v, { shouldDirty: true })}
                />
              </div>
            </div>
          )}
        </div>
      )}
      renderPreview={(v) => (
        <Card className="border-[#1E2630] bg-[#11161D]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-[#E6F1FF]">{v.title || "Untitled project"}</CardTitle>
              {v.featured && <Badge variant="secondary" className="border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] text-[10px]">Featured</Badge>}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {v.thumbnail_url && (
              <img
                src={v.thumbnail_url}
                alt=""
                className="aspect-video w-full rounded-xl object-cover border border-[#1E2630]"
                loading="lazy"
              />
            )}
            {v.description && (
              <p className="whitespace-pre-wrap text-xs text-[#9AA6B2] leading-relaxed">{v.description}</p>
            )}
            {(v.technologies ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {(v.technologies ?? []).map((t: string) => (
                  <Badge key={t} variant="outline" className="text-[10px] border-[#1E2630] bg-[#0B0F14] text-[#E6F1FF]">{t}</Badge>
                ))}
              </div>
            )}
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
      createLabel="New Project"
      editor={editor}
    />
  );
}

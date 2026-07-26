import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Trash2, Plus, UploadCloud, Copy, Search, Image as ImageIcon, Film, FileText, Link2,
  Folder, FolderPlus, Tag, Sparkles, RefreshCw, X, CheckSquare, Square,
} from "lucide-react";
import type { z } from "zod";

import { qk } from "@/providers/query.provider";
import { listMedia, createMedia, updateMedia, deleteMedia } from "@/actions";
import { mediaCreateSchema } from "@/features/media/schemas/media.schema";
import type { MediaVariant } from "@/features/media/schemas/media.schema";
import type { MediaAssetDto } from "@/features/media/dto/media.dto";
import { supabase } from "@/integrations/supabase/client";
import {
  DEFAULT_VARIANT_SPECS,
  generateOptimizedVariants,
  generateThumbnailBlob,
  fetchAsBlob,
} from "@/lib/media-optimize";

import { EditorShell } from "@/components/studio/editor-shell";
import { EmptyState } from "@/components/studio/empty-state";
import { parseCommaList } from "@/components/studio/form-utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/studio/media")({ component: MediaPage });

type FormValues = z.input<typeof mediaCreateSchema>;
type KindFilter = "all" | "image" | "video" | "file" | "embed";
const UNFILED = "__unfiled__";

const BUCKET = "media-assets";
const SIGNED_URL_TTL = 60 * 60 * 24 * 365; // 1 year

const defaults = (): FormValues => ({
  url: "",
  alt: "",
  kind: "image",
  width: null,
  height: null,
  tags: [],
  thumbnailUrl: null,
  sizeBytes: null,
  storagePath: null,
  mimeType: null,
  folder: null,
  variants: [],
});

function kindFromMime(mime: string): FormValues["kind"] {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "file";
}

function formatBytes(bytes: number | null | undefined): string {
  if (!bytes && bytes !== 0) return "—";
  const u = ["B", "KB", "MB", "GB"];
  let i = 0;
  let n = bytes;
  while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
  return `${n.toFixed(n >= 10 || i === 0 ? 0 : 1)} ${u[i]}`;
}

async function readVideoMetaAndThumb(file: File): Promise<{ width: number; height: number; thumbBlob: Blob | null } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.src = url;
    video.onloadedmetadata = () => {
      const w = video.videoWidth, h = video.videoHeight;
      video.currentTime = Math.min(1, (video.duration || 2) / 2);
      video.onseeked = () => {
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) { URL.revokeObjectURL(url); resolve({ width: w, height: h, thumbBlob: null }); return; }
        ctx.drawImage(video, 0, 0, w, h);
        canvas.toBlob((b) => { URL.revokeObjectURL(url); resolve({ width: w, height: h, thumbBlob: b }); }, "image/jpeg", 0.8);
      };
    };
    video.onerror = () => { resolve(null); URL.revokeObjectURL(url); };
  });
}

async function signedUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_URL_TTL);
  if (error || !data) throw error ?? new Error("Could not sign URL");
  return data.signedUrl;
}

async function uploadBlob(path: string, blob: Blob, contentType: string): Promise<string> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, blob, { contentType, upsert: true });
  if (error) throw error;
  return await signedUrl(path);
}

async function processImageForUpload(file: File, baseId: string): Promise<{
  width: number | null; height: number | null;
  thumbnailUrl: string | null;
  variants: MediaVariant[];
}> {
  const out: MediaVariant[] = [];
  const { variants, origWidth, origHeight } = await generateOptimizedVariants(file);
  for (const v of variants) {
    const ext = v.spec.format === "image/webp" ? "webp" : "jpg";
    const path = `${baseId}.${v.spec.label}.${ext}`;
    const url = await uploadBlob(path, v.blob, v.spec.format);
    out.push({
      label: v.spec.label,
      url,
      storagePath: path,
      width: v.width,
      height: v.height,
      sizeBytes: v.blob.size,
      mimeType: v.spec.format,
    });
  }
  // pick smallest variant as thumbnail
  const thumb = out.slice().sort((a, b) => (a.width ?? 0) - (b.width ?? 0))[0];
  return {
    width: origWidth,
    height: origHeight,
    thumbnailUrl: thumb?.url ?? null,
    variants: out,
  };
}

function MediaPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listMedia);
  const createFn = useServerFn(createMedia);
  const updateFn = useServerFn(updateMedia);
  const deleteFn = useServerFn(deleteMedia);

  const { data, isLoading } = useQuery({ queryKey: qk.media.all, queryFn: () => listFn() });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState("");
  const [search, setSearch] = useState("");
  const [kindFilter, setKindFilter] = useState<KindFilter>("all");
  const [folderFilter, setFolderFilter] = useState<string | null>(null); // null = all
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [uploads, setUploads] = useState<Array<{ id: string; name: string; progress: number; status: string; error?: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const allItems = data ?? [];

  const folders = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of allItems) {
      const k = m.folder ?? UNFILED;
      map.set(k, (map.get(k) ?? 0) + 1);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [allItems]);

  const tags = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of allItems) for (const t of m.tags ?? []) map.set(t, (map.get(t) ?? 0) + 1);
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, [allItems]);

  const items = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allItems.filter((m) => {
      if (kindFilter !== "all" && m.kind !== kindFilter) return false;
      if (folderFilter !== null) {
        const f = m.folder ?? UNFILED;
        if (f !== folderFilter) return false;
      }
      if (activeTag && !(m.tags ?? []).includes(activeTag)) return false;
      if (!q) return true;
      return [m.alt, m.url, m.folder ?? "", ...(m.tags ?? [])].join(" ").toLowerCase().includes(q);
    });
  }, [allItems, search, kindFilter, folderFilter, activeTag]);

  const selected = useMemo(() => allItems.find((m) => m.id === selectedId) ?? null, [allItems, selectedId]);
  const isNew = selectedId === "__new__";
  const selectedList = useMemo(() => allItems.filter((m) => checked.has(m.id)), [allItems, checked]);
  const allVisibleChecked = items.length > 0 && items.every((m) => checked.has(m.id));

  const form = useForm<FormValues>({
    resolver: zodResolver(mediaCreateSchema),
    defaultValues: defaults(),
    mode: "onChange",
  });

  useEffect(() => {
    if (isNew) { form.reset(defaults()); setTagsText(""); }
    else if (selected) {
      form.reset({
        url: selected.url,
        alt: selected.alt,
        kind: selected.kind,
        width: selected.width,
        height: selected.height,
        tags: selected.tags,
        thumbnailUrl: selected.thumbnailUrl,
        sizeBytes: selected.sizeBytes,
        storagePath: selected.storagePath,
        mimeType: selected.mimeType,
        folder: selected.folder,
        variants: selected.variants,
      });
      setTagsText((selected.tags ?? []).join(", "));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const save = async (values: FormValues) => {
    if (isNew) {
      const created = await createFn({ data: values });
      setSelectedId(created.id);
    } else if (selected) {
      await updateFn({ data: { id: selected.id, ...values } });
    }
    await qc.invalidateQueries({ queryKey: qk.media.all });
  };

  const invalidate = () => qc.invalidateQueries({ queryKey: qk.media.all });

  const deleteMut = useMutation({
    mutationFn: async (m: NonNullable<typeof selected>) => {
      const paths: string[] = [];
      if (m.storagePath) paths.push(m.storagePath);
      for (const v of m.variants ?? []) if (v.storagePath) paths.push(v.storagePath);
      if (paths.length) await supabase.storage.from(BUCKET).remove(paths).catch(() => undefined);
      return deleteFn({ data: m.id });
    },
    onSuccess: async () => {
      toast.success("Deleted");
      setSelectedId(null);
      await invalidate();
    },
  });

  const uploadFiles = useCallback(async (files: File[]) => {
    for (const file of files) {
      const uid = crypto.randomUUID();
      setUploads((u) => [...u, { id: uid, name: file.name, progress: 5, status: "Uploading" }]);
      try {
        const safeName = file.name.replace(/[^\w.\-]+/g, "_");
        const path = `${uid}-${safeName}`;
        const kind = kindFromMime(file.type);

        setUploads((u) => u.map((x) => x.id === uid ? { ...x, progress: 15 } : x));
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
          contentType: file.type || "application/octet-stream", upsert: false,
        });
        if (upErr) throw upErr;
        const url = await signedUrl(path);

        let width: number | null = null;
        let height: number | null = null;
        let thumbnailUrl: string | null = null;
        let variants: MediaVariant[] = [];

        if (kind === "image") {
          setUploads((u) => u.map((x) => x.id === uid ? { ...x, progress: 45, status: "Optimizing" } : x));
          const proc = await processImageForUpload(file, uid);
          width = proc.width; height = proc.height;
          thumbnailUrl = proc.thumbnailUrl ?? url;
          variants = proc.variants;
        } else if (kind === "video") {
          setUploads((u) => u.map((x) => x.id === uid ? { ...x, progress: 55, status: "Thumbnail" } : x));
          const meta = await readVideoMetaAndThumb(file);
          if (meta) {
            width = meta.width; height = meta.height;
            if (meta.thumbBlob) {
              const thumbPath = `${path}.thumb.jpg`;
              thumbnailUrl = await uploadBlob(thumbPath, meta.thumbBlob, "image/jpeg");
            }
          }
        }

        setUploads((u) => u.map((x) => x.id === uid ? { ...x, progress: 88, status: "Saving" } : x));
        const created = await createFn({
          data: {
            url, alt: file.name.replace(/\.[^.]+$/, ""), kind,
            width, height, tags: [],
            thumbnailUrl, sizeBytes: file.size, storagePath: path,
            mimeType: file.type || null,
            folder: folderFilter && folderFilter !== UNFILED ? folderFilter : null,
            variants,
          },
        });

        setUploads((u) => u.map((x) => x.id === uid ? { ...x, progress: 100, status: "Done" } : x));
        setTimeout(() => setUploads((u) => u.filter((x) => x.id !== uid)), 800);
        toast.success(`Uploaded ${file.name}`);
        await invalidate();
        setSelectedId(created.id);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Upload failed";
        setUploads((u) => u.map((x) => x.id === uid ? { ...x, error: msg, progress: 100, status: "Failed" } : x));
        toast.error(`${file.name}: ${msg}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createFn, folderFilter]);

  const onFilePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) void uploadFiles(files);
    e.target.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files ?? []);
    if (files.length) void uploadFiles(files);
  };

  const copyUrl = (u: string) => { navigator.clipboard.writeText(u).then(() => toast.success("URL copied")); };

  const toggleCheck = (id: string) => {
    setChecked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };
  const checkAllVisible = () => {
    setChecked((s) => {
      const n = new Set(s);
      if (allVisibleChecked) items.forEach((m) => n.delete(m.id));
      else items.forEach((m) => n.add(m.id));
      return n;
    });
  };
  const clearChecked = () => setChecked(new Set());

  // ---------- Bulk actions ----------

  async function regenerateVariantsFor(m: MediaAssetDto): Promise<MediaAssetDto | null> {
    if (m.kind !== "image" || !m.url) return null;
    // remove old variant objects from storage
    const oldPaths = (m.variants ?? []).map((v) => v.storagePath).filter(Boolean) as string[];
    if (oldPaths.length) await supabase.storage.from(BUCKET).remove(oldPaths).catch(() => undefined);
    const blob = await fetchAsBlob(m.url);
    const proc = await processImageForUpload(new File([blob], `${m.id}.bin`, { type: blob.type }), m.id);
    return (await updateFn({
      data: {
        id: m.id,
        width: proc.width ?? m.width,
        height: proc.height ?? m.height,
        thumbnailUrl: proc.thumbnailUrl ?? m.thumbnailUrl,
        variants: proc.variants,
      },
    })) as MediaAssetDto;
  }

  async function regenerateThumbnailFor(m: MediaAssetDto): Promise<void> {
    if (!m.url) return;
    if (m.kind === "image") {
      const blob = await fetchAsBlob(m.url);
      const thumb = await generateThumbnailBlob(blob);
      if (!thumb) return;
      const path = `${m.id}.thumb.webp`;
      const url = await uploadBlob(path, thumb.blob, "image/webp");
      await updateFn({ data: { id: m.id, thumbnailUrl: url } });
    }
  }

  const bulkOptimize = async () => {
    if (!selectedList.length) return;
    setBusy("Optimizing…");
    let ok = 0, fail = 0;
    for (const m of selectedList) {
      try { if (await regenerateVariantsFor(m)) ok++; else fail++; }
      catch { fail++; }
    }
    setBusy(null);
    await invalidate();
    toast.success(`Optimized ${ok} · skipped/failed ${fail}`);
  };

  const bulkRegenThumbs = async () => {
    if (!selectedList.length) return;
    setBusy("Regenerating thumbnails…");
    let ok = 0;
    for (const m of selectedList) { try { await regenerateThumbnailFor(m); ok++; } catch { /* noop */ } }
    setBusy(null);
    await invalidate();
    toast.success(`Regenerated ${ok} thumbnails`);
  };

  const bulkCopyUrls = () => {
    if (!selectedList.length) return;
    const text = selectedList.map((m) => m.url).join("\n");
    navigator.clipboard.writeText(text).then(() => toast.success(`Copied ${selectedList.length} URLs`));
  };

  const bulkDelete = async () => {
    if (!selectedList.length) return;
    if (!confirm(`Delete ${selectedList.length} asset(s)? This cannot be undone.`)) return;
    setBusy("Deleting…");
    const paths: string[] = [];
    for (const m of selectedList) {
      if (m.storagePath) paths.push(m.storagePath);
      for (const v of m.variants ?? []) if (v.storagePath) paths.push(v.storagePath);
    }
    if (paths.length) await supabase.storage.from(BUCKET).remove(paths).catch(() => undefined);
    for (const m of selectedList) { try { await deleteFn({ data: m.id }); } catch { /* noop */ } }
    setBusy(null);
    clearChecked();
    await invalidate();
    toast.success("Deleted");
  };

  const bulkMoveToFolder = async () => {
    if (!selectedList.length) return;
    const folder = prompt("Move to folder (leave empty for Unfiled):", selectedList[0].folder ?? "")?.trim();
    if (folder === undefined) return;
    setBusy("Moving…");
    for (const m of selectedList) {
      try { await updateFn({ data: { id: m.id, folder: folder || null } }); } catch { /* noop */ }
    }
    setBusy(null);
    await invalidate();
    toast.success(`Moved ${selectedList.length} asset(s)`);
  };

  const bulkAddTag = async () => {
    if (!selectedList.length) return;
    const t = prompt("Add tag to selected assets:")?.trim();
    if (!t) return;
    setBusy("Tagging…");
    for (const m of selectedList) {
      const next = Array.from(new Set([...(m.tags ?? []), t]));
      try { await updateFn({ data: { id: m.id, tags: next } }); } catch { /* noop */ }
    }
    setBusy(null);
    await invalidate();
    toast.success(`Tagged with "${t}"`);
  };

  const createFolder = () => {
    const name = prompt("New folder name:")?.trim();
    if (!name) return;
    setFolderFilter(name);
    toast.info(`Uploads will go into "${name}"`);
  };

  return (
    <div
      className="relative flex h-full min-h-0"
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      {dragOver && (
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
          <div className="rounded-lg border-2 border-dashed border-primary bg-background/90 px-8 py-6 text-center">
            <UploadCloud className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-2 text-sm font-medium">Drop files to upload</p>
          </div>
        </div>
      )}

      {/* Folders sidebar */}
      <aside className="flex w-52 flex-col border-r bg-muted/30">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Folders</h3>
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={createFolder} title="New folder">
            <FolderPlus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <ul className="space-y-0.5 p-2">
            <li>
              <button
                onClick={() => setFolderFilter(null)}
                className={cn(
                  "flex w-full items-center justify-between rounded px-2 py-1 text-xs hover:bg-accent",
                  folderFilter === null && "bg-accent font-medium",
                )}
              >
                <span className="flex items-center gap-2"><Folder className="h-3.5 w-3.5" /> All assets</span>
                <span className="text-muted-foreground">{allItems.length}</span>
              </button>
            </li>
            {folders.map(([name, count]) => (
              <li key={name}>
                <button
                  onClick={() => setFolderFilter(name)}
                  className={cn(
                    "flex w-full items-center justify-between rounded px-2 py-1 text-xs hover:bg-accent",
                    folderFilter === name && "bg-accent font-medium",
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Folder className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{name === UNFILED ? "Unfiled" : name}</span>
                  </span>
                  <span className="text-muted-foreground">{count}</span>
                </button>
              </li>
            ))}
          </ul>
          {tags.length > 0 && (
            <div className="border-t p-2">
              <div className="mb-1 flex items-center gap-1 px-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                <Tag className="h-3 w-3" /> Tags
              </div>
              <div className="flex flex-wrap gap-1">
                {tags.map(([t, count]) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag((cur) => (cur === t ? null : t))}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] transition",
                      activeTag === t ? "border-primary bg-primary/10 text-primary" : "hover:bg-accent",
                    )}
                  >
                    {t} <span className="text-muted-foreground">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </aside>

      {/* Gallery */}
      <aside className="flex w-96 flex-col border-r bg-muted/20">
        <div className="border-b p-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold uppercase tracking-wide">
                {folderFilter === null ? "All media" : folderFilter === UNFILED ? "Unfiled" : folderFilter}
              </h2>
              {activeTag && (
                <p className="text-[10px] text-muted-foreground">
                  filtered by <span className="text-primary">#{activeTag}</span>
                </p>
              )}
            </div>
            <div className="flex gap-1">
              <input ref={fileInputRef} type="file" multiple hidden onChange={onFilePick} />
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="mr-1 h-4 w-4" /> Upload
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedId("__new__")}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="h-8 pl-7 text-xs" />
          </div>
          <Tabs value={kindFilter} onValueChange={(v) => setKindFilter(v as KindFilter)}>
            <TabsList className="grid h-8 w-full grid-cols-5">
              <TabsTrigger value="all" className="text-[10px]">All</TabsTrigger>
              <TabsTrigger value="image" className="text-[10px]">Image</TabsTrigger>
              <TabsTrigger value="video" className="text-[10px]">Video</TabsTrigger>
              <TabsTrigger value="file" className="text-[10px]">File</TabsTrigger>
              <TabsTrigger value="embed" className="text-[10px]">Embed</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-foreground" onClick={checkAllVisible}>
              {allVisibleChecked ? <CheckSquare className="h-3 w-3" /> : <Square className="h-3 w-3" />}
              {allVisibleChecked ? "Unselect all" : "Select all"}
            </button>
            <span>{items.length} shown · {allItems.length} total</span>
          </div>
        </div>

        {/* Bulk actions bar */}
        {checked.size > 0 && (
          <div className="flex items-center justify-between gap-2 border-b bg-primary/5 px-3 py-2">
            <div className="flex items-center gap-2 text-xs">
              <Badge variant="default">{checked.size} selected</Badge>
              {busy && <span className="text-muted-foreground">{busy}</span>}
            </div>
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline" disabled={!!busy}>
                    <Sparkles className="mr-1 h-3.5 w-3.5" /> Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Optimization</DropdownMenuLabel>
                  <DropdownMenuItem onClick={bulkOptimize}>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate optimized variants
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={bulkRegenThumbs}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Regenerate thumbnails
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Organize</DropdownMenuLabel>
                  <DropdownMenuItem onClick={bulkMoveToFolder}>
                    <Folder className="mr-2 h-4 w-4" /> Move to folder…
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={bulkAddTag}>
                    <Tag className="mr-2 h-4 w-4" /> Add tag…
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={bulkCopyUrls}>
                    <Copy className="mr-2 h-4 w-4" /> Copy CDN URLs
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={bulkDelete} className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={clearChecked} title="Clear selection">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {uploads.length > 0 && (
          <div className="space-y-1 border-b bg-muted/40 p-2">
            {uploads.map((u) => (
              <div key={u.id} className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span className="truncate">{u.name}</span>
                  <span>{u.error ? "Failed" : `${u.status} · ${u.progress}%`}</span>
                </div>
                <Progress value={u.progress} className={cn("h-1", u.error && "bg-destructive/30")} />
              </div>
            ))}
          </div>
        )}

        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="p-6 text-xs text-muted-foreground">Loading…</div>
          ) : items.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title={allItems.length ? "No matches" : "No media yet"}
                description={allItems.length ? "Try a different filter." : "Drop files anywhere, or click Upload."}
              />
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-2 p-3">
              {items.map((m) => {
                const isChecked = checked.has(m.id);
                return (
                  <li key={m.id}>
                    <div
                      className={cn(
                        "group relative overflow-hidden rounded-md border bg-background transition hover:border-primary/50",
                        selectedId === m.id && "border-primary ring-1 ring-primary/40",
                        isChecked && "border-primary ring-1 ring-primary",
                      )}
                    >
                      <div
                        className={cn(
                          "absolute left-1.5 top-1.5 z-10 rounded bg-background/90 p-0.5 shadow-sm transition",
                          !isChecked && "opacity-0 group-hover:opacity-100",
                        )}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox checked={isChecked} onCheckedChange={() => toggleCheck(m.id)} />
                      </div>
                      <button onClick={() => setSelectedId(m.id)} className="block w-full text-left">
                        <div className="relative aspect-square w-full bg-muted">
                          {(m.kind === "image" || m.thumbnailUrl) ? (
                            <img src={m.thumbnailUrl ?? m.url} alt={m.alt} className="h-full w-full object-cover" loading="lazy" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              {m.kind === "video" ? <Film className="h-6 w-6" /> : m.kind === "embed" ? <Link2 className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                            </div>
                          )}
                          <span className="absolute right-1 top-1 rounded bg-black/60 px-1 text-[9px] uppercase text-white">
                            {m.kind}
                          </span>
                          {(m.variants?.length ?? 0) > 0 && (
                            <span className="absolute bottom-1 left-1 rounded bg-primary/80 px-1 text-[9px] text-primary-foreground">
                              {m.variants!.length}×
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-1 p-1.5">
                          <span className="truncate text-[10px]">{m.alt || m.url}</span>
                          <span className="shrink-0 text-[9px] text-muted-foreground">{formatBytes(m.sizeBytes)}</span>
                        </div>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>
      </aside>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        {!selectedId ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex h-full cursor-pointer flex-col items-center justify-center gap-3 border-2 border-dashed border-transparent p-8 text-center hover:border-primary/30"
          >
            <UploadCloud className="h-10 w-10 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Drop files anywhere</p>
              <p className="text-xs text-muted-foreground">Images are auto-optimized into WebP variants. Videos get a poster thumbnail.</p>
            </div>
          </div>
        ) : (
          <EditorShell<FormValues>
            title={form.watch("alt") || form.watch("url") || (isNew ? "New asset" : "Untitled")}
            subtitle={`${form.watch("kind")}${selected?.sizeBytes ? ` · ${formatBytes(selected.sizeBytes)}` : ""}${selected?.folder ? ` · ${selected.folder}` : ""}`}
            form={form}
            onSave={save}
            actionsSlot={
              !isNew && selected ? (
                <div className="flex gap-1">
                  {selected.kind === "image" && (
                    <Button size="sm" variant="ghost" disabled={!!busy} onClick={async () => {
                      setBusy("Optimizing…");
                      try { await regenerateVariantsFor(selected); toast.success("Variants regenerated"); }
                      catch (e) { toast.error((e as Error).message); }
                      setBusy(null);
                      await invalidate();
                    }}>
                      <Sparkles className="mr-1 h-4 w-4" /> Optimize
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={() => copyUrl(selected.url)}>
                    <Copy className="mr-1 h-4 w-4" /> Copy URL
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => confirm("Delete asset?") && deleteMut.mutate(selected)}>
                    <Trash2 className="mr-1 h-4 w-4" /> Delete
                  </Button>
                </div>
              ) : null
            }
            renderForm={() => (
              <div className="space-y-4">
                <F label="URL" err={form.formState.errors.url?.message}>
                  <div className="flex gap-2">
                    <Input type="url" {...form.register("url")} />
                    {form.watch("url") && (
                      <Button type="button" size="icon" variant="outline" onClick={() => copyUrl(form.watch("url"))}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </F>
                <F label="Alt text"><Input {...form.register("alt")} /></F>
                <div className="grid grid-cols-3 gap-4">
                  <F label="Kind">
                    <Select value={form.watch("kind")} onValueChange={(v) => form.setValue("kind", v as FormValues["kind"], { shouldDirty: true })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(["image", "video", "embed", "file"] as const).map((k) => <SelectItem key={k} value={k}>{k}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </F>
                  <F label="Width">
                    <Input type="number" {...form.register("width", { setValueAs: (v) => (v === "" || v == null ? null : Number(v)) })} />
                  </F>
                  <F label="Height">
                    <Input type="number" {...form.register("height", { setValueAs: (v) => (v === "" || v == null ? null : Number(v)) })} />
                  </F>
                </div>
                <F label="Folder">
                  <Input
                    placeholder="Leave empty for Unfiled"
                    value={form.watch("folder") ?? ""}
                    onChange={(e) => form.setValue("folder", e.target.value.trim() || null, { shouldDirty: true })}
                  />
                </F>
                <F label="Tags (comma-separated)">
                  <Input
                    value={tagsText}
                    onChange={(e) => {
                      setTagsText(e.target.value);
                      form.setValue("tags", parseCommaList(e.target.value), { shouldDirty: true });
                    }}
                  />
                </F>

                {(selected?.variants?.length ?? 0) > 0 && (
                  <div>
                    <Label className="text-xs uppercase tracking-wide text-muted-foreground">Optimized variants</Label>
                    <div className="mt-2 divide-y rounded-md border">
                      {selected!.variants.map((v) => (
                        <div key={v.label} className="flex items-center justify-between gap-2 p-2 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <Badge variant="outline" className="uppercase">{v.label}</Badge>
                            <span className="text-muted-foreground">{v.width}×{v.height}</span>
                            <span className="text-muted-foreground">{v.mimeType?.replace("image/", "")}</span>
                            <span className="text-muted-foreground">{formatBytes(v.sizeBytes)}</span>
                          </div>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyUrl(v.url)}>
                            <Copy className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selected?.storagePath && (
                  <div className="rounded-md border bg-muted/30 p-3 text-xs text-muted-foreground">
                    <div className="flex justify-between"><span>Storage path</span><code>{selected.storagePath}</code></div>
                    <div className="flex justify-between"><span>MIME</span><code>{selected.mimeType ?? "—"}</code></div>
                    <div className="flex justify-between"><span>Size</span><code>{formatBytes(selected.sizeBytes)}</code></div>
                  </div>
                )}
              </div>
            )}
            renderPreview={(v) => (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">{v.alt || "Untitled asset"}</CardTitle>
                  <Badge variant="outline" className="text-[10px] uppercase">{v.kind}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  {v.kind === "image" && v.url ? (
                    <img src={v.url} alt={v.alt} className="w-full rounded-md border object-contain" />
                  ) : v.kind === "video" && v.url ? (
                    <video src={v.url} poster={v.thumbnailUrl ?? undefined} controls className="w-full rounded-md border" />
                  ) : (
                    <div className="flex items-center gap-2 rounded-md border bg-muted/30 p-3 text-xs">
                      {v.kind === "embed" ? <Link2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                      <code className="break-all">{v.url || "—"}</code>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1"><ImageIcon className="h-3 w-3" />{v.width && v.height ? `${v.width}×${v.height}` : "no dimensions"}</div>
                    <div>{formatBytes(v.sizeBytes)}</div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {v.folder && <Badge variant="secondary" className="text-[10px]"><Folder className="mr-1 h-3 w-3" />{v.folder}</Badge>}
                    {(v.tags ?? []).map((t: string) => <Badge key={t} variant="outline" className="text-[10px]">#{t}</Badge>)}
                  </div>
                  {v.url && (
                    <Button type="button" size="sm" variant="outline" className="w-full" onClick={() => copyUrl(v.url)}>
                      <Copy className="mr-2 h-4 w-4" /> Copy CDN URL
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          />
        )}
      </div>
    </div>
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

// silence unused-import warnings for exported constant (kept for potential extension)
void DEFAULT_VARIANT_SPECS;

import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { useUniversalStore } from "@/store/useUniversalStore";
import { EntityWorkbench } from "@/components/studio/entity-workbench";
import { EditorShell } from "@/components/studio/editor-shell";
import { parseCommaList, parseLineList } from "@/components/studio/form-utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/studio/experience")({ component: ExperiencePage });

const defaults = () => ({
  id: "",
  company: "",
  position: "",
  type: "full-time",
  location: "",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: null,
  description: "",
  highlights: [],
  tech: [],
  sort_order: 0,
});

function ExperiencePage() {
  const { experience, setExperience, saveToSupabase } = useUniversalStore();
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightsText, setHighlightsText] = useState("");
  const [techText, setTechText] = useState("");
  
  const selected = useMemo(() => experience?.find((e) => e.id === selectedId) ?? null, [experience, selectedId]);
  const isNew = selectedId === "__new__";

  const form = useForm({
    defaultValues: defaults(),
    mode: "onChange",
  });

  useEffect(() => {
    if (isNew) {
      form.reset(defaults());
      setHighlightsText("");
      setTechText("");
    } else if (selected) {
      form.reset({
        id: selected.id,
        company: selected.company,
        position: selected.position,
        type: selected.type || "full-time",
        location: selected.location || "",
        start_date: selected.start_date || "",
        end_date: selected.end_date || null,
        description: selected.description || "",
        highlights: selected.highlights || [],
        tech: selected.tech || [],
        sort_order: selected.sort_order || 0,
      });
      setHighlightsText(Array.isArray(selected.highlights) ? selected.highlights.join("\n") : "");
      setTechText(Array.isArray(selected.tech) ? selected.tech.join(", ") : "");
    }
  }, [selectedId, selected, isNew, form]);

  const save = async (values: any) => {
    try {
      let newExp = [...(experience || [])];
      
      if (isNew) {
        values.id = uuidv4();
        newExp.push(values);
        setSelectedId(values.id);
      } else {
        newExp = newExp.map(e => e.id === values.id ? { ...e, ...values } : e);
      }
      
      setExperience(newExp as any);
      await saveToSupabase();
      toast.success(isNew ? "Experience created" : "Experience updated");
    } catch (error) {
      toast.error("Failed to save experience");
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const newExp = (experience || []).filter(e => e.id !== id);
      setExperience(newExp as any);
      await saveToSupabase();
      setSelectedId(null);
      toast.success("Deleted");
    } catch (error) {
      toast.error("Failed to delete experience");
    }
  };

  const items = (experience ?? []).map((e) => ({
    id: e.id,
    label: `${e.position || "Role"} · ${e.company || "Company"}`,
    meta: `${e.start_date?.slice(0, 7)} → ${e.end_date ? e.end_date.slice(0, 7) : "present"}`,
  }));

  const editor = selectedId ? (
    <EditorShell
      title={form.watch("position") || (isNew ? "New role" : "Untitled")}
      subtitle={form.watch("company") || undefined}
      form={form}
      onSave={save}
      actionsSlot={
        !isNew && selected ? (
          <Button size="sm" variant="ghost" onClick={() => confirm(`Delete "${selected.position} @ ${selected.company}"?`) && deleteExperience(selected.id)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        ) : null
      }
      renderForm={() => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <F label="Company"><Input {...form.register("company")} /></F>
            <F label="Role"><Input {...form.register("position")} /></F>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <F label="Type">
              <Select value={form.watch("type")} onValueChange={(v) => form.setValue("type", v, { shouldDirty: true })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["full-time", "part-time", "contract", "freelance", "internship"] as const).map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </F>
            <F label="Location"><Input {...form.register("location")} /></F>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <F label="Start date">
              <Input type="date" {...form.register("start_date")} />
            </F>
            <F label="End date (empty = present)">
              <Input
                type="date"
                value={form.watch("end_date") ?? ""}
                onChange={(e) => form.setValue("end_date", e.target.value || null, { shouldDirty: true })}
              />
            </F>
          </div>
          <F label="Summary/Description"><Textarea rows={3} {...form.register("description")} /></F>
          <F label="Highlights (one per line)">
            <Textarea
              rows={5}
              value={highlightsText}
              onChange={(e) => {
                setHighlightsText(e.target.value);
                form.setValue("highlights", parseLineList(e.target.value) as any, { shouldDirty: true });
              }}
            />
          </F>
          <F label="Tech (comma-separated)">
            <Input
              value={techText}
              onChange={(e) => {
                setTechText(e.target.value);
                form.setValue("tech", parseCommaList(e.target.value) as any, { shouldDirty: true });
              }}
            />
          </F>
          <F label="Order"><Input type="number" {...form.register("sort_order", { valueAsNumber: true })} /></F>
        </div>
      )}
      renderPreview={(v) => (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{v.position || "Role"} <span className="text-muted-foreground">@ {v.company || "Company"}</span></CardTitle>
            <p className="text-xs text-muted-foreground">
              {v.start_date?.slice(0, 7)} → {v.end_date ? v.end_date.slice(0, 7) : "present"}
              {v.location && ` · ${v.location}`} · {v.type}
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {v.description && <p className="whitespace-pre-wrap text-foreground/90">{v.description}</p>}
            {(v.highlights ?? []).length > 0 && (
              <ul className="list-disc space-y-1 pl-5 text-foreground/90">
                {(v.highlights ?? []).map((h: string, i: number) => <li key={i}>{h}</li>)}
              </ul>
            )}
            {(v.tech ?? []).length > 0 && (
              <div className="flex flex-wrap gap-1">
                {(v.tech ?? []).map((t: string) => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    />
  ) : null;

  return (
    <EntityWorkbench
      title="Experience"
      items={items}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onCreate={() => setSelectedId("__new__")}
      createLabel="New role"
      editor={editor}
      isLoading={false}
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

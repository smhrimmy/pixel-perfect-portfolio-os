import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useUniversalStore } from "@/store/useUniversalStore";
import { EntityWorkbench } from "@/components/studio/entity-workbench";
import { EditorShell } from "@/components/studio/editor-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/studio/skills")({ component: SkillsPage });

const defaults = () => ({
  id: "",
  name: "",
  category: "General",
  level: 50,
  icon: "",
  sort_order: 0,
});

function SkillsPage() {
  const { skills, setSkills, saveToSupabase } = useUniversalStore();
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => skills?.find((s) => s.id === selectedId) ?? null, [skills, selectedId]);
  const isNew = selectedId === "__new__";

  const form = useForm({
    defaultValues: defaults(),
    mode: "onChange",
  });

  useEffect(() => {
    if (isNew) form.reset(defaults());
    else if (selected) form.reset({
      id: selected.id,
      name: selected.name,
      category: selected.category,
      level: selected.level,
      icon: selected.icon || "",
      sort_order: selected.sort_order,
    });
  }, [selectedId, selected, isNew, form]);

  const save = async (values: any) => {
    try {
      let newSkills = [...(skills || [])];
      
      if (isNew) {
        values.id = crypto.randomUUID();
        newSkills.push(values);
        setSelectedId(values.id);
      } else {
        newSkills = newSkills.map(s => s.id === values.id ? { ...s, ...values } : s);
      }
      
      setSkills(newSkills as any);
      await saveToSupabase();
      toast.success(isNew ? "Skill created" : "Skill updated");
    } catch (error) {
      toast.error("Failed to save skill");
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      const newSkills = (skills || []).filter(s => s.id !== id);
      setSkills(newSkills as any);
      await saveToSupabase();
      setSelectedId(null);
      toast.success("Deleted");
    } catch (error) {
      toast.error("Failed to delete skill");
    }
  };

  const items = (skills ?? []).map((s) => ({
    id: s.id,
    label: s.name || "Untitled",
    meta: s.category,
  }));

  const editor = selectedId ? (
    <EditorShell
      title={form.watch("name") || (isNew ? "New skill" : "Untitled")}
      subtitle={form.watch("category") || undefined}
      form={form}
      onSave={save}
      actionsSlot={
        !isNew && selected ? (
          <Button size="sm" variant="ghost" onClick={() => confirm(`Delete "${selected.name}"?`) && deleteSkill(selected.id)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        ) : null
      }
      renderForm={() => (
        <div className="space-y-4">
          <Field label="Name">
            <Input {...form.register("name")} />
          </Field>
          <Field label="Category">
            <Input {...form.register("category")} placeholder="e.g. Frontend, Backend" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Proficiency Level (0-100)">
              <Input type="number" {...form.register("level", { valueAsNumber: true })} />
            </Field>
            <Field label="Sort Order">
              <Input type="number" {...form.register("sort_order", { valueAsNumber: true })} />
            </Field>
          </div>
          <Field label="Icon (e.g. Lucide string or URL)">
            <Input {...form.register("icon", { setValueAs: (v) => v || null })} />
          </Field>
        </div>
      )}
      renderPreview={(v) => (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {v.name || "Untitled skill"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {v.category && <Badge variant="outline">{v.category}</Badge>}
            <Badge variant="secondary">Level: {v.level ?? 0}</Badge>
          </CardContent>
        </Card>
      )}
    />
  ) : null;

  return (
    <EntityWorkbench
      title="Skills"
      items={items}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onCreate={() => setSelectedId("__new__")}
      createLabel="New skill"
      editor={editor}
      isLoading={false}
    />
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

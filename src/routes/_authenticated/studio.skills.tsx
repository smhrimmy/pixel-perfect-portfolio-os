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
import { listSkills, createSkill, updateSkill, deleteSkill } from "@/actions";
import { skillCreateSchema } from "@/features/skills/schemas/skill.schema";

import { EntityWorkbench } from "@/components/studio/entity-workbench";
import { EditorShell } from "@/components/studio/editor-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/studio/skills")({ component: SkillsPage });

type FormValues = z.input<typeof skillCreateSchema>;

const defaults = (): FormValues => ({
  name: "",
  category: "",
  level: "intermediate",
  years: 0,
  iconUrl: null,
  order: 0,
});

function SkillsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listSkills);
  const createFn = useServerFn(createSkill);
  const updateFn = useServerFn(updateSkill);
  const deleteFn = useServerFn(deleteSkill);

  const { data, isLoading } = useQuery({ queryKey: qk.skills.all, queryFn: () => listFn() });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = useMemo(() => data?.find((s) => s.id === selectedId) ?? null, [data, selectedId]);
  const isNew = selectedId === "__new__";

  const form = useForm<FormValues>({
    resolver: zodResolver(skillCreateSchema),
    defaultValues: defaults(),
    mode: "onChange",
  });

  useEffect(() => {
    if (isNew) form.reset(defaults());
    else if (selected) form.reset({
      name: selected.name,
      category: selected.category,
      level: selected.level,
      years: selected.years,
      iconUrl: selected.iconUrl,
      order: selected.order,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const save = async (values: FormValues) => {
    if (isNew) {
      const created = await createFn({ data: values });
      setSelectedId(created.id);
    } else if (selected) {
      await updateFn({ data: { id: selected.id, ...values } });
    }
    await qc.invalidateQueries({ queryKey: qk.skills.all });
  };

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: id }),
    onSuccess: async () => {
      toast.success("Deleted");
      setSelectedId(null);
      await qc.invalidateQueries({ queryKey: qk.skills.all });
    },
  });

  const items = (data ?? []).map((s) => ({
    id: s.id,
    label: s.name,
    meta: `${s.category} · ${s.level}`,
  }));

  const editor = selectedId ? (
    <EditorShell<FormValues>
      title={form.watch("name") || (isNew ? "New skill" : "Untitled")}
      subtitle={form.watch("category") || undefined}
      form={form}
      onSave={save}
      actionsSlot={
        !isNew && selected ? (
          <Button size="sm" variant="ghost" onClick={() => confirm(`Delete "${selected.name}"?`) && deleteMut.mutate(selected.id)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        ) : null
      }
      renderForm={() => (
        <div className="space-y-4">
          <Field label="Name" error={form.formState.errors.name?.message}>
            <Input {...form.register("name")} />
          </Field>
          <Field label="Category" error={form.formState.errors.category?.message}>
            <Input {...form.register("category")} placeholder="e.g. Frontend, DevOps" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Level">
              <Select value={form.watch("level")} onValueChange={(v) => form.setValue("level", v as FormValues["level"], { shouldDirty: true })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(["beginner", "intermediate", "advanced", "expert"] as const).map((l) => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Years">
              <Input type="number" step="0.5" {...form.register("years", { valueAsNumber: true })} />
            </Field>
          </div>
          <Field label="Icon URL" error={form.formState.errors.iconUrl?.message}>
            <Input type="url" {...form.register("iconUrl", { setValueAs: (v) => v || null })} />
          </Field>
          <Field label="Order">
            <Input type="number" {...form.register("order", { valueAsNumber: true })} />
          </Field>
        </div>
      )}
      renderPreview={(v) => (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              {v.iconUrl && <img src={v.iconUrl} alt="" className="h-6 w-6 rounded" />}
              {v.name || "Untitled skill"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {v.category && <Badge variant="outline">{v.category}</Badge>}
            {v.level && <Badge variant="secondary">{v.level}</Badge>}
            <Badge variant="outline">{v.years ?? 0} yrs</Badge>
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
      isLoading={isLoading}
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

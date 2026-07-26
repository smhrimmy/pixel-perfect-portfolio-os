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
import { listExperience, createExperience, updateExperience, deleteExperience } from "@/actions";
import { experienceCreateSchema } from "@/features/experience/schemas/experience.schema";

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

type FormValues = z.input<typeof experienceCreateSchema>;

const defaults = (): FormValues => ({
  company: "",
  role: "",
  type: "full-time",
  location: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: null,
  summary: "",
  highlights: [],
  tech: [],
  order: 0,
});

function ExperiencePage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listExperience);
  const createFn = useServerFn(createExperience);
  const updateFn = useServerFn(updateExperience);
  const deleteFn = useServerFn(deleteExperience);

  const { data, isLoading } = useQuery({ queryKey: qk.experience.all, queryFn: () => listFn() });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [highlightsText, setHighlightsText] = useState("");
  const [techText, setTechText] = useState("");
  const selected = useMemo(() => data?.find((e) => e.id === selectedId) ?? null, [data, selectedId]);
  const isNew = selectedId === "__new__";

  const form = useForm<FormValues>({
    resolver: zodResolver(experienceCreateSchema),
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
        company: selected.company,
        role: selected.role,
        type: selected.type,
        location: selected.location,
        startDate: selected.startDate.slice(0, 10),
        endDate: selected.endDate ? selected.endDate.slice(0, 10) : null,
        summary: selected.summary,
        highlights: selected.highlights,
        tech: selected.tech,
        order: selected.order,
      });
      setHighlightsText(selected.highlights.join("\n"));
      setTechText(selected.tech.join(", "));
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
    await qc.invalidateQueries({ queryKey: qk.experience.all });
  };

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: id }),
    onSuccess: async () => {
      toast.success("Deleted");
      setSelectedId(null);
      await qc.invalidateQueries({ queryKey: qk.experience.all });
    },
  });

  const items = (data ?? []).map((e) => ({
    id: e.id,
    label: `${e.role || "Role"} · ${e.company || "Company"}`,
    meta: `${e.startDate?.slice(0, 7)} → ${e.endDate ? e.endDate.slice(0, 7) : "present"}`,
  }));

  const editor = selectedId ? (
    <EditorShell<FormValues>
      title={form.watch("role") || (isNew ? "New role" : "Untitled")}
      subtitle={form.watch("company") || undefined}
      form={form}
      onSave={save}
      actionsSlot={
        !isNew && selected ? (
          <Button size="sm" variant="ghost" onClick={() => confirm(`Delete "${selected.role} @ ${selected.company}"?`) && deleteMut.mutate(selected.id)}>
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        ) : null
      }
      renderForm={() => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <F label="Company" err={form.formState.errors.company?.message}><Input {...form.register("company")} /></F>
            <F label="Role" err={form.formState.errors.role?.message}><Input {...form.register("role")} /></F>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <F label="Type">
              <Select value={form.watch("type")} onValueChange={(v) => form.setValue("type", v as FormValues["type"], { shouldDirty: true })}>
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
            <F label="Start date" err={form.formState.errors.startDate?.message}>
              <Input type="date" {...form.register("startDate")} />
            </F>
            <F label="End date (empty = present)">
              <Input
                type="date"
                value={form.watch("endDate") ?? ""}
                onChange={(e) => form.setValue("endDate", e.target.value || null, { shouldDirty: true })}
              />
            </F>
          </div>
          <F label="Summary"><Textarea rows={3} {...form.register("summary")} /></F>
          <F label="Highlights (one per line)">
            <Textarea
              rows={5}
              value={highlightsText}
              onChange={(e) => {
                setHighlightsText(e.target.value);
                form.setValue("highlights", parseLineList(e.target.value), { shouldDirty: true });
              }}
            />
          </F>
          <F label="Tech (comma-separated)">
            <Input
              value={techText}
              onChange={(e) => {
                setTechText(e.target.value);
                form.setValue("tech", parseCommaList(e.target.value), { shouldDirty: true });
              }}
            />
          </F>
          <F label="Order"><Input type="number" {...form.register("order", { valueAsNumber: true })} /></F>
        </div>
      )}
      renderPreview={(v) => (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{v.role || "Role"} <span className="text-muted-foreground">@ {v.company || "Company"}</span></CardTitle>
            <p className="text-xs text-muted-foreground">
              {v.startDate?.slice(0, 7)} → {v.endDate ? v.endDate.slice(0, 7) : "present"}
              {v.location && ` · ${v.location}`} · {v.type}
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {v.summary && <p className="whitespace-pre-wrap text-foreground/90">{v.summary}</p>}
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

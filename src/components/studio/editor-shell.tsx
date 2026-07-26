/**
 * EditorShell — resizable split of a React Hook Form editor and a preview
 * panel. Handles save/publish, autosave feedback, dirty guard, view modes,
 * and keyboard shortcuts. Feature editors are thin wrappers that pass in
 * their form, save/publish callbacks, and preview renderer.
 */
import { useMemo, useState, type ReactNode } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Save, Rocket, SplitSquareHorizontal, Eye, PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { useAutosave, type AutosaveStatus } from "./use-autosave";
import { useDirtyGuard } from "./use-dirty-guard";
import { useStudioShortcuts } from "./use-studio-shortcuts";

export type EditorViewMode = "split" | "preview" | "editor";

export interface EditorShellProps<
  TValues extends FieldValues,
  TCtx = unknown,
  TOut extends FieldValues = TValues,
> {
  title: string;
  subtitle?: string;
  form: UseFormReturn<TValues, TCtx, TOut>;
  onSave: (values: TOut) => Promise<void>;
  onPublish?: (values: TOut) => Promise<void>;
  renderForm: () => ReactNode;
  renderPreview: (values: TValues) => ReactNode;
  autosaveEnabled?: boolean;
  autosaveDelayMs?: number;
  isPublished?: boolean;
  actionsSlot?: ReactNode;
}

function StatusPill({ status, lastSavedAt }: { status: AutosaveStatus; lastSavedAt: string | null }) {
  const label = {
    idle: lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : "No changes",
    saving: "Saving…",
    saved: `Saved ${lastSavedAt ? new Date(lastSavedAt).toLocaleTimeString() : ""}`,
    error: "Save failed",
  }[status];
  const variant = status === "error" ? "destructive" : status === "saving" ? "secondary" : "outline";
  return <Badge variant={variant as "outline" | "secondary" | "destructive"}>{label}</Badge>;
}

export function EditorShell<
  TValues extends FieldValues,
  TCtx = unknown,
  TOut extends FieldValues = TValues,
>({
  title,
  subtitle,
  form,
  onSave,
  onPublish,
  renderForm,
  renderPreview,
  autosaveEnabled = true,
  autosaveDelayMs = 2000,
  isPublished,
  actionsSlot,
}: EditorShellProps<TValues, TCtx, TOut>) {
  const [mode, setMode] = useState<EditorViewMode>("split");
  const [autosaveOn, setAutosaveOn] = useState(autosaveEnabled);
  const values = form.watch();
  const { isDirty, isValid } = form.formState;

  useDirtyGuard(isDirty);

  const autosave = useAutosave<TValues>({
    values: values as TValues,
    isDirty,
    isValid,
    enabled: autosaveOn,
    delayMs: autosaveDelayMs,
    save: async (v) => {
      await onSave(v as unknown as TOut);
      form.reset(v, { keepValues: true, keepDirty: false });
    },
  });

  const cycleMode = () => {
    setMode((m) => (m === "split" ? "preview" : m === "preview" ? "editor" : "split"));
  };

  const handleSave = form.handleSubmit(async (v) => {
    try {
      await onSave(v);
      form.reset(v as unknown as TValues, { keepValues: true, keepDirty: false });
      toast.success("Saved");
    } catch (e) {
      toast.error(`Save failed: ${(e as Error).message}`);
    }
  });

  const handlePublish = onPublish
    ? form.handleSubmit(async (v) => {
        try {
          await onPublish(v);
          form.reset(v as unknown as TValues, { keepValues: true, keepDirty: false });
          toast.success("Published");
        } catch (e) {
          toast.error(`Publish failed: ${(e as Error).message}`);
        }
      })
    : undefined;

  useStudioShortcuts(
    useMemo(
      () => ({
        onSave: () => void handleSave(),
        onPublish: handlePublish ? () => void handlePublish() : undefined,
        onToggleView: cycleMode,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [handleSave, handlePublish],
    ),
  );

  const showEditor = mode !== "preview";
  const showPreview = mode !== "editor";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold">{title}</h1>
          {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusPill status={autosave.status} lastSavedAt={autosave.lastSavedAt} />
          {isPublished !== undefined && (
            <Badge variant={isPublished ? "default" : "secondary"}>
              {isPublished ? "Published" : "Draft"}
            </Badge>
          )}
          <div className="flex items-center gap-1 rounded-md border p-0.5">
            <Button
              size="sm"
              variant={mode === "editor" ? "secondary" : "ghost"}
              onClick={() => setMode("editor")}
              title="Editor only"
            >
              <PencilLine className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={mode === "split" ? "secondary" : "ghost"}
              onClick={() => setMode("split")}
              title="Split view (⌘/)"
            >
              <SplitSquareHorizontal className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={mode === "preview" ? "secondary" : "ghost"}
              onClick={() => setMode("preview")}
              title="Preview only"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="autosave" checked={autosaveOn} onCheckedChange={setAutosaveOn} />
            <Label htmlFor="autosave" className="text-xs">
              Autosave
            </Label>
          </div>
          {actionsSlot}
          <Button size="sm" variant="outline" onClick={() => void handleSave()} disabled={!isDirty}>
            <Save className="mr-1 h-4 w-4" /> Save
          </Button>
          {handlePublish && (
            <Button size="sm" onClick={() => void handlePublish()}>
              <Rocket className="mr-1 h-4 w-4" /> Publish
            </Button>
          )}
        </div>
      </header>

      <div className="flex-1 min-h-0">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {showEditor && (
            <ResizablePanel defaultSize={showPreview ? 55 : 100} minSize={30}>
              <ScrollArea className="h-full">
                <form className="p-4" onSubmit={(e) => e.preventDefault()}>
                  {renderForm()}
                </form>
              </ScrollArea>
            </ResizablePanel>
          )}
          {showEditor && showPreview && <ResizableHandle withHandle className="hidden md:flex" />}
          {showPreview && (
            <ResizablePanel defaultSize={showEditor ? 45 : 100} minSize={20} className={showEditor ? "hidden md:block" : ""}>
              <ScrollArea className="h-full bg-muted/20">
                <div className="p-4">{renderPreview(values as TValues)}</div>
              </ScrollArea>
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

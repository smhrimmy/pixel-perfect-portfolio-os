/**
 * EditorShell — responsive split or stacked editor with tab navigation,
 * autosave indicators, and 44px+ mobile touch targets.
 */
import { useState, type ReactNode } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Save, Rocket, Eye, PencilLine, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAutosave, type AutosaveStatus } from "./use-autosave";
import { useDirtyGuard } from "./use-dirty-guard";

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
    idle: lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Synced",
    saving: "Saving…",
    saved: "Saved",
    error: "Save failed",
  }[status];
  return (
    <Badge variant="outline" className="text-[10px] font-mono border-[#1E2630] bg-[#11161D] text-[#00E6C3]">
      <Check className="h-2.5 w-2.5 mr-1 inline" /> {label}
    </Badge>
  );
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
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");
  const values = form.watch();
  const { isDirty, isValid } = form.formState;

  useDirtyGuard(isDirty);

  const autosave = useAutosave<TValues>({
    values: values as TValues,
    isDirty,
    enabled: autosaveEnabled,
    delayMs: autosaveDelayMs,
    onSave: async (v) => {
      await onSave(v as unknown as TOut);
    },
  });

  const handleManualSave = form.handleSubmit(async (data) => {
    try {
      await onSave(data);
      toast.success("Changes saved");
    } catch {
      toast.error("Save failed");
    }
  });

  const handleManualPublish = onPublish
    ? form.handleSubmit(async (data) => {
        try {
          await onPublish(data);
          toast.success("Published to live website");
        } catch {
          toast.error("Publish failed");
        }
      })
    : undefined;

  return (
    <div className="flex h-full flex-col bg-[#0B0F14]">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2630] bg-[#11161D]/90 p-3.5 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold font-display text-[#E6F1FF]">{title}</h2>
            <StatusPill status={autosave.status} lastSavedAt={autosave.lastSavedAt} />
          </div>
          {subtitle && <p className="text-[11px] text-[#9AA6B2] mt-0.5">{subtitle}</p>}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Edit/Preview Toggle */}
          <div className="flex rounded-lg border border-[#1E2630] bg-[#0B0F14] p-0.5 md:hidden">
            <button
              type="button"
              onClick={() => setMobileTab("edit")}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                mobileTab === "edit" ? "bg-[#11161D] text-[#00E6C3]" : "text-[#9AA6B2]"
              }`}
            >
              <PencilLine className="h-3 w-3 inline mr-1" /> Edit
            </button>
            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                mobileTab === "preview" ? "bg-[#11161D] text-[#00E6C3]" : "text-[#9AA6B2]"
              }`}
            >
              <Eye className="h-3 w-3 inline mr-1" /> Preview
            </button>
          </div>

          {actionsSlot}

          <Button
            size="sm"
            onClick={handleManualSave}
            className="bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-semibold text-xs h-8 px-3"
          >
            <Save className="mr-1 h-3.5 w-3.5" /> Save
          </Button>

          {handleManualPublish && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleManualPublish}
              className="border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] hover:bg-[#00E6C3]/20 text-xs h-8 px-3"
            >
              <Rocket className="mr-1 h-3.5 w-3.5" /> Publish
            </Button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {/* On Mobile: Switch between Form and Preview */}
        <div className="md:hidden">
          {mobileTab === "edit" ? (
            <div className="max-w-2xl mx-auto space-y-6">{renderForm()}</div>
          ) : (
            <div className="max-w-2xl mx-auto rounded-2xl border border-[#1E2630] bg-[#11161D] p-4">
              {renderPreview(values as TValues)}
            </div>
          )}
        </div>

        {/* On Desktop: Side-by-Side or Stacked Form */}
        <div className="hidden md:grid md:grid-cols-1 xl:grid-cols-2 gap-6 max-w-6xl mx-auto w-full min-w-0">
          <div className="space-y-6">{renderForm()}</div>
          <div className="sticky top-4 h-fit rounded-2xl border border-[#1E2630] bg-[#11161D] p-4">
            <div className="text-xs font-mono text-[#9AA6B2] uppercase tracking-wider mb-3">Live Preview</div>
            {renderPreview(values as TValues)}
          </div>
        </div>
      </div>
    </div>
  );
}

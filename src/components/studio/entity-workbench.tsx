/**
 * EntityWorkbench — responsive list-pane + editor-pane scaffold.
 * On desktop (>= md), renders side-by-side split.
 * On mobile (< md), provides drill-down navigation (List View -> Back -> Editor View).
 */
import { type ReactNode, useState } from "react";
import { Plus, ArrowLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils";

export interface EntityListItem {
  id: string;
  label: string;
  meta?: string;
  status?: string;
}

export interface EntityWorkbenchProps {
  title: string;
  items: EntityListItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onCreate: () => void;
  createLabel?: string;
  editor: ReactNode | null;
  isLoading?: boolean;
}

function statusVariant(status?: string): "outline" | "secondary" | "default" {
  if (status === "published") return "default";
  return "secondary";
}

export function EntityWorkbench({
  title,
  items,
  selectedId,
  onSelect,
  onCreate,
  createLabel = "New",
  editor,
  isLoading,
}: EntityWorkbenchProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredItems = items.filter((it) => {
    const matchesQuery = !filterQuery.trim() || 
      it.label.toLowerCase().includes(filterQuery.toLowerCase()) || 
      (it.meta && it.meta.toLowerCase().includes(filterQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === "all" || 
      (filterStatus === "published" && it.status === "published") ||
      (filterStatus === "draft" && it.status !== "published");

    return matchesQuery && matchesStatus;
  });

  const isEditingOnMobile = Boolean(selectedId);

  return (
    <div className="flex h-full w-full flex-col md:flex-row overflow-hidden bg-[#0B0F14]">
      {/* Mobile Top Header when editing */}
      {isEditingOnMobile && (
        <div className="flex items-center justify-between border-b border-[#1E2630] bg-[#11161D] px-4 py-2.5 md:hidden">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSelect(null)}
            className="text-xs text-[#9AA6B2] hover:text-white -ml-2"
          >
            <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back to {title}
          </Button>
          <Badge variant="outline" className="text-[10px] font-mono border-white/10">
            Editing
          </Badge>
        </div>
      )}

      {/* List View Panel (Hidden on mobile if editing) */}
      <div
        className={cn(
          "flex h-full w-full md:w-80 md:min-w-[280px] md:max-w-sm flex-col border-r border-[#1E2630] bg-[#0B0F14]",
          isEditingOnMobile ? "hidden md:flex" : "flex"
        )}
      >
        {/* Header with Search & Filter */}
        <div className="p-3 border-b border-[#1E2630] space-y-2 bg-[#11161D]/50">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-display text-[#E6F1FF]">{title}</h2>
            <Button
              size="sm"
              onClick={onCreate}
              className="bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-semibold text-xs h-8"
            >
              <Plus className="mr-1 h-3.5 w-3.5" /> {createLabel}
            </Button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 pt-1">
            {["all", "published", "draft"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all",
                  filterStatus === st
                    ? "bg-[#00E6C3]/10 text-[#00E6C3] border border-[#00E6C3]/40"
                    : "text-[#9AA6B2] hover:bg-white/5 border border-transparent"
                )}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative pt-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9AA6B2]" />
            <Input
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="pl-8 h-8 text-xs bg-[#0B0F14] border-[#1E2630] text-[#E6F1FF] rounded-lg"
            />
          </div>
        </div>

        {/* Scrollable Item List */}
        <ScrollArea className="flex-1">
          {isLoading ? (
            <div className="p-4 text-xs text-[#9AA6B2]">Loading…</div>
          ) : filteredItems.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#9AA6B2]">
              No items matching filter. Click <strong>{createLabel}</strong> to add one.
            </div>
          ) : (
            <div className="p-2 space-y-1.5">
              {filteredItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => onSelect(it.id)}
                  className={cn(
                    "flex w-full flex-col items-start gap-1 rounded-xl p-3 text-left transition-all border border-transparent",
                    selectedId === it.id
                      ? "bg-[#11161D] border-[#00E6C3]/40 shadow-sm"
                      : "hover:bg-[#11161D]/60 hover:border-[#1E2630]"
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-[#E6F1FF]">{it.label}</span>
                    {it.status && (
                      <Badge
                        variant={statusVariant(it.status)}
                        className={cn(
                          "text-[9px] font-mono",
                          it.status === "published"
                            ? "border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3]"
                            : "border-white/10 bg-white/5 text-[#9AA6B2]"
                        )}
                      >
                        {it.status}
                      </Badge>
                    )}
                  </div>
                  {it.meta && (
                    <span className="truncate text-xs text-[#9AA6B2]">{it.meta}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Editor Panel (Hidden on mobile if not editing) */}
      <div
        className={cn(
          "flex-1 overflow-y-auto bg-[#0B0F14]",
          !isEditingOnMobile ? "hidden md:block" : "block"
        )}
      >
        {selectedId ? (
          editor
        ) : (
          <EmptyState
            title={`Select a ${title.slice(0, -1) || "item"}`}
            description="Choose an existing item from the list or create a new one to edit."
            action={{ label: createLabel, onClick: onCreate }}
          />
        )}
      </div>
    </div>
  );
}

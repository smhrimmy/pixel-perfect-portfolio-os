/**
 * EntityWorkbench — list-pane + editor-pane scaffold used by every CRUD
 * screen in the studio. The editor slot is a fully rendered EditorShell.
 */
import { type ReactNode } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const ListView = (
    <div className="flex h-full flex-col border-r">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <h2 className="text-sm font-medium">{title}</h2>
        <Button size="sm" variant="outline" onClick={onCreate}>
          <Plus className="mr-1 h-4 w-4" /> {createLabel}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {isLoading ? (
          <div className="p-3 text-xs text-muted-foreground">Loading…</div>
        ) : items.length === 0 ? (
          <div className="p-3 text-xs text-muted-foreground">Nothing yet. Click {createLabel} to start.</div>
        ) : (
          <ul className="p-1">
            {items.map((it) => (
              <li key={it.id}>
                <button
                  onClick={() => onSelect(it.id)}
                  className={cn(
                    "flex w-full flex-col items-start gap-1 rounded-md px-3 py-2 text-left hover:bg-muted",
                    selectedId === it.id && "bg-muted",
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{it.label}</span>
                    {it.status && (
                      <Badge variant={statusVariant(it.status)} className="text-[10px]">
                        {it.status}
                      </Badge>
                    )}
                  </div>
                  {it.meta && (
                    <span className="truncate text-xs text-muted-foreground">{it.meta}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );

  return (
    <>
      <div className="flex h-full flex-col md:hidden">
        {selectedId ? (
          <div className="flex h-full flex-col">
            <div className="border-b px-2 py-1.5 bg-muted/10">
              <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={() => onSelect(null)}>
                ← Back to list
              </Button>
            </div>
            <div className="flex-1 min-h-0">
              {editor ?? (
                <EmptyState
                  title="Select or create an item"
                  description="Choose an entry on the left to edit, or start a new one."
                />
              )}
            </div>
          </div>
        ) : (
          ListView
        )}
      </div>

      <div className="hidden h-full md:flex">
        <div className="w-[300px] lg:w-[350px] xl:w-[400px] flex-shrink-0 border-r">
          {ListView}
        </div>
        <div className="flex-1 min-w-0">
          {editor ?? (
            <EmptyState
              title="Select or create an item"
              description="Choose an entry on the left to edit, or start a new one."
            />
          )}
        </div>
      </div>
    </>
  );
}

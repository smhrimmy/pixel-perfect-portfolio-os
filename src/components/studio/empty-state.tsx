import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export type EmptyStateAction =
  | ReactNode
  | { label: string; onClick?: () => void };

function isActionObject(action: any): action is { label: string; onClick?: () => void } {
  return (
    action !== null &&
    typeof action === "object" &&
    "label" in action &&
    !("$$typeof" in action) &&
    !("type" in action)
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: EmptyStateAction;
}) {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && <p className="max-w-md text-xs text-muted-foreground">{description}</p>}
      {action && (
        isActionObject(action) ? (
          <Button
            size="sm"
            variant="outline"
            onClick={action.onClick}
            className="mt-2 text-xs border-[#1E2630] bg-[#11161D] text-[#E6F1FF] hover:bg-[#1E2630]"
          >
            {action.label}
          </Button>
        ) : (
          action
        )
      )}
    </div>
  );
}


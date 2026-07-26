/**
 * useStudioShortcuts — global keyboard shortcuts inside the editor shell.
 *   Cmd/Ctrl + S       → save
 *   Cmd/Ctrl + Shift + P → publish
 *   Cmd/Ctrl + /       → cycle view mode (split / preview / editor)
 */
import { useEffect } from "react";

export interface ShortcutHandlers {
  onSave?: () => void;
  onPublish?: () => void;
  onToggleView?: () => void;
}

export function useStudioShortcuts(handlers: ShortcutHandlers): void {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      if (e.key.toLowerCase() === "s" && !e.shiftKey) {
        e.preventDefault();
        handlers.onSave?.();
      } else if (e.key.toLowerCase() === "p" && e.shiftKey) {
        e.preventDefault();
        handlers.onPublish?.();
      } else if (e.key === "/") {
        e.preventDefault();
        handlers.onToggleView?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlers]);
}

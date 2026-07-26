/**
 * useAutosave — debounces a save function based on RHF dirty state.
 * The caller supplies the current values and a save fn; when values
 * change and the form is dirty, we schedule a save after `delayMs`.
 */
import { useEffect, useRef, useState } from "react";

export type AutosaveStatus = "idle" | "saving" | "saved" | "error";

export interface UseAutosaveOptions<TValues> {
  values: TValues;
  isDirty: boolean;
  isValid: boolean;
  enabled: boolean;
  delayMs?: number;
  save: (values: TValues) => Promise<void>;
}

export interface UseAutosaveResult {
  status: AutosaveStatus;
  lastSavedAt: string | null;
  error: Error | null;
  flush: () => Promise<void>;
}

export function useAutosave<TValues>({
  values,
  isDirty,
  isValid,
  enabled,
  delayMs = 2000,
  save,
}: UseAutosaveOptions<TValues>): UseAutosaveResult {
  const [status, setStatus] = useState<AutosaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const runSave = async () => {
    try {
      setStatus("saving");
      await save(valuesRef.current);
      setStatus("saved");
      setError(null);
      setLastSavedAt(new Date().toISOString());
    } catch (e) {
      setStatus("error");
      setError(e as Error);
    }
  };

  useEffect(() => {
    if (!enabled || !isDirty || !isValid) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(runSave, delayMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, isDirty, isValid, enabled, delayMs]);

  return {
    status,
    lastSavedAt,
    error,
    flush: async () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      await runSave();
    },
  };
}

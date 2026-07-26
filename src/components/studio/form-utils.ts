/**
 * Small helpers reused by studio form editors.
 */
import { useMemo } from "react";

export function useCommaList(value: string[] | undefined) {
  return useMemo(() => (value ?? []).join(", "), [value]);
}

export function parseCommaList(input: string): string[] {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseLineList(input: string): string[] {
  return input
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

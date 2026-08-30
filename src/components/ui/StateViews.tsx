import { AlertTriangle, FolderOpen, RefreshCcw, SearchX } from "lucide-react";

export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="h-3 w-12 rounded bg-white/10" />
          </div>
          <div className="h-6 w-3/4 rounded bg-white/15" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-5/6 rounded bg-white/10" />
          </div>
          <div className="flex gap-2 pt-4">
            <div className="h-5 w-14 rounded bg-white/10" />
            <div className="h-5 w-16 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title = "No items found",
  description = "There are no records in this view currently.",
  actionLabel,
  onAction,
}: {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 px-6 text-center">
      <FolderOpen className="mx-auto h-10 w-10 text-white/30" />
      <h3 className="mt-4 text-lg font-bold font-display text-white">{title}</h3>
      <p className="mt-1 text-sm text-white/50 max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}

export function NoResultsState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-16 px-6 text-center">
      <SearchX className="mx-auto h-10 w-10 text-cyan-400/60" />
      <h3 className="mt-4 text-lg font-bold font-display text-white">No Matching Results</h3>
      <p className="mt-1 text-sm text-white/50 max-w-sm mx-auto">
        No records match your query and selected filters. Try broadening your keywords.
      </p>
      <button
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 px-5 py-2.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/25 hover:text-white transition-all shadow-sm"
      >
        <span>Reset Filters</span>
      </button>
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error?: string; onRetry?: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 py-12 px-6 text-center">
      <AlertTriangle className="mx-auto h-10 w-10 text-rose-400" />
      <h3 className="mt-4 text-lg font-bold font-display text-rose-200">Unable to Load Data</h3>
      <p className="mt-1 text-sm text-rose-300/70 max-w-sm mx-auto">
        {error || "An unexpected error occurred while fetching content."}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-500/20 border border-rose-500/40 px-5 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/30 transition-all"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>Retry Operation</span>
        </button>
      )}
    </div>
  );
}

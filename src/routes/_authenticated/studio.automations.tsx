import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Send,
  FolderSync,
  Bot,
  Sparkles,
  ArrowRight,
  HardDrive,
  FileText,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  ExternalLink,
  Shield,
  Layers,
  Settings,
  Plus,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  listAutomationJobsFn,
  listAutomationRunsFn,
  listContentDraftsFn,
  triggerAutomationRunFn,
  approveContentDraftFn,
  rejectContentDraftFn,
} from "@/lib/automation/automation-orchestrator";

export const Route = createFileRoute("/_authenticated/studio/automations")({
  component: AutomationsPage,
});

function AutomationsPage() {
  const qc = useQueryClient();
  const getJobs = useServerFn(listAutomationJobsFn);
  const getRuns = useServerFn(listAutomationRunsFn);
  const getDrafts = useServerFn(listContentDraftsFn);
  const triggerRun = useServerFn(triggerAutomationRunFn);
  const approveDraft = useServerFn(approveContentDraftFn);
  const rejectDraft = useServerFn(rejectContentDraftFn);

  const { data: jobs } = useQuery({ queryKey: ["automation", "jobs"], queryFn: () => getJobs() });
  const { data: runs } = useQuery({ queryKey: ["automation", "runs"], queryFn: () => getRuns() });
  const { data: drafts } = useQuery({ queryKey: ["automation", "drafts"], queryFn: () => getDrafts() });

  const [running, setRunning] = useState(false);

  const runMutation = useMutation({
    mutationFn: async () => {
      setRunning(true);
      return triggerRun({ data: "job-daily-blog" });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["automation"] });
      setRunning(false);
      toast.success("Autonomous Content Pipeline Executed. Draft dispatched to Telegram for approval!");
    },
    onError: (err: any) => {
      setRunning(false);
      toast.error(`Automation execution failed: ${err.message}`);
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (draftId: string) => approveDraft({ data: draftId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["automation"] });
      toast.success("Draft Approved & Published to Live Blog!");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ draftId, reason }: { draftId: string; reason?: string }) =>
      rejectDraft({ data: { draftId, reason } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["automation"] });
      toast.success("Draft Rejected and Archived.");
    },
  });

  const pendingDrafts = (drafts || []).filter((d) => d.status === "REVIEW");

  return (
    <div className="min-h-full space-y-8 pb-12 font-sans">
      {/* ==================================================== */}
      {/* 1. TOP HEADER & WORKFLOW BRANDING                   */}
      {/* ==================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2630]/60 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Content Automation Engine
            </h1>
            <Badge variant="outline" className="border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] font-mono text-[10px]">
              CRON + DRIVE + TELEGRAM
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-[#9AA6B2] mt-1 font-mono">
            RESEARCH → TOPIC SCORE → GENERATE → DRIVE ARCHIVE → TELEGRAM APPROVAL GATE → PUBLISH
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={() => runMutation.mutate()}
            disabled={running || runMutation.isPending}
            size="sm"
            className="bg-gradient-to-r from-[#00E6C3] to-teal-500 text-black hover:opacity-95 font-bold text-xs h-9 shadow-lg shadow-[#00E6C3]/20"
          >
            {running || runMutation.isPending ? (
              <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 mr-1.5" />
            )}
            Run Pipeline Now
          </Button>
        </div>
      </div>

      {/* ==================================================== */}
      {/* 2. ACTIVE AUTOMATIONS GRID                           */}
      {/* ==================================================== */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2] flex items-center justify-between">
          <span>Active Scheduled Automations</span>
          <span className="text-[#00E6C3]">Timezone: Asia/Kolkata (IST)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full min-w-0">
          {(jobs || []).map((job) => (
            <div key={job.id} className="p-4 rounded-2xl border border-[#1E2630] bg-[#11161D] flex flex-col justify-between space-y-3 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{job.name}</h3>
                  <p className="text-[11px] text-[#00E6C3] font-mono mt-0.5">{job.schedule}</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[9px]">ON</Badge>
              </div>

              <div className="space-y-1 text-[11px] text-[#9AA6B2] font-mono border-t border-[#1E2630] pt-2">
                <div className="flex justify-between">
                  <span>Next run:</span>
                  <span className="text-white font-medium">{job.nextRun}</span>
                </div>
                <div className="flex justify-between">
                  <span>Drafts generated:</span>
                  <span className="text-[#00E6C3] font-semibold">{job.draftCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==================================================== */}
      {/* 3. TELEGRAM APPROVAL HARD-GATE REVIEW QUEUE          */}
      {/* ==================================================== */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2]">
              Telegram Approval Queue (Hard-Gate)
            </span>
          </div>
          <Badge variant="outline" className="border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono text-xs">
            {pendingDrafts.length} Awaiting Approval
          </Badge>
        </div>

        {pendingDrafts.length === 0 ? (
          <div className="p-8 rounded-2xl border border-[#1E2630] bg-[#11161D] text-center space-y-2">
            <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
            <h4 className="text-sm font-bold text-white">All Clear — No Pending Approvals</h4>
            <p className="text-xs text-[#9AA6B2]">Click "Run Pipeline Now" to trigger autonomous research and draft generation.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingDrafts.map((draft) => (
              <div
                key={draft.id}
                className="p-6 rounded-3xl border border-[#1E2630] bg-gradient-to-br from-[#11161D] to-[#0B0F14] shadow-2xl space-y-5"
              >
                {/* Header & Score */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E2630] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00E6C3] uppercase tracking-wider">
                        {draft.category}
                      </span>
                      <span className="text-xs text-[#9AA6B2]">·</span>
                      <span className="text-xs text-[#9AA6B2]">{draft.estimatedReadTime} min read</span>
                    </div>
                    <h2 className="text-xl font-bold text-white mt-1">{draft.title}</h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono text-[#9AA6B2]">TOPIC SCORE</span>
                      <span className="text-2xl font-black text-[#00E6C3]">{draft.score}/100</span>
                    </div>
                  </div>
                </div>

                {/* Body & Selection Reason */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
                  <div className="lg:col-span-8 space-y-2">
                    <div className="text-[#9AA6B2]">
                      <strong className="text-white">Why Selected: </strong>
                      {draft.selectionReason}
                    </div>
                    <div className="p-3 rounded-xl bg-[#07090D] border border-[#1E2630] font-mono text-[11px] text-[#E6F1FF]">
                      <div className="text-cyan-400 font-bold mb-1">SEO Title: {draft.seo.title}</div>
                      <div className="text-[#9AA6B2]">{draft.seo.description}</div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 p-3 rounded-xl bg-[#07090D] border border-[#1E2630] space-y-2 font-mono text-[11px]">
                    <div className="text-white font-bold flex items-center gap-1.5">
                      <HardDrive className="h-3.5 w-3.5 text-[#00E6C3]" /> Google Drive Archive
                    </div>
                    <div className="text-[10px] text-[#9AA6B2] truncate">{draft.driveArchive?.folderPath}</div>
                    <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <Check className="h-3 w-3" /> article.md, html, seo, hero.svg archived
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Hard Gate Approval */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1E2630]">
                  <div className="text-[11px] text-[#9AA6B2] flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-amber-400" />
                    <span>Hard Gate Active: Content will not publish to public site until you click Approve.</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => rejectMutation.mutate({ draftId: draft.id })}
                      disabled={rejectMutation.isPending}
                      variant="outline"
                      size="sm"
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs h-8"
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Reject
                    </Button>

                    <Button asChild variant="outline" size="sm" className="border-[#1E2630] bg-[#07090D] text-xs h-8 text-[#00E6C3]">
                      <Link to="/studio/articles">
                        Edit in Studio
                      </Link>
                    </Button>

                    <Button
                      onClick={() => approveMutation.mutate(draft.id)}
                      disabled={approveMutation.isPending}
                      size="sm"
                      className="bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-bold text-xs h-8 shadow-md"
                    >
                      <Check className="h-3.5 w-3.5 mr-1" /> Approve &amp; Publish Live
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* 4. RECENT PIPELINE RUN HISTORY LOGS                  */}
      {/* ==================================================== */}
      <div className="space-y-3">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#9AA6B2]">
          Execution Run Logs &amp; Audit Trail
        </div>

        <div className="rounded-2xl border border-[#1E2630] bg-[#11161D] overflow-hidden shadow-xl">
          <div className="p-4 border-b border-[#1E2630] flex items-center justify-between text-xs font-mono text-[#9AA6B2]">
            <span>Execution Runs ({(runs || []).length})</span>
            <span>Status: Idempotent Execution Guaranteed</span>
          </div>

          <div className="divide-y divide-[#1E2630]">
            {(runs || []).map((run) => (
              <div key={run.id} className="p-4 space-y-2 hover:bg-white/[0.02] transition">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        run.status === "SUCCESS"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[10px]"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/40 text-[10px]"
                      }
                    >
                      {run.status}
                    </Badge>
                    <span className="font-bold text-white">{run.jobName}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#9AA6B2]">{new Date(run.startedAt).toLocaleString()}</span>
                </div>

                <div className="text-xs text-[#9AA6B2]">{run.outputSummary}</div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {run.steps.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/40 border border-white/5 text-[10px] font-mono text-[#E6F1FF]"
                    >
                      <Check className="h-2.5 w-2.5 text-[#00E6C3]" />
                      {s.step}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

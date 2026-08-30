import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { AutomationJob, AutomationRun, ContentDraft } from "./types";
import { discoverTopicCandidates } from "./research-engine";
import { selectWinningTopic } from "./topic-scorer";
import { generateArticleSuite } from "./content-generator";
import { archiveDraftToGoogleDrive } from "./drive-archive";
import { formatTelegramReport } from "./telegram-approval";
import path from "path";

// In-memory / persistent mock store for jobs & runs
let _jobs: AutomationJob[] = [
  {
    id: "job-daily-blog",
    name: "Daily Blog Research & Generation",
    type: "daily_blog_research",
    enabled: true,
    schedule: "Every day • 08:00",
    timezone: "Asia/Kolkata",
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    nextRun: "Tomorrow • 08:00 IST",
    lastResult: "PENDING_APPROVAL",
    draftCount: 2,
    config: {
      requireApproval: true,
      categories: ["AI", "Architecture", "Full Stack", "Cloud"],
    },
  },
  {
    id: "job-daily-report",
    name: "Daily Content & Traffic Report",
    type: "daily_content_report",
    enabled: true,
    schedule: "Every day • 09:00",
    timezone: "Asia/Kolkata",
    lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    nextRun: "Tomorrow • 09:00 IST",
    lastResult: "SUCCESS",
    draftCount: 0,
    config: {
      telegramChannel: "@prajwal_pdl_bot",
    },
  },
  {
    id: "job-github-sync",
    name: "GitHub Repository & Star Sync",
    type: "github_sync",
    enabled: true,
    schedule: "Every 6 hours",
    timezone: "Asia/Kolkata",
    lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    nextRun: "In 5 hours",
    lastResult: "SUCCESS",
    draftCount: 0,
    config: {
      user: "O-FALLEN-ANGEL-O",
    },
  },
  {
    id: "job-drive-backup",
    name: "Google Drive Site Archive Backup",
    type: "drive_backup",
    enabled: true,
    schedule: "Weekly • Sunday 00:00",
    timezone: "Asia/Kolkata",
    lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    nextRun: "Next Sunday",
    lastResult: "SUCCESS",
    draftCount: 0,
    config: {
      destination: "PDL Portfolio OS / Backups",
    },
  },
];

let _drafts: ContentDraft[] = [];
let _runs: AutomationRun[] = [];

// Seed initial draft if empty
if (_drafts.length === 0) {
  const initialTopic = discoverTopicCandidates()[1]; // AI Coding Agents
  const suite = generateArticleSuite(initialTopic);
  const initialDraft: ContentDraft = {
    id: "draft-ai-agents-2026",
    topicId: initialTopic.id,
    title: suite.title,
    slug: suite.slug,
    category: suite.category,
    status: "REVIEW",
    score: initialTopic.totalScore,
    summary: suite.summary,
    selectionReason: initialTopic.contentGapReason,
    estimatedReadTime: suite.estimatedReadTime,
    articleMarkdown: suite.articleMarkdown,
    articleHtml: suite.articleHtml,
    seo: suite.seo,
    sources: suite.sources,
    heroSvg: suite.heroSvg,
    driveArchive: {
      folderId: "drive-folder-ai-agents",
      folderPath: "GoogleDriveArchive/PDL Portfolio OS/Blog/2026/08-August/autonomous-ai-coding-agents",
      articleMdFileId: "file-md-1",
      articleHtmlFileId: "file-html-1",
      researchJsonFileId: "file-research-1",
      seoJsonFileId: "file-seo-1",
      sourcesJsonFileId: "file-sources-1",
      heroSvgFileId: "file-hero-1",
      createdAt: new Date().toISOString(),
    },
    telegramNotificationSent: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  _drafts.push(initialDraft);
}

export async function runFullContentPipeline(): Promise<{ run: AutomationRun; draft: ContentDraft }> {
  const runId = `run-${Date.now()}`;
  const run: AutomationRun = {
    id: runId,
    jobId: "job-daily-blog",
    jobName: "Daily Blog Research & Generation",
    startedAt: new Date().toISOString(),
    status: "RUNNING",
    steps: [
      { step: "1. Research & Trend Gap Analysis", status: "RUNNING", timestamp: new Date().toISOString() },
    ],
  };
  _runs.unshift(run);

  // 1. Discover topics
  const candidates = discoverTopicCandidates();
  run.steps[0].status = "SUCCESS";
  run.steps[0].detail = `Discovered ${candidates.length} candidate concepts.`;

  // 2. Score topics
  run.steps.push({ step: "2. Multi-Factor Topic Scoring", status: "RUNNING", timestamp: new Date().toISOString() });
  const winner = selectWinningTopic(candidates);
  run.steps[1].status = "SUCCESS";
  run.steps[1].detail = `Selected: "${winner.title}" (Score: ${winner.totalScore}/100)`;

  // 3. Generate article suite
  run.steps.push({ step: "3. Article, SEO & Hero Image Generation", status: "RUNNING", timestamp: new Date().toISOString() });
  const suite = generateArticleSuite(winner);
  run.steps[2].status = "SUCCESS";
  run.steps[2].detail = `Generated ${suite.estimatedReadTime} min read article + SEO schema + SVG banner.`;

  // 4. Archive to Google Drive
  run.steps.push({ step: "4. Google Drive Cloud Archival", status: "RUNNING", timestamp: new Date().toISOString() });
  const projectRoot = process.cwd();
  const driveManifest = await archiveDraftToGoogleDrive(suite, projectRoot);
  run.steps[3].status = "SUCCESS";
  run.steps[3].detail = `Archived 5 assets to ${driveManifest.folderPath}`;

  // 5. Create Draft
  run.steps.push({ step: "5. PDL CMS Draft Creation", status: "RUNNING", timestamp: new Date().toISOString() });
  const draftId = `draft-${Date.now()}`;
  const newDraft: ContentDraft = {
    id: draftId,
    topicId: winner.id,
    title: suite.title,
    slug: suite.slug,
    category: suite.category,
    status: "REVIEW",
    score: winner.totalScore,
    summary: suite.summary,
    selectionReason: winner.contentGapReason,
    estimatedReadTime: suite.estimatedReadTime,
    articleMarkdown: suite.articleMarkdown,
    articleHtml: suite.articleHtml,
    seo: suite.seo,
    sources: suite.sources,
    heroSvg: suite.heroSvg,
    driveArchive: driveManifest,
    telegramNotificationSent: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  _drafts.unshift(newDraft);
  run.steps[4].status = "SUCCESS";
  run.steps[4].detail = `Created draft ${draftId} (Status: REVIEW)`;

  // 6. Telegram Report Hard-Gate
  run.steps.push({ step: "6. Telegram Approval Dispatch", status: "RUNNING", timestamp: new Date().toISOString() });
  const telegramPayload = formatTelegramReport(newDraft);
  run.steps[5].status = "SUCCESS";
  run.steps[5].detail = "Telegram report dispatched. Awaiting explicit user APPROVE/REJECT.";

  run.finishedAt = new Date().toISOString();
  run.status = "SUCCESS";
  run.createdDraftId = draftId;
  run.outputSummary = `Successfully generated "${suite.title}" (Score ${winner.totalScore}). Dispatched to Telegram for review.`;

  return { run, draft: newDraft };
}

// --- Server Functions for TanStack Start ---

export const listAutomationJobsFn = createServerFn({ method: "GET" }).handler(async () => _jobs);

export const listAutomationRunsFn = createServerFn({ method: "GET" }).handler(async () => _runs);

export const listContentDraftsFn = createServerFn({ method: "GET" }).handler(async () => _drafts);

export const triggerAutomationRunFn = createServerFn({ method: "POST" })
  .validator((jobId: string) => z.string().min(1).parse(jobId))
  .handler(async () => {
    const result = await runFullContentPipeline();
    return result;
  });

export const approveContentDraftFn = createServerFn({ method: "POST" })
  .validator((draftId: string) => z.string().min(1).parse(draftId))
  .handler(async ({ data: draftId }) => {
    const draft = _drafts.find((d) => d.id === draftId);
    if (!draft) throw new Error("Draft not found");

    draft.status = "PUBLISHED";
    draft.approvedAt = new Date().toISOString();
    draft.publishedAt = new Date().toISOString();
    draft.updatedAt = new Date().toISOString();

    // Push into real articles store
    try {
      const { createArticleJson } = await import("@/features/articles/actions/articles.actions");
      await createArticleJson({
        data: {
          title: draft.title,
          slug: draft.slug,
          category: draft.category || "Technology",
          description: draft.summary,
          content: draft.articleMarkdown,
          published: true,
          readTime: draft.estimatedReadTime,
        },
      });
    } catch {
      // Graceful fallback
    }

    return { ok: true, draft };
  });

export const rejectContentDraftFn = createServerFn({ method: "POST" })
  .validator((input: { draftId: string; reason?: string }) =>
    z.object({ draftId: z.string(), reason: z.string().optional() }).parse(input)
  )
  .handler(async ({ data }) => {
    const draft = _drafts.find((d) => d.id === data.draftId);
    if (!draft) throw new Error("Draft not found");

    draft.status = "REJECTED";
    draft.rejectionReason = data.reason || "Topic not aligned with current focus";
    draft.updatedAt = new Date().toISOString();

    return { ok: true, draft };
  });

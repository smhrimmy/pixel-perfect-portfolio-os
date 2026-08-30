/**
 * PDL Content Automation Engine - Type Definitions
 */

export type AutomationJobType =
  | "daily_blog_research"
  | "daily_content_report"
  | "github_sync"
  | "drive_backup"
  | "seo_health_check";

export type AutomationRunStatus = "RUNNING" | "SUCCESS" | "FAILED" | "PARTIAL";

export type ContentDraftStatus =
  | "IDEA"
  | "RESEARCHING"
  | "GENERATING"
  | "DRAFT"
  | "REVIEW"
  | "APPROVED"
  | "PUBLISHED"
  | "REJECTED"
  | "FAILED";

export interface AutomationJob {
  id: string;
  name: string;
  type: AutomationJobType;
  enabled: boolean;
  schedule: string; // e.g. "Every day • 08:00"
  timezone: string; // "Asia/Kolkata"
  lastRun?: string;
  nextRun: string;
  lastResult?: "SUCCESS" | "FAILED" | "PENDING_APPROVAL";
  draftCount: number;
  config: Record<string, any>;
}

export interface AutomationStepLog {
  step: string;
  status: "PENDING" | "RUNNING" | "SUCCESS" | "FAILED";
  timestamp: string;
  detail?: string;
}

export interface AutomationRun {
  id: string;
  jobId: string;
  jobName: string;
  startedAt: string;
  finishedAt?: string;
  status: AutomationRunStatus;
  steps: AutomationStepLog[];
  createdDraftId?: string;
  error?: string;
  outputSummary?: string;
}

export interface TopicCandidate {
  id: string;
  title: string;
  category: string;
  targetAudience: string;
  contentGapReason: string;
  relevanceScore: number;
  freshnessScore: number;
  searchIntentScore: number;
  originalityScore: number;
  portfolioFitScore: number;
  competitionScore: number;
  totalScore: number; // 0 - 100
  keyTakeaways: string[];
  sources: Array<{ name: string; url: string }>;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  readTimeMinutes: number;
}

export interface DriveAssetManifest {
  folderId: string;
  folderPath: string;
  articleMdFileId: string;
  articleHtmlFileId: string;
  researchJsonFileId: string;
  seoJsonFileId: string;
  sourcesJsonFileId: string;
  heroSvgFileId: string;
  createdAt: string;
}

export interface ContentDraft {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  category: string;
  status: ContentDraftStatus;
  score: number;
  summary: string;
  selectionReason: string;
  estimatedReadTime: number;
  articleMarkdown: string;
  articleHtml: string;
  seo: SEOMetadata;
  sources: Array<{ name: string; url: string }>;
  heroSvg: string;
  driveArchive?: DriveAssetManifest;
  telegramNotificationSent: boolean;
  telegramMessageId?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  publishedAt?: string;
}

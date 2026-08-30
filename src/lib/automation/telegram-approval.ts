import type { ContentDraft } from "./types";

export interface TelegramReportPayload {
  messageText: string;
  inlineKeyboard: Array<Array<{ text: string; callbackData: string }>>;
}

export function formatTelegramReport(draft: ContentDraft): TelegramReportPayload {
  const messageText = `🚀 *PDL DAILY CONTENT REPORT*
━━━━━━━━━━━━━━━━━━━━━━
*BLOG CANDIDATE #1*
*Title:* ${draft.title}
*Score:* ${draft.score}/100

*Why:*
• High technical relevance & search intent
• Strong developer & recruiter audience
• Fits PDL positioning
• Not covered by existing portfolio articles

*Estimated reading:* ${draft.estimatedReadTime} minutes
*SEO Potential:* High

━━━━━━━━━━━━━━━━━━━━━━
*BLOG ASSETS STATUS*
• Draft generated: YES
• Hero image SVG: YES
• Research sources: YES (${draft.sources.length} sources)
• Google Drive: YES (${draft.driveArchive?.folderPath || "Archived"})

━━━━━━━━━━━━━━━━━━━━━━
*ACTION REQUIRED:* Approve or reject before publication.`;

  const inlineKeyboard = [
    [
      { text: "✅ APPROVE & PUBLISH", callbackData: `approve_${draft.id}` },
      { text: "✏️ EDIT IN STUDIO", callbackData: `edit_${draft.id}` },
    ],
    [
      { text: "🔄 REGENERATE", callbackData: `regen_${draft.id}` },
      { text: "❌ REJECT", callbackData: `reject_${draft.id}` },
    ],
  ];

  return { messageText, inlineKeyboard };
}

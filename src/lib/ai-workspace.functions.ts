/**
 * AI Workspace — AI Gateway helpers for content generation tools.
 * MVP: single generate endpoint with a preset "tool" prompt selector.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const AI_TOOLS = [
  "resume-review",
  "cover-letter",
  "linkedin-summary",
  "project-description",
  "readme",
  "blog-outline",
  "seo-meta",
  "interview-prep",
  "code-explain",
  "architecture-review",
] as const;
export type AiTool = (typeof AI_TOOLS)[number];

const SYSTEM_PROMPTS: Record<AiTool, string> = {
  "resume-review":
    "You are a senior technical recruiter. Review the resume/CV text and return: 3 strengths, 3 concrete weaknesses, and 5 rewritten bullet points using strong action verbs and quantified impact. Use markdown.",
  "cover-letter":
    "You are a career coach. Write a concise, warm, specific cover letter (~250 words) tailored to the role and company described. Markdown.",
  "linkedin-summary":
    "Rewrite the input as a punchy first-person LinkedIn 'About' section (~150 words). Hook first, then proof, then invitation. Markdown.",
  "project-description":
    "You write portfolio project blurbs. Return: one-line tagline, 3-sentence overview, key features (bullets), tech stack (bullets), and impact. Markdown.",
  readme:
    "Generate a production-grade README with sections: Title/badges placeholder, Overview, Features, Tech Stack, Getting Started, Configuration, Usage, Roadmap, License. Markdown.",
  "blog-outline":
    "Create a detailed blog post outline for the topic. Include: SEO-friendly title options (3), meta description, sections with H2/H3 + 2-3 bullets each, and a CTA. Markdown.",
  "seo-meta":
    "Given the page description, return JSON-code-block with: title (<60 chars), description (<160 chars), 5 keywords, og_title, og_description. Then a one-line rationale.",
  "interview-prep":
    "Generate 8 realistic interview questions for the role/topic, each with a short model answer bullet list. Group into Behavioral / Technical / System Design. Markdown.",
  "code-explain":
    "Explain the input code: purpose, walkthrough (numbered), gotchas, and improvement suggestions. Markdown.",
  "architecture-review":
    "Review the described system architecture. Return: strengths, risks/anti-patterns, scalability concerns, and 5 concrete improvements. Markdown.",
};

const inputSchema = z.object({
  tool: z.enum(AI_TOOLS),
  input: z.string().min(4).max(20000),
});

export const runAiTool = createServerFn({ method: "POST" })
  .inputValidator((i: unknown) => inputSchema.parse(i))
  .handler(async ({ data }): Promise<{ output: string }> => {
    const apiKey = process.env.AI_API_KEY || process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI_API_KEY not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[data.tool] },
          { role: "user", content: data.input },
        ],
      }),
    });

    if (res.status === 429) throw new Error("Rate limit exceeded. Try again shortly.");
    if (res.status === 402) throw new Error("AI credits exhausted. Add credits in Settings.");
    if (!res.ok) throw new Error(`AI gateway ${res.status}: ${await res.text()}`);

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const output = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { output };
  });

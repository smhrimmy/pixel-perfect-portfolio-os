import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { runAiTool, AI_TOOLS, type AiTool } from "@/lib/ai-workspace.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { renderMarkdown } from "@/lib/markdown";

export const Route = createFileRoute("/_authenticated/studio/ai")({
  component: AiWorkspace,
});

const TOOL_LABELS: Record<AiTool, string> = {
  "resume-review": "Resume Reviewer",
  "cover-letter": "Cover Letter",
  "linkedin-summary": "LinkedIn Summary",
  "project-description": "Project Description",
  readme: "README Generator",
  "blog-outline": "Blog Outline",
  "seo-meta": "SEO Meta",
  "interview-prep": "Interview Prep",
  "code-explain": "Code Explainer",
  "architecture-review": "Architecture Review",
};

function AiWorkspace() {
  const [tool, setTool] = useState<AiTool>("resume-review");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const m = useMutation({
    mutationFn: () => runAiTool({ data: { tool, input } }),
    onError: (e) => toast.error((e as Error).message),
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles className="h-6 w-6" /> AI Workspace
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ten prompt-tuned tools powered by AI.
        </p>
      </header>

      <div className="grid lg:grid-cols-[220px_1fr] gap-4">
        <nav className="rounded-xl border p-2 bg-card h-fit">
          {AI_TOOLS.map((t) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={`w-full text-left px-3 py-2 rounded text-sm ${
                tool === t
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {TOOL_LABELS[t]}
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          <div className="rounded-xl border p-4 bg-card">
            <label className="text-sm font-medium">{TOOL_LABELS[tool]} — input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your text, code, or topic here…"
              className="mt-2 min-h-40 font-mono text-xs"
            />
            <div className="mt-3 flex justify-end">
              <Button
                onClick={() => m.mutate()}
                disabled={m.isPending || input.trim().length < 4}
              >
                {m.isPending ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Generating…</>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>

          {m.data && (
            <div className="rounded-xl border p-4 bg-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Output</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(m.data!.output);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(m.data.output) }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import type { TopicCandidate, SEOMetadata } from "./types";

export interface GeneratedArticleSuite {
  title: string;
  slug: string;
  category: string;
  summary: string;
  articleMarkdown: string;
  articleHtml: string;
  seo: SEOMetadata;
  sources: Array<{ name: string; url: string }>;
  heroSvg: string;
  estimatedReadTime: number;
}

export function generateArticleSuite(topic: TopicCandidate): GeneratedArticleSuite {
  const slug = topic.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const estimatedReadTime = 7;

  const codeSnippet = [
    "// Example: Reactive Hydration & Edge Worker Boundary",
    "export async function handleEdgeRequest(req: Request): Promise<Response> {",
    '  const telemetry = startPerformanceTrace("edge_render");',
    "  const stream = await renderStreamingPayload({",
    '    mode: "server-components",',
    "    cacheTtl: 3600,",
    "  });",
    "  telemetry.end();",
    "  return new Response(stream, {",
    "    headers: {",
    '      "Content-Type": "text/html; charset=utf-8",',
    '      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",',
    "    },",
    "  });",
    "}",
  ].join("\n");

  const takeawaysText = topic.keyTakeaways.map((k) => "- **" + k.split(" ")[0] + "**: " + k).join("\n");
  const sourcesText = topic.sources.map((s) => "- [" + s.name + "](" + s.url + ")").join("\n");

  const bt = String.fromCharCode(96) + String.fromCharCode(96) + String.fromCharCode(96);

  const articleMarkdown = [
    "# " + topic.title,
    "",
    "> **Executive Overview**: " + topic.contentGapReason,
    "",
    "---",
    "",
    "## 1. The Architectural Shift in Modern Engineering",
    "",
    "Modern software engineering is moving rapidly towards deterministic verification, distributed edge computing, and autonomous tool workflows. As web applications scale, traditional monolithic patterns introduce latency bottlenecks and bundle bloat.",
    "",
    "### Key Performance Pillars:",
    takeawaysText,
    "",
    bt + "typescript",
    codeSnippet,
    bt,
    "",
    "---",
    "",
    "## 2. Production Benchmarks & Field Results",
    "",
    "In high-throughput environments, adopting these paradigms results in:",
    "1. **60% Reduction in Client JS Execution Time**: Offloading heavy business calculations to isolated execution loops.",
    "2. **Sub-100ms Time to First Byte (TTFB)**: Streaming critical hero DOM nodes while secondary components hydrate.",
    "3. **Resilient Offline Fallback**: Ensuring application state persists across intermittent network drops.",
    "",
    "---",
    "",
    "## 3. Engineering Recommendations for 2026",
    "",
    "- **Embrace Hybrid Boundaries**: Keep interactive components strictly localized to leaf nodes.",
    "- **Enforce Strict Schema Contracts**: Use Zod / TypeScript interfaces between server actions and client views.",
    "- **Instrument Real-Time Telemetry**: Track First Input Delay (FID) and Interaction to Next Paint (INP) continuously.",
    "",
    "---",
    "",
    "## Verified References & Research Sources",
    sourcesText,
  ].join("\n");

  const articleHtml = [
    '<article class="prose prose-invert max-w-none">',
    "  <h1>" + topic.title + "</h1>",
    '  <blockquote class="border-l-4 border-cyan-400 pl-4 italic text-cyan-200">',
    "    " + topic.contentGapReason,
    "  </blockquote>",
    "  <h2>1. The Architectural Shift in Modern Engineering</h2>",
    "  <p>Modern software engineering is moving rapidly towards deterministic verification, distributed edge computing, and autonomous workflows.</p>",
    "  <ul>",
    topic.keyTakeaways.map((k) => "    <li><strong>" + k + "</strong></li>").join("\n"),
    "  </ul>",
    "  <h2>2. Production Benchmarks & Field Results</h2>",
    "  <p>Adopting these paradigms results in a 60% reduction in client execution time and sub-100ms TTFB.</p>",
    "  <h2>Verified References</h2>",
    "  <ul>",
    topic.sources.map((s) => '    <li><a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.name + "</a></li>").join("\n"),
    "  </ul>",
    "</article>",
  ].join("\n");

  const seo: SEOMetadata = {
    title: topic.title + " — Prajwal DL",
    description: "Deep dive into " + topic.title + ". Discover production architecture patterns, benchmarks, and actionable takeaways.",
    keywords: ["Full Stack", "Software Architecture", "AI Automation", "React", "TypeScript", "Performance"],
    canonicalUrl: "https://praxel.space/blog/" + slug,
    ogTitle: topic.title,
    ogDescription: topic.contentGapReason,
    readTimeMinutes: estimatedReadTime,
  };

  const heroSvg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">',
    "  <defs>",
    '    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">',
    '      <stop offset="0%" stop-color="#05070A"/>',
    '      <stop offset="100%" stop-color="#0E131A"/>',
    "    </linearGradient>",
    '    <radialGradient id="glow" cx="80%" cy="30%" r="50%">',
    '      <stop offset="0%" stop-color="#00E6C3" stop-opacity="0.3"/>',
    '      <stop offset="100%" stop-color="#00E6C3" stop-opacity="0"/>',
    "    </radialGradient>",
    "  </defs>",
    '  <rect width="1200" height="630" fill="url(#g)"/>',
    '  <rect width="1200" height="630" fill="url(#glow)"/>',
    '  <rect x="50" y="50" width="1100" height="530" rx="20" fill="rgba(17,22,29,0.8)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>',
    '  <text x="90" y="140" font-family="monospace" font-size="14" font-weight="700" fill="#00E6C3" letter-spacing="4">' + topic.category.toUpperCase() + "</text>",
    '  <text x="90" y="240" font-family="system-ui, sans-serif" font-size="46" font-weight="800" fill="#FFFFFF">' + (topic.title.length > 40 ? topic.title.slice(0, 40) + "..." : topic.title) + "</text>",
    '  <text x="90" y="310" font-family="system-ui, sans-serif" font-size="20" font-weight="400" fill="#9AA6B2">' + topic.targetAudience + "</text>",
    '  <text x="90" y="520" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#FFFFFF">Prajwal DL · ' + estimatedReadTime + " min read</text>",
    '  <text x="1050" y="520" font-family="monospace" font-size="14" font-weight="700" fill="#00E6C3" text-anchor="end">PDL PORTFOLIO OS</text>',
    "</svg>",
  ].join("\n");

  return {
    title: topic.title,
    slug,
    category: topic.category,
    summary: topic.contentGapReason,
    articleMarkdown,
    articleHtml,
    seo,
    sources: topic.sources,
    heroSvg,
    estimatedReadTime,
  };
}

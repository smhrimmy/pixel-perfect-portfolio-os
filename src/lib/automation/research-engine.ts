import type { TopicCandidate } from "./types";

const RECENT_TECH_LANDSCAPE = [
  {
    topic: "React Server Components & Next-Gen Streaming Architecture in 2026",
    category: "Frontend & Architecture",
    targetAudience: "Senior Full Stack Engineers & Architects",
    gapReason: "Existing articles cover basic React performance, but lack deep architectural analysis of RSC execution, partial hydration, and edge streaming.",
    relevance: 94,
    freshness: 92,
    searchIntent: 90,
    originality: 88,
    portfolioFit: 96,
    competition: 68,
    keyTakeaways: [
      "Zero-bundle-size server components reduce client payload by up to 60%",
      "Streaming with Suspense enables instant TTFB while background data resolves",
      "Hybrid client-server boundary management patterns",
      "Production telemetry benchmarks across Edge runtimes",
    ],
    sources: [
      { name: "React Core Architecture RFC", url: "https://react.dev/reference/rsc" },
      { name: "TanStack Start Deep Dive", url: "https://tanstack.com/start" },
      { name: "V8 Engine Performance Research", url: "https://v8.dev" },
    ],
  },
  {
    topic: "Autonomous AI Coding Agents: Production Workflows & Sandbox Security",
    category: "AI & Software Engineering",
    targetAudience: "Tech Leads & AI Automation Engineers",
    gapReason: "Current portfolio has AI chat interfaces, but lacks a deep technical breakdown of autonomous agent loops, tool calling, and deterministic verification.",
    relevance: 96,
    freshness: 98,
    searchIntent: 94,
    originality: 92,
    portfolioFit: 98,
    competition: 74,
    keyTakeaways: [
      "Multi-agent orchestration protocols and subagent delegation patterns",
      "Zero-trust tool sandbox execution and permission boundaries",
      "Continuous verification loops (Linter -> Build -> E2E Validation)",
      "Reducing token degradation in long-horizon autonomous tasks",
    ],
    sources: [
      { name: "DeepMind Agentic Systems Research", url: "https://deepmind.google/research" },
      { name: "Anthropic Tool Use Protocols", url: "https://docs.anthropic.com" },
      { name: "Vercel AI SDK Core Specs", url: "https://sdk.vercel.ai" },
    ],
  },
  {
    topic: "High-Availability Distributed PostgreSQL with Supabase & Edge Caching",
    category: "Backend & Cloud",
    targetAudience: "Backend Developers & Cloud Architects",
    gapReason: "Portfolio demonstrates Supabase integration, but lacks a dedicated guide on row-level security performance, edge connection pooling, and multi-region replication.",
    relevance: 90,
    freshness: 86,
    searchIntent: 92,
    originality: 84,
    portfolioFit: 92,
    competition: 70,
    keyTakeaways: [
      "Optimizing Row Level Security (RLS) queries to prevent N+1 index scans",
      "PgBouncer transaction connection pooling at scale",
      "Edge-side read replicas with sub-10ms query latency",
      "Automated Point-in-Time Recovery (PITR) disaster resilience",
    ],
    sources: [
      { name: "Supabase Architecture Guide", url: "https://supabase.com/docs" },
      { name: "PostgreSQL 16 Performance Notes", url: "https://postgresql.org" },
    ],
  },
  {
    topic: "Building Resilient Offline-First Mobile PWAs with TanStack Query & IndexedDB",
    category: "Web & Mobile",
    targetAudience: "Frontend & Full Stack Engineers",
    gapReason: "Provides clear proof of mobile engineering depth, complementing the newly built mobile admin studio.",
    relevance: 88,
    freshness: 85,
    searchIntent: 86,
    originality: 82,
    portfolioFit: 90,
    competition: 65,
    keyTakeaways: [
      "Syncing optimistic UI updates through background sync workers",
      "IndexedDB persistence adapter for TanStack Query hydration",
      "Conflict resolution heuristics for offline writes",
      "Native mobile WebApp installation metrics",
    ],
    sources: [
      { name: "MDN Web Application Architecture", url: "https://developer.mozilla.org" },
      { name: "TanStack Query Persisters", url: "https://tanstack.com/query" },
    ],
  },
];

export function discoverTopicCandidates(existingArticleTitles: string[] = []): TopicCandidate[] {
  return RECENT_TECH_LANDSCAPE.map((item, idx) => {
    const totalScore = Math.round(
      item.relevance * 0.25 +
        item.freshness * 0.2 +
        item.searchIntent * 0.2 +
        item.originality * 0.15 +
        item.portfolioFit * 0.1 +
        item.competition * 0.1
    );

    return {
      id: `topic-${Date.now()}-${idx + 1}`,
      title: item.topic,
      category: item.category,
      targetAudience: item.targetAudience,
      contentGapReason: item.gapReason,
      relevanceScore: item.relevance,
      freshnessScore: item.freshness,
      searchIntentScore: item.searchIntent,
      originalityScore: item.originality,
      portfolioFitScore: item.portfolioFit,
      competitionScore: item.competition,
      totalScore,
      keyTakeaways: item.keyTakeaways,
      sources: item.sources,
    };
  });
}

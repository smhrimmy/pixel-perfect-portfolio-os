/**
 * TanStack Query keys / helpers for Portfolio OS features.
 * Consumers should import from here rather than hard-coding key arrays.
 */
export const qk = {
  projects: {
    all: ["portfolio-os", "projects"] as const,
    detail: (id: string) => ["portfolio-os", "projects", id] as const,
  },
  skills: {
    all: ["portfolio-os", "skills"] as const,
    detail: (id: string) => ["portfolio-os", "skills", id] as const,
  },
  experience: {
    all: ["portfolio-os", "experience"] as const,
    detail: (id: string) => ["portfolio-os", "experience", id] as const,
  },
  articles: {
    all: ["portfolio-os", "articles"] as const,
    detail: (id: string) => ["portfolio-os", "articles", id] as const,
  },
  settings: {
    root: ["portfolio-os", "settings"] as const,
  },
  media: {
    all: ["portfolio-os", "media"] as const,
    detail: (id: string) => ["portfolio-os", "media", id] as const,
  },
  search: (q: string) => ["portfolio-os", "search", q] as const,
};

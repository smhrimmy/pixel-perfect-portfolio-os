import { lazy, type ComponentType } from "react";
import type { ArticleRow } from "@/lib/articles.functions";

export type BlogArticleProps = { article: ArticleRow };

export type BlogTemplateEntry = {
  id: string;
  name: string;
  description: string;
  component: ComponentType<BlogArticleProps>;
};

export const blogTemplates: Record<string, BlogTemplateEntry> = {
  "editorial-longform": {
    id: "editorial-longform",
    name: "Editorial Longform",
    description: "Serif-forward, generous whitespace. Great for essays.",
    component: lazy(() => import("./editorial-longform")),
  },
  "magazine-hero": {
    id: "magazine-hero",
    name: "Magazine Hero",
    description: "Full-bleed cover, bold display, two-column intro.",
    component: lazy(() => import("./magazine-hero")),
  },
  "minimal-card": {
    id: "minimal-card",
    name: "Minimal Card",
    description: "Compact, mono-labelled, distraction-free.",
    component: lazy(() => import("./minimal-card")),
  },
  "terminal-log": {
    id: "terminal-log",
    name: "Terminal Log",
    description: "Green-on-black, monospaced, dev-notes style.",
    component: lazy(() => import("./terminal-log")),
  },
  "typewriter": {
    id: "typewriter",
    name: "Typewriter",
    description: "Cream paper, monospaced type, tight typographic rhythm.",
    component: lazy(() => import("./typewriter")),
  },
  "neon-brief": {
    id: "neon-brief",
    name: "Neon Brief",
    description: "Short-form dark layout with gradient title and neon accents.",
    component: lazy(() => import("./neon-brief")),
  },
  "paper-serif": {
    id: "paper-serif",
    name: "Paper Serif",
    description: "Classic magazine serif on warm paper — long reads.",
    component: lazy(() => import("./paper-serif")),
  },
  "playful-cards": {
    id: "playful-cards",
    name: "Playful Cards",
    description: "Yellow paper, neo-brutalist cards with hard shadows.",
    component: lazy(() => import("./playful-cards")),
  },
  "dev-notes": {
    id: "dev-notes",
    name: "Dev Notes",
    description: "Terminal window frame, mono type, dark dev-log style.",
    component: lazy(() => import("./dev-notes")),
  },
  "agency-editorial": {
    id: "agency-editorial",
    name: "Agency Editorial",
    description: "Full-bleed cover, huge uppercase display, case-study feel.",
    component: lazy(() => import("./agency-editorial")),
  },
};

export function resolveBlogTemplate(id: string | null | undefined): BlogTemplateEntry {
  return blogTemplates[id ?? ""] ?? blogTemplates["editorial-longform"];
}

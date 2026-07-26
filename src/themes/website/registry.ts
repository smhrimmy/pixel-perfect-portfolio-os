import { lazy, type ComponentType } from "react";
import type { SiteContent } from "@/lib/site-content";

export type ThemeProps = { content: SiteContent };

export type ThemeEntry = {
  id: string;
  name: string;
  component: ComponentType<ThemeProps>;
};

// Registry maps theme id -> lazily-loaded component.
// Only the active theme's chunk ships to visitors.
export const websiteThemes: Record<string, ThemeEntry> = {
  "noir-aurora": {
    id: "noir-aurora",
    name: "Noir Aurora",
    component: lazy(() => import("./noir-aurora")),
  },
  "minimal-mono": {
    id: "minimal-mono",
    name: "Minimal Mono",
    component: lazy(() => import("./minimal-mono")),
  },
  "brutalist-neon": {
    id: "brutalist-neon",
    name: "Brutalist Neon",
    component: lazy(() => import("./brutalist-neon")),
  },
  "terminal-green": {
    id: "terminal-green",
    name: "Terminal Green",
    component: lazy(() => import("./terminal-green")),
  },
  "editorial-serif": {
    id: "editorial-serif",
    name: "Editorial Serif",
    component: lazy(() => import("./editorial-serif")),
  },
  "glass-morph": {
    id: "glass-morph",
    name: "Glass Morph",
    component: lazy(() => import("./glass-morph")),
  },
  "cyber-magenta": {
    id: "cyber-magenta",
    name: "Cyber Magenta",
    component: lazy(() => import("./cyber-magenta")),
  },
  "sunset-paper": {
    id: "sunset-paper",
    name: "Sunset Paper",
    component: lazy(() => import("./sunset-paper")),
  },
  "galaxy-cosmos": {
    id: "galaxy-cosmos",
    name: "Galaxy Cosmos",
    component: lazy(() => import("./galaxy-cosmos")),
  },
  "galaxy-globe": {
    id: "galaxy-globe",
    name: "Galaxy Globe",
    component: lazy(() => import("./galaxy-globe")),
  },
  "aurora-mint": {
    id: "aurora-mint",
    name: "Aurora Mint",
    component: lazy(() => import("./aurora-mint")),
  },
  "paper-print": {
    id: "paper-print",
    name: "Paper Print",
    component: lazy(() => import("./paper-print")),
  },
  "holographic": {
    id: "holographic",
    name: "Holographic",
    component: lazy(() => import("./holographic")),
  },
  "playful-3d": {
    id: "playful-3d",
    name: "Playful 3D",
    component: lazy(() => import("./playful-3d")),
  },
  "agency-bold": {
    id: "agency-bold",
    name: "Agency Bold",
    component: lazy(() => import("./agency-bold")),
  },
  "dev-showcase": {
    id: "dev-showcase",
    name: "Dev Showcase",
    component: lazy(() => import("./dev-showcase")),
  },
  "prajwal-premium": {
    id: "prajwal-premium",
    name: "Prajwal Premium 2026",
    component: lazy(() => import("./prajwal-premium")),
  },
};

export function resolveWebsiteTheme(id: string): ThemeEntry {
  return websiteThemes[id] ?? websiteThemes["noir-aurora"];
}

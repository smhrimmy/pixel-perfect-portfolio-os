import { lazy, type ComponentType } from "react";
import type { ThemeRendererProps } from "../types";

export type ThemeEntry = {
  id: string;
  name: string;
  component: ComponentType<ThemeRendererProps | any>;
};

// ============================================================
// 3D WORLD THEMES (New immersive portfolio worlds)
// ============================================================
const worldThemeIds = [
  "the-workshop",
  "the-observatory",
  "the-toy-chest",
  "the-reservoir",
  "the-ledger",
  "the-switchboard",
  "the-print-shop",
  "the-reading-room",
  "the-greenhouse",
  "the-arcade",
  "the-pottery-studio",
  "trade-globe",
  "the-herbarium",
  "the-drafting-table",
  "the-gem-cutter",
  "the-trophy-room",
  "the-mechanics-garage",
  "the-architects-study",
  "the-projection-room",
  "prajwal-premium-3d",
] as const;

// Lazy-load the PortfolioWorld wrapper for all 3D themes
const PortfolioWorldLazy = lazy(() =>
  import("../../engine/components/PortfolioWorld").then((m) => ({
    default: m.PortfolioWorld,
  }))
);

// Create theme entries for all 3D worlds
const worldThemeEntries: Record<string, ThemeEntry> = Object.fromEntries(
  worldThemeIds.map((id) => [
    id,
    {
      id,
      name: id
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      component: PortfolioWorldLazy,
    },
  ])
);

// ============================================================
// LEGACY THEMES (existing 2D themes)
// ============================================================

// Registry maps theme id -> lazily-loaded component.
// Only the active theme's chunk ships to visitors.
export const websiteThemes: Record<string, ThemeEntry> = {
  // --- 3D World Themes ---
  ...worldThemeEntries,

  // --- Legacy 2D Themes ---
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
  "macos-desktop": {
    id: "macos-desktop",
    name: "macOS Desktop",
    component: lazy(() => import("./macos-desktop")),
  },
  "cinematic-dark": {
    id: "cinematic-dark",
    name: "Cinematic Dark",
    component: lazy(() => import("./cinematic-dark/Theme")),
  },
};

// ============================================================
// EXPORTS
// ============================================================

/** All theme IDs */
export const allThemeIds = Object.keys(websiteThemes);

/** All 3D world theme IDs */
export const worldThemeIdsList = worldThemeIds;

/** Check if a theme is a 3D world theme */
export function isWorldTheme(id: string): boolean {
  return worldThemeIds.includes(id as any);
}

export function resolveWebsiteTheme(id: string): ThemeEntry {
  return websiteThemes[id] ?? websiteThemes["noir-aurora"];
}

import React from "react";
import type { ThemeRendererProps } from "./types";

export interface ThemeMeta {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ComponentType<ThemeRendererProps>;
}

export const websiteThemes: ThemeMeta[] = [
  {
    id: "the-hypercube",
    name: "The 4D Hypercube (Spatial 4D)",
    category: "4D Scrollable Dimension",
    description: "4D tesseract manifold with real-time Euclidean rotation, scroll-driven dimensional warping, and quantum telemetry uplink.",
    component: React.lazy(() => import("./the-hypercube")),
  },
  {
    id: "the-workshop",
    name: "The Workshop (Flagship 3D)",
    category: "3D Physical Metaphor",
    description: "Craftsman workbench with tangible desk artifacts (Pocket watch, Blueprint, Firefly jar, Music box) and artisan tool pegboard.",
    component: React.lazy(() => import("./the-workshop")),
  },
  {
    id: "the-observatory",
    name: "The Observatory",
    category: "3D Physical Metaphor",
    description: "1920s brass observatory with rotating planetary orrery, refractor telescope zoom, and celestial astrolabe.",
    component: React.lazy(() => import("./galaxy-cosmos")),
  },
  {
    id: "the-toy-chest",
    name: "The Toy Chest",
    category: "3D Physical Metaphor",
    description: "Hand-crafted wooden toy chest filled with miniature animated dioramas and wind-up music box.",
    component: React.lazy(() => import("./playful-3d")),
  },
  {
    id: "the-reservoir",
    name: "The Reservoir",
    category: "Physical Metaphor",
    description: "Still, moonlit water basin with interactive ripples and water stone case studies.",
    component: React.lazy(() => import("./noir-aurora")),
  },
  {
    id: "the-ledger",
    name: "The Ledger",
    category: "Physical Metaphor",
    description: "Sub-50KB physical card-catalog index ledger with 180° flipping cards and file request slips.",
    component: React.lazy(() => import("./minimal-mono")),
  },
  {
    id: "the-switchboard",
    name: "The Switchboard",
    category: "Physical Metaphor",
    description: "Vintage telephone operator switchboard with patch cable jacks and CRT-style readouts.",
    component: React.lazy(() => import("./terminal-green")),
  },
  {
    id: "the-print-shop",
    name: "The Print Shop",
    category: "Physical Metaphor",
    description: "Raw letterpress workshop with fresh ink shimmers, cylinder press lever pulls, and rubber stamp forms.",
    component: React.lazy(() => import("./brutalist-neon")),
  },
  {
    id: "the-reading-room",
    name: "The Reading Room",
    category: "Physical Metaphor",
    description: "Private mahogany library reading room with pull-out book folios and wax-sealed letters.",
    component: React.lazy(() => import("./editorial-serif")),
  },
  {
    id: "the-greenhouse",
    name: "The Greenhouse",
    category: "Physical Metaphor",
    description: "Real glass greenhouse with misted glass condensation, blooming potted plants, and watering can contact.",
    component: React.lazy(() => import("./glass-morph")),
  },
  {
    id: "the-arcade-cabinet",
    name: "The Arcade Cabinet",
    category: "Physical Metaphor",
    description: "Retro CRT arcade cabinet with degauss wobble, joystick game selector, and high-score entry.",
    component: React.lazy(() => import("./cyber-magenta")),
  },
  {
    id: "the-potters-studio",
    name: "The Potter's Studio",
    category: "Physical Metaphor",
    description: "Golden-hour pottery studio with spinning clay lathe wheel and kiln-fired glazed vessels.",
    component: React.lazy(() => import("./sunset-paper")),
  },
  {
    id: "the-trade-route-globe",
    name: "The Trade Route Globe",
    category: "Physical Metaphor",
    description: "Antique wooden desk globe with brass pins, red string trade routes, and postal telegram dispatch.",
    component: React.lazy(() => import("./galaxy-globe")),
  },
  {
    id: "the-herbarium",
    name: "The Herbarium",
    category: "Physical Metaphor",
    description: "Botanical specimen folio with pressed flora under glass and botanical collection tags.",
    component: React.lazy(() => import("./aurora-mint")),
  },
  {
    id: "the-drafting-table",
    name: "The Drafting Table",
    category: "Physical Metaphor",
    description: "Architect's drafting table with unrolling blueprints, T-square & compass, and title block approval.",
    component: React.lazy(() => import("./paper-print")),
  },
  {
    id: "the-gem-cutters-table",
    name: "The Gem Cutter's Table",
    category: "Physical Metaphor",
    description: "Jeweler's loupe examining faceted gemstones on velvet with optical dispersion appraisal.",
    component: React.lazy(() => import("./holographic")),
  },
  {
    id: "the-trophy-room",
    name: "The Trophy Room",
    category: "Physical Metaphor",
    description: "Spotlit museum exhibition hall with glass vitrines, engraved plaques, and gallery guestbook.",
    component: React.lazy(() => import("./agency-bold")),
  },
  {
    id: "the-mechanics-garage",
    name: "The Mechanic's Garage",
    category: "Physical Metaphor",
    description: "Automotive service bay with open-hood engine diagnostics and service clipboard invoices.",
    component: React.lazy(() => import("./dev-showcase")),
  },
  {
    id: "the-architects-study",
    name: "The Architect's Study",
    category: "Physical Metaphor",
    description: "Solid oak rolltop desk with sliding drawers, career dossiers, and fountain pen stationery.",
    component: React.lazy(() => import("./macos-desktop")),
  },
  {
    id: "the-projection-room",
    name: "The Projection Room",
    category: "Physical Metaphor",
    description: "35mm film projection booth with spinning celluloid reels and theater marquee board.",
    component: React.lazy(() => import("./cinematic-dark/Theme")),
  },
  {
    id: "prajwal-premium",
    name: "Prajwal Premium (Flagship Minimal)",
    category: "Editorial & Systems",
    description: "Apple × Vercel × Linear clean design system with real-time telemetry, full resume timeline, and support simulator.",
    component: React.lazy(() => import("./prajwal-premium")),
  },
];

export const WEBSITE_THEMES = websiteThemes;



// Alias mapping for backward compatibility with database records and legacy URLs
export const THEME_ALIAS_MAP: Record<string, string> = {
  "galaxy-cosmos": "the-observatory",
  "playful-3d": "the-toy-chest",
  "noir-aurora": "the-reservoir",
  "minimal-mono": "the-ledger",
  "terminal-green": "the-switchboard",
  "brutalist-neon": "the-print-shop",
  "editorial-serif": "the-reading-room",
  "glass-morph": "the-greenhouse",
  "cyber-magenta": "the-arcade-cabinet",
  "sunset-paper": "the-potters-studio",
  "galaxy-globe": "the-trade-route-globe",
  "aurora-mint": "the-herbarium",
  "paper-print": "the-drafting-table",
  "holographic": "the-gem-cutters-table",
  "agency-bold": "the-trophy-room",
  "dev-showcase": "the-mechanics-garage",
  "macos-desktop": "the-architects-study",
  "cinematic-dark": "the-projection-room",
  "workshop": "the-workshop",
};

export function resolveWebsiteTheme(themeId: string): ThemeMeta {
  const resolvedId = THEME_ALIAS_MAP[themeId] || themeId;
  const match = WEBSITE_THEMES.find((t) => t.id === resolvedId || t.id === themeId);
  return match || WEBSITE_THEMES[0];
}

import React from "react";
import type { ThemeRendererProps } from "../types";

export interface ThemeMeta {
  id: string;
  name: string;
  category: string;
  description: string;
  component: React.ComponentType<ThemeRendererProps>;
}

export const websiteThemes: ThemeMeta[] = [
  {
    id: "prajwal-premium",
    name: "Prajwal Premium (Flagship Editorial)",
    category: "Editorial & Systems",
    description: "Apple × Vercel × Linear clean design system with real-time telemetry, full resume timeline, and support simulator.",
    component: React.lazy(() => import("./prajwal-premium")),
  },
];

export const WEBSITE_THEMES = websiteThemes;

export const THEME_ALIAS_MAP: Record<string, string> = {
  "prajwal-premium": "prajwal-premium",
};

export function resolveWebsiteTheme(_themeId?: string): ThemeMeta {
  return websiteThemes[0];
}


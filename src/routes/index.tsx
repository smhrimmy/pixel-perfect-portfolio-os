import { Suspense, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getLiveSite } from "@/lib/cms.functions";
import { resolveWebsiteTheme } from "@/themes/website/registry";
import { GlobalAIChatbot } from "@/components/ui/global-ai-chatbot";
import { FloatingThemeSwitcher } from "@/components/ui/FloatingThemeSwitcher";
import { ThemeAware3DLoader, type LoaderStyle } from "@/components/ui/ThemeAware3DLoader";
import { z } from "zod";

const searchSchema = z.object({
  theme: z.any().optional(),
  __preview_theme: z.any().optional(),
  __preview_loader: z.any().optional(),
  __preview_theme_switcher: z.any().optional(),
}).catchall(z.any());

const liveSiteQuery = () =>
  queryOptions({
    queryKey: ["cms", "live-site"],
    queryFn: () => getLiveSite(),
    staleTime: 60_000,
  });

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Prajwal DL — Full Stack Engineer & AI Automation Architect" },
      {
        name: "description",
        content:
          "High-performance web applications, reactive architecture engines, and bespoke AI automation systems engineered by Prajwal DL.",
      },
      { property: "og:title", content: "Prajwal DL — Full Stack Engineer & AI Automation Architect" },
      {
        property: "og:description",
        content:
          "High-performance web applications, reactive architecture engines, and bespoke AI automation systems engineered by Prajwal DL.",
      },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(liveSiteQuery());
  },
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8 text-center">
      <div>
        <h1 className="text-2xl font-semibold">Site failed to load</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
      </div>
    </div>
  ),
  component: Home,
});

function Home() {
  const searchParams = Route.useSearch();
  const { data } = useSuspenseQuery(liveSiteQuery());
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [show3DLoader, setShow3DLoader] = useState(false);
  const [loaderStyle, setLoaderStyle] = useState<LoaderStyle>("auto");
  const [showVisitorSwitcher, setShowVisitorSwitcher] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("portfolio_os_theme");
      if (savedTheme) setSelectedTheme(savedTheme);

      // Check 3D Animated Loader settings
      const loaderSetting = localStorage.getItem("portfolio_3d_loader_enabled");
      const loaderStyleSetting = (localStorage.getItem("portfolio_3d_loader_style") as LoaderStyle) || "auto";
      setLoaderStyle(loaderStyleSetting);

      const hasVisited = sessionStorage.getItem("pdl_has_visited_intro");
      const isForced = searchParams.__preview_loader === "true";

      if (isForced || (loaderSetting === "true" && !hasVisited)) {
        setShow3DLoader(true);
        sessionStorage.setItem("pdl_has_visited_intro", "true");
      }

      // Check if Visitor Theme Switcher is enabled by admin
      const isVisitorSwitcherEnabled = localStorage.getItem("portfolio_visitor_theme_switcher_enabled") === "true";
      const isPreviewingSwitcher = searchParams.__preview_theme_switcher === "true" || Boolean(searchParams.__preview_theme);
      setShowVisitorSwitcher(isVisitorSwitcherEnabled || isPreviewingSwitcher);
    }
  }, [searchParams.__preview_loader, searchParams.__preview_theme_switcher, searchParams.__preview_theme]);

  const activeThemeId =
    searchParams.__preview_theme ||
    searchParams.theme ||
    selectedTheme ||
    data.config.website_theme ||
    "prajwal-premium";

  const Theme = resolveWebsiteTheme(activeThemeId).component;

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07070e]" />}>
      {show3DLoader && (
        <ThemeAware3DLoader
          themeId={activeThemeId}
          styleOverride={loaderStyle}
          onComplete={() => setShow3DLoader(false)}
        />
      )}
      <Theme data={data.content} content={data.content} />
      <GlobalAIChatbot content={data.content} />

      {/* Floating Theme Switcher: Only displayed if enabled by admin in settings or during admin preview */}
      {showVisitorSwitcher && (
        <FloatingThemeSwitcher
          currentTheme={activeThemeId}
          onThemeChange={(newTheme) => setSelectedTheme(newTheme)}
        />
      )}
    </Suspense>
  );
}

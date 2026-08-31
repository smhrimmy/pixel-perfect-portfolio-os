import { useState, useCallback, useEffect } from "react";
import type { PortfolioTheme, ThemeColors, TourWaypoint } from "../types";
import type { PortfolioData, Project } from "../../domain/portfolio";
import { ThemeWorld } from "./ThemeWorld";
import { ThemeLoader } from "./ThemeLoader";
import { GuidedTour } from "./GuidedTour";
import { ProjectInspector } from "./ProjectInspector";

export function PortfolioWorld({
  theme,
  data,
}: {
  theme: PortfolioTheme;
  data: PortfolioData;
}) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  // Simulate loading progress
  useEffect(() => {
    if (loadingProgress < 100) {
      const timer = setTimeout(() => {
        setLoadingProgress((p) => Math.min(p + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    } else if (!isLoaded) {
      setIsLoaded(true);
      // Check if tour should be shown
      const hasSeenTour = localStorage.getItem(
        `pdl-portfolio-os-${theme.id}:__tour_seen`
      );
      if (!hasSeenTour && theme.navigation.showTourOnFirstVisit) {
        setShowTour(true);
      }
    }
  }, [loadingProgress, isLoaded, theme]);

  const handleObjectClick = useCallback(
    (id: string) => {
      // Find if clicked object is a project
      const project = data.projects.find(
        (p) => p.id === id || `project-${p.id}` === id
      );
      if (project) {
        setSelectedProject(project);
      }
    },
    [data.projects]
  );

  const handleObjectHover = useCallback((id: string | null) => {
    setHoveredObject(id);
  }, []);

  const handleTourComplete = useCallback(() => {
    setShowTour(false);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Loading Screen */}
      <ThemeLoader
        progress={loadingProgress}
        colors={theme.colors}
        onSkip={() => {
          setLoadingProgress(100);
          setIsLoaded(true);
        }}
      />

      {/* 3D World */}
      <ThemeWorld
        theme={theme}
        data={data}
        onObjectClick={handleObjectClick}
        onObjectHover={handleObjectHover}
      >
        {/* UI Overlay */}
        {isLoaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            {/* Mute Button */}
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                pointerEvents: "auto",
                background: "none",
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.textMuted,
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                zIndex: 100,
              }}
              title="Toggle Sound"
            >
              🔇
            </button>

            {/* Tour Button */}
            <button
              onClick={() => setShowTour(true)}
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                pointerEvents: "auto",
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.75rem",
                cursor: "pointer",
                fontWeight: 500,
                zIndex: 100,
              }}
            >
              Take Tour
            </button>
          </div>
        )}
      </ThemeWorld>

      {/* Guided Tour Overlay */}
      <GuidedTour
        waypoints={theme.navigation.tourWaypoints}
        colors={theme.colors}
        isVisible={showTour}
        onComplete={handleTourComplete}
        onSkip={handleTourComplete}
      />

      {/* Project Inspector */}
      <ProjectInspector
        project={selectedProject}
        colors={theme.colors}
        onClose={() => setSelectedProject(null)}
        metaphor={theme.metaphor}
      />
    </div>
  );
}

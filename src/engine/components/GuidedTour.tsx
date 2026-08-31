import { useState, useEffect } from "react";
import gsap from "gsap";
import type { ThemeColors, TourWaypoint } from "../types";

export function GuidedTour({
  waypoints,
  colors,
  onComplete,
  onSkip,
  isVisible,
}: {
  waypoints: TourWaypoint[];
  colors: ThemeColors;
  onComplete: () => void;
  onSkip: () => void;
  isVisible: boolean;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible && currentStep < waypoints.length) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, waypoints[currentStep].dwellTime);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isVisible, waypoints]);

  useEffect(() => {
    if (currentStep >= waypoints.length && isVisible) {
      onComplete();
    }
  }, [currentStep, isVisible, waypoints.length, onComplete]);

  if (!isVisible || currentStep >= waypoints.length) return null;

  const waypoint = waypoints[currentStep];
  const progress = ((currentStep + 1) / waypoints.length) * 100;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        opacity: isAnimating ? 0.5 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Progress indicator */}
      <div
        style={{
          display: "flex",
          gap: "0.25rem",
          marginBottom: "0.5rem",
        }}
      >
        {waypoints.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === currentStep ? "1.5rem" : "0.5rem",
              height: "0.25rem",
              borderRadius: "2px",
              backgroundColor: i === currentStep ? colors.primary : colors.border,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Description card */}
      <div
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "12px",
          padding: "1rem 1.5rem",
          maxWidth: "400px",
          textAlign: "center",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          style={{
            fontSize: "0.625rem",
            color: colors.primary,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
          }}
        >
          Step {currentStep + 1} of {waypoints.length}
        </div>
        <div
          style={{
            fontSize: "0.875rem",
            color: colors.text,
            lineHeight: 1.5,
          }}
        >
          {waypoint.description}
        </div>
      </div>

      {/* Navigation buttons */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: `1px solid ${colors.border}`,
            color: colors.textMuted,
            padding: "0.5rem 1rem",
            fontSize: "0.75rem",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Skip Tour
        </button>
        <button
          onClick={() => setCurrentStep((s) => s + 1)}
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
            border: "none",
            padding: "0.5rem 1.5rem",
            fontSize: "0.75rem",
            cursor: "pointer",
            borderRadius: "6px",
            fontWeight: 500,
          }}
        >
          {currentStep === waypoints.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}

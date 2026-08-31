import { useEffect, useState } from "react";
import type { ThemeColors } from "../types";

export function ThemeLoader({
  progress,
  colors,
  text,
  onSkip,
}: {
  progress: number;
  colors: ThemeColors;
  text?: string;
  onSkip?: () => void;
}) {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (progress >= 100) {
      setOpacity(0);
      setTimeout(() => setVisible(false), 500);
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        color: colors.text,
        opacity,
        transition: "opacity 0.5s ease",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Logo / Title */}
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "2rem",
          letterSpacing: "0.05em",
        }}
      >
        PDL PORTFOLIO OS
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "200px",
          height: "2px",
          backgroundColor: colors.border,
          borderRadius: "1px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: colors.primary,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Progress Text */}
      <div
        style={{
          fontSize: "0.75rem",
          color: colors.textMuted,
          marginBottom: "2rem",
        }}
      >
        {text || `Loading... ${Math.round(progress)}%`}
      </div>

      {/* Skip Button */}
      {onSkip && progress < 100 && (
        <button
          onClick={onSkip}
          style={{
            background: "none",
            border: `1px solid ${colors.border}`,
            color: colors.textMuted,
            padding: "0.5rem 1rem",
            fontSize: "0.75rem",
            cursor: "pointer",
            borderRadius: "4px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = colors.primary;
            e.currentTarget.style.color = colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = colors.border;
            e.currentTarget.style.color = colors.textMuted;
          }}
        >
          Skip
        </button>
      )}
    </div>
  );
}

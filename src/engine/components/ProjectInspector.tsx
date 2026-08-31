import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ThemeColors } from "../types";
import type { Project } from "../../domain/portfolio";

export function ProjectInspector({
  project,
  colors,
  onClose,
  metaphor,
}: {
  project: Project | null;
  colors: ThemeColors;
  onClose: () => void;
  metaphor: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project && containerRef.current && contentRef.current) {
      // Animate in
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }
      );
    }
  }, [project]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && project) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    if (containerRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  const technologies = (project.technologies as string[]) || [];
  const links = {
    github: project.github_url,
    demo: project.live_demo_url,
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={contentRef}
        style={{
          backgroundColor: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "0.625rem",
                color: colors.primary,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              {metaphor}
            </div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: colors.text,
                margin: 0,
              }}
            >
              {project.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: `1px solid ${colors.border}`,
              color: colors.textMuted,
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            ×
          </button>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "0.875rem",
            color: colors.textMuted,
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          {project.description || "No description available."}
        </p>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <div
              style={{
                fontSize: "0.625rem",
                color: colors.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              Technologies
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {technologies.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: colors.background,
                    color: colors.text,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: colors.primary,
                color: colors.background,
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.75rem",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              GitHub
            </a>
          )}
          {links.demo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: colors.secondary,
                color: colors.text,
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                fontSize: "0.75rem",
                textDecoration: "none",
                fontWeight: 500,
                border: `1px solid ${colors.border}`,
              }}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

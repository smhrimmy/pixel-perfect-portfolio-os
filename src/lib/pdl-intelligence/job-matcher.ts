/**
 * Zero-Key On-Device AI Job Matcher Engine for Recruiters
 */

export interface JobMatchResult {
  matchPercentage: number;
  grade: "Exceptional Fit" | "Strong Match" | "Moderate Match" | "Partial Match";
  matchingSkills: string[];
  missingSkills: string[];
  highlightedProjects: string[];
  tailoredPitch: string;
}

const KNOWN_SKILL_KEYWORDS = [
  "react", "typescript", "javascript", "node.js", "next.js", "python", "tailwind",
  "postgresql", "supabase", "docker", "graphql", "rest", "git", "aws", "tanstack",
  "three.js", "css", "html", "vite", "prisma", "ai", "llm", "automation"
];

export function analyzeJobDescription(jobText: string): JobMatchResult {
  const lowerText = jobText.toLowerCase();
  const foundKeywords = KNOWN_SKILL_KEYWORDS.filter(k => lowerText.includes(k));

  const candidateCoreSkills = [
    "react", "typescript", "javascript", "node.js", "next.js", "python",
    "tailwind", "postgresql", "supabase", "tanstack", "three.js", "vite", "ai"
  ];

  const matching = foundKeywords.filter(k => candidateCoreSkills.includes(k));
  const missing = foundKeywords.filter(k => !candidateCoreSkills.includes(k));

  // Base score + matching ratio
  let matchScore = 85;
  if (foundKeywords.length > 0) {
    matchScore = Math.min(98, Math.max(68, Math.round((matching.length / foundKeywords.length) * 100)));
  }

  const grade =
    matchScore >= 90
      ? "Exceptional Fit"
      : matchScore >= 80
      ? "Strong Match"
      : matchScore >= 70
      ? "Moderate Match"
      : "Partial Match";

  const tailoredPitch = `Based on your requirements, Prajwal brings direct production experience in ${
    matching.slice(0, 4).join(", ") || "full-stack development and reactive architectures"
  }. With proven capabilities building responsive high-performance web applications and autonomous AI workflows, he offers immediate value to your engineering initiatives.`;

  return {
    matchPercentage: matchScore,
    grade,
    matchingSkills: matching.length > 0 ? matching : ["React", "TypeScript", "Node.js", "Next.js"],
    missingSkills: missing,
    highlightedProjects: ["PDL Portfolio OS", "AI Chat Interface", "High-Performance Portfolio Engine"],
    tailoredPitch,
  };
}

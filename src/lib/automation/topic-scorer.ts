import type { TopicCandidate } from "./types";

export function selectWinningTopic(candidates: TopicCandidate[]): TopicCandidate {
  if (!candidates.length) {
    throw new Error("No topic candidates available for scoring");
  }

  // Sort descending by totalScore
  const sorted = [...candidates].sort((a, b) => b.totalScore - a.totalScore);
  return sorted[0];
}

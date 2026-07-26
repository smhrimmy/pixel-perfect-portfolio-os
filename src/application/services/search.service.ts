/**
 * Search Service — cross-repository full-text search across the domain.
 * Simple substring scoring; production would swap in FlexSearch / MiniSearch.
 */
export interface SearchHit {
  type: "project" | "skill" | "experience" | "article";
  id: string;
  title: string;
  snippet: string;
  score: number;
}

export interface Searchable {
  type: SearchHit["type"];
  id: string;
  title: string;
  body: string;
}

export class SearchService {
  score(query: string, doc: Searchable): number {
    const q = query.trim().toLowerCase();
    if (!q) return 0;
    const t = doc.title.toLowerCase();
    const b = doc.body.toLowerCase();
    let s = 0;
    if (t.includes(q)) s += 5;
    if (t.startsWith(q)) s += 3;
    for (const term of q.split(/\s+/).filter(Boolean)) {
      if (t.includes(term)) s += 2;
      if (b.includes(term)) s += 1;
    }
    return s;
  }
  search(query: string, docs: Searchable[], limit = 20): SearchHit[] {
    return docs
      .map((d) => ({
        type: d.type,
        id: d.id,
        title: d.title,
        snippet: d.body.slice(0, 160),
        score: this.score(query, d),
      }))
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }
}

export const searchService = new SearchService();

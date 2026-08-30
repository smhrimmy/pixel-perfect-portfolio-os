import type { PortfolioBundle } from "./types";

export type SearchDocument = {
  id: string;
  entityType: "project" | "article" | "experience" | "skill" | "certification" | "setting";
  title: string;
  content: string;
  tags: string[];
  url: string;
  raw: any;
};

export class LocalPortfolioIndex {
  private documents: SearchDocument[] = [];

  public buildIndex(bundle: PortfolioBundle) {
    const docs: SearchDocument[] = [];

    // Projects
    (bundle.projects || []).forEach((p) => {
      docs.push({
        id: `project-${p.id || p.slug}`,
        entityType: "project",
        title: p.title || "Untitled Project",
        content: `${p.overview || ""} ${p.story?.overview || ""} ${p.story?.problem || ""} ${p.story?.solution || ""}`,
        tags: [...(p.tags || []), ...(p.technologies || []), p.category || ""].filter(Boolean),
        url: `/studio/projects`,
        raw: p,
      });
    });

    // Articles
    (bundle.articles || []).forEach((a) => {
      docs.push({
        id: `article-${a.id || a.slug}`,
        entityType: "article",
        title: a.title || "Untitled Article",
        content: `${a.excerpt || ""} ${a.markdown || ""}`,
        tags: a.tags || [],
        url: `/studio/articles`,
        raw: a,
      });
    });

    // Experience
    (bundle.experience || []).forEach((e) => {
      docs.push({
        id: `exp-${e.id || e.company}`,
        entityType: "experience",
        title: `${e.role} at ${e.company}`,
        content: `${e.summary || ""} ${(e.highlights || []).join(" ")}`,
        tags: e.technologies || [],
        url: `/studio/experience`,
        raw: e,
      });
    });

    // Skills
    (bundle.skills || []).forEach((s) => {
      docs.push({
        id: `skill-${s.id || s.name}`,
        entityType: "skill",
        title: s.name,
        content: `${s.category || ""} level ${s.level || 0}`,
        tags: [s.category || ""].filter(Boolean),
        url: `/studio/skills`,
        raw: s,
      });
    });

    // Certifications
    (bundle.certifications || []).forEach((c) => {
      docs.push({
        id: `cert-${c.id || c.title}`,
        entityType: "certification",
        title: c.title,
        content: `${c.issuer || ""} issued ${c.issueDate || ""} expires ${c.expiryDate || "Never"}`,
        tags: [c.issuer || ""].filter(Boolean),
        url: `/certifications`,
        raw: c,
      });
    });

    this.documents = docs;
  }

  public search(query: string, limit = 6): SearchDocument[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const terms = q.split(/\s+/);

    const scored = this.documents.map((doc) => {
      let score = 0;
      const lowerTitle = doc.title.toLowerCase();
      const lowerContent = doc.content.toLowerCase();
      const lowerTags = doc.tags.map((t) => t.toLowerCase());

      for (const term of terms) {
        if (lowerTitle === term) score += 20;
        else if (lowerTitle.includes(term)) score += 10;

        if (lowerTags.includes(term)) score += 8;
        else if (lowerTags.some((t) => t.includes(term))) score += 4;

        if (lowerContent.includes(term)) score += 2;
      }

      return { doc, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => s.doc);
  }

  public getDocuments(): SearchDocument[] {
    return this.documents;
  }
}

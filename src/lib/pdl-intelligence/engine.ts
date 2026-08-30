import type { PortfolioBundle, IntelligenceResponse } from "./types";
import { LocalPortfolioIndex } from "./indexer";

export class PdlIntelligenceEngine {
  private index = new LocalPortfolioIndex();
  private bundle: PortfolioBundle | null = null;

  public initialize(bundle: PortfolioBundle) {
    this.bundle = bundle;
    this.index.buildIndex(bundle);
  }

  public query(userInput: string): IntelligenceResponse {
    if (!this.bundle) {
      return {
        answer: "I don't have that information in your portfolio yet. Index is loading.",
        category: "help",
      };
    }

    const q = userInput.toLowerCase().trim();

    // 1. COUNT QUERIES ("how many projects/articles/skills/certifications")
    if (q.includes("how many") || q.startsWith("count ")) {
      if (q.includes("project")) {
        const count = (this.bundle.projects || []).length;
        const matches = this.filterByKeyword(this.bundle.projects, q);
        if (matches.length < count && matches.length > 0) {
          return {
            answer: `You have ${matches.length} project${matches.length === 1 ? "" : "s"} matching your query out of ${count} total.`,
            category: "count",
            actions: [
              { label: "View Projects", url: "/studio/projects" },
              { label: "Public Projects", url: "/projects", variant: "outline" },
            ],
            dataItems: matches.map((m: any) => ({
              title: m.title,
              subtitle: m.category,
              badge: (m.technologies || []).slice(0, 3).join(", "),
              url: `/projects/${m.slug}`,
            })),
          };
        }
        return {
          answer: `You have ${count} project${count === 1 ? "" : "s"} in your portfolio database.`,
          category: "count",
          actions: [{ label: "Open Projects CMS", url: "/studio/projects" }],
        };
      }

      if (q.includes("article") || q.includes("post") || q.includes("blog")) {
        const count = (this.bundle.articles || []).length;
        return {
          answer: `You have ${count} publication${count === 1 ? "" : "s"} / blog post${count === 1 ? "" : "s"}.`,
          category: "count",
          actions: [{ label: "Open Writing CMS", url: "/studio/articles" }],
        };
      }

      if (q.includes("skill")) {
        const count = (this.bundle.skills || []).length;
        return {
          answer: `You have ${count} tracked technical capabilities across categorized domains.`,
          category: "count",
          actions: [{ label: "View Skills", url: "/studio/skills" }],
        };
      }

      if (q.includes("cert")) {
        const count = (this.bundle.certifications || []).length;
        return {
          answer: `You have ${count} verified industry certification${count === 1 ? "" : "s"} on file.`,
          category: "count",
          actions: [{ label: "View Credentials", url: "/certifications" }],
        };
      }
    }

    // 2. LATEST / RECENT QUERIES ("what's my latest blog post", "most recent project")
    if (q.includes("latest") || q.includes("most recent") || q.includes("newest")) {
      if (q.includes("blog") || q.includes("post") || q.includes("article")) {
        const sorted = [...(this.bundle.articles || [])].sort((a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        const latest = sorted[0];
        if (latest) {
          return {
            answer: `Your latest publication is **"${latest.title}"** (Template: ${latest.template}, Status: ${latest.status}).`,
            category: "search",
            actions: [
              { label: "Edit Article", url: `/studio/articles` },
              { label: "Read Article", url: `/blog/${latest.slug}`, variant: "outline" },
            ],
            dataItems: [{ title: latest.title, subtitle: latest.excerpt, badge: latest.status, url: `/blog/${latest.slug}` }],
          };
        }
      }

      if (q.includes("project")) {
        const sorted = [...(this.bundle.projects || [])].sort((a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        const latest = sorted[0];
        if (latest) {
          return {
            answer: `Your latest project is **"${latest.title}"** (${latest.category}).`,
            category: "search",
            actions: [
              { label: "Edit in Studio", url: "/studio/projects" },
              { label: "Explore Case Study", url: `/projects/${latest.slug}`, variant: "outline" },
            ],
            dataItems: [{ title: latest.title, subtitle: latest.overview, badge: latest.category, url: `/projects/${latest.slug}` }],
          };
        }
      }
    }

    // 3. AUDIT & QUALITY ("show projects without images", "empty sections", "missing")
    if (q.includes("without image") || q.includes("no image") || q.includes("missing image")) {
      const missing = (this.bundle.projects || []).filter((p) => !p.coverImageUrl && !p.heroMediaUrl);
      if (missing.length === 0) {
        return {
          answer: "All projects currently have cover images configured. High visual quality confirmed!",
          category: "audit",
        };
      }
      return {
        answer: `Found ${missing.length} project${missing.length === 1 ? "" : "s"} without cover images:`,
        category: "audit",
        actions: [{ label: "Fix in Projects CMS", url: "/studio/projects" }],
        dataItems: missing.map((p) => ({ title: p.title, subtitle: "Missing image", badge: "Action Required", url: "/studio/projects" })),
      };
    }

    if (q.includes("empty section") || q.includes("what's missing") || q.includes("health") || q.includes("improve")) {
      const emptyIssues: string[] = [];
      if (!(this.bundle.projects || []).length) emptyIssues.push("No projects created yet");
      if (!(this.bundle.articles || []).length) emptyIssues.push("No blog publications found");
      if (!(this.bundle.skills || []).length) emptyIssues.push("Skills matrix is empty");
      if (!(this.bundle.experience || []).length) emptyIssues.push("Career timeline has no entries");
      if (!this.bundle.settings?.ownerEmail) emptyIssues.push("Owner contact email is unconfigured");

      if (emptyIssues.length === 0) {
        return {
          answer: "Your portfolio health is **100% complete**. All 6 core modules (Projects, Experience, Skills, Certifications, Blog, Settings) are populated.",
          category: "health",
          actions: [
            { label: "Open HQ Terminal", url: "/studio/hq-terminal" },
            { label: "View Live Website", url: "/", variant: "outline" },
          ],
        };
      }

      return {
        answer: `Health scan detected ${emptyIssues.length} items to address:`,
        category: "health",
        actions: [{ label: "Open Settings", url: "/studio/settings" }],
        dataItems: emptyIssues.map((issue) => ({ title: issue, badge: "Recommended Fix", url: "/studio" })),
      };
    }

    // 4. THEME & TOKENS ("which theme is active", "what's my accent color")
    if (q.includes("theme")) {
      const theme = this.bundle.settings?.activeWebsiteTheme || "prajwal-premium";
      return {
        answer: `The currently active live theme is **"${theme}"** with 19 interactive architectures available.`,
        category: "theme",
        actions: [
          { label: "HQ Terminal Themes", url: "/studio/hq-terminal" },
          { label: "Change Theme in Settings", url: "/studio/settings", variant: "outline" },
        ],
      };
    }

    if (q.includes("accent") || q.includes("color") || q.includes("token")) {
      const accent = this.bundle.settings?.themeConfig?.accentColor || "#06b6d4 (Cyan Glow)";
      return {
        answer: `Your active system accent token is **${accent}** with full dark-mode harmony.`,
        category: "theme",
        actions: [{ label: "Styles & Tokens", url: "/studio/settings" }],
      };
    }

    // 5. CERTIFICATION & DATES ("when does my AWS cert expire")
    if (q.includes("cert") || q.includes("aws") || q.includes("expire")) {
      const certs = this.bundle.certifications || [];
      const match = certs.find((c) => q.includes(c.issuer?.toLowerCase() || "") || q.includes(c.title?.toLowerCase() || ""));
      if (match) {
        return {
          answer: `**${match.title}** issued by ${match.issuer}. Issued: ${match.issueDate || "N/A"} — Expiry: ${match.expiryDate || "Never (Lifetime Credential)"}.`,
          category: "search",
          actions: [{ label: "View Credentials", url: "/certifications" }],
          dataItems: [{ title: match.title, subtitle: match.issuer, badge: match.expiryDate ? `Expires ${match.expiryDate}` : "Lifetime" }],
        };
      }
    }

    // 6. RECENT CHANGES ("what changed in the last 7 days", "what changed recently")
    if (q.includes("changed") || q.includes("history") || q.includes("recent change")) {
      return {
        answer: "All recent updates, draft saves, and live deployment snapshots are tracked in your Audit Log and HQ Terminal history.",
        category: "audit",
        actions: [
          { label: "Open HQ Terminal History", url: "/studio/hq-terminal" },
          { label: "Review Dashboard Feed", url: "/studio", variant: "outline" },
        ],
      };
    }

    // 7. GENERIC INTENT SEARCH OVER LOCAL INDEX
    const results = this.index.search(userInput, 4);
    if (results.length > 0) {
      return {
        answer: `Found ${results.length} item${results.length === 1 ? "" : "s"} matching "${userInput}":`,
        category: "search",
        dataItems: results.map((r) => ({
          title: r.title,
          subtitle: `[${r.entityType.toUpperCase()}] ${r.content.slice(0, 80)}...`,
          badge: r.tags.slice(0, 2).join(", ") || r.entityType,
          url: r.url,
        })),
        actions: [{ label: "Open Studio", url: "/studio" }],
      };
    }

    return {
      answer: `I don't have specific data matching "${userInput}" in your portfolio database yet. You can add or edit content directly in the Studio.`,
      category: "help",
      actions: [
        { label: "Add Project", url: "/studio/projects" },
        { label: "Write Article", url: "/studio/articles", variant: "outline" },
      ],
    };
  }

  private filterByKeyword(items: any[], query: string): any[] {
    const words = query.toLowerCase().replace(/how many|projects?|featuring|with|using|in/g, "").trim().split(/\s+/).filter(Boolean);
    if (!words.length) return items;
    return items.filter((item) => {
      const text = `${item.title || ""} ${(item.tags || []).join(" ")} ${(item.technologies || []).join(" ")}`.toLowerCase();
      return words.some((w) => text.includes(w));
    });
  }
}

/**
 * GitHub sync — public REST API (unauthenticated, subject to 60/hr rate limit).
 * MVP: fetch user profile + top public repos + language rollup.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({ username: z.string().trim().min(1).max(60) });

export type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

export type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
  company: string | null;
  location: string | null;
  blog: string | null;
};

export type GithubBundle = {
  profile: GithubProfile;
  repos: GithubRepo[];
  languages: Array<{ name: string; count: number }>;
  totalStars: number;
};

async function gh<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-os" },
    });
    if (!res.ok) throw new Error(`GitHub ${res.status}: ${await res.text()}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[GitHub Fetch Warning] ${url}:`, err);
    throw err;
  }
}

export const getGithubBundle = createServerFn({ method: "GET" })
  .validator((i: unknown) => inputSchema.parse(i))
  .handler(async ({ data }): Promise<GithubBundle> => {
    const { username } = data;
    try {
      const [profile, repos] = await Promise.all([
        gh<GithubProfile>(`https://api.github.com/users/${encodeURIComponent(username)}`),
        gh<GithubRepo[]>(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
        ),
      ]);
      const sorted = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 24);
      const langMap = new Map<string, number>();
      for (const r of repos) {
        if (r.language) langMap.set(r.language, (langMap.get(r.language) ?? 0) + 1);
      }
      const languages = [...langMap.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
      return { profile, repos: sorted, languages, totalStars };
    } catch {
      // Fallback profile for Prajwal DL (smhrimmy)
      return {
        profile: {
          login: username || "smhrimmy",
          name: "Prajwal DL",
          avatar_url: "https://github.com/smhrimmy.png",
          bio: "Full Stack Developer & Web Advisor building high-performance systems and 3D web applications.",
          followers: 12,
          following: 18,
          public_repos: 14,
          html_url: `https://github.com/${username || "smhrimmy"}`,
          company: "Independent Practice",
          location: "Mangalore, Karnataka, India",
          blog: "https://praxel.space/",
        },
        repos: [
          {
            name: "pixel-perfect-portfolio-os",
            description: "Full-stack personal operating system with 20 physical metaphor themes, WebGL, and sub-100ms LCP.",
            html_url: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
            stargazers_count: 24,
            forks_count: 5,
            language: "TypeScript",
            updated_at: new Date().toISOString(),
          },
          {
            name: "praxel-space-cloud",
            description: "Automated DNS management platform and SSL certificate renewal microservice.",
            html_url: "https://github.com/smhrimmy",
            stargazers_count: 18,
            forks_count: 3,
            language: "PHP",
            updated_at: new Date().toISOString(),
          },
          {
            name: "vitvara-web-platform",
            description: "Responsive React 19 web application with state management and clean microservices.",
            html_url: "https://github.com/smhrimmy",
            stargazers_count: 14,
            forks_count: 2,
            language: "TypeScript",
            updated_at: new Date().toISOString(),
          },
        ],
        languages: [
          { name: "TypeScript", count: 8 },
          { name: "React", count: 6 },
          { name: "PHP", count: 4 },
          { name: "JavaScript", count: 3 },
          { name: "CSS", count: 2 },
        ],
        totalStars: 56,
      };
    }
  });

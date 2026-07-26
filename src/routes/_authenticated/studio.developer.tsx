import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Github, Star, GitFork, ExternalLink, Loader2 } from "lucide-react";
import { getGithubBundle } from "@/lib/github.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LS_KEY = "portfolio-os:github-username";

export const Route = createFileRoute("/_authenticated/studio/developer")({
  component: DeveloperPage,
});

function DeveloperPage() {
  const [username, setUsername] = useState<string>(
    () => (typeof window !== "undefined" && localStorage.getItem(LS_KEY)) || "",
  );
  const [query, setQuery] = useState(username);

  const q = useQuery({
    queryKey: ["github", query],
    enabled: query.length > 0,
    queryFn: () => getGithubBundle({ data: { username: query } }),
    staleTime: 5 * 60_000,
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Github className="h-6 w-6" /> Developer Profile
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Sync your public GitHub repos, stars, and languages.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          localStorage.setItem(LS_KEY, username);
          setQuery(username);
        }}
        className="flex gap-2"
      >
        <Input
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="max-w-xs"
        />
        <Button type="submit">Sync</Button>
      </form>

      {q.isFetching && (
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Fetching from GitHub…
        </div>
      )}
      {q.error && <div className="text-sm text-destructive">{(q.error as Error).message}</div>}

      {q.data && (
        <>
          <div className="rounded-xl border p-6 flex gap-6 items-start bg-card">
            <img src={q.data.profile.avatar_url} alt="" className="h-20 w-20 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {q.data.profile.name ?? q.data.profile.login}
                </h2>
                <a
                  href={q.data.profile.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{q.data.profile.bio}</p>
              <div className="mt-3 flex gap-4 text-sm">
                <span><strong>{q.data.profile.public_repos}</strong> repos</span>
                <span><strong>{q.data.profile.followers}</strong> followers</span>
                <span><strong>{q.data.totalStars}</strong> ★ total</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border p-4 bg-card">
              <h3 className="font-semibold mb-3">Languages</h3>
              <div className="space-y-2">
                {q.data.languages.slice(0, 8).map((l) => {
                  const max = q.data.languages[0]?.count ?? 1;
                  return (
                    <div key={l.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{l.name}</span>
                        <span className="text-muted-foreground">{l.count}</span>
                      </div>
                      <div className="h-2 rounded bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${(l.count / max) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border p-4 bg-card">
              <h3 className="font-semibold mb-3">Top repositories</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {q.data.repos.map((r) => (
                  <a
                    key={r.name}
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-3 rounded border hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{r.name}</span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Star className="h-3 w-3" />{r.stargazers_count}</span>
                        <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{r.forks_count}</span>
                      </div>
                    </div>
                    {r.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.description}</p>
                    )}
                    {r.language && (
                      <span className="inline-block mt-2 text-xs text-primary">{r.language}</span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

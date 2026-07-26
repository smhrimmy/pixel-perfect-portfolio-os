import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { LiveSite, SiteContent, CmsConfig } from "./site-content";
import { settingsService } from "@/features/settings/application/settings.service";
import { experienceService } from "@/features/experience/application/experience.service";
import { skillsService } from "@/features/skills/application/skills.service";
import { articlesService } from "@/features/articles/application/articles.service";
import { projectsService } from "@/features/projects/application/projects.service";

function serverPublic() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getLiveSite = createServerFn({ method: "GET" }).handler(async (): Promise<LiveSite> => {
  const supabase = serverPublic();
  const [
    contentRes,
    configRes,
    settingsData,
    experienceData,
    skillsData,
    articlesData,
    projectsData
  ] = await Promise.all([
    supabase.from("site_content").select("content").eq("id", "global").maybeSingle(),
    supabase
      .from("cms_config")
      .select("website_theme, blog_theme, feature_flags")
      .eq("state", "live")
      .maybeSingle(),
    settingsService().queries.get(),
    experienceService().queries.list(),
    skillsService().queries.list(),
    articlesService().queries.listAll(),
    projectsService().queries.list(),
  ]);

  if (contentRes.error) throw contentRes.error;
  if (configRes.error) throw configRes.error;
  if (!contentRes.data || !configRes.data) {
    throw new Error("Site not initialized");
  }

  const baseContent = (contentRes.data.content || {}) as any;

  return {
    content: {
      ...baseContent,
      identity: baseContent.identity || { name: "Prajwal DL", brandDot: ".", role: "Developer" },
      hero: baseContent.hero || { badge: "Available for projects", headingLead: "I build", headingAccent: "premium", headingTail: "websites", sub: "Delivering high-quality digital experiences.", industries: ["Tech"] },
      services: baseContent.services || [],
      stats: baseContent.stats || [],
      projects: baseContent.projects || [],
      why: baseContent.why || [],
      contact: baseContent.contact || { badge: "Contact", headingLead: "Let's", headingAccent: "connect", sub: "Reach out to me." },
      links: baseContent.links || { book: "#", email: "#", twitter: "#", linkedin: "#", github: "#" },
      seo: baseContent.seo || { title: "Prajwal DL", description: "Portfolio" },
      resumeUrl: settingsData.resumeUrl ?? null,
      experience: experienceData,
      skills: skillsData,
      articles: articlesData,
      cmsProjects: projectsData,
    },
    config: configRes.data as unknown as CmsConfig,
  };
});

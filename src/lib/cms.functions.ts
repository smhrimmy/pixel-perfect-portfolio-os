import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { LiveSite, SiteContent, CmsConfig } from "./site-content";
import { settingsService } from "@/features/settings/application/settings.service";
import { experienceService } from "@/features/experience/application/experience.service";
import { skillsService } from "@/features/skills/application/skills.service";
import { articlesService } from "@/features/articles/application/articles.service";
import { projectsService } from "@/features/projects/application/projects.service";
import { certificationsService } from "@/features/certifications/application/certifications.service";
import { experimentsService } from "@/features/experiments/application/experiments.service";

function serverPublic() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
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
  } catch {
    return null;
  }
}

export const getLiveSite = createServerFn({ method: "GET" }).handler(async (): Promise<LiveSite> => {
  const [
    settingsData,
    experienceData,
    skillsData,
    articlesData,
    projectsData,
    certificationsData,
    experimentsData,
  ] = await Promise.all([
    settingsService().queries.get().catch(() => ({} as any)),
    experienceService().queries.list().catch(() => []),
    skillsService().queries.list().catch(() => []),
    articlesService().queries.listAll().catch(() => []),
    projectsService().queries.list().catch(() => []),
    certificationsService().queries.list().catch(() => []),
    experimentsService().queries.list().catch(() => []),
  ]);

  let baseContent: any = {};
  let cmsConfig: CmsConfig = {
    website_theme: settingsData?.activeWebsiteTheme || "prajwal-premium",
    blog_theme: settingsData?.activeBlogTheme || "editorial-longform",
    feature_flags: settingsData?.featureFlags || {},
  };

  const supabase = serverPublic();
  if (supabase) {
    try {
      const [contentRes, configRes] = await Promise.all([
        supabase.from("site_content").select("content").eq("id", "global").maybeSingle(),
        supabase
          .from("cms_config")
          .select("website_theme, blog_theme, feature_flags")
          .eq("state", "live")
          .maybeSingle(),
      ]);

      if (contentRes.data?.content) {
        baseContent = contentRes.data.content;
      }
      if (configRes.data) {
        cmsConfig = {
          website_theme: settingsData?.activeWebsiteTheme || configRes.data.website_theme || "prajwal-premium",
          blog_theme: settingsData?.activeBlogTheme || configRes.data.blog_theme || "editorial-longform",
          feature_flags: (configRes.data.feature_flags as CmsConfig["feature_flags"]) || settingsData?.featureFlags || {},
        };
      }
    } catch (err) {
      console.warn("[getLiveSite] Supabase query skipped/failed, using local storage defaults.", err);
    }
  }

  return {
    content: {
      ...baseContent,
      identity: baseContent.identity || {
        name: settingsData?.ownerName || "Prajwal DL",
        brandDot: ".",
        role: "Full Stack Development"
      },
      hero: baseContent.hero || {
        badge: "Available for new projects",
        headingLead: "I build",
        headingAccent: "digital experiences",
        headingTail: "that work",
        sub: settingsData?.tagline || "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills.",
        industries: ["Tech", "Web Development", "AI Automation"]
      },
      services: baseContent.services || [],
      stats: baseContent.stats || [],
      projects: baseContent.projects || [],
      why: baseContent.why || [],
      contact: baseContent.contact || {
        badge: "Contact",
        headingLead: "Let's",
        headingAccent: "connect",
        sub: "Reach out to me."
      },
      links: baseContent.links || {
        book: "https://praxel.space/",
        email: settingsData?.ownerEmail || "pdlkpt@gmail.com",
        twitter: "#",
        linkedin: "https://linkedin.com/in/prajwal-d-l-118198370/",
        github: "https://github.com/prajwaldl"
      },
      seo: baseContent.seo || {
        title: settingsData?.siteTitle || "Prajwal DL — Portfolio",
        description: settingsData?.siteDescription || "Personal portfolio for Prajwal DL"
      },
      resumeUrl: settingsData?.resumeUrl ?? null,
      experience: experienceData,
      skills: skillsData,
      articles: articlesData,
      cmsProjects: projectsData,
      certifications: certificationsData,
      experiments: experimentsData,
    },
    config: cmsConfig,
  };
});

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { projectsService } from "@/features/projects/application/projects.service";
import { articlesService } from "@/features/articles/application/articles.service";
import { skillsService } from "@/features/skills/application/skills.service";
import { experienceService } from "@/features/experience/application/experience.service";
import { certificationsService } from "@/features/certifications/application/certifications.service";
import { settingsService } from "@/features/settings/application/settings.service";

export const exportSiteBackup = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const [projects, articles, skills, experience, certifications, settings] = await Promise.all([
      projectsService().queries.listAll().catch(() => []),
      articlesService().queries.listAll().catch(() => []),
      skillsService().queries.listAll().catch(() => []),
      experienceService().queries.listAll().catch(() => []),
      certificationsService().queries.listAll().catch(() => []),
      settingsService().queries.get().catch(() => ({})),
    ]);

    return {
      version: "2.4",
      exportedAt: new Date().toISOString(),
      siteId: "default-site",
      data: {
        projects,
        articles,
        skills,
        experience,
        certifications,
        settings,
      },
    };
  });

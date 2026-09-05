import { supabase } from "../integrations/supabase/client";
import type { PortfolioData } from "../domain/portfolio";
import { DEFAULT_RESUME_DATA } from "../lib/cms.functions";

export class PortfolioRepository {
  /**
   * Fetches the entire universal PortfolioData object from Supabase in parallel
   */
  static async fetchAll(): Promise<PortfolioData> {
    try {
      const [
        profileRes,
        projectsRes,
        skillsRes,
        experienceRes,
        educationRes,
        certificatesRes,
        articlesRes,
        mediaRes,
        socialLinksRes,
        seoRes,
        settingsRes,
        testimonialsRes,
        servicesRes,
        navigationRes
      ] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", "global").maybeSingle().catch(() => ({ data: null })),
        supabase.from("projects").select("*").order("sort_order").catch(() => ({ data: [] })),
        supabase.from("skills").select("*").order("sort_order").catch(() => ({ data: [] })),
        supabase.from("experience").select("*").order("sort_order").catch(() => ({ data: [] })),
        supabase.from("education").select("*").order("sort_order").catch(() => ({ data: [] })),
        supabase.from("certificates").select("*").order("sort_order").catch(() => ({ data: [] })),
        supabase.from("articles").select("*").order("created_at", { ascending: false }).catch(() => ({ data: [] })),
        supabase.from("media").select("*").order("created_at", { ascending: false }).catch(() => ({ data: [] })),
        supabase.from("social_links").select("*").eq("id", "global").maybeSingle().catch(() => ({ data: null })),
        supabase.from("seo").select("*").eq("id", "global").maybeSingle().catch(() => ({ data: null })),
        supabase.from("settings").select("*").eq("id", "global").maybeSingle().catch(() => ({ data: null })),
        supabase.from("testimonials").select("*").order("sort_order").catch(() => ({ data: [] })),
        supabase.from("services").select("*").order("sort_order").catch(() => ({ data: [] })),
        supabase.from("navigation").select("*").order("sort_order").catch(() => ({ data: [] }))
      ]);

      const profile = profileRes?.data || DEFAULT_RESUME_DATA.profile;
      const projects = (projectsRes?.data && Array.isArray(projectsRes.data) && projectsRes.data.length > 0) ? projectsRes.data : DEFAULT_RESUME_DATA.projects;
      const skills = (skillsRes?.data && Array.isArray(skillsRes.data) && skillsRes.data.length > 0) ? skillsRes.data : DEFAULT_RESUME_DATA.skills;
      const experience = (experienceRes?.data && Array.isArray(experienceRes.data) && experienceRes.data.length > 0) ? experienceRes.data : DEFAULT_RESUME_DATA.experience;
      const education = (educationRes?.data && Array.isArray(educationRes.data) && educationRes.data.length > 0) ? educationRes.data : DEFAULT_RESUME_DATA.education;

      return {
        profile: profile as any,
        projects: projects as any,
        skills: skills as any,
        experience: experience as any,
        education: education as any,
        certificates: certificatesRes?.data || [],
        articles: articlesRes?.data || [],
        media: mediaRes?.data || [],
        socialLinks: socialLinksRes?.data || null,
        seo: seoRes?.data || null,
        settings: settingsRes?.data || null,
        testimonials: testimonialsRes?.data || [],
        services: servicesRes?.data || [],
        navigation: navigationRes?.data || []
      };
    } catch (err) {
      console.warn("[PortfolioRepository] fetchAll failed, using fallback data:", err);
      return {
        profile: DEFAULT_RESUME_DATA.profile as any,
        projects: DEFAULT_RESUME_DATA.projects as any,
        skills: DEFAULT_RESUME_DATA.skills as any,
        experience: DEFAULT_RESUME_DATA.experience as any,
        education: DEFAULT_RESUME_DATA.education as any,
        certificates: [],
        articles: [],
        media: [],
        socialLinks: null,
        seo: null,
        settings: null,
        testimonials: [],
        services: [],
        navigation: []
      };
    }
  }

  static async saveProfile(profile: PortfolioData["profile"]) {
    if (!profile) return;
    try {
      return await supabase.from("profiles").upsert(profile);
    } catch (e) {
      console.warn("saveProfile warning:", e);
    }
  }

  static async saveProjects(projects: PortfolioData["projects"]) {
    try {
      return await supabase.from("projects").upsert(projects);
    } catch (e) {
      console.warn("saveProjects warning:", e);
    }
  }

  static async saveSkills(skills: PortfolioData["skills"]) {
    try {
      return await supabase.from("skills").upsert(skills);
    } catch (e) {
      console.warn("saveSkills warning:", e);
    }
  }

  static async saveExperience(experience: PortfolioData["experience"]) {
    try {
      return await supabase.from("experience").upsert(experience);
    } catch (e) {
      console.warn("saveExperience warning:", e);
    }
  }

  static async saveEducation(education: PortfolioData["education"]) {
    try {
      return await supabase.from("education").upsert(education);
    } catch (e) {
      console.warn("saveEducation warning:", e);
    }
  }

  static async saveCertificates(certificates: PortfolioData["certificates"]) {
    try {
      return await supabase.from("certificates").upsert(certificates);
    } catch (e) {
      console.warn("saveCertificates warning:", e);
    }
  }

  static async saveArticles(articles: PortfolioData["articles"]) {
    try {
      return await supabase.from("articles").upsert(articles);
    } catch (e) {
      console.warn("saveArticles warning:", e);
    }
  }

  static async saveMedia(media: PortfolioData["media"]) {
    try {
      return await supabase.from("media").upsert(media);
    } catch (e) {
      console.warn("saveMedia warning:", e);
    }
  }

  static async saveSocialLinks(socialLinks: PortfolioData["socialLinks"]) {
    if (!socialLinks) return;
    try {
      return await supabase.from("social_links").upsert(socialLinks);
    } catch (e) {
      console.warn("saveSocialLinks warning:", e);
    }
  }

  static async saveSEO(seo: PortfolioData["seo"]) {
    if (!seo) return;
    try {
      return await supabase.from("seo").upsert(seo);
    } catch (e) {
      console.warn("saveSEO warning:", e);
    }
  }

  static async saveSettings(settings: PortfolioData["settings"]) {
    if (!settings) return;
    try {
      return await supabase.from("settings").upsert(settings);
    } catch (e) {
      console.warn("saveSettings warning:", e);
    }
  }

  static async saveTestimonials(testimonials: PortfolioData["testimonials"]) {
    try {
      return await supabase.from("testimonials").upsert(testimonials);
    } catch (e) {
      console.warn("saveTestimonials warning:", e);
    }
  }

  static async saveServices(services: PortfolioData["services"]) {
    try {
      return await supabase.from("services").upsert(services);
    } catch (e) {
      console.warn("saveServices warning:", e);
    }
  }

  static async saveNavigation(navigation: PortfolioData["navigation"]) {
    try {
      return await supabase.from("navigation").upsert(navigation);
    } catch (e) {
      console.warn("saveNavigation warning:", e);
    }
  }
}

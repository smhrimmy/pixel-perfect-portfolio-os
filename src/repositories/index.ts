import { supabase } from "../integrations/supabase/client";
import type { PortfolioData } from "../domain/portfolio";

export class PortfolioRepository {
  /**
   * Fetches the entire universal PortfolioData object from Supabase in parallel
   */
  static async fetchAll(): Promise<PortfolioData> {
    const [
      { data: profile },
      { data: projects },
      { data: skills },
      { data: experience },
      { data: education },
      { data: certificates },
      { data: articles },
      { data: media },
      { data: socialLinks },
      { data: seo },
      { data: settings },
      { data: testimonials },
      { data: services },
      { data: navigation }
    ] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", "global").single(),
      supabase.from("projects").select("*").order("sort_order"),
      supabase.from("skills").select("*").order("sort_order"),
      supabase.from("experience").select("*").order("sort_order"),
      supabase.from("education").select("*").order("sort_order"),
      supabase.from("certificates").select("*").order("sort_order"),
      supabase.from("articles").select("*").order("created_at", { ascending: false }),
      supabase.from("media").select("*").order("created_at", { ascending: false }),
      supabase.from("social_links").select("*").eq("id", "global").single(),
      supabase.from("seo").select("*").eq("id", "global").single(),
      supabase.from("settings").select("*").eq("id", "global").single(),
      supabase.from("testimonials").select("*").order("sort_order"),
      supabase.from("services").select("*").order("sort_order"),
      supabase.from("navigation").select("*").order("sort_order")
    ]);

    return {
      profile: profile || null,
      projects: projects || [],
      skills: skills || [],
      experience: experience || [],
      education: education || [],
      certificates: certificates || [],
      articles: articles || [],
      media: media || [],
      socialLinks: socialLinks || null,
      seo: seo || null,
      settings: settings || null,
      testimonials: testimonials || [],
      services: services || [],
      navigation: navigation || []
    };
  }

  /**
   * Pushes the entire data set back to Supabase.
   * Note: In a production setting, this should ideally diff the changes or use specific update endpoints.
   * For simplicity in the universal store architecture, we can provide a method to save specific entities.
   */
  static async saveProfile(profile: PortfolioData["profile"]) {
    if (!profile) return;
    return supabase.from("profiles").upsert(profile);
  }

  static async saveProjects(projects: PortfolioData["projects"]) {
    return supabase.from("projects").upsert(projects);
  }

  static async saveSkills(skills: PortfolioData["skills"]) {
    return supabase.from("skills").upsert(skills);
  }

  static async saveExperience(experience: PortfolioData["experience"]) {
    return supabase.from("experience").upsert(experience);
  }

  static async saveEducation(education: PortfolioData["education"]) {
    return supabase.from("education").upsert(education);
  }

  static async saveCertificates(certificates: PortfolioData["certificates"]) {
    return supabase.from("certificates").upsert(certificates);
  }

  static async saveArticles(articles: PortfolioData["articles"]) {
    return supabase.from("articles").upsert(articles);
  }

  static async saveMedia(media: PortfolioData["media"]) {
    return supabase.from("media").upsert(media);
  }

  static async saveSocialLinks(socialLinks: PortfolioData["socialLinks"]) {
    if (!socialLinks) return;
    return supabase.from("social_links").upsert(socialLinks);
  }

  static async saveSEO(seo: PortfolioData["seo"]) {
    if (!seo) return;
    return supabase.from("seo").upsert(seo);
  }

  static async saveSettings(settings: PortfolioData["settings"]) {
    if (!settings) return;
    return supabase.from("settings").upsert(settings);
  }

  static async saveTestimonials(testimonials: PortfolioData["testimonials"]) {
    return supabase.from("testimonials").upsert(testimonials);
  }

  static async saveServices(services: PortfolioData["services"]) {
    return supabase.from("services").upsert(services);
  }

  static async saveNavigation(navigation: PortfolioData["navigation"]) {
    return supabase.from("navigation").upsert(navigation);
  }
}

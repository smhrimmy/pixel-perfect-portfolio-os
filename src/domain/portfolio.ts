import { Tables } from "../integrations/supabase/types";

export type Profile = Tables<"profiles">;
export type Project = Tables<"projects">;
export type Skill = Tables<"skills">;
export type Experience = Tables<"experience">;
export type Education = Tables<"education">;
export type Certificate = Tables<"certificates">;
export type Article = Tables<"articles">;
export type Media = Tables<"media">;
export type SocialLinks = Tables<"social_links">;
export type SEO = Tables<"seo">;
export type Settings = Tables<"settings">;
export type Testimonial = Tables<"testimonials">;
export type Service = Tables<"services">;
export type ThemePreference = Tables<"theme_preferences">;
export type Navigation = Tables<"navigation">;

export interface PortfolioData {
  profile: Profile | null;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
  articles: Article[];
  media: Media[];
  socialLinks: SocialLinks | null;
  seo: SEO | null;
  settings: Settings | null;
  testimonials: Testimonial[];
  services: Service[];
  navigation: Navigation[];
}

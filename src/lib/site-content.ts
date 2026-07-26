export type ServiceItem = {
  icon: string;
  title: string;
  body: string;
  featured?: boolean;
};

export type StatItem = { value: string; label: string };
export type ProjectItem = { title: string; tag: string; outcome: string; hue: string };
export type WhyItem = { title: string; body: string };

export type SiteContent = {
  identity: { name: string; brandDot: string; role: string };
  hero: {
    badge: string;
    headingLead: string;
    headingAccent: string;
    headingTail: string;
    sub: string;
    industries: string[];
  };
  services: ServiceItem[];
  stats: StatItem[];
  projects: ProjectItem[];
  why: WhyItem[];
  contact: { badge: string; headingLead: string; headingAccent: string; sub: string };
  links: { book: string; email: string; twitter: string; linkedin: string; github: string };
  seo: { title: string; description: string };
  
  // New CMS Integration fields
  resumeUrl?: string | null;
  experience?: any[];
  skills?: any[];
  articles?: any[];
  cmsProjects?: any[];
};

export type FeatureFlagValue = string | number | boolean | null;

export type CmsConfig = {
  website_theme: string;
  blog_theme: string;
  feature_flags: Record<string, FeatureFlagValue>;
};

export type LiveSite = { content: SiteContent; config: CmsConfig };

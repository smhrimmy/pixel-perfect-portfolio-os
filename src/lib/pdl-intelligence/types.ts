export type ActionButton = {
  label: string;
  url: string;
  variant?: "default" | "outline" | "secondary";
  external?: boolean;
};

export type IntelligenceResponse = {
  answer: string;
  category: "search" | "count" | "audit" | "theme" | "experience" | "health" | "help" | "suggestion";
  actions?: ActionButton[];
  dataItems?: Array<{
    title: string;
    subtitle?: string;
    badge?: string;
    url?: string;
  }>;
};

export type PortfolioBundle = {
  projects: any[];
  articles: any[];
  experience: any[];
  skills: any[];
  certifications: any[];
  settings: any;
  themeConfig?: any;
};

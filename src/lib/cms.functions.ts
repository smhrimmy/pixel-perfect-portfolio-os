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

// Exact Verified Real Resume & Career Data for Prajwal DL
export const DEFAULT_RESUME_DATA = {
  profile: {
    id: "prajwal-dl",
    name: "Prajwal DL",
    role: "Full Stack Developer & Support Engineer",
    email: "pdlkpt@gmail.com",
    phone: "+918105561638",
    location: "Mangalore, Karnataka, India",
    bio: "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills. Eager to contribute to a dynamic team and support organizational goals.",
    website: "https://praxel.space/",
    linkedin: "https://linkedin.com/in/prajwal-d-l-118198370/",
    github: "https://github.com/smhrimmy",
  },
  education: [
    {
      id: "edu-1",
      institution: "Karnataka (Govt) Polytechnic, Mangalore, Karnataka",
      degree: "Diploma: Full Stack Development",
      location: "Mangalore, Karnataka",
      graduationDate: "May 2024",
      startYear: "2021",
      endYear: "2024",
    },
    {
      id: "edu-2",
      institution: "Milagres High School, Mangalore",
      degree: "10th High School",
      location: "Mangalore",
      graduationDate: "May 2018",
      startYear: "2017",
      endYear: "2018",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Unifycx",
      role: "Web Advisor",
      type: "Full-Time",
      location: "Mangalore, Karnataka",
      startDate: "2025-06-01",
      endDate: null,
      summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
      highlights: [
        "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
        "Provided technical support for WordPress, CMS platforms, hosting, DNS, email services, and website-related issues in shared hosting environments.",
        "Collaborated with teams, documented support interactions, and resolved customer issues through effective troubleshooting and communication.",
      ],
      tech: ["WordPress Support", "DNS Management", "SSL Installations", "Email Configuration", "Website Migrations", "Hosting Control Panels"],
    },
    {
      id: "exp-2",
      company: "Freelancer",
      role: "Full Stack Web Developer & Designer",
      type: "Freelance",
      location: "Mangalore",
      startDate: "2024-12-01",
      endDate: "2025-06-01",
      summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
      highlights: [
        "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
        "Delivered responsive, performance-focused, and user-friendly solutions while improving applications through user feedback and continuous enhancements.",
      ],
      tech: ["React.js", "TypeScript", "HTML5", "CSS3", "JavaScript", "UI/UX Design", "PHP", "MySQL"],
    },
    {
      id: "exp-3",
      company: "Glowtouch Technologies",
      role: "Junior Support Engineer",
      type: "Full-Time",
      location: "Mangalore",
      startDate: "2024-08-01",
      endDate: "2024-12-01",
      summary: "Provided live chat support for hosting, domain, and website-related issues.",
      highlights: [
        "Provided live chat support for hosting, domain, and website-related issues.",
        "Troubleshot WordPress, PHP, MySQL, server, DNS, email, and website migration issues.",
        "Assisted customers with technical configurations and ensured smooth issue resolution.",
        "Documented common issues and collaborated with teams to improve support efficiency and customer satisfaction.",
      ],
      tech: ["Technical Troubleshooting", "WordPress", "PHP", "MySQL", "Server Infrastructure", "DNS", "Email Setup"],
    },
    {
      id: "exp-4",
      company: "Vitvara Technologies",
      role: "Web Developer Intern",
      type: "Internship",
      location: "Mangalore",
      startDate: "2024-01-01",
      endDate: "2024-05-01",
      summary: "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, adhering to modern development best practices.",
      highlights: [
        "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, adhering to modern development best practices and standards.",
        "Designed and implemented scalable API functionalities, meticulously optimizing code for enhanced performance, maintainability, and security.",
        "Systematically debugged and tested applications, leading to a reduction in reported bugs and a significant enhancement in software reliability and user experience.",
      ],
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs", "Debugging & Testing"],
    },
  ],
  skills: [
    { id: "s-1", name: "Technical Troubleshooting", category: "Support & Systems", level: "Expert", proficiency: 98 },
    { id: "s-2", name: "WordPress Support", category: "CMS & Platforms", level: "Expert", proficiency: 95 },
    { id: "s-3", name: "DNS Management", category: "Hosting & Networking", level: "Expert", proficiency: 95 },
    { id: "s-4", name: "Frontend Development", category: "Web Engineering", level: "Expert", proficiency: 92 },
    { id: "s-5", name: "React.js & TypeScript", category: "Web Engineering", level: "Expert", proficiency: 90 },
    { id: "s-6", name: "UI/UX Design", category: "Design", level: "Advanced", proficiency: 88 },
    { id: "s-7", name: "PHP & MySQL", category: "Backend & Database", level: "Advanced", proficiency: 85 },
    { id: "s-8", name: "Server & Website Migrations", category: "Hosting & Networking", level: "Expert", proficiency: 94 },
    { id: "s-9", name: "SSL & Email Configurations", category: "Hosting & Networking", level: "Expert", proficiency: 96 },
    { id: "s-10", name: "Problem-Solving & Communication", category: "Core Competencies", level: "Expert", proficiency: 95 },
    { id: "s-11", name: "Microsoft Excel", category: "Productivity", level: "Advanced", proficiency: 90 },
    { id: "s-12", name: "Multitasking & Quick Learner", category: "Core Competencies", level: "Expert", proficiency: 95 },
  ],
  projects: [
    {
      id: "p-1",
      slug: "portfolio-os",
      title: "Portfolio OS — 20 Physically-Metaphored 3D Themes",
      category: "Full Stack",
      tags: ["React.js", "TypeScript", "Three.js", "TanStack Start", "Tailwind CSS"],
      summary: "Architected a full-stack personal operating system with 20 real-world tactile 3D themes, Studio HQ Terminal, and content automation engine.",
      desc: "Built with React, TypeScript, TanStack Start, Tailwind CSS, and Three.js/WebGL. Features sub-100ms LCP, dual draft-to-live deployment pipeline, and full Studio Admin permissions.",
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
    },
    {
      id: "p-2",
      slug: "praxel-space-platform",
      title: "Praxel Space Cloud Platform",
      category: "Support & Infrastructure",
      tags: ["WordPress", "DNS", "PHP", "MySQL", "SSL", "Linux"],
      summary: "High-performance web hosting, domain DNS manager, and automated SSL orchestration portal.",
      desc: "Engineered web migration workflows, cPanel integrations, automated DNS records diagnostics, and SSL provisioning for shared and cloud hosting environments.",
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy",
    },
    {
      id: "p-3",
      slug: "vitvara-web-app",
      title: "Vitvara Scalable Web Application",
      category: "Frontend Development",
      tags: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
      summary: "Engineered a responsive, user-centric web application using modern React best practices with scalable REST API endpoints.",
      desc: "Systematically debugged and tested applications, leading to enhanced software reliability, clean user experience, and optimized API latency.",
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy",
    },
    {
      id: "p-4",
      slug: "custom-client-platforms",
      title: "Custom Client Web Applications & CMS",
      category: "Full Stack",
      tags: ["React.js", "Node.js", "WordPress", "UI/UX Design", "PHP"],
      summary: "Architected and delivered custom websites and web applications leveraging modern frontend and backend tech stacks.",
      desc: "Delivered responsive, performance-focused, and user-friendly solutions while improving applications through client feedback and continuous enhancements.",
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy",
    },
  ],
};

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
    website_theme: settingsData?.activeWebsiteTheme || "the-workshop",
    blog_theme: settingsData?.activeBlogTheme || "editorial-longform",
    feature_flags: settingsData?.featureFlags || { enable_visitor_theme_switcher: true },
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
          website_theme: settingsData?.activeWebsiteTheme || configRes.data.website_theme || "the-workshop",
          blog_theme: settingsData?.activeBlogTheme || configRes.data.blog_theme || "editorial-longform",
          feature_flags: (configRes.data.feature_flags as CmsConfig["feature_flags"]) || settingsData?.featureFlags || {},
        };
      }
    } catch (err) {
      console.warn("[getLiveSite] Supabase query skipped/failed, using local storage defaults.", err);
    }
  }

  // Merge with guaranteed resume defaults
  const finalExperience = experienceData && experienceData.length > 0 ? experienceData : DEFAULT_RESUME_DATA.experience;
  const finalSkills = skillsData && skillsData.length > 0 ? skillsData : DEFAULT_RESUME_DATA.skills;
  const finalProjects = projectsData && projectsData.length > 0 ? projectsData : DEFAULT_RESUME_DATA.projects;
  const finalEducation = DEFAULT_RESUME_DATA.education;

  const profile = {
    ...DEFAULT_RESUME_DATA.profile,
    name: settingsData?.ownerName || DEFAULT_RESUME_DATA.profile.name,
    email: settingsData?.ownerEmail || DEFAULT_RESUME_DATA.profile.email,
    location: settingsData?.location || DEFAULT_RESUME_DATA.profile.location,
    bio: settingsData?.tagline || DEFAULT_RESUME_DATA.profile.bio,
  };

  return {
    content: {
      ...baseContent,
      profile,
      identity: {
        name: profile.name,
        brandDot: ".",
        role: profile.role,
      },
      hero: baseContent.hero || {
        badge: "Available for Full Stack & Technical Support roles",
        headingLead: "I craft",
        headingAccent: "robust web systems",
        headingTail: "that scale",
        sub: profile.bio,
        industries: ["Web Development", "Hosting & DNS", "WordPress & Full Stack"],
      },
      services: baseContent.services || [
        { icon: "Code2", title: "Full Stack Web Development", body: "Building responsive, modern applications using React, TypeScript, and Node.js." },
        { icon: "ServerCog", title: "Hosting & Server Support", body: "Specialized in WordPress troubleshooting, DNS management, SSL setups, and website migrations." },
        { icon: "LayoutTemplate", title: "UI/UX & Performance", body: "Delivering accessible, sub-100ms LCP interfaces with rigorous attention to detail." },
      ],
      stats: baseContent.stats || [
        { value: "100%", label: "Client Satisfaction" },
        { value: "24/7", label: "Reliability & Uptime" },
        { value: "4+", label: "Industry Experiences" },
      ],
      projects: finalProjects,
      cmsProjects: finalProjects,
      experience: finalExperience,
      skills: finalSkills,
      education: finalEducation,
      articles: articlesData,
      certifications: certificationsData,
      experiments: experimentsData,
      why: baseContent.why || [],
      contact: baseContent.contact || {
        badge: "Get in Touch",
        headingLead: "Let's build something",
        headingAccent: "exceptional together",
        sub: "Available for full-time engineering and web advisory opportunities.",
      },
      links: {
        book: "https://praxel.space/",
        email: profile.email,
        phone: profile.phone,
        twitter: "#",
        linkedin: profile.linkedin,
        github: profile.github,
      },
      socialLinks: {
        linkedin: profile.linkedin,
        website: profile.website,
        github: profile.github,
        email: profile.email,
        phone: profile.phone,
      },
      seo: baseContent.seo || {
        title: `${profile.name} — Full Stack Developer & Support Engineer`,
        description: profile.bio,
      },
      resumeUrl: settingsData?.resumeUrl ?? null,
    },
    config: cmsConfig,
  };
});

import fs from "fs";
const envStr = fs.readFileSync(".env", "utf-8");
envStr.split("\n").forEach(line => {
  const [k, v] = line.split("=");
  if (k && v) process.env[k] = v.replace(/"/g, "").trim();
});
import { experienceService } from "./src/features/experience/application/experience.service";
import { skillsService } from "./src/features/skills/application/skills.service";
import { settingsService } from "./src/features/settings/application/settings.service";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./src/integrations/supabase/types";

async function run() {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // use service role for admin rights
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  // 1. Update site_content in Supabase
  const { data: contentData } = await supabase.from("site_content").select("content").eq("id", "global").maybeSingle();
  let baseContent = (contentData?.content || {}) as any;

  baseContent.identity = {
    name: "Prajwal DL",
    role: "Full Stack Development",
    brandDot: ".",
  };
  baseContent.links = {
    ...baseContent.links,
    email: "pdlkpt@gmail.com",
    linkedin: "linkedin.com/in/prajwal-d-l-118198370/",
    github: "https://github.com/prajwaldl", // placeholder
    book: "https://praxel.space/",
  };
  baseContent.hero = {
    ...baseContent.hero,
    badge: "Available for new projects",
    headingLead: "I build",
    headingAccent: "digital experiences",
    headingTail: "that work",
    sub: "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills. Eager to contribute to a dynamic team and support organizational goals.",
  };

  const { error } = await supabase.from("site_content").update({ content: baseContent }).eq("id", "global");
  if (error) {
    console.error("Failed to update site_content:", error);
  } else {
    console.log("Updated site_content successfully.");
  }

  // 2. Clear existing local json files
  const expService = experienceService();
  const skillService = skillsService();
  
  const existingExp = await expService.queries.list();
  for (const e of existingExp) {
    await expService.commands.delete(e.id);
  }

  const existingSkills = await skillService.queries.list();
  for (const s of existingSkills) {
    await skillService.commands.delete(s.id);
  }

  // 3. Add Experience
  await expService.commands.create({
    company: "Unifycx",
    role: "Web Advisor",
    type: "full-time",
    location: "Mangalore, Karnataka",
    startDate: "2025-06-01",
    endDate: null,
    summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
    highlights: [
      "Provided technical support for WordPress, CMS platforms, hosting, DNS, email services, and website-related issues in shared hosting environments.",
      "Collaborated with teams, documented support interactions, and resolved customer issues through effective troubleshooting and communication."
    ],
    tech: ["WordPress", "DNS", "Email Configuration"],
    order: 1
  });

  await expService.commands.create({
    company: "Freelancer",
    role: "Freelancer",
    type: "freelance",
    location: "MANGALORE",
    startDate: "2024-12-01",
    endDate: "2025-06-01",
    summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
    highlights: [
      "Delivered responsive, performance-focused, and user-friendly solutions while improving applications through user feedback and continuous enhancements."
    ],
    tech: ["React.js", "Frontend Development", "UI/UX Design"],
    order: 2
  });

  await expService.commands.create({
    company: "Glowtouch Technologies",
    role: "Junior Support Engineer",
    type: "full-time",
    location: "MANGALORE",
    startDate: "2024-08-01",
    endDate: "2024-12-01",
    summary: "Provided live chat support for hosting, domain, and website-related issues.",
    highlights: [
      "Troubleshot WordPress, PHP, MySQL, server, DNS, email, and website migration issues.",
      "Assisted customers with technical configurations and ensured smooth issue resolution.",
      "Documented common issues and collaborated with teams to improve support efficiency and customer satisfaction."
    ],
    tech: ["WordPress", "PHP", "MySQL", "DNS", "Server Management"],
    order: 3
  });

  await expService.commands.create({
    company: "Vitvara Technologies",
    role: "Web Developer Intern",
    type: "internship",
    location: "Mangalore",
    startDate: "2024-01-01",
    endDate: "2024-05-01",
    summary: "Engineered and developed responsive, user-centric web applications.",
    highlights: [
      "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, adhering to modern development best practices and standards.",
      "Designed and implemented scalable API functionalities, meticulously optimizing code for enhanced performance, maintainability, and security.",
      "Systematically debugged and tested applications, leading to a reduction in reported bugs and a significant enhancement in software reliability and user experience."
    ],
    tech: ["HTML", "CSS", "JavaScript", "React.js"],
    order: 4
  });
  console.log("Experiences added.");

  // 4. Add Skills
  const rawSkills = [
    "technical troubleshooting", "WordPress Support", "DNS Management", 
    "Frontend Development", "UI/UX Design", "Problem-Solving", 
    "Communication", "multitasking", "quick learner", "Microsoft Excel"
  ];
  let skillOrder = 1;
  for (const s of rawSkills) {
    await skillService.commands.create({
      name: s,
      category: "General",
      level: "advanced",
      years: 1,
      iconUrl: null,
      order: skillOrder++
    });
  }
  console.log("Skills added.");

  console.log("Done.");
}

run().catch(console.error);

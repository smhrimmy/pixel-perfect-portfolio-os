import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Watch,
  Scroll,
  Sparkles,
  Music,
  Wrench,
  Compass,
  Search,
  Hammer,
  RotateCw,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Layers,
  Github,
  Linkedin,
  Twitter,
  X,
  ArrowUpRight,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";
import { Button } from "@/components/ui/button";

export default function TheWorkshop({ data }: ThemeRendererProps) {
  const profile = (data as any)?.profile || (data as any)?.identity || {};
  const links = (data as any)?.socialLinks || (data as any)?.links || {};
  const rawExperience = (data as any)?.experience || [];
  const rawSkills = (data as any)?.skills || [];
  const rawEducation = (data as any)?.education || [];
  const rawProjects = (data as any)?.projects || (data as any)?.cmsProjects || [];

  const candidateName = profile?.name || "Prajwal DL";
  const bio =
    profile?.bio ||
    (data as any)?.hero?.sub ||
    "Dedicated and adaptable professional with a proactive attitude and the ability to learn quickly. Strong work ethic and effective communication skills. Eager to contribute to a dynamic team and support organizational goals.";
  const email = profile?.email || links?.email || "pdlkpt@gmail.com";
  const phone = profile?.phone || links?.phone || "+918105561638";
  const location = profile?.location || "Mangalore, Karnataka, India";
  const linkedin = profile?.linkedin || links?.linkedin || "https://linkedin.com/in/prajwal-d-l-118198370/";
  const website = profile?.website || links?.website || "https://praxel.space/";
  const github = profile?.github || links?.github || "https://github.com/smhrimmy";

  const deskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeObject, setActiveObject] = useState<any | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  // Default Fallback Skills matching exact Resume
  const fallbackSkills = [
    { name: "Technical Troubleshooting", category: "Support & Systems", spec: "Diagnostic Expert", icon: Wrench },
    { name: "WordPress Support", category: "CMS & Platforms", spec: "Core & Plugin Fixes", icon: Layers },
    { name: "DNS Management", category: "Hosting & Networking", spec: "Zone & Record Setup", icon: Compass },
    { name: "Frontend Development", category: "Web Engineering", spec: "React & TypeScript", icon: Search },
    { name: "UI/UX Design", category: "Design", spec: "Responsive Systems", icon: Lightbulb },
    { name: "PHP & MySQL", category: "Backend & Database", spec: "Queries & Server Scripts", icon: Hammer },
    { name: "Server & Migrations", category: "Hosting & Networking", spec: "Zero-Downtime Transfer", icon: RotateCw },
    { name: "SSL & Email Setup", category: "Hosting & Networking", spec: "Secure Encryption", icon: CheckCircle2 },
  ];

  const pegboardTools = rawSkills.length > 0
    ? rawSkills.map((s: any, idx: number) => ({
        id: `tool-${idx}`,
        name: s.name,
        category: s.category || "Proficiency",
        spec: s.level ? `${s.level.toUpperCase()} LEVEL` : "VERIFIED SKILL",
        icon: [Wrench, Compass, Search, Hammer, Lightbulb, Layers, RotateCw, CheckCircle2][idx % 8],
      }))
    : fallbackSkills.map((s, idx) => ({ id: `tool-${idx}`, ...s }));

  // Default Projects matching exact Experience
  const fallbackProjects = [
    {
      id: "watch",
      type: "watch",
      title: "PORTFOLIO OS · 20 TACTILE THEMES",
      metaphor: "18-Jewel Escapement Chronometer",
      desc: "Full-stack personal operating system with 20 real-world tactile 3D themes, Studio HQ Terminal, and content automation engine.",
      tags: ["React.js", "TypeScript", "Three.js", "TanStack Start"],
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy/pixel-perfect-portfolio-os",
    },
    {
      id: "blueprint",
      type: "blueprint",
      title: "PRAXEL SPACE CLOUD PLATFORM",
      metaphor: "Architectural Drafting Blueprint",
      desc: "High-performance web hosting, domain DNS manager, and automated SSL orchestration portal.",
      tags: ["WordPress", "DNS", "PHP", "MySQL", "SSL", "Linux"],
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy",
    },
    {
      id: "jar",
      type: "jar",
      title: "VITVARA SCALABLE WEB APP",
      metaphor: "Apothecary Glass with Firefly",
      desc: "Engineered responsive, user-centric web applications using modern React best practices with scalable REST API endpoints.",
      tags: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy",
    },
    {
      id: "musicbox",
      type: "musicbox",
      title: "CUSTOM CLIENT PLATFORMS & CMS",
      metaphor: "Swiss Cylinder Comb Chimes",
      desc: "Architected and delivered custom websites and web applications leveraging modern frontend and backend tech stacks.",
      tags: ["React.js", "Node.js", "WordPress", "UI/UX Design"],
      liveUrl: "https://praxel.space/",
      repoUrl: "https://github.com/smhrimmy",
    },
  ];

  const displayProjects = rawProjects.length > 0 ? rawProjects : fallbackProjects;

  // Real Experience from Resume
  const displayExperience = rawExperience.length > 0 ? rawExperience : [
    {
      id: "exp-1",
      company: "Unifycx",
      role: "Web Advisor",
      startDate: "Jun 2025",
      endDate: "Present",
      location: "Mangalore, Karnataka",
      summary: "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
      highlights: [
        "Assisted customers with website migrations, SSL installations, email configurations, and hosting control panel issues.",
        "Provided technical support for WordPress, CMS platforms, hosting, DNS, email services, and website-related issues in shared hosting environments.",
        "Collaborated with teams, documented support interactions, and resolved customer issues through effective troubleshooting and communication.",
      ],
      tech: ["WordPress", "DNS", "SSL", "Email Setup", "Hosting Panels"],
    },
    {
      id: "exp-2",
      company: "Freelancer",
      role: "Full Stack Web Developer & Designer",
      startDate: "Dec 2024",
      endDate: "Jun 2025",
      location: "Mangalore",
      summary: "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
      highlights: [
        "Designed and developed custom websites and web applications using modern frontend and backend technologies based on client requirements.",
        "Delivered responsive, performance-focused, and user-friendly solutions while improving applications through user feedback and continuous enhancements.",
      ],
      tech: ["React.js", "TypeScript", "HTML5", "CSS3", "UI/UX Design", "PHP", "MySQL"],
    },
    {
      id: "exp-3",
      company: "Glowtouch Technologies",
      role: "Junior Support Engineer",
      startDate: "Aug 2024",
      endDate: "Dec 2024",
      location: "Mangalore",
      summary: "Provided live chat support for hosting, domain, and website-related issues.",
      highlights: [
        "Provided live chat support for hosting, domain, and website-related issues.",
        "Troubleshot WordPress, PHP, MySQL, server, DNS, email, and website migration issues.",
        "Assisted customers with technical configurations and ensured smooth issue resolution.",
        "Documented common issues and collaborated with teams to improve support efficiency and customer satisfaction.",
      ],
      tech: ["Technical Troubleshooting", "WordPress", "PHP", "MySQL", "Server", "DNS"],
    },
    {
      id: "exp-4",
      company: "Vitvara Technologies",
      role: "Web Developer Intern",
      startDate: "Jan 2024",
      endDate: "May 2024",
      location: "Mangalore",
      summary: "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, adhering to modern development best practices.",
      highlights: [
        "Engineered and developed responsive, user-centric web applications using HTML, CSS, JavaScript, and React.js, adhering to modern development best practices and standards.",
        "Designed and implemented scalable API functionalities, meticulously optimizing code for enhanced performance, maintainability, and security.",
        "Systematically debugged and tested applications, leading to a reduction in reported bugs and a significant enhancement in software reliability and user experience.",
      ],
      tech: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs"],
    },
  ];

  // Real Education from Resume
  const displayEducation = rawEducation.length > 0 ? rawEducation : [
    {
      institution: "Karnataka (Govt) Polytechnic, Mangalore, Karnataka",
      degree: "Diploma: Full Stack Development",
      graduationDate: "May 2024",
      location: "Mangalore, Karnataka",
    },
    {
      institution: "Milagres High School, Mangalore",
      degree: "10th High School",
      graduationDate: "May 2018",
      location: "Mangalore",
    },
  ];

  // 1. DIMLY-LIT 3D WORKSHOP DESK CANVAS
  useEffect(() => {
    const canvas = deskCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 420);

    const motes = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: Math.random() * 0.4 + 0.1,
      alpha: Math.random() * 0.6 + 0.2,
    }));

    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Dark Walnut Desk Surface Background
      const deskGrad = ctx.createLinearGradient(0, 0, 0, height);
      deskGrad.addColorStop(0, "#120B07");
      deskGrad.addColorStop(0.4, "#24160E");
      deskGrad.addColorStop(1, "#0A0604");
      ctx.fillStyle = deskGrad;
      ctx.fillRect(0, 0, width, height);

      // Warm Tungsten Light Cone (#E8A765)
      const lightCone = ctx.createRadialGradient(width * 0.5, 0, 20, width * 0.5, height * 0.6, width * 0.6);
      lightCone.addColorStop(0, "rgba(232, 167, 101, 0.35)");
      lightCone.addColorStop(0.5, "rgba(232, 167, 101, 0.12)");
      lightCone.addColorStop(1, "rgba(74, 107, 138, 0.0)");
      ctx.fillStyle = lightCone;
      ctx.fillRect(0, 0, width, height);

      // Wood Grain Planks
      ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
      ctx.lineWidth = 2;
      for (let y = 100; y < height; y += 75) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y + Math.sin(y) * 4);
        ctx.stroke();
      }

      // Floating Dust Motes
      motes.forEach((m) => {
        m.x += m.speedX;
        m.y -= m.speedY;
        if (m.y < 0) m.y = height;
        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 167, 101, ${m.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#E8A765";
        ctx.fill();
      });

      // Desk Shadow
      const shadowGrad = ctx.createLinearGradient(0, height - 60, 0, height);
      shadowGrad.addColorStop(0, "rgba(0,0,0,0)");
      shadowGrad.addColorStop(1, "rgba(0,0,0,0.85)");
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(0, height - 60, width, 60);

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 420;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0A07] text-[#EFE5D9] font-serif overflow-x-hidden selection:bg-[#E8A765] selection:text-black">
      {/* 1. TOP WARM TUNGSTEN WORKSHOP HEADER */}
      <header className="border-b border-[#3D2619] bg-[#140D09]/95 sticky top-0 z-50 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#E8A765] text-black flex items-center justify-center font-bold shadow-[0_0_20px_rgba(232,167,101,0.4)]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#F5EBE1] tracking-wider uppercase">{candidateName}</span>
              <span className="text-[10px] text-[#C29267] block font-mono -mt-0.5">FULL STACK DEVELOPER &amp; WEB ADVISOR</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-[#A8805F]">
            <a href="#bench" className="hover:text-[#E8A765] transition">Workbench</a>
            <a href="#pegboard" className="hover:text-[#E8A765] transition">Skills Pegboard</a>
            <a href="#experience" className="hover:text-[#E8A765] transition">Career Experience</a>
            <a href="#education" className="hover:text-[#E8A765] transition">Education</a>
            <a href="#contact" className="hover:text-[#E8A765] transition">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="bg-[#E8A765] text-black hover:bg-[#E8A765]/90 font-serif font-bold text-xs h-8 rounded-full px-4 shadow-lg">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. HERO WORKBENCH DESK SCENE */}
      <section id="bench" className="py-16 px-6 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8A765]/40 bg-[#E8A765]/10 text-xs font-mono text-[#E8A765]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AVAILABLE FOR FULL-STACK &amp; TECHNICAL SUPPORT ROLES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-normal text-[#FAF2E8] leading-[1.1]">
            {candidateName} <br />
            <span className="italic text-[#E8A765]">Full Stack Developer &amp; Web Advisor</span>
          </h1>

          <p className="text-sm sm:text-base text-[#C2AA94] leading-relaxed font-sans max-w-2xl mx-auto">
            {bio}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-2 text-xs font-mono text-[#C29267]">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#E8A765]" /> {location}</span>
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-white transition"><Phone className="h-4 w-4 text-[#E8A765]" /> {phone}</a>
            <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-white transition"><Mail className="h-4 w-4 text-[#E8A765]" /> {email}</a>
          </div>
        </div>

        {/* 3D Workbench Surface with Tangible Artifacts */}
        <div className="relative rounded-3xl border-4 border-[#3D2619] bg-[#120B07] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.9)]">
          <canvas ref={deskCanvasRef} className="w-full h-[420px] block" />

          {/* Interactive Objects Resting on the Desk Surface */}
          <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between items-center text-xs font-mono text-[#C29267] pointer-events-auto">
              <span>WORKBENCH SURFACE: DARK WALNUT</span>
              <span>CLICK ARTIFACT TO EXAMINE PROJECT DETAILS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pointer-events-auto">
              {displayProjects.slice(0, 4).map((obj: any, idx: number) => {
                const icons = [Watch, Scroll, Sparkles, Music];
                const Icon = icons[idx % 4];
                return (
                  <button
                    key={obj.id || idx}
                    onClick={() => setActiveObject(obj)}
                    className="p-4 rounded-2xl border border-[#543625] bg-[#24160E]/90 hover:bg-[#3D2619] hover:border-[#E8A765] transition-all text-left shadow-2xl space-y-3 group"
                  >
                    <div className="flex items-center justify-between text-xs text-[#E8A765]">
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-mono">[OPEN]</span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-[#FAF2E8] leading-tight group-hover:text-[#E8A765] transition truncate">
                        {obj.title}
                      </h4>
                      <p className="text-[10px] text-[#A8805F] font-mono mt-1 truncate">
                        {obj.summary || obj.desc || "Interactive Project"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PEGBOARD TOOLS (SKILLS) */}
      <section id="pegboard" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3D2619] space-y-10">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8A765]">SKILLS &amp; PROFICIENCIES</span>
            <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Artisan Tool Pegboard</h2>
          </div>
          <p className="text-xs text-[#A8805F] max-w-sm font-sans">
            Technical troubleshooting, frontend web development, DNS hosting management, and UI/UX design.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pegboardTools.map((tool: any) => {
            const Icon = tool.icon || Wrench;
            const isHovered = hoveredTool === tool.id;
            return (
              <div
                key={tool.id}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 shadow-xl ${
                  isHovered
                    ? "border-[#E8A765] bg-[#2E1A10] shadow-[0_0_25px_rgba(232,167,101,0.25)]"
                    : "border-[#3D2619] bg-[#1A100B] hover:border-[#8C5D38]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-[#24160E] border border-[#543625] flex items-center justify-center text-[#E8A765]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono text-[#A8805F]">{tool.spec}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#FAF2E8]">{tool.name}</h4>
                  <p className="text-xs text-[#E8A765] font-sans font-medium mt-0.5">{tool.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CAREER EXPERIENCE TIMELINE */}
      <section id="experience" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3D2619] space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8A765]">CAREER TIMELINE</span>
          <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Professional Experience</h2>
        </div>

        <div className="space-y-6">
          {displayExperience.map((exp: any, idx: number) => (
            <div
              key={exp.id || idx}
              className="p-8 rounded-3xl border-2 border-[#3D2619] bg-[#1A100B] hover:border-[#E8A765] transition shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3D2619] pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#FAF2E8]">
                    {exp.role} <span className="text-[#E8A765]">@ {exp.company}</span>
                  </h3>
                  <p className="text-xs font-mono text-[#A8805F] mt-0.5">{exp.location || "Mangalore, Karnataka"}</p>
                </div>
                <span className="text-xs font-mono text-[#E8A765] px-3 py-1 rounded-full bg-[#2E1A10] border border-[#543625] self-start sm:self-auto">
                  {exp.startDate} – {exp.endDate || "Present"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#C2AA94] font-sans leading-relaxed">
                {exp.summary}
              </p>

              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-2 pt-2 font-sans text-xs text-[#C2AA94]">
                  {exp.highlights.map((h: string, hIdx: number) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E8A765] mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {exp.tech && exp.tech.length > 0 && (
                <div className="pt-3 flex flex-wrap gap-2 text-[10px] font-mono text-[#E8A765]">
                  {exp.tech.map((t: string) => (
                    <span key={t} className="px-2.5 py-1 rounded bg-[#2E1A10] border border-[#543625]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. EDUCATION SECTION */}
      <section id="education" className="py-20 px-6 max-w-6xl mx-auto border-t border-[#3D2619] space-y-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8A765]">ACADEMIC BACKGROUND</span>
          <h2 className="text-3xl sm:text-4xl text-[#FAF2E8] mt-1">Education</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayEducation.map((edu: any, idx: number) => (
            <div
              key={idx}
              className="p-8 rounded-3xl border-2 border-[#3D2619] bg-[#1A100B] hover:border-[#E8A765] transition shadow-xl space-y-3"
            >
              <div className="flex items-center gap-3 text-[#E8A765]">
                <GraduationCap className="h-6 w-6" />
                <span className="text-xs font-mono font-bold uppercase">{edu.graduationDate || "Graduated"}</span>
              </div>
              <h3 className="text-xl font-bold text-[#FAF2E8]">{edu.degree}</h3>
              <p className="text-sm text-[#C2AA94] font-sans">{edu.institution}</p>
              <p className="text-xs text-[#A8805F] font-mono">{edu.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOOTER INQUIRY & CONTACT */}
      <footer id="contact" className="py-16 px-6 border-t border-[#3D2619] bg-[#140D09] text-center space-y-8">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#E8A765]">CONNECT WITH PRAJWAL</span>
          <h3 className="text-3xl sm:text-4xl text-[#FAF2E8]">Let's Build Exceptional Solutions</h3>
          <p className="text-xs sm:text-sm text-[#C2AA94] font-sans">
            Available for full-time Full Stack Engineering, Web Advisory, and Hosting &amp; Technical Support opportunities.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-[#E8A765] text-black hover:bg-[#E8A765]/90 font-serif font-bold text-xs h-12 px-8 rounded-full shadow-2xl">
            <a href={`mailto:${email}`}>
              <Mail className="h-4 w-4 mr-2" /> Send Email ({email})
            </a>
          </Button>

          <Button asChild variant="outline" size="lg" className="border-[#543625] bg-[#24160E] hover:bg-[#3D2619] text-[#EFE5D9] font-sans text-xs h-12 px-7 rounded-full">
            <a href={`tel:${phone}`}>
              <Phone className="h-4 w-4 mr-2 text-[#E8A765]" /> Call: {phone}
            </a>
          </Button>
        </div>

        <div className="pt-8 border-t border-[#3D2619] text-xs font-mono text-[#A8805F] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
          <span>© {new Date().getFullYear()} {candidateName} · {location}</span>
          <div className="flex items-center gap-6">
            <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
            <a href={website} target="_blank" rel="noreferrer" className="hover:text-white transition">Website</a>
            <a href={github} target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Physical Open Modal Sequence */}
      <AnimatePresence>
        {activeObject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="max-w-xl w-full rounded-3xl border-2 border-[#E8A765] bg-[#1A100B] p-8 text-[#EFE5D9] space-y-6 relative shadow-[0_0_60px_rgba(232,167,101,0.25)]"
            >
              <button
                onClick={() => setActiveObject(null)}
                className="absolute top-5 right-5 h-8 w-8 rounded-full border border-[#543625] text-[#E8A765] flex items-center justify-center hover:bg-[#2E1A10]"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-[#E8A765]">
                <Sparkles className="h-4 w-4" />
                <span>PROJECT DOSSIER · PRAJWAL DL</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl text-[#FAF2E8] font-bold">{activeObject.title}</h2>
                <p className="text-xs font-mono text-[#E8A765]">{activeObject.category || activeObject.metaphor || "Full Stack Engineering"}</p>
                <p className="text-sm text-[#C2AA94] font-sans leading-relaxed">{activeObject.desc || activeObject.description || activeObject.summary}</p>

                {activeObject.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activeObject.tags.map((t: string) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[#2E1A10] border border-[#543625] text-[10px] font-mono text-[#E8A765]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#3D2619] flex justify-between items-center">
                <a
                  href={activeObject.liveUrl || website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#E8A765] hover:underline font-mono inline-flex items-center"
                >
                  Visit Live Project <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </a>

                <Button
                  size="sm"
                  onClick={() => setActiveObject(null)}
                  className="bg-[#E8A765] text-black font-serif font-bold text-xs h-9 px-6 rounded-full"
                >
                  Close Inspection
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

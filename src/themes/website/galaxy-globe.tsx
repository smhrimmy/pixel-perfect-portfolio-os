import {
  ArrowUpRight,
  Bot,
  Code2,
  LayoutTemplate,
  Plug,
  Repeat,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import type { ThemeRendererProps } from "../types";

const ICONS: Record<string, LucideIcon> = { Bot, Code2, LayoutTemplate, Plug, Repeat };

// A CSS-only rotating "globe" (no three.js). Continents are drawn with layered
// radial gradients, orbits are pseudo-elements, and everything spins via keyframes.
const CSS = `
.gg-root{
  --gg-bg:#020617;
  --gg-fg:#e6f0ff;
  --gg-muted:#8b9bc0;
  --gg-primary:#7c9cff;
  --gg-accent:#67e8f9;
  font-family:'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  color:var(--gg-fg);
  background:
    radial-gradient(ellipse at 20% 10%, rgba(124,156,255,.25), transparent 60%),
    radial-gradient(ellipse at 80% 30%, rgba(103,232,249,.18), transparent 60%),
    radial-gradient(ellipse at 50% 100%, rgba(196,120,255,.18), transparent 60%),
    linear-gradient(180deg,#020617 0%,#0b1024 55%,#03061a 100%);
  min-height:100vh;overflow-x:hidden;position:relative;
}
.gg-root::before{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    radial-gradient(1px 1px at 15% 25%, #fff, transparent 60%),
    radial-gradient(1.5px 1.5px at 70% 55%, #c7d7ff, transparent 60%),
    radial-gradient(1px 1px at 45% 80%, #fff, transparent 60%),
    radial-gradient(1px 1px at 85% 15%, #a5d6ff, transparent 60%),
    radial-gradient(1px 1px at 8% 68%, #fff, transparent 60%);
  background-size:1000px 800px;opacity:.55;animation:gg-drift 90s linear infinite;
}
@keyframes gg-drift{from{background-position:0 0;}to{background-position:1000px 800px;}}
.gg-title{font-family:'Orbitron',ui-sans-serif,system-ui,sans-serif;font-weight:900;letter-spacing:.02em;}
.gg-gradient{background:linear-gradient(90deg,#a5c0ff,#67e8f9 60%,#c9a5ff);-webkit-background-clip:text;background-clip:text;color:transparent;}
.gg-glow{text-shadow:0 0 22px rgba(124,156,255,.5),0 0 50px rgba(103,232,249,.3);}
.gg-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:22px;backdrop-filter:blur(14px) saturate(140%);transition:transform .4s ease,border-color .4s ease,box-shadow .4s ease;}
.gg-card:hover{transform:translateY(-4px);border-color:rgba(124,156,255,.45);box-shadow:0 20px 60px -20px rgba(124,156,255,.35);}
.gg-btn-primary{display:inline-flex;align-items:center;gap:.4rem;padding:.85rem 1.5rem;border-radius:9999px;font-weight:700;background:linear-gradient(135deg,#7c9cff 0%,#67e8f9 100%);color:#04091f;box-shadow:0 0 30px rgba(124,156,255,.45),0 0 60px rgba(103,232,249,.2);transition:transform .3s ease,box-shadow .3s ease;}
.gg-btn-primary:hover{transform:translateY(-2px) scale(1.02);}
.gg-btn-ghost{display:inline-flex;align-items:center;gap:.4rem;padding:.8rem 1.45rem;border-radius:9999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);color:var(--gg-fg);}
.gg-btn-ghost:hover{background:rgba(255,255,255,.12);}
.gg-eyebrow{font-size:.72rem;letter-spacing:.24em;text-transform:uppercase;color:#67e8f9;}

/* ---- The globe ---- */
.gg-stage{position:relative;width:380px;height:380px;margin:0 auto;perspective:900px;}
.gg-globe{
  position:absolute;inset:0;border-radius:9999px;
  background:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,.35), transparent 40%),
    radial-gradient(ellipse 40% 20% at 25% 45%, #3b7a3b 60%, transparent 62%),
    radial-gradient(ellipse 15% 25% at 60% 30%, #4a8f4a 60%, transparent 62%),
    radial-gradient(ellipse 25% 15% at 70% 60%, #3b7a3b 60%, transparent 62%),
    radial-gradient(ellipse 18% 22% at 40% 75%, #4a8f4a 60%, transparent 62%),
    radial-gradient(ellipse 10% 12% at 82% 45%, #3b7a3b 60%, transparent 62%),
    radial-gradient(circle at 50% 50%, #1e5a99 0%, #0f3d75 55%, #052042 100%);
  box-shadow:
    inset -30px -30px 60px rgba(0,0,0,.6),
    inset 20px 20px 60px rgba(120,180,255,.15),
    0 0 80px rgba(103,232,249,.35),
    0 0 150px rgba(124,156,255,.25);
  animation:gg-spin 24s linear infinite;
  background-size:200% 100%;
}
@keyframes gg-spin{from{background-position:0 0,0 0,0 0,0 0,0 0,0 0,0 0;}to{background-position:0 0,-200% 0,-200% 0,-200% 0,-200% 0,-200% 0,0 0;}}
.gg-grid{position:absolute;inset:0;border-radius:9999px;pointer-events:none;
  background:
    repeating-linear-gradient(0deg, transparent 0 38px, rgba(255,255,255,.06) 38px 39px),
    repeating-linear-gradient(90deg, transparent 0 38px, rgba(255,255,255,.05) 38px 39px);
  mix-blend-mode:screen;mask-image:radial-gradient(circle,black 60%,transparent 72%);}
.gg-atmos{position:absolute;inset:-14px;border-radius:9999px;pointer-events:none;
  background:radial-gradient(circle,transparent 62%,rgba(103,232,249,.45) 66%,transparent 74%);
  filter:blur(2px);}
.gg-ring{position:absolute;inset:-40px;border-radius:9999px;border:1px dashed rgba(255,255,255,.15);animation:gg-rot 60s linear infinite;}
.gg-ring::before{content:"";position:absolute;top:50%;left:-6px;width:12px;height:12px;margin-top:-6px;border-radius:9999px;background:#67e8f9;box-shadow:0 0 18px #67e8f9;}
.gg-ring2{position:absolute;inset:-70px;border-radius:9999px;border:1px dashed rgba(255,255,255,.08);animation:gg-rot 90s linear infinite reverse;}
.gg-ring2::before{content:"";position:absolute;top:20%;right:-5px;width:10px;height:10px;border-radius:9999px;background:#c9a5ff;box-shadow:0 0 16px #c9a5ff;}
@keyframes gg-rot{to{transform:rotate(360deg);}}
`;

export default function GalaxyGlobe({ data }: ThemeRendererProps) {
  const { profile, projects = [], skills = [], experience = [], socialLinks } = data;

  const identity = { name: profile?.name || "Developer", brandDot: "." };
  const hero = {
    badge: "Available for orbit",
    headingLead: "Building",
    headingAccent: "Universes",
    headingTail: "in code.",
    sub: profile?.headline || "Creative developer and problem solver.",
    industries: ["Tech", "Design", "Web3"]
  };
  const services = [
    { title: "Frontend", icon: "LayoutTemplate", body: "Building beautiful UIs" }
  ];
  const stats = [{ label: "Projects", value: projects.length.toString() }];
  const why = [{ title: "Focus", body: "I care about the details." }];
  const contact = { badge: "Contact", headingLead: "Let's", headingAccent: "talk", sub: "Reach out to start a project." };
  const links = {
    book: "#", email: `mailto:${profile?.email || ""}`, github: socialLinks?.github || "#",
    linkedin: socialLinks?.linkedin || "#", twitter: socialLinks?.twitter || "#"
  };
  
  const mappedExperience = experience.map((e: any) => ({
    ...e,
    startDate: e.start_date,
    endDate: e.end_date,
    role: e.position
  }));

  return (
    <div className="gg-root">
      <style>{CSS}</style>

      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-6xl mt-4 px-4">
          <nav
            className="flex items-center justify-between rounded-full px-5 py-2.5"
            style={{ background: "rgba(11,16,36,.65)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.1)" }}
          >
            <a href="#top" className="gg-title text-lg">
              {identity.name.split(" ")[0]}
              <span className="gg-gradient">{identity.brandDot}</span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--gg-muted)" }}>
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#experience" className="hover:text-white">Experience</a>
              <a href="#skills" className="hover:text-white">Skills</a>
              <a href="#work" className="hover:text-white">Work</a>
              <a href="#results" className="hover:text-white">Results</a>
              <a href="#contact" className="hover:text-white">Contact</a>
            </div>
            <a href={links.book} className="gg-btn-primary" style={{ padding: ".5rem 1.05rem", fontSize: ".85rem" }}>
              Orbit <Globe2 className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero with globe */}
        <section id="top" className="pt-40 pb-32 px-6">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
                style={{ border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.04)", color: "var(--gg-muted)" }}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#67e8f9", boxShadow: "0 0 10px #67e8f9" }} />
                {hero.badge}
              </div>
              <h1 className="gg-title mt-6 text-5xl sm:text-6xl md:text-7xl leading-[1.02]">
                {hero.headingLead}{" "}
                <span className="gg-gradient gg-glow">{hero.headingAccent}</span>{" "}
                {hero.headingTail}
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg" style={{ color: "var(--gg-muted)" }}>
                {hero.sub}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={links.book} className="gg-btn-primary">Book a call <ArrowUpRight className="h-4 w-4" /></a>
                <a href="#work" className="gg-btn-ghost">See selected work</a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4 text-xs" style={{ color: "rgba(139,155,192,.7)", letterSpacing: ".2em", textTransform: "uppercase" }}>
                <span>Trusted in</span>
                {hero.industries.map((i) => <span key={i} style={{ color: "#e6f0ff" }}>{i}</span>)}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="gg-stage">
                <div className="gg-ring2" />
                <div className="gg-ring" />
                <div className="gg-atmos" />
                <div className="gg-globe" />
                <div className="gg-grid" />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="What I do" lead="A focused toolkit for" accent="shipping outcomes" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {services.map((s) => {
                const Icon = ICONS[s.icon] ?? Sparkles;
                return (
                  <article key={s.title} className="gg-card p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ background: s.featured ? "linear-gradient(135deg,#7c9cff,#67e8f9)" : "rgba(255,255,255,.07)", color: s.featured ? "#04091f" : "#a5c0ff" }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="gg-title mt-5 text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm" style={{ color: "var(--gg-muted)" }}>{s.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="Experience" lead="My professional" accent="journey" />
            <div className="mt-12 space-y-5">
              {experience.map((exp: any) => (
                <article key={exp.id} className="gg-card p-7 flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div>
                    <h3 className="gg-title text-2xl">{exp.role}</h3>
                    <div className="mt-2 text-[15px] font-semibold" style={{ color: "#67e8f9" }}>{exp.company}</div>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--gg-muted)" }}>{exp.summary}</p>
                  </div>
                  <div className="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase" style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.15)" }}>
                    {exp.startDate} – {exp.endDate || "Present"}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="Skills" lead="Tools I use to" accent="build" />
            <div className="mt-12 flex flex-wrap gap-3">
              {skills.map((skill: any) => (
                <div key={skill.id} className="gg-card px-5 py-2.5 text-sm font-semibold tracking-wide hover:text-white transition-colors cursor-default" style={{ color: "var(--gg-fg)" }}>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="results" className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,.08)", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="Results" lead="Numbers that" accent="actually matter" />
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="gg-title gg-gradient text-5xl md:text-6xl">{s.value}</div>
                  <div className="mt-2 text-sm" style={{ color: "var(--gg-muted)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="Selected work" lead="Recent projects, real" accent="outcomes" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((p) => (
                <a href="#" key={p.title} className="gg-card relative overflow-hidden p-7 block group">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="gg-eyebrow">{p.tag}</div>
                      <h3 className="gg-title mt-2 text-2xl">{p.title}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: "#67e8f9" }} />
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4" style={{ color: "#a5c0ff" }} />
                    <span>{p.outcome}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="py-24 px-6" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="Why me" lead="A partner," accent="not a vendor" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {why.map((w, i) => (
                <div key={w.title} className="gg-card p-7">
                  <div className="gg-title" style={{ color: "#67e8f9", fontSize: ".85rem" }}>0{i + 1}</div>
                  <h3 className="gg-title mt-3 text-xl">{w.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--gg-muted)" }}>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="gg-eyebrow">{contact.badge}</div>
            <h2 className="gg-title mt-4 text-4xl sm:text-5xl md:text-6xl">
              {contact.headingLead} <span className="gg-gradient gg-glow">{contact.headingAccent}</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl" style={{ color: "var(--gg-muted)" }}>{contact.sub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={links.book} className="gg-btn-primary">Book a call <ArrowUpRight className="h-4 w-4" /></a>
              <a href={links.email} className="gg-btn-ghost">Send an email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-sm" style={{ color: "var(--gg-muted)" }}>
          <div>© {new Date().getFullYear()} {identity.name}. Circling the pale blue dot.</div>
          <div className="flex items-center gap-5">
            <a href={links.twitter} aria-label="Twitter"><Twitter className="h-4 w-4" /></a>
            <a href={links.linkedin} aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            <a href={links.github} aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a href={links.email} aria-label="Email"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ eyebrow, lead, accent }: { eyebrow: string; lead: string; accent: string }) {
  return (
    <div className="max-w-2xl">
      <div className="gg-eyebrow">{eyebrow}</div>
      <h2 className="gg-title mt-3 text-3xl sm:text-4xl md:text-5xl">
        {lead} <span className="gg-gradient">{accent}</span>.
      </h2>
    </div>
  );
}

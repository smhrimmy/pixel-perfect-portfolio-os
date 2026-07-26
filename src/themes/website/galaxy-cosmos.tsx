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
  Rocket,
  type LucideIcon,
} from "lucide-react";
import type { ThemeProps } from "./registry";

const ICONS: Record<string, LucideIcon> = { Bot, Code2, LayoutTemplate, Plug, Repeat };

// Self-contained cosmic theme. All animations live in the injected <style> tag
// so the theme has no CSS dependencies outside its own file.
const CSS = `
.gc-root{
  --gc-bg:#05041a;
  --gc-fg:#eaf0ff;
  --gc-muted:#8a90b8;
  --gc-primary:#b57bff;
  --gc-accent:#4fc3ff;
  --gc-card: rgba(255,255,255,0.04);
  --gc-border: rgba(255,255,255,0.10);
  background:
    radial-gradient(ellipse at 20% 10%, rgba(181,123,255,.28), transparent 60%),
    radial-gradient(ellipse at 80% 30%, rgba(79,195,255,.22), transparent 60%),
    radial-gradient(ellipse at 50% 90%, rgba(255,120,203,.18), transparent 60%),
    linear-gradient(180deg,#05041a 0%,#0a0a2b 55%,#06051f 100%);
  color:var(--gc-fg);
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  min-height:100vh;
  overflow-x:hidden;
  position:relative;
}
.gc-root::before{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, #fff, transparent 60%),
    radial-gradient(1px 1px at 70% 60%, #fff, transparent 60%),
    radial-gradient(1px 1px at 40% 80%, #d7c9ff, transparent 60%),
    radial-gradient(1.5px 1.5px at 85% 15%, #a5d6ff, transparent 60%),
    radial-gradient(1px 1px at 10% 70%, #fff, transparent 60%),
    radial-gradient(1px 1px at 55% 40%, #fff, transparent 60%);
  background-size: 900px 700px;
  opacity:.6;
  animation: gc-drift 60s linear infinite;
}
@keyframes gc-drift { from{background-position:0 0;} to{background-position:900px 700px;} }
.gc-orb{ position:absolute; border-radius:9999px; filter: blur(60px); opacity:.55; }
.gc-orb.a{ width:520px;height:520px; left:-120px; top:-80px; background:#b57bff;}
.gc-orb.b{ width:600px;height:600px; right:-160px; top:20%; background:#4fc3ff;}
.gc-orb.c{ width:500px;height:500px; left:30%; bottom:-160px; background:#ff78cb;}
.gc-title{ font-family:'Orbitron', ui-sans-serif, system-ui, sans-serif; font-weight:900; letter-spacing:.02em;}
.gc-gradient{
  background: linear-gradient(90deg,#c8a2ff 0%,#7fdcff 55%,#ff9cdf 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
}
.gc-glow{ text-shadow: 0 0 24px rgba(181,123,255,.55), 0 0 48px rgba(79,195,255,.35);}
.gc-card{
  background:var(--gc-card); border:1px solid var(--gc-border);
  border-radius:24px; backdrop-filter: blur(14px) saturate(140%);
  transition: transform .4s ease, border-color .4s ease, box-shadow .4s ease;
}
.gc-card:hover{ transform:translateY(-4px); border-color: rgba(181,123,255,.55); box-shadow: 0 20px 60px -20px rgba(181,123,255,.45);}
.gc-btn-primary{
  display:inline-flex;align-items:center;gap:.4rem;
  padding:.9rem 1.6rem; border-radius:9999px; font-weight:700;
  background: linear-gradient(135deg,#b57bff 0%,#4fc3ff 100%);
  color:#0a0a2b;
  box-shadow: 0 0 30px rgba(181,123,255,.45), 0 0 60px rgba(79,195,255,.25);
  transition: transform .3s ease, box-shadow .3s ease;
}
.gc-btn-primary:hover{ transform: translateY(-2px) scale(1.02); box-shadow: 0 0 40px rgba(181,123,255,.6), 0 0 80px rgba(79,195,255,.35);}
.gc-btn-ghost{
  display:inline-flex;align-items:center;gap:.4rem;
  padding:.85rem 1.55rem; border-radius:9999px;
  background: rgba(255,255,255,.06); border:1px solid var(--gc-border);
  color:var(--gc-fg); transition: background .3s ease, border-color .3s ease;
}
.gc-btn-ghost:hover{ background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.25);}
.gc-orbit{
  position:relative; width:340px;height:340px; margin:0 auto;
}
.gc-planet{
  position:absolute; top:50%; left:50%; transform-origin: 0 0;
  width:170px;height:170px; margin:-85px 0 0 -85px;
  border-radius:9999px;
  background: radial-gradient(circle at 30% 30%, #d9c2ff, #7a4de0 60%, #2a1370 100%);
  box-shadow: 0 0 80px rgba(181,123,255,.55), inset -20px -20px 40px rgba(0,0,0,.5);
  animation: gc-spin 40s linear infinite;
}
.gc-ring{
  position:absolute; top:50%; left:50%;
  width:340px; height:340px; margin:-170px 0 0 -170px;
  border-radius:9999px;
  border:1px dashed rgba(255,255,255,.18);
  animation: gc-spin 60s linear infinite reverse;
}
.gc-moon{
  position:absolute; top:50%; left:50%;
  width:24px;height:24px; margin:-12px 0 0 -12px;
  border-radius:9999px; background: radial-gradient(circle at 30% 30%, #fff, #7fdcff 60%, #1c4a70 100%);
  transform: translate(150px,0);
  box-shadow: 0 0 25px rgba(127,220,255,.75);
}
@keyframes gc-spin { to{ transform: translate(-50%,-50%) rotate(360deg);} }
.gc-planet{ transform: translate(-50%,-50%) rotate(0deg);}
.gc-ring::before{
  content:""; position:absolute; top:50%; left:0; width:16px;height:16px; margin-top:-8px;
  border-radius:9999px; background:#ff9cdf; box-shadow: 0 0 18px rgba(255,156,223,.8);
}
.gc-eyebrow{ font-size:.72rem; letter-spacing:.24em; text-transform:uppercase; color:#7fdcff;}
`;

export default function GalaxyCosmos({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links, experience = [], skills = [] } = content;

  return (
    <div className="gc-root">
      <style>{CSS}</style>
      <div className="gc-orb a" />
      <div className="gc-orb b" />
      <div className="gc-orb c" />

      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-6xl mt-4 px-4">
          <nav
            className="flex items-center justify-between rounded-full px-5 py-2.5"
            style={{ background: "rgba(10,10,43,.6)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.1)" }}
          >
            <a href="#top" className="gc-title text-lg">
              {identity.name.split(" ")[0]}
              <span className="gc-gradient">{identity.brandDot}</span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-sm" style={{ color: "var(--gc-muted)" }}>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#work" className="hover:text-white transition-colors">Work</a>
              <a href="#results" className="hover:text-white transition-colors">Results</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
            <a href={links.book} className="gc-btn-primary" style={{ padding: ".55rem 1.1rem", fontSize: ".85rem" }}>
              Launch <Rocket className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section id="top" className="pt-40 pb-32 px-6">
          <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
                style={{ border: "1px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.04)", color: "var(--gc-muted)" }}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#7fdcff", boxShadow: "0 0 10px #7fdcff" }} />
                {hero.badge}
              </div>
              <h1 className="gc-title mt-6 text-5xl sm:text-6xl md:text-7xl leading-[1.02]">
                {hero.headingLead}{" "}
                <span className="gc-gradient gc-glow">{hero.headingAccent}</span>{" "}
                {hero.headingTail}
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg" style={{ color: "var(--gc-muted)" }}>
                {hero.sub}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href={links.book} className="gc-btn-primary">
                  Book a call <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#work" className="gc-btn-ghost">See selected work</a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-4 text-xs" style={{ color: "rgba(138,144,184,.7)", letterSpacing: ".2em", textTransform: "uppercase" }}>
                <span>Trusted in</span>
                {hero.industries.map((i) => <span key={i} style={{ color: "#eaf0ff" }}>{i}</span>)}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="gc-orbit">
                <div className="gc-ring" />
                <div className="gc-planet" />
                <div className="gc-moon" />
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
                  <article key={s.title} className="gc-card p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ background: s.featured ? "linear-gradient(135deg,#b57bff,#4fc3ff)" : "rgba(255,255,255,.07)", color: s.featured ? "#0a0a2b" : "#c8a2ff" }}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="gc-title mt-5 text-xl">{s.title}</h3>
                    <p className="mt-2 text-sm" style={{ color: "var(--gc-muted)" }}>{s.body}</p>
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
                <article key={exp.id} className="gc-card p-7 flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div>
                    <h3 className="gc-title text-2xl">{exp.role}</h3>
                    <div className="mt-2 text-[15px] font-semibold" style={{ color: "#7fdcff" }}>{exp.company}</div>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--gc-muted)" }}>{exp.summary}</p>
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
                <div key={skill.id} className="gc-card px-5 py-2.5 text-sm font-semibold tracking-wide hover:text-white transition-colors cursor-default" style={{ color: "var(--gc-fg)" }}>
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
                  <div className="gc-title gc-gradient text-5xl md:text-6xl">{s.value}</div>
                  <div className="mt-2 text-sm" style={{ color: "var(--gc-muted)" }}>{s.label}</div>
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
                <a href="#" key={p.title} className="gc-card relative overflow-hidden p-7 block group">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="gc-eyebrow">{p.tag}</div>
                      <h3 className="gc-title mt-2 text-2xl">{p.title}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: "#7fdcff" }} />
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4" style={{ color: "#c8a2ff" }} />
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
                <div key={w.title} className="gc-card p-7">
                  <div className="gc-title" style={{ color: "#7fdcff", fontSize: ".85rem" }}>0{i + 1}</div>
                  <h3 className="gc-title mt-3 text-xl">{w.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--gc-muted)" }}>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="gc-eyebrow">{contact.badge}</div>
            <h2 className="gc-title mt-4 text-4xl sm:text-5xl md:text-6xl">
              {contact.headingLead} <span className="gc-gradient gc-glow">{contact.headingAccent}</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl" style={{ color: "var(--gc-muted)" }}>{contact.sub}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={links.book} className="gc-btn-primary">Book a call <ArrowUpRight className="h-4 w-4" /></a>
              <a href={links.email} className="gc-btn-ghost">Send an email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 py-10 px-6" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 text-sm" style={{ color: "var(--gc-muted)" }}>
          <div>© {new Date().getFullYear()} {identity.name}. Made among the stars.</div>
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
      <div className="gc-eyebrow">{eyebrow}</div>
      <h2 className="gc-title mt-3 text-3xl sm:text-4xl md:text-5xl">
        {lead} <span className="gc-gradient">{accent}</span>.
      </h2>
    </div>
  );
}

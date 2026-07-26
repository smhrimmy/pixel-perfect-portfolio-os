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
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ThemeProps } from "./registry";

const ICONS: Record<string, LucideIcon> = {
  Bot,
  Code2,
  LayoutTemplate,
  Plug,
  Repeat,
};

// Bento span classes for the services grid, applied by index.
const SERVICE_SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
];

export default function NoirAurora({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links, experience = [], skills = [] } = content;

  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-6xl mt-4 px-4">
          <nav className="flex items-center justify-between rounded-full border border-border/60 bg-background/50 px-5 py-2.5 backdrop-blur-xl">
            <a href="#top" className="font-display font-bold tracking-tight text-lg">
              {identity?.name?.split(" ")[0] || "Portfolio"}
              <span className="text-gold-gradient">{identity?.brandDot || "."}</span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
              <a href="#services" className="hover:text-foreground transition-colors">Services</a>
              <a href="#experience" className="hover:text-foreground transition-colors">Experience</a>
              <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
              <a href="#work" className="hover:text-foreground transition-colors">Work</a>
              <a href="#results" className="hover:text-foreground transition-colors">Results</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary-glow">
              <a href={links.book}>Book a call</a>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="relative isolate overflow-hidden pt-40 pb-32">
          <Aurora />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <Badge>{hero.badge}</Badge>
            <h1 className="mt-8 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02] tracking-tight">
              {hero.headingLead} <span className="text-gold-gradient">{hero.headingAccent}</span> {hero.headingTail}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">{hero.sub}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary-glow">
                <a href={links.book}>Book a call <ArrowUpRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border/60 bg-transparent hover:bg-secondary/60">
                <a href="#work">See selected work</a>
              </Button>
            </div>
            <div className="mt-14 flex items-center justify-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
              <span>Trusted by teams in</span>
              {hero.industries.map((i) => (
                <span key={i} className="text-foreground/80">{i}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="What I do" accent="shipping outcomes" lead="A focused toolkit for" />
            <div className="mt-14 grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
              {services.map((s, i) => {
                const Icon = ICONS[s.icon] ?? Sparkles;
                const span = SERVICE_SPANS[i] ?? "md:col-span-2";
                return (
                  <article key={s.title} className={`glass-card glass-card-hover rounded-3xl p-8 ${span}`}>
                    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${s.featured ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className={`mt-6 font-display font-bold ${s.featured ? "text-3xl md:text-4xl" : "text-xl"}`}>{s.title}</h3>
                    <p className={`mt-3 text-muted-foreground ${s.featured ? "text-base max-w-sm" : "text-sm"}`}>{s.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="relative py-28 border-y border-border/40 bg-surface/40">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Experience" lead="My professional" accent="journey" />
            <div className="mt-14 space-y-6">
              {experience.map((exp: any) => (
                <article key={exp.id} className="glass-card glass-card-hover rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-6 justify-between">
                  <div>
                    <h3 className="font-display font-bold text-2xl md:text-3xl">{exp.role}</h3>
                    <div className="mt-2 text-lg text-gold-gradient font-medium">{exp.company}</div>
                    <p className="mt-4 text-muted-foreground">{exp.summary}</p>
                  </div>
                  <div className="shrink-0 flex items-start">
                    <span className="inline-flex items-center rounded-full border border-border/60 bg-background/50 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground backdrop-blur-md">
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Skills" lead="Tools I use to" accent="build" />
            <div className="mt-14 flex flex-wrap gap-4">
              {skills.map((skill: any) => (
                <div key={skill.id} className="glass-card rounded-full px-6 py-3 flex items-center justify-center font-display font-medium text-sm hover:text-primary transition-colors hover:border-primary/50 cursor-default">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="results" className="relative py-28 border-y border-border/40 bg-surface/40">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Results" lead="Numbers that" accent="actually matter" />
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s) => (
                <div key={s.label} className="text-center md:text-left">
                  <div className="font-display text-5xl md:text-6xl font-extrabold text-gold-gradient">{s.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="relative py-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Selected work" lead="Recent projects, real" accent="outcomes" />
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((p) => (
                <a key={p.title} href="#" className="glass-card glass-card-hover group relative overflow-hidden rounded-3xl p-8">
                  <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${p.hue} blur-3xl`} />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.tag}</div>
                      <h3 className="mt-3 font-display text-2xl font-bold">{p.title}</h3>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>
                  <div className="relative mt-14 flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-foreground/90">{p.outcome}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why */}
        <section className="relative py-28 border-t border-border/40">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Why me" lead="A partner," accent="not a vendor" />
            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {why.map((w, i) => (
                <div key={w.title} className="glass-card rounded-3xl p-8">
                  <div className="font-display text-sm text-primary">0{i + 1}</div>
                  <h3 className="mt-4 font-display text-xl font-bold">{w.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative isolate overflow-hidden py-32">
          <Aurora />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <Badge>{contact.badge}</Badge>
            <h2 className="mt-8 font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              {contact.headingLead} <span className="text-gold-gradient">{contact.headingAccent}</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">{contact.sub}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary-glow">
                <a href={links.book}>Book a call <ArrowUpRight className="ml-1 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border/60 bg-transparent hover:bg-secondary/60">
                <a href={links.email}>Send an email</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} {identity.name}. Built with intent.</div>
          <div className="flex items-center gap-5">
            <a href={links.twitter} aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter className="h-4 w-4" /></a>
            <a href={links.linkedin} aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /></a>
            <a href={links.github} aria-label="GitHub" className="hover:text-primary transition-colors"><Github className="h-4 w-4" /></a>
            <a href={links.email} aria-label="Email" className="hover:text-primary transition-colors"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
      {children}
    </div>
  );
}

function Aurora() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="aurora-blob left-[-10%] top-[10%] h-[420px] w-[420px]"
        style={{ background: "radial-gradient(circle, oklch(0.78 0.14 85 / 0.55), transparent 70%)" }}
      />
      <div
        className="aurora-blob right-[-10%] top-[30%] h-[520px] w-[520px]"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.11 90 / 0.35), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="aurora-blob left-[30%] bottom-[-15%] h-[480px] w-[480px]"
        style={{ background: "radial-gradient(circle, oklch(0.55 0.09 80 / 0.45), transparent 70%)", animationDelay: "-12s" }}
      />
    </div>
  );
}

function SectionHeader({ eyebrow, lead, accent }: { eyebrow: string; lead: string; accent: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs uppercase tracking-[0.24em] text-primary">{eyebrow}</div>
      <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
        {lead} <span className="text-gold-gradient">{accent}</span>.
      </h2>
    </div>
  );
}

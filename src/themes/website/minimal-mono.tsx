import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ThemeProps } from "./registry";

export default function MinimalMono({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links, experience = [], skills = [] } = content;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">
            {identity.name}<span className="text-neutral-400">{identity.brandDot}</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <a href="#services" className="hover:text-neutral-900">Services</a>
            <a href="#experience" className="hover:text-neutral-900">Experience</a>
            <a href="#skills" className="hover:text-neutral-900">Skills</a>
            <a href="#work" className="hover:text-neutral-900">Work</a>
            <a href="#results" className="hover:text-neutral-900">Results</a>
            <a href="#contact" className="hover:text-neutral-900">Contact</a>
          </div>
          <a href={links.book} className="text-sm font-medium underline underline-offset-4">Book a call</a>
        </nav>
      </header>

      <main>
        <section id="top" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
          <div className="text-xs uppercase tracking-[0.24em] text-neutral-500">{hero.badge}</div>
          <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
            {hero.headingLead} <em className="not-italic underline decoration-neutral-300 decoration-4 underline-offset-8">{hero.headingAccent}</em> {hero.headingTail}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-xl">{hero.sub}</p>
          <div className="mt-10 flex gap-4">
            <a href={links.book} className="inline-flex items-center gap-1 rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm">
              Book a call <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#work" className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-5 py-2.5 text-sm">See work</a>
          </div>
        </section>

        <section id="services" className="border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Services</h2>
            <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              {services.map((s, i) => (
                <div key={s.title} className="grid grid-cols-12 gap-6 py-6">
                  <div className="col-span-2 text-sm text-neutral-400 tabular-nums">0{i + 1}</div>
                  <h3 className="col-span-4 text-lg font-medium">{s.title}</h3>
                  <p className="col-span-6 text-sm text-neutral-600">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Experience</h2>
            <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              {experience.map((exp: any) => (
                <div key={exp.id} className="py-8 grid md:grid-cols-4 gap-6">
                  <div className="text-sm font-medium text-neutral-500 tabular-nums">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <div className="mt-1 text-sm text-neutral-900">{exp.company}</div>
                    <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-2xl">{exp.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Skills</h2>
            <div className="mt-10 flex flex-wrap gap-2">
              {skills.map((skill: any) => (
                <span key={skill.id} className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 cursor-default">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="border-t border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-5xl px-6 py-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-2 text-sm text-neutral-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Selected work</h2>
            <div className="mt-10 grid md:grid-cols-2 gap-px bg-neutral-200">
              {projects.map((p) => (
                <a key={p.title} href="#" className="group bg-white p-8 hover:bg-neutral-50 transition-colors">
                  <div className="text-xs uppercase tracking-[0.2em] text-neutral-500">{p.tag}</div>
                  <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
                  <p className="mt-8 text-sm text-neutral-600">{p.outcome}</p>
                  <ArrowUpRight className="mt-4 h-4 w-4 text-neutral-400 group-hover:text-neutral-900" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Why me</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-8">
              {why.map((w, i) => (
                <div key={w.title}>
                  <div className="text-sm text-neutral-400 tabular-nums">0{i + 1}</div>
                  <h3 className="mt-2 text-lg font-medium">{w.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-neutral-200 bg-neutral-900 text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <div className="text-xs uppercase tracking-[0.24em] text-neutral-400">{contact.badge}</div>
            <h2 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
              {contact.headingLead} <em className="not-italic underline decoration-neutral-500 decoration-4 underline-offset-8">{contact.headingAccent}</em>.
            </h2>
            <p className="mt-4 text-neutral-400 max-w-xl mx-auto">{contact.sub}</p>
            <div className="mt-8 flex justify-center gap-4">
              <a href={links.book} className="inline-flex items-center gap-1 rounded-full bg-white text-neutral-900 px-5 py-2.5 text-sm">Book a call <ArrowUpRight className="h-4 w-4" /></a>
              <a href={links.email} className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-5 py-2.5 text-sm">Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} {identity.name}</div>
          <div className="flex items-center gap-4">
            <a href={links.twitter}><Twitter className="h-4 w-4" /></a>
            <a href={links.linkedin}><Linkedin className="h-4 w-4" /></a>
            <a href={links.github}><Github className="h-4 w-4" /></a>
            <a href={links.email}><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

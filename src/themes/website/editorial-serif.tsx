import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ThemeProps } from "./registry";

export default function EditorialSerif({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links, experience = [], skills = [] } = content;

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#1a1613] font-serif [font-family:'Cormorant_Garamond',Georgia,serif]">
      <header className="border-b border-[#1a1613]/20 bg-[#f7f3ec]/90 backdrop-blur sticky top-0 z-40">
        <nav className="mx-auto max-w-6xl px-8 h-16 flex items-center justify-between">
          <a href="#top" className="text-2xl italic tracking-tight">
            {identity.name}<span className="text-[#a8341f]">{identity.brandDot}</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-[0.2em] font-sans">
            <a href="#services">Practice</a>
            <a href="#experience">Chronicle</a>
            <a href="#skills">Arsenal</a>
            <a href="#work">Case Files</a>
            <a href="#contact">Correspond</a>
          </div>
          <a href={links.book} className="text-sm italic underline underline-offset-4 decoration-[#a8341f]">Request audience</a>
        </nav>
      </header>

      <main>
        <section id="top" className="mx-auto max-w-5xl px-8 py-32 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-[#a8341f] font-sans">— {hero.badge} —</div>
          <h1 className="mt-10 text-6xl md:text-8xl leading-[0.95] italic">
            {hero.headingLead}<br />
            <span className="text-[#a8341f]">{hero.headingAccent}</span><br />
            <span className="not-italic">{hero.headingTail}</span>
          </h1>
          <p className="mt-10 text-xl text-[#1a1613]/70 max-w-2xl mx-auto leading-relaxed">{hero.sub}</p>
          <div className="mt-12 flex justify-center gap-4 font-sans text-sm">
            <a href={links.book} className="border border-[#1a1613] bg-[#1a1613] text-[#f7f3ec] px-6 py-3 uppercase tracking-widest hover:bg-[#a8341f] hover:border-[#a8341f]">Book a call</a>
            <a href="#work" className="border border-[#1a1613] px-6 py-3 uppercase tracking-widest hover:bg-[#1a1613] hover:text-[#f7f3ec]">Read work</a>
          </div>
        </section>

        <section id="services" className="border-t border-[#1a1613]/20">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="grid md:grid-cols-[1fr_2fr] gap-12">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-[#a8341f] font-sans">Chapter I</div>
                <h2 className="mt-4 text-5xl italic">The Practice</h2>
              </div>
              <div className="divide-y divide-[#1a1613]/20">
                {services.map((s, i) => (
                  <article key={s.title} className="py-6 first:pt-0">
                    <div className="flex items-baseline gap-4">
                      <span className="text-[#a8341f] italic text-xl">{String(i + 1).padStart(2, "0")}.</span>
                      <h3 className="text-2xl">{s.title}</h3>
                    </div>
                    <p className="mt-2 pl-10 text-[#1a1613]/70 leading-relaxed">{s.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="results" className="border-t border-[#1a1613]/20 bg-[#1a1613] text-[#f7f3ec]">
          <div className="mx-auto max-w-6xl px-8 py-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-6xl italic text-[#e8b466]">{s.value}</div>
                <div className="mt-3 text-sm uppercase tracking-[0.2em] font-sans text-[#f7f3ec]/60">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="border-t border-[#1a1613]/20">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="text-xs uppercase tracking-[0.3em] text-[#a8341f] font-sans">Chapter II</div>
            <h2 className="mt-4 text-5xl italic">Case Files</h2>
            <div className="mt-12 grid md:grid-cols-2 gap-x-16 gap-y-12">
              {projects.map((p, i) => (
                <a key={p.title} href="#" className="group border-t border-[#1a1613]/30 pt-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-[0.3em] font-sans text-[#a8341f]">{p.tag}</span>
                    <span className="italic text-[#1a1613]/40">№ {String(i + 1).padStart(3, "0")}</span>
                  </div>
                  <h3 className="mt-4 text-3xl italic group-hover:text-[#a8341f] transition-colors">{p.title}</h3>
                  <p className="mt-3 text-[#1a1613]/70">{p.outcome}</p>
                  <ArrowUpRight className="mt-4 h-5 w-5 text-[#a8341f]" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#1a1613]/20 bg-[#efe7d8]">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="text-xs uppercase tracking-[0.3em] text-[#a8341f] font-sans">Chapter III</div>
            <h2 className="mt-4 text-5xl italic">Why the pen chose you</h2>
            <div className="mt-12 grid md:grid-cols-3 gap-10">
              {why.map((w) => (
                <div key={w.title}>
                  <h3 className="text-2xl italic">{w.title}</h3>
                  <p className="mt-3 text-[#1a1613]/70 leading-relaxed">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="border-t border-[#1a1613]/20">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="text-xs uppercase tracking-[0.3em] text-[#a8341f] font-sans">Chapter IV</div>
            <h2 className="mt-4 text-5xl italic">The Chronicle</h2>
            <div className="mt-12 divide-y divide-[#1a1613]/20">
              {experience.map((exp: any, i: number) => (
                <article key={exp.id} className="py-8 first:pt-0 grid md:grid-cols-4 gap-8">
                  <div className="font-sans text-xs uppercase tracking-[0.2em] text-[#a8341f]">
                    {exp.startDate} – {exp.endDate || "Present"}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-3xl italic">{exp.role}</h3>
                    <div className="text-sm font-sans uppercase tracking-[0.2em] mt-2 text-[#1a1613]/60">{exp.company}</div>
                    <p className="mt-4 text-[#1a1613]/70 leading-relaxed max-w-2xl">{exp.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="border-t border-[#1a1613]/20">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="text-xs uppercase tracking-[0.3em] text-[#a8341f] font-sans">Chapter V</div>
            <h2 className="mt-4 text-5xl italic">The Arsenal</h2>
            <div className="mt-12 flex flex-wrap gap-3">
              {skills.map((skill: any) => (
                <div key={skill.id} className="border border-[#1a1613]/30 px-5 py-2 font-sans text-sm uppercase tracking-widest text-[#1a1613]/80 hover:bg-[#1a1613] hover:text-[#f7f3ec] transition-colors cursor-default">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[#1a1613]/20 bg-[#1a1613] text-[#f7f3ec]">
          <div className="mx-auto max-w-4xl px-8 py-28 text-center">
            <div className="text-xs uppercase tracking-[0.4em] text-[#e8b466] font-sans">— {contact.badge} —</div>
            <h2 className="mt-8 text-6xl italic">
              {contact.headingLead} <span className="text-[#e8b466]">{contact.headingAccent}</span>.
            </h2>
            <p className="mt-6 text-lg text-[#f7f3ec]/70 max-w-xl mx-auto">{contact.sub}</p>
            <div className="mt-10 flex justify-center gap-4 font-sans text-sm">
              <a href={links.book} className="bg-[#e8b466] text-[#1a1613] px-6 py-3 uppercase tracking-widest">Book a call</a>
              <a href={links.email} className="border border-[#f7f3ec]/40 px-6 py-3 uppercase tracking-widest">Write a letter</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1a1613]/20 py-8 bg-[#f7f3ec]">
        <div className="mx-auto max-w-6xl px-8 flex items-center justify-between text-sm">
          <div className="italic">— Est. {new Date().getFullYear()} · {identity.name} —</div>
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

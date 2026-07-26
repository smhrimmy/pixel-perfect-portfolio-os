import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ThemeProps } from "./registry";

export default function CyberMagenta({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links, experience = [], skills = [] } = content;

  return (
    <div className="min-h-screen bg-[#0a0014] text-[#ffe6ff] font-mono relative overflow-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,20,147,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,20,147,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -z-10 w-[900px] h-[500px] bg-[#ff1493] rounded-full blur-[180px] opacity-30" />

      <header className="sticky top-0 z-40 border-b border-[#ff1493]/40 bg-[#0a0014]/80 backdrop-blur">
        <nav className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between text-sm">
          <a href="#top" className="tracking-widest">
            <span className="text-[#ff1493]">▲</span> {identity.name.toUpperCase()}<span className="text-[#00ffff]">{identity.brandDot}</span>
          </a>
          <div className="hidden md:flex items-center gap-6 uppercase tracking-widest text-xs">
            <a href="#services" className="hover:text-[#00ffff]">Services</a>
            <a href="#experience" className="hover:text-[#00ffff]">Experience</a>
            <a href="#skills" className="hover:text-[#00ffff]">Skills</a>
            <a href="#work" className="hover:text-[#00ffff]">Work</a>
            <a href="#contact" className="hover:text-[#00ffff]">Contact</a>
          </div>
          <a href={links.book} className="border border-[#ff1493] bg-[#ff1493]/10 px-4 py-1.5 uppercase tracking-widest text-xs text-[#ff1493] hover:bg-[#ff1493] hover:text-black">
            ▶ Book
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section id="top" className="py-28">
          <div className="inline-flex items-center gap-2 border border-[#00ffff]/50 bg-[#00ffff]/5 px-3 py-1 text-xs uppercase tracking-widest text-[#00ffff]">
            <span className="h-1.5 w-1.5 bg-[#00ffff] animate-pulse" /> {hero.badge}
          </div>
          <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-[1] tracking-tight uppercase">
            {hero.headingLead}{" "}
            <span
              className="text-[#ff1493]"
              style={{ textShadow: "0 0 20px rgba(255,20,147,0.8), 0 0 40px rgba(255,20,147,0.4)" }}
            >
              {hero.headingAccent}
            </span>{" "}
            <span className="text-[#00ffff]" style={{ textShadow: "0 0 20px rgba(0,255,255,0.6)" }}>
              {hero.headingTail}
            </span>
          </h1>
          <p className="mt-8 text-lg text-[#ffe6ff]/70 max-w-2xl">{hero.sub}</p>
          <div className="mt-10 flex gap-3 text-sm uppercase tracking-widest">
            <a href={links.book} className="border-2 border-[#ff1493] bg-[#ff1493] text-black px-5 py-2.5 hover:bg-[#ff1493]/80 shadow-[0_0_30px_rgba(255,20,147,0.6)]">
              ▶ Book a call
            </a>
            <a href="#work" className="border-2 border-[#00ffff] text-[#00ffff] px-5 py-2.5 hover:bg-[#00ffff]/10">
              [ See work ]
            </a>
          </div>
        </section>

        <section id="services" className="py-16 border-t border-[#ff1493]/20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#00ffff]">// Services</div>
          <div className="mt-8 grid md:grid-cols-3 gap-0 border border-[#ff1493]/40">
            {services.map((s, i) => (
              <div key={s.title} className="border border-[#ff1493]/40 -m-px p-6 hover:bg-[#ff1493]/10 hover:shadow-[inset_0_0_30px_rgba(255,20,147,0.3)] transition-all">
                <div className="text-xs text-[#00ffff] uppercase tracking-widest">0{i + 1} //</div>
                <h3 className="mt-3 text-lg uppercase tracking-wider">{s.title}</h3>
                <p className="mt-3 text-sm text-[#ffe6ff]/70">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="py-16 border-t border-[#ff1493]/20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#00ffff]">// Experience</div>
          <div className="mt-8 space-y-6">
            {experience.map((exp: any) => (
              <div key={exp.id} className="border-l-2 border-[#ff1493] pl-6 py-2 relative">
                <div className="absolute -left-1.5 top-2 w-3 h-3 bg-[#ff1493]" style={{ boxShadow: "0 0 10px rgba(255,20,147,0.8)" }} />
                <div className="text-xs text-[#00ffff] uppercase tracking-widest">
                  [{exp.startDate} – {exp.endDate || "Present"}]
                </div>
                <h3 className="mt-2 text-xl uppercase tracking-wider text-[#ffe6ff]">{exp.role}</h3>
                <div className="mt-1 text-sm text-[#ff1493] uppercase tracking-widest">{exp.company}</div>
                <p className="mt-4 text-sm text-[#ffe6ff]/70">{exp.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-16 border-t border-[#ff1493]/20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#00ffff]">// Skills</div>
          <div className="mt-8 flex flex-wrap gap-3">
            {skills.map((skill: any) => (
              <div key={skill.id} className="border border-[#00ffff]/50 bg-[#00ffff]/5 px-4 py-2 text-xs uppercase tracking-widest text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-colors cursor-default">
                {skill.name}
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="py-16 border-t border-[#ff1493]/20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#00ffff]">// Metrics</div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="border border-[#ff1493]/40 bg-[#ff1493]/5 p-6">
                <div className="text-4xl md:text-5xl font-bold text-[#ff1493]" style={{ textShadow: "0 0 15px rgba(255,20,147,0.6)" }}>
                  {s.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[#ffe6ff]/60">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="py-16 border-t border-[#ff1493]/20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#00ffff]">// Work</div>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <a key={p.title} href="#" className="group block border-2 border-[#ff1493]/40 bg-[#0a0014] p-8 hover:border-[#ff1493] hover:shadow-[0_0_40px_rgba(255,20,147,0.4)] transition-all">
                <div className="text-xs uppercase tracking-widest text-[#00ffff]">[{p.tag}]</div>
                <h3 className="mt-3 text-2xl uppercase tracking-wide text-[#ff1493]">{p.title}</h3>
                <p className="mt-6 text-sm text-[#ffe6ff]/70">{p.outcome}</p>
                <ArrowUpRight className="mt-4 h-4 w-4 text-[#00ffff]" />
              </a>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-[#ff1493]/20">
          <div className="text-xs uppercase tracking-[0.3em] text-[#00ffff]">// Why</div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {why.map((w, i) => (
              <div key={w.title} className="border-l-2 border-[#ff1493] pl-4">
                <div className="text-xs text-[#00ffff] uppercase tracking-widest">0{i + 1}</div>
                <h3 className="mt-2 text-lg uppercase tracking-wider">{w.title}</h3>
                <p className="mt-2 text-sm text-[#ffe6ff]/70">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24 border-t border-[#ff1493]/20 text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-[#00ffff]">// {contact.badge}</div>
          <h2 className="mt-6 text-5xl md:text-6xl font-bold uppercase tracking-tight">
            {contact.headingLead}{" "}
            <span className="text-[#ff1493]" style={{ textShadow: "0 0 25px rgba(255,20,147,0.7)" }}>
              {contact.headingAccent}
            </span>
          </h2>
          <p className="mt-4 text-[#ffe6ff]/70 max-w-xl mx-auto">{contact.sub}</p>
          <div className="mt-8 flex justify-center gap-3 text-sm uppercase tracking-widest">
            <a href={links.book} className="border-2 border-[#ff1493] bg-[#ff1493] text-black px-6 py-3 shadow-[0_0_30px_rgba(255,20,147,0.6)]">▶ Book</a>
            <a href={links.email} className="border-2 border-[#00ffff] text-[#00ffff] px-6 py-3">[ Email ]</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#ff1493]/40 py-6">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-xs uppercase tracking-widest text-[#ffe6ff]/50">
          <div>// © {new Date().getFullYear()} {identity.name}</div>
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

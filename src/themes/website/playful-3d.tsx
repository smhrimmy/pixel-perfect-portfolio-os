import { ArrowUpRight } from "lucide-react";
import type { ThemeRendererProps } from "../types";

export default function Playful3D({ data }: ThemeRendererProps) {
  const { profile, projects, skills, experience: rawExperience, socialLinks } = data;
  
  const identity = { name: profile?.name || "YOUR NAME", brandDot: "." };
  const hero = { 
    badge: "Available for work", 
    headingLead: "I build", 
    headingAccent: "bold", 
    headingTail: "things", 
    sub: profile?.bio || "A creative developer.", 
    industries: ["Tech", "Design"] 
  };
  const services = [{title: "Design", body: "Visual identities."}, {title: "Development", body: "Full-stack apps."}];
  const stats = [{value: projects?.length || 0, label: "Projects"}];
  const why = [{title: "Speed", body: "Fast"}];
  const contact = { badge: "Contact", headingLead: "Let's talk", headingAccent: "now", sub: "Ready to work." };
  const links = { book: "#", email: profile?.email || "", linkedin: socialLinks?.linkedin || "", github: socialLinks?.github || "", twitter: socialLinks?.twitter || "" };
  
  const experience = (rawExperience || []).map(e => ({ 
    ...e, 
    startDate: e.start_date ? e.start_date.substring(0, 7) : "", 
    endDate: e.end_date ? e.end_date.substring(0, 7) : null, 
    role: e.position,
    summary: e.description
  }));
  return (
    <div className="min-h-screen bg-[#f6c445] text-[#1a1a1a] font-sans overflow-hidden relative">
      {/* Floating blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#ff5b5b] blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-[#3b7dff] blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#22c55e] blur-3xl opacity-60" />
      </div>

      <header className="relative z-10">
        <nav className="mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-black text-xl">
            <span className="inline-block h-8 w-8 rounded-md bg-[#1a1a1a] rotate-6" />
            {identity.name}
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#work">Playground</a>
            <a href="#contact">Say hi</a>
          </div>
          <a
            href={links.book}
            className="rounded-full bg-[#1a1a1a] text-white px-5 py-2.5 text-sm font-semibold shadow-[6px_6px_0_#ff5b5b] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0_#ff5b5b] transition-all"
          >
            Let&apos;s play →
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6">
        <section id="top" className="py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-[#1a1a1a] px-4 py-1.5 text-xs font-bold shadow-[4px_4px_0_#1a1a1a]">
            <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
            {hero.badge}
          </div>
          <h1 className="mt-8 text-6xl md:text-8xl font-black leading-[0.95] tracking-tighter">
            {hero.headingLead}{" "}
            <span className="inline-block rotate-[-2deg] bg-[#1a1a1a] text-[#f6c445] px-3 rounded-lg">
              {hero.headingAccent}
            </span>{" "}
            {hero.headingTail}
          </h1>
          <p className="mt-8 text-xl max-w-2xl font-medium">{hero.sub}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={links.book} className="rounded-full bg-[#ff5b5b] text-white px-8 py-4 font-bold shadow-[8px_8px_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#1a1a1a] transition-all">
              Book a call →
            </a>
            <a href="#work" className="rounded-full bg-white text-[#1a1a1a] px-8 py-4 font-bold border-2 border-[#1a1a1a] shadow-[8px_8px_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#1a1a1a] transition-all">
              Explore
            </a>
          </div>
        </section>

        <section id="services" className="py-16 grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="rounded-3xl bg-white border-2 border-[#1a1a1a] p-8 shadow-[8px_8px_0_#1a1a1a] hover:rotate-1 transition-transform"
              style={{ transform: `rotate(${(i - 1) * 1.5}deg)` }}
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white text-xl font-black ${["bg-[#ff5b5b]", "bg-[#3b7dff]", "bg-[#22c55e]"][i % 3]}`}>
                {i + 1}
              </div>
              <h3 className="mt-4 text-2xl font-black">{s.title}</h3>
              <p className="mt-3 text-sm">{s.body}</p>
            </div>
          ))}
        </section>

        <section className="py-16">
          <div className="rounded-3xl bg-[#1a1a1a] text-white p-10 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-[12px_12px_0_#ff5b5b]">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-5xl font-black text-[#f6c445]">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="py-16">
          <div className="text-xs uppercase tracking-[0.3em] font-bold">Resume</div>
          <div className="mt-8 space-y-6">
            {experience.map((exp: any, i: number) => (
              <div
                key={exp.id}
                className="rounded-3xl bg-white border-2 border-[#1a1a1a] p-8 shadow-[8px_8px_0_#1a1a1a] hover:-translate-y-1 hover:shadow-[12px_12px_0_#1a1a1a] transition-all flex flex-col md:flex-row gap-6 justify-between items-start"
                style={{ transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.5}deg)` }}
              >
                <div>
                  <h3 className="text-2xl font-black">{exp.role}</h3>
                  <div className={`mt-2 inline-block px-3 py-1 rounded-full text-white text-sm font-bold ${["bg-[#ff5b5b]", "bg-[#3b7dff]", "bg-[#22c55e]"][i % 3]}`}>
                    {exp.company}
                  </div>
                  <p className="mt-4 text-sm max-w-2xl font-medium">{exp.summary}</p>
                </div>
                <div className="shrink-0 rounded-full border-2 border-[#1a1a1a] px-4 py-1.5 text-xs font-bold uppercase shadow-[4px_4px_0_#1a1a1a]">
                  {exp.startDate} – {exp.endDate || "Present"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="py-16">
          <div className="text-xs uppercase tracking-[0.3em] font-bold">Skills</div>
          <div className="mt-8 flex flex-wrap gap-4">
            {skills.map((skill: any, i: number) => (
              <div
                key={skill.id}
                className="rounded-full bg-white border-2 border-[#1a1a1a] px-5 py-2.5 font-bold shadow-[4px_4px_0_#1a1a1a] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#1a1a1a] transition-all cursor-default"
                style={{ transform: `rotate(${(i % 3 - 1) * 2}deg)` }}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="py-16">
          <div className="text-xs uppercase tracking-[0.3em] font-bold">Playground</div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <a
                key={p.title}
                href="#"
                className="group rounded-3xl border-2 border-[#1a1a1a] p-8 shadow-[8px_8px_0_#1a1a1a] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_#1a1a1a] transition-all"
                style={{ background: ["#ffe4a3", "#c8e0ff", "#c8ffd4", "#ffd6e0"][i % 4] }}
              >
                <div className="text-xs uppercase tracking-widest font-bold">{p.tag}</div>
                <h3 className="mt-3 text-3xl font-black">{p.title}</h3>
                <p className="mt-4 text-sm">{p.outcome}</p>
                <ArrowUpRight className="mt-6 h-6 w-6" />
              </a>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="text-xs uppercase tracking-[0.3em] font-bold">Why me</div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {why.map((w, i) => (
              <div key={w.title} className="rounded-2xl bg-white border-2 border-[#1a1a1a] p-6 shadow-[6px_6px_0_#3b7dff]" style={{ transform: `rotate(${(i - 1) * -1}deg)` }}>
                <h3 className="text-lg font-black">{w.title}</h3>
                <p className="mt-2 text-sm">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="rounded-3xl bg-[#1a1a1a] p-14 text-center text-white shadow-[12px_12px_0_#22c55e]">
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#f6c445]">{contact.badge}</div>
            <h2 className="mt-6 text-5xl md:text-7xl font-black tracking-tighter">
              {contact.headingLead}{" "}
              <span className="text-[#f6c445]">{contact.headingAccent}</span>.
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">{contact.sub}</p>
            <div className="mt-8 flex justify-center gap-4">
              <a href={links.book} className="rounded-full bg-[#f6c445] text-[#1a1a1a] px-8 py-4 font-bold shadow-[6px_6px_0_#ff5b5b]">Book a call</a>
              <a href={links.email} className="rounded-full border-2 border-white px-8 py-4 font-bold">Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mx-auto max-w-6xl px-6 py-8 text-sm font-medium">
        © {new Date().getFullYear()} {identity.name} — made with vibes
      </footer>
    </div>
  );
}

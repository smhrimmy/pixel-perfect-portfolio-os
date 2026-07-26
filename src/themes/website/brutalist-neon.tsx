import { ArrowUpRight, Github, Linkedin, Mail, Twitter, Zap } from "lucide-react";
import type { ThemeProps } from "./registry";

export default function BrutalistNeon({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links, experience = [], skills = [] } = content;

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-black font-sans">
      <header className="border-b-4 border-black bg-[#f4f1ea]">
        <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="text-xl font-black uppercase tracking-tight">
            {identity.name}<span className="text-[#ff3b00]">{identity.brandDot}</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-bold uppercase">
            <a href="#services">Services</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
          <a href={links.book} className="border-4 border-black bg-[#c4ff3d] px-4 py-2 text-sm font-black uppercase shadow-[4px_4px_0_0_#000]">
            Book →
          </a>
        </nav>
      </header>

      <main>
        <section id="top" className="border-b-4 border-black">
          <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase">
                {hero.badge}
              </div>
              <h1 className="mt-6 text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                {hero.headingLead}{" "}
                <span className="bg-[#ff3b00] text-white px-2 -rotate-1 inline-block">{hero.headingAccent}</span>{" "}
                {hero.headingTail}
              </h1>
              <p className="mt-8 text-lg font-medium max-w-xl">{hero.sub}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={links.book} className="border-4 border-black bg-[#c4ff3d] px-6 py-3 font-black uppercase shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  Book a call
                </a>
                <a href="#work" className="border-4 border-black bg-white px-6 py-3 font-black uppercase shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  See work
                </a>
              </div>
            </div>
            <div className="border-4 border-black bg-[#c4ff3d] p-6 shadow-[8px_8px_0_0_#000]">
              <Zap className="h-8 w-8" />
              <div className="mt-4 text-xs font-black uppercase">Industries</div>
              <ul className="mt-3 space-y-2">
                {hero.industries.map((i) => (
                  <li key={i} className="font-black text-lg uppercase border-b-2 border-black pb-1">{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="services" className="border-b-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase">What I do<span className="text-[#ff3b00]">.</span></h2>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {services.map((s, i) => (
                <div key={s.title} className={`border-4 border-black p-6 shadow-[6px_6px_0_0_#000] ${i % 2 === 0 ? "bg-[#c4ff3d]" : "bg-white"}`}>
                  <div className="text-xs font-black uppercase">0{i + 1}</div>
                  <h3 className="mt-3 text-2xl font-black uppercase">{s.title}</h3>
                  <p className="mt-3 text-sm font-medium">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="border-b-4 border-black bg-[#f4f1ea]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase">Experience<span className="text-[#ff3b00]">.</span></h2>
            <div className="mt-12 space-y-8">
              {experience.map((exp: any, i: number) => (
                <div key={exp.id} className="border-4 border-black bg-white p-6 shadow-[8px_8px_0_0_#000] relative">
                  <div className="absolute top-0 right-0 bg-[#c4ff3d] border-b-4 border-l-4 border-black px-4 py-1 font-black uppercase text-sm hidden sm:block">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                  <h3 className="text-3xl font-black uppercase mt-4 sm:mt-0">{exp.role}</h3>
                  <div className="text-lg font-bold uppercase mt-1 text-[#ff3b00]">{exp.company}</div>
                  <p className="mt-4 font-medium">{exp.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="border-b-4 border-black bg-[#c4ff3d]">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase">Skills<span className="text-[#ff3b00]">.</span></h2>
            <div className="mt-12 flex flex-wrap gap-4">
              {skills.map((skill: any) => (
                <div key={skill.id} className="border-4 border-black bg-white px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-[#c4ff3d] transition-colors cursor-default">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="results" className="border-b-4 border-black bg-[#ff3b00] text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-5xl md:text-6xl font-black">{s.value}</div>
                <div className="mt-2 font-black uppercase text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="border-b-4 border-black">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase">Work<span className="text-[#ff3b00]">.</span></h2>
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <a key={p.title} href="#" className="group border-4 border-black bg-white p-8 shadow-[8px_8px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                  <div className="text-xs font-black uppercase">{p.tag}</div>
                  <h3 className="mt-3 text-3xl font-black uppercase">{p.title}</h3>
                  <p className="mt-6 font-medium">{p.outcome}</p>
                  <ArrowUpRight className="mt-4 h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase">Why<span className="text-[#ff3b00]">.</span></h2>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {why.map((w, i) => (
                <div key={w.title} className="border-4 border-black p-6">
                  <div className="text-4xl font-black">0{i + 1}</div>
                  <h3 className="mt-3 text-xl font-black uppercase">{w.title}</h3>
                  <p className="mt-3 text-sm font-medium">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#c4ff3d]">
          <div className="mx-auto max-w-4xl px-6 py-24 text-center">
            <div className="inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase">
              {contact.badge}
            </div>
            <h2 className="mt-6 text-5xl md:text-7xl font-black uppercase leading-[0.9]">
              {contact.headingLead} <span className="bg-black text-[#c4ff3d] px-2">{contact.headingAccent}</span>
            </h2>
            <p className="mt-6 font-medium max-w-xl mx-auto">{contact.sub}</p>
            <div className="mt-8 flex justify-center gap-4">
              <a href={links.book} className="border-4 border-black bg-white px-6 py-3 font-black uppercase shadow-[6px_6px_0_0_#000]">Book a call</a>
              <a href={links.email} className="border-4 border-black bg-[#ff3b00] text-white px-6 py-3 font-black uppercase shadow-[6px_6px_0_0_#000]">Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-4 border-black bg-black text-white py-8">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-sm font-black uppercase">
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

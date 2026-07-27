import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ThemeRendererProps } from "../types";

export default function MinimalMono({ data }: ThemeRendererProps) {
  const { profile, services, projects, experience, skills, socialLinks, testimonials } = data;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <nav className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">
            {profile?.name?.split(" ")[0] || "Portfolio"}<span className="text-neutral-400">.</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <a href="#services" className="hover:text-neutral-900">Services</a>
            <a href="#experience" className="hover:text-neutral-900">Experience</a>
            <a href="#skills" className="hover:text-neutral-900">Skills</a>
            <a href="#work" className="hover:text-neutral-900">Work</a>
            <a href="#contact" className="hover:text-neutral-900">Contact</a>
          </div>
          <a href={`mailto:${profile?.email || ""}`} className="text-sm font-medium underline underline-offset-4">Book a call</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
          {profile?.location && <div className="text-xs uppercase tracking-[0.24em] text-neutral-500">{profile.location}</div>}
          <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight">
            {profile?.headline || "Building Digital Experiences"}
          </h1>
          <p className="mt-6 text-lg text-neutral-600 max-w-xl">{profile?.bio}</p>
          <div className="mt-10 flex gap-4">
            <a href={`mailto:${profile?.email || ""}`} className="inline-flex items-center gap-1 rounded-full bg-neutral-900 text-white px-5 py-2.5 text-sm">
              Book a call <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#work" className="inline-flex items-center gap-1 rounded-full border border-neutral-300 px-5 py-2.5 text-sm">See work</a>
          </div>
        </section>

        {/* Services */}
        {services && services.length > 0 && (
          <section id="services" className="border-t border-neutral-200">
            <div className="mx-auto max-w-5xl px-6 py-20">
              <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Services</h2>
              <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
                {services.map((s, i) => (
                  <div key={s.id} className="grid grid-cols-12 gap-6 py-6">
                    <div className="col-span-2 text-sm text-neutral-400 tabular-nums">0{i + 1}</div>
                    <h3 className="col-span-4 text-lg font-medium">{s.title}</h3>
                    <p className="col-span-6 text-sm text-neutral-600">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section id="experience" className="border-t border-neutral-200">
            <div className="mx-auto max-w-5xl px-6 py-20">
              <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Experience</h2>
              <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
                {experience.map((exp) => (
                  <div key={exp.id} className="py-8 grid md:grid-cols-4 gap-6">
                    <div className="text-sm font-medium text-neutral-500 tabular-nums">
                      {exp.start_date} – {exp.end_date || "Present"}
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <div className="mt-1 text-sm text-neutral-900">{exp.company}</div>
                      <p className="mt-4 text-sm text-neutral-600 leading-relaxed max-w-2xl">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section id="skills" className="border-t border-neutral-200">
            <div className="mx-auto max-w-5xl px-6 py-20">
              <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Skills</h2>
              <div className="mt-10 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600 cursor-default">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section id="work" className="border-t border-neutral-200">
            <div className="mx-auto max-w-5xl px-6 py-20">
              <h2 className="text-xs uppercase tracking-[0.24em] text-neutral-500">Selected work</h2>
              <div className="mt-10 grid md:grid-cols-2 gap-px bg-neutral-200">
                {projects.map((p) => (
                  <a key={p.id} href={p.live_demo_url || p.github_url || "#"} className="group bg-white p-8 hover:bg-neutral-50 transition-colors">
                    <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
                    <p className="mt-8 text-sm text-neutral-600">{p.description}</p>
                    <ArrowUpRight className="mt-4 h-4 w-4 text-neutral-400 group-hover:text-neutral-900" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact */}
        <section id="contact" className="border-t border-neutral-200 bg-neutral-900 text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            {profile?.email && <div className="text-xs uppercase tracking-[0.24em] text-neutral-400">Available for new opportunities</div>}
            <h2 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
              Let's build something <em className="not-italic underline decoration-neutral-500 decoration-4 underline-offset-8">great</em>.
            </h2>
            <div className="mt-8 flex justify-center gap-4">
              {profile?.email && (
                <>
                  <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 rounded-full bg-white text-neutral-900 px-5 py-2.5 text-sm">Email <ArrowUpRight className="h-4 w-4" /></a>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 py-8">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-sm text-neutral-500">
          <div>© {new Date().getFullYear()} {profile?.name || "Portfolio"}</div>
          <div className="flex items-center gap-4">
            {socialLinks?.twitter && <a href={socialLinks.twitter}><Twitter className="h-4 w-4" /></a>}
            {socialLinks?.linkedin && <a href={socialLinks.linkedin}><Linkedin className="h-4 w-4" /></a>}
            {socialLinks?.github && <a href={socialLinks.github}><Github className="h-4 w-4" /></a>}
            {profile?.email && <a href={`mailto:${profile.email}`}><Mail className="h-4 w-4" /></a>}
          </div>
        </div>
      </footer>
    </div>
  );
}

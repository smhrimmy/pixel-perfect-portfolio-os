import { ArrowUpRight, Github, Linkedin, Mail, Terminal } from "lucide-react";
import type { ThemeRendererProps } from "../types";

export default function DevShowcase({ data }: ThemeRendererProps) {
  const { profile, projects, skills, experience, socialLinks } = data;
  
  // Safe defaults
  const name = profile?.name || "Developer";
  const email = profile?.email || "hello@example.com";
  
  // Create some derived blocks to match the old theme structure
  const heroBadge = "Open to work";
  const heroHeadingLead = "I build";
  const heroHeadingAccent = "software";
  const heroHeadingTail = "for the web.";
  const heroSub = profile?.bio || "A passionate software engineer focused on building robust and scalable applications.";

  const stats = [
    { value: projects?.length || 0, label: "Projects Shipped" },
    { value: experience?.length || 0, label: "Roles Held" },
    { value: skills?.length || 0, label: "Technologies" },
    { value: "100%", label: "Commitment" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans">
      {/* Dot grid bg */}
      <div className="pointer-events-none fixed inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.15) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />

      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0a0a0f]/70 border-b border-white/5">
        <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm">
            <Terminal className="h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">~/</span>{name.toLowerCase().replace(/\s+/g, "-")}
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-mono text-slate-400">
            <a href="#experience" className="hover:text-emerald-400">./experience</a>
            <a href="#skills" className="hover:text-emerald-400">./skills</a>
            <a href="#work" className="hover:text-emerald-400">./work</a>
            <a href="#contact" className="hover:text-emerald-400">./contact</a>
          </div>
          <a href={`mailto:${email}`} className="rounded-md bg-emerald-500 text-black px-4 py-2 text-sm font-mono font-semibold hover:bg-emerald-400 transition-colors">
            $ book
          </a>
        </nav>
      </header>

      <main className="relative z-10">
        <section id="top" className="mx-auto max-w-6xl px-6 py-28">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {heroBadge}
          </div>
          <div className="mt-8 font-mono text-xs text-slate-500">const hero = {"{"}</div>
          <h1 className="mt-2 text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-slate-500">{"  "}</span>
            {heroHeadingLead}{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {heroHeadingAccent}
            </span>{" "}
            <br />
            <span className="text-slate-500">{"  "}</span>
            {heroHeadingTail}
          </h1>
          <div className="mt-4 font-mono text-xs text-slate-500">{"}"}</div>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl leading-relaxed">{heroSub}</p>
          <div className="mt-10 flex gap-3">
            <a href={`mailto:${email}`} className="group inline-flex items-center gap-2 rounded-md bg-emerald-500 text-black px-6 py-3 font-mono font-semibold hover:bg-emerald-400">
              $ book_call.sh <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#work" className="rounded-md border border-white/10 bg-white/5 px-6 py-3 font-mono text-slate-300 hover:bg-white/10">
              cat ./projects
            </a>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
          <div className="font-mono text-xs text-emerald-400">// git log --experience</div>
          <h2 className="mt-2 text-3xl font-bold">Commit History</h2>
          <div className="mt-8 space-y-4 border-l border-white/10 ml-2 pl-6 relative">
            {(experience || []).map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-[#0a0a0f] border border-emerald-400 group-hover:bg-emerald-400 transition-colors" />
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-500/30 transition-colors">
                  <div className="font-mono text-xs text-slate-500 mb-2">
                    <span className="text-emerald-400">commit</span> {exp.start_date?.substring(0, 7)} - {exp.end_date ? exp.end_date.substring(0, 7) : "Present"}
                  </div>
                  <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                  <div className="text-sm font-mono text-cyan-400 mt-1">@ {exp.company}</div>
                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
          <div className="font-mono text-xs text-emerald-400">// package.json dependencies</div>
          <h2 className="mt-2 text-3xl font-bold">Tech Stack</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {(skills || []).map((skill) => (
              <div key={skill.id} className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-xs text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default">
                "{skill.name}": "latest"
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold bg-gradient-to-br from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-slate-500 font-mono">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-6 py-16">
          <div className="font-mono text-xs text-emerald-400">// selected work</div>
          <h2 className="mt-2 text-3xl font-bold">Recent builds</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {(projects || []).map((p) => (
              <a key={p.id} href={p.live_demo_url || "#"} target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 bg-white/[0.02] p-8 hover:border-cyan-500/30 transition-colors block">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-cyan-400">{Array.isArray(p.technologies) ? p.technologies[0] : ""}</div>
                  <div className="font-mono text-xs text-slate-500">→</div>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-white group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                <p className="mt-4 text-sm text-slate-400 leading-relaxed">{p.description}</p>
                <div className="mt-6 rounded-md bg-black/40 border border-white/5 px-3 py-2 font-mono text-xs text-slate-400">
                  <span className="text-emerald-400">$</span> git log --oneline
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent p-14 text-center">
            <div className="font-mono text-xs text-emerald-400">// initialize connection</div>
            <h2 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
              Let's build{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">together</span>.
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">Currently open for new opportunities.</p>
            <div className="mt-8 flex justify-center gap-3">
              <a href={`mailto:${email}`} className="rounded-md bg-emerald-500 text-black px-6 py-3 font-mono font-semibold">$ ./book</a>
              <a href={`mailto:${email}`} className="rounded-md border border-white/10 px-6 py-3 font-mono text-slate-300">./email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between text-sm text-slate-500 font-mono">
          <div>// © {new Date().getFullYear()} {name}</div>
          <div className="flex items-center gap-4">
            {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4 hover:text-emerald-400" /></a>}
            {socialLinks?.github && <a href={socialLinks.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4 hover:text-emerald-400" /></a>}
            {email && <a href={`mailto:${email}`}><Mail className="h-4 w-4 hover:text-emerald-400" /></a>}
          </div>
        </div>
      </footer>
    </div>
  );
}

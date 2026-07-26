import { ArrowUpRight, Github, Linkedin, Mail, Twitter, Sparkles } from "lucide-react";
import type { ThemeProps } from "./registry";

export default function GlassMorph({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links } = content;

  return (
    <div className="min-h-screen text-white font-sans relative overflow-hidden bg-slate-950">
      {/* Aurora background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-fuchsia-500/40 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[700px] h-[700px] bg-cyan-400/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-violet-500/40 rounded-full blur-[120px]" />
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            {identity.name}<span className="text-cyan-300">{identity.brandDot}</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <a href={links.book} className="rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-4 py-2 text-sm hover:bg-white/20">Book →</a>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6">
        <section id="top" className="py-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 px-4 py-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {hero.badge}
          </div>
          <h1 className="mt-8 text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
            {hero.headingLead}{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
              {hero.headingAccent}
            </span>{" "}
            {hero.headingTail}
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">{hero.sub}</p>
          <div className="mt-10 flex justify-center gap-3">
            <a href={links.book} className="rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-medium hover:bg-white/90">Book a call</a>
            <a href="#work" className="rounded-full backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-3 text-sm hover:bg-white/20">See work</a>
          </div>
        </section>

        <section id="services" className="py-16">
          <div className="text-xs uppercase tracking-[0.24em] text-white/50">Services</div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-lg font-medium">{s.title}</h3>
                <p className="mt-3 text-sm text-white/70">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="py-16">
          <div className="rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl md:text-5xl font-semibold bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="py-16">
          <div className="text-xs uppercase tracking-[0.24em] text-white/50">Selected work</div>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <a key={p.title} href="#" className="group rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors">
                <div className="text-xs uppercase tracking-widest text-cyan-300">{p.tag}</div>
                <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-6 text-sm text-white/70">{p.outcome}</p>
                <ArrowUpRight className="mt-4 h-4 w-4 text-white/40 group-hover:text-white" />
              </a>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="text-xs uppercase tracking-[0.24em] text-white/50">Why me</div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {why.map((w) => (
              <div key={w.title} className="rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-lg font-medium">{w.title}</h3>
                <p className="mt-3 text-sm text-white/70">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-16 text-center">
            <div className="text-xs uppercase tracking-[0.24em] text-white/50">{contact.badge}</div>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
              {contact.headingLead}{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                {contact.headingAccent}
              </span>.
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">{contact.sub}</p>
            <div className="mt-8 flex justify-center gap-3">
              <a href={links.book} className="rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-medium">Book a call</a>
              <a href={links.email} className="rounded-full backdrop-blur-xl bg-white/10 border border-white/20 px-6 py-3 text-sm">Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 backdrop-blur-xl bg-white/5">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between text-sm text-white/50">
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

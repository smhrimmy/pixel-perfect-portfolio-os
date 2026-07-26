import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ThemeProps } from "./registry";

export default function SunsetPaper({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links } = content;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fef3ec] via-[#fde4d1] to-[#f9c8b0] text-[#3b1f14] font-sans">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fef3ec]/70 border-b border-[#3b1f14]/10">
        <nav className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-semibold text-lg tracking-tight">
            {identity.name}<span className="text-[#e85d3c]">{identity.brandDot}</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#3b1f14]/70">
            <a href="#services" className="hover:text-[#e85d3c]">Services</a>
            <a href="#work" className="hover:text-[#e85d3c]">Work</a>
            <a href="#contact" className="hover:text-[#e85d3c]">Contact</a>
          </div>
          <a href={links.book} className="rounded-full bg-[#3b1f14] text-[#fef3ec] px-4 py-2 text-sm hover:bg-[#e85d3c]">
            Book →
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section id="top" className="py-28">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur border border-[#e85d3c]/30 px-4 py-1.5 text-xs">
            <span className="h-2 w-2 rounded-full bg-[#e85d3c]" />
            {hero.badge}
          </div>
          <h1 className="mt-8 text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
            {hero.headingLead}{" "}
            <span className="bg-gradient-to-r from-[#e85d3c] via-[#f39c3b] to-[#e85d3c] bg-clip-text text-transparent italic">
              {hero.headingAccent}
            </span>{" "}
            {hero.headingTail}
          </h1>
          <p className="mt-6 text-lg text-[#3b1f14]/70 max-w-2xl">{hero.sub}</p>
          <div className="mt-10 flex gap-3">
            <a href={links.book} className="inline-flex items-center gap-1 rounded-full bg-[#e85d3c] text-white px-6 py-3 text-sm shadow-lg shadow-[#e85d3c]/30">
              Book a call <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#work" className="rounded-full bg-white/70 border border-[#3b1f14]/20 px-6 py-3 text-sm">See work</a>
          </div>
        </section>

        <section id="services" className="py-16">
          <div className="text-xs uppercase tracking-[0.24em] text-[#e85d3c]">Services</div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-3xl bg-white/60 backdrop-blur-sm border border-white p-6 shadow-sm">
                <h3 className="text-lg font-medium">{s.title}</h3>
                <p className="mt-3 text-sm text-[#3b1f14]/70">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="py-16">
          <div className="rounded-3xl bg-[#3b1f14] text-[#fef3ec] p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-5xl font-semibold text-[#f39c3b]">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-[#fef3ec]/60">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="work" className="py-16">
          <div className="text-xs uppercase tracking-[0.24em] text-[#e85d3c]">Selected work</div>
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <a key={p.title} href="#" className="group rounded-3xl bg-white/70 backdrop-blur-sm border border-white p-8 hover:bg-white transition-colors">
                <div className="text-xs uppercase tracking-widest text-[#e85d3c]">{p.tag}</div>
                <h3 className="mt-3 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-6 text-sm text-[#3b1f14]/70">{p.outcome}</p>
                <ArrowUpRight className="mt-4 h-4 w-4 text-[#e85d3c]" />
              </a>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="text-xs uppercase tracking-[0.24em] text-[#e85d3c]">Why me</div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {why.map((w) => (
              <div key={w.title} className="rounded-3xl bg-white/60 backdrop-blur-sm p-6">
                <h3 className="text-lg font-medium">{w.title}</h3>
                <p className="mt-3 text-sm text-[#3b1f14]/70">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="rounded-3xl bg-gradient-to-br from-[#e85d3c] to-[#f39c3b] p-14 text-center text-white">
            <div className="text-xs uppercase tracking-[0.24em] text-white/80">{contact.badge}</div>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
              {contact.headingLead} <span className="italic">{contact.headingAccent}</span>.
            </h2>
            <p className="mt-4 text-white/90 max-w-xl mx-auto">{contact.sub}</p>
            <div className="mt-8 flex justify-center gap-3">
              <a href={links.book} className="rounded-full bg-white text-[#e85d3c] px-6 py-3 text-sm font-medium">Book a call</a>
              <a href={links.email} className="rounded-full border border-white/50 px-6 py-3 text-sm">Email</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#3b1f14]/10 py-8">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-sm text-[#3b1f14]/60">
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

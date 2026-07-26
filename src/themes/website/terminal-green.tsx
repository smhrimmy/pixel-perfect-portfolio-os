import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ThemeProps } from "./registry";

export default function TerminalGreen({ content }: ThemeProps) {
  const { identity, hero, services, stats, projects, why, contact, links } = content;
  const prompt = <span className="text-emerald-500">$</span>;

  return (
    <div className="min-h-screen bg-black text-emerald-300 font-mono">
      <header className="border-b border-emerald-900/60 bg-black/80 backdrop-blur sticky top-0 z-40">
        <nav className="mx-auto max-w-5xl px-6 h-12 flex items-center justify-between text-sm">
          <a href="#top" className="text-emerald-400">
            <span className="text-emerald-600">~/</span>{identity.name.toLowerCase().replace(/\s+/g, "-")}
          </a>
          <div className="hidden md:flex items-center gap-5 text-emerald-500/80">
            <a href="#services" className="hover:text-emerald-300">./services</a>
            <a href="#work" className="hover:text-emerald-300">./work</a>
            <a href="#contact" className="hover:text-emerald-300">./contact</a>
          </div>
          <a href={links.book} className="border border-emerald-500/50 px-3 py-1 text-emerald-300 hover:bg-emerald-500/10">
            [book]
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section id="top" className="py-24">
          <div className="text-xs text-emerald-600">{prompt} whoami --badge</div>
          <div className="mt-2 text-emerald-500">{hero.badge}</div>

          <div className="mt-8 text-xs text-emerald-600">{prompt} cat headline.txt</div>
          <h1 className="mt-3 text-4xl md:text-6xl leading-tight text-emerald-200">
            {hero.headingLead} <span className="bg-emerald-500 text-black px-1">{hero.headingAccent}</span> {hero.headingTail}
          </h1>
          <p className="mt-6 text-emerald-400/90 max-w-2xl">{hero.sub}</p>
          <div className="mt-8 flex gap-3 text-sm">
            <a href={links.book} className="border border-emerald-500 bg-emerald-500/10 px-4 py-2 text-emerald-200 hover:bg-emerald-500/20">
              &gt; book_call()
            </a>
            <a href="#work" className="border border-emerald-500/50 px-4 py-2 text-emerald-400 hover:text-emerald-200">
              &gt; ls ./work
            </a>
          </div>
          <div className="mt-10 text-xs text-emerald-600">
            {prompt} echo $INDUSTRIES <br />
            <span className="text-emerald-400">[{hero.industries.map((i) => `"${i}"`).join(", ")}]</span>
          </div>
        </section>

        <section id="services" className="py-16 border-t border-emerald-900/60">
          <div className="text-xs text-emerald-600">{prompt} ls -la ./services</div>
          <div className="mt-6 border border-emerald-900/60">
            {services.map((s, i) => (
              <div key={s.title} className="grid grid-cols-12 gap-4 border-b border-emerald-900/60 last:border-b-0 px-4 py-3 text-sm hover:bg-emerald-500/5">
                <div className="col-span-1 text-emerald-600">0{i + 1}</div>
                <div className="col-span-4 text-emerald-200">{s.title}</div>
                <div className="col-span-7 text-emerald-400/80">{s.body}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="results" className="py-16 border-t border-emerald-900/60">
          <div className="text-xs text-emerald-600">{prompt} cat metrics.json</div>
          <pre className="mt-4 border border-emerald-900/60 bg-emerald-950/30 p-6 text-sm text-emerald-300 overflow-x-auto">
{`{
${stats
  .map(
    (s, i) =>
      `  "${s.label.toLowerCase().replace(/\s+/g, "_")}": "${s.value}"${i < stats.length - 1 ? "," : ""}`,
  )
  .join("\n")}
}`}
          </pre>
        </section>

        <section id="work" className="py-16 border-t border-emerald-900/60">
          <div className="text-xs text-emerald-600">{prompt} git log --oneline</div>
          <div className="mt-6 space-y-3">
            {projects.map((p, i) => (
              <a key={p.title} href="#" className="block border border-emerald-900/60 px-4 py-3 hover:border-emerald-500/60 hover:bg-emerald-500/5 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-600">{(i + 1).toString(16).padStart(7, "0")}</span>
                  <span className="text-emerald-200">{p.title}</span>
                  <span className="text-emerald-600">[{p.tag}]</span>
                </div>
                <div className="mt-1 text-emerald-400/80 pl-[7ch]">→ {p.outcome}</div>
              </a>
            ))}
          </div>
        </section>

        <section className="py-16 border-t border-emerald-900/60">
          <div className="text-xs text-emerald-600">{prompt} man ./why-me</div>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {why.map((w, i) => (
              <div key={w.title} className="border border-emerald-900/60 p-4">
                <div className="text-xs text-emerald-600">SECTION 0{i + 1}</div>
                <h3 className="mt-2 text-emerald-200">{w.title}</h3>
                <p className="mt-2 text-sm text-emerald-400/80">{w.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="py-24 border-t border-emerald-900/60 text-center">
          <div className="text-xs text-emerald-600">{prompt} ./contact.sh</div>
          <div className="mt-4 text-emerald-500">{contact.badge}</div>
          <h2 className="mt-4 text-4xl md:text-5xl text-emerald-200">
            {contact.headingLead} <span className="bg-emerald-500 text-black px-1">{contact.headingAccent}</span>
          </h2>
          <p className="mt-4 text-emerald-400/90 max-w-xl mx-auto">{contact.sub}</p>
          <div className="mt-8 flex justify-center gap-3 text-sm">
            <a href={links.book} className="border border-emerald-500 bg-emerald-500/10 px-5 py-2 text-emerald-200">&gt; book_call()</a>
            <a href={links.email} className="border border-emerald-500/50 px-5 py-2 text-emerald-400">&gt; send_email()</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-900/60 py-6">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-xs text-emerald-600">
          <div>// © {new Date().getFullYear()} {identity.name} — exit 0</div>
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

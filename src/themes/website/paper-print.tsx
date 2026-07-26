import type { ThemeProps } from "./registry";

export default function PaperPrint({ content }: ThemeProps) {
  const c = content;
  return (
    <main className="min-h-screen bg-[#f5f1e8] text-neutral-900 font-serif">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="border-b-4 border-double border-neutral-900 pb-6">
          <div className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">
            The {c.identity?.name?.split(" ")[0] || "Daily"} Chronicle
          </div>
          <h1 className="mt-4 text-6xl md:text-7xl font-black tracking-tight leading-none">
            {[c.hero?.headingLead, c.hero?.headingAccent, c.hero?.headingTail].filter(Boolean).join(" ") || c.identity?.name || "Portfolio"}
          </h1>
          <p className="mt-4 text-lg italic text-neutral-700">{c.hero?.sub}</p>
        </div>

        <section className="mt-10 columns-1 md:columns-2 gap-8 [&>*]:break-inside-avoid">
          {(c.services ?? []).map((s) => (
            <article key={s.title} className="mb-8">
              <h3 className="text-xl font-bold uppercase tracking-wide">{s.title}</h3>
              <div className="mt-1 h-px w-10 bg-neutral-900" />
              <p className="mt-3 text-sm leading-relaxed text-neutral-800">{s.body}</p>
            </article>
          ))}
        </section>

        {(c.experience && c.experience.length > 0) && (
          <section className="mt-10 pt-10 border-t-2 border-neutral-900">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Professional Record</h2>
            <div className="columns-1 md:columns-2 gap-8 [&>*]:break-inside-avoid">
              {c.experience.map((exp: any) => (
                <article key={exp.id} className="mb-8">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-1">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </div>
                  <h3 className="text-xl font-bold italic">{exp.role}</h3>
                  <div className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-2">{exp.company}</div>
                  <p className="text-sm leading-relaxed text-neutral-800">{exp.summary}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {(c.skills && c.skills.length > 0) && (
          <section className="mt-10 pt-10 border-t-2 border-neutral-900">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Technical Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {c.skills.map((skill: any) => (
                <div key={skill.id} className="border border-neutral-400 px-3 py-1 text-sm font-bold uppercase tracking-wider bg-white">
                  {skill.name}
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 pt-6 border-t border-neutral-400 text-xs text-neutral-500 flex justify-between">
          <span>Vol. {new Date().getFullYear()}</span>
          <span>{c.identity?.name}</span>
        </footer>
      </div>
    </main>
  );
}

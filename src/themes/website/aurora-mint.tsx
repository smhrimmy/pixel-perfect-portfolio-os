import type { ThemeRendererProps } from "../types";

export default function AuroraMint({ data }: ThemeRendererProps) {
  const c = content;
  return (
    <main className="min-h-screen bg-[#04120f] text-emerald-50 overflow-hidden relative">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 10%, rgba(52,211,153,0.35), transparent 70%), radial-gradient(50% 50% at 80% 30%, rgba(34,211,238,0.25), transparent 70%), radial-gradient(80% 60% at 50% 100%, rgba(16,185,129,0.2), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/5 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
          {c.hero?.badge ?? "available"}
        </div>
        <h1 className="mt-6 font-display text-5xl md:text-7xl font-black tracking-tight leading-[1.02]">
          {[c.hero?.headingLead, c.hero?.headingAccent, c.hero?.headingTail].filter(Boolean).join(" ") || c.identity?.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-emerald-100/70">{c.hero?.sub}</p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          {(c.services ?? []).map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-emerald-300/15 bg-emerald-950/40 backdrop-blur p-5"
            >
              <div className="text-xs uppercase tracking-widest text-emerald-300/80">{s.title}</div>
              <p className="mt-2 text-sm text-emerald-50/80">{s.body}</p>
            </div>
          ))}
        </div>

        {(c.experience && c.experience.length > 0) && (
          <div className="mt-16 pt-16 border-t border-emerald-300/15">
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/80 mb-6">Experience</div>
            <div className="space-y-4">
              {c.experience.map((exp: any) => (
                <div key={exp.id} className="rounded-2xl border border-emerald-300/15 bg-emerald-950/40 backdrop-blur p-6 flex flex-col md:flex-row gap-6 justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-50">{exp.role}</h3>
                    <div className="text-sm font-medium text-emerald-300 mt-1">{exp.company}</div>
                    <p className="mt-3 text-sm text-emerald-100/70">{exp.summary}</p>
                  </div>
                  <div className="shrink-0 text-xs uppercase tracking-widest text-emerald-300/60">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(c.skills && c.skills.length > 0) && (
          <div className="mt-16 pt-16 border-t border-emerald-300/15">
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/80 mb-6">Skills</div>
            <div className="flex flex-wrap gap-2">
              {c.skills.map((skill: any) => (
                <div key={skill.id} className="rounded-full border border-emerald-300/20 bg-emerald-900/30 px-4 py-2 text-sm text-emerald-100/90 hover:bg-emerald-800/40 transition-colors cursor-default">
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="mt-24 text-xs text-emerald-100/50">
          © {new Date().getFullYear()} {c.identity?.name}
        </footer>
      </div>
    </main>
  );
}

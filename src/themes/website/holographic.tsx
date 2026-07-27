import type { ThemeRendererProps } from "../types";

export default function Holographic({ data }: ThemeRendererProps) {
  const c = content;
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, #ff00ea, #00e5ff, #7cff00, #ffbe0b, #ff00ea)",
          filter: "blur(120px)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-3xl border border-white/20 bg-black/50 backdrop-blur-2xl p-10 md:p-14">
          <div className="text-[11px] uppercase tracking-[0.3em] text-white/60">
            {c.hero?.badge ?? "portfolio"}
          </div>
          <h1
            className="mt-4 font-display text-5xl md:text-7xl font-black tracking-tight leading-[1.02]"
            style={{
              backgroundImage: "linear-gradient(120deg,#fff,#a78bfa 30%,#22d3ee 55%,#fff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {[c.hero?.headingLead, c.hero?.headingAccent, c.hero?.headingTail].filter(Boolean).join(" ") || c.identity?.name}
          </h1>
          <p className="mt-6 max-w-2xl text-white/70">{c.hero?.sub}</p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {(c.services ?? []).map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 hover:border-white/40 transition-colors"
              >
                <div className="text-xs uppercase tracking-widest text-white/60">{s.title}</div>
                <p className="mt-2 text-sm text-white/80">{s.body}</p>
              </div>
            ))}
          </div>

          {(c.experience && c.experience.length > 0) && (
            <div className="mt-12 pt-12 border-t border-white/15">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-6">Experience</div>
              <div className="space-y-4">
                {c.experience.map((exp: any) => (
                  <div key={exp.id} className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 hover:border-white/40 transition-colors flex flex-col md:flex-row gap-6 justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{exp.role}</h3>
                      <div className="text-sm mt-1" style={{ color: "#22d3ee" }}>{exp.company}</div>
                      <p className="mt-3 text-sm text-white/70">{exp.summary}</p>
                    </div>
                    <div className="shrink-0 text-xs uppercase tracking-widest text-white/50">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(c.skills && c.skills.length > 0) && (
            <div className="mt-12 pt-12 border-t border-white/15">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-6">Skills</div>
              <div className="flex flex-wrap gap-2">
                {c.skills.map((skill: any) => (
                  <div key={skill.id} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10 transition-colors cursor-default">
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

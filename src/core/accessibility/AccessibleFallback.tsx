import React from "react";
import { PORTFOLIO_DATA } from "../data/portfolio";

export function AccessibleFallback() {
  const { identity, projects, skills, experience, education } = PORTFOLIO_DATA;

  return (
    <main className="min-h-screen bg-black text-white p-6 sm:p-12 font-sans max-w-4xl mx-auto space-y-12">
      <header className="space-y-4 border-b border-zinc-800 pb-8">
        <h1 className="text-3xl sm:text-5xl font-bold">{identity.name}</h1>
        <p className="text-lg text-emerald-400 font-mono">{identity.headline}</p>
        <p className="text-zinc-300 leading-relaxed">{identity.bio}</p>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-400 font-mono">
          <span>{identity.location}</span>
          <span>{identity.email}</span>
          <span>{identity.phone}</span>
        </div>
      </header>

      <section className="space-y-6" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="text-2xl font-bold text-white border-b border-zinc-800 pb-2">
          Featured Engineering Projects
        </h2>
        <div className="grid gap-6">
          {projects.map((proj) => (
            <article key={proj.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <h3 className="text-xl font-bold text-emerald-400">{proj.title}</h3>
              <p className="text-sm text-zinc-300">{proj.description}</p>
              <div className="text-xs text-zinc-400 space-y-1 font-mono">
                <p><strong>Architecture:</strong> {proj.architecture}</p>
                <p><strong>Impact:</strong> {proj.impact}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {proj.technologies.map((t) => (
                  <span key={t} className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-300">
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-emerald-400 underline font-mono"
                >
                  Visit Live Production Link →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-2xl font-bold text-white border-b border-zinc-800 pb-2">
          Technical Skill Competencies
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {skills.map((cat) => (
            <div key={cat.category} className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <h3 className="text-lg font-bold text-zinc-200">{cat.category}</h3>
              <ul className="space-y-2">
                {cat.skills.map((s) => (
                  <li key={s.name} className="text-sm text-zinc-300">
                    <strong>{s.name}</strong>: {s.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="text-2xl font-bold text-white border-b border-zinc-800 pb-2">
          Professional Career Experience
        </h2>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.id} className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex justify-between items-baseline flex-wrap">
                <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                <span className="text-xs text-emerald-400 font-mono">{exp.period}</span>
              </div>
              <p className="text-sm text-zinc-400 font-mono">{exp.company} · {exp.location}</p>
              <p className="text-sm text-zinc-300">{exp.description}</p>
              <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1 pt-2">
                {exp.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t border-zinc-800 pt-8" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-2xl font-bold text-white">Direct Communication Station</h2>
        <p className="text-sm text-zinc-300">
          Email: <a href={`mailto:${identity.email}`} className="text-emerald-400 underline">{identity.email}</a> ·
          Phone: <a href={`tel:${identity.phone}`} className="text-emerald-400 underline">{identity.phone}</a>
        </p>
        <p className="text-sm text-zinc-300">
          Platform: <a href={identity.website} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{identity.website}</a> ·
          GitHub: <a href={identity.github} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{identity.github}</a> ·
          LinkedIn: <a href={identity.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{identity.linkedin}</a>
        </p>
      </section>
    </main>
  );
}

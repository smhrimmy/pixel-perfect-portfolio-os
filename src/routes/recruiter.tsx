import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { Download, Mail, Linkedin, Github, Printer, Calendar } from "lucide-react";
import { getLiveSite } from "@/lib/cms.functions";
import { listExperience } from "@/features/experience/actions/experience.actions";
import { listSkills } from "@/features/skills/actions/skills.actions";

const recruiterQuery = () =>
  queryOptions({
    queryKey: ["recruiter", "bundle"],
    queryFn: async () => {
      const [site, experience, skills] = await Promise.all([
        getLiveSite(),
        listExperience().catch(() => []),
        listSkills().catch(() => []),
      ]);
      return { site, experience, skills };
    },
    staleTime: 60_000,
  });

export const Route = createFileRoute("/recruiter")({
  head: () => ({
    meta: [
      { title: "For Recruiters — Portfolio" },
      { name: "description", content: "Recruiter-focused profile: skills, experience, resume, and direct contact." },
      { property: "og:title", content: "For Recruiters — Portfolio" },
      { property: "og:description", content: "Skills, experience, resume, and direct contact." },
    ],
  }),
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(recruiterQuery());
  },
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <RecruiterPage />
    </Suspense>
  ),
});

function RecruiterPage() {
  const { data } = useSuspenseQuery(recruiterQuery());
  const { site, experience, skills } = data;
  const { identity, links, seo } = site.content;

  type SkillRow = (typeof skills)[number];
  const skillGroups = skills.reduce<Record<string, SkillRow[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-background text-foreground print:bg-white print:text-black print:text-[11px] print:leading-snug">
      <div className="mx-auto max-w-4xl px-6 py-12 print:py-0 print:px-4 print:max-w-none">
        <div className="flex justify-between items-start gap-6 print:hidden">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Recruiter mode · {new Date().toLocaleDateString()}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted"
            >
              <Printer className="h-4 w-4" /> Print / PDF
            </button>
            <a
              href={links.email}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
            >
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>
        </div>

        {/* ATS Clean Print Layout */}
        <div className="print:block">
          
          {/* Header */}
          <header className="mt-8 print:mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-start border-b-2 border-primary/20 print:border-b-2 print:border-black print:pb-3 pb-6">
            <div>
              <h1 className="text-4xl font-bold print:text-2xl print:tracking-tight uppercase">{identity.name}</h1>
              <p className="mt-1 text-lg text-primary print:text-black print:text-sm font-medium">{identity.role}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-col gap-1 text-sm text-muted-foreground print:text-black print:text-[10px] print:text-right">
              <span className="inline-flex items-center sm:justify-end gap-1.5"><Mail className="h-3 w-3 print:hidden" /> {links.email}</span>
              <span className="inline-flex items-center sm:justify-end gap-1.5"><Linkedin className="h-3 w-3 print:hidden" /> {links.linkedin}</span>
              <span className="inline-flex items-center sm:justify-end gap-1.5"><Github className="h-3 w-3 print:hidden" /> {links.github}</span>
            </div>
          </header>

          {/* Summary */}
          <section className="mt-6 print:mt-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground print:text-black print:text-[11px] mb-2 flex items-center gap-2">
              <span className="print:hidden">User</span> Summary
            </h2>
            <p className="text-sm print:text-[11px] print:leading-relaxed text-muted-foreground print:text-black">
              {seo.description}
            </p>
          </section>

          {/* Skills */}
          <section className="mt-8 print:mt-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground print:text-black print:text-[11px] mb-2 flex items-center gap-2">
              <span className="print:hidden">Code</span> Skills
            </h2>
            <div className="flex flex-col gap-2 print:gap-1">
              {Object.entries(skillGroups).map(([cat, list]) => (
                <div key={cat} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <div className="text-sm font-semibold min-w-[140px] print:text-[10px] print:min-w-[120px] text-foreground print:text-black">{cat}:</div>
                  <div className="text-sm print:text-[10px] text-muted-foreground print:text-black">
                    {list.map(s => s.name).join(", ")}
                  </div>
                </div>
              ))}
              {skills.length === 0 && (
                <p className="text-sm text-muted-foreground">Add skills in Studio → Skills.</p>
              )}
            </div>
          </section>

          {/* Experience */}
          <section className="mt-8 print:mt-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground print:text-black print:text-[11px] mb-3 flex items-center gap-2">
              <span className="print:hidden">Work</span> Experience
            </h2>
            <div className="space-y-6 print:space-y-3">
              {experience.map((e) => (
                <article key={e.id} className="print:break-inside-avoid">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="font-bold text-base print:text-[12px] text-foreground print:text-black">
                      {e.company}
                    </h3>
                    <div className="text-sm font-medium text-muted-foreground print:text-black print:text-[10px] italic">
                      {e.location}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mt-0.5">
                    <div className="font-semibold text-primary print:text-black print:text-[11px]">
                      {e.role}
                    </div>
                    <div className="text-sm text-muted-foreground print:text-black print:text-[10px]">
                      {formatDate(e.startDate)} — {e.endDate ? formatDate(e.endDate) : "Present"}
                    </div>
                  </div>
                  {e.highlights.length > 0 && (
                    <ul className="mt-2 list-disc list-outside ml-4 text-sm space-y-1 print:text-[10px] print:mt-1 print:space-y-0.5 text-muted-foreground print:text-black">
                      {e.highlights.map((h, i) => <li key={i} className="pl-1 print:leading-snug">{h}</li>)}
                    </ul>
                  )}
                  {e.tech.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground print:text-[9px] print:mt-1 italic">
                      <span className="font-semibold not-italic">Tech:</span> {e.tech.join(", ")}
                    </div>
                  )}
                </article>
              ))}
              {experience.length === 0 && (
                <p className="text-sm text-muted-foreground">Add experience in Studio → Experience.</p>
              )}
            </div>
          </section>

        </div>

        <section className="mt-10 print:hidden">
          <div className="rounded-xl border p-6 bg-card">
            <h2 className="font-semibold">Want the PDF?</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Hit <span className="font-mono">Print / PDF</span> above — this page is print-styled for a clean one-file ATS resume.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-muted"
              >
                <Download className="h-4 w-4" /> Download as PDF
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

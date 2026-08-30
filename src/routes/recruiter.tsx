import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { Download, Mail, Linkedin, Github, Printer, Calendar, Bot, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { getLiveSite } from "@/lib/cms.functions";
import { listExperience } from "@/features/experience/actions/experience.actions";
import { listSkills } from "@/features/skills/actions/skills.actions";
import { analyzeJobDescription, type JobMatchResult } from "@/lib/pdl-intelligence/job-matcher";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

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
      { title: "For Recruiters — Prajwal DL Portfolio" },
      { name: "description", content: "Recruiter-focused profile: AI Job Matcher, skills, experience, ATS resume, and direct contact." },
      { property: "og:title", content: "For Recruiters — Prajwal DL Portfolio" },
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

  const [jobText, setJobText] = useState("");
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);

  const handleAnalyze = () => {
    if (!jobText.trim()) return;
    const result = analyzeJobDescription(jobText);
    setMatchResult(result);
  };

  type SkillRow = (typeof skills)[number];
  const skillGroups = skills.reduce<Record<string, SkillRow[]>>((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#07090D] text-[#E6F1FF] print:bg-white print:text-black print:text-[11px] print:leading-snug">
      <div className="mx-auto max-w-4xl px-6 py-12 print:py-0 print:px-4 print:max-w-none space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1E2630] pb-6 print:hidden">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E6C3] flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Recruiter Mode &amp; Candidate Portal
            </div>
            <p className="text-xs text-[#9AA6B2] mt-0.5">
              ATS-Optimized profile, verified credentials &amp; on-device AI job description matcher
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => window.print()}
              variant="outline"
              size="sm"
              className="border-[#1E2630] bg-[#11161D] text-xs h-8 hover:bg-[#1E2630]"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5" /> Print / PDF
            </Button>
            <Button asChild size="sm" className="bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-bold text-xs h-8">
              <a href={`mailto:${links.email}`}>
                <Mail className="h-3.5 w-3.5 mr-1.5" /> Contact Prajwal
              </a>
            </Button>
          </div>
        </div>

        {/* AI JOB MATCHER INTERACTIVE PORTAL */}
        <section className="rounded-3xl border border-[#1E2630] bg-[#11161D] p-6 shadow-xl space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Instant AI Job Matcher (Zero-Key Local Engine)</h3>
                <p className="text-xs text-[#9AA6B2]">Paste any job description to evaluate candidate compatibility score &amp; matching skill keywords</p>
              </div>
            </div>
            {matchResult && (
              <Badge variant="outline" className="border-purple-500/40 bg-purple-500/10 text-purple-400 font-mono text-xs">
                {matchResult.matchPercentage}% {matchResult.grade}
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <Textarea
              rows={3}
              placeholder="Paste job posting text here (e.g. 'Looking for a Senior Full Stack Engineer with React, TypeScript, Node.js, and Supabase...')"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              className="bg-[#0B0F14] border-[#1E2630] text-xs text-white placeholder:text-[#9AA6B2]"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!jobText.trim()}
              size="sm"
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs h-8"
            >
              Analyze Job Fit <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

          {/* Result Output */}
          {matchResult && (
            <div className="mt-4 p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Matched Core Technologies:</span>
                <span className="text-[11px] font-mono text-purple-400">{matchResult.matchingSkills.length} Verified Skills</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {matchResult.matchingSkills.map((s) => (
                  <Badge key={s} className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-[10px]">
                    <CheckCircle2 className="h-3 w-3 mr-1 text-purple-400" /> {s}
                  </Badge>
                ))}
              </div>
              <div className="pt-2 border-t border-purple-500/20 text-xs text-[#E6F1FF] leading-relaxed">
                <span className="font-bold text-purple-300">Custom Pitch: </span>
                {matchResult.tailoredPitch}
              </div>
            </div>
          )}
        </section>

        {/* ATS Clean Printable Body */}
        <div className="rounded-3xl border border-[#1E2630] bg-[#11161D] p-8 shadow-xl space-y-6 print:border-none print:p-0">
          {/* Header */}
          <header className="border-b border-[#1E2630] pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h1 className="text-3xl font-black uppercase text-white tracking-tight">{identity.name}</h1>
              <p className="mt-1 text-sm text-[#00E6C3] font-semibold">{identity.role}</p>
              <p className="text-xs text-[#9AA6B2] mt-2 max-w-xl">{seo.description}</p>
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-[#9AA6B2]">
              <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-[#00E6C3]" /> {links.email}</span>
              <span className="flex items-center gap-2"><Linkedin className="h-3.5 w-3.5 text-cyan-400" /> {links.linkedin}</span>
              <span className="flex items-center gap-2"><Github className="h-3.5 w-3.5 text-purple-400" /> {links.github}</span>
            </div>
          </header>

          {/* Work Experience */}
          <section className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E6C3]">Professional Experience</h2>
            <div className="space-y-4">
              {experience.map((exp: any) => (
                <div key={exp.id} className="space-y-1 p-3 rounded-xl bg-[#0B0F14] border border-[#1E2630]">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span>{exp.position} — {exp.company}</span>
                    <span className="text-[11px] font-mono text-[#9AA6B2]">
                      {exp.start_date ? exp.start_date.substring(0, 7) : ""} — {exp.is_current ? "Present" : exp.end_date ? exp.end_date.substring(0, 7) : ""}
                    </span>
                  </div>
                  {exp.location && <div className="text-[10px] text-[#9AA6B2]">📍 {exp.location}</div>}
                  <p className="text-xs text-[#9AA6B2] leading-relaxed pt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Categorized */}
          <section className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#00E6C3]">Technical Competencies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(skillGroups).map(([cat, skList]) => (
                <div key={cat} className="p-3 rounded-xl bg-[#0B0F14] border border-[#1E2630] space-y-2">
                  <span className="text-xs font-bold text-white">{cat}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skList.map((s) => (
                      <Badge key={s.id} variant="outline" className="border-white/10 bg-white/5 text-[10px] text-[#E6F1FF]">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

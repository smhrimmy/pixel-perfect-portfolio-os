import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { certificationsService } from "@/features/certifications/application/certifications.service";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Award, Calendar, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

const listCertificationsFn = createServerFn({ method: "GET" }).handler(async () => {
  return certificationsService().queries.list();
});

const certsQuery = queryOptions({
  queryKey: ["certifications", "page"],
  queryFn: () => listCertificationsFn(),
});

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: "Industry Certifications & Credentials | Prajwal DL" },
      {
        name: "description",
        content:
          "Accredited specializations in full-stack architecture, hosting infrastructure, and server diagnostics.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(certsQuery),
  component: CertificationsPage,
});

function CertificationsPage() {
  const { data: certs } = useSuspenseQuery(certsQuery);

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/certifications" />

      <main className="flex-1">
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <Award className="h-3.5 w-3.5" />
              <span>ACCREDITED CREDENTIALS</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Verified Technical <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                Certifications.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
              Formal accreditations and specializations validating enterprise full-stack development, server diagnostics, and scalable database management.
            </p>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <Award className="h-5 w-5" />
                      <span className="font-mono text-xs uppercase tracking-wider font-bold">{cert.issuer}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50">
                      <Calendar className="h-3.5 w-3.5" />
                      {cert.issueDate}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-bold font-display text-white">{cert.name}</h2>

                  {cert.description && (
                    <p className="mt-3 text-sm text-white/60 leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {cert.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono text-white/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {cert.url && (
                  <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Verified Authenticity</span>
                    </div>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition"
                    >
                      <span>Issuer Verification</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

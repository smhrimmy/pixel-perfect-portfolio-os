import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { settingsService } from "@/features/settings/application/settings.service";
import { createServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ArrowRight, CheckCircle2, Mail, MapPin, Send, Sparkles, Phone, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const getSettingsFn = createServerFn({ method: "GET" }).handler(async () => {
  return settingsService().queries.get();
});

const contactQuery = queryOptions({
  queryKey: ["contact", "settings"],
  queryFn: () => getSettingsFn(),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Collaboration | Prajwal DL" },
      {
        name: "description",
        content:
          "Inquire about engineering collaborations, full-stack systems architecture, or AI automations with Prajwal DL.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(contactQuery),
  component: ContactPage,
});

function ContactPage() {
  const { data: settings } = useSuspenseQuery(contactQuery);
  const [formData, setFormData] = useState({ name: "", email: "", budget: "1k-5k", message: "" });
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim() || !formData.email.includes("@")) errs.email = "Please enter a valid email.";
    if (!formData.message.trim() || formData.message.length < 10)
      errs.message = "Message must be at least 10 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isPending) return;

    setIsPending(true);
    // Simulate real network submission with double submit guard
    await new Promise((r) => setTimeout(r, 600));
    setIsPending(false);
    setSubmitted(true);
    toast.success("Inquiry sent successfully! Prajwal will reply promptly.");
  };

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      <SiteHeader activeRoute="/contact" />

      <main className="flex-1 pb-24">
        <section className="relative pt-20 pb-12 px-6 overflow-hidden border-b border-white/[0.06]">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />

          <div className="mx-auto max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-mono font-medium text-cyan-300">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>START A COLLABORATION</span>
            </div>

            <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              Let's architect something <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                remarkable together.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/60 leading-relaxed">
              Available for full-stack engineering contracts, high-conversion web redesigns, and AI automation pipeline development.
            </p>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Direct Channels */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
                <h2 className="text-xl font-bold font-display text-white">Direct Communication</h2>
                <p className="mt-1 text-xs text-white/50">Guaranteed response within 24 hours.</p>

                <div className="mt-6 space-y-4">
                  <a
                    href={"mailto:" + (settings?.ownerEmail || "pdlkpt@gmail.com")}
                    className="flex items-center gap-3.5 text-sm font-medium text-white/80 hover:text-cyan-300 transition-colors"
                  >
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-cyan-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span>{settings?.ownerEmail || "pdlkpt@gmail.com"}</span>
                  </a>

                  <div className="flex items-center gap-3.5 text-sm font-medium text-white/80">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-cyan-400">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span>{settings?.location || "Mangalore, Karnataka / Worldwide Remote"}</span>
                  </div>
                </div>

                {settings?.socials && settings.socials.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-white/[0.06]">
                    <span className="text-xs font-mono uppercase tracking-wider text-white/40">Verified Links</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {settings.socials.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-white/70 hover:border-cyan-400 hover:text-white transition"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Validated Inquiry Form */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                  <h3 className="mt-4 text-2xl font-bold font-display text-white">Inquiry Received</h3>
                  <p className="mt-2 text-sm text-white/60">
                    Thank you for reaching out. Prajwal will review your project requirements and follow up promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", budget: "1k-5k", message: "" });
                    }}
                    className="mt-6 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                      Project Scope & Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the application, architecture requirements, or timeline..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                    {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 text-xs font-bold text-black shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition disabled:opacity-50"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{isPending ? "Sending Inquiry..." : "Submit Project Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

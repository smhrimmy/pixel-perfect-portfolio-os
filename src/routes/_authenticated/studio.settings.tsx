import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import type { z } from "zod";

import { qk } from "@/providers/query.provider";
import { getSettings, updateSettings } from "@/actions";
import { settingsUpdateSchema } from "@/features/settings/schemas/settings.schema";

import { EditorShell } from "@/components/studio/editor-shell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { websiteThemes } from "@/themes/website/registry";

export const Route = createFileRoute("/_authenticated/studio/settings")({ component: SettingsPage });

type FormValues = z.input<typeof settingsUpdateSchema>;

function SettingsPage() {
  const qc = useQueryClient();
  const getFn = useServerFn(getSettings);
  const updateFn = useServerFn(updateSettings);

  const { data } = useQuery({ queryKey: qk.settings.root, queryFn: () => getFn() });

  const form = useForm<FormValues>({
    resolver: zodResolver(settingsUpdateSchema),
    defaultValues: {},
    mode: "onChange",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        siteTitle: data.siteTitle,
        siteDescription: data.siteDescription,
        ownerName: data.ownerName,
        ownerEmail: data.ownerEmail,
        location: data.location,
        tagline: data.tagline,
        socials: data.socials,
        primaryColor: data.primaryColor,
        accentColor: data.accentColor,
        activeWebsiteTheme: data.activeWebsiteTheme,
        activeBlogTheme: data.activeBlogTheme,
        seo: data.seo,
        featureFlags: data.featureFlags,
        resumeUrl: data.resumeUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = async (values: FormValues) => {
    await updateFn({ data: values });
    await qc.invalidateQueries({ queryKey: qk.settings.root });
  };

  const socials = form.watch("socials") ?? [];
  const setSocials = (next: { label: string; url: string }[]) =>
    form.setValue("socials", next, { shouldDirty: true, shouldValidate: true });

  return (
    <div className="h-full min-h-0">
      <EditorShell<FormValues>
        title="Site settings"
        subtitle="Global identity, theme selection, and SEO defaults"
        form={form}
        onSave={save}
        autosaveEnabled={false}
        renderForm={() => (
          <div className="space-y-8">
            <Section title="Identity">
              <div className="grid grid-cols-2 gap-4">
                <F label="Site title"><Input {...form.register("siteTitle")} /></F>
                <F label="Owner name"><Input {...form.register("ownerName")} /></F>
                <F label="Owner email" err={form.formState.errors.ownerEmail?.message}>
                  <Input type="email" {...form.register("ownerEmail")} />
                </F>
                <F label="Location"><Input {...form.register("location")} /></F>
              </div>
              <F label="Tagline"><Input {...form.register("tagline")} /></F>
              <F label="Description"><Textarea rows={3} {...form.register("siteDescription")} /></F>
              <F label="Resume URL (PDF)"><Input type="url" placeholder="https://" {...form.register("resumeUrl", { setValueAs: (v) => v || null })} /></F>
            </Section>

            <Section title="Socials">
              <div className="space-y-2">
                {socials.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
                    <Input
                      placeholder="Label"
                      value={s.label}
                      onChange={(e) => setSocials(socials.map((x, j) => j === i ? { ...x, label: e.target.value } : x))}
                    />
                    <Input
                      placeholder="https://…"
                      value={s.url}
                      onChange={(e) => setSocials(socials.map((x, j) => j === i ? { ...x, url: e.target.value } : x))}
                    />
                    <Button size="icon" variant="ghost" onClick={() => setSocials(socials.filter((_, j) => j !== i))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={() => setSocials([...socials, { label: "", url: "" }])}>
                  <Plus className="mr-1 h-4 w-4" /> Add social
                </Button>
              </div>
            </Section>

            <Section title="Theme & branding">
              <div className="grid grid-cols-2 gap-4">
                <F label="Primary color" err={form.formState.errors.primaryColor?.message}>
                  <Input type="text" {...form.register("primaryColor")} />
                </F>
                <F label="Accent color" err={form.formState.errors.accentColor?.message}>
                  <Input type="text" {...form.register("accentColor")} />
                </F>
                <F label="Active website theme">
                  <select
                    className="rounded-md border bg-background px-3 py-2 text-sm"
                    value={form.watch("activeWebsiteTheme") ?? ""}
                    onChange={(e) => form.setValue("activeWebsiteTheme", e.target.value, { shouldDirty: true })}
                  >
                    {Object.keys(websiteThemes).map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </F>
                <F label="Active blog theme">
                  <Input {...form.register("activeBlogTheme")} />
                </F>
              </div>
            </Section>

            <Section title="SEO defaults">
              <F label="Default OG image URL"><Input {...form.register("seo.defaultOgImage", { setValueAs: (v) => v || null })} /></F>
              <F label="Twitter handle"><Input {...form.register("seo.twitterHandle", { setValueAs: (v) => v || null })} /></F>
              <F label="Canonical origin"><Input {...form.register("seo.canonicalOrigin", { setValueAs: (v) => v || null })} /></F>
            </Section>
          </div>
        )}
        renderPreview={(v) => (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{v.siteTitle || "Untitled site"}</CardTitle>
              {v.tagline && <p className="text-sm text-muted-foreground">{v.tagline}</p>}
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {v.siteDescription && <p>{v.siteDescription}</p>}
              <div className="flex flex-wrap gap-2">
                {v.ownerName && <Badge variant="secondary">{v.ownerName}</Badge>}
                {v.location && <Badge variant="outline">{v.location}</Badge>}
                {v.activeWebsiteTheme && <Badge variant="outline">theme: {v.activeWebsiteTheme}</Badge>}
                {v.resumeUrl && <Badge variant="outline" className="bg-primary/10">Resume PDF Attached</Badge>}
              </div>
              <div className="flex gap-2">
                {v.primaryColor && <Swatch color={v.primaryColor} label="Primary" />}
                {v.accentColor && <Swatch color={v.accentColor} label="Accent" />}
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {(v.socials ?? []).map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noreferrer" className="underline">{s.label}</a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      />
    </div>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="h-5 w-5 rounded border" style={{ background: color }} />
      <span className="text-muted-foreground">{label}</span>
      <code className="text-[10px]">{color}</code>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function F({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      {children}
      {err && <p className="text-xs text-destructive">{err}</p>}
    </div>
  );
}

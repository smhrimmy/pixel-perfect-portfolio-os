import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2, Download, Upload, Shield, Check, Globe, Sparkles, Eye, Play, Palette, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import type { z } from "zod";

import { qk } from "@/providers/query.provider";
import { getSettings, updateSettings } from "@/actions";
import { settingsUpdateSchema } from "@/features/settings/schemas/settings.schema";
import { exportSiteBackup } from "@/lib/backup.functions";
import { ThemeAware3DLoader, type LoaderStyle } from "@/components/ui/ThemeAware3DLoader";

import { EditorShell } from "@/components/studio/editor-shell";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { websiteThemes } from "@/themes/website/registry";

export const Route = createFileRoute("/_authenticated/studio/settings")({ component: SettingsPage });

type FormValues = z.input<typeof settingsUpdateSchema>;

function SettingsPage() {
  const qc = useQueryClient();
  const getFn = useServerFn(getSettings);
  const updateFn = useServerFn(updateSettings);
  const exportFn = useServerFn(exportSiteBackup);

  // 3D Loader Settings
  const [loaderEnabled, setLoaderEnabled] = useState(false);
  const [loaderStyle, setLoaderStyle] = useState<LoaderStyle>("auto");
  const [previewingLoader, setPreviewingLoader] = useState(false);

  // Visitor Theme Switcher Permission Setting
  const [visitorThemeSwitcherEnabled, setVisitorThemeSwitcherEnabled] = useState(false);

  const { data } = useQuery({ queryKey: qk.settings.root, queryFn: () => getFn() });

  const form = useForm<FormValues>({
    resolver: zodResolver(settingsUpdateSchema),
    defaultValues: {
      siteTitle: "Prajwal DL — Portfolio OS",
      siteDescription: "Dedicated Full Stack Developer & Web Advisor portfolio featuring 20 real-world physical metaphors.",
      ownerName: "Prajwal DL",
      ownerEmail: "pdlkpt@gmail.com",
      location: "Mangalore, Karnataka, India",
      tagline: "Dedicated and adaptable professional with a proactive attitude and strong work ethic.",
      socials: [
        { label: "GitHub", url: "https://github.com/smhrimmy" },
        { label: "LinkedIn", url: "https://linkedin.com/in/prajwal-d-l-118198370/" },
        { label: "Website", url: "https://praxel.space/" },
      ],
      primaryColor: "#00E6C3",
      accentColor: "#E85D26",
      activeWebsiteTheme: "prajwal-premium",
      activeBlogTheme: "editorial-longform",
      resumeUrl: "https://praxel.space/",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLoader = localStorage.getItem("portfolio_3d_loader_enabled");
      const storedStyle = (localStorage.getItem("portfolio_3d_loader_style") as LoaderStyle) || "auto";
      setLoaderEnabled(storedLoader === "true");
      setLoaderStyle(storedStyle);

      const storedSwitcher = localStorage.getItem("portfolio_visitor_theme_switcher_enabled");
      setVisitorThemeSwitcherEnabled(storedSwitcher === "true");
    }
  }, []);

  const handleLoaderToggle = (enabled: boolean) => {
    setLoaderEnabled(enabled);
    localStorage.setItem("portfolio_3d_loader_enabled", String(enabled));
    toast.success(enabled ? "3D Animated Loading Screen Enabled" : "3D Animated Loading Screen Disabled");
  };

  const handleLoaderStyleChange = (style: LoaderStyle) => {
    setLoaderStyle(style);
    localStorage.setItem("portfolio_3d_loader_style", style);
    toast.success(`3D Loader style set to: ${style}`);
  };

  const handleVisitorSwitcherToggle = (enabled: boolean) => {
    setVisitorThemeSwitcherEnabled(enabled);
    localStorage.setItem("portfolio_visitor_theme_switcher_enabled", String(enabled));
    toast.success(
      enabled
        ? "Public Visitor Floating Theme Switcher Enabled"
        : "Public Visitor Theme Switcher Disabled (Admin-Only Mode)"
    );
  };

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
  }, [data, form]);

  const save = async (values: FormValues) => {
    await updateFn({ data: values });
    await qc.invalidateQueries({ queryKey: qk.settings.root });
    toast.success("Settings saved");
  };

  const handleExportBackup = async () => {
    try {
      const backup = await exportFn();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Portfolio backup downloaded successfully");
    } catch (err) {
      toast.error("Failed to export backup");
    }
  };

  const socials = form.watch("socials") ?? [];
  const setSocials = (next: { label: string; url: string }[]) =>
    form.setValue("socials", next, { shouldDirty: true, shouldValidate: true });

  return (
    <div className="h-full min-h-0">
      {/* Live Preview Modal for 3D Loader */}
      {previewingLoader && (
        <ThemeAware3DLoader
          themeId={form.watch("activeWebsiteTheme") || "prajwal-premium"}
          styleOverride={loaderStyle}
          forceShow={true}
          onComplete={() => setPreviewingLoader(false)}
        />
      )}

      <EditorShell<FormValues>
        title="Site settings"
        subtitle="Global identity, themes, public permissions, 3D animations & backup"
        form={form}
        onSave={save}
        autosaveEnabled={false}
        renderForm={() => (
          <div className="space-y-8">
            {/* 1. Identity */}
            <Section title="Identity">
              <div className="grid grid-cols-2 gap-4">
                <F label="Site title"><Input {...form.register("siteTitle")} className="bg-[#11161D] border-[#1E2630]" /></F>
                <F label="Owner name"><Input {...form.register("ownerName")} className="bg-[#11161D] border-[#1E2630]" /></F>
                <F label="Owner email" err={form.formState.errors.ownerEmail?.message}>
                  <Input type="email" {...form.register("ownerEmail")} className="bg-[#11161D] border-[#1E2630]" />
                </F>
                <F label="Location"><Input {...form.register("location")} className="bg-[#11161D] border-[#1E2630]" /></F>
              </div>
              <F label="Tagline"><Input {...form.register("tagline")} className="bg-[#11161D] border-[#1E2630]" /></F>
              <F label="Description"><Textarea rows={3} {...form.register("siteDescription")} className="bg-[#11161D] border-[#1E2630]" /></F>
              <F label="Resume URL (PDF)"><Input type="url" placeholder="https://" {...form.register("resumeUrl", { setValueAs: (v) => v || null })} className="bg-[#11161D] border-[#1E2630]" /></F>
            </Section>

            {/* 2. Public Visitor Theme Switcher Controls (Admin Only vs Public) */}
            <Section title="Public Theme Switcher Permissions">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#1E2630] bg-[#11161D]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-[#00E6C3]" />
                      <span className="text-sm font-bold text-white">
                        Allow Public Visitors to Switch Themes (Floating Switcher)
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          visitorThemeSwitcherEnabled
                            ? "border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] text-[10px]"
                            : "border-white/10 bg-white/5 text-[#9AA6B2] text-[10px]"
                        }
                      >
                        {visitorThemeSwitcherEnabled ? "Public Access Enabled" : "Admin Only (Default)"}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#9AA6B2] max-w-xl">
                      When turned <strong>OFF</strong> (default), public visitors will only see your published live theme ({form.watch("activeWebsiteTheme") || "prajwal-premium"}).
                      Turn this <strong>ON</strong> whenever you are ready to allow visitors and recruiters to interactively try all 19 themes.
                    </p>
                  </div>
                  <Switch checked={visitorThemeSwitcherEnabled} onCheckedChange={handleVisitorSwitcherToggle} />
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-[#9AA6B2]">
                  <span>Admin theme changes remain always accessible from HQ Terminal & Site Editor.</span>
                  <Button asChild size="sm" variant="ghost" className="text-xs text-[#00E6C3] hover:text-white h-7">
                    <Link to="/" search={{ __preview_theme_switcher: "true" }} target="_blank">
                      Preview Switcher on Live Site <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Section>

            {/* 3. 3D Animated Loading Screen Configuration */}
            <Section title="3D Animated Loading Screen & Intro Engine">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-[#1E2630] bg-[#11161D]">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#00E6C3]" />
                      Theme-Adaptive 3D Animated Loading Screen
                    </div>
                    <div className="text-xs text-[#9AA6B2] mt-0.5">
                      Renders a bespoke 3D procedural canvas animation matching the active theme on initial visitor arrival.
                    </div>
                  </div>
                  <Switch checked={loaderEnabled} onCheckedChange={handleLoaderToggle} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#9AA6B2]">3D Loader Animation Style</Label>
                    <Select value={loaderStyle} onValueChange={(v) => handleLoaderStyleChange(v as LoaderStyle)}>
                      <SelectTrigger className="bg-[#11161D] border-[#1E2630] text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#11161D] border-[#1E2630]">
                        <SelectItem value="auto">Automatic (Match Active Theme)</SelectItem>
                        <SelectItem value="gyroscope">Kinetic Gyroscope Rings (Cyan Glow)</SelectItem>
                        <SelectItem value="hypercube">3D Cyber Hypercube (Magenta Neon)</SelectItem>
                        <SelectItem value="vortex">Deep Space Particle Vortex (Purple Stellar)</SelectItem>
                        <SelectItem value="playful">Floating Geometry Torus (Teal Physics)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setPreviewingLoader(true)}
                      className="w-full border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] hover:bg-[#00E6C3]/20 text-xs h-9 font-semibold"
                    >
                      <Play className="h-3.5 w-3.5 mr-1.5" /> Preview 3D Loader
                    </Button>
                  </div>
                </div>
              </div>
            </Section>

            {/* 4. Socials */}
            <Section title="Socials">
              <div className="space-y-2">
                {socials.map((s, i) => (
                  <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
                    <Input
                      placeholder="e.g. GitHub"
                      value={s.label}
                      onChange={(e) => {
                        const copy = [...socials];
                        copy[i] = { ...copy[i], label: e.target.value };
                        setSocials(copy);
                      }}
                      className="bg-[#11161D] border-[#1E2630]"
                    />
                    <Input
                      placeholder="https://..."
                      value={s.url}
                      onChange={(e) => {
                        const copy = [...socials];
                        copy[i] = { ...copy[i], url: e.target.value };
                        setSocials(copy);
                      }}
                      className="bg-[#11161D] border-[#1E2630]"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setSocials(socials.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSocials([...socials, { label: "", url: "" }])}
                  className="border-[#1E2630] bg-[#11161D]"
                >
                  <Plus className="mr-1 h-4 w-4" /> Add social
                </Button>
              </div>
            </Section>

            {/* 5. Backup */}
            <Section title="Data Backup & Export">
              <div className="flex items-center justify-between p-4 rounded-2xl border border-[#1E2630] bg-[#11161D]">
                <div>
                  <div className="text-sm font-semibold text-white">Full Portfolio JSON Backup</div>
                  <div className="text-xs text-[#9AA6B2]">Download a complete export of all projects, articles, profile, settings, and themes</div>
                </div>
                <Button
                  type="button"
                  onClick={handleExportBackup}
                  variant="outline"
                  size="sm"
                  className="border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3] hover:bg-[#00E6C3]/20"
                >
                  <Download className="mr-2 h-4 w-4" /> Export Backup
                </Button>
              </div>
            </Section>
          </div>
        )}
        renderPreview={(v) => (
          <Card className="border-[#1E2630] bg-[#11161D]">
            <CardHeader>
              <CardTitle className="text-base text-white">{v.siteTitle || "Portfolio Site"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-[#9AA6B2]">
              <p className="font-medium text-white">{v.ownerName}</p>
              {v.tagline && <p className="italic text-xs">{v.tagline}</p>}
              {v.location && <p className="text-xs">📍 {v.location}</p>}
              {v.siteDescription && (
                <p className="border-t border-[#1E2630] pt-2 text-xs">{v.siteDescription}</p>
              )}
            </CardContent>
          </Card>
        )}
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-2xl border border-[#1E2630] bg-[#0B0F14] p-5">
      <h2 className="text-sm font-bold font-display uppercase tracking-wider text-[#9AA6B2]">{title}</h2>
      {children}
    </section>
  );
}

function F({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-[#9AA6B2]">{label}</Label>
      {children}
      {err && <p className="text-xs text-red-400">{err}</p>}
    </div>
  );
}

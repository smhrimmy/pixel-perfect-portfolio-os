import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plus, Trash2 } from "lucide-react";
import { getAdminBundle, updateSiteContent } from "@/lib/admin.functions";
import type { SiteContent } from "@/lib/site-content";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/studio/content")({
  component: SiteContentEditor,
});

function SiteContentEditor() {
  const qc = useQueryClient();
  const bundleFn = useServerFn(getAdminBundle);
  const updateFn = useServerFn(updateSiteContent);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "bundle"],
    queryFn: () => bundleFn(),
  });

  const [formState, setFormState] = useState<SiteContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data?.content) {
      setFormState({
        ...data.content,
        identity: data.content.identity || { name: "", role: "", brandDot: "" },
        hero: data.content.hero || { badge: "", headingLead: "", headingAccent: "", headingTail: "", sub: "", industries: [] },
        contact: data.content.contact || { badge: "", headingLead: "", headingAccent: "", sub: "" },
        links: data.content.links || { book: "", email: "", twitter: "", linkedin: "", github: "" },
        seo: data.content.seo || { title: "", description: "" },
        services: data.content.services || [],
        stats: data.content.stats || [],
        projects: data.content.projects || [],
        why: data.content.why || []
      });
    }
  }, [data]);

  if (isLoading || !formState) {
    return <div className="p-8 text-muted-foreground">Loading...</div>;
  }

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateFn({ data: formState });
      await qc.invalidateQueries({ queryKey: ["admin", "bundle"] });
      await qc.invalidateQueries({ queryKey: ["cms", "live-site"] });
      alert("Site content saved successfully!");
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const setHero = (updates: Partial<typeof formState.hero>) => {
    setFormState((prev) => prev ? { ...prev, hero: { ...prev.hero, ...updates } } : prev);
  };

  const setIdentity = (updates: Partial<typeof formState.identity>) => {
    setFormState((prev) => prev ? { ...prev, identity: { ...prev.identity, ...updates } } : prev);
  };
  
  const setContact = (updates: Partial<typeof formState.contact>) => {
    setFormState((prev) => prev ? { ...prev, contact: { ...prev.contact, ...updates } } : prev);
  };

  const setLinks = (updates: Partial<typeof formState.links>) => {
    setFormState((prev) => prev ? { ...prev, links: { ...prev.links, ...updates } } : prev);
  };

  return (
    <div className="h-full min-h-0 overflow-y-auto p-4 md:p-8 space-y-8 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Universal Editor</h1>
          <p className="text-muted-foreground">Manage the core identity, hero, and text sections of your portfolio.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={formState.identity.name} onChange={(e) => setIdentity({ name: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Input value={formState.identity.role} onChange={(e) => setIdentity({ role: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Brand Dot</label>
              <Input value={formState.identity.brandDot} onChange={(e) => setIdentity({ brandDot: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Badge</label>
              <Input value={formState.hero.badge} onChange={(e) => setHero({ badge: e.target.value })} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-sm font-medium">Heading Lead</label>
                <Input value={formState.hero.headingLead} onChange={(e) => setHero({ headingLead: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Heading Accent</label>
                <Input value={formState.hero.headingAccent} onChange={(e) => setHero({ headingAccent: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Heading Tail</label>
                <Input value={formState.hero.headingTail} onChange={(e) => setHero({ headingTail: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Subheadline</label>
              <Textarea rows={3} value={formState.hero.sub} onChange={(e) => setHero({ sub: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Industries (Comma separated)</label>
              <Input 
                value={formState.hero.industries.join(", ")} 
                onChange={(e) => setHero({ industries: e.target.value.split(",").map(s => s.trim()) })} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & CTAs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Contact Badge</label>
              <Input value={formState.contact.badge} onChange={(e) => setContact({ badge: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Heading</label>
              <Input value={formState.contact.headingLead} onChange={(e) => setContact({ headingLead: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Accent</label>
              <Input value={formState.contact.headingAccent} onChange={(e) => setContact({ headingAccent: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Subheadline</label>
              <Input value={formState.contact.sub} onChange={(e) => setContact({ sub: e.target.value })} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Book URL</label>
              <Input value={formState.links.book} onChange={(e) => setLinks({ book: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input value={formState.links.email} onChange={(e) => setLinks({ email: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Twitter URL</label>
              <Input value={formState.links.twitter} onChange={(e) => setLinks({ twitter: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input value={formState.links.linkedin} onChange={(e) => setLinks({ linkedin: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">GitHub URL</label>
              <Input value={formState.links.github} onChange={(e) => setLinks({ github: e.target.value })} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Why Me Section</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setFormState(prev => prev ? { ...prev, why: [...prev.why, { title: "New Item", body: "Description" }] } : prev)}>
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formState.why.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <Input value={item.title} onChange={(e) => {
                  const newWhy = [...formState.why];
                  newWhy[idx].title = e.target.value;
                  setFormState({ ...formState, why: newWhy });
                }} />
                <Textarea value={item.body} onChange={(e) => {
                  const newWhy = [...formState.why];
                  newWhy[idx].body = e.target.value;
                  setFormState({ ...formState, why: newWhy });
                }} />
              </div>
              <Button variant="ghost" size="icon" className="text-red-500 shrink-0" onClick={() => {
                const newWhy = formState.why.filter((_, i) => i !== idx);
                setFormState({ ...formState, why: newWhy });
              }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Services Section</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setFormState(prev => prev ? { ...prev, services: [...prev.services, { title: "New Service", body: "Description", icon: "Bot", featured: false }] } : prev)}>
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {formState.services.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <Input value={item.title} placeholder="Title" onChange={(e) => {
                  const newServices = [...formState.services];
                  newServices[idx].title = e.target.value;
                  setFormState({ ...formState, services: newServices });
                }} />
                <Input value={item.icon} placeholder="Lucide Icon Name (e.g. Bot, LayoutTemplate)" onChange={(e) => {
                  const newServices = [...formState.services];
                  newServices[idx].icon = e.target.value;
                  setFormState({ ...formState, services: newServices });
                }} />
                <Textarea value={item.body} placeholder="Description" onChange={(e) => {
                  const newServices = [...formState.services];
                  newServices[idx].body = e.target.value;
                  setFormState({ ...formState, services: newServices });
                }} />
              </div>
              <Button variant="ghost" size="icon" className="text-red-500 shrink-0" onClick={() => {
                const newServices = formState.services.filter((_, i) => i !== idx);
                setFormState({ ...formState, services: newServices });
              }}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}

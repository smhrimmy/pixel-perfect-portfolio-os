import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useUniversalStore } from "@/store/useUniversalStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/studio/content")({
  component: SiteContentEditor,
});

function SiteContentEditor() {
  const { 
    profile, setProfile, 
    socialLinks, setSocialLinks,
    seo, setSEO,
    isSaving, saveToSupabase 
  } = useUniversalStore();

  const handleSave = async () => {
    await saveToSupabase();
    alert("Profile content saved to Universal Store & Supabase!");
  };

  return (
    <div className="h-full min-h-0 overflow-y-auto p-4 md:p-8 space-y-8 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Universal Profile Editor</h1>
          <p className="text-muted-foreground">Manage your core identity, bio, and social links.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Identity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input 
                value={profile?.name || ""} 
                onChange={(e) => setProfile({ ...profile, name: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Headline</label>
              <Input 
                value={profile?.headline || ""} 
                onChange={(e) => setProfile({ ...profile, headline: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input 
                value={profile?.location || ""} 
                onChange={(e) => setProfile({ ...profile, location: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                value={profile?.email || ""} 
                onChange={(e) => setProfile({ ...profile, email: e.target.value } as any)} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Biography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Short Bio</label>
              <Textarea 
                rows={4} 
                value={profile?.bio || ""} 
                onChange={(e) => setProfile({ ...profile, bio: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Full About text</label>
              <Textarea 
                rows={8} 
                value={profile?.about || ""} 
                onChange={(e) => setProfile({ ...profile, about: e.target.value } as any)} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Twitter URL</label>
              <Input 
                value={socialLinks?.twitter || ""} 
                onChange={(e) => setSocialLinks({ ...socialLinks, twitter: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input 
                value={socialLinks?.linkedin || ""} 
                onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">GitHub URL</label>
              <Input 
                value={socialLinks?.github || ""} 
                onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Personal Website</label>
              <Input 
                value={socialLinks?.website || ""} 
                onChange={(e) => setSocialLinks({ ...socialLinks, website: e.target.value } as any)} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Optimization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Global Title tag</label>
              <Input 
                value={seo?.title || ""} 
                onChange={(e) => setSEO({ ...seo, title: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Global Meta Description</label>
              <Textarea 
                rows={3}
                value={seo?.description || ""} 
                onChange={(e) => setSEO({ ...seo, description: e.target.value } as any)} 
              />
            </div>
            <div>
              <label className="text-sm font-medium">Keywords</label>
              <Input 
                value={seo?.keywords || ""} 
                onChange={(e) => setSEO({ ...seo, keywords: e.target.value } as any)} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

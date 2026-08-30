import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Palette,
  Eye,
  Edit2,
  Sliders,
  Type,
  Layout,
  Save,
  CheckCircle2,
  Sparkles,
  MoveUp,
  MoveDown,
  Trash2
} from "lucide-react";
import { useUniversalStore } from "@/store/useUniversalStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/_authenticated/studio/content")({
  component: MobileSiteEditor,
});

type SectionBlock = {
  id: string;
  name: string;
  type: "header" | "hero" | "projects" | "experience" | "skills" | "testimonials" | "contact" | "footer";
  visible: boolean;
  props: Record<string, any>;
  children?: Array<{ id: string; name: string; type: string; value: string }>;
};

const DEFAULT_SECTIONS: SectionBlock[] = [
  { id: "s-header", name: "Header Navigation", type: "header", visible: true, props: { sticky: true, logoText: "Prajwal.os" } },
  {
    id: "s-hero",
    name: "Hero Section",
    type: "hero",
    visible: true,
    props: { title: "Hi, I'm Prajwal DL", subtitle: "Senior Full Stack & Autonomous Systems Engineer", ctaText: "Explore Projects" },
    children: [
      { id: "h-1", name: "Heading", type: "heading", value: "Hi, I'm Prajwal DL" },
      { id: "h-2", name: "Description", type: "text", value: "Designing resilient high-performance web systems." },
      { id: "h-3", name: "Buttons", type: "button", value: "Explore Projects / Resume" },
    ]
  },
  { id: "s-projects", name: "Projects Section", type: "projects", visible: true, props: { layout: "grid", limit: 6 } },
  { id: "s-experience", name: "Experience Timeline", type: "experience", visible: true, props: { showCompanyLogo: true } },
  { id: "s-skills", name: "Skills Proficiency Matrix", type: "skills", visible: true, props: { categorized: true } },
  { id: "s-testimonials", name: "Testimonials & Quotes", type: "testimonials", visible: true, props: { layout: "carousel" } },
  { id: "s-contact", name: "Contact & Inquiries", type: "contact", visible: true, props: { showEmail: true } },
  { id: "s-footer", name: "Footer", type: "footer", visible: true, props: { copyright: "2026 Prajwal DL" } },
];

function MobileSiteEditor() {
  const { profile, setProfile, isSaving, saveToSupabase } = useUniversalStore();
  const [activeTab, setActiveTab] = useState<"structure" | "styles">("structure");
  const [sections, setSections] = useState<SectionBlock[]>(DEFAULT_SECTIONS);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>("s-hero");
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({ "s-hero": true, "home": true });

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedSection = sections.find(s => s.id === selectedBlockId || s.children?.some(c => c.id === selectedBlockId));

  const handleUpdate = async () => {
    try {
      await saveToSupabase();
      toast.success("Site layout and block properties updated!");
    } catch {
      toast.error("Failed to update site layout");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0B0F14] text-[#E6F1FF]">
      {/* Top Bar matching Mockup */}
      <div className="flex items-center justify-between border-b border-[#1E2630] bg-[#11161D] px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold font-display text-white">Site Editor</h2>
          <Badge variant="outline" className="text-[10px] border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3]">
            Visual Canvas
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="border-[#1E2630] bg-[#0B0F14] text-xs h-8 text-[#9AA6B2]">
            <Link to="/" target="_blank">
              <Eye className="h-3.5 w-3.5 mr-1" /> Preview
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={handleUpdate}
            disabled={isSaving}
            className="bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-semibold text-xs h-8 px-3.5"
          >
            <Save className="h-3.5 w-3.5 mr-1" /> {isSaving ? "Saving..." : "Update"}
          </Button>
        </div>
      </div>

      {/* Segmented Structure / Styles Tabs */}
      <div className="p-4 border-b border-[#1E2630] bg-[#0B0F14]">
        <div className="flex rounded-xl border border-[#1E2630] bg-[#11161D] p-1 gap-1 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("structure")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "structure"
                ? "bg-[#00E6C3] text-black shadow-sm"
                : "text-[#9AA6B2] hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5 inline mr-1" /> Structure
          </button>
          <button
            onClick={() => setActiveTab("styles")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "styles"
                ? "bg-[#00E6C3] text-black shadow-sm"
                : "text-[#9AA6B2] hover:text-white"
            }`}
          >
            <Palette className="h-3.5 w-3.5 inline mr-1" /> Styles
          </button>
        </div>
      </div>

      {/* Main Workbench Body */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl mx-auto w-full space-y-6">
        {activeTab === "structure" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Collapsible Layer Tree (Matches Reference Phone 4) */}
            <div className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#1E2630] pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white font-mono uppercase">
                  <Layout className="h-4 w-4 text-[#00E6C3]" />
                  <span>Home (Page Tree)</span>
                </div>
                <span className="text-[10px] text-[#9AA6B2]">{sections.length} Sections</span>
              </div>

              <div className="space-y-1">
                {sections.map((sec) => (
                  <div key={sec.id} className="space-y-1">
                    <div
                      onClick={() => setSelectedBlockId(sec.id)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedBlockId === sec.id
                          ? "border-[#00E6C3] bg-[#00E6C3]/10 text-white font-semibold"
                          : "border-transparent hover:bg-white/[0.03] text-[#9AA6B2]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {sec.children ? (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); toggleExpand(sec.id); }}
                            className="p-1 hover:text-white"
                          >
                            {expandedNodes[sec.id] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                          </button>
                        ) : (
                          <span className="w-5" />
                        )}
                        <span className="text-xs">{sec.name}</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-mono border-white/10 uppercase">
                        {sec.type}
                      </Badge>
                    </div>

                    {/* Children elements (e.g. Hero -> Heading, Text, Buttons) */}
                    {sec.children && expandedNodes[sec.id] && (
                      <div className="pl-6 space-y-1 border-l border-white/10 ml-4">
                        {sec.children.map((child) => (
                          <div
                            key={child.id}
                            onClick={() => setSelectedBlockId(child.id)}
                            className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-all ${
                              selectedBlockId === child.id
                                ? "bg-[#00E6C3]/15 text-[#00E6C3] font-semibold"
                                : "text-[#9AA6B2] hover:bg-white/5"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <Type className="h-3 w-3 opacity-60" /> {child.name}
                            </span>
                            <span className="text-[10px] opacity-60 truncate max-w-[120px]">{child.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Selected Block Inspector */}
            <div className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5 space-y-4">
              <div className="border-b border-[#1E2630] pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-[#00E6C3]" /> Block Inspector
                  </h3>
                  <p className="text-[11px] text-[#9AA6B2]">Editing: {selectedSection?.name || "Select a block"}</p>
                </div>
                {selectedSection && (
                  <Badge variant="outline" className="text-[10px] border-[#00E6C3]/40 bg-[#00E6C3]/10 text-[#00E6C3]">
                    {selectedSection.type}
                  </Badge>
                )}
              </div>

              {selectedSection?.type === "hero" ? (
                <div className="space-y-4">
                  <div className="grid gap-1.5">
                    <Label className="text-xs text-[#9AA6B2]">Heading Text</Label>
                    <Input
                      value={profile?.name ? `Hi, I'm ${profile.name}` : "Hi, I'm Prajwal DL"}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value.replace("Hi, I'm ", "") } as any)}
                      className="bg-[#0B0F14] border-[#1E2630] text-xs text-white"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label className="text-xs text-[#9AA6B2]">Headline / Subtitle</Label>
                    <Input
                      value={profile?.headline || "Senior Full Stack & AI Systems Engineer"}
                      onChange={(e) => setProfile({ ...profile, headline: e.target.value } as any)}
                      className="bg-[#0B0F14] border-[#1E2630] text-xs text-white"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label className="text-xs text-[#9AA6B2]">Bio Statement</Label>
                    <Textarea
                      rows={3}
                      value={profile?.bio || "Architecting high-concurrency systems."}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value } as any)}
                      className="bg-[#0B0F14] border-[#1E2630] text-xs text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-white/5 bg-[#0B0F14] text-xs text-[#9AA6B2] space-y-2">
                  <p>Configuring section properties for <strong>{selectedSection?.name}</strong>.</p>
                  <p>All changes update the live site structure and preview immediately upon save.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Styles Tab */
          <div className="rounded-2xl border border-[#1E2630] bg-[#11161D] p-5 space-y-4 max-w-xl mx-auto">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="h-4 w-4 text-[#00E6C3]" /> Global Design Tokens
            </h3>
            <div className="space-y-4 pt-2">
              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">Accent Highlight Color</Label>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-[#00E6C3] border border-white/20 shadow-sm" />
                  <Input value="#00E6C3 (Teal Cyan Glow)" readOnly className="bg-[#0B0F14] border-[#1E2630] text-xs text-white font-mono" />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">Typography Scale</Label>
                <Input value="Sora (Headings) · Inter (Body) · JetBrains Mono (Code)" readOnly className="bg-[#0B0F14] border-[#1E2630] text-xs text-white" />
              </div>

              <div className="grid gap-1.5">
                <Label className="text-xs text-[#9AA6B2]">Surface Radius</Label>
                <Input value="16px (Modern Rounded)" readOnly className="bg-[#0B0F14] border-[#1E2630] text-xs text-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Printer, Sparkles, Check, FileText, User, Mail, MapPin, Globe } from "lucide-react";
import { toast } from "sonner";

export interface ResumeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName?: string;
  roleTitle?: string;
  email?: string;
  location?: string;
}

export function ResumeGeneratorModal({
  open,
  onOpenChange,
  candidateName = "Prajwal DL",
  roleTitle = "Full Stack Engineer & AI Automation Architect",
  email = "dlprajwal4@gmail.com",
  location = "Mangalore, Karnataka, India",
}: ResumeModalProps) {
  const [theme, setTheme] = useState<"minimal" | "modern" | "executive">("modern");

  const handlePrint = () => {
    window.print();
    toast.success("Opened print dialog for PDF export");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[#0B0F14] border-[#1E2630] text-[#E6F1FF] p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="p-5 border-b border-[#1E2630] bg-[#11161D] flex items-center justify-between">
          <div>
            <DialogTitle className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="h-4 w-4 text-[#00E6C3]" />
              ATS-Compliant Dynamic PDF Resume
            </DialogTitle>
            <p className="text-xs text-[#9AA6B2] mt-0.5">
              Live resume compiled directly from CMS experience, skills, and projects
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              size="sm"
              className="bg-[#00E6C3] text-black hover:bg-[#00E6C3]/90 font-semibold text-xs h-8"
            >
              <Printer className="h-3.5 w-3.5 mr-1.5" /> Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#07090D]">
          <div
            id="resume-printable-area"
            className="mx-auto max-w-2xl bg-[#11161D] border border-[#1E2630] p-8 rounded-2xl shadow-xl space-y-6 text-[#E6F1FF] font-sans"
          >
            {/* Header */}
            <div className="border-b border-[#1E2630] pb-5">
              <h1 className="text-2xl font-bold tracking-tight text-white">{candidateName}</h1>
              <p className="text-sm font-semibold text-[#00E6C3] mt-1">{roleTitle}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#9AA6B2]">
                <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {email}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {location}</span>
                <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> https://praxel.space</span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E6C3]">Executive Summary</h3>
              <p className="text-xs text-[#9AA6B2] leading-relaxed">
                Full Stack Engineer specializing in reactive frontend architectures, cloud backend pipelines, and autonomous AI-assisted automation systems. Proven background building scalable applications with TypeScript, React, Vite, Node.js, and Supabase.
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E6C3]">Work Experience</h3>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Web Advisor — Unifycx</span>
                  <span className="text-[#9AA6B2]">Jun 2025 — Present</span>
                </div>
                <p className="text-[11px] text-[#9AA6B2]">
                  Managed cloud infrastructure migrations, DNS configurations, SSL installations, and high-availability CMS environments.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Freelance Web Developer — Independent</span>
                  <span className="text-[#9AA6B2]">Dec 2024 — Jun 2025</span>
                </div>
                <p className="text-[11px] text-[#9AA6B2]">
                  Architected responsive custom web applications using modern React, TypeScript, and serverless backend pipelines.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">Support Engineer — Glowtouch Technologies</span>
                  <span className="text-[#9AA6B2]">Aug 2024 — Dec 2024</span>
                </div>
                <p className="text-[11px] text-[#9AA6B2]">
                  Diagnosed complex server, database, and API routing issues across cloud hosting platforms.
                </p>
              </div>
            </div>

            {/* Core Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E6C3]">Technical Competencies</h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "React", "TypeScript", "JavaScript", "Node.js", "Next.js", "Python",
                  "Tailwind CSS", "PostgreSQL", "Supabase", "TanStack Start", "Three.js", "Docker", "Git"
                ].map((s) => (
                  <Badge key={s} variant="outline" className="border-white/10 bg-white/5 text-[#E6F1FF] text-[10px]">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Education & Certs */}
            <div className="space-y-2 border-t border-[#1E2630] pt-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00E6C3]">Education &amp; Credentials</h3>
              <div className="text-xs text-[#9AA6B2] flex items-center justify-between">
                <span>Diploma in Full Stack Web Development — Karnataka Polytechnic</span>
                <span>May 2024</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

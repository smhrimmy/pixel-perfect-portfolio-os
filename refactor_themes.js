import fs from 'fs';
import path from 'path';

const themesDir = 'D:/Users/dlpra/Downloads/pixel-perfect-copy-1284-main/src/themes/website/';
const files = [
  'aurora-mint.tsx', 'cyber-magenta.tsx', 'editorial-serif.tsx', 'galaxy-cosmos.tsx',
  'galaxy-globe.tsx', 'glass-morph.tsx', 'holographic.tsx', 'paper-print.tsx', 'sunset-paper.tsx',
  'playful-3d.tsx', 'terminal-green.tsx', 'macos-desktop.tsx', 'prajwal-premium.tsx'
];

for (const file of files) {
  const filePath = path.join(themesDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${file} - not found`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace import
  content = content.replace(/import type \{ ThemeProps \} from "\.\/registry";/g, 'import type { ThemeRendererProps } from "../types";');

  // Replace signature
  const signatureRegex = /export default function (\w+)\(\{\s*content\s*\}\s*:\s*ThemeProps\)\s*\{/;
  const match = content.match(signatureRegex);
  
  if (match) {
    const componentName = match[1];
    content = content.replace(signatureRegex, `export default function ${componentName}({ data }: ThemeRendererProps) {`);
    
    // Find the destructuring line
    const destructureRegex = /const\s*\{\s*identity.*?\s*\}\s*=\s*content;/s;
    const mapping = `
  const { profile, projects, skills, experience: rawExperience, socialLinks } = data;
  
  const identity = { name: profile?.name || "YOUR NAME", brandDot: "." };
  const hero = { 
    badge: "Available for work", 
    headingLead: "I build", 
    headingAccent: "bold", 
    headingTail: "things", 
    sub: profile?.bio || "A creative developer.", 
    industries: ["Tech", "Design"] 
  };
  const services = [{title: "Design", body: "Visual identities."}, {title: "Development", body: "Full-stack apps."}];
  const stats = [{value: projects?.length || 0, label: "Projects"}];
  const why = [{title: "Speed", body: "Fast"}];
  const contact = { badge: "Contact", headingLead: "Let's talk", headingAccent: "now", sub: "Ready to work." };
  const links = { book: "#", email: profile?.email || "", linkedin: socialLinks?.linkedin || "", github: socialLinks?.github || "", twitter: socialLinks?.twitter || "" };
  
  const experience = (rawExperience || []).map(e => ({ 
    ...e, 
    startDate: e.start_date ? e.start_date.substring(0, 7) : "", 
    endDate: e.end_date ? e.end_date.substring(0, 7) : null, 
    role: e.position,
    summary: e.description
  }));
`;

    if (content.match(destructureRegex)) {
       content = content.replace(destructureRegex, mapping.trim());
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
}

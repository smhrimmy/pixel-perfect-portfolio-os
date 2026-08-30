/**
 * Dynamic OpenGraph (OG) Image Generator Engine
 * Generates custom SVG / Data URL social preview cards for projects, articles, and pages
 */

export interface OGImageOptions {
  title: string;
  subtitle?: string;
  category?: string;
  authorName?: string;
  themeAccent?: string;
  tags?: string[];
  date?: string;
}

export function generateOGImageSvg({
  title,
  subtitle = "High-Performance Portfolio & AI Systems",
  category = "FEATURED PROJECT",
  authorName = "Prajwal DL",
  themeAccent = "#00E6C3",
  tags = ["Full Stack", "TypeScript", "React"],
  date = new Date().toLocaleDateString(),
}: OGImageOptions): string {
  const cleanTitle = title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanSub = subtitle.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const cleanCategory = category.toUpperCase();

  const tagElements = tags
    .slice(0, 4)
    .map(
      (tag, idx) => `
      <g transform="translate(${idx * 130}, 0)">
        <rect width="115" height="34" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <text x="57" y="22" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#E6F1FF" text-anchor="middle">${tag}</text>
      </g>
    `
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07090D"/>
      <stop offset="100%" stop-color="#0F141C"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="${themeAccent}" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="${themeAccent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="10%" cy="90%" r="50%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Card Border -->
  <rect x="40" y="40" width="1120" height="550" rx="24" fill="rgba(17,22,29,0.7)" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>

  <!-- Brand & Category -->
  <g transform="translate(90, 110)">
    <rect width="14" height="14" rx="4" fill="${themeAccent}" />
    <text x="24" y="12" font-family="monospace" font-size="14" font-weight="700" fill="${themeAccent}" letter-spacing="3">${cleanCategory}</text>
  </g>

  <!-- Main Title -->
  <text x="90" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" letter-spacing="-1">
    ${cleanTitle.length > 36 ? cleanTitle.slice(0, 36) + "..." : cleanTitle}
  </text>

  <!-- Subtitle -->
  <text x="90" y="295" font-family="system-ui, sans-serif" font-size="24" font-weight="400" fill="#9AA6B2">
    ${cleanSub.length > 70 ? cleanSub.slice(0, 70) + "..." : cleanSub}
  </text>

  <!-- Tags Row -->
  <g transform="translate(90, 370)">
    ${tagElements}
  </g>

  <!-- Footer Branding -->
  <line x1="90" y1="460" x2="1110" y2="460" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <g transform="translate(90, 505)">
    <!-- Author Avatar placeholder circle -->
    <circle cx="20" cy="15" r="20" fill="rgba(255,255,255,0.1)" stroke="${themeAccent}" stroke-width="2"/>
    <text x="20" y="20" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" text-anchor="middle">P</text>
    <text x="54" y="16" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">${authorName}</text>
    <text x="54" y="34" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#9AA6B2">Full Stack Engineer &amp; AI Architect</text>
  </g>

  <g transform="translate(1030, 520)">
    <text x="0" y="0" font-family="monospace" font-size="13" font-weight="600" fill="${themeAccent}" text-anchor="end">PDL PORTFOLIO OS</text>
  </g>
</svg>`;
}

export function generateOGImageDataUrl(options: OGImageOptions): string {
  const svg = generateOGImageSvg(options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

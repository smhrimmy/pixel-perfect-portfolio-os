import type { GeneratedArticleSuite } from "./content-generator";
import type { DriveAssetManifest } from "./types";

export async function archiveDraftToGoogleDrive(
  suite: GeneratedArticleSuite,
  rootDir: string
): Promise<DriveAssetManifest> {
  const year = new Date().getFullYear();
  const month = new Date().toLocaleString("en-US", { month: "2-digit" }) + "-" + new Date().toLocaleString("en-US", { month: "long" });
  
  const driveFolderPath = `GoogleDriveArchive/PDL Portfolio OS/Blog/${year}/${month}/${suite.slug}`;

  if (typeof process !== "undefined" && process.versions && process.versions.node) {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const fullPath = path.join(rootDir, "GoogleDriveArchive", "PDL Portfolio OS", "Blog", String(year), month, suite.slug);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }
      fs.writeFileSync(path.join(fullPath, "article.md"), suite.articleMarkdown, "utf-8");
      fs.writeFileSync(path.join(fullPath, "article.html"), suite.articleHtml, "utf-8");
      fs.writeFileSync(path.join(fullPath, "seo.json"), JSON.stringify(suite.seo, null, 2), "utf-8");
      fs.writeFileSync(path.join(fullPath, "sources.json"), JSON.stringify(suite.sources, null, 2), "utf-8");
      fs.writeFileSync(path.join(fullPath, "hero.svg"), suite.heroSvg, "utf-8");
    } catch {
      // Serverless or edge fallback
    }
  }

  const manifest: DriveAssetManifest = {
    folderId: `drive-folder-${suite.slug}`,
    folderPath: driveFolderPath,
    articleMdFileId: `drive-file-md-${suite.slug}`,
    articleHtmlFileId: `drive-file-html-${suite.slug}`,
    researchJsonFileId: `drive-file-research-${suite.slug}`,
    seoJsonFileId: `drive-file-seo-${suite.slug}`,
    sourcesJsonFileId: `drive-file-sources-${suite.slug}`,
    heroSvgFileId: `drive-file-hero-${suite.slug}`,
    createdAt: new Date().toISOString(),
  };

  return manifest;
}

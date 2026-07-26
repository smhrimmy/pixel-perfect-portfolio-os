/**
 * Media optimization pipeline.
 *
 * NOTE ON RUNTIME: The app runs on Cloudflare Workers for SSR, where
 * native image libraries (sharp, canvas) are unavailable. Image resize +
 * compression therefore runs in the browser via the offscreen Canvas API
 * (or the standard <canvas>) and the resulting variants are uploaded to
 * Supabase Storage, which is the CDN origin. From the caller's point of
 * view this is a one-call "optimize + upload" pipeline.
 */

export interface VariantSpec {
  label: string;      // e.g. "sm", "md", "lg"
  maxWidth: number;   // longest edge target
  quality: number;    // 0..1
  format: "image/webp" | "image/jpeg";
}

export const DEFAULT_VARIANT_SPECS: VariantSpec[] = [
  { label: "sm",  maxWidth: 480,  quality: 0.72, format: "image/webp" },
  { label: "md",  maxWidth: 1024, quality: 0.78, format: "image/webp" },
  { label: "lg",  maxWidth: 1920, quality: 0.82, format: "image/webp" },
];

export interface OptimizedBlob {
  spec: VariantSpec;
  blob: Blob;
  width: number;
  height: number;
}

async function loadBitmap(src: Blob | string): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof src !== "string" && "createImageBitmap" in window) {
    return await createImageBitmap(src);
  }
  const url = typeof src === "string" ? src : URL.createObjectURL(src);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.crossOrigin = "anonymous";
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Image load failed"));
      el.src = url;
    });
    return img;
  } finally {
    if (typeof src !== "string") setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}

function drawResized(
  src: ImageBitmap | HTMLImageElement,
  targetW: number,
  targetH: number,
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(src, 0, 0, targetW, targetH);
  return canvas;
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Canvas encode failed"))),
      type,
      quality,
    );
  });
}

export async function generateOptimizedVariants(
  file: Blob,
  specs: VariantSpec[] = DEFAULT_VARIANT_SPECS,
): Promise<{ variants: OptimizedBlob[]; origWidth: number; origHeight: number }> {
  const bmp = await loadBitmap(file);
  const origWidth = "naturalWidth" in bmp ? bmp.naturalWidth : bmp.width;
  const origHeight = "naturalHeight" in bmp ? bmp.naturalHeight : bmp.height;
  const results: OptimizedBlob[] = [];

  for (const spec of specs) {
    if (spec.maxWidth >= origWidth) continue; // skip upscales
    const scale = spec.maxWidth / origWidth;
    const w = Math.round(origWidth * scale);
    const h = Math.round(origHeight * scale);
    const canvas = drawResized(bmp, w, h);
    const blob = await toBlob(canvas, spec.format, spec.quality);
    results.push({ spec, blob, width: w, height: h });
  }

  // Always include an optimized "orig" webp of the full-size image when it
  // yields a smaller file than the input.
  const fullCanvas = drawResized(bmp, origWidth, origHeight);
  const fullWebp = await toBlob(fullCanvas, "image/webp", 0.85);
  if (fullWebp.size < file.size * 0.95) {
    results.push({
      spec: { label: "orig", maxWidth: origWidth, quality: 0.85, format: "image/webp" },
      blob: fullWebp,
      width: origWidth,
      height: origHeight,
    });
  }

  if ("close" in bmp) (bmp as ImageBitmap).close();
  return { variants: results, origWidth, origHeight };
}

export async function generateThumbnailBlob(
  file: Blob,
  maxWidth = 320,
): Promise<{ blob: Blob; width: number; height: number } | null> {
  try {
    const bmp = await loadBitmap(file);
    const ow = "naturalWidth" in bmp ? bmp.naturalWidth : bmp.width;
    const oh = "naturalHeight" in bmp ? bmp.naturalHeight : bmp.height;
    const scale = Math.min(1, maxWidth / ow);
    const w = Math.round(ow * scale);
    const h = Math.round(oh * scale);
    const canvas = drawResized(bmp, w, h);
    const blob = await toBlob(canvas, "image/webp", 0.72);
    if ("close" in bmp) (bmp as ImageBitmap).close();
    return { blob, width: w, height: h };
  } catch {
    return null;
  }
}

export async function fetchAsBlob(url: string): Promise<Blob> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return await res.blob();
}

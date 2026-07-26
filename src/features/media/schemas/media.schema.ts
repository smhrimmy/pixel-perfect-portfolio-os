import { z } from "zod";

export const mediaKindSchema = z.enum(["image", "video", "embed", "file"]);

export const mediaVariantSchema = z.object({
  label: z.string().min(1).max(40),
  url: z.string().url(),
  storagePath: z.string().nullable().default(null),
  width: z.number().int().positive().nullable().default(null),
  height: z.number().int().positive().nullable().default(null),
  sizeBytes: z.number().int().nonnegative().nullable().default(null),
  mimeType: z.string().max(120).nullable().default(null),
});
export type MediaVariant = z.infer<typeof mediaVariantSchema>;

export const mediaCreateSchema = z.object({
  url: z.string().url(),
  alt: z.string().max(240).default(""),
  kind: mediaKindSchema.default("image"),
  width: z.number().int().positive().nullable().default(null),
  height: z.number().int().positive().nullable().default(null),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  thumbnailUrl: z.string().url().nullable().default(null),
  sizeBytes: z.number().int().nonnegative().nullable().default(null),
  storagePath: z.string().nullable().default(null),
  mimeType: z.string().max(120).nullable().default(null),
  folder: z.string().max(120).nullable().default(null),
  variants: z.array(mediaVariantSchema).max(12).default([]),
});
export const mediaUpdateSchema = mediaCreateSchema.partial().extend({ id: z.string().min(1) });

export type MediaCreateInput = z.infer<typeof mediaCreateSchema>;
export type MediaUpdateInput = z.infer<typeof mediaUpdateSchema>;

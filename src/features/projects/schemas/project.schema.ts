import { z } from "zod";

export const projectStatusSchema = z.enum(["draft", "published", "archived"]);

export const projectCreateSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase kebab-case"),
  title: z.string().min(1).max(200),
  summary: z.string().max(320).default(""),
  description: z.string().default(""),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  coverImageUrl: z.string().url().nullable().default(null),
  liveUrl: z.string().url().nullable().default(null),
  repoUrl: z.string().url().nullable().default(null),
  status: projectStatusSchema.default("draft"),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export const projectUpdateSchema = projectCreateSchema.partial().extend({
  id: z.string().min(1),
});

export const projectIdSchema = z.object({ id: z.string().min(1) });

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>;

import { z } from "zod";

export const experimentCreateSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase kebab-case"),
  title: z.string().min(1).max(200),
  description: z.string().default(""),
  content: z.string().default(""),
  category: z.string().default("General"),
  techStack: z.array(z.string()).default([]),
  githubUrl: z.string().url().nullable().default(null),
  demoUrl: z.string().nullable().default(null),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
});

export const experimentUpdateSchema = experimentCreateSchema.partial().extend({
  id: z.string().min(1),
});

export const experimentIdSchema = z.object({ id: z.string().min(1) });
export const experimentSlugSchema = z.object({ slug: z.string().min(1) });

export type ExperimentCreateInput = z.infer<typeof experimentCreateSchema>;
export type ExperimentUpdateInput = z.infer<typeof experimentUpdateSchema>;

import { z } from "zod";

export const articleStatusSchema = z.enum(["draft", "published", "archived"]);

export const articleCreateSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "lowercase kebab-case"),
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).default(""),
  markdown: z.string().default(""),
  coverImageUrl: z.string().url().nullable().default(null),
  status: articleStatusSchema.default("draft"),
  template: z.string().min(1).max(60).default("editorial-longform"),
  tags: z.array(z.string().min(1).max(40)).max(20).default([]),
  authorId: z.string().nullable().default(null),
});
export const articleUpdateSchema = articleCreateSchema
  .partial()
  .extend({ id: z.string().min(1) });

export type ArticleCreateInput = z.infer<typeof articleCreateSchema>;
export type ArticleUpdateInput = z.infer<typeof articleUpdateSchema>;

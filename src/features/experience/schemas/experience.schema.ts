import { z } from "zod";

export const employmentTypeSchema = z.enum([
  "full-time",
  "part-time",
  "contract",
  "freelance",
  "internship",
]);

export const experienceCreateSchema = z.object({
  company: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
  type: employmentTypeSchema.default("full-time"),
  location: z.string().max(120).default(""),
  startDate: z.string().min(4), // ISO date/time
  endDate: z.string().nullable().default(null),
  summary: z.string().max(1000).default(""),
  highlights: z.array(z.string().min(1).max(280)).max(20).default([]),
  tech: z.array(z.string().min(1).max(40)).max(30).default([]),
  order: z.number().int().min(0).default(0),
});
export const experienceUpdateSchema = experienceCreateSchema
  .partial()
  .extend({ id: z.string().min(1) });

export type ExperienceCreateInput = z.infer<typeof experienceCreateSchema>;
export type ExperienceUpdateInput = z.infer<typeof experienceUpdateSchema>;

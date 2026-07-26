import { z } from "zod";

export const skillLevelSchema = z.enum(["beginner", "intermediate", "advanced", "expert"]);

export const skillCreateSchema = z.object({
  name: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  level: skillLevelSchema.default("intermediate"),
  years: z.number().min(0).max(80).default(0),
  iconUrl: z.string().url().nullable().default(null),
  order: z.number().int().min(0).default(0),
});
export const skillUpdateSchema = skillCreateSchema.partial().extend({ id: z.string().min(1) });

export type SkillCreateInput = z.infer<typeof skillCreateSchema>;
export type SkillUpdateInput = z.infer<typeof skillUpdateSchema>;

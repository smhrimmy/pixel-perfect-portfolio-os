import { z } from "zod";

export const certificationCreateSchema = z.object({
  name: z.string().min(1).max(200),
  issuer: z.string().min(1).max(200),
  description: z.string().nullable().default(null),
  issueDate: z.string().min(1),
  expirationDate: z.string().nullable().default(null),
  credentialId: z.string().nullable().default(null),
  url: z.string().url().nullable().default(null),
  skills: z.array(z.string()).default([]),
  order: z.number().int().min(0).default(0),
});

export const certificationUpdateSchema = certificationCreateSchema.partial().extend({
  id: z.string().min(1),
});

export const certificationIdSchema = z.object({ id: z.string().min(1) });

export type CertificationCreateInput = z.infer<typeof certificationCreateSchema>;
export type CertificationUpdateInput = z.infer<typeof certificationUpdateSchema>;

import { z } from "zod";

const social = z.object({ label: z.string().min(1).max(40), url: z.string().url() });

export const settingsUpdateSchema = z
  .object({
    siteTitle: z.string().min(1).max(120),
    siteDescription: z.string().max(320),
    ownerName: z.string().max(120),
    ownerEmail: z.string().email().or(z.literal("")),
    location: z.string().max(120),
    tagline: z.string().max(240),
    socials: z.array(social).max(20),
    primaryColor: z.string().regex(/^#[0-9a-fA-F]{3,8}$/),
    accentColor: z.string().regex(/^#[0-9a-fA-F]{3,8}$/),
    activeWebsiteTheme: z.string().min(1).max(60),
    activeBlogTheme: z.string().min(1).max(60),
    seo: z.object({
      defaultOgImage: z.string().url().nullable(),
      twitterHandle: z.string().max(40).nullable(),
      canonicalOrigin: z.string().url().nullable(),
    }),
    featureFlags: z.record(z.string(), z.boolean()),
    resumeUrl: z.string().url().nullable().optional(),
  })
  .partial();

export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;

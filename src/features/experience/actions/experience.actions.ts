import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/middleware/require-admin";
import { experienceService } from "../application/experience.service";
import {
  experienceCreateSchema,
  experienceUpdateSchema,
} from "../schemas/experience.schema";

export const listExperience = createServerFn({ method: "GET" }).handler(async () =>
  experienceService().queries.list(),
);
export const getExperience = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .validator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => experienceService().queries.get(data));
export const createExperience = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((i: unknown) => experienceCreateSchema.parse(i))
  .handler(async ({ data }) => experienceService().commands.create(data));
export const updateExperience = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((i: unknown) => experienceUpdateSchema.parse(i))
  .handler(async ({ data }) => experienceService().commands.update(data));
export const deleteExperience = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => experienceService().commands.delete(data));

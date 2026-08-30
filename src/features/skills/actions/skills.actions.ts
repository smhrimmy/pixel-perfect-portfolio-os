import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/middleware/require-admin";
import { skillsService } from "../application/skills.service";
import { skillCreateSchema, skillUpdateSchema } from "../schemas/skill.schema";

export const listSkills = createServerFn({ method: "GET" }).handler(async () =>
  skillsService().queries.list(),
);
export const listSkillsByCategory = createServerFn({ method: "GET" }).handler(async () =>
  skillsService().queries.listByCategory(),
);
export const createSkill = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((i: unknown) => skillCreateSchema.parse(i))
  .handler(async ({ data }) => skillsService().commands.create(data));
export const updateSkill = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((i: unknown) => skillUpdateSchema.parse(i))
  .handler(async ({ data }) => skillsService().commands.update(data));
export const deleteSkill = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => skillsService().commands.delete(data));

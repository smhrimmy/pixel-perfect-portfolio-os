import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/middleware/require-admin";
import { projectsService } from "../application/projects.service";
import {
  projectCreateSchema,
  projectUpdateSchema,
} from "../schemas/project.schema";
import type { ProjectDto } from "../dto/project.dto";

// --- Public queries ---

export const listPublishedProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProjectDto[]> => projectsService().queries.listPublished(),
);

export const getProjectBySlug = createServerFn({ method: "GET" })
  .validator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data }): Promise<ProjectDto> =>
    projectsService().queries.findBySlug(data),
  );

// --- Admin ---

export const listAllProjects = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async (): Promise<ProjectDto[]> => projectsService().queries.list());

export const getProject = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .validator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }): Promise<ProjectDto> =>
    projectsService().queries.get(data),
  );

export const createProject = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((input: unknown) => projectCreateSchema.parse(input))
  .handler(async ({ data }): Promise<ProjectDto> =>
    projectsService().commands.create(data),
  );

export const updateProject = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((input: unknown) => projectUpdateSchema.parse(input))
  .handler(async ({ data }): Promise<ProjectDto> =>
    projectsService().commands.update(data),
  );

export const deleteProject = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => projectsService().commands.delete(data));

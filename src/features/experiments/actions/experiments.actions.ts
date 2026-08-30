import { createServerFn } from "@tanstack/react-start";
import { experimentsService } from "../application/experiments.service";
import {
  experimentCreateSchema,
  experimentUpdateSchema,
  experimentIdSchema,
  experimentSlugSchema,
} from "../schemas/experiment.schema";

export const listExperimentsFn = createServerFn({ method: "GET" }).handler(async () => {
  return experimentsService().queries.list();
});

export const getExperimentFn = createServerFn({ method: "GET" })
  .validator((input: unknown) => experimentIdSchema.parse(input))
  .handler(async ({ data }) => {
    return experimentsService().queries.get(data.id);
  });

export const getExperimentBySlugFn = createServerFn({ method: "GET" })
  .validator((input: unknown) => experimentSlugSchema.parse(input))
  .handler(async ({ data }) => {
    return experimentsService().queries.findBySlug(data.slug);
  });

export const createExperimentFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => experimentCreateSchema.parse(input))
  .handler(async ({ data }) => {
    return experimentsService().commands.create(data);
  });

export const updateExperimentFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => experimentUpdateSchema.parse(input))
  .handler(async ({ data }) => {
    return experimentsService().commands.update(data);
  });

export const deleteExperimentFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => experimentIdSchema.parse(input))
  .handler(async ({ data }) => {
    return experimentsService().commands.delete(data.id);
  });

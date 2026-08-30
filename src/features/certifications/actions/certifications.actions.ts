import { createServerFn } from "@tanstack/react-start";
import { certificationsService } from "../application/certifications.service";
import {
  certificationCreateSchema,
  certificationUpdateSchema,
  certificationIdSchema,
} from "../schemas/certification.schema";

export const listCertificationsFn = createServerFn({ method: "GET" }).handler(async () => {
  return certificationsService().queries.list();
});

export const getCertificationFn = createServerFn({ method: "GET" })
  .validator((input: unknown) => certificationIdSchema.parse(input))
  .handler(async ({ data }) => {
    return certificationsService().queries.get(data.id);
  });

export const createCertificationFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => certificationCreateSchema.parse(input))
  .handler(async ({ data }) => {
    return certificationsService().commands.create(data);
  });

export const updateCertificationFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => certificationUpdateSchema.parse(input))
  .handler(async ({ data }) => {
    return certificationsService().commands.update(data);
  });

export const deleteCertificationFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => certificationIdSchema.parse(input))
  .handler(async ({ data }) => {
    return certificationsService().commands.delete(data.id);
  });

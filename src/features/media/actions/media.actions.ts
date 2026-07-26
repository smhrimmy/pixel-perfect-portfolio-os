import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "@/middleware/require-admin";
import { mediaService } from "../application/media.service";
import { mediaCreateSchema, mediaUpdateSchema } from "../schemas/media.schema";

export const listMedia = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async () => mediaService().queries.list());
export const getMedia = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .inputValidator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => mediaService().queries.get(data));
export const createMedia = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((i: unknown) => mediaCreateSchema.parse(i))
  .handler(async ({ data }) => mediaService().commands.create(data));
export const updateMedia = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((i: unknown) => mediaUpdateSchema.parse(i))
  .handler(async ({ data }) => mediaService().commands.update(data));
export const deleteMedia = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((id: string) => z.string().min(1).parse(id))
  .handler(async ({ data }) => mediaService().commands.delete(data));

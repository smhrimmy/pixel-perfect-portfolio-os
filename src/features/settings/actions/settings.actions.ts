import { createServerFn } from "@tanstack/react-start";
import { requireAdmin } from "@/middleware/require-admin";
import { settingsService } from "../application/settings.service";
import { settingsUpdateSchema } from "../schemas/settings.schema";

export const getSettings = createServerFn({ method: "GET" }).handler(async () =>
  settingsService().queries.get(),
);

export const updateSettings = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((i: unknown) => settingsUpdateSchema.parse(i))
  .handler(async ({ data }) => settingsService().commands.update(data));

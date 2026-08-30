import { createServerFn } from "@tanstack/react-start";
import { requireAdmin } from "@/middleware/require-admin";
import { settingsService } from "../application/settings.service";
import { settingsUpdateSchema } from "../schemas/settings.schema";

export const getSettings = createServerFn({ method: "GET" }).handler(async () =>
  settingsService().queries.get(),
);

export const updateSettings = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .validator((i: unknown) => settingsUpdateSchema.parse(i))
  .handler(async ({ data }) => {
    const updated = await settingsService().commands.update(data);
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      if (data.activeWebsiteTheme || data.activeBlogTheme) {
        await supabaseAdmin
          .from("cms_config")
          .update({
            ...(data.activeWebsiteTheme ? { website_theme: data.activeWebsiteTheme } : {}),
            ...(data.activeBlogTheme ? { blog_theme: data.activeBlogTheme } : {}),
            updated_at: new Date().toISOString(),
          })
          .in("state", ["live", "draft"]);
      }
    } catch {
      // Supabase sync optional
    }
    return updated;
  });

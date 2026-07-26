/**
 * Admin gate middleware for server actions.
 * Extends requireSupabaseAuth by asserting the caller has the admin role.
 */
import { createMiddleware } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { ForbiddenError } from "@/domain/shared/errors";

export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ next, context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw new ForbiddenError(`role check failed: ${error.message}`);
    if (!data) throw new ForbiddenError("Admin role required");
    return next({ context });
  });

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    // Check local admin session for local development
    if (typeof window !== "undefined") {
      const localAdmin = localStorage.getItem("portfolio_os_local_admin");
      if (localAdmin || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        return { user: { id: "local-admin", email: "admin@local.dev", role: "authenticated", user_metadata: { name: "Admin" } } };
      }
    }

    try {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        return { user: data.user };
      }
    } catch {
      // Supabase unavailable or unauthenticated
    }

    throw redirect({ to: "/auth", search: { redirect: location.href } });
  },
  component: () => <Outlet />,
});

import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Lock, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { toast } from "sonner";

const searchSchema = z.object({
  redirect: z.string().optional(),
  mode: z.enum(["signin", "signup"]).optional(),
});

export const Route = createFileRoute("/auth")({
  validateSearch: searchSchema,
  head: () => ({ meta: [{ title: "Studio Access & Authentication — Prajwal DL" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { redirect: redirectParam, mode: modeParam } = useSearch({ from: "/auth" });
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (modeParam) setMode(modeParam);
  }, [modeParam]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#07070e] text-white flex items-center justify-center px-6" />;
  }

  const target = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/studio";

  const handleDevBypass = () => {
    localStorage.setItem("portfolio_os_local_admin", "true");
    toast.success("Signed in as Local Admin (Dev Mode)");
    navigate({ to: target });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) throw error;
        toast.success("Account created! You can now sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        localStorage.removeItem("portfolio_os_local_admin");
        toast.success("Successfully authenticated.");
        navigate({ to: target });
      }
    } catch (e: any) {
      const msg = e?.message || "Authentication failed.";
      if (msg.includes("Invalid login credentials") || msg.includes("401") || msg.includes("invalid_grant")) {
        setErr("Invalid credentials. If you haven't created an account yet, please toggle to 'Sign up' below or use Dev Mode.");
      } else {
        setErr(msg);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#07070e] text-white flex items-center justify-center px-6 selection:bg-cyan-500 selection:text-black">
      <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 backdrop-blur-2xl shadow-2xl shadow-black/60">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
            <Lock className="h-6 w-6" />
          </div>
          <div className="mt-4 font-mono text-xs uppercase tracking-widest text-cyan-400">
            Studio Security Gateway
          </div>
          <h1 className="mt-2 text-2xl font-bold font-display text-white">
            {mode === "signup" ? "Create Admin Profile" : "Administrator Sign In"}
          </h1>
          <p className="mt-2 text-xs text-white/50">
            {mode === "signup"
              ? "Register your admin credentials for cloud synchronization."
              : "Access the visual studio, theme engine, and content controls."}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErr(null);
            }}
            className={`rounded-lg py-2 text-xs font-semibold transition ${
              mode === "signin"
                ? "bg-cyan-500 text-black shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErr(null);
            }}
            className={`rounded-lg py-2 text-xs font-semibold transition ${
              mode === "signup"
                ? "bg-cyan-500 text-black shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-xs font-semibold text-white/70">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 rounded-xl border-white/10 bg-black/40 text-white placeholder:text-white/20 focus:border-cyan-400"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-xs font-semibold text-white/70">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••••••"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 rounded-xl border-white/10 bg-black/40 text-white placeholder:text-white/20 focus:border-cyan-400"
            />
          </div>

          {err && (
            <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{err}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-cyan-500 py-3 text-xs font-bold text-black hover:bg-cyan-400 transition"
          >
            {busy ? "Authenticating..." : mode === "signup" ? "Create Admin Account" : "Sign In to Studio"}
          </Button>
        </form>

        {/* Local Dev Admin Quick Access */}
        <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
          <button
            type="button"
            onClick={handleDevBypass}
            className="inline-flex items-center justify-center gap-2 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Enter Studio as Local Admin (Dev Mode)</span>
          </button>
          <p className="mt-2 text-[11px] font-mono text-white/40">
            For local file-backed development & testing
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-xs font-mono text-white/40 hover:text-cyan-400 transition-colors">
            ← Return to Portfolio Website
          </Link>
        </div>
      </div>
    </div>
  );
}

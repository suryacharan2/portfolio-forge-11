import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — PortfolioForge" },
      { name: "description", content: "Sign in or create an account to save and manage your portfolios." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/dashboard",
  }),
  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: search.redirect || "/dashboard" });
  },
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${search.redirect}`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created! Welcome aboard.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
      window.location.href = search.redirect;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}${search.redirect}`,
      });
      if (result.error) throw result.error;
      if (!result.redirected) window.location.href = search.redirect;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed";
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 font-display font-bold text-xl">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>PortfolioForge</span>
        </Link>

        <Card className="p-6 md:p-8 shadow-card">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "signin" ? "Sign in to access your saved portfolios." : "Save unlimited portfolios and edit them anytime."}
            </p>
          </div>

          <Button type="button" variant="outline" className="w-full mb-4" onClick={handleGoogle} disabled={loading}>
            <GoogleIcon /> Continue with Google
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3">
            {mode === "signup" && (
              <div className="grid gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Alex Morgan" />
              </div>
            )}
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
              />
            </div>
            <Button type="submit" variant="hero" className="mt-2" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-primary font-medium hover:underline"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  );
}

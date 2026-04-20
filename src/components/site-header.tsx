import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

const nav = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>PortfolioForge</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/dashboard"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md"
              activeProps={{ className: "text-foreground" }}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/dashboard"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="hidden sm:inline-flex">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/auth" search={{ redirect: "/dashboard" }}>Sign in</Link>
              </Button>
              <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
                <Link to="/auth" search={{ redirect: "/dashboard" }}>Get started</Link>
              </Button>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 px-4 py-3 glass">
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md"
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium rounded-md">Dashboard</Link>
                <button onClick={() => { setOpen(false); handleSignOut(); }} className="text-left px-3 py-2 text-sm font-medium rounded-md">Sign out</button>
              </>
            ) : (
              <Link to="/auth" search={{ redirect: "/dashboard" }} onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-medium rounded-md">Sign in</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            PortfolioForge
          </Link>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Create your animated portfolio in seconds. AI-ready builder for students, freshers, and job seekers.
          </p>
          <div className="mt-4 flex gap-3">
            <a className="text-muted-foreground hover:text-foreground" href="#" aria-label="GitHub"><Github className="h-5 w-5" /></a>
            <a className="text-muted-foreground hover:text-foreground" href="#" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
            <a className="text-muted-foreground hover:text-foreground" href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/builder" className="hover:text-foreground">Builder</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PortfolioForge. Built with ♥ for creators.
      </div>
    </footer>
  );
}

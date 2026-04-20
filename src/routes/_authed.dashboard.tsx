import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit3, Loader2, Sparkles, FileText } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { listPortfolios, deletePortfolio, createPortfolio, type SavedPortfolio } from "@/lib/portfolios-api";
import { usePortfolioStore } from "@/lib/portfolio-store";
import { defaultPortfolio } from "@/lib/portfolio-types";

export const Route = createFileRoute("/_authed/dashboard")({
  head: () => ({
    meta: [
      { title: "My Portfolios — PortfolioForge" },
      { name: "description", content: "Manage and edit your saved portfolios." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [portfolios, setPortfolios] = useState<SavedPortfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const navigate = useNavigate();
  const { loadPortfolio } = usePortfolioStore();

  const refresh = async () => {
    try {
      setPortfolios(await listPortfolios());
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to load";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async () => {
    const name = newName.trim() || "Untitled Portfolio";
    setCreating(true);
    try {
      const row = await createPortfolio(name, defaultPortfolio);
      loadPortfolio(row.id, row.name, row.data);
      toast.success("Portfolio created");
      navigate({ to: "/builder" });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to create";
      toast.error(msg);
      setCreating(false);
    }
  };

  const handleOpen = (p: SavedPortfolio) => {
    loadPortfolio(p.id, p.name, p.data);
    navigate({ to: "/builder" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this portfolio? This cannot be undone.")) return;
    try {
      await deletePortfolio(id);
      setPortfolios((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to delete";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Dashboard</p>
            <h1 className="font-display text-3xl font-bold mt-1">My Portfolios</h1>
            <p className="text-sm text-muted-foreground mt-1">Create, edit and download your saved portfolios.</p>
          </div>
        </div>

        <Card className="p-4 md:p-6 mb-6 shadow-card">
          <div className="flex flex-wrap gap-2 items-center">
            <Input
              placeholder="New portfolio name (e.g. Dev resume)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 min-w-[200px]"
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <Button variant="hero" onClick={handleCreate} disabled={creating}>
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              New portfolio
            </Button>
          </div>
        </Card>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : portfolios.length === 0 ? (
          <Card className="p-12 text-center shadow-card">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="font-display text-xl font-semibold">No portfolios yet</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Create your first one above to get started.</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="p-5 shadow-card hover:shadow-glow transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {p.theme ?? "minimal"}
                    </span>
                  </div>
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Updated {new Date(p.updated_at).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="default" className="flex-1" onClick={() => handleOpen(p)}>
                      <Edit3 className="h-4 w-4" /> Open
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} aria-label="Delete">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

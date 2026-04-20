import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Download, Monitor, Smartphone, Loader2, FileText } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PortfolioPreview } from "@/components/portfolio-preview";
import { usePortfolioStore } from "@/lib/portfolio-store";
import { downloadPortfolioZip, downloadPortfolioPdf } from "@/lib/portfolio-builder";
import type { ThemeId } from "@/lib/portfolio-types";

export const Route = createFileRoute("/_authed/preview")({
  head: () => ({
    meta: [
      { title: "Preview & Download — PortfolioForge" },
      { name: "description", content: "Live preview of your animated portfolio. Switch themes, toggle devices, download instantly." },
      { property: "og:title", content: "Preview & Download — PortfolioForge" },
      { property: "og:description", content: "Live preview. Theme switcher. Instant ZIP download." },
    ],
  }),
  component: PreviewPage,
});

const THEMES: { id: ThemeId; name: string }[] = [
  { id: "minimal", name: "Minimal" },
  { id: "cyber", name: "Cyber Neon" },
  { id: "matrix", name: "Matrix" },
  { id: "gradient", name: "Gradient" },
  { id: "luxury", name: "Luxury" },
];

function PreviewPage() {
  const { data, setField } = usePortfolioStore();
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadPortfolioZip(data);
      toast.success("Your portfolio is downloading!");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <Button asChild variant="ghost" size="sm" className="mb-2">
              <Link to="/builder"><ArrowLeft className="h-4 w-4" /> Back to builder</Link>
            </Button>
            <h1 className="font-display text-3xl font-bold">Live Preview</h1>
            <p className="text-sm text-muted-foreground mt-1">What you see is exactly what you'll download.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-border p-1">
              <button
                onClick={() => setDevice("desktop")}
                className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all ${device === "desktop" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <Monitor className="h-4 w-4" /> Desktop
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`px-3 py-1.5 rounded-md text-sm flex items-center gap-1.5 transition-all ${device === "mobile" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                <Smartphone className="h-4 w-4" /> Mobile
              </button>
            </div>
            <Button variant="hero" onClick={handleDownload} disabled={downloading}>
              {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Download HTML
            </Button>
          </div>
        </div>

        <Card className="p-3 mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-widest text-muted-foreground px-2">Theme:</span>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setField("theme", t.id)}
              className={`px-3 py-1.5 rounded-md text-sm transition-all ${data.theme === t.id ? "bg-gradient-primary text-primary-foreground shadow-glow" : "hover:bg-accent"}`}
            >
              {t.name}
            </button>
          ))}
        </Card>

        <PortfolioPreview data={data} device={device} />
      </div>
    </div>
  );
}

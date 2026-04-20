import { useMemo } from "react";
import { buildPortfolioHtml } from "@/lib/portfolio-builder";
import type { PortfolioData } from "@/lib/portfolio-types";

interface Props {
  data: PortfolioData;
  device?: "desktop" | "mobile";
}

/**
 * Renders the user's portfolio in an iframe using the same generator
 * that produces the downloadable ZIP — guarantees what you see is what you get.
 */
export function PortfolioPreview({ data, device = "desktop" }: Props) {
  const srcDoc = useMemo(() => {
    const { html, css, js } = buildPortfolioHtml(data);
    // Inline css/js into a single document for iframe rendering
    return html
      .replace('<link rel="stylesheet" href="style.css" />', `<style>${css}</style>`)
      .replace('<script src="script.js"></script>', `<script>${js}<\/script>`);
  }, [data]);

  const isMobile = device === "mobile";

  return (
    <div className="flex justify-center">
      <div
        className={`relative bg-card rounded-xl overflow-hidden shadow-elegant border border-border transition-all duration-500 ${
          isMobile ? "w-[375px] h-[700px]" : "w-full h-[80vh]"
        }`}
      >
        <iframe
          title="Portfolio preview"
          srcDoc={srcDoc}
          className="w-full h-full"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}

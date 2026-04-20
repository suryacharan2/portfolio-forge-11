import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — PortfolioForge" },
      { name: "description", content: "Simple, transparent pricing. Start free. Upgrade when you need more." },
      { property: "og:title", content: "Pricing — PortfolioForge" },
      { property: "og:description", content: "Free forever core plan. Pro coming soon." },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Everything you need to ship a portfolio.",
    features: [
      "All 5 premium themes",
      "8-step builder with autosave",
      "Live desktop & mobile preview",
      "Unlimited downloads",
      "Static HTML/CSS/JS export",
    ],
    cta: "Start Building",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/ month",
    desc: "For serious job seekers and freelancers.",
    features: [
      "Everything in Free",
      "AI bio & objective writer",
      "Custom domain hosting",
      "PDF resume export",
      "Premium theme variants",
      "Priority support",
    ],
    cta: "Coming Soon",
    highlight: true,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-20 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            Free during beta
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold">Simple, transparent <span className="text-gradient">pricing</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade only when you need more.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className={`p-8 h-full relative ${p.highlight ? "border-primary shadow-elegant bg-gradient-to-br from-primary/5 to-transparent" : ""}`}>
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-glow">
                    Most Popular
                  </div>
                )}
                <div className="text-sm uppercase tracking-widest text-muted-foreground">{p.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{p.price}</span>
                  <span className="text-muted-foreground">{p.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={p.highlight ? "hero" : "outline"} size="lg" className="w-full mt-8" disabled={p.highlight}>
                  {p.highlight ? <span>{p.cta}</span> : <Link to="/builder">{p.cta}</Link>}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Heart, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PortfolioForge" },
      { name: "description", content: "PortfolioForge helps job seekers ship a beautiful animated portfolio in minutes, not weekends." },
      { property: "og:title", content: "About — PortfolioForge" },
      { property: "og:description", content: "Built for students, freshers, and creators who want to stand out." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Zap, title: "Speed", desc: "From form to deployable site in under 10 minutes — without sacrificing polish." },
  { icon: Sparkles, title: "Quality", desc: "Every theme is hand-crafted with real attention to typography, motion, and detail." },
  { icon: Heart, title: "Ownership", desc: "You get the code. Host it anywhere, edit it freely, keep it forever." },
];

function About() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold">About <span className="text-gradient">PortfolioForge</span></h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Most portfolio builders are either too generic or take a weekend to set up. PortfolioForge is built for the
            people who need a beautiful, animated portfolio yesterday — students applying to internships, freshers
            chasing first jobs, and creators tired of fighting templates.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            Fill out a short form, pick from five carefully designed themes, preview it live, download the static site,
            and deploy anywhere. Your portfolio, your code, no lock-in.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mt-16">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="p-6 h-full text-center">
                <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
                  <v.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{v.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

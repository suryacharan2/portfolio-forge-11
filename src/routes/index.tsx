import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Palette, Download, Rocket, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PortfolioForge — Create Your Animated Portfolio in Seconds" },
      { name: "description", content: "AI-powered portfolio builder. Choose from 5 premium animated themes and download your professional portfolio website instantly." },
      { property: "og:title", content: "PortfolioForge — Create Your Animated Portfolio in Seconds" },
      { property: "og:description", content: "5 premium animated themes. Live preview. Instant download." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Zap, title: "Build in seconds", desc: "Multi-step smart form with autosave. Get a polished portfolio without writing code." },
  { icon: Palette, title: "5 premium themes", desc: "Cyber Neon, Minimal Elegant, Developer Matrix, Creative Gradient, and Luxury Gold." },
  { icon: Sparkles, title: "Live preview", desc: "See changes in real-time. Toggle between desktop and mobile views instantly." },
  { icon: Download, title: "Own your code", desc: "Download a clean static site (HTML/CSS/JS). Host anywhere — Vercel, Netlify, GitHub Pages." },
];

const themes = [
  { id: "cyber", name: "Cyber Neon", desc: "Dark, futuristic, neon glow with particle effects.", grad: "from-cyan-500 to-pink-500" },
  { id: "minimal", name: "Minimal Elegant", desc: "Clean white premium with elegant typography.", grad: "from-zinc-300 to-zinc-500" },
  { id: "matrix", name: "Developer Matrix", desc: "Code-style UI with terminal animations.", grad: "from-green-500 to-emerald-700" },
  { id: "gradient", name: "Creative Gradient", desc: "Vibrant gradients with floating blobs.", grad: "from-pink-500 via-purple-500 to-indigo-500" },
  { id: "luxury", name: "Luxury Gold", desc: "Black + gold executive aesthetic.", grad: "from-amber-300 to-yellow-700" },
];

const steps = [
  { n: "01", title: "Fill the form", desc: "8 simple steps cover everything from bio to projects." },
  { n: "02", title: "Pick a theme", desc: "Choose from 5 hand-crafted animated designs." },
  { n: "03", title: "Preview & tweak", desc: "Live preview updates as you type." },
  { n: "04", title: "Download & deploy", desc: "Get a static site you can host anywhere." },
];

const testimonials = [
  { name: "Maya R.", role: "CS Senior", quote: "Built my portfolio in 15 minutes. Recruiters loved the Cyber Neon theme." },
  { name: "Devon K.", role: "Frontend Dev", quote: "The animations are gorgeous. Way better than spending a weekend coding from scratch." },
  { name: "Ana L.", role: "Job Seeker", quote: "Got 3 interview callbacks the week after I shared my new portfolio." },
];

const faqs = [
  { q: "Is PortfolioForge free?", a: "Yes — the core builder, all 5 themes, live preview, and ZIP download are free in v1." },
  { q: "Do I need to know how to code?", a: "Not at all. Fill out the form, pick a theme, click download. Everything else is generated for you." },
  { q: "Can I edit the downloaded site later?", a: "Absolutely. You get clean HTML/CSS/JS — open it in any editor and customize freely." },
  { q: "Where can I host it?", a: "Anywhere static sites work — Vercel, Netlify, GitHub Pages, Cloudflare Pages, or your own server." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
        <div className="container mx-auto px-4 pt-20 pb-28 md:pt-28 md:pb-36 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-powered portfolio builder</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
              Create Your <span className="text-gradient">Animated Portfolio</span> in Seconds
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              The AI-powered portfolio builder for students, freshers, and job seekers.
              Pick a theme, fill the form, download your site.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/builder">Create Now <ArrowRight className="h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/pricing">See Pricing</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No sign-up required · Free forever core plan</p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Everything you need to stand out</h2>
          <p className="mt-3 text-muted-foreground">Designed for speed, polish, and total ownership.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-6 h-full hover:shadow-elegant transition-all hover:-translate-y-1 border-border/50">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow mb-4">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Theme Showcase */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold">5 premium themes</h2>
          <p className="mt-3 text-muted-foreground">Each one fully animated, responsive, and production-ready.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 group">
                <div className={`h-44 bg-gradient-to-br ${t.grad} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
                  <div className="absolute bottom-3 left-4 text-white/95 font-display font-semibold text-lg">{t.name}</div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold">How it works</h2>
          <p className="mt-3 text-muted-foreground">From blank page to portfolio in 4 steps.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-6 h-full border-border/50">
                <div className="text-5xl font-display font-bold text-gradient">{s.n}</div>
                <h3 className="mt-3 font-semibold text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold">Loved by job seekers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-6 h-full glass border-border/50">
                <p className="text-sm leading-relaxed">"{t.quote}"</p>
                <div className="mt-4">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold">FAQ</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-10 md:p-14 text-center bg-gradient-hero text-primary-foreground border-0 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
          <div className="relative">
            <Rocket className="h-12 w-12 mx-auto mb-4 animate-float" />
            <h2 className="font-display text-3xl md:text-5xl font-bold">Ready to launch your portfolio?</h2>
            <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">Start building now — it's free, no sign-up, instant download.</p>
            <Button asChild size="xl" variant="glass" className="mt-8 text-foreground">
              <Link to="/builder">Create Now <ArrowRight className="h-5 w-5" /></Link>
            </Button>
            <div className="mt-6 flex justify-center gap-6 text-sm opacity-90">
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> 5 themes</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Live preview</span>
              <span className="flex items-center gap-1.5"><Check className="h-4 w-4" /> Instant download</span>
            </div>
          </div>
        </Card>
      </section>

      <SiteFooter />
    </div>
  );
}
